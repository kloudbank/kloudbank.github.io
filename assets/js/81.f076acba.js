(window.webpackJsonp=window.webpackJsonp||[]).push([[81],{808:function(t,s,a){"use strict";a.r(s);var e=a(15),n=Object(e.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("p",[t._v("Collab. Portal 의 역거래 관련 Backend 기능에 대한 설계 및 개발.")]),t._v(" "),a("h2",{attrs:{id:"data-flow"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#data-flow"}},[t._v("#")]),t._v(" Data Flow")]),t._v(" "),a("p",[t._v("역거래 기능 Data Flow Exmaple.")]),t._v(" "),a("ol",[a("li",[t._v("User 접속 및 gateway 를 통한 websocket 연결")]),t._v(" "),a("li",[t._v("Document 생성/수정 및 저장 API 호출")]),t._v(" "),a("li",[t._v("Document Data 를 DB 에 저장")]),t._v(" "),a("li",[t._v("Event push API 호출하여 gateway 에 event 전달")]),t._v(" "),a("li",[t._v("특정 client 에만 websocket event push")]),t._v(" "),a("li",[t._v("Websocket event 수신하여 후속 process 수행")])]),t._v(" "),a("img",{attrs:{src:"https://www.plantuml.com/plantuml/svg/RP9BJy90483l-oicwxaGV70WjK71619DUj6ByR1j9uMmR4kxAwZutvrzq1AKqynyCzDlbvssMZJQR2HZ4ajK1GFw7MxXoMLmy3d4xUeB9wDn4cSYNqyknDQ8vFar1HelKST3MqxYeMrB3en6mph67_OQ6oKalBJOS10ju5uRYXbVg7EqKXwfga3WiwLG2gKZkO_XcumQpBLGfQIMRdjQDLh8u_xQPU0yQU0jDUqIxjB5k-MrJJhqA3JknASZfOyxk3Lew2CxpDegNwDswsqOEdw2QDgiFcWKPh8oXMkgVIMtXNFdxjWdpdHmxsoLPWtIxF2bBkpIUPKFd5tUO57bdHn1aOcM5bA7sQ3ICBztowYho3f55kuR1ab_DQo_f2Zfpvr9WnFW8mxiM8kZWZhSeJrddIiuTDGAivUSXGgnO1BGLOyCGVy_17RDcSiZ-O_F3J_nZQC_VCnPU3bUgRzDDgLNIE_x5m00",alt:"uml diagram"}}),t._v(" "),a("h2",{attrs:{id:"component-view"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#component-view"}},[t._v("#")]),t._v(" Component View")]),t._v(" "),a("p",[a("strong",[t._v("Todo")]),t._v(" Document data 생성 및 websocket event push example.")]),t._v(" "),a("ul",[a("li",[t._v("Websocket server 연결을 위한 Nest Gateway 생성")]),t._v(" "),a("li",[t._v("Document DB 는 MongoDB 기반으로 생성")]),t._v(" "),a("li",[t._v("Websocket 연결 client 정보를 Redis cache 기반으로 관리")])]),t._v(" "),a("img",{attrs:{src:"https://www.plantuml.com/plantuml/svg/PP713i8W38RlF4Mp-tm2OzHjCTwMwCrug43S4WRBnZJ6-Eu2PIpH2vJlB_rRs8uM1pjrYZ7U3bn9o4wUP80Z12tnIej0fHPC6-58qQ3MKWNAAOOt0xXK3waj7D3A9xwkuP8dz-SYxkhZ8c3VEaMWnHkElZ3oHaAvfyh-86xi4rtheNsuob0eCr57FH7k0JLmDi8a2-iElmwbuLFd-uWcml1WmSBCa8jya-x5dI0b9gGSIYFC0MNE8oUwsgHPeWRh_9zHJVV8REjMzpLV",alt:"uml diagram"}}),t._v(" "),a("h2",{attrs:{id:"api-list"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#api-list"}},[t._v("#")]),t._v(" API List")]),t._v(" "),a("p",[t._v("MVP 기능 구현 시 필요한, API 개발 대상 list-up.")]),t._v(" "),a("h3",{attrs:{id:"todo-api"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#todo-api"}},[t._v("#")]),t._v(" Todo API")]),t._v(" "),a("p",[t._v("MongoDB 에 적재되는 document data "),a("strong",[t._v("Todo")]),t._v(" 의 CRUD 관련 API list.")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("Name")]),t._v(" "),a("th",[t._v("URI")]),t._v(" "),a("th",[t._v("Method")]),t._v(" "),a("th",[t._v("Remark")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("Todo 생성")]),t._v(" "),a("td",[t._v("POST")]),t._v(" "),a("td",[a("code",[t._v("/todos")])]),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v("Todo 목록")]),t._v(" "),a("td",[t._v("GET")]),t._v(" "),a("td",[a("code",[t._v("/todos")])]),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v("Todo 조회")]),t._v(" "),a("td",[t._v("GET")]),t._v(" "),a("td",[a("code",[t._v("/todos/{todoid}")])]),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v("Todo 수정")]),t._v(" "),a("td",[t._v("PUT")]),t._v(" "),a("td",[a("code",[t._v("/todos/{todoid}")])]),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v("Todo 삭제")]),t._v(" "),a("td",[t._v("DELETE")]),t._v(" "),a("td",[a("code",[t._v("/todos/{todoid}")])]),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v("Todo 완료 (downstream)")]),t._v(" "),a("td",[t._v("POST")]),t._v(" "),a("td",[a("code",[t._v("/todos/{todoid}/complete/downstream")])]),t._v(" "),a("td",[t._v("Todo status 완료 처리 및 Event API 연계 용도")])])])]),t._v(" "),a("h3",{attrs:{id:"event-api"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#event-api"}},[t._v("#")]),t._v(" Event API")]),t._v(" "),a("p",[t._v("Websocket gateway 기반 event emitting, broadcasting 을 위한 API list.")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("Name")]),t._v(" "),a("th",[t._v("URI")]),t._v(" "),a("th",[t._v("Method")]),t._v(" "),a("th",[t._v("Remark")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("Event 발생 (broadcast)")]),t._v(" "),a("td",[t._v("POST")]),t._v(" "),a("td",[a("code",[t._v("/events/downstream")])]),t._v(" "),a("td",[t._v("Socket event broadcasting")])]),t._v(" "),a("tr",[a("td",[t._v("Event user 기준 발생 (emitting)")]),t._v(" "),a("td",[t._v("POST")]),t._v(" "),a("td",[a("code",[t._v("/events/{userid}/downstream")])]),t._v(" "),a("td",[t._v("Socket event emitting")])])])]),t._v(" "),a("h2",{attrs:{id:"data-model-design"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#data-model-design"}},[t._v("#")]),t._v(" Data Model Design")]),t._v(" "),a("p",[t._v("Data Model Sample 설계 내역.")]),t._v(" "),a("h3",{attrs:{id:"todo-collection"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#todo-collection"}},[t._v("#")]),t._v(" Todo Collection")]),t._v(" "),a("p",[t._v("MongoDB 적재용 document data sample schema.")]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"title"}),a("ul",[a("li",[t._v("MongoDB 내부적으로 document 고유의 ObjectId type 의 "),a("strong",[t._v("_id")]),t._v(" 를 생성")]),t._v(" "),a("li",[t._v("Mongoose timestamp 설정으로 "),a("strong",[t._v("createdAt, updatedAt")]),t._v(" 자동 생성")])])]),a("table",[a("thead",[a("tr",[a("th",[t._v("Collection Name")]),t._v(" "),a("th",[t._v("Field Name")]),t._v(" "),a("th",[t._v("Data Type")]),t._v(" "),a("th",[t._v("Required")]),t._v(" "),a("th",[t._v("Unique")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("todos")]),t._v(" "),a("td",[t._v("todoid")]),t._v(" "),a("td",[t._v("Number")]),t._v(" "),a("td",[t._v("True")]),t._v(" "),a("td",[t._v("True")])]),t._v(" "),a("tr",[a("td",[t._v("todos")]),t._v(" "),a("td",[t._v("userid")]),t._v(" "),a("td",[t._v("String")]),t._v(" "),a("td",[t._v("True")]),t._v(" "),a("td",[t._v("True")])]),t._v(" "),a("tr",[a("td",[t._v("todos")]),t._v(" "),a("td",[t._v("content")]),t._v(" "),a("td",[t._v("Map")]),t._v(" "),a("td",[t._v("True")]),t._v(" "),a("td",[t._v("False")])]),t._v(" "),a("tr",[a("td",[t._v("todos")]),t._v(" "),a("td",[t._v("completed")]),t._v(" "),a("td",[t._v("String")]),t._v(" "),a("td",[t._v("True")]),t._v(" "),a("td",[t._v("False")])])])]),t._v(" "),a("ul",[a("li",[t._v("Sample data of documents")])]),t._v(" "),a("div",{staticClass:"language-json line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"todoid"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("87")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"userid"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"test001"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"content"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"title"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('""')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"bp-test"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"id"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"name"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('""')]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"template"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"type"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('""')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"if"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('""')]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"fields"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"date"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('""')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"qty"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"etc"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"code"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"status"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"enabled"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token null keyword"}},[t._v("null")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"message"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('""')]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"answer_dict"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"a"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('""')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"b"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('""')]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"answer_list"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"a"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('""')]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"b"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('""')]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"attach-list"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"completed"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br"),a("span",{staticClass:"line-number"},[t._v("13")]),a("br"),a("span",{staticClass:"line-number"},[t._v("14")]),a("br"),a("span",{staticClass:"line-number"},[t._v("15")]),a("br"),a("span",{staticClass:"line-number"},[t._v("16")]),a("br"),a("span",{staticClass:"line-number"},[t._v("17")]),a("br"),a("span",{staticClass:"line-number"},[t._v("18")]),a("br"),a("span",{staticClass:"line-number"},[t._v("19")]),a("br"),a("span",{staticClass:"line-number"},[t._v("20")]),a("br"),a("span",{staticClass:"line-number"},[t._v("21")]),a("br"),a("span",{staticClass:"line-number"},[t._v("22")]),a("br"),a("span",{staticClass:"line-number"},[t._v("23")]),a("br"),a("span",{staticClass:"line-number"},[t._v("24")]),a("br"),a("span",{staticClass:"line-number"},[t._v("25")]),a("br"),a("span",{staticClass:"line-number"},[t._v("26")]),a("br"),a("span",{staticClass:"line-number"},[t._v("27")]),a("br"),a("span",{staticClass:"line-number"},[t._v("28")]),a("br"),a("span",{staticClass:"line-number"},[t._v("29")]),a("br"),a("span",{staticClass:"line-number"},[t._v("30")]),a("br"),a("span",{staticClass:"line-number"},[t._v("31")]),a("br"),a("span",{staticClass:"line-number"},[t._v("32")]),a("br"),a("span",{staticClass:"line-number"},[t._v("33")]),a("br"),a("span",{staticClass:"line-number"},[t._v("34")]),a("br"),a("span",{staticClass:"line-number"},[t._v("35")]),a("br"),a("span",{staticClass:"line-number"},[t._v("36")]),a("br"),a("span",{staticClass:"line-number"},[t._v("37")]),a("br"),a("span",{staticClass:"line-number"},[t._v("38")]),a("br"),a("span",{staticClass:"line-number"},[t._v("39")]),a("br"),a("span",{staticClass:"line-number"},[t._v("40")]),a("br")])]),a("h3",{attrs:{id:"cache-key"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#cache-key"}},[t._v("#")]),t._v(" Cache Key")]),t._v(" "),a("p",[t._v("Websocket 연결 client 및 socketId 등을 관리하기 위한 Key 설계 내역.")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("Key Name")]),t._v(" "),a("th",[t._v("Type")]),t._v(" "),a("th",[t._v("Element Key Name")]),t._v(" "),a("th",[t._v("Unique")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("client-list")]),t._v(" "),a("td",[a("code",[t._v("Array")])]),t._v(" "),a("td",[t._v("userId")]),t._v(" "),a("td",[t._v("True")])]),t._v(" "),a("tr",[a("td",[t._v("client-list")]),t._v(" "),a("td",[a("code",[t._v("Array")])]),t._v(" "),a("td",[t._v("socketId")]),t._v(" "),a("td",[t._v("False")])]),t._v(" "),a("tr",[a("td",[t._v("client-list")]),t._v(" "),a("td",[a("code",[t._v("Array")])]),t._v(" "),a("td",[t._v("lastConnectedTime")]),t._v(" "),a("td",[t._v("False")])])])]),t._v(" "),a("ul",[a("li",[t._v("Sample data of RDB table")])]),t._v(" "),a("div",{staticClass:"language-json line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"userId"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"test002"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"socketId"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"3R7cDMRJZk6_acU9AAAH"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"lastConnectedTime"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"2022-08-11T06:44:31"')]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"userId"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"test001"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"socketId"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"r3zmjlRAYTv98CxyAAAD"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v('"lastConnectedTime"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"2022-08-11T06:44:02"')]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br")])]),a("h2",{attrs:{id:"development"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#development"}},[t._v("#")]),t._v(" Development")]),t._v(" "),a("p",[t._v("Backend Service 개발 내역 정리.")]),t._v(" "),a("h3",{attrs:{id:"source-code-repository"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#source-code-repository"}},[t._v("#")]),t._v(" Source code repository")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("MVP Service (hcp-bpcp-backend-mvp)")]),t._v(" "),a("ul",[a("li",[t._v("Github Repository: "),a("a",{attrs:{href:"https://github.com/hcp-bpcp/hcp-bpcp-backend-mvp",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://github.com/hcp-bpcp/hcp-bpcp-backend-mvp"),a("OutboundLink")],1)]),t._v(" "),a("li",[t._v("주요 기능:\n"),a("ul",[a("li",[t._v("MongoDB Collection CRUD API 제공")]),t._v(" "),a("li",[t._v("Todo data 완료 처리")]),t._v(" "),a("li",[t._v("MVP Event API 연계")])])])])]),t._v(" "),a("li",[a("p",[t._v("MVP Interface Service (hcp-bpcp-backend-mvp-event)")]),t._v(" "),a("ul",[a("li",[t._v("Github Repository: "),a("a",{attrs:{href:"https://github.com/hcp-bpcp/hcp-bpcp-backend-mvp-event",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://github.com/hcp-bpcp/hcp-bpcp-backend-mvp-event"),a("OutboundLink")],1)]),t._v(" "),a("li",[t._v("주요 기능:\n"),a("ul",[a("li",[t._v("Websocket Gateway")]),t._v(" "),a("li",[t._v("Redis cache 기반 websocket client 정보 관리")]),t._v(" "),a("li",[t._v("Websocket event emitting, broadcasting")]),t._v(" "),a("li",[t._v("Event API endpoint 제공")])])])])]),t._v(" "),a("li",[a("p",[t._v("Auth Service (hcp-bpcp-backend-auth)")]),t._v(" "),a("ul",[a("li",[t._v("Github Repository: "),a("a",{attrs:{href:"https://github.com/hcp-bpcp/hcp-bpcp-backend-auth",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://github.com/hcp-bpcp/hcp-bpcp-backend-auth"),a("OutboundLink")],1)]),t._v(" "),a("li",[t._v("주요 기능:\n"),a("ul",[a("li",[t._v("Ingress 기반 auth-url 의 인증 API endpoint 제공")]),t._v(" "),a("li",[t._v("Redis cache 기반 token data 관리 기능")]),t._v(" "),a("li",[t._v("JWT Token 인증 process 수행")])])])])])]),t._v(" "),a("h3",{attrs:{id:"admin-url"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#admin-url"}},[t._v("#")]),t._v(" Admin URL")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("API Docs.")]),t._v(" "),a("ul",[a("li",[t._v("MVP Service: "),a("a",{attrs:{href:"https://hcp-bpcp-backend-mvp.bpcp.kubepia.net/api-docs/",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://hcp-bpcp-backend-mvp.bpcp.kubepia.net/api-docs/"),a("OutboundLink")],1)]),t._v(" "),a("li",[t._v("MVP Event Service: "),a("a",{attrs:{href:"https://hcp-bpcp-backend-mvp-event.bpcp.kubepia.net/api-docs/",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://hcp-bpcp-backend-mvp-event.bpcp.kubepia.net/api-docs/"),a("OutboundLink")],1)]),t._v(" "),a("li",[t._v("Auth Service: "),a("a",{attrs:{href:"https://hcp-bpcp-backend-auth.bpcp.kubepia.net/api-docs/",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://hcp-bpcp-backend-auth.bpcp.kubepia.net/api-docs/"),a("OutboundLink")],1)])])]),t._v(" "),a("li",[a("p",[t._v("Monitoring 및 Test")]),t._v(" "),a("ul",[a("li",[t._v("Socket.IO Admin: "),a("a",{attrs:{href:"https://hcp-bpcp-socketio-admin.bpcp.kubepia.net",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://hcp-bpcp-socketio-admin.bpcp.kubepia.net"),a("OutboundLink")],1)]),t._v(" "),a("li",[t._v("Socket.IO Client: "),a("a",{attrs:{href:"https://hcp-bpcp-socketio-client.bpcp.kubepia.net",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://hcp-bpcp-socketio-client.bpcp.kubepia.net"),a("OutboundLink")],1)])])])]),t._v(" "),a("h2",{attrs:{id:"deployment-view"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#deployment-view"}},[t._v("#")]),t._v(" Deployment View")]),t._v(" "),a("p",[t._v("Cluster deployment view.")]),t._v(" "),a("h3",{attrs:{id:"api-sync-model"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#api-sync-model"}},[t._v("#")]),t._v(" API Sync Model")]),t._v(" "),a("ul",[a("li",[t._v("MVP service 호출 시, ingress auth-url 기반 인증")]),t._v(" "),a("li",[t._v("Ingress URL 기반 Websocket gateway 연결\n"),a("ul",[a("li",[t._v("auth-url 기반 인증 없음")]),t._v(" "),a("li",[a("code",[t._v("websocket-services")]),t._v(" 관련 ingress annotation 설정")])]),t._v(" "),a("div",{staticClass:"language-yaml line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[t._v("  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("nginx.ingress.kubernetes.io/websocket-services")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" hcp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("bpcp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("backend"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("mvp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("event\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("nginx.org/websocket-services")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" hcp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("bpcp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("backend"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("mvp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("event\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("nginx.ingress.kubernetes.io/proxy-read-timeout")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"3600"')]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("nginx.ingress.kubernetes.io/proxy-send-timeout")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"3600"')]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("nginx.ingress.kubernetes.io/proxy-body-size")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 8m\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br")])])]),t._v(" "),a("li",[t._v("MVP <-> MVP Event 등 backend service 간 API 연계는 k8s service name 기반으로 요청 "),a("strong",[a("u",[t._v("(인증 없음)")])])])]),t._v(" "),a("img",{attrs:{src:"https://www.plantuml.com/plantuml/svg/bLJBRjim4BphAnXTuW2rvLoAeeSYVg10qAOnOkHiqEJQ8Ym-G59EYgB_tXKbIs9ZEyv54eSpkxEx8k-SfzQNiaYk7QC544bVoUsNyPYy2Expf0C_8vQ3sEO-kIPk9vIXbagYD0S7XjoE8zXIjMjWn7-KQx0AFBZaYiD6AEX12ynESk-D-vfbbhwCjiBdvRfqO9bM7fGVCIqppgYZNcIxLZXS55JvvuUVcQJEWysuS3v9heHYHScXjCL_MNhQrKnBgTN8LALVga0ph_uZagMGfX0R0RnMdPCzBfTP1ottxDr4iMAX-GSLzshRsEfFY61dZ5ROTfSaiwAiEhkQwb9nQdyFM0ry8kaifqf1aTwGFmaXJ5Y6FqhwtOQHSJ8nPfGIwiW6g34znbAp7VZH_IEPS2bKuBY02Kqhv2XtLWXq595PW1Aa_w8IdA4CEf_hAgjow7DAaNumL9ib96h2GAWjBNsEvEernAK5vr9SfpV7wN9lS1UV5v9XZrQH4jvdDJZuWTkplXyy27l1u1ozytCPEVPpJeE_rS1etlU3otFKpilxnDX7nm-29oXMJzrmkgwG9Y8Isc5qCvpWYx0Ss2wcrTljy7f1wYm1RdiPRxUvkrQy8GHTM_-ny4sryGZwnHpK9nbjfcOlxc9D_7lyHE1jjzNXH3nKN_DfUnWuzNHD7PwtkMQbF9op8E3hqn4ju8KR8ZvLNqVY1PpCA4uZX0mALYr3r2IkkadO5bBLEuz_b2v0mq9Qk638q0w_DSCzXWKzRaGt3HcM9mdrxVAMWQxly3h1Q_CV",alt:"uml diagram"}})])}),[],!1,null,null,null);s.default=n.exports}}]);