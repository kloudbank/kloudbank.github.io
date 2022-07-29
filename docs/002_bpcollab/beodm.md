---
title: NoSQL + ODM
date: 2022-07-29
sidebar: 'auto'
author: 'noisonnoiton'
---

NoSQL MongoDB 기반, node.js ODM 기능 검토.

## ODM 검토

Relational Data mapping 을 위한 ORM 으로도 MongoDB Data 를 활용할 수 있으나, Object Data Mapping 전용으로 제공되는 ODM 에 대한 검토 내역.

### Mongoose vs TypeORM

Mongoose 외에 다른 ODM 도 존재하지만, 압도적으로 mongoose 활용 reference 가 많고, version 관리도 안정적으로 이루어지고 있는 것으로 보임.

::: danger
  TypeORM 은 mongodb v3 까지만 지원.
  <https://github.com/typeorm/typeorm/issues/7907>
:::

## Nest + Mongoose

Nest 에서 Mongoose 를 활용하는 방식.  
_<u>Nest 제공 module 인 `@nestjs/mongoose` 을 활용하지 않는 방향으로 결정하였음.</u>_

### Basic mongoose package 활용

`mongoose` package 를 활용하여, Nest 의 module 형태로 정의하고 이를 활용하는 방식.

- 장점
  - MongoDB connection 을 관리하는 module, provider 를 별도로 정의하여, Nest module 에 대한 dependency 감소
- 단점
  - Database 관련 module 을 직접 정의해야 하는 번거로움.

- 참고 문서
<https://docs.nestjs.com/recipes/mongodb>

### Nest 제공 package 활용

`@nestjs/mongoose`, `mongoose` package 를 활용.  

- 장점
  - `@nestjs/mongoose` 의 InjectConnection, InjectModel 등 제공되는 class 를 import 하여, Database module import 및 model 정의 가능
  - `forRoot`, `forFeature` 등을 활용하여, 각 resource 에서 간단하게 import 하여 사용 가능
- 단점
  - Nest 제공 module 에 대한 dependency 증가
  - 검증 과정에서 `@nestjs/mongoose` 과 `mongoose` 의 version issue 발생

- 참고 문서
<https://docs.nestjs.com/techniques/mongodb>

## REST API

간단한 Todo Model 정의 및 CRUD 를 위한 REST API 개발 내역.  

::: tip
  Nest Mongoose Recipe
  <https://docs.nestjs.com/recipes/mongodb>
:::

### Repository

Mongoose 기반 model 정의 및 CRUD sample code

- Github Repository
<https://github.com/hcp-bpcp/hcp-bpcp-backend-v1>

### Database Module 정의

Nest framework `src` directory 하위에, database module 및 provider 를 관리하기 위한 `database` directory 구성.

- database module 관리 directory 구조
```
src/database/mongodb
├── mongodb.module.ts
└── mongodb.providers.ts
```

- mongodb.providers.ts
  - 'DOC_SOURCE' 라는 이름으로 provide 되며, 각 resource 의 module 에서 해당 이름으로 import 가능
  - useFactory 방식으로 정의하여야, `process.env` config 환경 변수를 활용할 수 있음
  - 결과적으로, `mongoose.connect` 를 실행
```ts
import mongoose from 'mongoose';

export const mongodbProviders = [
  {
    provide: 'DOC_SOURCE',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(process.env.MONGO_CONN_INFO),
  },
];
```

- mongodb.module.ts
  - mongodb connection provider를 export
  - 해당 module 을 각 resource 에 import 하여, mongoose connection 에서 제공하는 model 정의 function 활용 가능
```ts
import { Module } from '@nestjs/common';
import { mongodbProviders } from './mongodb.providers';

@Module({
  providers: [...mongodbProviders],
  exports: [...mongodbProviders],
})
export class MongodbModule {}
```

### Schema 정의

- Schema, Model 정의를 위한 directory 구조
```
src/api/v1/todos/schemas
├── todos.providers.ts
└── todos.schema.ts
```

- todos.schema.ts
  - MongoDB 에 생성하기 위한 collection 의 schema 정의
```ts
import * as mongoose from 'mongoose';

export const TodoSchema = new mongoose.Schema(
  {
    todoid: { type: Number, required: true, unique: true },
    content: { type: String, required: true },
    completed: { type: String, default: false },
  },
  {
    timestamps: true,
  },
);
```

- todos.providers.ts
  - 'TODO_MODEL' 라는 이름으로 provide 됨을 명시
  - TodoSchema 기반의 model 을 정의하여 data manipulation function 을 제공
```ts
import { Connection } from 'mongoose';
import { TodoSchema } from './todos.schema';

export const todosProviders = [
  {
    provide: 'TODO_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Todo', TodoSchema),
    inject: ['DOC_SOURCE'],
  },
];
```

### Basic CRUD

REST API sample code 정의

- Todos API 전체 resource directory 구조
  - controller 에서 API Endpoint 정의
  - service 에서 TypeORM repository 를 활용한 data manipulation code 개발
  - `@ApiTag`, `@ApiProperty` 등 swagger 관련 설정 추가
```
src/api/v1/todos
├── consumers
│   └── todos.consumer.ts
├── dto
│   ├── create-todo.dto.ts
│   └── update-todo.dto.ts
├── schemas
│   ├── todos.providers.ts
│   └── todos.schema.ts
├── todos.controller.ts
├── todos.interface.ts
├── todos.module.ts
└── todos.service.ts
```
- _**<u>Mongoose Document type Interface 를 정의</u>**_
  - 이 부분이 ORM 의 일반적인 Entity access 와 다소 차이가 있음.
  - Schema 는 Collection model 의 정의 용도이고, `mongoose` package 에서 제공하는 `Document` Type 의 interface 를 사전에 정의하여, Model class 선언 시 정의해 주어야 함.
  - todos.interface.ts
  ```ts
  import { Document } from 'mongoose';

  export interface Todo extends Document {
    readonly todoid: number;
    readonly content: string;
    readonly completed: string;
  }
  ```
  - todos.service.ts 에서 Model class 주입 시 활용
  ```ts
  ...
  import { Todo } from './todos.interface';
  ...
  @Injectable()
  export class TodosService {
    constructor(
      @Inject('TODO_MODEL')
      private todoModel: Model<Todo>,
  ...
  ```
