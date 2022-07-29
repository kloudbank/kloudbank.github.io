---
title: RDB + ORM
date: 2022-07-29
sidebar: 'auto'
author: 'noisonnoiton'
---

RDB PostgreSQL 기반, node.js ORM 기능 검토.

## ORM 검토

Nest 에서는 Node.js package 로 제공하는 모든 ORM 을 활용하는 것이 가능. 대부분이 myBatis 와 같이 SQL mapper 전용으로 동작하지는 않으며, 높은 수준의 추상화를 목표로 하고 있음.  
아래 내용을 기준으로 검토하여, **TypeORM** 을 활용하기로 결정.

- Nest + Typescript 기반 호환
- Raw SQL 활용
- Documentation 수준
- _<u>Oracle 호환</u>_

### TypeORM vs Sequelize

TypeORM 의 경우 loosely coupled, scalable 이 장점으로 생각되며, Sequelize 는 solid transaction, read replication 등의 performance 의 우수함이 장점으로 보여짐.

- Functional 관점의 비교
  - 기본적으로 Schema 정의, Data manipulation, Migration 등의 기능은 모든 ORM 이 공통적으로 제공
  - Active Record
    - 정의한 Entity 기준으로, ORM 자동 생성 내장 객체를 활용하는 방식
    - 편의성은 높으나, 확장성은 떨어짐
  - Data Mapper
    - Entity 와 별도로 Repository 를 Entity 기준으로 생성하여, 해당 Repository 에서 제공하는 객체를 활용
    - Repository 를 Customization 하여 확장할 수 있음
  - 결정적으로 Sequelize 는 **<u>Oracle 지원이 미흡한 부분이 있어서 검토 대상에서 제외</u>**

&nbsp;           | TypeORM | Sequelize
-----------------|:---------:|:--------------:
Table Schema 정의 | O | O
Table Record 조작 | O | O
Transaction 처리 | O | O 
Raw SQL | O | O
Active Record 지원 | O | O 
Data Mapper 지원 | O | X
Oracle 지원 | O | △ (별도 package 설치 필요)

- 기타 참고 문서
<https://tkssharma.com/nodejs-orm-sequelize-typeorm>


### TypeORM vs Prisma

Prisma 는 공식 문서에서도, 기존 ORM 과는 다른 차세대 ORM 이라는 점을 강조하고 있음. 또한, 기존 ORM 과의 비교 자료도 공식 문서에서 제공.

- Prisma features
  - Migration 도구
  - Prisma Client 및 CLI
  - Prisma Studio (UI 관리 도구)
  - Data model 정의 부터 높은 수준의 추상화 class 제공
  - Data Mapper 와 유사한 기능을 제공

- TypeORM vs Prisma (Prisma 공식 문서)
<https://www.prisma.io/docs/concepts/more/comparisons/prisma-and-typeorm>

성능 측면에서도 기존 ORM 보다는 더 우수할 것으로 예상되나,,, **<u>아직 reference 가 많지 않고, Prisma 의 장점인 modeling 혹은 migration 도구 활용에 대한 필요성이 없으며, 결정적으로 Oracle 지원이 불가하여 검토 대상에서 제외.</u>**

- Prisma Concepts 관련 문서
<https://www.prisma.io/docs/concepts/overview/prisma-in-your-stack/is-prisma-an-orm#prisma>


## Nest + TypeORM

Nest 에서 TypeORM 을 활용하는 방식.  
_<u>Nest 제공 module 인 `@nestjs/typeorm` 을 활용하지 않는 방향으로 결정하였음.</u>_

### Basic typeorm package 활용

`typeorm` package 와 database connect driver package 를 활용하여, Nest 의 module 형태로 정의하고 이를 활용하는 방식.

- 장점
  - Database connection 을 관리하는 module, provider 를 별도로 정의하여, Nest module 에 대한 dependency 감소
  - Multiple data source 에 대한 관리 용이
- 단점
  - Database 관련 module 을 직접 정의해야 하는 번거로움.

- 참고 문서
<https://docs.nestjs.com/recipes/sql-typeorm>

### Nest 제공 package 활용

`@nestjs/typeorm`, `typeorm` package 와 database connect driver package 를 활용.  

- 장점
  - `@nestjs/typeorm` 의 TypeOrmModule 이라는 기본 class 를 import 하여, Database module import 가능
  - `forRoot`, `forFeature` 등을 활용하여, 각 resource 에서 간단하게 import 하여 사용 가능
- 단점
  - Nest 제공 module 에 대한 dependency 증가
  - 검증 과정에서 `@nestjs/typeorm` 과 `typeorm` 의 version issue 발생

