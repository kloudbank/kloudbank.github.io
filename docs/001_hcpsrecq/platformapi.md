---
title: Platform API
date: 2021-11-07
sidebar: 'auto'
author: 'jaemyeong.lee'
---

## Deployment View
- Platform SRE Application 은 python 으로 개발되고 DWP 에 REST API 를 제공합니다.
- 별도의 Gateway 없이 k8s ingress 로 Endpoint 를 관리합니다.
- 클러스터에 대한 변경작업은 모두 argo_workflow 를 실행합니다.
- argo_workflow 의 작업은 대부분 CLI 방식으로 실행됩니다.
- CLI 방식을 제공하지 않는 기능일 경우 REST API 를 사용합니다.
- 실시간 모니터링 기능은 python SDK 를 이용하여 직접 k8s 를 조회하여 데이터를 제공합니다.
- 다량의 데이터를 summary 해야 하는 경우 redis 에 데이터를 적재하여 제공합니다.

@startuml

scale 1
skinparam ParticipantPadding 5
skinparam BoxPadding 5
title "Deployment View"

node hcp {
    agent DWP_zuul
    agent ingress_cluster
    agent redis
}
node hcpcq {
    rectangle cicd {
        agent argo_cd
        agent harbor
        agent argo_workflow
    }
    rectangle sre_app {
        agent sre_app_task
        agent sre_app_monitoring
        agent sre_app_summary
        agent ingress_sre
    }
    agent k8s
}
agent git

DWP_zuul -r-> ingress_cluster : REST API

ingress_cluster -d-> ingress_sre
ingress_sre -d-> sre_app_task
ingress_sre -d-> sre_app_monitoring
ingress_sre -[hidden]d-> sre_app_summary

sre_app_task -d-> argo_workflow : REST API
argo_workflow --> git : CLI
argo_workflow -d-> harbor : CLI
argo_workflow -d-> argo_cd : CLI
argo_cd <.u. git : manifests
argo_cd -d-> k8s : deploy

sre_app_monitoring -d-> k8s : python DK
sre_app_summary -d-> k8s : python SDK
sre_app_summary -u-> redis : summary data

@enduml

## Task Process flow
- App. 생성, App. 빌드, App. 배포 기능을 시퀀스 다이어그램으로 보여주고 있다.
- argo-cd 와 argo-workflow 는 비동기 방식으로 수행된다.
- 그림상에서 비동기 수행의 경우 화살표 뒤에 동그라미(o) 표시가 되어 있다.
- 비동기 수행에 대한 상태와 결과를 조회할 수 있도록 별도 조회기능이 제공되어야 한다.

@startuml

scale 1
skinparam ParticipantPadding 5
skinparam BoxPadding 5
title "Task Process flow"

autonumber
ingress_sre -> sre_app_task : create app.
sre_app_task ->o argo_workflow : run create app workflow
activate argo_workflow
    argo_workflow <- git : git clone source template
    argo_workflow -> git : git push source
    argo_workflow <- git : git clone manifests template
    argo_workflow -> git : git push manifests
    argo_workflow ->o argo_cd : argo app sync
deactivate argo_workflow
argo_cd -> git : git clone manifests
argo_cd -> k8s : deploy argocd app.

autonumber 11
ingress_sre -> sre_app_task : ci app.
sre_app_task ->o argo_workflow : run ci workflow
activate argo_workflow
    argo_workflow <- git : git clone source
    argo_workflow -> argo_workflow : build source
    argo_workflow -> argo_workflow : build docker image
    argo_workflow -> harbor : push docker image
deactivate argo_workflow

autonumber 21
ingress_sre -> sre_app_task : cd app.
sre_app_task ->o argo_workflow : run cd workflow
activate argo_workflow
    argo_workflow <- git : git clone manifests
    argo_workflow -> argo_workflow : modify values.yaml
    argo_workflow -> git : git push manifests
    argo_workflow ->o argo_cd : argocd app sync
deactivate argo_workflow
argo_cd -> git : git clone manifests
argo_cd -> k8s : deploy app.

@enduml

## Monitoring Process flow
- argo-cd 와 argo-workflow 는 비동기 방식으로 수행된다.
- 비동기 수행에 대한 상태와 결과를 조회할 수 있도록 별도 조회기능이 제공되어야 한다.
- argo-workflow, argo-cd 는 현재상태를 조회할 수 API 가 제공된다.
- argo-workflow, argo-cd 는 REST API 와 Server-Sent-Event(SSE) API 가 모두 제공된다.
- 그외 상태를 조회하기 위해서는 k8s 를 직접 조회하는 방식을 사용할 수 있다. 

@startuml

scale 1
skinparam ParticipantPadding 5
skinparam BoxPadding 5
title "Monitoring Process flow"

autonumber
ingress_sre -> sre_app_monitoring : monitoring create app.
sre_app_monitoring -> argo_workflow : get workflow status (SSE API)
sre_app_monitoring -> argo_cd : get argocd app. status (SSE API)
sre_app_monitoring -> k8s : get app. log (k8s SDK)
sre_app_monitoring -> k8s : get app. event (k8s SDK)

@enduml

## Summary Process flow
- 다수의 데이터를 이용한 화면 구현이 경우 개별 REST API 로는 기능 제공이 어렵다.
- 예를들면 Application 목록을 보면 배포상태와 deploy상태를 여러개 같이 보여주고 있다.
- 이럴 경우 필요한 데이터를 redis 에 미리 수집해서 보여주는 방식을 사용한다.

@startuml

scale 1
skinparam ParticipantPadding 5
skinparam BoxPadding 5
title "Summary Process flow"

autonumber
sre_app_summary -> argo_workflow : get workflow status (SSE API)
sre_app_summary -> argo_cd : get argocd app. status (SSE API)
sre_app_summary -> k8s : get app. log (k8s SDK)
sre_app_summary -> k8s : get app. event (k8s SDK)
sre_app_summary -> redis : store data

@enduml