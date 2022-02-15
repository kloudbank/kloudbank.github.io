---
title: Multi Cluster 구축
date: 2021-09-17
categories: 
- Multi Cloud
sidebar: 'auto'
author: 'jaemyeong.lee'
---

- 구축 목표
    - Control Plane 과 Data Planes 으로 구성한다.
    - Cluster 에 설치되는 기본 컴포넌트의 설치를 자동화 한다.
    - Cluster EndPoint 관리를 자동화 한다.
    - DWP 에서 Cluster Resource 제어시 Task Runner 를 적용한다.
    - DWP 에서 Cluster Resource 제어시 async, non-block 을 적용한다.
    - DWP 에서 Cluster Resource 제어시 status monitoring 을 적용한다.
    - Access Log 를 Application 외부에서 처리하거나 최소한 Redis 직접 접속은 제거한다

- task list
    - App CI
    - App CD
    - App Pod  실행
    - SRE Component 

## Deployment Diagram
### Site A
- Site B 에서 사용하는 컴포넌트만 표시함
- Docker registry 로 Harbor 를 사용함
- Task 기반 비동기 처리를 위해 TaskAgent, TaskRunner, NotifyAgent 를 사용함 

@startuml

legend
    |= Color |
    | <size:14><back:#Orange>신규컴포넌트</back></size>|
    | <size:14><back:#Yellow>기존컴포넌트</back></size>|
endlegend

rectangle "Common Service" as comm {
    [SSO] as sso
    [Cube] as cube
    [CDN] as cdn
    [SMTP] as smtp
}
rectangle "CI/CD" as cicd {
    [Nexus] as nexus
    [Bitbucket] as bitbucket
    [Jira] as jira
    [Harbor] as harbor #orange
}
node "Platfrom Plane" as hcp {
    rectangle "Portal" as portal {
        [WP] as wp
        [DWP] as dwp
    }
    rectangle "Task Service" as task {
        [TaskAgent] as taskagent #orange
        [NotifyAgent] as notifyagent #orange
        [TaskRunner] as taskrunner #orange
        [ArgoCD] as argocd #orange
        [MINIO] as minio #orange
        [POSTGRES] as postgres #orange
    }
    argocd ..* minio
    argocd ..* postgres
    rectangle "Managed Service" as managed {
        [Redis] as redis
    }
}

@enduml

### Site B
- Control Plane, Data Plane 으로 구분
- Platform Plane 과의 통신을 TaskRunner 를 이용
- Docker registry 로 Harbor 사용
- Gitee 는 사용자 git repository 로 사용됨
- Platform 에서 배포에 사용되는 source 는 Bitbucket 을 사용함
- Cluster 컴포넌트 관리를 위해 ArgoCD 를 사용함
- Monitoring/Alert 컴포넌트는 long-terms 와 short-terms 를 구분함

@startuml

legend
    |= Color |
    | <size:14><back:#Orange>신규컴포넌트</back></size>|
    | <size:14><back:#Yellow>기존컴포넌트</back></size>|
endlegend

node "Control Plane" as bcp {
    rectangle "Task Service" as task {
        [TaskRunner] as taskruuner #orange
        [ArgoCD] as argocd #orange
        [MINIO] as minio #orange
        [POSTGRES] as postgres #orange
    }
    argocd ..* minio
    argocd ..* postgres
    rectangle "CI/CD Service" as cicd {
        [Nexus] as nexus
        [SonarQube] as sonarqube
        [Harbor] as harbor #orange
        [Gitee] as gitee #orange
    }
    rectangle "Monitoring/Alert" as mon {
        [Elastic-Search\n(long-terms)] as elastic
        [Grafana\n(long-terms)] as grafana
        [Kibana\n(long-terms)] as kibana
        [Prometheus\n(long-terms)] as prometheus
    }
}
rectangle "Managed Service" as managed {
    [Redis] as redis
}

@enduml

@startuml

