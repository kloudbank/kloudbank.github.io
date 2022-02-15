---
title: Certification
date: 2021-06-15
tags:
- aws
categories: 
- Cloud
sidebar: 'auto'
author: 'noisonnoiton'
---

AWS Certification 관련 요구 지식 및 자격증 취득을 위한 가이드 정리.

## AWS Certi. Overview

AWS Certification 은 크게 아래와 같이 분류할 수 있다.

- Role based certi.
  - Solutions Architect
  - DevOps Engineer
- Technical experience based certi.
  - Database
  - Network, Security
  - Machine Learning, Data Analytics
  - Alexa

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbcemiZ%2FbtqV2aGEz8b%2FHlOWxFPwI3qitEgH7qCFOk%2Fimg.png" width="720px" height="400px" />


### Eligible Exams
- 2020년 기준으로 모든 시험 version 이 갱신되었기 때문에, 문제 은행 Dump 가 적당히 쌓인 현재 시점에 자격증 취득이 수월할 것으로 예상됨.
  - Solutions Architect Associate: <b>SAA-C02</b>
  - Solutions Architect Professional: <b>SAP-C01</b>
  - DevOps Engineer Professional: <b>DOP-C01</b>
***
| <small>*작성자의 경우, SAA 자격증은 C01 version 이 deprecated 되기 전에 취득하였음,,*</small>
***

- AWS Certmatrics 시험 일정 예약 화면 참고

![](./images/aws-certi-list.png)


### 시험 비용
비싸지만, 회사 비용으로 지원되니 신경쓰지 않음.

### 시험 언어 및 추가시간 30분 연장 신청
Exam Language 를 Korean 으로 선택하면, 시험 도중에 English / Korean version 을 번갈아가면서 문제를 푸는 것이 가능.
또한, 영어가 모국어가 아닌 나라에서는 어색하게 번역된 문제를 푸는 것에 대한 불리함이 있기 때문에, 추가시간 30분 연장 Advantage 를 신청할 수 있다.

***
| <small>*문제 은행의 문제를 미리 다 풀어보고 가면, 사실 시험 시간은 매우 충분하다. 1시간을 넘기기 힘들다,,*</small>
| <small>작성자의 경우, <u>*굳이 추가시간 연장을 신청하지 않았다.*</u></small>
***

- 시험 편의사항 요청을 통해 추가시간 신청 가능  

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fec1fXK%2FbtqWc8VheAs%2FA4xNnJZuIBJrCpSbKDM0e1%2Fimg.png" width="720px" height="320x" />


### 시험 장소 및 유의 사항
시험 공급기관은 PSI와 Pearson VUE 가 있으며, 마음에 드는 일정으로 선택하면 되는데, PSI 의 시험 일정이 항상 여유가 있었다.

세 번의 시험 모두 SRTC 에서 응시했는데, <u>*문정동의 새 건물에 있다가 선정릉의 오래된 건물로 최근에 옮겼다.*</u>

시험장에는 15분 전에 도착하도록 안내되며, <u>*주 신분증과 보조 신분증인 신용카드를 모두 가져가야 한다.*</u>
시험 시간은 유동적이라서, 일찍 도착하면 그냥 일찍 시험을 시작하고, 조금 늦으면 늦은대로 늦게 시작하기도 한다. 빨리 가서 빨리 보고 나오는 것을 추천한다.


## Solutions Architect Professional
시험 안내서 요약 및 주요 출제 내용 정리

### 시험 안내서 요약

- 자격증을 통해 검증되는 능력
  - AWS에서 동적으로 확장 가능하며 가용성이 높고 내결함성이 있으며 안정적인 애플리케이션을 설계 및 배포
  - 주어진 요구 사항을 기반으로 애플리케이션을 설계하고 배포하기에 적절한 AWS 서비스 선택
  - AWS에서 복잡한 멀티 티어 애플리케이션을 마이그레이션
  - AWS에서 확장 가능한 전사적 작업을 설계 및 배포
  - 비용 관리 전략 구현

