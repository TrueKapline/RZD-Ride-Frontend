(function(){"use strict";var t={5238:function(t,a,i){var n=i(9242),r=i(3396);function s(t,a,i,n,s,e){const o=(0,r.up)("router-view");return(0,r.wg)(),(0,r.j4)(o)}var e={},o=i(89);const l=(0,o.Z)(e,[["render",s]]);var d=l,c=i(2483),u=i(7139);const h=t=>((0,r.dD)("data-v-22db4239"),t=t(),(0,r.Cn)(),t),S={class:"status window"},p={class:"lower-part"},v={class:"time-table window"},f={key:0},_=h((()=>(0,r._)("div",{class:"map window"},null,-1))),w=h((()=>(0,r._)("div",{class:"interesting window"},null,-1)));function m(t,a,i,n,s,e){const o=(0,r.up)("Stations"),l=(0,r.up)("Weather");return(0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r._)("div",S,[(0,r.Wm)(o,{status:this.status},null,8,["status"]),(0,r.Wm)(l,{time:this.time},null,8,["time"])]),(0,r._)("div",p,[(0,r._)("div",v,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(s.arrStop,(t=>((0,r.wg)(),(0,r.iD)("div",{key:t.duration},[(0,r.Uk)((0,u.zw)(t.arrivalShow)+" ",1),t.arrivalShow&&t.departureShow?((0,r.wg)(),(0,r.iD)("span",f,"-")):(0,r.kq)("",!0),(0,r.Uk)(" "+(0,u.zw)(t.departureShow)+" "+(0,u.zw)(t.title),1)])))),128))]),_,w])],64)}var g=i(70),y=i.p+"img/sun-icon.46b9915d.svg";const b=t=>((0,r.dD)("data-v-b1287658"),t=t(),(0,r.Cn)(),t),E={class:"time-and-weather"},k={class:"time"},D=b((()=>(0,r._)("div",{class:"weather"},[(0,r._)("img",{src:y,alt:"",class:"weather-icon"}),(0,r._)("span",{class:"weather-text"},"Ясно, 15°С")],-1)));function A(t,a,i,n,s,e){return(0,r.wg)(),(0,r.iD)("div",E,[(0,r._)("h1",k,(0,u.zw)(i.time),1),D])}var R={name:"Weather",props:{time:{type:String}},data(){return{}}};const x=(0,o.Z)(R,[["render",A],["__scopeId","data-v-b1287658"]]);var C=x;const j=t=>((0,r.dD)("data-v-040aac24"),t=t(),(0,r.Cn)(),t),z={class:"station-info"},L={class:"status-title"},O=j((()=>(0,r._)("span",{class:"status-info"},"Следующая остановка – Горка",-1)));function U(t,a,i,n,s,e){return(0,r.wg)(),(0,r.iD)("div",z,[(0,r._)("h1",L,(0,u.zw)(i.status),1),O])}var Z={name:"Status",props:{status:{type:String}}};const H=(0,o.Z)(Z,[["render",U],["__scopeId","data-v-040aac24"]]);var P=H,I={components:{Stations:P,Weather:C},data(){return{baseURL:"http://mypew.ru:3001/route_data/",arrStop:[],interval:null,count:0,time:"",status:""}},methods:{async loadTrip(){try{let t=(new Date).toLocaleString(),a=t.slice(6,10)+"-"+t.slice(3,5)+"-"+t.slice(0,2)+" "+t.slice(12,20);this.time=t.slice(12,20);const i=await g.ZP.get(this.baseURL+this.$route.params.uid);this.arrStop=i.data.stops,this.arrStop[0].departure>a&&(this.status="Поезд ещё не выехал"),this.arrStop[this.arrStop.length-1].arrival<a&&(this.status="Поезд уже закончил свой маршрут"),console.log(this.arrStop),this.arrStop.forEach((t=>{t.arrival&&(t.arrivalShow=t.arrival.slice(11,16)),t.departure&&(t.departureShow=t.departure.slice(11,16))})),this.interval=setInterval((()=>{t=(new Date).toLocaleString(),a=t.slice(6,10)+"-"+t.slice(3,5)+"-"+t.slice(0,2)+" "+t.slice(12,20),this.time=t.slice(12,20),this.arrStop.forEach(((t,i)=>{t.departure>a&&t.arrival<a?this.status="Стоянка на станции "+t.title:this.arrStop.length}))}),1e3)}catch(t){alert("Error: "+t)}}},created(){this.loadTrip()}};const W=(0,o.Z)(I,[["render",m],["__scopeId","data-v-22db4239"]]);var Y=W,K=(i(7658),i.p+"img/arrow-large.649a16de.svg");const T=t=>((0,r.dD)("data-v-7ff0493d"),t=t(),(0,r.Cn)(),t),F={class:"window search"},V=T((()=>(0,r._)("h1",{class:"header"},"Расписание электричек",-1))),$={class:"form"},q={class:"from"},M=T((()=>(0,r._)("label",{for:"from",class:"from__label"},"Откуда",-1))),B=["onClick"],G=T((()=>(0,r._)("img",{src:K,alt:"",draggable:"false"},null,-1))),J={class:"to"},N=T((()=>(0,r._)("label",{for:"to",class:"to__label"},"Куда",-1))),Q=["onClick"],X=T((()=>(0,r._)("input",{type:"date",id:"date",class:"date"},null,-1))),tt=T((()=>(0,r._)("div",{class:"headings"},[(0,r._)("p",null,"Отпр."),(0,r._)("p",null,"Приб."),(0,r._)("p",null,"В пути"),(0,r._)("p",null,"Маршрут")],-1))),at=T((()=>(0,r._)("hr",null,null,-1))),it={class:"wrapper"},nt=["value","onClick"],rt={class:"parameters"},st={class:"parameter"},et={class:"parameter"},ot=T((()=>(0,r._)("span",{class:"parameter"},"1 ч 23 м",-1))),lt={class:"parameter"},dt=T((()=>(0,r._)("hr",null,null,-1)));function ct(t,a,i,s,e,o){return(0,r.wg)(),(0,r.iD)("main",{style:(0,u.j5)(e.isResultHidden?"justify-content: center":"")},[(0,r._)("div",F,[V,(0,r._)("div",$,[(0,r._)("div",q,[(0,r.wy)((0,r._)("input",{type:"text",id:"from",class:"from__input",placeholder:" ",autocomplete:"off",onClick:a[0]||(a[0]=t=>o.clickStartStation()),"onUpdate:modelValue":a[1]||(a[1]=t=>e.startStation=t),style:(0,u.j5)(e.isAvailStart?"border-radius: 10px 10px 0 0":"border-radius: 10px")},null,4),[[n.nr,e.startStation]]),M,(0,r._)("div",{class:"search-results",style:(0,u.j5)(e.isAvailStart?"display: block":"display: none")},[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(e.arrStartStation,(t=>((0,r.wg)(),(0,r.iD)("button",{onClick:a=>o.addStartStation(t.station_name),class:"element-button",key:t.station_yandex_code},(0,u.zw)(t.station_name),9,B)))),128))],4)]),G,(0,r._)("div",J,[(0,r.wy)((0,r._)("input",{type:"text",id:"to",class:"to__input",placeholder:" ",autocomplete:"off",onClick:a[2]||(a[2]=t=>o.clickEndStation()),"onUpdate:modelValue":a[3]||(a[3]=t=>e.endStation=t),style:(0,u.j5)(e.isAvailEnd?"border-radius: 10px 10px 0 0":"border-radius: 10px")},null,4),[[n.nr,e.endStation]]),N,(0,r._)("div",{class:"search-results",style:(0,u.j5)(e.isAvailEnd?"display: block":"display: none")},[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(e.arrEndStation,(t=>((0,r.wg)(),(0,r.iD)("button",{onClick:a=>o.addEndStation(t.station_name),class:"element-button",key:t.station_yandex_code},(0,u.zw)(t.station_name),9,Q)))),128))],4)]),X,(0,r._)("button",{class:"search-button",onClick:a[4]||(a[4]=t=>o.getStation())},"Найти маршруты")])]),(0,r._)("div",{class:"window results",style:(0,u.j5)(e.isResultHidden?"display: none":"")},[tt,at,(0,r._)("div",it,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(e.arrRoute,(a=>((0,r.wg)(),(0,r.iD)("div",{class:"results-list",key:a.uid,value:a.uid,onClick:i=>{t.$router.push("/trip/"+a.uid)}},[(0,r._)("div",rt,[(0,r._)("span",st,(0,u.zw)(a.depShow),1),(0,r._)("span",et,(0,u.zw)(a.arrShow),1),ot,(0,r._)("span",lt,(0,u.zw)(a.title),1)]),dt],8,nt)))),128))])],4)],4)}var ut={data(){return{startStation:"",endStation:"",baseURL:"http://mypew.ru:3001/routes_suburbans_station_from_to/",findURL:"http://mypew.ru:3001/possible_station_names/",arrRoute:[],arrStartStation:[],isAvailStart:!1,arrEndStation:[],isAvailEnd:!1,isResultHidden:!0,selectStartStation:!1,selectEndStation:!1}},methods:{async changeStartStation(){if(this.startStation=this.startStation.trimStart(),""==this.startStation||this.selectStartStation)this.selectStartStation=!1,this.isAvailStart=!1,this.arrStartStation=[];else try{const t=await g.ZP.get(this.findURL+this.startStation);this.arrStartStation=t.data,0!==this.arrStartStation.length?this.isAvailStart=!0:(this.arrStartStation=[],this.isAvailStart=!1)}catch(t){alert("Error: "+t)}},async changeEndStation(){if(this.endStation=this.endStation.trimStart(),""==this.endStation||this.selectEndStation)this.selectEndStation=!1,this.isAvailEnd=!1,this.arrEndStation=[];else try{const t=await g.ZP.get(this.findURL+this.endStation);this.arrEndStation=t.data,0!==this.arrEndStation.length?this.isAvailEnd=!0:(this.arrEndStation=[],this.isAvailEnd=!1)}catch(t){alert("Error: "+t)}},clickStartStation(){this.selectStartStation=!1,this.arrEndStation=[],this.isAvailEnd=!1,this.changeStartStation()},clickEndStation(){this.selectEndStation=!1,this.arrStartStation=[],this.isAvailStart=!1,this.changeEndStation()},addStartStation(t){this.selectStartStation=!0,this.startStation=t,this.arrStartStation=[],this.isAvailStart=!1},addEndStation(t){this.selectEndStation=!0,this.endStation=t,this.arrEndStation=[],this.isAvailEnd=!1},async getStation(){let t=(new Date).toLocaleString(),a=t.slice(6,10)+"-"+t.slice(3,5)+"-"+t.slice(0,2);if(this.arrStartStation=[],this.isAvailEnd=!1,this.arrEndStation=[],this.isAvailStart=!1,this.isResultHidden=!1,""!=this.startStation||""!=this.endStation)try{const t=await g.ZP.get(this.baseURL+this.startStation+"/"+this.endStation+"/"+a);this.arrRoute=t.data,console.log(this.arrRoute),this.arrRoute.map((t=>{t.depShow=t.dep.slice(11,16),t.arrShow=t.arr.slice(11,16)}))}catch(i){alert("Error: "+i)}}},watch:{startStation:function(){this.changeStartStation()},endStation:function(){this.changeEndStation()}},created(){document.addEventListener("click",(()=>{this.selectStartStation=!1,this.arrEndStation=[],this.isAvailEnd=!1,this.selectEndStation=!1,this.arrStartStation=[],this.isAvailStart=!1}))}};const ht=(0,o.Z)(ut,[["render",ct],["__scopeId","data-v-7ff0493d"]]);var St=ht;const pt=[{path:"/trip/:uid",component:Y},{path:"/",component:St}],vt=(0,c.p7)({routes:pt,history:(0,c.r5)("/RZD-Ride-Frontend/")});var ft=vt;(0,n.ri)(d).use(ft).mount("#app")}},a={};function i(n){var r=a[n];if(void 0!==r)return r.exports;var s=a[n]={exports:{}};return t[n](s,s.exports,i),s.exports}i.m=t,function(){var t=[];i.O=function(a,n,r,s){if(!n){var e=1/0;for(c=0;c<t.length;c++){n=t[c][0],r=t[c][1],s=t[c][2];for(var o=!0,l=0;l<n.length;l++)(!1&s||e>=s)&&Object.keys(i.O).every((function(t){return i.O[t](n[l])}))?n.splice(l--,1):(o=!1,s<e&&(e=s));if(o){t.splice(c--,1);var d=r();void 0!==d&&(a=d)}}return a}s=s||0;for(var c=t.length;c>0&&t[c-1][2]>s;c--)t[c]=t[c-1];t[c]=[n,r,s]}}(),function(){i.n=function(t){var a=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(a,{a:a}),a}}(),function(){i.d=function(t,a){for(var n in a)i.o(a,n)&&!i.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:a[n]})}}(),function(){i.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){i.o=function(t,a){return Object.prototype.hasOwnProperty.call(t,a)}}(),function(){i.p="/RZD-Ride-Frontend/"}(),function(){var t={143:0};i.O.j=function(a){return 0===t[a]};var a=function(a,n){var r,s,e=n[0],o=n[1],l=n[2],d=0;if(e.some((function(a){return 0!==t[a]}))){for(r in o)i.o(o,r)&&(i.m[r]=o[r]);if(l)var c=l(i)}for(a&&a(n);d<e.length;d++)s=e[d],i.o(t,s)&&t[s]&&t[s][0](),t[s]=0;return i.O(c)},n=self["webpackChunkrzd_ride_frontend"]=self["webpackChunkrzd_ride_frontend"]||[];n.forEach(a.bind(null,0)),n.push=a.bind(null,n.push.bind(n))}();var n=i.O(void 0,[998],(function(){return i(5238)}));n=i.O(n)})();
//# sourceMappingURL=app.abbba8f2.js.map