legend
    |= Color |
    | <size:14><back:#Orange>신규컴포넌트</back></size>|
    | <size:14><back:#Yellow>기존컴포넌트</back></size>|
endlegend

node "Data Plane" as bdp {
    rectangle "Biz" as biz {
        [Backend-A]
        [Helm-A]
    }
    rectangle "Monitoring/Alert" as mon {
        [Elastic-Search\n(short-terms)] as elastic
        [Grafana\n(short-terms)] as grafana
        [Kibana\n(short-terms)] as kibana
        [Prometheus\n(short-terms)] as prometheus
        [AlertManager\n(short-terms)] as alertmanager
        [loki\n(short-terms)] as loki #orange
    }
}

@enduml

## Cluster Management
- Cluster 를 새로 구축하는 경우 절차를 기술함
- Site Cluster 에 설치될 컴포넌트는 ArgoCD 로 관리함
- 배포 상태 관리는 ArgoCD Dashboard 를 사용함

@startuml

scale 1
skinparam ParticipantPadding 5
skinparam BoxPadding 5
title "Cluster Management"

Actor Manager
box "site A CI/CD"
    participant Bitbucket
end box
box "site B control plane"
    participant "ArgoCD-Dashboard" as argocddash
    participant ArgoCD
    participant k8s_control
end box
box "site B data plane"
    participant k8s_data
end box

autonumber 1-1
    Manager -> Bitbucket : git push yml
autonumber 2-1
    Manager -> argocddash : create project
    Manager -> argocddash : create cluster
    Manager -> argocddash : create repository
    Manager -> argocddash : create application
autonumber 3-1
    Manager -> argocddash : sync yml
    argocddash -> ArgoCD : sync yml
    ArgoCD -> Bitbucket : checkout yml
    ArgoCD -> k8s_control : check diff
    ArgoCD -> k8s_control : deploy
    ArgoCD -> Bitbucket : checkout yml
    ArgoCD -> k8s_data : check diff
    ArgoCD -> k8s_data : deploy
autonumber 4-1
    Manager -> argocddash : monitoring
    ArgoCD --> argocddash : stream: server-sent-event

@enduml

## Sequence Diagram
- 사용자 관점에서 필요한 프로세스를 Sequece Diagram 으로 작성

### Login SSO process
- 프로세스 설명
    - Site A 사용자가 A url 과 B url 을 사용하여 로그인 할 경우
        - case1, case2
    - Site B 사용자가 B url 을 사용하여 로그인 할 경우
        - case3

@startuml

scale 1
skinparam ParticipantPadding 5
skinparam BoxPadding 5
title "Login Process"

box "site A"
    actor "site A User" as a_user
    participant SSO as a_sso
    participant "A url WP" as a_wp
    participant "B url WP" as b_wp
end box
box "site B"
    participant SSO as b_sso
    actor "site B User" as b_user
end box

autonumber 1-1
a_user -> a_wp : login
note left : case1
a_wp -> a_sso : authentication
a_sso -> a_wp : redirect url
a_wp -> a_user : success

autonumber 2-1
a_user -> b_wp : login
note left : case2
b_wp -> b_sso : authentication
b_sso -> b_wp : redirect url
b_wp -> a_user : success

autonumber 3-1
b_user -> b_wp : login
note right : case3
b_wp -> b_sso : authentication
b_sso -> b_wp : redirect url
b_wp -> b_user : success

@enduml

### Create project process
- 고려사항
- 검토 필요 사항

@startuml

scale 1
skinparam ParticipantPadding 5
skinparam BoxPadding 5
title "Project 생성"

actor User
box "site A - platform plane"
    participant DWP
    participant CUBE
    participant NotifyAgent
    participant TaskAgent
    participant TaskRunner
    participant "Bitbucket\n(source)" as source
    participant Jira
end box

autonumber 1-1
User -> DWP : create project
DWP -\ TaskAgent : run task
TaskAgent -> TaskRunner : run task
activate TaskRunner

