(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{"/PDY":function(e,t,i){"use strict";i.d(t,"a",function(){return s});i("aurelia-framework");var n=i("VphZ"),s=function(){function e(){}var t=e.prototype;return t.convertIncomming=function(e){var t=n.a(e.map(function(e){return e.apiValue})),i=n.b().domain([0,t]).range([0,100]),s=e,o=Array.isArray(s),r=0;for(s=o?s:s[Symbol.iterator]();;){var a;if(o){if(r>=s.length)break;a=s[r++]}else{if((r=s.next()).done)break;a=r.value}var c=a;c.value=i(c.apiValue)}},t.convertOutgoing=function(e){var t=e.reduce(function(e,t){return e+parseFloat(t.value)},0),i=n.b().domain([0,t]).range([0,1]),s=e,o=Array.isArray(s),r=0;for(s=o?s:s[Symbol.iterator]();;){var a;if(o){if(r>=s.length)break;a=s[r++]}else{if((r=s.next()).done)break;a=r.value}var c=a;c.apiValue=i(c.value)}},e}()},0:function(e,t,i){i("GAND"),i("GmYv"),e.exports=i("b9nV")},Dcv1:function(e,t,i){"use strict";(function(e){i.d(t,"a",function(){return a});var n,s=i("aurelia-framework"),o=i("qQke"),r=i("/PDY"),a=Object(s.c)(o.a,r.a)(n=function(){function t(e,t){this.httpClient=e,this.converter=t,this.httpClient.configure(function(e){e.useStandardConfiguration().withBaseUrl("http://irc-eval.adaptcentre.ie/").withDefaults({headers:{Accept:"application/json","X-Requested-With":"Fetch"}})})}var i=t.prototype;return i.getRanking=function(){var e=this;console.log("Getting ranking from API");return this.httpClient.fetch("recommender/get_recommendation",{method:"get"}).then(function(e){return e.json()}).then(function(t){t=JSON.parse(t);for(var i=[],n=Object.entries(t),s=0;s<n.length;s++){var o=n[s],r=o[0],a=o[1];i.push({name:r,apiValue:a,value:0})}return e.converter.convertIncomming(i),i}).catch(function(e){return console.log(e),[]})},i.getDimensions=function(){var t=[{name:"Interoperability",desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum optio consectetur itaque exercitationem nisi commodi, molestias deleniti expedita doloremque ea tempore modi quidem magnam. Necessitatibus impedit veritatis ipsa architecto distinctio"},{name:"Licensing",desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum optio consectetur itaque exercitationem nisi commodi, molestias deleniti expedita doloremque ea tempore modi quidem magnam. Necessitatibus impedit veritatis ipsa architecto distinctio"},{name:"Trustworthiness",desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum optio consectetur itaque exercitationem nisi commodi, molestias deleniti expedita doloremque ea tempore modi quidem magnam. Necessitatibus impedit veritatis ipsa architecto distinctio"},{name:"Lorem 222",desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum optio consectetur itaque exercitationem nisi commodi, molestias deleniti expedita doloremque ea tempore modi quidem magnam. Necessitatibus impedit veritatis ipsa architecto distinctio"},{name:"Lorem 333",desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum optio consectetur itaque exercitationem nisi commodi, molestias deleniti expedita doloremque ea tempore modi quidem magnam. Necessitatibus impedit veritatis ipsa architecto distinctio"},{name:"Lorem 444",desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum optio consectetur itaque exercitationem nisi commodi, molestias deleniti expedita doloremque ea tempore modi quidem magnam. Necessitatibus impedit veritatis ipsa architecto distinctio"},{name:"Lorem 555",desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum optio consectetur itaque exercitationem nisi commodi, molestias deleniti expedita doloremque ea tempore modi quidem magnam. Necessitatibus impedit veritatis ipsa architecto distinctio"},{name:"Lorem 666",desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum optio consectetur itaque exercitationem nisi commodi, molestias deleniti expedita doloremque ea tempore modi quidem magnam. Necessitatibus impedit veritatis ipsa architecto distinctio"},{name:"Lorem 777",desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum optio consectetur itaque exercitationem nisi commodi, molestias deleniti expedita doloremque ea tempore modi quidem magnam. Necessitatibus impedit veritatis ipsa architecto distinctio"},{name:"Lorem 888",desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum optio consectetur itaque exercitationem nisi commodi, molestias deleniti expedita doloremque ea tempore modi quidem magnam. Necessitatibus impedit veritatis ipsa architecto distinctio"},{name:"Lorem 999",desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum optio consectetur itaque exercitationem nisi commodi, molestias deleniti expedita doloremque ea tempore modi quidem magnam. Necessitatibus impedit veritatis ipsa architecto distinctio"},{name:"Lorem 100",desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum optio consectetur itaque exercitationem nisi commodi, molestias deleniti expedita doloremque ea tempore modi quidem magnam. Necessitatibus impedit veritatis ipsa architecto distinctio"},{name:"Lorem 200",desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum optio consectetur itaque exercitationem nisi commodi, molestias deleniti expedita doloremque ea tempore modi quidem magnam. Necessitatibus impedit veritatis ipsa architecto distinctio"},{name:"Lorem 300",desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum optio consectetur itaque exercitationem nisi commodi, molestias deleniti expedita doloremque ea tempore modi quidem magnam. Necessitatibus impedit veritatis ipsa architecto distinctio"}];return console.log("Getting dimensions from API (mock)"),new e(function(e,i){var n,s;setTimeout(function(){e(t)},(n=500,s=2e3,Math.random()*(s-n)+n))})},i.getResults=function(e){return e||(e=[{type:"dimension",uri:"http://purl.org/eis/vocab/dqm#Interoperability",weight:"0.2692"},{type:"dimension",uri:"http://purl.org/eis/vocab/dqm#Licensing",weight:"0.2471"},{type:"dimension",uri:"http://github.io/jerdeb/lsqm#TrustworthinessDimension",weight:"0.4837"}]),this.httpClient.fetch("framework-apis/v4/irc-evaluation/rank/weighted/",{method:"post",body:Object(o.b)(e)}).then(function(e){return e.json()}).then(function(e){return e}).catch(function(e){return console.log(e),[]})},t}())||n}).call(this,i("25Wt"))},OH10:function(e,t,i){"use strict";i.d(t,"a",function(){return r});var n,s=i("aurelia-framework"),o=i("/PDY"),r=Object(s.c)(o.a)(n=function(){function e(e){this.converter=e,this.ranking=[],this.results=[],this.dimensions=[],this.userData={id:null,step1:{},step2:{},step3:{}}}var t=e.prototype;return t.setRanking=function(e){this.ranking=e},t.getRanking=function(){return JSON.parse(JSON.stringify(this.ranking))},t.setResults=function(e){this.results=e},t.getResults=function(){return JSON.parse(JSON.stringify(this.results))},t.setDimensions=function(e){this.dimensions=e},t.getDimensions=function(){return JSON.parse(JSON.stringify(this.dimensions))},t.getDimensionsDesc=function(e){var t=this.dimensions.findIndex(function(t){return t.name===e});if(-1!==t)return this.dimensions[t].desc},t.createResultRequestObject=function(e){e=e||this.ranking,this.converter.convertOutgoing(e);var t=[],i=e,n=Array.isArray(i),s=0;for(i=n?i:i[Symbol.iterator]();;){var o;if(n){if(s>=i.length)break;o=i[s++]}else{if((s=i.next()).done)break;o=s.value}var r=o;t.push({type:"dimension",uri:this.getDimensionURI(r.name),weight:r.apiValue.toString()})}return t},t.getDimensionURI=function(e){return"Interoperability"===e?"http://purl.org/eis/vocab/dqm#Interoperability":"Licensing"===e?"http://purl.org/eis/vocab/dqm#Licensing":"Trustworthiness"===e?"http://github.io/jerdeb/lsqm#TrustworthinessDimension":""},e}())||n},app:function(e,t,i){"use strict";i.r(t),i.d(t,"App",function(){return n});i("70NS"),i("SYky"),i("q4sD"),i("cFE2"),i("pYmE");var n=function(){function e(){this.message="Hello World!"}return e.prototype.configureRouter=function(e,t){this.router=t,e.title="Evaluation",e.map([{route:["","step_1"],name:"step_1",moduleId:"routes/step_1",nav:!0},{route:"step_2",name:"step_2",moduleId:"routes/step_2",nav:!0},{route:"step_3",name:"step_3",moduleId:"routes/step_3",nav:!0},{route:"step_4",name:"step_4",moduleId:"routes/step_4",nav:!0}])},e}()},"app.html":function(e,t){e.exports="<template>\n\t<router-view></router-view>\n</template>\n"},main:function(e,t,i){"use strict";var n={debug:!1,testing:!1},s=(i("70NS"),i("55Il"),i("25Wt"));function o(e){e.use.standardConfiguration().feature("resources/index"),n.debug&&e.use.developmentLogging(),n.testing&&e.use.plugin("aurelia-testing"),e.start().then(function(){return e.setRoot("app")})}i.d(t,"configure",function(){return o}),s.config({warnings:{wForgottenReturn:!1}})},pYmE:function(e,t,i){},"resources/elements/add-metric":function(e,t,i){"use strict";i.r(t),function(e){i.d(t,"AddMetric",function(){return f});var n,s,o,r,a=i("aurelia-framework"),c=i("OH10");var u,l,d,m,p,v,f=Object(a.c)(Element,c.a)((r=function(){function t(e,t){var i,n,s,r;i=this,n="metrics",r=this,(s=o)&&Object.defineProperty(i,n,{enumerable:s.enumerable,configurable:s.configurable,writable:s.writable,value:s.initializer?s.initializer.call(r):void 0}),this.element=e,this.dataStore=t}var i=t.prototype;return i.valueChanged=function(e,t){console.log(e)},i.attached=function(){console.log(this.metrics)},i.selectMetric=function(e){e.selected?e.selected=!1:e.selected=!0},i.addMetricsToRanking=function(){var t=this.metrics.filter(function(e){return!0===e.selected}),i=new CustomEvent("add-metrics-to-ranking",{detail:t,bubbles:!0});this.element.dispatchEvent(i),e("#addDimensionModal").modal("toggle")},t}(),u=(s=r).prototype,l="metrics",d=[a.b],m={configurable:!0,enumerable:!0,writable:!0,initializer:null},v={},Object.keys(m).forEach(function(e){v[e]=m[e]}),v.enumerable=!!v.enumerable,v.configurable=!!v.configurable,("value"in v||v.initializer)&&(v.writable=!0),v=d.slice().reverse().reduce(function(e,t){return t(u,l,e)||e},v),p&&void 0!==v.initializer&&(v.value=v.initializer?v.initializer.call(p):void 0,v.initializer=void 0),void 0===v.initializer&&(Object.defineProperty(u,l,v),v=null),o=v,n=s))||n}.call(this,i("EVdn"))},"resources/elements/add-metric.html":function(e,t){e.exports='<template>\n\n  <style>\n    .custom-modal-body {\n      overflow-y: scroll;\n      min-height: 30vh;\n      max-height: 70vh;\n    }\n\n    .metric-preview:hover {\n      cursor: pointer;\n      background-color: #f8f9fa;\n    }\n\n    \n  </style>\n\n  <div class="modal" id="addDimensionModal" tabindex="-1" role="dialog">\n    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">\n      <div class="modal-content">\n        <div class="modal-header">\n          <h5 class="modal-title">Select dimension to add to the ranking</h5>\n          <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n            <span aria-hidden="true">&times;</span>\n          </button>\n        </div>\n        <div class="modal-body custom-modal-body">\n          \n          <div repeat.for="metric of metrics" class="border border-dark rounded px-2 pt-2 mt-2 metric-preview no-select ${metric.selected ? \'bg-dark text-white\' : \'\'}" click.delegate="selectMetric(metric)">\n            <div class="d-flex">\n              <h5 class="mr-auto">\n                ${metric.name}\n              </h5>\n              <h5 class="${metric.selected ? \'text-success\' : \'\'}" show.bind="metric.selected" >\n                <i class="fas fa-check"></i>\n              </h5>\n            </div>\n            <div>\n              <p>\n                ${metric.desc}\n              </p>\n              </div>\n          </div>\n\n        </div>\n        <div class="modal-footer">\n          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>\n          <button type="button" class="btn btn-primary" click.delegate="addMetricsToRanking()">Add</button>\n        </div>\n      </div>\n    </div>\n  </div>\n</template>'},"resources/elements/dimension":function(e,t,i){"use strict";i.r(t),function(e){i.d(t,"Dimension",function(){return d});var n,s,o,r,a=i("aurelia-framework"),c=i("OH10");i("PKY6"),i("GM5V");function u(e,t,i,n){i&&Object.defineProperty(e,t,{enumerable:i.enumerable,configurable:i.configurable,writable:i.writable,value:i.initializer?i.initializer.call(n):void 0})}function l(e,t,i,n,s){var o={};return Object.keys(n).forEach(function(e){o[e]=n[e]}),o.enumerable=!!o.enumerable,o.configurable=!!o.configurable,("value"in o||o.initializer)&&(o.writable=!0),o=i.slice().reverse().reduce(function(i,n){return n(e,t,i)||i},o),s&&void 0!==o.initializer&&(o.value=o.initializer?o.initializer.call(s):void 0,o.initializer=void 0),void 0===o.initializer&&(Object.defineProperty(e,t,o),o=null),o}var d=Object(a.c)(Element,c.a)((o=l((s=function(){function t(e,t){u(this,"dimension",o,this),u(this,"readonly",r,this),this.element=e,this.dataStore=t}var i=t.prototype;return i.valueChanged=function(e,t){console.log(e)},i.attached=function(){var t=this;console.log("dimensions component attached"),e(this.element).find(".js-range-slider").ionRangeSlider({disable:this.readonly,onFinish:function(e){console.log("Dimension: "+t.dimension.name+" value changed from "+t.dimension.value+" to "+e.from),t.dimension.value=e.from}})},i.getDesc=function(){return this.dataStore.getDimensionsDesc(this.dimension.name)},i.remove=function(){var e=new CustomEvent("remove-dimension",{detail:this.dimension.id,bubbles:!0});this.element.dispatchEvent(e)},t}()).prototype,"dimension",[a.b],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),r=l(s.prototype,"readonly",[a.b],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),n=s))||n}.call(this,i("EVdn"))},"resources/elements/dimension.html":function(e,t){e.exports='<template>\n\n  <div class="col-12">\n\n    <div class="container border border-dark rounded">\n      \n      \x3c!-- HEADER --\x3e\n      <div class="row bg-light rounded pt-2">\n        <div class="col-10">\n          <h4>\n            ${dimension.name}\n          </h4>\n        </div>\n        <div class="col-2">\n          <h3 class="text-right" click.delegate="remove()" if.bind="!readonly">\n            <i class="fas fa-times pointer"></i>\n          </h3>\n        </div>\n      </div>\n\n      \x3c!-- BODY --\x3e\n      <div class="row pt-3">\n        <div class="col-6" style="min-height: 100px;">\n          \x3c!-- Ranking slider --\x3e\n          <input type="text" class="js-range-slider" name="my_range" \n            value="${dimension.value}" \n            data-min="0"\n            data-max="100" \n            data-grid="true" \n            data-hide-min-max="true"\n          />\n        </div>\n        <div class="col-6">\n            <p class="font-weight-light">\n              ${ getDesc() }\n            </p>\n        </div>\n      </div>\n\n    </div>\n\n  </div>    \n</template>'},"resources/elements/loading.html":function(e,t){e.exports='<template>\n  <div class="container-fluid loading-container">\n    <div class="row">\n      <div class="col-12 fitScreenY">\n        <div class="d-flex justify-content-center fitScreenY">\n            <div class="align-self-center">\n              <div class="spinner-border" style="width: 5rem; height: 5rem;" role="status">\n                <span class="sr-only">Loading...</span>\n              </div>\n            </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</template>'},"resources/elements/question":function(e,t,i){"use strict";i.r(t),i.d(t,"Question",function(){return v});var n,s,o,r,a=i("aurelia-framework");var c,u,l,d,m,p,v=Object(a.c)(Element)((r=function(){function e(e){var t,i,n,s;t=this,i="question",s=this,(n=o)&&Object.defineProperty(t,i,{enumerable:n.enumerable,configurable:n.configurable,writable:n.writable,value:n.initializer?n.initializer.call(s):void 0}),this.element=e,this.selected={yes:!1,no:!1}}var t=e.prototype;return t.clickedAnswer=function(e,t){this.question.answer=t,this.resetSelected(),this.selected[t]=!0,this.question.disabled=!1},t.resetSelected=function(){this.selected.yes=!1,this.selected.no=!1},t.valueChanged=function(e,t){console.log(e)},t.attached=function(){console.log("question component attached")},e}(),c=(s=r).prototype,u="question",l=[a.b],d={configurable:!0,enumerable:!0,writable:!0,initializer:null},p={},Object.keys(d).forEach(function(e){p[e]=d[e]}),p.enumerable=!!p.enumerable,p.configurable=!!p.configurable,("value"in p||p.initializer)&&(p.writable=!0),p=l.slice().reverse().reduce(function(e,t){return t(c,u,e)||e},p),m&&void 0!==p.initializer&&(p.value=p.initializer?p.initializer.call(m):void 0,p.initializer=void 0),void 0===p.initializer&&(Object.defineProperty(c,u,p),p=null),o=p,n=s))||n},"resources/elements/question.html":function(e,t){e.exports='<template>\n  <h3> \n    ${question.header}\n  </h3>\n  <p>\n    ${question.text}\n  </p>\n  <div class="btn-group btn-group-lg btn-block">\n    <button type="button" class="btn btn-outline-dark ${selected.yes ? \'active\' : \'\'}" click.delegate="clickedAnswer($event.target,\'yes\')">Yes</button>\n    <button type="button" class="btn btn-outline-dark ${selected.no ? \'active\' : \'\'}" click.delegate="clickedAnswer($event.target,\'no\')">No</button>\n  </div>\n</template>'},"resources/elements/result":function(e,t,i){"use strict";i.r(t),i.d(t,"Result",function(){return f});var n,s,o,r,a=i("aurelia-framework"),c=i("OH10");i("PKY6"),i("GM5V");var u,l,d,m,p,v,f=Object(a.c)(Element,c.a)((r=function(){function e(e,t){var i,n,s,r;i=this,n="result",r=this,(s=o)&&Object.defineProperty(i,n,{enumerable:s.enumerable,configurable:s.configurable,writable:s.writable,value:s.initializer?s.initializer.call(r):void 0}),this.element=e,this.dataStore=t}var t=e.prototype;return t.valueChanged=function(e,t){console.log(e)},t.attached=function(){console.log("result component attached"),this.rankValue=this.result["Rank-Value"].toFixed(4)},e}(),u=(s=r).prototype,l="result",d=[a.b],m={configurable:!0,enumerable:!0,writable:!0,initializer:null},v={},Object.keys(m).forEach(function(e){v[e]=m[e]}),v.enumerable=!!v.enumerable,v.configurable=!!v.configurable,("value"in v||v.initializer)&&(v.writable=!0),v=d.slice().reverse().reduce(function(e,t){return t(u,l,e)||e},v),p&&void 0!==v.initializer&&(v.value=v.initializer?v.initializer.call(p):void 0,v.initializer=void 0),void 0===v.initializer&&(Object.defineProperty(u,l,v),v=null),o=v,n=s))||n},"resources/elements/result.html":function(e,t){e.exports='<template>\n\n    <div class="col-12">\n  \n      <div class="container border border-dark rounded">\n        \n        \x3c!-- HEADER --\x3e\n        <div class="row bg-light rounded pt-2">\n          <div class="col-6">\n            <h4>\n              ${ result.Title }\n            </h4>\n          </div>\n          <div class="col-6">\n            <h4 class="text-right">\n              ${ rankValue }\n            </h4>\n          </div>\n        </div>\n  \n        \x3c!-- BODY --\x3e\n        <div class="row pt-3">\n          <div class="col-12">\n            <p>\n              ${ result.Description }\n            </p>\n          </div>\n        </div>\n  \n      </div>\n  \n    </div>    \n  </template>'},"resources/index":function(e,t,i){"use strict";function n(e){}i.r(t),i.d(t,"configure",function(){return n})},"routes/step_1":function(e,t,i){"use strict";i.r(t),i.d(t,"Step_1",function(){return r});var n,s=i("aurelia-framework"),o=i("4ysu"),r=Object(s.c)(o.c)(n=function(){function e(e){this.router=e,this.consent_checked=!1,this.loading=!0}var t=e.prototype;return t.attached=function(){this.loading=!1},t.next=function(){this.loading=!0,this.router.navigate("step_2/ranking")},e}())||n},"routes/step_1.html":function(e,t,i){e.exports='<template>\n\t\n\t\x3c!-- Loading Template --\x3e\n\t<require from="../resources/elements/loading.html"></require>\n\t<loading if.bind="loading"></loading>\n\n\t\x3c!-- Non Loading Template --\x3e\n\t<div class="container my-5">\n\n\t\t<div class="row">\n\t\t\t<div class="col-12">\n\t\t\t\t<h1 class="text-center display-3"> Welcome </h1>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div class="row mt-5">\n\t\t\t<div class="col-12">\n\t\t\t\tLorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit doloribus voluptatem commodi dolorem nisi architecto pariatur quis iste ex dolore ut perferendis accusamus exercitationem animi, eveniet esse dolorum laudantium ipsa. Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit doloribus voluptatem commodi dolorem nisi architecto pariatur quis iste ex dolore ut perferendis accusamus exercitationem animi, eveniet esse dolorum laudantium ipsa.\n\t\t\t</div>\n\t\t</div>\n\n\t\t\x3c!-- Consent form --\x3e\n\t\t<div class="row mt-5">\n\t\t\t<div class="col-12">\n\t\t\t\t<div class="card">\n\t\t\t\t\t<div class="card-header">\n\t\t\t\t\t\t<h2 class="text-center">\n\t\t\t\t\t\t\tConsent Form\n\t\t\t\t\t\t</h2>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="card-body">\n\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\tLorem ipsum dolor sit amet consectetur adipisicing elit. Quis dolorem facere id qui perferendis magni totam temporibus, aspernatur incidunt illum? Officiis vel minus saepe eligendi? Iure nemo sit sed illum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis dolorem facere id qui perferendis magni totam temporibus, aspernatur incidunt illum? Officiis vel minus saepe eligendi? Iure nemo sit sed illum.\n\t\t\t\t\t\t</p>\n\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\tLorem ipsum dolor sit amet consectetur adipisicing elit. Quis dolorem facere id qui perferendis magni totam temporibus, aspernatur incidunt illum? Officiis vel minus saepe eligendi? Iure nemo sit sed illum.\n\t\t\t\t\t\t</p>\n\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\tLorem ipsum dolor sit amet consectetur adipisicing elit. Quis dolorem facere id qui perferendis magni totam temporibus, aspernatur incidunt illum? Officiis vel minus saepe eligendi? Iure nemo sit sed illum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis dolorem facere id qui perferendis magni totam temporibus, aspernatur incidunt illum? Officiis vel minus saepe eligendi? Iure nemo sit sed illum.\n\t\t\t\t\t\t</p>\n\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\tLorem ipsum dolor sit amet consectetur adipisicing elit. Quis dolorem facere id qui perferendis magni totam temporibus, aspernatur incidunt illum? Officiis vel minus saepe eligendi? Iure nemo sit sed illum.\n\t\t\t\t\t\t</p>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\n\t\t\x3c!-- Consent checkbox --\x3e\n\t\t<div class="row mt-5">\n\t\t\t<div class="col-12 text-center">\n\t\t\t\t<span>\n\t\t\t\t\t<input type="checkbox" checked.bind="consent_checked"> \n\t\t\t\t\t<i>\n\t\t\t\t\t\tI have read the consent form and agree to participate in the study.\n\t\t\t\t\t</i>\n\t\t\t\t</span>\n\t\t\t</div>\n\t  </div>\n\n\t\t<div class="row mt-3">\n\t\t\t<div class="col-6 offset-3">\n\t\t\t\t<button class="btn btn-${consent_checked ? \'success\' : \'warning\'} btn-block btn-lg" disabled.bind="!consent_checked" click.delegate="next()"> Next </button>\n\t\t\t</div>\n\t\t</div>\n\t\n\t</div>\n</template>'},"routes/step_2":function(e,t,i){"use strict";i.r(t),function(e){i.d(t,"Step_2",function(){return c});var n,s=i("aurelia-framework"),o=(i("70NS"),i("4ysu")),r=i("OH10"),a=i("Dcv1"),c=Object(s.c)(o.c,a.a,r.a)(n=function(){function t(e,t,i){this.mainRouter=e,this.luzzuApiService=t,this.dataStore=i,this.loading=!0,this.ranking=[],this.results=[],this.question={header:"Question header",text:"Lorem ipsum dolor, sit amet consectetur adipisicing elit?",answer:null,disabled:!0}}var i=t.prototype;return i.configureRouter=function(e,t,i){e.map([{route:["","ranking"],name:"ranking",moduleId:"routes/step_2-ranking"},{route:"results",name:"results",moduleId:"routes/step_2-results"}]),this.childRouter=t},i.activate=function(){var t=this,i=new e(function(e,i){t.luzzuApiService.getRanking().then(function(i){t.dataStore.setRanking(i),e()})}),n=new e(function(e,i){t.luzzuApiService.getDimensions().then(function(i){t.dataStore.setDimensions(i),e()})}),s=new e(function(e,i){t.luzzuApiService.getResults().then(function(i){t.dataStore.setResults(i),e()})});return e.all([i,n,s])},i.attached=function(){this.loading=!1,this.ranking=this.dataStore.getRanking(),this.results=this.dataStore.getResults()},i.changedSubView=function(){console.log("changed subview")},i.next=function(){this.loading=!0,this.mainRouter.navigate("step_3/ranking")},t}())||n}.call(this,i("25Wt"))},"routes/step_2-ranking":function(e,t,i){"use strict";i.r(t),i.d(t,"Step2Ranking",function(){return r});var n,s=i("aurelia-framework"),o=i("routes/step_2"),r=Object(s.c)(o.Step_2)(n=function(){function e(e){this.parent=e}return e.prototype.attached=function(){this.parent.changedSubView()},e}())||n},"routes/step_2-ranking.html":function(e,t,i){e.exports='<template>\n  \n    <require from="../resources/elements/dimension"></require>\n    <dimension class="row pt-3" repeat.for="dimension of parent.ranking" dimension.bind="dimension" readonly.one-way="true"></dimension>\n  \n</template>'},"routes/step_2-results":function(e,t,i){"use strict";i.r(t),i.d(t,"Step2Results",function(){return r});var n,s=i("aurelia-framework"),o=i("routes/step_2"),r=Object(s.c)(o.Step_2)(n=function(){function e(e){this.parent=e}return e.prototype.attached=function(){this.parent.changedSubView()},e}())||n},"routes/step_2-results.html":function(e,t,i){e.exports='<template>\n  \n    <require from="../resources/elements/result"></require>\n    <result class="row pt-3" repeat.for="result of parent.results" result.bind="result"></result>\n  \n</template>'},"routes/step_2.html":function(e,t,i){e.exports='<template>\n\n  \x3c!-- Loading Template --\x3e\n\t<require from="../resources/elements/loading.html"></require>\n\t<loading if.bind="loading"></loading>\n\n  \x3c!-- Non Loading Template --\x3e\n  \x3c!-- Had to remove else -> router view not working --\x3e\n  <div class="container my-5">\n    <div class="row"> \n      <div class="col-12">\n        <h1> Task description </h1>\n        <p>\n          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae sint earum possimus commodi aut quaerat fuga, nostrum asperiores iste quia atque quod officiis, incidunt repellat culpa libero aperiam neque sequi! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae sint earum possimus commodi aut quaerat fuga, nostrum asperiores iste quia atque quod officiis, incidunt repellat culpa libero aperiam neque sequi!\n        </p>\n      </div>\n    </div>\n\n    <div class="row mt-3"> \n      <div class="col-12">\n        <require from="../resources/elements/question"></require>\n\t      <question question.bind="question"></question>\n      </div>\n    </div>\n\n    \x3c!-- Ranking/Results Navigation--\x3e\n    <div class="row mt-5">\n      <div class="col-12">\n        <ul class="nav nav-tabs nav-fill">\n          <li class="nav-item">\n            <a class="nav-link ${childRouter.currentInstruction.fragment === \'ranking\' ? \'active\' : \'\'}" href="#/step_2/ranking">Ranking</a>\n          </li>\n          <li class="nav-item">\n            <a class="nav-link ${childRouter.currentInstruction.fragment === \'results\' ? \'active\' : \'\'}" href="#/step_2/results">Results</a>\n          </li>\n        </ul>\n      </div>\n    </div>\n\n    \x3c!-- Router View --\x3e\n    <div class="row">\n      <div class="col-12">\n        <div class="container border-left border-right border-bottom pb-3">\n          <router-view></router-view>\n        </div>\n      </div>\n    </div>\n\n    \x3c!-- Buttons --\x3e\n    <div class="row mt-5">  \n      <div class="col-12">\n        <button type="button" class="btn btn-success btn-lg btn-block" click.delegate="next()" disabled.bind="question.disabled"> Next </button>\n      </div>\n    </div>\n\n  </div>\n\n</template>'},"routes/step_3":function(e,t,i){"use strict";i.r(t),function(e,n){i.d(t,"Step_3",function(){return u});var s,o=i("aurelia-framework"),r=(i("70NS"),i("4ysu")),a=i("OH10"),c=i("Dcv1"),u=Object(o.c)(r.c,c.a,a.a)(s=function(){function t(e,t,i){this.mainRouter=e,this.luzzuApiService=t,this.dataStore=i,this.loading=!0,this.ranking=[],this.dimensions=[],this.results=[],this.question={header:"Question header",text:"Lorem ipsum dolor, sit amet consectetur adipisicing elit?",answer:null,disabled:!0}}var i=t.prototype;return i.configureRouter=function(e,t,i){e.map([{route:["","ranking"],name:"ranking",moduleId:"routes/step_3-ranking"},{route:"results",name:"results",moduleId:"routes/step_3-results"}]),this.childRouter=t},i.activate=function(){var t=this,i=new e(function(e,i){t.luzzuApiService.getRanking().then(function(i){t.dataStore.setRanking(i),e()})}),n=new e(function(e,i){t.luzzuApiService.getDimensions().then(function(i){t.dataStore.setDimensions(i),e()})});return e.all([i,n])},i.attached=function(){this.reset(),this.loading=!1,console.log("step 3 attached")},i.openModal=function(){n("#addDimensionModal").modal({})},i.debug=function(){this.luzzuApiService.sendRankingData(this.ranking)},i.changedSubView=function(){console.log("changed subview")},i.removeDimensionFromRanking=function(e){var t=e.detail,i=this.ranking.findIndex(function(e){return e.id===t});this.ranking.splice(i,1)},i.addDimensionsToRanking=function(e){var t=e.detail,i=Array.isArray(t),n=0;for(t=i?t:t[Symbol.iterator]();;){var s;if(i){if(n>=t.length)break;s=t[n++]}else{if((n=t.next()).done)break;s=n.value}var o=s,r={name:o.name,id:o.id,value:0};this.ranking.push(r)}this.dimensions=this.filterDimensions(this.dataStore.getDimensions())},i.reset=function(){this.ranking=this.dataStore.getRanking(),this.dimensions=this.filterDimensions(this.dataStore.getDimensions())},i.filterDimensions=function(e){var t=this;return e.filter(function(e){return-1===t.ranking.findIndex(function(t){return e.name===t.name})})},i.next=function(){this.loading=!0,this.mainRouter.navigateToRoute("step_4",{from:"step_3"})},t}())||s}.call(this,i("25Wt"),i("EVdn"))},"routes/step_3-ranking":function(e,t,i){"use strict";i.r(t),i.d(t,"Step3Ranking",function(){return r});var n,s=i("aurelia-framework"),o=i("routes/step_3"),r=Object(s.c)(o.Step_3)(n=function(){function e(e){this.parent=e}return e.prototype.attached=function(){this.parent.changedSubView()},e}())||n},"routes/step_3-ranking.html":function(e,t,i){e.exports='<template>\n  \n    <require from="../resources/elements/dimension"></require>\n    <dimension class="row pt-3" repeat.for="dimension of parent.ranking" dimension.bind="dimension" readonly.one-way="false" remove-dimension.delegate="parent.removeDimensionFromRanking($event)"></dimension>\n\n\n    <div class="row pointer">\n      <div class="col-12 mt-3">\n        <div class="border border-secondary rounded pt-3 pb-2">\n          <button role="button" class="btn btn-block" click.delegate="parent.openModal()">\n            <h4 class="text-muted text-center"> Add dimension to ranking </h4>\n          </button>\n        </div>\n      </div>\n    </div>\n</template>'},"routes/step_3-results":function(e,t,i){"use strict";i.r(t),function(e){i.d(t,"Step3Results",function(){return c});var n,s=i("aurelia-framework"),o=i("Dcv1"),r=i("OH10"),a=i("routes/step_3"),c=Object(s.c)(o.a,r.a,a.Step_3)(n=function(){function t(e,t,i){this.luzzuApiService=e,this.dataStore=t,this.parent=i}var i=t.prototype;return i.activate=function(){var t=this;return new e(function(e,i){var n=t.dataStore.createResultRequestObject(t.parent.ranking);console.log("\n----------"),console.log(JSON.stringify(n,null,"\t")),console.log("\n----------"),t.luzzuApiService.getResults(n).then(function(i){console.log("step-3-results got results data from api"),t.dataStore.setResults(i),t.parent.results=t.dataStore.getResults(),e()})})},i.attached=function(){this.parent.changedSubView()},t}())||n}.call(this,i("25Wt"))},"routes/step_3-results.html":function(e,t,i){e.exports='<template>\n  \n    <require from="../resources/elements/result"></require>\n    <result class="row pt-3" repeat.for="result of parent.results" result.bind="result"></result>\n  \n</template>'},"routes/step_3.html":function(e,t,i){e.exports='<template>\n\n  \x3c!-- Modal --\x3e\n  <require from="../resources/elements/add-metric"></require>\n\t<add-metric metrics.one-way="dimensions" add-metrics-to-ranking.delegate="addDimensionsToRanking($event)"></add-metric>\n\n  \x3c!-- Loading Template --\x3e\n\t<require from="../resources/elements/loading.html"></require>\n\t<loading if.bind="loading"></loading>\n\n\t\x3c!-- Non Loading Template --\x3e\n  <div class="container my-5">\n    <div class="row"> \n      <div class="col-12">\n        <h1> Lorem ipsum dolor </h1>\n        <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae sint earum possimus commodi aut quaerat fuga, nostrum asperiores iste quia atque quod officiis, incidunt repellat culpa libero aperiam neque sequi!</p>\n      </div>\n    </div>\n    \n    <div class="row mt-3"> \n      <div class="col-12">\n        <require from="../resources/elements/question"></require>\n\t      <question question.bind="question"></question>\n      </div>\n    </div>\n\n    \x3c!-- Ranking/Results Navigation--\x3e\n    <div class="row mt-5">\n        <div class="col-12">\n          <ul class="nav nav-tabs nav-fill">\n            <li class="nav-item">\n              <a class="nav-link ${childRouter.currentInstruction.fragment === \'ranking\' ? \'active\' : \'\'}" href="#/step_3/ranking">Ranking</a>\n            </li>\n            <li class="nav-item">\n              <a class="nav-link ${childRouter.currentInstruction.fragment === \'results\' ? \'active\' : \'\'}" href="#/step_3/results">Results</a>\n            </li>\n          </ul>\n        </div>\n      </div>\n\n      \x3c!-- Router View --\x3e\n    <div class="row">\n      <div class="col-12">\n          <div class="container border-left border-right border-bottom pb-3">\n            <router-view></router-view>\n          </div>\n      </div>\n    </div>\n\n    \x3c!-- Buttons --\x3e\n    <div class="row mt-5">\n      <div class="col-5">\n        <button type="button" class="btn btn-secondary btn-lg btn-block" click.delegate="reset()"> Reset rankings </button>\n      </div>\n      <div class="col-2">\n          <button type="button" class="btn btn-warning btn-lg btn-block" click.delegate="debug()"> Debug </button>\n        </div>\n      <div class="col-5 ">\n          <button type="button" class="btn btn-success btn-lg btn-block" click.delegate="next()" disabled.bind="question.disabled"> Next </button>\n      </div>\n    </div>\n\n  </div>\n\n</template>'},"routes/step_4":function(e,t,i){"use strict";i.r(t),i.d(t,"Step_4",function(){return a});var n,s=i("aurelia-framework"),o=i("4ysu"),r=i("OH10"),a=Object(s.c)(o.c,r.a)(n=function(){function e(e,t){this.router=e,this.loading=!0,this.dataStore=t}var t=e.prototype;return t.activate=function(e){this.results=this.dataStore.getResults()},t.attached=function(){this.loading=!1},t.next=function(){this.loading=!0,this.router.navigateToRoute("step_5",{from:"step_4"})},e}())||n},"routes/step_4.html":function(e,t,i){e.exports='<template>\n\n  \x3c!-- Loading Template --\x3e\n\t<require from="../resources/elements/loading.html"></require>\n\t<loading if.bind="loading"></loading>\n\n  \x3c!-- Non Loading Template --\x3e\n  <div class="container my-5">\n    <div class="row">\n      <div class="col-12">\n        <h1>Thank you for participating</h1>\n      </div>\n    </div>\n\n    <div class="row">\n      <div class="col-12">\n        <p> Add message here </p>\n      </div>\n    </div>\n  </div>\n\n</template>'}},[[0,1,4,13,9,14,7,11,17,3,10,18,6,16,8,15,5,12,2,19]]]);
//# sourceMappingURL=app~d0ae3f07.91bbbd9eed74383c09ed.bundle.map