- 도메인 및 가중치

도메인                     |  시험 비중(%)  
-------------------------|--------------
1: 조직적 복잡성을 위한 설계   |   12.5%      
2: 새로운 솔루션을 위한 설계   |    31%       
3: 마이그레이션 계획         |     15%      
4: 비용 관리               |    12.5%     
5: 기존 솔루션의 지속적 향상   |    29%       
합계                      |    100%      


### 주요 Service / Feature

#### 1. 조직 / audit 관련해서는 간단히만 알고 있어도 큰 문제 없음.
- AWS Organization, IAM, SSO, Config, Inspector, Cloudtrail, Cloudwatch 등.

#### 2. 새로운 솔루션을 위한 설계 방안으로는, VPC 관련 구성 뿐 아니라, Serverless / Data Analysis 관련 서비스에 대해서도 어느 정도 파악이 필요.
- Amazon VPC 관련 구성 (Gateway, Endpoint, ENI etc.)
- EC2 관련 구성 (EBS, EFS, ELB etc.)
- RDS, DynamoDB, Redshift 등의 적용 방안
- S3, Cloudfront, API Gateway, Lambda, SWF, Kinesis 등을 활용하여 Serverless App. 설계 방안
- 그 외, 특화된 서비스 (Macie, Rekognition, Athena, Glue, EMR etc.)

#### 3. 마이그레이션 관련, 3-tier 구조의 Application 의 Cloud 전환 및 Database 이관, on-premise storage 이관 등에 관련된 서비스 이해 필요.
- Amazon EC2, ECS, ASG 등 App. Server 이관
- RDS, Elasticache 등 DB 이관
- S3, Storage Gateway, Snowball 등 Storage Data 이관 방안
- 그 외, Migration 도구 (Migration Hub, Application Discovery Service etc.)

#### 4. 비용 관련, 서비스별 요금을 정확하게 파악할 필요까지는 없었고, 필요 이상의 서비스를 비싸게 사용하는 case 에 대해 파악할 수 있으면 어렵지 않음.
- AWS Trusted Advisor, Cost Explorer 등의 활용
- EC2 Instance type 별 사용 용도와 대략적인 요금 파악

#### 5. 기존 솔루션의 고가용성 확보, 보안 강화, 운영 효율화를 위한 서비스 활용 방안에 대하여 어느 정도 파악이 필요.
- Auto Scaling Group, ECS, ELB, Route53 구성 및 Multi-AZ 활용, Region 간 복제 등의 고가용성 확보 방안
- EBS, EFS, S3 의 암호화 방안
- AWS Systems Manager Parameter Store, KMS, CloudHSM 등 보안 강화를 위한 솔루션 활용 방안
- SQS, SNS, MQ 등을 활용한 App. Architecture 변경


## DevOps Engineer Professional
AWS DevOps Engineer Professional 시험 안내서 요약 및 주요 출제 내용 정리

### 시험 안내서 요약

- 자격증을 통해 검증되는 능력
  - AWS에서 지속적인 전송 시스템 및 방법론 구현 및 관리
  - 보안 제어, 거버넌스 프로세스 및 규정 준수 검증의 구현 및 자동화
  - AWS에서 시스템 모니터링, 지표 및 로깅 시스템 정의 및 배포
  - AWS 플랫폼에서 가용성이 높고 확장성이 뛰어나며 자가 치유 기능이 있는 시스템 구현
  - 운영 프로세스를 자동화할 수 있는 도구의 설계, 관리 및 유지 관리

- 도메인 및 가중치

도메인                                  | 시험 비중(%) 
--------------------------------------|------------
1: SDLC 자동화                          | 22%        
2: 구성 관리 및 Infrastructure as Code   | 19%        
3: 모니터링 및 로깅                       | 15%         
4: 정책 및 표준 자동화                    |  10%        
5: 인시던트 및 이벤트 대응                 |  18%        
6: 고가용성, 내결함성 및 재해 복구           |  16%        
합계                                   |  100%       


