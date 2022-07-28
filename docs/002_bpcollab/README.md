---
title: Overview
date: 2022-07-27
sidebar: 'auto'
author: 'noisonnoiton'
---

## BP Collaboration Portal
- BP 협업 Portal 의 Backend / Frontend tech. set 검증 및 활용 방안
- 외부 Portal MVP 기능 설계 및 개발
- Github Organization: <https://github.com/hcp-bpcp>

## Tech. set 검토 목록

항목 | 분류 | 검토 대상 | 검토 내용
----|-----|---------|---------
**Backend** | Framework | NestJS<br/>Express | - Node.js 기반 Backend 개발 표준 Framework 개발<br/>- 공통 Module 개발 (Logging, API document 관리 등)
&nbsp; | NoSQL + ODM | MongoDB + Mongoose | - Document type Data 관리 기능 검토<br/>- NestJS + Mongoose 기반 CRUD 기능 개발
&nbsp; | RDB + ORM | PostgreSQL + TypeORM /  Prisma | - RDB Data 관리 위한 ORM 검토<br/>- PostgreSQL 및 Oracle DB Data CRUD 기능 개발
&nbsp; | Authentication | JWT Token | - Backend API 호출 인증 (Ingress auth-url 기반)<br/>- 사용자 Access 권한 만료 정보 관리 및 token refresh
&nbsp; | Headless CMS | PostgREST<br/>Directus | - RDB 단순 활용 기능 개발 시, Entity 정의 및 API 활용 검토<br/>- PostgreSQL Data CRUD 기능 검토 및 호환성 검토
**Frontend** | Framework | React<br/>Next.js | - Node.js 기반 Backend 개발 표준 Framework 개발<br/>- 공통 Module 개발 (Logging, API document 관리 등)
&nbsp; | State Mgmt. | SWR, React Query, Redux, Recoil | - server state, local state management 고려<br/>- 개발자 사용성 고려<br/>- local state 도 SWR로 관리
&nbsp; | CSS Fwk. | Tailwind CSS | - 직관적인 사용성<br/>- 개발자, 퍼블리셔 러닝커브 확인 등
&nbsp; | Fetcher | Fetch API,Axios | - 사용성 기반 고려<br/>- 커스터마이징, 부가기능


## MVP 관련 검토

- NestJS 기반 Portal Backend API 개발
- Next.js 기반 Portal 화면 개발
- 확장 가능한 RDB Data Interface (Marshalling / Unmarshalling)
- 사용자 세션 및 인증 프로세스
- UI Builder 연계
