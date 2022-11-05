(function(){"use strict";var t={8599:function(t,a,i){var e=i(9242),s=i(3396);function n(t,a,i,e,n,r){const o=(0,s.up)("router-view");return(0,s.wg)(),(0,s.j4)(o)}var r={},o=i(89);const l=(0,o.Z)(r,[["render",n]]);var d=l,c=i(2483),h=i(7139);const u=t=>((0,s.dD)("data-v-fe3f104e"),t=t(),(0,s.Cn)(),t),S={class:"status window"},p={class:"lower-part"},v={class:"time-table window"},w={key:0},f=u((()=>(0,s._)("div",{class:"map window"},null,-1))),g=u((()=>(0,s._)("div",{class:"interesting window"},null,-1)));function _(t,a,i,e,n,r){const o=(0,s.up)("Stations"),l=(0,s.up)("Weather");return(0,s.wg)(),(0,s.iD)(s.HY,null,[(0,s._)("div",S,[(0,s.Wm)(o,{status:this.status},null,8,["status"]),(0,s.Wm)(l,{time:this.time},null,8,["time"])]),(0,s._)("div",p,[(0,s._)("div",v,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(n.arrStop,(t=>((0,s.wg)(),(0,s.iD)("div",{key:t.duration},[(0,s.Uk)((0,h.zw)(t.arrivalShow)+" ",1),t.arrivalShow&&t.departureShow?((0,s.wg)(),(0,s.iD)("span",w,"-")):(0,s.kq)("",!0),(0,s.Uk)(" "+(0,h.zw)(t.departureShow)+" "+(0,h.zw)(t.title),1)])))),128))]),f,g])],64)}var m=i(70),y=i.p+"img/sun-icon.46b9915d.svg";const E=t=>((0,s.dD)("data-v-b1287658"),t=t(),(0,s.Cn)(),t),b={class:"time-and-weather"},D={class:"time"},k=E((()=>(0,s._)("div",{class:"weather"},[(0,s._)("img",{src:y,alt:"",class:"weather-icon"}),(0,s._)("span",{class:"weather-text"},"Ясно, 15°С")],-1)));function C(t,a,i,e,n,r){return(0,s.wg)(),(0,s.iD)("div",b,[(0,s._)("h1",D,(0,h.zw)(i.time),1),k])}var U={name:"Weather",props:{time:{type:String}},data(){return{}}};const T=(0,o.Z)(U,[["render",C],["__scopeId","data-v-b1287658"]]);var A=T;const R={class:"station-info"},z={class:"status-title"},j={class:"status-info"};function H(t,a,i,e,n,r){return(0,s.wg)(),(0,s.iD)("div",R,[(0,s._)("h1",z,(0,h.zw)(i.status[0]),1),(0,s._)("span",j,(0,h.zw)(i.status[1]),1)])}var L={name:"Status",props:{status:{type:Array}}};const O=(0,o.Z)(L,[["render",H],["__scopeId","data-v-fc0f2636"]]);var Z=O,x={components:{Stations:Z,Weather:A},props:{uid:{type:String},date:{type:String}},data(){return{baseURL:"http://mypew.ru:3001/stops",arrStop:[],interval:null,count:0,time:"",status:["",""]}},methods:{async loadTrip(){try{let t=new Date,a=new Date(t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate(),t.getUTCHours()+parseInt(this.date[21]),t.getUTCMinutes(),t.getUTCSeconds()).toLocaleString();console.log(a);let i=a.slice(6,10)+"-"+a.slice(3,5)+"-"+a.slice(0,2)+" "+a.slice(12,20);this.time=a.slice(12,20);const e=await m.ZP.get(this.baseURL+"?uid="+this.uid+"&date="+this.date.slice(0,10));this.arrStop=e.data.stops,this.arrStop[0].departure>i&&(this.status[0]="Поезд ещё не выехал"),this.arrStop[this.arrStop.length-1].arrival<i&&(this.status[0]="Поезд уже закончил свой маршрут"),console.log(this.arrStop),this.arrStop.forEach(((t,a)=>{t.arrival&&(t.arrivalShow=t.arrival.slice(11,16)),t.departure&&(t.departureShow=t.departure.slice(11,16)),t.departure>i&&t.arrival<i?(this.status[0]="Стоянка на станции "+t.title,a<this.arrStop.length-1&&(this.status[1]="Следующая остановка – "+this.arrStop[a+1].title)):a<this.arrStop.length-1&&t.departure<i&&this.arrStop[this.arrStop.length-1].arrival>i&&(this.status[0]=t.title+" - "+this.arrStop[a+1].title,a<this.arrStop.length-1&&(this.status[1]="Следующая остановка – "+this.arrStop[a+1].title))})),this.interval=setInterval((()=>{let t=new Date,a=new Date(t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate(),t.getUTCHours()+parseInt(this.date[21]),t.getUTCMinutes(),t.getUTCSeconds()).toLocaleString(),i=a.slice(6,10)+"-"+a.slice(3,5)+"-"+a.slice(0,2)+" "+a.slice(12,20);this.time=a.slice(12,20),this.arrStop.forEach(((t,a)=>{t.departure>i&&t.arrival<=i?(this.status[0]="Стоянка на станции "+t.title,a<this.arrStop.length-1&&(this.status[1]="Следующая остановка – "+this.arrStop[a+1].title)):a<this.arrStop.length-1&&t.departure<=i&&this.arrStop[this.arrStop.length-1].arrival>i&&(this.status[0]=t.title+" - "+this.arrStop[a+1].title,a<this.arrStop.length-1&&(this.status[1]="Следующая остановка – "+this.arrStop[a+1].title))}))}),1e3)}catch(t){alert("Error: "+t)}}},created(){this.loadTrip()}};const P=(0,o.Z)(x,[["render",_],["__scopeId","data-v-fe3f104e"]]);var I=P,Y=(i(7658),i.p+"img/arrows.985ee4d1.svg");const M=t=>((0,s.dD)("data-v-2f1d9a83"),t=t(),(0,s.Cn)(),t),F={class:"window search"},W=M((()=>(0,s._)("h1",{class:"header"},"Расписание электричек",-1))),K={class:"form"},V={class:"from"},q=M((()=>(0,s._)("label",{for:"from",class:"from__label"},"Откуда",-1))),$=["onClick"],B={class:"to"},G=M((()=>(0,s._)("label",{for:"to",class:"to__label"},"Куда",-1))),J=["onClick"],N=M((()=>(0,s._)("div",{class:"headings"},[(0,s._)("p",null,"Отпр."),(0,s._)("p",null,"Приб."),(0,s._)("p",null,"В пути"),(0,s._)("p",null,"Маршрут")],-1))),Q=M((()=>(0,s._)("hr",null,null,-1))),X={class:"wrapper"},tt=["value","onClick"],at={class:"parameters"},it={class:"parameter"},et={class:"parameter"},st={class:"parameter"},nt={class:"parameter"},rt=M((()=>(0,s._)("hr",null,null,-1)));function ot(t,a,i,n,r,o){return(0,s.wg)(),(0,s.iD)("main",{style:(0,h.j5)(r.isResultHidden?"justify-content: center":"")},[(0,s._)("div",F,[W,(0,s._)("div",K,[(0,s._)("div",V,[(0,s.wy)((0,s._)("input",{type:"text",id:"from",class:"from__input",placeholder:" ",autocomplete:"off",onClick:a[0]||(a[0]=t=>o.clickStartStation()),"onUpdate:modelValue":a[1]||(a[1]=t=>r.startStation=t)},null,512),[[e.nr,r.startStation]]),q,(0,s._)("div",{class:"search-results",style:(0,h.j5)(r.isAvailStart?"display: block":"display: none")},[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(r.arrStartStation,(t=>((0,s.wg)(),(0,s.iD)("button",{onClick:a=>o.addStartStation(t.station_name),class:"element-button",key:t.station_yandex_code},(0,h.zw)(t.station_name),9,$)))),128))],4)]),(0,s._)("img",{src:Y,alt:"",draggable:"false",onClick:a[2]||(a[2]=t=>o.changeStation())}),(0,s._)("div",B,[(0,s.wy)((0,s._)("input",{type:"text",id:"to",class:"to__input",placeholder:" ",autocomplete:"off",onClick:a[3]||(a[3]=t=>o.clickEndStation()),"onUpdate:modelValue":a[4]||(a[4]=t=>r.endStation=t)},null,512),[[e.nr,r.endStation]]),G,(0,s._)("div",{class:"search-results",style:(0,h.j5)(r.isAvailEnd?"display: block":"display: none")},[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(r.arrEndStation,(t=>((0,s.wg)(),(0,s.iD)("button",{onClick:a=>o.addEndStation(t.station_name),class:"element-button",key:t.station_yandex_code},(0,h.zw)(t.station_name),9,J)))),128))],4)]),(0,s.wy)((0,s._)("input",{"onUpdate:modelValue":a[5]||(a[5]=t=>r.selectDate=t),type:"date",id:"date",class:"date"},null,512),[[e.nr,r.selectDate]]),(0,s._)("button",{class:"search-button",onClick:a[6]||(a[6]=t=>o.getStation())},"Найти маршруты")])]),(0,s._)("div",{class:"window results",style:(0,h.j5)(r.isResultHidden?"display: none":"")},[N,Q,(0,s._)("div",X,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(r.arrRoute,(a=>((0,s.wg)(),(0,s.iD)("div",{class:"results-list",key:a.uid,value:a.uid,onClick:i=>{t.$router.push({name:"TripPage",params:{uid:a.uid,date:a.dep}})}},[(0,s._)("div",at,[(0,s._)("span",it,(0,h.zw)(a.depShow),1),(0,s._)("span",et,(0,h.zw)(a.arrShow),1),(0,s._)("span",st,(0,h.zw)(a.travelTimeShow),1),(0,s._)("span",nt,(0,h.zw)(a.title),1)]),rt],8,tt)))),128))])],4)],4)}var lt={data(){return{startStation:"",endStation:"",baseURL:"http://mypew.ru:3001/routes",findURL:"http://mypew.ru:3001/possible",arrRoute:[],arrStartStation:[],isAvailStart:!1,arrEndStation:[],isAvailEnd:!1,isResultHidden:!0,selectStartStation:!1,selectEndStation:!1,selectDate:""}},methods:{async changeStartStation(){this.startStation=this.startStation.trimStart();let t=this.startStation;if(""==this.startStation||this.selectStartStation)this.selectStartStation=!1,this.isAvailStart=!1,this.arrStartStation=[];else try{const a=await m.ZP.get(this.findURL+"?station_name="+this.startStation.trim());t===this.startStation&&(this.arrStartStation=a.data,0!==this.arrStartStation.length?this.isAvailStart=!0:(this.arrStartStation=[],this.isAvailStart=!1))}catch(a){alert("Error: "+a)}},async changeEndStation(){this.endStation=this.endStation.trimStart();let t=this.endStation;if(""==this.endStation||this.selectEndStation)this.selectEndStation=!1,this.isAvailEnd=!1,this.arrEndStation=[];else try{const a=await m.ZP.get(this.findURL+"?station_name="+this.endStation);t===this.endStation&&(this.arrEndStation=a.data,0!==this.arrEndStation.length?this.isAvailEnd=!0:(this.arrEndStation=[],this.isAvailEnd=!1))}catch(a){alert("Error: "+a)}},clickStartStation(){this.selectStartStation=!1,this.arrEndStation=[],this.isAvailEnd=!1,this.changeStartStation()},clickEndStation(){this.selectEndStation=!1,this.arrStartStation=[],this.isAvailStart=!1,this.changeEndStation()},addStartStation(t){this.selectStartStation=!0,this.startStation=t,this.arrStartStation=[],this.isAvailStart=!1},addEndStation(t){this.selectEndStation=!0,this.endStation=t,this.arrEndStation=[],this.isAvailEnd=!1},async getStation(){if(this.arrStartStation=[],this.isAvailEnd=!1,this.arrEndStation=[],this.isAvailStart=!1,this.isResultHidden=!1,""!=this.startStation&&""!=this.endStation&&""!=this.selectDate)try{const t=await m.ZP.get(this.baseURL+"?from="+this.startStation+"&to="+this.endStation+"&transport_types=suburban&date="+this.selectDate);this.arrRoute=t.data,console.log(this.arrRoute),this.arrRoute.map((t=>{t.hour=t.dep[21],t.depShow=t.dep.slice(11,16),t.arrShow=t.arr.slice(11,16);let a=(new Date(t.arr)-new Date(t.dep))/6e4,i=0;a>=60?(i=Math.trunc(a/60),t.travelTimeShow=i+" ч "):t.travelTimeShow="",t.travelTimeShow+=a-60*i+" м"}))}catch(t){alert("Error: "+t)}},changeStation(){this.selectStartStation=!0,this.arrEndStation=[],this.isAvailEnd=!1,this.selectEndStation=!0,this.arrStartStation=[],this.isAvailStart=!1;let t=this.startStation;this.startStation=this.endStation,this.endStation=t}},watch:{startStation:function(){this.changeStartStation()},endStation:function(){this.changeEndStation()}},created(){let t=(new Date).toLocaleDateString();this.selectDate=t.slice(6,10)+"-"+t.slice(3,5)+"-"+t.slice(0,2),document.addEventListener("click",(()=>{this.selectStartStation=!1,this.arrEndStation=[],this.isAvailEnd=!1,this.selectEndStation=!1,this.arrStartStation=[],this.isAvailStart=!1}))}};const dt=(0,o.Z)(lt,[["render",ot],["__scopeId","data-v-2f1d9a83"]]);var ct=dt;const ht=[{path:"/trip/:uid/:date",name:"TripPage",component:I,props:!0},{path:"/",component:ct}],ut=(0,c.p7)({routes:ht,history:(0,c.r5)("/RZD-Ride-Frontend/")});var St=ut;(0,e.ri)(d).use(St).mount("#app")}},a={};function i(e){var s=a[e];if(void 0!==s)return s.exports;var n=a[e]={exports:{}};return t[e](n,n.exports,i),n.exports}i.m=t,function(){var t=[];i.O=function(a,e,s,n){if(!e){var r=1/0;for(c=0;c<t.length;c++){e=t[c][0],s=t[c][1],n=t[c][2];for(var o=!0,l=0;l<e.length;l++)(!1&n||r>=n)&&Object.keys(i.O).every((function(t){return i.O[t](e[l])}))?e.splice(l--,1):(o=!1,n<r&&(r=n));if(o){t.splice(c--,1);var d=s();void 0!==d&&(a=d)}}return a}n=n||0;for(var c=t.length;c>0&&t[c-1][2]>n;c--)t[c]=t[c-1];t[c]=[e,s,n]}}(),function(){i.n=function(t){var a=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(a,{a:a}),a}}(),function(){i.d=function(t,a){for(var e in a)i.o(a,e)&&!i.o(t,e)&&Object.defineProperty(t,e,{enumerable:!0,get:a[e]})}}(),function(){i.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){i.o=function(t,a){return Object.prototype.hasOwnProperty.call(t,a)}}(),function(){i.p="/RZD-Ride-Frontend/"}(),function(){var t={143:0};i.O.j=function(a){return 0===t[a]};var a=function(a,e){var s,n,r=e[0],o=e[1],l=e[2],d=0;if(r.some((function(a){return 0!==t[a]}))){for(s in o)i.o(o,s)&&(i.m[s]=o[s]);if(l)var c=l(i)}for(a&&a(e);d<r.length;d++)n=r[d],i.o(t,n)&&t[n]&&t[n][0](),t[n]=0;return i.O(c)},e=self["webpackChunkrzd_ride_frontend"]=self["webpackChunkrzd_ride_frontend"]||[];e.forEach(a.bind(null,0)),e.push=a.bind(null,e.push.bind(e))}();var e=i.O(void 0,[998],(function(){return i(8599)}));e=i.O(e)})();
//# sourceMappingURL=app.c5d42054.js.map