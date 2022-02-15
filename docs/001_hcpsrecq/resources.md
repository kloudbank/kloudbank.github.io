---
title: Resources
date: 2021-11-11
sidebar: 'auto'
author: 'noisonnoiton'
---
Definition of Service & API Resources

## Services
Service List-up & Language, Framework, Environments

### Service List

Name | Type | Lang. | Framework | port
-- | -- | -- | -- | --
hcp-sre-apps-gateway | Gateway Service | Java | Spring Boot (Spring Cloud Gateway) | 8081~8089
hcp-sre-apps-eureka | Eureka Service | Java | Spring Boot (Spring Cloud Eureka) | 8091~8099
hcp-sre-apps-config | Config Server | Java | Spring Boot (Spring Cloud Config) | 8090
hcp-sre-apps-task | Task Service | Python | FastAPI | 8001
hcp-sre-apps-monitoring | Monitoring Service | Python | FastAPI | 8002
hcp-sre-apps-summary | Summary Service | Python | Module | 8003

### Service Flow

@startuml

footer Kubernetes Plant-UML
scale max 1024 width

' Kubernetes
!define KubernetesPuml https://raw.githubusercontent.com/dcasati/kubernetes-PlantUML/master/dist

!includeurl KubernetesPuml/kubernetes_Common.puml
!includeurl KubernetesPuml/kubernetes_Context.puml
!includeurl KubernetesPuml/kubernetes_Simplified.puml

!includeurl KubernetesPuml/OSS/KubernetesIng.puml

left to right direction

rectangle "IC" as ic {
    rectangle "DWP Portal" as dwp
    database "Redis" as redis
    [Gateway Service] as gateway_ic
    [Config Server] as config
    [Summary Service] as summary
}
node "CQ" as cq {
    rectangle "K8S Resource" {
      [Argo Workflow API] as argowf
      [k8s API] as k8s
    }
    [Task Service] as task
    [Monitoring Service] as monitor
    /' [Gateway Service] as gateway_cq
    [Eureka Service] as eureka '/
    KubernetesIng(ing_cq, "Ingress Router", "")
}

note left of gateway_ic : Spring Boot \n\n Spring Cloud Gateway \n\n return stream/json Response
/' note top of eureka : Spring Boot \n\n Spring Cloud Eureka \n\n * Eureka Server * '/
note bottom of summary : Python Module \n\n SSEClient (from sseclient) \n\n return EventSourceResponse
note bottom of monitor : Python FastAPI \n\n K8SClient, Argo SDK \n\n return EventSourceResponse
note right of task : Python FastAPI \n\n Argo SDK (from openapi_client) \n\n return json Response

dwp ..* redis
dwp -down-> gateway_ic
gateway_ic ..* config
/' gateway_ic -> gateway_cq
gateway_cq ..* eureka
eureka ..* task
eureka ..* monitor '/
gateway_ic -down-> ing_cq
ing_cq ..* task
ing_cq ..* monitor
summary -down-> redis
summary -> gateway_ic
task -> argowf
monitor .down.* argowf
monitor .down.* k8s

@enduml