### 주요 Service / Feature

Solutions Architect 공부를 하면서, VM / Network / DB / Storage 관련 대부분의 서비스에 대해서 어느 정도 파악하고 있었기 때문에, 추가적으로 DevOps 관련 서비스와 Infra 구성 자동화 등의 운영 관점의 편의성을 위한 서비스들에 대해서 추가적으로 이해하기 위해 노력했다.

#### 1. SDLC 자동화 관련, AWS DevOps 서비스 및 3rd. Party Solution 을 활용하여 자동화를 더 효율적으로 달성하는 방안, CI/CD 의 기본적인 개념에 대한 이해가 필요.
- AWS CodeCommit, CodeBuild, CodeDeploy, CodePipeline 에 대한 이해와, 3rd. Party Solution 과의 효율적인 연계 방안.
- S3 및 암호화 도구를 활용한 Artifact 관리 방안.
- API Gateway, Lambda, Route53 등 활용한, 배포 전략 설계.

#### 2. 인프라 구성 자동화 및 수명 주기를 통한 Auto Scaling Group 관리 방안 등에 대한 이해가 필요.
- AWS CloudFormation 의 template, stack 등 활용, 인프라 구성 자동화 방안
- AWS OpsWorks 를 활용한 인스턴스 구성 자동화 방안.
- Auto Scaling Group Life Cycle Hook 에 대한 이해.

#### 3. 지표 모니터링 및 로깅에 대한 기본적인 이해와, 관련 서비스에 대한 이해 필요.
- Amazon CloudWatch event, logs 를 활용, 모니터링, 로깅 효율성 증대 방안.
- Amzaon ES, CloudSearch 등, 솔루션 적용 방안.
- Amazon 에서 제공하는 audit 관련 서비스 이해.

#### 4. 정책 및 표준 관련해서는, general 한 내용들이 대부분이며, 보안 관련 서비스에 대해 이해하면 크게 문제 없을 것으로 보임.
- AWS Systems Manager 활용, 표준 및 패치 관리 방안.

#### 5. 이벤트에 대응하기 위한 AWS 서비스 활용 방안 이해, 인프라 구성 관련 도메인 2번 내용과 겹치는 부분이 많음.
- CloudWatch 등과 SNS / SES 등의 서비스 연계
- Event 연계 Lambda 함수를 활용한 수명 주기 관리, 스크립트 실행 등의 복구 시나리오 수립 방안.

#### 6. 고가용성, 내결함성, 재해 복구 등의 내용은, Solutions Architect 에서 공부한 부분과 거의 유사함. 단, App. Architecture 의 변경 관련 내용을 다루지는 않음.
- Auto Scaling Group, ECS, ELB, Route53 구성 및 Multi-AZ 활용, Region 간 복제 등의 고가용성 확보 방안
- AWS Systems Manager Parameter Store, KMS, CloudHSM 등 보안 강화를 위한 솔루션 활용 방안
- AWS Systems Manager 의 효율적인 활용 방안.


## Study Guide

- AWS Certi. 취득 순서
1. Solutions Architect Associate - Public Cloud Solutions 활용의 대략적인 이해
2. Solutions Architect Professional - Public Cloud Solutions 활용 심화
3. DevOps Engineer Professional - Public Cloud Solution + DevOps 기본 이해

<u>*SAA 를 취득하는 데에 가장 오랜 시간을 들였으며,
SAP 를 취득할 때 가장 열심히 공부했으며,
DOP 취득 시에는 AWS DevOps 도구에 대한 공부만 추가적으로 간단하게 했다.*</u>