- 참고 문서
<https://docs.nestjs.com/techniques/database#typeorm-integration>


## REST API

간단한 User Entity 정의 및 CRUD 를 위한 REST API, raw SQL 활용 sample 개발 내역.  
RDB 는 **PostgreSQL** 활용.

::: tip
  Nest TypeORM Recipe
  <https://docs.nestjs.com/recipes/sql-typeorm>
:::

### Repository

TypeORM 기반 sample 및 Prisma sample code 도 test 용도로 추가되어 있음.

- Github Repository
<https://github.com/hcp-bpcp/hcp-bpcp-backend-v1>

### Database Module 정의

Nest framework `src` directory 하위에, database module 및 provider 를 관리하기 위한 `database` directory 구성.

- database module 관리 directory 구조
```
src/database/postgresql
├── postgresql.module.ts
├── postgresql.providers.ts
```

- postgresql.providers.ts
  - 'DATA_SOURCE' 라는 이름으로 provide 되며, 각 resource 의 module 에서 해당 이름으로 import 가능
  - factory 를 async 방식으로 정의하여야, `process.env` config 환경 변수를 활용할 수 있음
  - Entity synchronize 는 실제 개발 / 운영 환경에서는 사용하지 않을 예정
```ts
import { DataSource } from 'typeorm';

export const postgresqlProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: 'postgres',
        schema: process.env.SCHEMA_NAME,
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE),
      });

      return dataSource.initialize();
    },
  },
];
```

- postgresql.module.ts
  - postgresql provider를 export
  - 해당 module 을 각 resource 에 import 하여 TypeORM repository 활용 가능
```ts
import { Module } from '@nestjs/common';
import { postgresqlProviders } from './postgresql.providers';

@Module({
  providers: [...postgresqlProviders],
  exports: [...postgresqlProviders],
})
export class PostgresqlModule {}
```

### Entity 정의

- Entity 및 Repository 정의를 위한 directory 구조
```
src/api/v1/users/entities
├── users.entity.ts
└── users.providers.ts
```

- users.entity.ts
  - typeorm 의 entity 를 정의하기 위한 class
  - Data Mapper 기반 repository 를 활용하기 위해, Entity 의 추가적인 extends 는 필요 없음
```ts
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'userid', length: 255 })
  userId: string;

  @Column({ length: 255 })
  password: string;

  @Column({ name: 'firstname', length: 255 })
  firstName: string;

  @Column({ name: 'lastname', length: 255 })
  lastName: string;

  @Column({ length: 255, nullable: true })
  email: string;
}
```

- users.providers.ts
  - 'USER_REPOSITORY' 라는 이름으로 provide 됨을 명시
  - Entity 와의 data mapper 용도인 repository 를 제공
```ts
import { DataSource } from 'typeorm';
import { User } from './users.entity';

export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];
```

- users.module.ts
  - UserModule 에 database module 및 userProviders 를 providers 로 정의하여 활용
```ts
...
@Module({
  imports: [PostgresqlModule],
  providers: [...userProviders, UsersService],
  controllers: [UsersController],
})
...
```

### Basic CRUD

REST API sample code 정의

- Users API 전체 resource directory 구조
  - controller 에서 API Endpoint 정의
  - service 에서 TypeORM repository 를 활용한 data manipulation code 개발
  - DTO 를 정의하여, Entity 에 access 하기위한 schema 정의
  - `@ApiTag`, `@ApiProperty` 등 swagger 관련 설정 추가
```
src/api/v1/users
├── dto
│   ├── create-user.dto.ts
│   └── update-user.dto.ts
├── entities
│   ├── users.entity.ts
│   └── users.providers.ts
├── users.controller.ts
├── users.module.ts
└── users.service.ts
```

### Raw SQL 활용

TypeORM 에서 Raw SQL 을 활용하는 방식.  
`typeorm` 에서 제공하는 `createQueryRunner` 를 service 에서 생성하여, raw SQL 활용 가능

- queryRunner 정의
  - 'DATA_SOURCE' 로 provide 되는 database proivder 를 constructor 에서 선언
  - `createQueryRunner` 에서 제공하는 query function 을 활용하여, Raw SQL 활용
```ts
...
  // constuctor 내, DataSource inject
  constructor(
    @Inject('DATA_SOURCE')
    private dataSource: DataSource,
  )
  // queryRunner 선언
  queryRunner = this.dataSource.createQueryRunner();
  ...
  // query runner 실행 function
  async generateFullName(id): Promise<string> {
    return this.queryRunner.manager.query(
      `select firstname || ' ' || lastname as fullname from users u where id = $1`,
      [id],
    );
  }
...
```
