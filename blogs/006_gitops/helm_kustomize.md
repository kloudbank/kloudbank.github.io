---
title: Helm + Kustomize
date: 2022-03-07
tags:
- kubernates
- helm
- kustomize
categories: 
- GitOps
sidebar: 'auto'
author: 'jaemyeong.lee'
---

kustomize 를 활용한 helm 배포 방식 및 활용 가능성 검토.

# kubernates deploy 에 helm 과 kustomize 결합하기

보통 kubernates 에 deploy 를 하기 위해서 yaml 파일을 사용하게 되는데요.
argoCD 를 예를 들면 아래 제공되는 yaml 파일을 이용해서 배포할 수 있습니다.
> [`argoCD manifests/install.yaml`](https://github.com/argoproj/argo-cd/blob/master/manifests/install.yaml)
그런데 배포에 필요한 세부적인 설정이 필요한 경우 제공된 yaml 파일을 직접 수정해야 하기 때문에 매우 번거로운 방법입니다.
그래서 보통 helm package 로 배포를 하게 되는데요.
helm package 를 이용한 배포 방법은 values.yaml 을 통해서 상세설정을 할 수 있는 좋은 방법으로 많이 사용되고 있습니다.
이 글은 helm package 와 kustomize 를 결합하는 배포 방법에 대해 소개해 드리려고 합니다.
yaml 파일을 이용하는 방법과 helm 단독 배포 방식 그리고 kustomize 를 결합한 방법이 어떤 차이와 이점이 있는지 비교하면서 보시기 바랍니다.
추가로 argoCD 가 helm, kustomize 를 처리하는 방식을 이해하는데도 도움이 됩니다.

[이 글을 읽기전에 아래 내용을 숙지하세요.]

- 이 가이드는 argoCD 를 설치하는 가이드는 아닙니다.
- helm 배포와 kustomzie 배포 방법을 비교하기 위해 argoCD 설치를 예시로 사용하였습니다.

[실습을 위해서는 로컬 환경에 맞게 아래 프로그램 설치가 필요합니다.]

- docker-desktop 설치
- helm cli 3.0 이상 설치
- kubectl cli 설치
- kustomize cli 설치

자 그럼 실습을 시작해 볼까요?

## [Case 1] helm install 을 사용하여 배포하는 방법

helm install 배포 방법은 가장 많이 사용하는 방식으로 대부분 익숙한 방법입니다.
최종 모습과 비교하기 위한 것이니 참고로 보시기 바랍니다.

- helm install 을 이용한 argocCD 배포

  ``` bash
  ## helm repoistory 를 등록합니다.
  $ helm repo add argo https://argoproj.github.io/argo-helm
  "argo" has been added to your repositories

  ## namespace 를 생성합니다.
  ## kubernates(docker desktop) 에 접속한 상태여야 합니다.
  $ kubectl create ns my-argocd
  namespace/my-argocd created

  ## helm install
  $ helm install my-argocd -n my-argocd argo/argo-cd
  NAME: my-argocd
  LAST DEPLOYED: Mon Mar  7 12:59:10 2022
  NAMESPACE: my-argocd
  STATUS: deployed
  REVISION: 1

  ## pod 확인
  $ kubectl get pod -n my-argocd
  NAME                                                READY   STATUS    RESTARTS   AGE
  my-argocd-application-controller-844b4d5947-5g6pn   1/1     Running   0          23s
  my-argocd-dex-server-556657c7f4-8wsn6               1/1     Running   0          23s
  my-argocd-redis-88db9fff8-jztjj                     1/1     Running   0          23s
  my-argocd-repo-server-66c569469c-4n79h              1/1     Running   0          23s
  my-argocd-server-674ffff767-dt6r4                   1/1     Running   0          23s

  ## helm release 확인
  $ helm list
  NAME            NAMESPACE       REVISION        UPDATED                                 STATUS          CHART           APP VERSION
  my-argocd       my-argocd       1               2022-03-07 14:14:30.62671 +0900 KST     deployed        argo-cd-3.35.2  v2.2.5
  ```

- replicas 를 변경하기 위해 아래 내용으로 my-values.yaml 파일을 생성합니다.

  ``` yaml
  # my-values.yaml
  controller:
    replicas: 2
  server:
    replicas: 2
  ```

- my-values.yaml 로 helm 을 배포합니다.

  ``` bash
  ## helm upgrade 를 사용합니다.
  ## my-values.yml 파일이 있는 폴더에서 실행합니다. 
  $ helm upgrade my-argocd -n my-argocd argo/argo-cd -f my-values.yaml
  Release "my-argocd" has been upgraded. Happy Helming!
  NAME: my-argocd
  LAST DEPLOYED: Mon Mar  7 14:25:27 2022
  NAMESPACE: my-argocd
  STATUS: deployed
  REVISION: 2

  ## pod count 변화 확인
  $ kubectl get pod -n my-argocd
  NAME                                                READY   STATUS              RESTARTS   AGE
  my-argocd-application-controller-844b4d5947-5g6pn   1/1     Running             0          12m
  my-argocd-application-controller-844b4d5947-wvwrj   0/1     ContainerCreating   0          2s
  my-argocd-dex-server-556657c7f4-8wsn6               1/1     Running             0          12m
  my-argocd-redis-88db9fff8-jztjj                     1/1     Running             0          12m
  my-argocd-repo-server-66c569469c-4n79h              1/1     Running             0          12m
  my-argocd-server-674ffff767-c8b2r                   0/1     ContainerCreating   0          2s
  my-argocd-server-674ffff767-dt6r4                   1/1     Running             0          12m
  ```

- helm uninstall 명령어로 배포된 helm 과 리소스를 같이 삭제할 수 있습니다.

  ``` bash
  ## helm uninstall
  $ helm uninstall my-argocd
  release "my-argocd" uninstalled
  ```

## [Case 2] helm template 을 사용하여 배포하는 방법

이 방법은 helm package 를 yaml 형태로 만든 다음 kubectl apply -f 명령어를 사용하여 배포하는 방식입니다.
이 방법을 사용하시는 분은 거의 없을거란 생각이 드는데요.
이 방법의 이점은 helm 를 배포하기전에 yaml 파일을 미리 검토해 볼 수 있고
kubectl diff 명령어로 배포된 형상과 미리 비교할 수도 있습니다.
결과적으로 helm package 의 이점과 yaml 파일의 이점을 동시에 갖게 되는데요.
참고로 argoCD 가 helm 을 처리할때 내부적으로 이 방식으로 처리하고 있습니다.

- helm template 으로 yaml 파일을 생성하고 kubectl apply 로 배포합니다.

  ``` bash
  ## helm template 으로 temp.yaml 파일을 생성합니다.
  $ helm template my-argocd argo/argo-cd > temp.yaml
  created temp.yaml

  ## temp.yaml 파일의 내용을 확인합니다.
  $ cat temp.yaml
  ...생략...

  ## kubectl apply 로 배포합니다.
  $ kubectl apply -f temp.yaml -n my-argocd
  ...생략...
  deployment.apps/my-argocd-application-controller created
  deployment.apps/my-argocd-repo-server created
  deployment.apps/my-argocd-server created
  deployment.apps/my-argocd-dex-server created
  deployment.apps/my-argocd-redis created

  ## pod 확인
  $ kubectl get pod -n my-argocd
  NAME                                                READY   STATUS    RESTARTS   AGE
  my-argocd-application-controller-844b4d5947-rt45c   1/1     Running   0          39s
  my-argocd-dex-server-556657c7f4-xbjr8               1/1     Running   0          38s
  my-argocd-redis-88db9fff8-wxrx4                     1/1     Running   0          38s
  my-argocd-repo-server-66c569469c-b4q7x              1/1     Running   0          39s
  my-argocd-server-674ffff767-5gzch                   1/1     Running   0          38s
  ```

- replicas 를 변경하기 위해 아래 내용으로 my-values.yaml 파일을 생성합니다.

  ``` yaml
  # my-values.yaml
  controller:
    replicas: 2
  server:
    replicas: 2
  ```

- my-values.yaml 을 적용하여 배포합니다.

  ``` bash
  ## my-values.yaml 로 temp.yaml 파일을 생성합니다.
  $ helm template my-argocd argo/argo-cd -f my-values.yaml > temp.yaml
  created temp.yaml

  ## temp.yaml 파일의 내용에서 replicas: 부분을 확인합니다.
  $ cat temp.yaml | grep replicas: -B 20
  ...생략...
  
  ## kubectl diff 명령어로 이전 배포 항목과 비교합니다.
  $ kubectl diff -f temp.yaml -n my-argocd > diff.yaml
  created diff.yaml

  ## diff.yaml 파일을 확인합니다.
  $ cat diff.yaml
  ...중략...
  -  replicas: 1
  +  replicas: 2 
  ...중략...
  -  replicas: 1
  +  replicas: 2 
  ...중략...

  ## --dry-run=client 옵션으로 yaml 파일 validation 을 체크합니다.
  $ kubectl apply -f temp.yaml -n my-argocd --dry-run=client
  ...중략...
  deployment.apps/my-argocd-application-controller configured (dry run)
  deployment.apps/my-argocd-repo-server configured (dry run)
  deployment.apps/my-argocd-server configured (dry run)
  deployment.apps/my-argocd-dex-server configured (dry run)
  deployment.apps/my-argocd-redis configured (dry run)

  ## --dry-run=server 옵션으로 yaml 파일이 배포되는 시점의 validation 을 체크합니다.
  $ kubectl apply -f temp.yaml -n my-argocd --dry-run=server
  ...중략...
  deployment.apps/my-argocd-application-controller configured (server dry run)
  deployment.apps/my-argocd-repo-server unchanged (server dry run)
  deployment.apps/my-argocd-server configured (server dry run)
  deployment.apps/my-argocd-dex-server unchanged (server dry run)
  deployment.apps/my-argocd-redis unchanged (server dry run)

  ## --dry-run=server 옵션은 label selector, pvc spec 변경 등 pod 가 실행중인 상태에서 변경할 수 없는 리소스를 체크해 줍니다.
  ## label selector, pvc spec 변경이 필요한 경우에는 기존 리소스를 먼저 삭제하고 배포해야 합니다.

  ## 최종 yaml 파일을 배포합니다.
  $ kubectl apply -f temp.yaml -n my-argocd
  ...생략...
  deployment.apps/my-argocd-application-controller configured
  deployment.apps/my-argocd-repo-server unchanged
  deployment.apps/my-argocd-server configured
  deployment.apps/my-argocd-dex-server unchanged
  deployment.apps/my-argocd-redis unchanged

  ## pod count 변화 확인
  $ kubectl get pod -n my-argocd
  NAME                                                READY   STATUS              RESTARTS   AGE
  my-argocd-application-controller-844b4d5947-5g6pn   1/1     Running             0          12m
  my-argocd-application-controller-844b4d5947-wvwrj   0/1     ContainerCreating   0          2s
  my-argocd-dex-server-556657c7f4-8wsn6               1/1     Running             0          12m
  my-argocd-redis-88db9fff8-jztjj                     1/1     Running             0          12m
  my-argocd-repo-server-66c569469c-4n79h              1/1     Running             0          12m
  my-argocd-server-674ffff767-c8b2r                   0/1     ContainerCreating   0          2s
  my-argocd-server-674ffff767-dt6r4                   1/1     Running             0          12m
  ```

- kubectl delete -f 명령어로 배포된 리소스를 삭제할 수 있습니다.

  ``` bash
  ## kubectl delete 사용
  ## 이전에 배포했던 temp.yaml 파일을 사용해야 합니다.
  $ kubectl delete -f temp.yaml -n my-argocd
  ...중략...
  deployment.apps "my-argocd-application-controller" deleted
  deployment.apps "my-argocd-repo-server" deleted
  deployment.apps "my-argocd-server" deleted
  deployment.apps "my-argocd-dex-server" deleted
  deployment.apps "my-argocd-redis" deleted

  ## namesapce 를 삭제하는 방법도 있으나, namespace 범위밖에 있는 리소스가 있기 때문에
  ## 가능한 이전에 배포했던 temp.yaml 파일을 사용해서 삭제하도록 합니다.
  ```

## [Final Case] helm 과 kustomize 의 결합

이제 최종적으로 소개드리려고 하는 helm 과 kustomize 의 결합 방법입니다.
이 방법은 위 과정에서 진행해본 helm package, helm template 방식에 kustomize 의 이점을 더할 수 있는 방법입니다.
kubernates 에서 설명하는 kustomize 의 사용법과 장점은 아래 사아트를 참고하시기 바랍니다.
> <https://kubernetes.io/ko/docs/tasks/manage-kubernetes-objects/kustomization/>
kustomize 의 공식 사이트에서 상세 스펙을 확인할 수 있습니다.
> <https://kustomize.io/>

- kustomize helm plug-in 을 사용하여 helm package 를 사용할 수 있습니다.

  ``` yaml
  ## kustomization.yaml 파일을 생성하고 아래 내용을 작성합니다.
  helmCharts:
    - name: argo-cd
      repo: https://argoproj.github.io/argo-helm
      version: 3.26.5
      releaseName: my-argocd
      namespace: my-argocd
      valuesFile: my-values.yaml 
      includeCRDs: true # CustomResourceDefinition 이 있을 경우 true
  ```

  ``` bash
  ## kustomize build 명령어로 배포용 yaml 파일을 생성합니다.
  $ kustomize build . --enable-helm > temp.yaml
  created temp.yaml

  ## temp.yaml 파일의 내용을 확인합니다.
  $ cat temp.yaml
  ...생략...

  ## 최종 yaml 파일을 배포합니다.
  $ kubectl apply -f temp.yaml -n my-argocd
  ...생략...
  deployment.apps/my-argocd-application-controller created
  deployment.apps/my-argocd-dex-server created
  deployment.apps/my-argocd-redis created
  deployment.apps/my-argocd-repo-server created
  deployment.apps/my-argocd-server created

  ## pod  확인
  $ kubectl get pod -n my-argocd
  NAME                                                READY   STATUS    RESTARTS   AGE
  my-argocd-application-controller-57b9d9f584-ctctl   1/1     Running   0          25s
  my-argocd-application-controller-57b9d9f584-rq5qz   1/1     Running   0          25s
  my-argocd-dex-server-b8cdffbbc-dcksr                1/1     Running   0          25s
  my-argocd-redis-7b46b74bc9-4dbgc                    1/1     Running   0          25s
  my-argocd-repo-server-5745dc9456-grg79              1/1     Running   0          25s
  my-argocd-server-b598c7865-5jd8t                    1/1     Running   0          24s
  my-argocd-server-b598c7865-b92gt                    1/1     Running   0          24s

  ## 그럼 kubectl apply -k 명령어로 배포가 될까요?
  $ kubectl apply -k .
  error: json: unknown field "includeCRDs"
  # kubectl apply -k 로는 배포가 되지 않습니다.
  # 이유는 kustomize build 에서 --enable-helm 옵션이 필요하기 때문입니다.
  ```

  ``` yaml
  ## 실제로 argoCD 를 사용해서 배포할 경우 위와 같은 오류가 발생합니다.
  # argoCD 에서 kustomize 명령어에 옵션을 추가하도록 설정이 필요합니다.
  # argocd values.yaml 에 아래 설정을 추가합니다.
  server:
    config:
      kustomize.buildOptions: --enable-helm=true
  ```

- kubectl delete -f 명령어로 배포된 리소스를 삭제할 수 있습니다.

  ``` bash
  ## kubectl delete 사용
  ## 이전에 배포했던 temp.yaml 파일을 사용해야 합니다.
  $ kubectl delete -f temp.yaml -n my-argocd
  ...중략...
  deployment.apps "my-argocd-application-controller" deleted
  deployment.apps "my-argocd-repo-server" deleted
  deployment.apps "my-argocd-server" deleted
  deployment.apps "my-argocd-dex-server" deleted
  deployment.apps "my-argocd-redis" deleted

  ## namesapce 를 삭제하는 방법도 있으나, namespace 범위밖에 있는 리소스가 있기 때문에
  ## 가능한 이전에 배포했던 temp.yaml 파일을 사용해서 삭제하도록 합니다.
  ```

여기까지는 helm template 방식과 별 차이가 없어 보입니다.
차이점은 helm repository 를 등록하지 않아도 사용할 수 있다는 것입니다.
이게 이점이라고 할수는 없겠죠?
이제 kustomize 의 장점을 활용해 볼 차례입니다.
아래와 같은 케이스에서 사용할때 kustomize 는 그 진가를 발휘합니다.

### [Case 1] helm chart 에는 없는 resource 를 배포해줘야 할때

  ``` yaml
  ## 아래와 같은 secret 을 추가로 배포하기 위해 my-secret.yaml 파일을 생성한다.
  # my-secret.yaml
  apiVersion: v1
  kind: Secret
  metadata:
    name: my-argocd-secret
  type: Opaque
  stringData:
    foo: bar

  ## kustomization.yaml 파일에 my-secret.yaml 리소스를 추가한다.
  helmCharts:
    - name: argo-cd
      repo: https://argoproj.github.io/argo-helm
      version: 3.26.5
      releaseName: my-argocd
      namespace: my-argocd
      valuesFile: my-values.yaml 
      includeCRDs: true

  resources:
    - my-secret.yaml
  ```

  ``` bash
  ## kustomize build 명령어로 배포용 yaml 파일을 생성합니다.
  $ kustomize build . --enable-helm > temp.yaml
  created temp.yaml

  ## temp.yaml 파일의 내용을 확인합니다.
  $ cat temp.yaml | grep my-argocd-secret -A 3 -B 3
  # 아래와 유사한 출력을 볼 수 있습니다.
  apiVersion: v1
  kind: Secret
  metadata:
    name: my-argocd-secret
  stringData:
    foo: bar
  type: Opaque

  ## kubectl diff 명령어로 이전 배포 항목과 비교합니다.
  $ kubectl diff -f temp.yaml -n my-argocd
  # 아래와 유사한 출력을 볼 수 있습니다.
  +apiVersion: v1
  +data:
  +  foo: YmFy
  +kind: Secret
  +metadata:
  +  name: my-argocd-secret
  +  namespace: my-argocd
  +type: Opaque

  ## 최종 yaml 파일을 배포합니다.
  $ kubectl apply -f temp.yaml -n my-argocd
  ...중략...
  secret/my-argocd-secret created
  ...중략...
  ```

### [Case 2] 여러개의 helm chart 를 하나로 묶어서 관리하고 싶을때

  ``` yaml
  ## 2개의 helm chart 를 배포하는 kustomization.yaml 을 각각 생성합니다.
  ## 아래와 같은 폴더 구조를 생성합니다.
  ./root
    ./argocd
      kustomization.yaml
      my-values.yaml
    ./argocd-redis
      kustomization.yaml
      my-values.yaml
    kustomization.yaml

  ## ./argocd/kustomization.yaml
  helmCharts:
    - name: argo-cd
      repo: https://argoproj.github.io/argo-helm
      version: 3.26.5
      releaseName: my-argocd
      namespace: my-argocd
      valuesFile: my-values.yaml
      includeCRDs: true

  ## ./argocd/my-values.yaml
  controller:
    replicas: 2
  server:
    replicas: 2

  ## ./argocd-redis/kustomization.yaml
  helmCharts:
    - name: redis
      repo: https://charts.bitnami.com/bitnami
      version: 16.4.0
      releaseName: my-argocd-redis
      namespace: my-argocd
      valuesFile: my-values.yaml
      includeCRDs: false

  ## ./argocd-redis/my-values.yaml
  architecture: standalone

  ## ./kustomization.yaml
  bases:
    - argocd
    - argocd-redis
  ```
  
  ``` bash
  ## ./root 폴더에서 yaml 파일 명령을 실행합니다.
  $ kustomize build . --enable-helm > temp.yaml
  created temp.yaml

  ## temp.yaml 파일을 확인합니다.
  $ cat temp.yaml
  ...생략...

  ## 최종 yaml 파일을 배포합니다.
  ## my-argocd-redis-master 가 추가로 배포된 것을 확인할 수 있습니다.
  $ kubectl apply -f temp.yaml -n my-argocd
  ...중략...
  deployment.apps/my-argocd-application-controller created
  deployment.apps/my-argocd-dex-server created
  deployment.apps/my-argocd-redis created
  deployment.apps/my-argocd-repo-server created
  deployment.apps/my-argocd-server created
  statefulset.apps/my-argocd-redis-master created

  ## pod  확인
  ## my-argocd-redis-master 가 추가로 배포된 것을 확인할 수 있습니다.
  $ kubectl get pod -n my-argocd
  NAME                                                READY   STATUS    RESTARTS   AGE
  my-argocd-application-controller-57b9d9f584-2gp82   1/1     Running   0          30s
  my-argocd-application-controller-57b9d9f584-8jbw6   1/1     Running   0          30s
  my-argocd-dex-server-b8cdffbbc-n4jln                1/1     Running   1          29s
  my-argocd-redis-7b46b74bc9-v5nsg                    1/1     Running   0          29s
  my-argocd-redis-master-0                            1/1     Running   0          28s
  my-argocd-repo-server-5745dc9456-47g9g              1/1     Running   0          29s
  my-argocd-server-b598c7865-j55wb                    1/1     Running   0          28s
  my-argocd-server-b598c7865-kw6lz                    1/1     Running   0          28s

  ```

## argoCD 와 연관성

위에서 실습한 명령어들은 실제로 argoCD 의 내부 동작에서 사용되는 명령어와 일치합니다.

- helm template : helm chart type argoCD application 에서 refresh 를 할 때
  - helm pull : helm chart pull 포함
- kustomize build : kustomize type argoCD application 에서 refresh 를 할 때
- kubectl diff : argoCD 화면에서 App Diff 버튼을 클릭할 때

.끝.
