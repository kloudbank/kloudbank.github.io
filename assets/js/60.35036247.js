(window.webpackJsonp=window.webpackJsonp||[]).push([[60],{738:function(e,t,i){"use strict";i.r(t);var l=i(13),r=Object(l.a)({},(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[i("ul",[i("li",[e._v("ML Pipeline Introduction")]),e._v(" "),i("li",[e._v("Model Serving 을 위한 kubernetes 환경에서의 Inference Server 활용 방안 검증.")])]),e._v(" "),i("h2",{attrs:{id:"ml-pipeline"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#ml-pipeline"}},[e._v("#")]),e._v(" ML Pipeline")]),e._v(" "),i("p",[e._v("아래 내용은 전체적인 ML Pipeline 의 workflow 및 각 step 에 대한 간단한 설명."),i("br"),e._v("\nInference Server 를 구성하여 Model 을 Serving 구성 전, 기초 지식 정리 내역.")]),e._v(" "),i("p",[i("img",{attrs:{src:"https://t1.daumcdn.net/cfile/tistory/999826355C34C41714",title:"ml-pipe",alt:"ml-pipe"}})]),e._v(" "),i("h3",{attrs:{id:"data-prep"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#data-prep"}},[e._v("#")]),e._v(" Data Prep.")]),e._v(" "),i("ul",[i("li",[e._v("Data ingestion : 머신러닝에 필요한 학습 데이타를 외부로 부터 받아서 저장하는 단계")]),e._v(" "),i("li",[e._v("Data analytics : 수집된 데이터를 분석하여, 의미를 찾아내고,필요한 피쳐(특징)을 찾아내는 단계로 주로 빅데이터 분석 시스템이 많이 활용된다. EDA - (Exploratory Data Analytics) 방법을 많이 사용하는데, 저장된 데이타를 그래프로 시각화해서 각 값간의 관계나 데이타의 분포등을 분석한다.")]),e._v(" "),i("li",[e._v("Data Transformation : 수집된 데이타에서 학습에 필요한 데이타만 걸러내고, 학습에 적절하도록 컨버팅 하는 단계. 예를 들어 이미지 데이타의 크기를 정형화하고, - 크롭핑 처리를 한후에, 행렬 데이타로 변환하는 과정등이 이에 해당한다.")]),e._v(" "),i("li",[e._v("Data Validation : 변환된 데이타가 문제는 없는지 데이타 포맷이나 범위등을 검증하는 단계")]),e._v(" "),i("li",[e._v("Data Splitting : 머신러닝 학습을 위해서 데이타를 학습용,테스트용,검증용으로 나눈다.")])]),e._v(" "),i("h3",{attrs:{id:"model-creation"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#model-creation"}},[e._v("#")]),e._v(" Model Creation")]),e._v(" "),i("ul",[i("li",[e._v("Build a Model : 머신러닝 모델을 만들고 학습하는 단계")]),e._v(" "),i("li",[e._v("Model Validation : 만들어진 모델을 검증하는 단계")]),e._v(" "),i("li",[e._v("Training at scale : 더 많은 데이터를 더 큰 인프라에서 학습 시켜서 정확도를 높이고, 하이퍼 패러미터 튜닝을 통해서 모델을 튜닝하는 단계로 주로 대규모 클러스터나 GPU 자원등을 활용한다.")])]),e._v(" "),i("h3",{attrs:{id:"roll-out"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#roll-out"}},[e._v("#")]),e._v(" Roll out")]),e._v(" "),i("ul",[i("li",[e._v("Roll-out (Deploying) : 학습된 모델을 운영환경에 배포하는 단계")]),e._v(" "),i("li",[i("b",[i("u",[e._v("Serving : 배포된 모델을 통해서 머신러닝 모델을 서비스로 제공하는 형태. 유스케이스에 따라서 배치 형태로 서빙을 하거나 실시간으로 서빙하는 방법이 있다.")])])]),e._v(" "),i("li",[e._v("Monitoring : 머신러닝 모델 서비스를 모니터링 해서 정확도등에 문제가 없는지 지속적으로 관찰하는 단계")]),e._v(" "),i("li",[e._v("Logging : 모델에 서비스에 대한 로그 모니터링")])]),e._v(" "),i("h2",{attrs:{id:"model-serving"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#model-serving"}},[e._v("#")]),e._v(" Model Serving")]),e._v(" "),i("ul",[i("li",[i("p",[e._v("Inference Server")]),e._v(" "),i("ul",[i("li",[e._v("Kubernetes 환경 에서 Triton Inference Server 활용")]),e._v(" "),i("li",[e._v("Triton Inference Server SDK Test")])])]),e._v(" "),i("li",[i("p",[e._v("KFServing")]),e._v(" "),i("ul",[i("li",[e._v("Model Serving")]),e._v(" "),i("li",[e._v("Istio, Knative,,")]),e._v(" "),i("li",[e._v("Kubeflow,,,??")])])])]),e._v(" "),i("Comment")],1)}),[],!1,null,null,null);t.default=r.exports}}]);