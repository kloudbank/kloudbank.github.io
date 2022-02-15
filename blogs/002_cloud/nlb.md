---
title: Amazon NLB
date: 2021-03-24
tags:
- aws
- kubernetes
categories: 
- Cloud
sidebar: 'auto'
author: 'noisonnoiton'
---

## Network Load Balancer

- AWS opensource blog
> <https://aws.amazon.com/ko/blogs/opensource/network-load-balancer-nginx-ingress-controller-eks/>

<img src="https://quip-amazon.com/blob/bGA9AAmviCK/RxIsFh8j-vQYBvmZWBNpOw?a=gc7lDKxZ4JUQcZcn1Ojr4h0axnP0cmkLy1LWdZ3fuDga" width="550px" height="580px" title="nlb" alt="nlb"></img><br/>

### NGINX Ingress Controller
#### ALB Ingress Controller 대신, NGINX Ingress Controller 기반의 Amazon NLB 사용

- 기본적으로 NGINX Ingress Controller 는 모든 namespace 의 모든 수신 이벤트를 수신하고 해당 지시문과 규칙을 NGINX 구성 파일에 추가합니다. 이를 통해 모든 수신 규칙, 호스트 및 경로를 포함하는 중앙 집중식 라우팅을 사용할 수 있습니다.

- NGINX Ingress Controller 를 사용하면 동일한 Network Load Balancer 를 사용하는 여러 환경 또는 namespace 에 대한 여러 수신 객체를 가질 수도 있습니다. ALB를 사용하는 경우 각 수신 개체에는 새로운 로드 밸런서가 필요합니다.
또한, NGINX 인 그레스 컨트롤러와 함께 사용할 경우 경로 기반 라우팅과 같은 기능을 NLB에 추가 할 수 있습니다.


## Deploy NGINX Ingress Controller

- Ingree Nginx Controller: AWS NetworkloadBalancer install document.
> <https://kubernetes.github.io/ingress-nginx/deploy/#network-load-balancer-nlb>

- 아래 file 로 cluster 에 설치 가능. 경우에 따라, validate false option 필요
```
$ kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.0/deploy/static/provider/aws/deploy.yaml
```

- 배포 내역

```
$ kubectl get po,svc -n ingress-nginx

NAME                                            READY   STATUS      RESTARTS   AGE
pod/ingress-nginx-admission-create-t2mjj        0/1     Completed   0          22d
pod/ingress-nginx-admission-patch-8h5vq         0/1     Completed   0          22d
pod/ingress-nginx-controller-569cfbd456-mkg7w   1/1     Running     0          22d

NAME                                         TYPE           CLUSTER-IP      EXTERNAL-IP      PORT(S)                      AGE
service/ingress-nginx-controller             LoadBalancer   10.100.5.99     ${external-ip}   80:30203/TCP,443:30589/TCP   22d
service/ingress-nginx-controller-admission   ClusterIP      10.100.108.30   <none>           443/TCP                      22d
```

### IngressClass 생성

Nginx Ingress 를 default class 로 설정 시, 권장 사항

<https://kubernetes.github.io/ingress-nginx/#getting-started>

> We highly recommend that you create the ingressClass as shown below:
And add the value "spec.ingressClassName=nginx" in your Ingress objects


```yaml
apiVersion: networking.k8s.io/v1
kind: IngressClass
metadata:
  labels:
    app.kubernetes.io/component: controller
  name: nginx
  annotations:
    ingressclass.kubernetes.io/is-default-class: "true"
spec:
  controller: k8s.io/ingress-nginx
```


### Test Ingress on EKS Cluster
- 아래 Pod, Service, Ingress 생성하여 Test
  : ALB 사용 시 설정했던, subnet / security group 지정 필요 없음

