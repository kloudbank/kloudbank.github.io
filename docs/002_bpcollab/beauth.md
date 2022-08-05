---
title: Authentication
date: 2022-08-04
sidebar: 'auto'
author: 'noisonnoiton'
---

Nest 기반 인증 기능 검토.
- Node.js Passport 및 Nest Guard 활용

## Passport

Passport 는 node.js 에서 가장 널리 사용되는 인증 라이브러리이다.  
Nest 에서는 `@nestjs/passport` 를 제공하여 `passport-local`, `passport-jwt` 등의 passport `Strategy` class 와 함께 통합하여 사용할 수 있다.

::: tip
  Passport Official Docs.
  <https://www.passportjs.org/docs/>
:::

## Nest Guard

Nest 는 권한, Role 등에 따라 주어진 요청이 처리할 권한이 있는지 사전에 체크할 수 있도록 `Guard` 를 사용할 수 있는데, 이는 인증 / 인가 등을 확인하고, 런타임에서 해당 요청이 API 를 직접 handling 할 수 있는지를 통제 할 수 있으며, `@Injectable` decorator 를 활용하여 provider 형태로 사용 가능.  
`passport` 의 strategy 와 연계하여 인증 처리를 할 경우에는, `@nestjs/passpord` library 에서 제공하는 `AuthGuard` 활용.


::: warning
  **Note**
  Guard는 middleware 이후에 실행되지만, interceptor or pipe 보다는 먼저 실행된다.
:::

:::
  - Nest Guards overview
  <https://docs.nestjs.com/guards>
  - Nest Authentication
  <https://docs.nestjs.com/security/authentication>
:::

## REST API

Passport local 기반 login 인증 및 JWT token 인증 API 개발 내역.

- Installation required packages
```sh
$ npm install --save @nestjs/passport passport passport-local passport-jwt
$ npm install --save-dev @types/passport-local @types/passport-jwt
```

### Source code repository

Authentication sample code repository

- Github Repository
<https://github.com/hcp-bpcp/hcp-bpcp-backend-auth>

### Passport local + Guard

Username, password 기반 인증 passport local stratgey 를 활용하기 위해, `passport-local` 라이브러리와, Nest `AuthGuard` 를 통합.

- Login 인증 application directory 구조
  - passport 의 local stratgey 및 nest 의 local guard 를 별도로 정의
  - controller 에서 `@UseGuards` decorator 를 정의를 통하여, API endpoint 별로 사용 가능
```sh
src/api/v1/auth
├── auth.controller.ts
├── auth.module.ts
├── auth.service.ts
├── guards
│   └── local-auth.guard.ts
└── strategies
    └── local.strategy.ts
```

- local-auth.guard.ts
  - `local` type 의, `AuthGuard` 를 extends 한 `LocalAuthGuard` class 생성
```ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
```

- local.strategy.ts
  - `passport-local` 의 strategy 를 구현하기 위해, Nest 의 `PassportStrategy` 를 extends
  - Nest 의 `PassportStrategy` 는 `validate` function 을 실행하여 유효성을 검증
    - 실패 시, `UnauthorizedException` 발생하여, response status 401 return
    - local strategy 의 경우 `username`, `password` 가 request body 에 해당 key 로 존재해야 함
    - <u>`AuthService` 에 미리 구현한, user / password 기반 RDB data 조회 function 을 실행 (code 생략)</u>
```ts
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
...

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
```

- auth.module.ts
  - `PassportStrategy` 를 사용하기 위해, Nest `PassportModule` import
  - Guard 의 strategy 로 사용하기 위해, `LocalStrategy` 를 provider 로 선언
```ts
import { PassportModule } from '@nestjs/passport';
...
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
...
    PassportModule,
  ],
...
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
```

- Controller 에서 `@UseGuards` decorator 활용
  - `/login` API 호출 시, request body 의 username, password data 를 기반으로 `LocalStrategy` 의 validate function 수행
  - 정상 동작 시, `login` function 실행
    - <u>해당 function 에서는 jwt token 을 발급하고, redis 에 token 정보를 저장하는 logic 을 수행 (code 생략)</u>
```ts
  import { LocalAuthGuard } from './guards/local-auth.guard';
  ...

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
  ...
```

### Passport JWT + Guard

JWT token 인증 passport jwt stratgey 를 활용하기 위해, `passport-jwt` 라이브러리와, Nest `AuthGuard` 를 통합.

- JWT token 인증 application directory 구조
  - passport 의 jwt stratgey 및 nest 의 jwt guard 를 별도로 정의
  - controller 에서 `@UseGuards` decorator 를 정의를 통하여, API endpoint 별로 사용 가능
  - passport local 과 마찬가지로 strategy 에서 JWT Token 인증을 위한 기본 함수가 내장되어 있음
```sh
src/api/v1/auth
├── auth.controller.ts
├── auth.module.ts
├── auth.service.ts
├── guards
│   ├── jwt-auth.guard.ts
└── strategies
    ├── jwt.strategy.ts
```

- jwt-auth.guard.ts
  - `jwt` type 의, `AuthGuard` 를 extends 한 `JwtAuthGuard` class 생성
  - 기본적으로 실행되는 `canActivate` function 에 token verify logic 을 구현
    - <u>`passport-jwt` 의 strategy 에서 secret key 기반 token 만료 검증이 가능하지만, guard 에서 해당 token 의 invalid case 를 구분하여 return 하는 방식으로 구현</u>
  - Nest 에서 제공하는 `@nestjs/jwt` 의 `JwtService` 의 내장 함수로 token verify check
