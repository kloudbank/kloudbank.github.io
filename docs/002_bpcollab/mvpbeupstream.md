---
title: Upstream Process (Backend)
date: 2022-08-02
sidebar: 'auto'
author: 'noisonnoiton'
---

Collab. Portal 의 순거래 관련 Backend 기능에 대한 설계 및 개발.

## Data Flow

순거래 기능 Data Flow Exmaple.
1. Document Data 생성/완료 API 호출
2. Document Data 를 DB 에 저장
3. Interface 기능을 통한 Document type data 변환
4. RDB table data type 으로 저장

@startuml

legend
    |= Legend |
    | <size:16><back:#aqua>MVP target</back></size>|
endlegend

"External User" as extuser
"Internal User" as intuser
node "Channel" as channel {
  rectangle "External Portal" as extportal #aqua
  [Create/Update Doc.] as credoc #aqua
}
node "Private Cloud" as privatecloud {
  rectangle "Internal Portal" as intportal
  database "I/F DB" as ifdb
  [Interface Doc.] as ifdoc #aqua
  database "Document DB" as docdb #aqua
}
node "Legacy Systems" as legacy {
  rectangle "System A" as sysa
  rectangle "System B" as sysb
  rectangle "System C" as sysc
  database "Legacy DB" as legacydb
}

extuser -> extportal
extportal -> credoc #blue: "1"
intportal .d.> docdb
credoc -d-> docdb #blue: "2"
ifdoc .l.> docdb #blue: "3"
ifdoc -> ifdb #blue: "4"
ifdb -d-> legacydb
sysa -u-> legacydb
sysb -u-> legacydb
sysc -u-> legacydb
intuser -d-> intportal

@enduml

## Component View

**Todo** Document data 생성 및 interface example.  
- Document DB 는 MongoDB 기반으로 생성
- History 및 Interface 용 RDB 는 PostgreSQL 기반으로 임의로 생성

### History table based

Document data 생성 및 interface 의 synchronized flow.  
- Document data 생성 및 interface API 호출이 하나의 process 에서 순차적으로 이루어짐
- I/F API 호출에 대한 실행 status 이력 저장

@startuml

circle "Start" as start
circle "End" as end
node "Channel" as channel {
  [Todo API] as todoapi
}
node "Private Cloud" as privatecloud {
  [Interface API] as ifapi
  database "I/F RDB" as ifdb
  database "Document DB" as docdb
  database "History RDB" as histdb
}

start -> todoapi
todoapi -> docdb
todoapi -> ifapi
ifapi ..> docdb
ifapi -u-> "I/F status" histdb
ifapi -> ifdb
ifdb -> end

@enduml

### Queue based

Document data 생성 및 interface 의 queue 기반 process flow.  
- Document data 생성 후 register queue
- Interface subscribe 및 data interface
- I/F 실행 status 이력을 queue 에서 관리

@startuml

circle "Start" as start
circle "End" as end
node "Channel" as channel {
  [Todo API] as todoapi
  queue "Queue" as queue
}
node "Private Cloud" as privatecloud {
  [Interface API] as ifapi
  database "Document DB" as docdb
  database "I/F RDB" as ifdb
}

start -> todoapi
todoapi -> docdb
todoapi -> queue
ifapi ..> docdb
ifapi .u.* "I/F status" queue
ifapi -> ifdb
ifdb -> end

@enduml


## API List

MVP 기능 구현 시 필요한, API 개발 대상 list-up.

### Todo API

MongoDB 에 적재되는 document data **Todo** 의 CRUD 관련 API list.

Name | URI | Method | Remark
----- | ----- | ----- | -----
Todo 생성 | POST | `/todos` | 
Todo 목록 | GET | `/todos` | 
Todo 조회 | GET | `/todos/{todoid}` | 
Todo 수정 | PUT | `/todos/{todoid}` | 
Todo 삭제 | DELETE | `/todos/{todoid}` | 
Todo 완료 (upstream) | POST | `/todos/{todoid}/complete/upstream` | Todo status 완료 처리 및 interface 연계 용도
Todo 완료 (upstream) queueing | POST | `/todos/{todoid}/complete-queue/upstream` | Todo status 완료 처리 queueing producer

### Interface API

MongoDB 적재 data interface 를 위한 API List

Name | URI | Method | Remark
----- | ----- | ----- | -----
Interface Upstream | POST | `/interface/{todoid}/upstream` | Transform data type and interface (Document to RDB)

### Interface Consumer

Queue subscribe 및 data interface 를 수행하는 consumer

Name | Processor (Queue) | Process (Key) | Remark
----- | ----- | ----- | -----
Upstream Consumer | `todo-completed` | `upstream` | Subscribe queue and transform data type and interface (Document to RDB)

