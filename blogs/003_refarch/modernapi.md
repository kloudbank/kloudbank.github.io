---
title: Modern API
date: 2021-12-17
tags:
- REST API
categories: 
 - Ref. Arch.
sidebar: 'auto'
author: 'jaemyeong.lee'
---

- Database 를 기반으로 개발되는 Backend Service 를 빠르게 개발하는 목적으로 개발
- 대부분 PostgreSQL 을 기반으로 개발되어 있다.
- code 를 전혀 개발하지 않고도 Table, View, Join 을 처리할 수 있다.
- 관리를 위한 UI 기능을 제공하는 것도 있다.
- 유료 SaaS 를 제공하는 것도 있다.

## PostgREST
- https://postgrest.org/
- PostgREST 는 PostgreSQL 을 기반으로 REST API 를 심플하게 제공한다.
- PostgreSQL 을 내장하고 있고 다른 Database 는 지원하지 않는다.

### 아키텍처
![PostgREST Architecture](./images/postgrest_archi.png)

### 특징
- PostgreSQL 기반 REST API
- 권한관리는 postgresql 의 role 로 처리
- table & view 에 대한 rest api 제공, CRUD
- full-text-search 가능
- json-data 조회 및 필터 가능
- Big table 에 대한 limit 설정
- 다양한 response format 지원(json, svc 등)
- table & view join 지원
- partition table 지원
- 테이블 형태를 리턴하는 procedure/function 지원
- json, csv 데이터 bulk insert 기능
- binary data 지원

### 단점
- PostgreSQL 만 지원
- join 처리를 위해서는 Table 에 FOREIGN KEY constraints 가 있어야 함
- url base 의 제약사항 때문에 query 문법이 직관적이지 않음

### 주요기능
- REST API Query
  - Table Query, Field Selector
    ![Table Query](./images/2021-12-17-15-55-21.png)
- Table & View Join
  - ER-Diagram
    ![ER-Diagram](./images/2021-12-17-15-53-07.png)
  - Table Join Query
    ![Table Join Query](./images/2021-12-17-15-55-56.png)
- Reponse Format
  - 여러가지 Response Format 지원
    ![Reponse Format](./images/2021-12-17-15-59-58.png)

## Supabase
- https://supabase.com/
- PostgREST 를 기반으로 Database 와 Storage(file) 을 통합관리하는 플랫폼이다.
- PostgreSQL 을 내장하고 있고 다른 Database 는 지원하지 않는다.
- SaaS 형태로만 제공하고 있다.

### 아키텍처
![Supabase 아키텍처](./images/2021-12-17-16-05-01.png)

### 특징
- Database & Storage Management Platform
- Project 단위로 관리됨
- PostgREST 의 기능을 그대로 가지고 있음
- GraphQL 을 지원함
- S3 기반의 Storage 기능 제공
- UI, REST API 제공
- Javascript, Python, Nodejs 등 UI 용 SDK 제공
- 기존 PostgreSQL Migration 지원
- Oauth Authentication 지원

### 단점
- SaaS 만 지원
- PostgreSQL 만 지원
- REST API & SDK Learning Curve

### 주요기능
- UI 에서 제공되는 기능
  - Table Data 관리
   ![Table Data 관리](./images/2021-12-17-16-06-33.png)
  - Storage 관리
    ![Storage 관리](./images/2021-12-17-16-07-47.png)
  - Database 관리
    ![Database 관리](./images/2021-12-17-16-10-11.png)
- SDK 지원
  - Javascript SDK
    ![Javascript SDK](./images/2021-12-17-16-13-04.png)
  - 그외 SDK
    ![그외 SDK](./images/2021-12-17-16-14-56.png)

## Hasura
- https://hasura.io/
- 자체적으로 GraphQL Engine 이라고 예기한다.
- 다른 제품들과 다르게 PostgreSQL 를 포함해서 MS-SQL 등 다른 Database 를 사용할 수 있다.

### 아키텍처
![Hasura 아키텍처](./images/2021-12-17-16-30-10.png)

### 특징
- GraphQL Engine 
- Docker Image 와 SaaS 를 같이 지원
- PostgreSQL, MS SQL, Citus/Hyperscale, BigQuery 지원, 계속 추가중
- Table 관리, GraphQL 을 UI 에서 지원
- Join 을 처리하기 위해서 FK 가 없어도 됨, Relationship 설정으로 처리
- GraphQL 을 사용
- API Service 에 filter(action) 설정 기능, 인증 등
- Database 의 변경을 event 로 수집/전달 기능, Trigger
- Schedule Trigger 기능
- REST API, CLI 제공

### 단점
- Database 관리 기능은 없음
- SDK 는 없음

### 주요기능
- UI 기능
  - API 테스트
    ![API 테스트](./images/2021-12-17-16-17-51.png)
  - Database 연결 및 관리
    ![](./images/2021-12-17-16-18-26.png)
  - Action 관리
    ![Action 관리](./images/2021-12-17-16-19-15.png)
  - 모니터링
    ![모니터링](./images/2021-12-17-16-19-46.png)
- GraphQL
  ![GraphQL](./images/2021-12-17-16-24-53.png)
- CLI
  ![CLI](./images/2021-12-17-16-26-37.png)
- 지원 Database
  ![지원 Database](./images/2021-12-17-16-24-05.png)
  ![Cloud Database](./images/2021-12-17-16-29-07.png)
- SaaS 제공
  ![SaaS 제공](./images/2021-12-17-16-21-40.png)
