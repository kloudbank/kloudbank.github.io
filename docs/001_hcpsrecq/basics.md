---
title: Basics
date: 2021-11-10
sidebar: 'auto'
author: 'noisonnoiton'
---

API Design To-Do Preview

## Task Runner
DWP Task 유형 분류 및 Task Runner List-up

### DWP Task 유형

NoSQL (mongoDB / Redis), RDB (Oracle, MSSQL), Event 관리는 우선 제외,,,

Name | Detail | Type | Description
------------- | ------------- | ------------- | -------------
**DevOps** | Build | **CI** | git checkout, build (app. / container) image push 
**DevOps** | Deploy | **CD** | k8s: namespace 관련 objects, deployment/service/ingress/hpa
**DevOps** | Resource | **CD** | k8s: deployment/service/ingress/hpa
**Data Science** | Deploy | **CD** | k8s: helm v3 release
**Data Science** | Resource | **CD** | k8s: helm v3 chart upgrade
**Job** | Deploy | **CD** | k8s: job, cronjob
**Job** | Resource | **CD** | k8s: job, cronjob
**Job** | Schedule | **CD** | k8s: cronjob
**Storage** | - | **CD** | k8s: persistentvolumeclaim

### Task Runner List-up
- Task Runner 는 **Argo WorkflowTemplate** 로 정의
- CD 를 위한 k8s manifest 는 git repository 에서 관리하며, **ArgoCD Application** 으로 정의하여 k8s cluster 와 sync
- _<u>SRE Component 관리를 위한 Task Runner 필요 시 정의</u>_

Name | Argo Type | k8s Object | Description
------------- | ------------- | ------------- | -------------
**Project CD** | Application | Namespace, ServiceAccount, RoleBinding, Secret | 
**App Service CI** | Workflow | - | App service 의 application, container build 및 image push process
**App Service CD** | Application | Deployment, Service, Ingress, HPA | 1. App Service 배포 <br>2. App Service 자원 할당
**Helm CD** | Application | helm manifest, values | 1. Helm chart 배포 <br>2. Helm resource 자원 할당, chart upgrade
**Job CD** | Application | Job | Job (Normal) 생성, 자원 할당
**CronJob CD** | Application | CronJob | Job (Scheduled) 생성, 자원 할당 및 CronJob Schedule 변경
**Volume CD** | Application | PersistentVolumeClaim | 
**Application 관리** | Workflow | Application | Argo Application 기반으로 생성된 resource 삭제

## Server-Sent-Event
DWP 기능 별 SRE 연계 현황 및 Server-sent-event 신규 항목 list-up

### SSE Request Flow
- Router API
: IC Cluster 에 배포되며, SSE Service 를 호출하는 용도 (Monitoring Service, Summary Service)
- SSE API
: CQ Cluster 에 배포되며, k8s, argo 의 stream 을 SSE 로 return 하는 API


```
  +----------------------+     +------------------------+     +----------------------------+
  |                      |     | Python FastAPI         |     | Python FastAPI             |
  | 1. curl call         |     |                        |     |                            |
    2. EventSource       |     |  SSEClient             |     | K8SClient (Python Lib)     |
  | : GET / POST         |     |  (from sseclient)      |     | ArgoClient (REST API)      |
  |                      +---->|                        +---->|                            |
  |                      |     |  : return              |     | : return                   |
  |                      |     |    EventSourceResponse |     |   EventSourceResponse      |
  +----------------------+     +--------------------+---+     +----------------+-----------+
                                    # Router API #                     # SSE API #
                                                                              |
                                                                              |
                                                                              |
  +-------------------------------------------------------+                   |
  |  * Target K8S Cluster *                               |                   |
  |                                                       |                   |
  |  +-------------------+      +------------------+      |                   |
  |  |                   |      |                  |      |                   |
  |  | Argo API          |      |   App. Pod       |      |<------------------+
  |  | : ArgoCd, ArgoWF  |      |   : Log /Event   |      |
  |  +-------------------+      +--------------^---+      |
  |                                                       |
  |                                                       |
  +-----------------------^-------------------------------+
```