## Data Model Design

Data Model Sample 설계 내역.

### Todo Collection

MongoDB 적재용 document data sample schema.

::: tip
  - MongoDB 내부적으로 document 고유의 ObjectId type 의 **_id** 를 생성
  - Mongoose timestamp 설정으로 **createdAt, updatedAt** 자동 생성
:::
  
Collection Name | Field Name | Data Type | Required | Unique
----------------|-----------|-----------|----------|-------------
todos           | todoid     | Number    | True     | True
todos           | content    | Map       | True     | False
todos           | completed  | String    | True     | False

- Sample data of documents

```json
{
  "todoid": 54,
  "content": {
    "title": "Hello",
    "bp-test": {
      "id": 1,
      "name": "bp-name"
    },
    "template": {
      "type": "survey",
      "if": "rdb"
    },
    "fields": {
      "date": "2022-01-01",
      "qty": "100",
      "etc": {
        "code": 200,
        "status": {
          "enabled": true,
          "message": "test"
        }
      },
      "answer_dict": {
        "a": "answer a",
        "b": "answer b"
      },
      "answer_list": [
        {
          "a": "answer a"
        },
        {
          "b": "answer b"
        }
      ]
    },
    "attach-list": [
      "list001",
      "list002",
      "list003"
    ]
  },
  "completed": false
}
```

### Interface RDB Table

Interface data 적재용 RDB table sample schema.

Table Name | Column Name | Data Type | Required | Unique
-----------|-----------|-----------|----------|-------------
if_todos   | todoid    | number   | True     | True
if_todos   | key       | string   | True     | True
if_todos   | value     | string   | True     | False

- Sample data of RDB table

|todoid|key|value|
|------|---|-----|
|54|title|Hello|
|54|bp-test&#124;&#124;id|1|
|54|bp-test&#124;&#124;name|bp-name|
|54|template&#124;&#124;type|survey|
|54|template&#124;&#124;if|rdb|
|54|fields&#124;&#124;date|2022-01-01|
|54|fields&#124;&#124;qty|100|
|54|fields&#124;&#124;etc&#124;&#124;code|200|
|54|fields&#124;&#124;etc&#124;&#124;status&#124;&#124;enabled|true|
|54|fields&#124;&#124;etc&#124;&#124;status&#124;&#124;message|test|
|54|fields&#124;&#124;answer_dict&#124;&#124;a|answer a|
|54|fields&#124;&#124;answer_dict&#124;&#124;b|answer b|
|54|fields&#124;&#124;answer_list&#124;&#124;0&#124;&#124;a|answer a|
|54|fields&#124;&#124;answer_list&#124;&#124;1&#124;&#124;b|answer b|
|54|attach-list&#124;&#124;0|list001|
|54|attach-list&#124;&#124;1|list002|
|54|attach-list&#124;&#124;2|list003|

## Development

Backend Service 개발 내역 정리.

### Source code repository

- MVP Service (hcp-bpcp-backend-mvp)
  - Github Repository: <https://github.com/hcp-bpcp/hcp-bpcp-backend-mvp>
  - 주요 기능:
    - MongoDB Collection CRUD API 제공
    - Todo data 완료 처리
    - MVP Interace API 연계
    - MVP Interface queueing process 연계

- MVP Interface Service (hcp-bpcp-backend-mvp-interface)
  - Github Repository: <https://github.com/hcp-bpcp/hcp-bpcp-backend-mvp-interface>
  - 주요 기능:
    - Document data type trasformation
    - RDB table data 생성 및 수정
    - Data interface API endpoint 제공
    - MVP Interface queueing 시, subscribe and interface process 수행

- Auth Service (hcp-bpcp-backend-auth)
  - Github Repository: <https://github.com/hcp-bpcp/hcp-bpcp-backend-auth>
  - 주요 기능:
    - Ingress 기반 auth-url 의 인증 API endpoint 제공
    - Redis cache 기반 token data 관리 기능
    - JWT Token 인증 process 수행

### Admin URL

- API Docs.
  - MVP Service: <https://hcp-bpcp-backend-mvp.bpcp.kubepia.net/api-docs/>
  - MVP Interface Service: <https://hcp-bpcp-backend-mvp-interface.bpcp.kubepia.net/api-docs/>
  - Auth Service: <https://hcp-bpcp-backend-auth.bpcp.kubepia.net/api-docs/>

- Monitoring
  - Bull Dashboard: <https://hcp-bpcp-backend-mvp.bpcp.kubepia.net/admin/queues/>

## Deployment View

Cluster deployment view.

### API Sync Model

