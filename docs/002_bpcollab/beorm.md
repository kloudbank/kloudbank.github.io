---
title: RDB + ORM
date: 2022-07-29
sidebar: 'auto'
author: 'noisonnoiton'
---

RDB PostgreSQL 기반, node.js ORM 기능 검토.

## ORM 검토 내역

Nest 에서는 Node.js package 로 제공하는 모든 ORM 을 활용하는 것이 가능.
대부분이 myBatis 와 같이 SQL mapper 기반으로 동작하지는 않지만, Nest + Typescript 기반 호환, Oracle 호환, Raw SQL 활용 등에 유리한 ORM 을 사용하기 위해 검토하였음.

### TypeORM vs Sequelize

TypeORM은 Node.js 생태계에서 TypeScript를 완전히 지원하기 시작한 최초의 ORM.

<https://tkssharma.com/nodejs-orm-sequelize-typeorm>

### TypeORM vs Prisma

## Nest + TypeORM

### Nest 제공 package 활용

<https://docs.nestjs.com/techniques/database#typeorm-integration>

### Basic typeorm package 활용

<https://docs.nestjs.com/recipes/sql-typeorm>


## REST API

### Entity 정의

### Basic CRUD

### Raw SQL 활용