### App Service List
전체 List 에서, status 정보만 가져오는 경우는, monitoring api 를 각각 호출해서 가져올 수 없을 것으로 보임.
현재처럼 redis summary 방식 유지 필요 _<u>(or 신규 개발,,?)</u>_

Type | Detail | Target Service
------------- | ------------- | -------------
**CI/CD Status** | Redis, CI/CD Last Status | **Summary Service**
**Run Status** | Redis, Pod Status | **Summary Service**
**배포 시작/취소** | Jenkins | **Task Service**


### App Service Detail

Type | Detail | Target Service
------------- | ------------- | -------------
**Pipeline History** | Jeknins History | **Task Service**
**Pipeline Log** | Jeknins Log | **Monitoring Service**
**Metric** | Redis + Prometheus | **Monitoring Service**
**Pod Log** | Elastic Search | **Monitoring Service**
**App. Log** | Elastic Search | 유지
**Job Instances** | DB | 유지
**Job Log** | Elastic Search | 유지


### Server-Sent-Event List-up
Server-Sent-Event 로 전환 가능할 것으로 보이는 항목 예상

DWP Menu | Type | Description
------------- | ------------- | -------------
**Pipeline Log** | Argo Workflow | Argo Workflow log stream
**Pod List** | k8s | k8s pod list watch stream
**Metric** | k8s | k8s pod status & metric stream
**Pod Log** | k8s | k8s pod log stream
**Pod Event (New)** | k8s | k8s event watch stream, 추후 필요시 활용


## Service + API
Task / Monitoring / Summary Service 정의

### Task Service
Argo Workflow 관리, CD Workflow 수행 및 배포 Pipeline 실행/취소 등

@startuml

left to right direction

Actor Local
rectangle "IC" as ic {
    [DWP Portal] as dwp
}
rectangle "CQ" as cq {
    [Task Service] as task
    [Argo Workflow] as argowf
    [Argo CD] as argocd
    database "Argo Postgresql" as argodb
}

note bottom of task : Python FastAPI \n\n workflow_service_api (from openapi_client) \n\n return json_response

Local ..* dwp
dwp ..* task
task ..* argowf
argowf ..* argodb
argowf ..* argocd

@enduml


#### API List

Type | Detail | Usage 
------------- | ------------- | ------------- 
**Workflow 생성** | submit_workflow | Submit Workflow from WorkflowTemplate (CI, CD Process 수행)
**Workflow List** | list_workflows | App Service Pipeline History 조회 
**Archived Workflow List** | list_archived_workflows | CI, CD Process Log (step별 log) 
**Workflow 취소** | stop_workflow | App. Service 배포 취소
_Workflow 상세_ | get_workflow | 필요 시,,

> Task API docs
<http://hcp-sre-apps-task.hcpic.kubepia.net/docs#/Argo%20Workflow%20API>

#### API Reference

> Argo Workflow Python SDK API Docs 참조
<https://github.com/argoproj/argo-workflows/tree/master/sdks/python/client/docs>

Method | HTTP request | Description
------------- | ------------- | ------------- 
**submit_workflow** | **POST** /api/v1/workflows/{namespace}/submit | 
**list_workflows** | **GET** /api/v1/workflows/{namespace} | 
**list_archived_workflows** | **GET** /api/v1/archived-workflows | 
**stop_workflow** | **PUT** /api/v1/workflows/{namespace}/{name}/stop | 
**get_workflow** | **GET** /api/v1/workflows/{namespace}/{name} | 


### Monitoring Service
SSE Service 를 Monitoring 하는 Service

@startuml

left to right direction

