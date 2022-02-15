---
title: Standard
date: 2021-11-08
sidebar: 'auto'
author: 'jaemyeong.lee'
---

## cluster name
- hcpcq

## domain name
- *.hcpcq.kubepia.net

## project(prefix) name
- hcp-sre

## namespace 구성
Type | Namespace | Detail
-- | -- | --
CICD | hcp-sre-argocd | argocd 배포 위치
CICD | hcp-sre-argo | argoworkflows 배포 및 workflow 생성 및 실행 위치
CICD | hcp-sre-harbor | harbor 배포 위치
CICD | hcp-sre-gitea | gitea 배포 위치
Mon/Alert | hcp-sre-prometheus | prometheus
Mon/Alert | hcp-sre-alertmanager | alertmanager
Mon/Alert | hcp-sre-grafana | grafana
Mon/Alert | hcp-sre-loki | loki
Apps. | hcp-sre-apps | Task, Monitoring, Summary Service 배포 위치

## harbor project 구성
Type | project name | Detail
-- | -- | --
Cluster Initialize | hcp-sre-cluster | cluster 설치에 필요한 모든 이미지 repository
Apps. | hcp-sre-apps | Task, Monitoring, Summary Service 이미지 repository

## git repository 구성
- organization name : hcp-sre-cq (원래는 hcp-sre 로 하려고 했으나 github 에서 사용불가라서)

Type | repository name | Detail
-- | -- | --
Cluster Initialize | hcp-sre-cluster-init | cluster 초기 setup deployments repository, 폴더는 클러스터별로 생성됨
Cluster Deployments | hcp-sre-cluster-deploy | service delpoyments repository, 폴더는 서비스별로 생성됨
Apps. | hcp-sre-apps-task | Task repository
Apps. | hcp-sre-apps-monitoring | monitoring repository
Apps. | hcp-sre-apps-summary | summary repository

## domain 구성
- sre application 은 1개 도메인을 사용한다.

Type | name | url
-- | -- | --
CICD | hcp-sre-argocd | argocd.hcpcq.kubepia.net
CICD | hcp-sre-argo | argo.hcpcq.kubepia.net
CICD | hcp-sre-harbor | harbor.hcpcq.kubepia.net
CICD | hcp-sre-gitea | gitea.hcpcq.kubepia.net
CICD | hcp-sre-grafana | grafana.hcpcq.kubepia.net
CICD | hcp-sre-prometheus | prometheus.hcpcq.kubepia.net
Apps. | hcp-sre-apps | hcp-sre-apps.hcpcq.kubepia.net

## Service Endpoint 구성
- 별도의 gateway 역할을 하는 서비스를 생성하지 않고 k8s ingress 를 이용해서 endpoint 를 관리한다.
- cluster 간 gateway 역할도 k8s ingress 를 사용하여 endpoint 를 관리한다.

@startuml

scale 1
skinparam ParticipantPadding 5
skinparam BoxPadding 5
title "Service Endpoint 구성"

node hcp {
    agent DWP_zuul
    agent ingress_hcp
}
node hcpcq {
    agent ingress_hcpcq

    rectangle app_sre { 
        agent service_task
        agent service_monitoring
        agent service_summary

        collections pod_task
        collections pod_monitoring
        collections pod_summary
    }
}

DWP_zuul -r-> ingress_hcp
ingress_hcp -r-> ingress_hcpcq

ingress_hcpcq -d-> service_task
ingress_hcpcq -d-> service_monitoring
ingress_hcpcq -d-> service_summary

service_task -d-> pod_task
service_monitoring -d-> pod_monitoring
service_summary -d-> pod_summary

@enduml

Type | name | url
-- | -- | --
Apps. | hcp-sre-apps-task | deployment 만 실행
Apps. | hcp-sre-apps-monitoring | deployment 만 실행
Apps. | hcp-sre-apps-summary | deployment 만 실행


## application 배포 구성

@startuml

scale 1
skinparam ParticipantPadding 5
skinparam BoxPadding 5
title "Application Deploy Flow"

DWP_zuul -> ingress_hcp : create app.
ingress_hcp -> ingress_hcpcq
ingress_hcpcq -> task
task -> argowf_create : run workflow
argowf_create <- git : git clone
argowf_create -> git : push yaml
argowf_create -> argocd : create argocd application

DWP_zuul -> ingress_hcp : deploy app.
ingress_hcp -> ingress_hcpcq
ingress_hcpcq -> task 
task -> argowf_deploy : run workflow
argowf_deploy <- git : git clone
argowf_deploy -> argowf_deploy : modify yaml
argowf_deploy -> git : push yaml
argowf_deploy -> argocd : sync argocd application

argocd -> k8s : deploy

@enduml

## Deploy Repository 구성
- base 폴더는 chart 파일을 관리하고 차트 버전별로 폴더를 구성한다.
- template 폴더는 base 폴더의 특정(최종) 버전을 사용하도록 설정이 되며, 실제 배포용 파일로 사용한다.
- cluster 별 폴더는 배포되는 클러스터를 구분한다.
- cluster - project - apps/pvcs/jobs 형태로 폴더를 구성한다.
- cluster 폴더와 template 폴더 하위 구조를 일치시켜서 상대경로에 대한 오류를 방지한다.
- github : https://github.com/hcp-sre-cq/hcp-sre-cluster-deploy

1depth | 2depth | 3depth | 설명
-- | -- | -- | --
base | | | base 저장소 root
base | apps | | application root
base | apps | python-backend-v1.0.0 | python backend deployment yaml
base | apps | springboot-backend-v1.0.0 | springboot backend deployment yaml
base | apps | springboot-module-v1.0.0 | springboot module deployment yaml
base | jobs | | job root
base | jobs | job-v1.0.0 | job deployment yaml
base | pvcs | | pvc root
base | pvcs | pvc-v1.0.0 | pvc deployment yaml
template | | | template root
template | project | | project root
template | project | apps | app root
template | project | jobs | jobs root
template | project | pvcs | pvcs root
hcpcq-aws | | | cluster root
hcpcq-aws | hcp-test | | project root
hcpcq-aws | hcp-test | apps | apps root
hcpcq-aws | hcp-test | jobs | jobs root
hcpcq-aws | hcp-test | pvcs | pvcs root

## Cluster Initialize Repository 구성
- base 폴더는 chart 파일을 관리하고 차트 버전별로 폴더를 구성한다.
- cluster 별 폴더는 배포되는 클러스터를 구분한다.
- github : https://github.com/hcp-sre-cq/hcp-sre-cluster-int

1depth | 2depth | 3depth | 설명
-- | -- | -- | --
base | | | base 저장소 root
base | argo | argo-workflows-v0.8.1 | argo-workflows chart
base | argocd | argo-cd-v3.26.5 | argo-cd chart
base | argowf | argowf-v1.0.0 | argowf chart
base | common | | 공통 설치 deployment
base | gitea | gitea-v4.1.1 | gitea chart
base | harbor | harbor-v1.7.3 | harbor chart
hcpcq-aws | | | cluster root
hcpcq-aws | argo | argo-workflows-v0.8.1 | argo-workflows chart
hcpcq-aws | argocd | argo-cd-v3.26.5 | argo-cd chart
hcpcq-aws | argowf | argowf-v1.0.0 | argowf chart
hcpcq-aws | common | | 공통 설치 deployment
hcpcq-aws | gitea | gitea-v4.1.1 | gitea chart
hcpcq-aws | harbor | harbor-v1.7.3 | harbor chart