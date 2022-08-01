---
title: Upstream Process (Backend)
date: 2022-08-01
sidebar: 'auto'
author: 'noisonnoiton'
---

Collab. Portal 의 순거래 관련 Backend 기능에 대한 설계 및 개발.

## Data Flow

순거래 기능 Data Flow Exmaple.

@startuml

legend
    |= Legend |
    | <size:16><back:#aqua>MVP target</back></size>|
endlegend

"External User" as extuser
"Internal User" as intuser
node "Channel" as channel {
  rectangle "External Portal" as extportal #aqua
  [Create Doc] as credoc #aqua
  [Interface Doc.] as ifdoc #aqua
  database "Document DB" as docdb #aqua
}
node "Private Cloud" as privatecloud {
  rectangle "Internal Portal" as intportal
  database "I/F DB" as ifdb
}
node "Legacy Systems" as legacy {
  rectangle "System A" as sysa
  rectangle "System B" as sysb
  rectangle "System C" as sysc
  database "Legacy DB" as legacydb
}

extuser -> extportal #blue
extportal -> docdb #blue
extportal -> credoc #blue
intportal -d-> ifdb
credoc -d-> docdb #blue
ifdoc -l-> docdb
ifdoc -> ifdb #blue
ifdb -> legacydb
sysa -d-> legacydb
sysb -d-> legacydb
sysc -d-> legacydb
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
  [Interface API] as ifapi
  database "Document DB" as docdb
  database "History RDB" as histdb
}
node "Private Cloud" as privatecloud {
  database "I/F RDB" as ifdb
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
  [Interface API] as ifapi
  database "Document DB" as docdb
  queue "Queue" as queue
}
node "Private Cloud" as privatecloud {
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

MongoDB 에 적재되는 document data **Todo** 의 CRUD 관련 API List.

Name | URI | Method | Remark
----- | ----- | ----- | -----
Todo 생성 | POST | `/todos` | 
Todo 목록 | GET | `/todos` | 
Todo 조회 | GET | `/todos/{todoid}` | 
Todo 수정 | PUT | `/todos/{todoid}` | 
Todo 삭제 | DELETE | `/todos/{todoid}` | 
Todo 완료 | PUT | `/todos/{todoid}/complete` | Todo status 완료 처리 및 Interface 연계 용도

### Interface API

Name | URI | Method | Remark
----- | ----- | ----- | -----
Interface Upstream | POST | `/interface/upstream` | Transform data type and Interface (Document to RDB)

## Data Model Design

Data Model Sample 설계 내역.

### Todo Collection

MongoDB 적재용 document data sample schema.

::: tip
  - MongoDB 내부적으로 Document 고유의 ObjectId type 의 **_id** 를 생성
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

## Deployment View