TaskRunner -> source : create project
TaskRunner -> source : modify member
TaskRunner -> Jira : create project
TaskRunner -> Jira : modify member

TaskRunner --\ NotifyAgent : send notify
deactivate TaskRunner
NotifyAgent --\ CUBE : send message

autonumber 2-1
User -> DWP : view status

@enduml

### Create application process
- 고려사항
    - site 정보와 상관없이 application 을 생성을 할 수 있도록 한다.
    - DWP metadata 생성 및 source repository 를 개발자에게 제공하는 범위로 한정한다.
- 검토 필요 사항
    - TaskRunner 에서 발생하는 status 를 NotifyAgent 로 보내는 기술 검증 필요
    - TaskRunner 에서 발생하는 status 를 조회하는 기능 검증 필요

@startuml

scale 1
skinparam ParticipantPadding 5
skinparam BoxPadding 5
title "App. 생성"

actor User
box "site A - platform plane"
    participant DWP
    participant CUBE
    participant NotifyAgent
    participant TaskAgent
    participant TaskRunner
    participant "Bitbucket\n(source)" as source
    participant "Bitbucket\n(yaml)" as yaml
end box

autonumber 1-1
User -> DWP : create app.
DWP -\ TaskAgent : run task
TaskAgent -> TaskRunner : run task
activate TaskRunner

TaskRunner -> source : checkout source template
TaskRunner -> source : create repository
TaskRunner -> source : push source
TaskRunner -> yaml : checkout yaml template
TaskRunner -> yaml : create repository
TaskRunner -> yaml : push yaml

TaskRunner --\ NotifyAgent : send notify
deactivate TaskRunner
NotifyAgent --\ CUBE : send message

autonumber 2-1
User -> DWP : view status

@enduml

### Create helm chart process
- 고려사항
    - site 정보와 상관없이 helm chart 를 생성을 할 수 있도록 한다.
- 검토 필요 사항
    - TaskRunner 에서 발생하는 status 를 NotifyAgent 로 보내는 기술 검증 필요
    - TaskRunner 에서 발생하는 status 를 조회하는 기능 검증 필요

@startuml

scale 1
skinparam ParticipantPadding 5
skinparam BoxPadding 5
title "Helm Chart 생성"

actor User
box "site A - platform plane"
    participant DWP
    participant CUBE
    participant NotifyAgent
    participant TaskAgent
    participant TaskRunner
    participant "Bitbucket\n(yaml)" as yaml
end box

autonumber 1-1
User -> DWP : create app.
DWP -\ TaskAgent : run task
TaskAgent -> TaskRunner : run task
activate TaskRunner
TaskRunner -> yaml : checkout yaml template
TaskRunner -> yaml : create repository
TaskRunner -> yaml : push yaml
TaskRunner --\ NotifyAgent : send notify
deactivate TaskRunner
NotifyAgent --\ CUBE : send message

autonumber 2-1
User -> DWP : view status

@enduml

### App. CI process
- 고려사항
    - TaskAgent 는 Target Cluster 를 Discovery 하는 기능 필요함
    - application source 는 사이즈가 크지 않으므로 site A 에서 checkout 받음
    - docker image 사이즈가 커서 네트워크 트래픽 문제가 발생할 수 있음
    - 네트워크 트래픽 문제로 docker repository 는 site B 에 위치해야 함
    - 네트워크 트래픽 문제로 docker build & push 는 site B 에서 수행해야 함
    - site 간 docker image 동기화 필요함
- 검토 필요 사항
    - TaskRunner 에서 발생하는 status 를 NotifyAgent 로 보내는 기술 검증 필요
    - TaskRunner 에서 발생하는 status 를 조회하는 기능 검증 필요
    - site 간 docker image 동기화 시간 및 간격 검증 필요

@startuml

scale 1
skinparam ParticipantPadding 5
skinparam BoxPadding 5
title "App. CI"

actor User
box "site A - platform plane"
    participant DWP
    participant CUBE
    participant NotifyAgent
    participant TaskAgent
    participant "Bitbucket\n(source)" as source
    participant Harbor as HarborA