| <small>*작성자의 경우, AWS 에 대한 지식은 EC2 Instance 몇 번 띄워 본 정도 밖에 없는 상태에서, 자격증 취득 공부를 시작했다. 그렇기 때문에,,  
  <u>AWS 로 기본적인 웹 서비스를 구축하는 실습을 해볼 수 있는 서적을 참고하여 기초 지식을 습득한 후, 문제 풀이에 돌입했다.</u>*</small>

### 참고 서적 및 기술 정리 문서

- 아마존 웹 서비스를 다루는 기술
: 이재홍 | 길벗 | 2014년 09월 30일
<http://pyrasis.com/aws.html>

  - 무료 전자책으로 배포되어 있으므로 서적을 직접 구매할 필요는 없으나, <u>책을 사지 않으면 공부하지 않을 것 같아서 종이 서적을 구매하였음,,</u>
  - AWS Console UI 와 Service 기능이 변경되어, 책에서 설명한 그대로 실습하기 어렵기는 하지만, 간단한 내용의 실습 위주로 AWS 의 주요 서비스를 모두 활용해 볼 수 있음.
  - 책의 19장 정도까지는 직접 실습을 진행하였음. 단, Free-Tier 혹은 무료로 사용 가능한 서비스 들만,,,
    - <u>EC2, ASG, ELB, EBS, EFS, S3, Cloudfront, RDS, IAM</u> 활용 등을 실습.

<img src="http://pyrasis.com/assets/images/TheArtOfAmazonWebServices/TheArtOfAmazonWebServices3d.png" height="320px" width="320px" />


- AWS Solutions Architect 기초 정리
: 구글링 도중 발견한 최근 SAA-C02 합격자의 공부 내용 정리 내역인데, 굉장히 정리가 잘 되어 있다,,,

> wbluke tistory blog 참조
<a href="https://wbluke.tistory.com/54" target="_blank" rel="noopener">1. EC2, Auto Scaling, ELB</a>
<a href="https://wbluke.tistory.com/55" target="_blank" rel="noopener">2. VPC</a>
<a href="https://wbluke.tistory.com/56" target="_blank" rel="noopener">3. Storage Service</a>
<a href="https://wbluke.tistory.com/57" target="_blank" rel="noopener">4. CloudFront, Route 53, API Gateway</a>
<a href="https://wbluke.tistory.com/58" target="_blank" rel="noopener">5. RDS, Aurora, DynamoDB</a>
<a href="https://wbluke.tistory.com/59" target="_blank" rel="noopener">6. SQS, SNS, MQ, CloudWatch</a>
<a href="https://wbluke.tistory.com/60" target="_blank" rel="noopener">7. 기타 서비스</a>


### 문제은행 활용

examtopics.com 에 접속하여 문제를 풀어보고, 문제마다 달린 Discussion 댓글과 본인의 생각을 곁들여 정확한 답을 찾기 위해 노력했다. 기본적으로 문제에서 제공하고 있는 답은 정답률이 60% 정도 밖에 되지 않기 때문에, examtopics 에서 문제/답을 프린트한 출력물을 그대로 외워서는 합격이 불가능하다.  
처음 접하는 AWS Service 에 대한 내용에 대해 지속적으로 검색이 필요하기 때문에, 출력물을 통한 문제풀이보다는 PC 에서 브라우저를 통해 웹사이트에서 직접 풀어보고, AWS 문서를 직접 검색하여 정답을 찾아내는 과정이 매우 중요했다.

- SAA-C02
: 작성자는 C01 ver. 에 응시하여 취득하여, C02 ver. 의 문제 수준은 정확히 파악하기 어려우나, 지문이 다소 더 길어진 것으로 파악됨.
| <small>*시험 응시 및 합격한 사람들의 영어로 된 댓글로 파악해본 바로는, No.200 이후의 문제부터 풀어보아도 관계 없을 것으로 보임*</small>
<https://www.examtopics.com/exams/amazon/aws-certified-solutions-architect-associate-saa-c02/>

