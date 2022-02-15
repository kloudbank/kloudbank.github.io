---
title: Overview
date: 2021-11-07
sidebar: 'auto'
author: 'jaemyeong.lee'
---

## Deployment View

@startuml

scale 1
skinparam ParticipantPadding 5
skinparam BoxPadding 5
title "Deployment View"

node hcpcq {
    rectangle cicd {
        agent argo_cd
        agent argo_workflows
        agent harbor
        agent gitea
    }
    rectangle sre_app {
        agent sre_app_task
        agent sre_app_monitoring
        agent sre_app_summary

    }
    rectangle log/monitoring {
        agent elastic
        agent grafana
        agent prometheus
        agent kibana
        agent alertmanager
        agent loki
    }
}

@enduml

## Cluster Management
- argo-cd 를 사용하여 클러스터 설치에 필요한 환경을 구성한다.
- 설치에 필요한 manifests 파일을 git repo 에 구성한다.
- 설치는 argo-cd app sync 를 이용한다.
- 클러스터에 설치 작업시 직접 k8s cli 로 설치하지 않도록 한다.

@startuml

scale 1
skinparam ParticipantPadding 5
skinparam BoxPadding 5
title "Cluster Management"

component git
note right : manifests
component argo_cd
note right : argocd application

component argo_workflow
component harbor
component gitea
component elastic
component grafana
component etc...

git -d- argo_cd

argo_cd .d.> argo_workflow : deploy
argo_cd .d.> harbor
argo_cd .d.> gitea
argo_cd .d.> elastic
argo_cd .d.> grafana
argo_cd .d.> etc...

@enduml

## git manifests 구성
- 배포에 사용되는 manifests 파일은 helm chart 와 kustomize 를 사용한다.
- helm chart 는 helm repo 를 사용하지 않고 git 에 chart source 형태로 관리한다.
- helm chart 는 버전을 관리할 수 있도록 폴더를 구성한다.
- cluster 내 컴포넌트에 공통으로 설치할 manifests 는 common 으로 관리한다.
- argo-cd 는 kustomize build 명령을 수행하고 kustomize 가 helm template 명령을 수행한다.

@startuml

scale 1
skinparam ParticipantPadding 5
skinparam BoxPadding 5
title "git manifests"

rectangle git {
    file common
    note right : 모든 컴포넌트에 설치시 공통으로 필요한 것 \n - 예) tls 인증서, secret, configmap 등
    file helm
    note left : 버전별로 관리 \n /harbor_v1.0.0 \n - /templates \n - Chart.yaml \n - values.yaml
    file kustomize
    note right : kustomize.yaml \nvalues.yaml : cluster 별로 다른 설정은 여기에
}

component argo_cd
note right : argocd app sync

rectangle cluster {
    component argo_workflow
    component harbor
    component gitea
    component elastic
    component grafana
    component etc...
}

helm -d- kustomize : helm template
common -d- kustomize : base
kustomize -d- argo_cd : kustomize build

argo_cd .d.> argo_workflow
argo_cd .d.> harbor
argo_cd .d.> gitea
argo_cd .d.> elastic
argo_cd .d.> grafana
argo_cd .d.> etc...

@enduml

## argocd apps in app 구성
- argocd application 생성은 UI 와 cli 로 생성이 가능하다.
- aroocd application 도 git repo 로 관리하기 위한 목적으로 apps in app 을 사용한다.
- argocd_app_init 이 다른 argocd application 을 생성하는 역할을 한다.
- argocd application 을 빠르게 복구하는데 도움이 될 것이다.

@startuml

scale 1
skinparam ParticipantPadding 5
skinparam BoxPadding 5
title "argocd apps in app 구성"

rectangle argo_cd {
    agent argocd_app_init
    note right : 다른 argocd application 생성 역할
    agent argocd_app_argoworkflow
    agent argocd_app_harbor
    agent argocd_app_gitea
    agent argocd_app_elastic
    agent argocd_app_grafana
    agent argocd_app_etc...
}
rectangle cluster {
    component argo_workflow
    component harbor
    component gitea
    component elastic
    component grafana
    component etc...
}

argocd_app_init -d-> argocd_app_argoworkflow : create argocd application
argocd_app_init -d-> argocd_app_harbor
argocd_app_init -d-> argocd_app_gitea
argocd_app_init -d-> argocd_app_elastic
argocd_app_init -d-> argocd_app_grafana
argocd_app_init -d-> argocd_app_etc...

argocd_app_argoworkflow -d-> argo_workflow : deploy k8s
argocd_app_harbor -d-> harbor
argocd_app_gitea -d-> gitea
argocd_app_elastic -d-> elastic
argocd_app_grafana -d-> grafana
argocd_app_etc... -d-> etc...

@enduml