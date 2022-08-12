---
title: Downstream Process (Backend)
date: 2022-08-11
sidebar: 'auto'
author: 'noisonnoiton'
---

Collab. Portal 의 역거래 관련 Backend 기능에 대한 설계 및 개발.

## Data Flow

역거래 기능 Data Flow Exmaple.
1. User 접속 및 gateway 를 통한 websocket 연결
2. Document 생성/수정 및 저장 API 호출
3. Document Data 를 DB 에 저장
4. Event push API 호출하여 gateway 에 event 전달
5. 특정 client 에만 websocket event push
6. Websocket event 수신하여 후속 process 수행


@startuml

legend
    |= Legend |
    | <size:16><back:#aqua>MVP target</back></size>|
endlegend

"External User" as extuser
"Internal User" as intuser
node "Channel" as channel {
  rectangle "External Portal" as extportal #aqua
  [Push API] as push #aqua
  [Gateway] as gateway #aqua
  queue "websocket" as sock #aqua
}
node "Private Cloud" as privatecloud {
  rectangle "Internal Portal" as intportal
  [Create/Update Doc.] as credoc #aqua
  database "Document DB" as docdb #aqua
}

extuser .> extportal
extportal -> gateway #blue: "1" 
gateway <-d-> sock  #blue
intportal -d-> credoc #blue: "2"
credoc -> docdb #blue: "3"
credoc -u-> push #blue: "4"
push -l-> gateway #blue: "5"
extportal <- gateway #blue: "6"
intuser -d-> intportal

@enduml

## Component View

**Todo** Document data 생성 및 websocket event push example.  
- Websocket server 연결을 위한 Nest Gateway 생성
- Document DB 는 MongoDB 기반으로 생성
- Websocket 연결 client 정보를 Redis cache 기반으로 관리

@startuml

circle "Start" as start
circle "End" as end
node "Channel" as channel {
  [Event Gateway] as eventgw
  [Event API] as eventapi
  database "Cache DB" as cachedb
}
node "Private Cloud" as privatecloud {
  [Todo API] as todoapi
  database "Document DB" as docdb
}

start -d-> todoapi
todoapi -d-> docdb
todoapi -l-> eventapi
eventapi -d-> eventgw
eventapi .> cachedb
eventgw <-> cachedb
eventgw -l-> end

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
Todo 완료 (downstream) | POST | `/todos/{todoid}/complete/downstream` | Todo status 완료 처리 및 Event API 연계 용도

### Event API

Websocket gateway 기반 event emitting, broadcasting 을 위한 API list.

Name | URI | Method | Remark
----- | ----- | ----- | -----
Event 발생 (broadcast) | POST | `/events/downstream` | Socket event broadcasting
Event user 기준 발생 (emitting) | POST | `/events/{userid}/downstream` | Socket event emitting

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
todos           | userid     | String    | True     | True
todos           | content    | Map       | True     | False
todos           | completed  | String    | True     | False

- Sample data of documents

```json
{
  "todoid": 87,
  "userid": "test001",
  "content": {
    "title": "",
    "bp-test": {
      "id": 1,
      "name": ""
    },
    "template": {
      "type": "",
      "if": ""
    },
    "fields": {
      "date": "",
      "qty": 0,
      "etc": {
        "code": 0,
        "status": {
          "enabled": null,
          "message": ""
        }
      },
      "answer_dict": {
        "a": "",
        "b": ""
      },
      "answer_list": [
        {
          "a": ""
        },
        {
          "b": ""
        }
      ]
    },
    "attach-list": []
  },
  "completed": false
}
```

### Cache Key

Websocket 연결 client 및 socketId 등을 관리하기 위한 Key 설계 내역.

Key Name | Type | Element Key Name | Unique
-----------|-----------|-----------|----------
client-list | `Array`    | userId   | True
client-list | `Array`    | socketId   | False
client-list | `Array`    | lastConnectedTime   | False

- Sample data of RDB table

```json
[
    {
        "userId": "test002",
        "socketId": "3R7cDMRJZk6_acU9AAAH",
        "lastConnectedTime": "2022-08-11T06:44:31"
    },
    {
        "userId": "test001",
        "socketId": "r3zmjlRAYTv98CxyAAAD",
        "lastConnectedTime": "2022-08-11T06:44:02"
    }
]
```

## Development

Backend Service 개발 내역 정리.