- MVP service 호출 시, ingress auth-url 기반 인증
- MVP <-> MVP Interface 등 backend service 간 API 연계는 k8s service name 기반으로 요청 **<u>(인증 없음)</u>**

@startuml
scale max 1200 width
scale max 600 height
' skinparam nodesep 10
' skinparam ranksep 10

' Kubernetes
!define KubernetesPuml https://raw.githubusercontent.com/dcasati/kubernetes-PlantUML/master/dist

!includeurl KubernetesPuml/kubernetes_Common.puml
!includeurl KubernetesPuml/kubernetes_Context.puml
!includeurl KubernetesPuml/kubernetes_Simplified.puml

!includeurl KubernetesPuml/OSS/KubernetesSvc.puml
!includeurl KubernetesPuml/OSS/KubernetesPod.puml
!includeurl KubernetesPuml/OSS/KubernetesIng.puml

' Kubernetes Components

Cluster_Boundary(cluster, "Channel") {
  circle "Frontend App." as feapp

  Namespace_Boundary(beappns, "Backend App.") {
    KubernetesIng(ingauth, "auth-ingress", "")
    KubernetesIng(ingmvp, "mvp-ingress", "")
    KubernetesSvc(svcauth, "auth-service", "")
    KubernetesSvc(svcmvp, "mvp-service", "")
    KubernetesSvc(svcmvpif, "mvpif-service", "")
    KubernetesPod(podauth, "auth-pod", "")
    KubernetesPod(podmvp, "mvp-pod", "")
    KubernetesPod(podmvpif, "mvpif-pod", "")
  }
  Namespace_Boundary(mongons, "MongoDB") {
    database "Document" as mongodb
  }
  Namespace_Boundary(postgrens, "PostgreSQL") {
    database "RDB I/F Tables" as rdbtabs
  }

  Rel_R(ingauth, svcauth, " ")
  Rel(ingmvp, ingauth, "Auth check")
  Rel(ingauth, ingmvp, " ")
  Rel_R(ingmvp, svcmvp, " ")
  Rel_R(svcauth, podauth, " ")
  Rel_R(svcmvp, podmvp, " ")
  Rel(podmvp, svcmvpif, " ")
  Rel_R(svcmvpif, podmvpif, " ")

  podmvp -r-> mongodb
  podmvpif .r.> mongodb
  podmvpif -d-> rdbtabs

  feapp -r-> ingmvp
}

@enduml

### Queueing Model

- MVP service 호출 시, ingress auth-url 기반 인증
- <u>MVP Backend Service 간 API 호출 없음</u>


@startuml
scale max 1200 width
scale max 600 height
' skinparam nodesep 10
' skinparam ranksep 10

' Kubernetes
!define KubernetesPuml https://raw.githubusercontent.com/dcasati/kubernetes-PlantUML/master/dist

!includeurl KubernetesPuml/kubernetes_Common.puml
!includeurl KubernetesPuml/kubernetes_Context.puml
!includeurl KubernetesPuml/kubernetes_Simplified.puml

!includeurl KubernetesPuml/OSS/KubernetesSvc.puml
!includeurl KubernetesPuml/OSS/KubernetesPod.puml
!includeurl KubernetesPuml/OSS/KubernetesIng.puml

' Kubernetes Components

Cluster_Boundary(cluster, "Channel") {
  circle "Frontend App." as feapp

  Namespace_Boundary(beappns, "Backend App.") {
    KubernetesPod(podmvpif, "mvpif-pod", "")
    KubernetesIng(ingauth, "auth-ingress", "")
    KubernetesIng(ingmvp, "mvp-ingress", "")
    KubernetesSvc(svcauth, "auth-service", "")
    KubernetesSvc(svcmvp, "mvp-service", "")
    KubernetesPod(podauth, "auth-pod", "")
    KubernetesPod(podmvp, "mvp-pod", "")
  }
  Namespace_Boundary(mongons, "MongoDB") {
    database "Document" as mongodb
  }
  Namespace_Boundary(redisns, "Redis") {
    queue "Queue" as redisqueue
  }
  Namespace_Boundary(postgrens, "PostgreSQL") {
    database "RDB I/F Tables" as rdbtabs
  }

  Rel_D(ingauth, svcauth, " ")
  Rel(ingmvp, ingauth, "Auth check")
  Rel(ingauth, ingmvp, " ")
  Rel_D(ingmvp, svcmvp, " ")
  Rel_R(svcauth, podauth, " ")
  Rel_R(svcmvp, podmvp, " ")

  podmvp -r-> redisqueue
  podmvp -r-> mongodb

  podmvpif .d.* redisqueue
  podmvpif .d.> mongodb
  podmvpif -d-> rdbtabs

  feapp -r-> ingmvp
}

@enduml

