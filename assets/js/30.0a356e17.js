(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{591:function(s,e,t){s.exports=t.p+"assets/img/ebs-console-view.ce33dedd.png"},747:function(s,e,t){"use strict";t.r(e);var n=t(15),a=Object(n.a)({},(function(){var s=this,e=s.$createElement,n=s._self._c||e;return n("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[n("ul",[n("li",[s._v("Amazon Elastic Block Store(Amazon EBS)는 EC2 인스턴스에 사용할 수 있는 블록 수준 스토리지 볼륨을 제공")]),s._v(" "),n("li",[s._v("Amazon EKS에서 Container Volume으로 활용"),n("br"),s._v(" "),n("a",{attrs:{href:"https://docs.aws.amazon.com/ko_kr/AWSEC2/latest/UserGuide/AmazonEBS.html",target:"_blank",rel:"noopener noreferrer"}},[s._v("https://docs.aws.amazon.com/ko_kr/AWSEC2/latest/UserGuide/AmazonEBS.html"),n("OutboundLink")],1)])]),s._v(" "),n("h2",{attrs:{id:"deploy-ebs-csi-driver"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#deploy-ebs-csi-driver"}},[s._v("#")]),s._v(" Deploy EBS CSI Driver")]),s._v(" "),n("ul",[n("li",[n("p",[s._v("EBS Container Storage Interface")])]),s._v(" "),n("li",[n("p",[s._v("Amazon EBS Volume의 수명 주기 관리를 허용하도록 하는 Interface")])]),s._v(" "),n("li",[n("p",[s._v("Persistent Volume 에 Amazon EBS 를 활용하기 위하여 배포")])]),s._v(" "),n("li",[n("p",[s._v("CSI Driver Deploy Manual"),n("br"),s._v(" "),n("a",{attrs:{href:"https://docs.aws.amazon.com/ko_kr/eks/latest/userguide/ebs-csi.html",target:"_blank",rel:"noopener noreferrer"}},[s._v("https://docs.aws.amazon.com/ko_kr/eks/latest/userguide/ebs-csi.html"),n("OutboundLink")],1),n("br"),s._v("\n| "),n("small",[s._v("NOTE : "),n("em",[s._v("oidc key 입력 시, domain region 설정 주의.")])])])])]),s._v(" "),n("hr"),s._v(" "),n("ul",[n("li",[s._v("배포 내역")])]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("$ kubectl get deploy -n kube-system | grep ebs\nebs-csi-controller             2/2     2            2           18d\n\n$ kubectl get daemonset -n kube-system | grep ebs\nebs-csi-node   2         2         2       2            2           kubernetes.io/os=linux                            18d\n\n$ kubectl get po -n kube-system | grep ebs\nebs-csi-controller-6cbd957db7-6d4x6             4/4     Running   0          33m\nebs-csi-controller-6cbd957db7-hzl96             4/4     Running   0          5d21h\nebs-csi-node-bdmts                              3/3     Running   0          2d5h\nebs-csi-node-gd9zz                              3/3     Running   0          8d\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br")])]),n("ul",[n("li",[s._v("EBS CSI Driver Github Repository 참조"),n("br"),s._v(" "),n("a",{attrs:{href:"https://github.com/kubernetes-sigs/aws-ebs-csi-driver",target:"_blank",rel:"noopener noreferrer"}},[s._v("https://github.com/kubernetes-sigs/aws-ebs-csi-driver"),n("OutboundLink")],1)])]),s._v(" "),n("h2",{attrs:{id:"create-volume-on-container"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#create-volume-on-container"}},[s._v("#")]),s._v(" Create Volume on Container")]),s._v(" "),n("ul",[n("li",[s._v("StorageClass YAML 설정 및 생성\n"),n("ul",[n("li",[s._v("EBS는 WaitForFirstConsumer 바인딩 모드를 지원")]),s._v(" "),n("li",[s._v("PersistentVolumeClaim 를 사용하는 Pod 생성 시점까지, Volume 바인딩과 프로비저닝을 지연"),n("br"),s._v(" "),n("a",{attrs:{href:"https://kubernetes.io/ko/docs/concepts/storage/storage-classes/#%EB%B3%BC%EB%A5%A8-%EB%B0%94%EC%9D%B8%EB%94%A9-%EB%AA%A8%EB%93%9C",target:"_blank",rel:"noopener noreferrer"}},[s._v("https://kubernetes.io/ko/docs/concepts/storage/storage-classes/#볼륨-바인딩-모드"),n("OutboundLink")],1)])])])]),s._v(" "),n("div",{staticClass:"language-yml line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-yml"}},[n("code",[n("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("kind")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" StorageClass\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("apiVersion")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" storage.k8s.io/v1\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("metadata")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),n("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" <sc name"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("provisioner")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" ebs.csi.aws.com\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("volumeBindingMode")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" WaitForFirstConsumer\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br")])]),n("ul",[n("li",[s._v("PersistentVolumeClaim YAML 설정 및 생성\n"),n("ul",[n("li",[s._v("accessMode는 ReadWriteOnce로 지정"),n("br"),s._v("\n: 일반적인 용도의 EBS Volume은 여러 Instance에 Multi Attach가 불가능"),n("br"),s._v(" "),n("a",{attrs:{href:"https://kubernetes.io/ko/docs/concepts/storage/persistent-volumes/#%EC%A0%91%EA%B7%BC-%EB%AA%A8%EB%93%9C",target:"_blank",rel:"noopener noreferrer"}},[s._v("https://kubernetes.io/ko/docs/concepts/storage/persistent-volumes/#접근-모드"),n("OutboundLink")],1)])])])]),s._v(" "),n("div",{staticClass:"language-yml line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-yml"}},[n("code",[n("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("apiVersion")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" v1\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("kind")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" PersistentVolumeClaim\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("metadata")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),n("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("namespace")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" <namespace name"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")]),s._v("\n  "),n("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" <pvc name"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("spec")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),n("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("accessModes")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" ReadWriteOnce\n  "),n("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("storageClassName")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" <sc name"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")]),s._v("\n  "),n("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("resources")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("requests")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),n("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("storage")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" <request size"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br")])]),n("ul",[n("li",[s._v("pvc 사용하는 pod 최초 생성시, PersistentVolume Bound")])]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("$ kubectl get pvc -n session-dev | grep redis\nredis-cache           Bound    pvc-c7ac4781-948d-4f9e-8050-f72406b25753   4Gi        RWO            ebs-sc         18d\nredis-session         Bound    pvc-0f1bfdee-e631-4368-83e6-f9d47435dbcb   4Gi        RWO            ebs-sc         18d\n\n$ kubectl get pv -n session-dev | grep redis\npvc-0f1bfdee-e631-4368-83e6-f9d47435dbcb   4Gi        RWO            Delete           Bound    session-dev/redis-session            ebs-sc                  18d\npvc-c7ac4781-948d-4f9e-8050-f72406b25753   4Gi        RWO            Delete           Bound    session-dev/redis-cache              ebs-sc                  18d\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br")])]),n("ul",[n("li",[s._v("EKS Cluster에 pvc / pv 생성 후, EBS Volume 자동 생성\n"),n("ul",[n("li",[s._v("AWS Console에서 EBS Volume 확인"),n("br"),s._v(" "),n("img",{attrs:{src:t(591),alt:""}})])])])])])}),[],!1,null,null,null);e.default=a.exports}}]);