end box
box "site B - control plane"
    participant TaskRunner
    participant Nexus
    participant Harbor
    participant SonarQube
end box

autonumber 1-1
User -> DWP : run CI
note left : CI
DWP -\ TaskAgent : run task
TaskAgent -> TaskAgent : discovery taskrunner
TaskAgent -\ TaskRunner : run task
activate TaskRunner

TaskRunner -> source : checkout source
TaskRunner -> TaskRunner : build application
TaskRunner -> Nexus : download libs
TaskRunner -> TaskRunner : build dockerfile
TaskRunner -> Harbor : push docker image
TaskRunner -> SonarQube : test source

TaskRunner --\ NotifyAgent : send notify
deactivate TaskRunner
NotifyAgent --\ CUBE : send message

autonumber 2-1
Harbor -\ Harbor : scan docker image
note left : Harbor process
Harbor -\ HarborA : sync docker image

autonumber 3-1
User -> DWP : view status

@enduml

### App. CD process
- 고려사항
    - Deploy 를 수행하는 시점에 ArgoCD Application 을 생성한다.
    - ArgoCD Application 도 bitbucket yaml 로 관리한다.
    - ArgoCD metadata 는 control plane 에 유지한다.

@startuml

scale 1
skinparam ParticipantPadding 5
skinparam BoxPadding 5
title "App. CD"

actor User
box "site A - platform plane"
    participant DWP
    participant CUBE
    participant NotifyAgent
    participant TaskAgent
    participant "Bitbucket\n(yaml)" as yaml
    participant "Bitbucket\n(ArgoCD)" as argoyaml
end box
box "site B - control plane"
    participant TaskRunner
    participant ArgoCD
    participant Harbor
    participant k8s as k8sc
end box
box "site B - data plane"
    participant k8s
end box

autonumber 1-1
User -> DWP : run CD
DWP -\ TaskAgent : run task
TaskAgent -> TaskAgent : discovery taskrunner
TaskAgent -\ TaskRunner : run task
activate TaskRunner

TaskRunner -> argoyaml : if not exists ArgoApp. then \n push yaml
ArgoCD -\ argoyaml : if not exists ArgoApp. then \n sync yaml
note right : AgroCD process
ArgoCD -\ k8sc : if not exists ArgoApp. then \n deploy yaml

TaskRunner -> yaml : checkout yaml
TaskRunner -> TaskRunner : modify yaml
TaskRunner -> yaml : push yaml
TaskRunner -\ ArgoCD : run deploy

TaskRunner --\ NotifyAgent : notify status
deactivate TaskRunner
NotifyAgent --\ CUBE : send message

autonumber 4-1
ArgoCD -\ yaml : checkout yaml
note right : AgroCD process
ArgoCD -\ k8s : deploy yaml

autonumber 3-1
k8s -\ k8s : deploy resource
note left : k8s process
k8s -\ Harbor : pull docker image

autonumber 4-1
User -> DWP : view status

@enduml

### Helm CD process
- 고려사항
    - ArgoCD Helm application 을 생성하면 ArgoCD 가 helm chart 를 배포해줌
    - ArgoCD helm app. 역시 bitbucket repository 로 관리함
    - helm app. 내 parameter 설정으로 values.yml 수정함
- 검토 필요 사항
    - Async process 에 대한 status 조회 방안 필요

@startuml

scale 1
skinparam ParticipantPadding 5
skinparam BoxPadding 5
title "Deploy Helm Chart"

actor User
box "site A - platform plane"
    participant DWP
    participant CUBE
    participant NotifyAgent
    participant TaskAgent
    participant "Bitbucket\n(yaml)" as yaml
    participant "Bitbucket\n(ArgoCD)" as argoyaml
end box
box "site B - control plane"
    participant TaskRunner
    participant ArgoCD
    participant Harbor
    participant k8s as k8sc
end box
box "site B - data plane"
    participant k8s