Actor Local
rectangle "IC" as ic {
    [DWP Portal] as dwp
}
rectangle "CQ" as cq {
    [Monitoring Service] as monitor
    [Argo Workflow API] as argowf
    [k8s API] as k8s
    database "Argo Postgresql" as argodb
    database "Argo MinIO" as argominio
}

note bottom of monitor : Python FastAPI \n\n SSEClient (from sseclient) \n\n return EventSourceResponse \n return StreamResponse

Local ..* dwp
dwp ..* monitor: 1. javascript EventSource \n 2. text/event-stream
monitor ..* argowf
argowf ..* argodb
argowf ..* argominio
monitor ..* k8s

@enduml

#### API List

> Monitoring API docs
<http://hcp-sre-apps-monitoring.hcpic.kubepia.net/docs#/Argo%20Workflow%20monitoring%20api>

Type | Detail | Usage | Description
------------- | ------------- | ------------- | -------------
**Workflow Log** | workflow log stream | CI, CD Process Log (Workflow main log) | stream
**Archived Workflow Log** | archived workflow log file | CI, CD Process Log (step별 log) | plain text
**Workflow Status** | workflow status stream | CI, CD Process Status | stream
**Pod List** | k8s pod list watch | App Service detail 의 Pod List 조회 |
**Pod Metric** | k8s pod status stream | App Service detail 의 Pod Metric 및 status 조회 |
**Pod Log** | k8s pod log stream | App Service 의 개별 Pod Log 조회 |
_Pod Event_ | k8s event watch | 추후 활용,,, |

#### API Reference

> Argo Workflow Python SDK API Docs 참조
<https://github.com/argoproj/argo-workflows/tree/master/sdks/python/client/docs>

Method | HTTP request | Description
------------- | ------------- | -------------
**workflow_logs** | **GET** /api/v1/workflows/{namespace}/{name}/log | 
**get_output_artifact_by_uid** | **GET** /artifacts-by-uid/{uid}/{podName}/{artifactName} | 

> Kubernetes client (Python)
<https://github.com/kubernetes-client/python/blob/master/kubernetes/README.md>

Method | Options | Description
------------- | ------------- | -------------
**list_namespaced_pod** | namespace | App. Service pod list watch stream
**read_namespaced_pod_log** | name, namespace | App. Service pod log stream
**list_cluster_custom_object** | metrics.k8s.io/v1beta1 api 명시하여 호출 | App. Service pod metric watch stream
**list_namespaced_event** | namespace, involvedObject | App. Service pod event watch stream


### Summary Service
Argo Workflow / K8S 의 event 를 listen 하여, app별 status data summary
- sse client 를 연결하는 python module 로 개발하여 container 로 실행
- _<u>service 별로 분리할지? 혹은 python multiprocess 활용할지?</u>_

@startuml

left to right direction

rectangle "IC" as ic {
    [DWP Portal] as dwp
    database "Redis" as redis
    [Summary Service] as summary
}
rectangle "CQ" as cq {
    [Monitoring Service] as sse
    [Argo Workflow API] as argowf
    [k8s API] as k8s
}

note right of summary : Python Module \n\n SSEClient (from sseclient) \n\n return EventSourceResponse
note left of sse : Python FastAPI \n\n K8SClient, ArgoClient \n\n return EventSourceResponse

dwp ..* redis
summary ..* redis
summary ..* sse
sse ..* argowf
sse ..* k8s

@enduml


#### Service List

Type | Detail | Usage
------------- | ------------- | -------------
**CI/CD Last Status** | watch_workflows | Insert into Redis App Service list CI/CD status
**Run Status** | k8s pod status | Insert into Redis App Service list Run status

> Argo API List

Method | HTTP request | Description
------------- | ------------- | -------------
**watch_workflows** | **GET** /api/v1/workflow-events/{namespace} | App Service CI/CD workflow event watch stream

> K8S API List

Method | Options | Description
------------- | ------------- | -------------
**read_namespaced_pod_status** | name, namespace | App Service pod status stream