```yml
apiVersion: v1
items:
- apiVersion: v1
  kind: Pod
  metadata:
    labels:
      app: apple
    name: apple-app
    namespace: default
  spec:
    containers:
    - args:
      - -text=apple
      image: hashicorp/http-echo
      imagePullPolicy: Always
      name: apple-app
      resources: {}
    restartPolicy: Always
- apiVersion: v1
  kind: Pod
  metadata:
    labels:
      app: banana
    name: banana-app
    namespace: default
  spec:
    containers:
    - args:
      - -text=banana
      image: hashicorp/http-echo
      imagePullPolicy: Always
      name: banana-app
      resources: {}
    restartPolicy: Always
kind: List
metadata:
  resourceVersion: ""
  selfLink: ""
apiVersion: v1
items:
- apiVersion: v1
  kind: Service
  metadata:
    name: apple-service
    namespace: default
  spec:
    ports:
    - port: 5678
      protocol: TCP
      targetPort: 5678
    selector:
      app: apple
    sessionAffinity: None
    type: ClusterIP
  status:
    loadBalancer: {}
- apiVersion: v1
  kind: Service
  metadata:
    name: banana-service
    namespace: default
  spec:
    ports:
    - port: 5678
      protocol: TCP
      targetPort: 5678
    selector:
      app: banana
    sessionAffinity: None
    type: ClusterIP
  status:
    loadBalancer: {}
kind: List
metadata:
  resourceVersion: ""
  selfLink: ""
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: example-ingress
  annotations:
    nginx.ingress.kubernetes.io/ssl-redirect: "false"
    nginx.ingress.kubernetes.io/force-ssl-redirect: "false"
    nginx.ingress.kubernetes.io/rewrite-target: /
    kubernetes.io/ingress.class: "nginx"
spec:
  rules:
  - host: <host-name>
    http:
      paths:
        - path: /apple
          backend:
            serviceName: apple-service
            servicePort: 5678
        - path: /banana
          backend:
            serviceName: banana-service
            servicePort: 5678
```

- (Optional) Hosted Zone 설정
  - AWS Console에서 Route 53 Hosted Zone 에서, Domain 이 Amazon NLB 를 가리키도록 설정 가능
  <https://console.aws.amazon.com/route53/v2/hostedzones#>



## Deploy Cert Manager

- cert-manager install document.
<https://cert-manager.io/docs/installation/>

```yaml
$ kubectl apply -f https://github.com/jetstack/cert-manager/releases/download/v1.6.1/cert-manager.yaml
```

### Create ClusterIssueer

- cluster issueer 생성 예시 (letsencrypt)

```yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: <email-address>
    privateKeySecretRef:
      name: letsencrypt
    solvers:
    - http01:
        ingress:
          class: nginx
          podTemplate:
            spec:
              nodeSelector:
                "kubernetes.io/os": linux
```


### Test Ingress TLS

Ingress 에 annotation 추가 및 tls 설정 시, 설정한 tls secretName 기준으로 해당 namespace 에 tls secret 및 certificate 가 생성됨.

```sh
$ kubectl get certificate,secret

certificate.cert-manager.io/tls-secret   True    tls-secret   22d
secret/tls-secret                                         kubernetes.io/tls                     2      22d
```

- Test Ingress manifest 참고.

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: example-ingress
  annotations:
    nginx.ingress.kubernetes.io/ssl-redirect: "false"
    nginx.ingress.kubernetes.io/force-ssl-redirect: "false"
    nginx.ingress.kubernetes.io/rewrite-target: /
    kubernetes.io/ingress.class: "nginx"
    ### cluster issue 지정
    cert-manager.io/cluster-issuer: letsencrypt
spec:
  rules:
  - host: <host-name>
    http:
      paths:
        - path: /apple
          backend:
            serviceName: apple-service
            servicePort: 5678
        - path: /banana
          backend:
            serviceName: banana-service
            servicePort: 5678
  ### tls 설정
  tls:
  - hosts:
    - <host-name>
    secretName: tls-secret
```
