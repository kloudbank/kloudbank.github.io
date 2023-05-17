(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{667:function(t,s,a){t.exports=a.p+"assets/img/2021-07-31-20-45-21.67874db3.png"},668:function(t,s,a){t.exports=a.p+"assets/img/2021-07-31-20-48-38.88a5a2b1.png"},669:function(t,s,a){t.exports=a.p+"assets/img/2021-08-03-21-45-24.2a7907ab.png"},670:function(t,s,a){t.exports=a.p+"assets/img/2021-08-03-21-45-46.3c419137.png"},671:function(t,s,a){t.exports=a.p+"assets/img/2021-08-03-21-48-47.bc86c38c.png"},672:function(t,s,a){t.exports=a.p+"assets/img/2021-08-03-21-49-13.7596c187.png"},673:function(t,s,a){t.exports=a.p+"assets/img/2021-08-07-15-46-52.af7c26a4.png"},674:function(t,s,a){t.exports=a.p+"assets/img/2021-08-07-15-47-14.7ef4b051.png"},773:function(t,s,a){"use strict";a.r(s);var n=a(15),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("div",{staticClass:"custom-block tip"},[n("p",{staticClass:"title"},[t._v("Overview")]),n("p",[t._v("Micro Service Architecture에서 App 간 또는 외부 I/F 하기 위한 방법 중"),n("br"),t._v("\nrestful api를 이용하여 App 또는 I/F를 호출하는 방법을 설명 함")])]),n("h2",{attrs:{id:"block-i-o-vs-non-block-i-o"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#block-i-o-vs-non-block-i-o"}},[t._v("#")]),t._v(" Block I/O vs Non-Block I/O")]),t._v(" "),n("div",{staticClass:"custom-block danger"},[n("p",{staticClass:"title"},[t._v("Block 이란?")]),n("p",[t._v("File R/W, TCP 통신 등은 일반적인 aplication에서 직접 수행 될 수 없고 IO를 수행하기 위해서는"),n("br"),t._v("\n커널에 한번 이상 시스템 콜을 보내야한다."),n("br"),t._v("\n시스템 Call을 보내게되면 그 순간에 커널로 제어권이 넘어가고(context-switch),"),n("br"),t._v("\n유저 프로세스(or 스레드)는 제어권이 다시 돌아 오기 전에는 block이 된다."),n("br"),t._v("\n쉽게 말하자면 block 이 되어 있는 동안 유저프로세스는 다른 작업을 하지 못하게 된다.")])]),n("p",[n("img",{attrs:{src:a(667),alt:""}})]),t._v(" "),n("ul",[n("li",[t._v("시스템 콜이 들어오면, 커널은 I/O 작업이 완료되기전에는 응답을 하지않는다.")]),t._v(" "),n("li",[t._v("즉 IO 작업이 완료되기전에는 제어권을 커널이 갖고있는다")]),t._v(" "),n("li",[t._v("그렇기에 시스템 콜을 보낸후에, 유저 프로세스는 응답을 받기 전에는 block이 되어 다른 작업을 하지못한다. 즉 IO 작업이 완료되기 전에는 다른 작업을 수행하지 못한다.")])]),t._v(" "),n("div",{staticClass:"custom-block warning"},[n("p",{staticClass:"title"},[t._v("Non-Block 이란?")]),n("p",[t._v("흔히 비동기 호출과 혼돈되는데, I/O 작업을 위해 시스템 Call이 호촐되는 동안 커널에 제어권이 넘어가는 것이 아니라,"),n("br"),t._v("\nApplication에서 제어권을 가지고 있어 해당 process에서 다른 서비스 요청을 처리할 수 있다.")])]),n("p",[n("img",{attrs:{src:a(668),alt:""}})]),t._v(" "),n("ul",[n("li",[t._v("시스템 콜이 들어오면, 커널은 IO 작업의 완료 여부와는 무관하게 즉시 응답을 해준다. (완료 되지않았다면 에러코드를 응답함.)")]),t._v(" "),n("li",[t._v("이는 커널이 시스템 콜을 받자마자 제어권을 다시 유저 프로세스에게 넘겨 준다는 것이기에, 유저 프로세스는 IO 가 완료 되기 전에도 다른 작업을 할수있는 것이다.")]),t._v(" "),n("li",[t._v("유저 프로세스는 다른 작업들을 수행하다가 중간 중간에 시스템 콜을 보내서 IO가 완료되었는지 커널에게 물어보게된다.")])]),t._v(" "),n("h2",{attrs:{id:"webclient"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#webclient"}},[t._v("#")]),t._v(" WebClient")]),t._v(" "),n("p",[t._v("WebClient는 Spring5 에 추가된 인터페이스다. spring5 이전에는 비동기 클라이언트로 AsyncRestTemplate를"),n("br"),t._v("\n사용을 했지만 spring5 부터는 Deprecated 되어 있다. 만약 spring5 이후 버전을 사용한다면 AsyncRestTemplate 보다는"),n("br"),t._v("\nWebClient 사용하는 것을 추천한다. 아직 spring 5.2(현재기준) 에서 AsyncRestTemplate 도 존재하긴 한다.")]),t._v(" "),n("p",[t._v("cf) https://docs.spring.io/spring-framework/docs/5.0.7.RELEASE/spring-framework-reference/web-reactive.html#webflux-client")]),t._v(" "),n("h3",{attrs:{id:"용도별-webclient-bean-생성하기"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#용도별-webclient-bean-생성하기"}},[t._v("#")]),t._v(" 용도별 WebClient Bean 생성하기")]),t._v(" "),n("p",[t._v("External API를 호출 할 때, Target 서비스 특성에 맞게 API Key, Header, 공통 헤더, Timeout등 공통 설정이 적용된"),n("br"),t._v("\nWebClient를 Bean을 생성함.")]),t._v(" "),n("ul",[n("li",[t._v("SSL Validate 무효화 설정(사설인증서 또는 별로 CA Root 적용된 경우 필요)")]),t._v(" "),n("li",[t._v("External API 호출을 위해 필요한 정보(API Key,  Cookie, Timeout 등)와 Base URL을 지정하여 webclient를 생성"),n("div",{staticClass:"language-java line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-java"}},[n("code",[n("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Bean")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("name "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"randomProfile"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("WebClient")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("getRandomProfileAPI")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("throws")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("SSLException")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// SSL 인증서 검증 무효화 설정")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("SslContext")]),t._v(" sslContext "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("SslContextBuilder")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("forClient")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n                          "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("trustManager")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("InsecureTrustManagerFactory")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("INSTANCE"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n                          "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("build")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("HttpClient")]),t._v(" httpClient "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("HttpClient")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("create")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n                          "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("secure")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("t "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),t._v(" t"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("sslContext")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("sslContext"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n                          "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("option")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ChannelOption")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("CONNECT_TIMEOUT_MILLIS"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("10000")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Webclient 공통 정보 설정 : Header, API Key")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("WebClient")]),t._v(" webClient "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("WebClient")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("builder")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n                                 "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("clientConnector")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ReactorClientHttpConnector")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("httpClient"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n                                 "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("baseUrl")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("randomProfileUri"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n                                 "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("defaultHeader")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"API-BEARER"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"skcc.com"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n                                 "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("build")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" webClient"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[t._v("1")]),n("br"),n("span",{staticClass:"line-number"},[t._v("2")]),n("br"),n("span",{staticClass:"line-number"},[t._v("3")]),n("br"),n("span",{staticClass:"line-number"},[t._v("4")]),n("br"),n("span",{staticClass:"line-number"},[t._v("5")]),n("br"),n("span",{staticClass:"line-number"},[t._v("6")]),n("br"),n("span",{staticClass:"line-number"},[t._v("7")]),n("br"),n("span",{staticClass:"line-number"},[t._v("8")]),n("br"),n("span",{staticClass:"line-number"},[t._v("9")]),n("br"),n("span",{staticClass:"line-number"},[t._v("10")]),n("br"),n("span",{staticClass:"line-number"},[t._v("11")]),n("br"),n("span",{staticClass:"line-number"},[t._v("12")]),n("br"),n("span",{staticClass:"line-number"},[t._v("13")]),n("br"),n("span",{staticClass:"line-number"},[t._v("14")]),n("br"),n("span",{staticClass:"line-number"},[t._v("15")]),n("br"),n("span",{staticClass:"line-number"},[t._v("16")]),n("br"),n("span",{staticClass:"line-number"},[t._v("17")]),n("br"),n("span",{staticClass:"line-number"},[t._v("18")]),n("br")])])])]),t._v(" "),n("h3",{attrs:{id:"webclient를-이용하여-external-api-호출"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#webclient를-이용하여-external-api-호출"}},[t._v("#")]),t._v(" WebClient를 이용하여 External API 호출")]),t._v(" "),n("ol",[n("li",[n("p",[t._v("Bean 참조")]),t._v(" "),n("div",{staticClass:"language-java line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-java"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("RestClient")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n "),n("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Autowired")]),t._v("\n "),n("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Qualifier")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"randomProfile"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("WebClient")]),t._v(" clientRandom"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[t._v("1")]),n("br"),n("span",{staticClass:"line-number"},[t._v("2")]),n("br"),n("span",{staticClass:"line-number"},[t._v("3")]),n("br"),n("span",{staticClass:"line-number"},[t._v("4")]),n("br"),n("span",{staticClass:"line-number"},[t._v("5")]),n("br"),n("span",{staticClass:"line-number"},[t._v("6")]),n("br")])])]),t._v(" "),n("li",[n("p",[t._v("단순 데이터 처리 : 응답을 Mono<T> 사용하여 처리")]),t._v(" "),n("div",{staticClass:"language-java line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-java"}},[n("code",[t._v(" "),n("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@GetMapping")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"randomprofile"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Mono")]),n("span",{pre:!0,attrs:{class:"token generics"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("getProfile")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n   log"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("info")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"calling external api"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n   "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("clientRandom"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("get")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("uri")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"/api"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("retrieve")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("bodyToMono")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[t._v("1")]),n("br"),n("span",{staticClass:"line-number"},[t._v("2")]),n("br"),n("span",{staticClass:"line-number"},[t._v("3")]),n("br"),n("span",{staticClass:"line-number"},[t._v("4")]),n("br"),n("span",{staticClass:"line-number"},[t._v("5")]),n("br")])])]),t._v(" "),n("li",[n("p",[t._v("배열 등 복합구조 처리: 응답을 Flux<T> 사용하여 처리")]),t._v(" "),n("div",{staticClass:"language-java line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-java"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// List<Tweet>을 위해 Flux 사용")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@GetMapping")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"tweets"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Flux")]),n("span",{pre:!0,attrs:{class:"token generics"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Tweet")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("getTweets")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  log"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("info")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"calling external api"')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("clientTweet"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("get")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("uri")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('""')]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("retrieve")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("bodyToFlux")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Tweet")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[t._v("1")]),n("br"),n("span",{staticClass:"line-number"},[t._v("2")]),n("br"),n("span",{staticClass:"line-number"},[t._v("3")]),n("br"),n("span",{staticClass:"line-number"},[t._v("4")]),n("br"),n("span",{staticClass:"line-number"},[t._v("5")]),n("br"),n("span",{staticClass:"line-number"},[t._v("6")]),n("br")])])])]),t._v(" "),n("h3",{attrs:{id:"webflux-mono-vs-flux"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#webflux-mono-vs-flux"}},[t._v("#")]),t._v(" WebFlux Mono vs Flux")]),t._v(" "),n("p",[t._v("WebFlux는 Spring5에서 새롭게 추가되 서버에서 Reactive 스타일의 App 개발을 위한 Module임"),n("br"),t._v(" "),n("img",{attrs:{src:a(669),alt:""}})]),t._v(" "),n("p",[n("img",{attrs:{src:a(670),alt:""}})]),t._v(" "),n("p",[t._v("본 가이드에서는 External API 호출을 위한 Client 영역만 설명함"),n("br"),t._v("\nServlet 영역에는 SpringMVC, Rest Client를 위해서는 WebFlux를 위한 WebClient를 적용함")]),t._v(" "),n("ul",[n("li",[t._v("Mono<T> : 0~1 개의 데이터 전달"),n("br"),t._v(" "),n("img",{attrs:{src:a(671),alt:""}})]),t._v(" "),n("li",[t._v("Flux<T> : 0~N 개의 데이터 전달"),n("br"),t._v(" "),n("img",{attrs:{src:a(672),alt:""}})])]),t._v(" "),n("h2",{attrs:{id:"성능-비교-예시"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#성능-비교-예시"}},[t._v("#")]),t._v(" 성능 비교 예시")]),t._v(" "),n("table",[n("thead",[n("tr",[n("th",{staticStyle:{"text-align":"left"}},[t._v("Non-Block I/O")]),t._v(" "),n("th",{staticStyle:{"text-align":"left"}},[t._v("Block I/O")])])]),t._v(" "),n("tbody",[n("tr",[n("td",{staticStyle:{"text-align":"left"}},[n("img",{attrs:{src:a(673),alt:""}})]),t._v(" "),n("td",{staticStyle:{"text-align":"left"}},[n("img",{attrs:{src:a(674),alt:""}})])])])]),t._v(" "),n("h3",{attrs:{id:"non-block-i-o"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#non-block-i-o"}},[t._v("#")]),t._v(" Non-Block I/O")]),t._v(" "),n("ul",[n("li",[t._v("Requests      [total, rate, throughput]         250, 50.18, 49.14")]),t._v(" "),n("li",[t._v("Duration      [total, attack, wait]             5.087s, 4.982s, 105.579ms")]),t._v(" "),n("li",[t._v("Latencies     [min, mean, 50, 90, 95, 99, max]  103.283ms, 108.07ms, 107.816ms, 111.332ms, 114.109ms, 121.721ms, 135.554ms")]),t._v(" "),n("li",[t._v("Bytes In      [total, mean]                     38250, 153.00")]),t._v(" "),n("li",[t._v("Bytes Out     [total, mean]                     0, 0.00")]),t._v(" "),n("li",[t._v("Success       [ratio]                           100.00%")]),t._v(" "),n("li",[t._v("Status Codes  [code:count]                      200:250")])]),t._v(" "),n("h3",{attrs:{id:"block-i-o"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#block-i-o"}},[t._v("#")]),t._v(" Block I/O")]),t._v(" "),n("ul",[n("li",[t._v("Requests      [total, rate, throughput]         250, 50.24, 18.86")]),t._v(" "),n("li",[t._v("Duration      [total, attack, wait]             13.259s, 4.976s, 8.283s")]),t._v(" "),n("li",[t._v("Latencies     [min, mean, 50, 90, 95, 99, max]  108.7ms, 4.19s, 4.505s, 7.55s, 7.93s, 8.215s, 8.283s")]),t._v(" "),n("li",[t._v("Bytes In      [total, mean]                     38250, 153.00")]),t._v(" "),n("li",[t._v("Bytes Out     [total, mean]                     0, 0.00")]),t._v(" "),n("li",[t._v("Success       [ratio]                           100.00%")]),t._v(" "),n("li",[t._v("Status Codes  [code:count]                      200:250")])]),t._v(" "),n("Comment")],1)}),[],!1,null,null,null);s.default=e.exports}}]);