```ts
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private jwtService: JwtService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const { authorization } = request.headers;

    if (authorization === undefined) {
      throw new UnauthorizedException('token not found');
    }

    const token = authorization.replace('Bearer ', '');
    request.user = this.validateToken(token);
    return true;
  }

  validateToken(token: string) {
    const secretKey = process.env.JWT_SECRET_KEY;

    try {
      const verify = this.jwtService.verify(token, { secret: secretKey });
      return verify;
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }
}
```

- jwt.strategy.ts
  - `passport-jwt` 에서도 기본적으로 token 만료에 대한 검증이 가능
  - Guard 에서 `canActivate` 를 사용하지 않을 경우에는 아래 code가 실행됨
```ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: any) {
    return {
      userid: payload.userid,
      firstname: payload.firstname,
      lastname: payload.lastname,
      email: payload.email,
    };
  }
}
```

- auth.module.ts
  - `JwtStrategy` 의 경우, provider 로 선언하여 사용 가능
  - Nest 에서 제공하는 `JwtModule` 을 import 하여, `JwtService` 에서 제공하는 sign, verify 등의 function 활용
```ts
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
...

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET_KEY,
        signOptions: { expiresIn: process.env.JWT_PERIOD + 's' },
      }),
    }),
  ],
...
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
```

- Controller 에서 `@UseGuards` decorator 활용
  - `/verify` API 호출 시, `JwtAuthGuard` 혹은 `JwtStrategy` 의 verify logic 수행
  - 정상 동작 시, `authVerify` function 실행
    - <u>아래 code 에는 token 만료 시간에 의한 token 재발급에 대한 check 가 포함되어 있음 (code 생략)</u>
```ts
  @UseGuards(JwtAuthGuard)
  @Get('/verify')
  authVerify(@Request() req, @Response() res) {
    const { authorization } = req.headers;
    const token = authorization.replace('Bearer ', '');

    return this.authService
      .validateAccessToken(token, req.user.userid)
      .then((result) => {
        res.setHeader('is-refresh', result.isRefresh);
        if (result['access_token']) {
          res.setHeader('refresh-token', result['access_token']);
        }
        res.status(HttpStatus.OK).json(req.user);
      })
      .catch((e) => {
        this.logger.error(e);
        res.status(e.status).json();
      });
  }
```

## NGINX Ingress auth-url

NGINX Ingress 에서 제공하는 `auth-url` 기반 authentication 검증 내역.

::: tip
  NGINX Ingress Controller `nginx.ingress.kubernetes.io/auth-url` 관련 Docs.
  <https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/#external-authentication>
:::

### JWT token verify API 연계

`nginx.ingress.kubernetes.io/auth-url` annotation 을 정의하여, 해당 ingress 를 통해 모든 request 를 auth-url 에 정의한 API 호출로 인증을 시도하는 방식.
HTTP Header 인 `Authorization` 의 Bearer token 이 유효한 경우, 해당 ingress 에 연결된 service 로 request 를 전달 가능.

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  namespace: hcp-bpcp-backend
  name: hcp-bpcp-backend-mvp
  annotations:
    nginx.ingress.kubernetes.io/auth-url: https://hcp-bpcp-backend-auth.bpcp.kubepia.net/api/v1/auth/verify
```

- auth-url 인증 실패 test result
  - nginx 의 401 exception 화면이 return
```html
<html>
<head><title>401 Authorization Required</title></head>
<body>
<center><h1>401 Authorization Required</h1></center>
<hr><center>nginx</center>
</body>
</html>
```

### Response Header 추가

`nginx.ingress.kubernetes.io/configuration-snippet` annotation 을 정의하여, auth-url 호출 결과의 response header 를 추가하는 방식.  
기본적으로는 auth-url 은 호출 성공 여부만 판단하고, header 나 response data 를 실제 request 의 reponse 에 전달하지 않는다.

```yaml
    nginx.ingress.kubernetes.io/configuration-snippet: |
      auth_request_set $is_refresh $upstream_http_is_refresh;
      auth_request_set $refresh_token $upstream_http_refresh_token;
      more_set_headers "is-refresh: $is_refresh";
      more_set_headers "refresh-token: $refresh_token";
```

- snippet 미적용 test result
  - 위에서 추가한 `is_refresh`, `refresh_token` 에 대한 header 가, 호출 결과에 전달되지 않음
```sh
...
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Content-Type: application/json; charset=utf-8
< Content-Length: 74
...
```

- snippet 적용 test result
  - 위에서 추가한 `is_refresh`, `refresh_token` 에 대한 header 가, 호출 결과에 전달됨
```sh
...
< HTTP/1.1 200 OK
< X-Powered-By: Express
## 추가된 response header Start
< is-refresh: true
< refresh-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiJ0ZXN0IiwiZmlyc3RuYW1lIjoiRm9vIiwibGFzdG5hbWUiOiJCYXIiLCJlbWFpbCI6ImZvb0BiYXIuY29tIiwiaWF0IjoxNjU5Njc4NTk2LCJleHAiOjE2NTk2ODIxOTZ9.kNFZEJCgt0Y7AZkXmADzOeVVeewf5Ys647FDYLsDwNQ
## 추가된 response header End
< Content-Type: application/json; charset=utf-8
< Content-Length: 74
...
```