### Source code repository

- MVP Service (hcp-bpcp-backend-mvp)
  - Github Repository: <https://github.com/hcp-bpcp/hcp-bpcp-backend-mvp>
  - 주요 기능:
    - MongoDB Collection CRUD API 제공
    - Todo data 완료 처리
    - MVP Event API 연계

- MVP Interface Service (hcp-bpcp-backend-mvp-event)
  - Github Repository: <https://github.com/hcp-bpcp/hcp-bpcp-backend-mvp-event>
  - 주요 기능:
    - Websocket Gateway
    - Redis cache 기반 websocket client 정보 관리
    - Websocket event emitting, broadcasting
    - Event API endpoint 제공

- Auth Service (hcp-bpcp-backend-auth)
  - Github Repository: <https://github.com/hcp-bpcp/hcp-bpcp-backend-auth>
  - 주요 기능:
    - Ingress 기반 auth-url 의 인증 API endpoint 제공
    - Redis cache 기반 token data 관리 기능
    - JWT Token 인증 process 수행

### Admin URL

- API Docs.
  - MVP Service: <https://hcp-bpcp-backend-mvp.bpcp.kubepia.net/api-docs/>
  - MVP Event Service: <https://hcp-bpcp-backend-mvp-event.bpcp.kubepia.net/api-docs/>
  - Auth Service: <https://hcp-bpcp-backend-auth.bpcp.kubepia.net/api-docs/>

- Monitoring 및 Test
  - Socket.IO Admin: <https://hcp-bpcp-socketio-admin.bpcp.kubepia.net>
  - Socket.IO Client: <https://hcp-bpcp-socketio-client.bpcp.kubepia.net>

## Deployment View

Cluster deployment view.

### API Sync Model

- MVP service 호출 시, ingress auth-url 기반 인증
- Ingress URL 기반 Websocket gateway 연결
  - auth-url 기반 인증 없음
  - `websocket-services` 관련 ingress annotation 설정
  ```yaml
    nginx.ingress.kubernetes.io/websocket-services: hcp-bpcp-backend-mvp-event
    nginx.org/websocket-services: hcp-bpcp-backend-mvp-event
    nginx.ingress.kubernetes.io/proxy-read-timeout: "3600"
    nginx.ingress.kubernetes.io/proxy-send-timeout: "3600"
    nginx.ingress.kubernetes.io/proxy-body-size: 8m
  ```
- MVP <-> MVP Event 등 backend service 간 API 연계는 k8s service name 기반으로 요청 **<u>(인증 없음)</u>**

@startuml
'scale max 1800 width
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
  circle "Socket.IO Admin" as socketioadmin
  circle "Socket.IO Client" as socketioclient

  Namespace_Boundary(beappns, "Backend App.") {
    KubernetesIng(ingauth, "auth-ingress", "")
    KubernetesIng(ingmvp, "mvp-ingress", "")
    KubernetesIng(ingmvpevent, "event-ingress", "")
    KubernetesSvc(svcauth, "auth-service", "")
    KubernetesSvc(svcmvp, "mvp-service", "")
    KubernetesSvc(svcmvpevent, "event-service", "")
    KubernetesPod(podauth, "auth-pod", "")
    KubernetesPod(podmvp, "mvp-pod", "")
    KubernetesPod(podmvpevent, "event-pod", "")

    Rel_R(ingauth, svcauth, " ")
    Rel(ingmvp, ingauth, "Auth check")
    Rel(ingauth, ingmvp, " ")
    Rel_R(ingmvp, svcmvp, " ")
    Rel_R(svcauth, podauth, " ")
    Rel_R(svcmvp, podmvp, " ")
    Rel_R(ingmvpevent, svcmvpevent, " ")
    Rel(podmvp, svcmvpevent, " ")
    Rel_R(svcmvpevent, podmvpevent, " ")
  }
  Namespace_Boundary(mongons, "MongoDB") {
    database "Document" as mongodb
  }
  Namespace_Boundary(redisns, "Redis") {
    database "Redis Cache" as rediscache
  }

  Rel(podmvp, mongodb, " ")
  Rel_D(podmvpevent, rediscache, " ")

  feapp -r-> ingmvp
  feapp -r-> ingmvpevent
  socketioadmin -u-> ingmvpevent
  socketioclient -u-> ingmvpevent
}

@enduml