end box

autonumber 1-1
User -> DWP : run CD
DWP -\ TaskAgent : run task
TaskAgent -> TaskAgent : discovery taskrunner
TaskAgent -\ TaskRunner : run task
activate TaskRunner

TaskRunner -> argoyaml : if not exists ArgoApp. then \n push yaml
ArgoCD -\ argoyaml : if not exists ArgoApp. then \n sync yaml
note right : AgroCD process
ArgoCD -\ k8sc : if not exists ArgoApp. then \n deploy yaml

TaskRunner -> yaml : checkout yaml
TaskRunner -> TaskRunner : modify yaml
TaskRunner -> yaml : push yaml
TaskRunner -\ ArgoCD : run deploy

TaskRunner --\ NotifyAgent : notify status
deactivate TaskRunner
NotifyAgent --\ CUBE : send message

autonumber 4-1
ArgoCD -\ yaml : checkout yaml
note right : AgroCD process
ArgoCD -\ k8s : deploy yaml

autonumber 3-1
k8s -\ k8s : deploy resource
note left : k8s process
k8s -\ Harbor : pull docker image

autonumber 4-1
User -> DWP : view status

@enduml

## ETC
- TaskRunner 로 사용 가능한 Open Source 정리

### Argo Workflow

@startuml

scale 1
skinparam ParticipantPadding 5
skinparam BoxPadding 5
title "Argo Workflow"

agent TaskAgent
rectangle ArgoWorkflow {
    agent WorkflowTemplate
    collections Workflow
    collections Template
    collections Arguments
    agent Step
    agent DAG
    agent Container
    agent Script
    agent Resource
    artifact MINIO
    collections Inputs
    collections Outputs
    database postgres
}
rectangle k8s {
    collections Pods
    collections Resources
}


TaskAgent -d-> Workflow : run workflow
Workflow ..* Template : include
Workflow .r.o Arguments : include
Template .u.o WorkflowTemplate : reference

Step .r.* Template : include
DAG .r.* Template : include

Template .l.o Step : include
Template .l.o DAG : include
Template .d.o Container : include
Template .d.o Script : include
Template .d.o Resource : include
Template .r.o Inputs : include
Template .r.o Outputs : include

Inputs ..o MINIO : use
Outputs ..o MINIO : use

Container --> Pods : run
Script --> Pods : run
Resource --> Resources : create
Pods --> MINIO : write LogFile/Artifacts

@enduml

### Argo Event

@startuml

scale 1
skinparam ParticipantPadding 5
skinparam BoxPadding 5
title "Argo Event"

object DWP
object Redis
package ArgoEvent {
    object AgroResource
    object ArgoSensor
    object ArgoTrigger
}
package ArgoWorkflow {
    object ArgoWorkflow
}

DWP -d- Redis : message
Redis -d- AgroResource : listner
AgroResource -r- ArgoSensor
ArgoSensor -r- ArgoTrigger
ArgoTrigger -d- ArgoWorkflow

@enduml

@startuml

scale 1
skinparam ParticipantPadding 5
skinparam BoxPadding 5
title "Argo Event"

participant DWP
participant Redis
participant AgroResource
participant ArgoSensor
participant ArgoTrigger
participant ArgoWorkflow

DWP -> Redis : task message
Redis -> AgroResource : listner
AgroResource -> ArgoSensor : sensor
ArgoSensor -> ArgoTrigger : trigger
ArgoTrigger -> ArgoWorkflow : run

@enduml

### Tekton

@startuml

scale 1
skinparam ParticipantPadding 5
skinparam BoxPadding 5
title "Tekton"

object git
object image
package tekton {
    object Pipeline
    object PipelineRun
    object PipelineResource
    object Task
    object TaskRun
}

PipelineResource -u-o git
PipelineResource -u-o image
Pipeline -u-* PipelineResource
Pipeline -r-* Task
PipelineRun -u-* Pipeline
TaskRun -u-* Task

@enduml