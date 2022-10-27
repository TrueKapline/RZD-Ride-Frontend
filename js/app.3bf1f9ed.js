(function(){"use strict";var t={3953:function(t,n,r){var a=r(9242),e=r(3396);function i(t,n,r,a,i,o){const s=(0,e.up)("router-view");return(0,e.wg)(),(0,e.j4)(s)}var o={},s=r(89);const u=(0,s.Z)(o,[["render",i]]);var d=u,c=r(2483),l=r(7139);const p={class:"status window"},v={class:"lower-part"},h={class:"time-table window"},w={key:0},f=(0,e._)("div",{class:"map window"},null,-1),g=(0,e._)("div",{class:"interesting window"},null,-1);function m(t,n,r,a,i,o){const s=(0,e.up)("Stations"),u=(0,e.up)("Weather");return(0,e.wg)(),(0,e.iD)(e.HY,null,[(0,e._)("div",p,[(0,e.Wm)(s),(0,e.Wm)(u)]),(0,e._)("div",v,[(0,e._)("div",h,[((0,e.wg)(!0),(0,e.iD)(e.HY,null,(0,e.Ko)(i.arrStop,(t=>((0,e.wg)(),(0,e.iD)("div",{key:t.duration},[(0,e.Uk)((0,l.zw)(t.arrival)+" ",1),t.arrival&&t.departure?((0,e.wg)(),(0,e.iD)("span",w,"-")):(0,e.kq)("",!0),(0,e.Uk)(" "+(0,l.zw)(t.departure)+" "+(0,l.zw)(t.title),1)])))),128))]),f,g])],64)}var _=r(70),b=r.p+"img/sun-icon.46b9915d.svg";const y=t=>((0,e.dD)("data-v-4180db34"),t=t(),(0,e.Cn)(),t),S={class:"time-and-weather"},k=y((()=>(0,e._)("h1",{class:"time"},"00:51",-1))),x=y((()=>(0,e._)("div",{class:"weather"},[(0,e._)("img",{src:b,alt:"",class:"weather-icon"}),(0,e._)("span",{class:"weather-text"},"Ясно, 15°С")],-1))),z=[k,x];function D(t,n,r,a,i,o){return(0,e.wg)(),(0,e.iD)("div",S,z)}var O={name:"Weather"};const R=(0,s.Z)(O,[["render",D],["__scopeId","data-v-4180db34"]]);var Z=R;const j=t=>((0,e.dD)("data-v-7376496c"),t=t(),(0,e.Cn)(),t),U={class:"station-info"},C=j((()=>(0,e._)("h1",{class:"status-title"},"Стоянка на станции Батарейная",-1))),W=j((()=>(0,e._)("span",{class:"status-info"},"Следующая остановка – Горка",-1))),E=[C,W];function L(t,n,r,a,i,o){return(0,e.wg)(),(0,e.iD)("div",U,E)}var P={name:"Status"};const T=(0,s.Z)(P,[["render",L],["__scopeId","data-v-7376496c"]]);var F=T,H={components:{Stations:F,Weather:Z},data(){return{baseURL:"http://mypew.ru:3001/route_data/",arrStop:[]}},methods:{async loadTrip(){try{const t=await _.ZP.get(this.baseURL+this.$route.params.uid);this.arrStop=t.data.stops,console.log(this.arrStop),this.arrStop.forEach((t=>{t.arrival&&(t.arrival=t.arrival.slice(11,16)),t.departure&&(t.departure=t.departure.slice(11,16))}))}catch(t){alert("Error: "+t)}}},created(){this.loadTrip()}};const Y=(0,s.Z)(H,[["render",m]]);var I=Y;r(7658);const K={style:{margin:"auto",width:"max-content",height:"100vh"}},V=(0,e._)("h1",{style:{"margin-bottom":"1vw"}},"Это главная страница для выбора маршрута",-1),$=["onClick","value"],q={style:{"margin-right":"2vw"}},M={style:{width:"50%"}},A={style:{"margin-right":"2vw"}};function B(t,n,r,i,o,s){return(0,e.wg)(),(0,e.iD)("div",K,[V,(0,e.wy)((0,e._)("input",{"onUpdate:modelValue":n[0]||(n[0]=t=>o.startStation=t),style:{"margin-right":"2vw",padding:"0.5vw","font-size":"16px","border-radius":"16px"}},null,512),[[a.nr,o.startStation]]),(0,e.wy)((0,e._)("input",{"onUpdate:modelValue":n[1]||(n[1]=t=>o.endStation=t),style:{"margin-right":"2vw",padding:"0.5vw","font-size":"16px","border-radius":"16px"}},null,512),[[a.nr,o.endStation]]),(0,e._)("button",{onClick:n[2]||(n[2]=t=>s.getStation()),style:{"margin-right":"2vw",padding:"0.5vw","font-size":"16px","border-radius":"16px",cursor:"pointer"}},"Найти маршруты"),(0,e._)("div",null,[((0,e.wg)(!0),(0,e.iD)(e.HY,null,(0,e.Ko)(o.arrRoute,(n=>((0,e.wg)(),(0,e.iD)("div",{onClick:r=>{t.$router.push("/trip/"+n.uid)},key:n.uid,value:n.uid,style:{padding:"1vw","background-color":"white",margin:"1vw 0","border-radius":"12px",cursor:"pointer",display:"flex","justify-content":"space-between"}},[(0,e._)("span",q,(0,l.zw)(n.number),1),(0,e._)("span",M,(0,l.zw)(n.title),1),(0,e._)("span",null,(0,l.zw)(n.start_date),1),(0,e._)("span",A,(0,l.zw)(n.dep),1),(0,e._)("span",null,(0,l.zw)(n.arr),1)],8,$)))),128))])])}var G={data(){return{startStation:"",endStation:"",baseURL:"http://mypew.ru:3001/routes_suburbans_station_from_to/",arrRoute:[]}},methods:{changeStartStation(){},async getStation(){if(""!=this.startStation||""!=this.endStation)try{const t=await _.ZP.get(this.baseURL+this.startStation+"/"+this.endStation);this.arrRoute=t.data}catch(t){alert("Error: "+t)}}},watch:{startStation:function(){this.changeStartStation()},endStation:function(){this.changeStartStation()}}};const J=(0,s.Z)(G,[["render",B]]);var N=J;const Q=[{path:"/trip/:uid",component:I},{path:"/",component:N}],X=(0,c.p7)({routes:Q,history:(0,c.r5)("/RZD-Ride-Frontend/")});var tt=X;(0,a.ri)(d).use(tt).mount("#app")}},n={};function r(a){var e=n[a];if(void 0!==e)return e.exports;var i=n[a]={exports:{}};return t[a](i,i.exports,r),i.exports}r.m=t,function(){var t=[];r.O=function(n,a,e,i){if(!a){var o=1/0;for(c=0;c<t.length;c++){a=t[c][0],e=t[c][1],i=t[c][2];for(var s=!0,u=0;u<a.length;u++)(!1&i||o>=i)&&Object.keys(r.O).every((function(t){return r.O[t](a[u])}))?a.splice(u--,1):(s=!1,i<o&&(o=i));if(s){t.splice(c--,1);var d=e();void 0!==d&&(n=d)}}return n}i=i||0;for(var c=t.length;c>0&&t[c-1][2]>i;c--)t[c]=t[c-1];t[c]=[a,e,i]}}(),function(){r.n=function(t){var n=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(n,{a:n}),n}}(),function(){r.d=function(t,n){for(var a in n)r.o(n,a)&&!r.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:n[a]})}}(),function(){r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){r.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)}}(),function(){r.p="/RZD-Ride-Frontend/"}(),function(){var t={143:0};r.O.j=function(n){return 0===t[n]};var n=function(n,a){var e,i,o=a[0],s=a[1],u=a[2],d=0;if(o.some((function(n){return 0!==t[n]}))){for(e in s)r.o(s,e)&&(r.m[e]=s[e]);if(u)var c=u(r)}for(n&&n(a);d<o.length;d++)i=o[d],r.o(t,i)&&t[i]&&t[i][0](),t[i]=0;return r.O(c)},a=self["webpackChunkrzd_ride_frontend"]=self["webpackChunkrzd_ride_frontend"]||[];a.forEach(n.bind(null,0)),a.push=n.bind(null,a.push.bind(a))}();var a=r.O(void 0,[998],(function(){return r(3953)}));a=r.O(a)})();
//# sourceMappingURL=app.3bf1f9ed.js.map