- SAP-C01
: 현재 750 문제 이상 올라와 있으나, 이전에 deprecated 된 C00 문제가 그대로 남아 있기 때문에, 뒤쪽의 350 문제 정도만 풀어봐도 될 것으로 보임.
| <small>*작성자는 아래 링크의 No.398 부터 풀어보았음*</small>
<https://www.examtopics.com/exams/amazon/aws-certified-solutions-architect-professional/view/40/>

- DOP-C01
: 현재 500 문제 이상 올라와 있음,,,
| <small>*작성자가 시험 응시했던, 올해 2월에만 해도 문제가 200개 정도 였는데,,*</small>
<https://www.examtopics.com/exams/amazon/aws-devops-engineer-professional/>


### AWS 공식 문서 및 Reference 활용

구글링을 통해 Certi. 취득 후기를 읽어보면, 가끔 공식 문서나 White Paper 를 정독하라는 이야기도 있지만, <u>*정독할 필요는 전혀 없다.*</u>  
어차피 나중에 AWS 를 활용하여 Migration 이나 신규 System 을 구축할 때, 다시 꼼꼼하게 읽어보면서 AWS Service 사용해야 하기 때문에,,

- AWS Service 사용설명서
: 문제에서 이해되지 않거나 혼동되는 내용이 있을 경우, 해당 키워드와 관련된 내용을 사용설명서에서 검색하여 이해 가능. 정확한 답을 찾아낼 수 있음.
> Amazon RDS 사용설명서 예시
<https://docs.aws.amazon.com/ko_kr/AmazonRDS/latest/UserGuide/Welcome.html>

- AWS Service FAQ
: 문제를 보던 중, 처음 보는 AWS Service 가 나오는 경우, FAQ 의 내용을 Quick 하게 읽어보면, 이 서비스가 대충 어떤 기능을 제공하는지 파악 가능.
> Amazon RDS FAQ 예시
<https://aws.amazon.com/ko/rds/faqs/>


## Benefits
AWS Certification 취득 시, Benefits 정리

### AWS Certified Store

Certi. 인증 코드가 있어야, 접속 가능한 AWS Store.  
| <small>*구매하고 싶은 것은 딱히 없음,,,*</small>

> AWS Certified Store URL
<https://www.sunriseidcart.com/AWS/>

![](./images/aws-certi-store.png)


### Voucher & Discount
- AWS Certified Practice Exam Voucher
: Certification 취득 시마다, AWS Free Practice Exam Voucher 가 발급되어, 시험 종류에 관계없이 Practice Exam 을 무료로 구매 가능. (실제 가격 KRW 50,000 정도)
| <small>*사용해본 적 없음,,,*</small>

- AWS Certified Exam Discount
: Certification 취득 시마다, Next Exam Discount Code 가 발급되어, 시험 비용의 50% 의 할인율을 적용받을 수 있음.
| <small>*회사 비용 아껴줄 수 있음,,,*</small>


### Badges  
SNS, LinkedIn, 혹은 아래와 같은 Public Link 로 Share 가능.

<div data-iframe-width="350" data-iframe-height="270" data-share-badge-id="354839bc-becf-4bfc-a1b2-ee3fa4906ede" data-share-badge-host="https://www.credly.com"></div><script type="text/javascript" async src="//cdn.credly.com/assets/utilities/embed.js"></script><br/>
<div data-iframe-width="450" data-iframe-height="270" data-share-badge-id="75041b22-9213-4bbf-99fb-31ded9e48d62" data-share-badge-host="https://www.credly.com"></div><script type="text/javascript" async src="//cdn.credly.com/assets/utilities/embed.js"></script><br/>
<div data-iframe-width="450" data-iframe-height="270" data-share-badge-id="a9c77cf4-0fe0-43f4-bfd2-27ec92f68642" data-share-badge-host="https://www.credly.com"></div><script type="text/javascript" async src="//cdn.credly.com/assets/utilities/embed.js"></script><br/>


<Comment />

