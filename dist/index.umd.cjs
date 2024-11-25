/*! @dongls/xWindow v0.2.7 https://github.com/dongls/xWindow
Copyright 2023-present dongls
Released under the MIT License */
(function(h,s){typeof exports=="object"&&typeof module<"u"?s(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],s):s((h=typeof globalThis<"u"?globalThis:h||self).xWindow={},h.Vue)})(this,function(h,s){"use strict";var Dt=Object.defineProperty;var Bt=(h,s,M)=>s in h?Dt(h,s,{enumerable:!0,configurable:!0,writable:!0,value:M}):h[s]=M;var r=(h,s,M)=>(Bt(h,typeof s!="symbol"?s+"":s,M),M);const M=Symbol(),m=Object.freeze({WINDOW:"x-window",SIMPLE_WINDOW:"x-simple-window",TRANSITION:"x-window-is-transition",MENU:"x-window-is-menu",FOCUSED:"x-window-is-focused",MAXIMIZE:"x-window-is-maximize",HEADER:"x-window-header",BODY:"x-window-body"}),p=Object.freeze({NONE:0,TOP:1,BOTTOM:2,LEFT:4,RIGHT:8}),I=Object.freeze({TOP:p.TOP,BOTTOM:p.BOTTOM,LEFT:p.LEFT,RIGHT:p.RIGHT,TOP_LEFT:p.TOP|p.LEFT,TOP_RIGHT:p.TOP|p.RIGHT,BOTTOM_LEFT:p.BOTTOM|p.LEFT,BOTTOM_RIGHT:p.BOTTOM|p.RIGHT}),a=Object.freeze({NONE:p.NONE,MAXIMIZE:p.TOP,LEFT:p.LEFT,RIGHT:p.RIGHT,TOP_LEFT:p.TOP|p.LEFT,TOP_RIGHT:p.TOP|p.RIGHT,BOTTOM_LEFT:p.BOTTOM|p.LEFT,BOTTOM_RIGHT:p.BOTTOM|p.RIGHT}),x=Object.freeze({DISABLED:0,RESIZE:1,RESIZE_ONLY:2}),L=Object.freeze({INIT:0,MOUNTED:1,UNMOUNTED:2}),A=Object.freeze({SIMPLE_WINDOW:"SimpleWindow",BLANK_WINDOW:"BlankWindow"}),v=Object.freeze({CLOSE:0,MAXIMIZE:1,RESTORE:2,PIN:3,UNPIN:4});class F{constructor(e,t,n){r(this,"type");r(this,"stopped",!1);r(this,"defaultPrevented",!1);r(this,"instance");r(this,"detail");this.type=e,this.instance=t,this.detail=n}stop(){this.stopped=!0}preventDefault(){this.defaultPrevented=!0}}class H{constructor(){r(this,"ALL_EVENTS",new Map)}static NOOP(){}on(e,t){const n=this.ALL_EVENTS.get(e);return n==null?(this.ALL_EVENTS.set(e,[t]),this):(n.includes(t)||n.push(t),this)}once(e,t){const n=o=>{t(o),this.off(e,n,!0)};return this.on(e,n),this}off(e,t,n=!1){const o=this.ALL_EVENTS.get(e);if(o==null)return this;const d=o.indexOf(t);return d<0||(n?o.splice(d,1,H.NOOP):o.splice(d,1)),this}dispatch(e){const t=this.ALL_EVENTS.get(e.type);if(t==null)return e;for(const o of t)if(typeof o=="function"&&o(e),e.stopped)break;const n=t.filter(o=>o!=H.NOOP);return this.ALL_EVENTS.set(e.type,n),e}cleanup(){this.ALL_EVENTS.clear()}}function y(i,e,t){return e!=null&&Number.isFinite(e)&&i<e?e:i}function Y(i){return i==null||typeof i!="string"||i.length==0}function vt(i){i.stopPropagation()}const Ot={top:"offsetTop",left:"offsetLeft",width:"offsetWidth",height:"offsetHeight"};class Mt{constructor(e){r(this,"init",!1);r(this,"defaultPrevented",!1);r(this,"originalEvent");r(this,"target");r(this,"direction");this.originalEvent=e,this.target=e.target,this.direction=Reflect.get(this.target,D.PROP)}createEvent(e,t){return new F(e,t,this)}}class D{constructor(e){r(this,"context");r(this,"window");r(this,"onResizing");r(this,"onResizeend");this.window=e}resizestart(e){e.stopPropagation(),e.preventDefault();const t=new Mt(e);this.context=t,this.onResizing=this.resizing.bind(this),this.onResizeend=this.resizeend.bind(this),window.addEventListener("pointermove",this.onResizing),window.addEventListener("pointerup",this.onResizeend)}resizing(e){if(this.context==null)return;e.stopPropagation(),e.preventDefault();const t=this.context;if(!t.init){if(this.window.dispatch(this.context.createEvent("resizeStart",this.window)).defaultPrevented)return this.cleanup();t.target.setPointerCapture(e.pointerId),t.init=!0}const n=this.calcWindowState(e),o=this.window.getElement();for(const f in n){const T=Math.round(n[f]);Reflect.set(o.style,f,T+"px")}t.originalEvent=e;const d=this.context.createEvent("resizing",this.window);this.window.dispatch(d)}resizeend(e){if(this.context==null)return;e.stopPropagation(),e.preventDefault();const t=this.context;if(t.init){const n=t.createEvent("resizeEnd",this.window);this.window.dispatch(n),this.patchWindowState(this.calcWindowState(e)),t.target.releasePointerCapture(e.pointerId)}this.cleanup()}cleanup(){this.onResizing&&window.removeEventListener("pointermove",this.onResizing),this.onResizeend&&window.removeEventListener("pointerup",this.onResizeend),this.onResizing=void 0,this.onResizeend=void 0,this.context=void 0}calcWindowState(e){const t=this.context,n=this.window.options,o=typeof n.minWidth=="number"&&n.minWidth>=0?n.minWidth:360,d=typeof n.minHeight=="number"&&n.minHeight>=0?n.minHeight:32,f=this.window.getElement().getBoundingClientRect(),T={};return t.direction&p.TOP&&(T.height=y(f.bottom-y(e.clientY,0),d),T.top=f.bottom-T.height),t.direction&p.BOTTOM&&(T.height=y(e.clientY-f.top,d)),t.direction&p.LEFT&&(T.width=y(f.right-y(e.clientX,0),o),T.left=f.right-T.width),t.direction&p.RIGHT&&(T.width=y(e.clientX-f.left,o)),T}patchWindowState(e){const t=this.window.state;for(const n in e){const o=Math.round(e[n]),d=Ot[n];d!=null&&Reflect.set(t,d,o)}}}r(D,"PROP","__xwindow_resize_prop__");const g={window:"_1T2rhwiL",dragging:"yi9w1sZD",resizing:"Ja2o9U31",maximize:"_1eMSsKoB",focused:"_3czvPpS2",header:"GiVk7T8N",menu:"VuG4WNig x-window-is-menu",logo:"yBPezU8e",main:"xbuRK23n",init:"_9t1NJBZM",title:"shyxrRzw",menus:"nkEGqTFw",body:"pk12TusX",footer:"noixF94i",textMenu:"_5duVmvKs x-window-is-menu",closeMenu:"ifXDegN1 VuG4WNig x-window-is-menu",pinMenu:"X5A6roxN VuG4WNig x-window-is-menu",resizeBar:"PPmfTMRL",resizeTop:"v8UGXgKi PPmfTMRL",resizeBottom:"_74VJ9GNt PPmfTMRL",resizeRight:"gg9Mcwey PPmfTMRL",resizeLeft:"Tw7sCaLt PPmfTMRL",resizeTopLeft:"CPuApFyD PPmfTMRL",resizeBottomLeft:"VBRi4FWg PPmfTMRL",resizeTopRight:"gCRpuZdB PPmfTMRL",resizeBottomRight:"iRYpNoUT PPmfTMRL",mask:"xTcKGSVA",simpleWindow:"Mh7BVc1o"},j=s.defineComponent({name:"WindowBody",props:{wid:String,body:{type:[Object,Function,String,Number],default:null},abstractWindow:{type:Object,required:!0}},setup:i=>function(){const e=typeof i.body=="function"?i.body(i.abstractWindow):i.body;return e==null&&console.warn("[xWindow] 请指定窗体内容:",i.abstractWindow.options.title),e}}),It=Math.floor(Number.MAX_SAFE_INTEGER/10)-1e4,bt=[[g.resizeTop,I.TOP],[g.resizeBottom,I.BOTTOM],[g.resizeLeft,I.LEFT],[g.resizeRight,I.RIGHT],[g.resizeTopLeft,I.TOP_LEFT],[g.resizeTopRight,I.TOP_RIGHT],[g.resizeBottomLeft,I.BOTTOM_LEFT],[g.resizeBottomRight,I.BOTTOM_RIGHT]],B=s.defineComponent({name:"BlankWindow",props:{abstractWindow:{type:Object,required:!0}},setup(i,{slots:e}){const t=s.shallowRef(),n=s.reactive({visible:!1,offsetWidth:0,offsetHeight:0,offsetTop:0,offsetLeft:0,focused:!1,pinned:!1,zIndex:0,splitMode:a.NONE}),o=s.ref(L.INIT),d=s.computed(()=>{const c=i.abstractWindow.options;return typeof c.zIndex=="number"&&c.zIndex>0}),f=s.computed(()=>{const c=i.abstractWindow.options;return d.value?c.zIndex:(n.pinned?It:0)+n.zIndex}),T=function(c,u,w,b){return s.computed(()=>{const E=c.options;if(u.value==L.INIT)return{width:E.width,height:E.height,left:E.left,top:E.top};const R=E.mask?null:b.value;return{top:w.offsetTop+"px",left:w.offsetLeft+"px",width:w.offsetWidth+"px",height:u.value==L.INIT?void 0:w.offsetHeight+"px",zIndex:R}})}(i.abstractWindow,o,n,f),G=s.computed(()=>{const c=[m.WINDOW,g.window],u=i.abstractWindow;var w;return u.type===A.SIMPLE_WINDOW&&c.push(m.SIMPLE_WINDOW),o.value==L.INIT&&c.push(g.init),n.splitMode==a.MAXIMIZE&&c.push(g.maximize,m.MAXIMIZE),n.focused&&c.push(g.focused,m.FOCUSED),(w=u.options.className)!=null&&typeof w=="string"&&w.length!=0&&c.push(u.options.className),c}),X=s.computed(()=>{const c=[],u=i.abstractWindow.options;return u.pinnable&&u.mask!==!0&&d.value!==!0&&c.push(n.pinned?v.PIN:v.UNPIN),u.resizeMode==x.RESIZE&&c.push(n.splitMode==a.MAXIMIZE?v.RESTORE:v.MAXIMIZE),u.closeable&&c.push(v.CLOSE),c}),Tt={getElement:Et,getRenderState:function(){return o.value},useCssClass:function(){return g},useMenus:function(){return X}};function Et(){return t.value}async function mt(c){c==null||c.preventDefault(),i.abstractWindow.toggleMaximize()}async function Ct(c){await s.nextTick();const u=i.abstractWindow,w=u.options,b=c.el,E=b.getBoundingClientRect();if(o.value==L.INIT){let R=Math.round(E.left),_=Math.round(E.top);Y(w.left)&&(R=Math.floor((window.innerWidth-E.width)/2)),Y(w.top)&&(_=Math.floor((window.innerHeight-E.height)/2)),n.offsetWidth=E.width,n.offsetHeight=E.height,n.offsetLeft=R,n.offsetTop=_,w.maximize&&mt(),o.value=L.MOUNTED,JSON.parse(JSON.stringify(n)),s.nextTick(()=>{const z=u.createEvent("show");u.dispatch(z),function(S){const P=Array.from(S.querySelectorAll("[autofocus]"));for(const Z of P)if(Z instanceof HTMLElement&&Z.autofocus)return Z.focus()}(b)})}u.focus()}function _t(c){const u=i.abstractWindow;u.focus(),u.allowDrag&&!u.isMaximize&&u.dragstart(c)}function St(c){const u=Et();if(u==null)return;const w=u.getBoundingClientRect();c.clientY-w.top>i.abstractWindow.allowDragArea||mt(c)}function Ht(){const c=i.abstractWindow;return s.createVNode(j,{body:c.body,abstractWindow:i.abstractWindow,key:c.wid},null)}return s.provide(M,i.abstractWindow),function(){const c=i.abstractWindow;var u,w;c.component=Tt,c.state=n,u=c.id,w=c,l.stack.set(u,w);const b=c.createEvent("created");c.dispatch(b)}(),function(){const c=i.abstractWindow,u=c.options;if(n.visible!==!0)return null;const w=s.createVNode("div",{class:g.main,onDblclick:St},[typeof e.default=="function"?e.default(Tt):Ht()]),b={ref:t,id:c.wid,onVnodeMounted:Ct,onPointerdown:_t,class:G.value,style:T.value},E=(R=u.resizeMode,_=c.resizestart,R==x.DISABLED?null:bt.map(P=>s.h("div",{["."+D.PROP]:P[1],className:P[0],onPointerdown:_})));var R,_;let z=s.h("div",b,[w,E]);if(u.mask===!0){const P={zIndex:f.value};z=s.createVNode("div",{class:g.mask,style:P},[z])}return u.teleport===!1?z:s.createVNode(s.Teleport,{to:u.teleport},typeof(S=z)=="function"||Object.prototype.toString.call(S)==="[object Object]"&&!s.isVNode(S)?z:{default:()=>[z]});var S}}}),U='<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M590.265 511.987l305.521-305.468c21.617-21.589 21.617-56.636.027-78.252-21.616-21.617-56.663-21.617-78.279 0L512.012 433.735 206.544 128.213c-21.617-21.617-56.635-21.617-78.252 0-21.616 21.589-21.616 56.635-.027 78.252L433.76 511.987 128.211 817.482c-21.617 21.59-21.617 56.635 0 78.251 10.808 10.81 24.967 16.213 39.125 16.213 14.159 0 28.318-5.403 39.126-16.213l305.522-305.468L817.48 895.788C828.289 906.597 842.447 912 856.606 912s28.317-5.403 39.125-16.212c21.618-21.59 21.618-56.636.028-78.252L590.265 511.987z"/></svg>',K='<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5228" width="64" height="64"><path d="M97.74775349 97.74775349h828.50449302v828.50449302H97.74775349V97.74775349z m103.56306133 103.56306133v621.37837036h621.37837036V201.31081482H201.31081482z" fill="currentColor"></path></svg>',q='<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M38.794 124.791v778.495h946.412V124.791H38.794zm896.678 728.033H89.292v-460.9h846.18v460.9z"/></svg>',J='<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M738.793 681.382v-48.331l88.242-88.243a298.676 298.676 0 00156.712-83.482 38.836 38.836 0 000-54.923l-366.15-366.15a38.836 38.836 0 00-54.923 0 298.52 298.52 0 00-83.519 156.749l-88.169 88.169h-48.332a411.145 411.145 0 00-292.59 121.232c-15.16 15.159-15.16 39.764 0 54.923L278.906 690.17 86.642 882.436a38.836 38.836 0 1054.922 54.922l192.23-192.229 228.844 228.845a38.836 38.836 0 0054.922 0 411.042 411.042 0 00121.233-292.592zM134.02 435.44a333.473 333.473 0 01208.56-72.571l64.406.037a38.836 38.836 0 0027.461-11.351L544.292 241.71a38.68 38.68 0 0011.351-27.462 180.096 180.096 0 0136.798-89.01L898.8 431.593a180.925 180.925 0 01-89.12 36.835 38.836 38.836 0 00-27.462 11.35L672.373 589.626c-7.287 7.286-11.387 17.173-11.35 27.461l.036 64.406a333.318 333.318 0 01-72.608 208.596L134.021 435.44z"/></svg>',Q='<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M845.40952426 212.52063539H65.21904746v702.17142826h780.1904768V212.52063539z m-702.17142933 624.1523808V290.53968285h624.1523808v546.13333334H143.23809493z" fill="currentColor"></path><path d="M981.53650809 76.3936505H201.34603129v78.01904746h702.17142933v624.15238187h78.01904747V76.3936505z" fill="currentColor"></path></svg>';function zt(i){const e=i.options.icon;return typeof e=="string"?s.createVNode("i",{class:[g.logo,"icon",e]},null):s.isVNode(e)?e:typeof e=="function"?e(i):s.createVNode("i",{class:g.logo,innerHTML:q},null)}const $=s.defineComponent({name:"SimpleWindow",props:{abstractWindow:{type:Object,required:!0}},setup(i){const e=i.abstractWindow;function t(n,o){o.stopPropagation(),typeof n.handler=="function"&&n.handler(e)}return function(){return s.createVNode(B,{abstractWindow:e},function(n){const o=n.useMenus(),d=e.options.menus??[];return s.createVNode("div",{class:g.simpleWindow},[s.createVNode("div",{class:[g.header,m.HEADER]},[zt(e),s.createVNode("div",{class:g.title},[e.options.title??"新窗口"]),s.createVNode("div",{class:g.menus,onMousedown:vt},[d.map(f=>function(T){return s.createVNode("button",{type:"button",class:g.textMenu,onClick:t.bind(null,T)},[T.label])}(f)),o.value.map(f=>lt(e,f))])]),s.createVNode("div",{class:[g.body,m.BODY]},[s.createVNode(j,{body:e.body,abstractWindow:i.abstractWindow,key:e.wid},null)])])})}}}),tt=Object.freeze({SIMPLE_WINDOW:$.name,BLANK_WINDOW:B.name});function et(i){return i==B.name?B:$}function nt(i){if(i.key=="Escape")return rt({pressEsc:!0,forced:!1})}function it(){l.isMounted=!1,l.topWindow=null,l.ids.value=[],l.stack.clear()}function ot(){return l.zIndex}function st(){return l.zIndex+=1}function xt(){return l.topWindow}function rt(i){if(l.stack.size==0||l.topWindow==null)return;const e=l.topWindow;(i==null?void 0:i.pressEsc)===!0&&e.options.closeOnPressEsc!==!0||l.topWindow.cancel(i==null?void 0:i.forced)}function Lt(i){const e=i.type===A.SIMPLE_WINDOW?C.create(i):W.create(i);return l.isMounted?(l.ids.value.push(e.id),l.stack.set(e.id,e),e):(function(t){const n=document.createDocumentFragment(),o=et(t.type),d=s.h(o,{abstractWindow:t});d.appContext=l.appContext,s.render(d,n),document.body.appendChild(n),t.on("beforeDestroy",()=>{s.render(null,n)})}(e),e)}function V(i){if(l.topWindow=i,i!=null){for(const e of l.stack.values()){const t=e.state;t!=null&&(t.focused=e===i)}i.state!=null&&i.state.zIndex<ot()&&(i.state.zIndex=st())}}function Rt(){V(function(){if(l.stack.size==0)return;let i;for(const e of l.stack.values())e.state!=null&&e.state.visible===!0&&(i!=null?i.state.zIndex<e.state.zIndex&&(i=e):i=e);return i}())}function yt(){return l.stack.size}function at(){l.appContext=null,it(),window.removeEventListener("keydown",nt,!0)}class ct{constructor(e,t){r(this,"moved",!1);r(this,"originalEvent");r(this,"target");r(this,"deltaX");r(this,"deltaY");r(this,"initialX");r(this,"initialY");r(this,"left",0);r(this,"top",0);r(this,"prevClientX");r(this,"prevClientY");const n=e.getBoundingClientRect();this.originalEvent=t,this.target=e,this.deltaX=Math.round(n.left-t.clientX),this.deltaY=Math.round(n.top-t.clientY),this.initialX=t.clientX,this.initialY=t.clientY,this.prevClientX=t.clientX,this.prevClientY=t.clientY}preventDragEvent(e){return!this.moved&&!(Math.abs(e.clientX-this.initialX)>4)&&!(Math.abs(e.clientY-this.initialY)>4)}createEvent(e,t){return new F(e,t,this)}}class Nt{constructor(e){r(this,"window");r(this,"context");r(this,"onDragging");r(this,"onDragend");this.window=e}static isConflict(e,t){const n=e.getBoundingClientRect(),o=t.getBoundingClientRect();return!(n.top>o.bottom||n.right<o.left||n.bottom<o.top||n.left>o.right)}static findElementsFromPoint(e,t,n,o){return typeof document.elementsFromPoint!="function"?[]:document.elementsFromPoint(e,t).filter(d=>!(o!=null&&!o.contains(d))&&typeof n=="string"&&d.matches(n))}dragstart(e){if(e.button!==0)return;const t=e.target;if(t instanceof Element&&t.closest("."+m.MENU))return;const n=this.window.getElement();if(n==null)return;const o=n.getBoundingClientRect();e.clientY-o.top>this.window.allowDragArea||(e.preventDefault(),e.stopPropagation(),this.context=new ct(n,e),this.context.left=this.window.state.offsetLeft,this.context.top=this.window.state.offsetTop,this.onDragging=this.dragging.bind(this),this.onDragend=this.dragend.bind(this),window.addEventListener("pointermove",this.onDragging),window.addEventListener("pointerup",this.onDragend))}dragging(e){var d;if(this.context==null)return;const t=this.context;if(!t.moved){if(this.window.dispatch(this.context.createEvent("dragStart",this.window)).defaultPrevented)return this.cleanup();const f=(d=this.window.component)==null?void 0:d.useCssClass();f!=null&&f.dragging&&t.target.classList.add(f.dragging),t.target.setPointerCapture(e.pointerId),t.moved=!0}if(t.preventDragEvent(e))return;e.preventDefault(),e.stopPropagation(),t.originalEvent=e,t.left=e.clientX+t.deltaX,t.top=e.clientY+t.deltaY,t.prevClientX=e.clientX,t.prevClientY=e.clientY;const n=t.target;n.style.left=t.left+"px",n.style.top=t.top+"px";const o=this.context.createEvent("dragging",this.window);this.window.dispatch(o)}dragend(e){if(this.context==null||!this.context.moved)return this.cleanup();e.preventDefault(),e.stopPropagation();const t=this.context;t.originalEvent=e,t.target.releasePointerCapture(e.pointerId);const n=t.createEvent("dragEnd",this.window);this.window.dispatch(n),this.window.state.offsetTop=t.top,this.window.state.offsetLeft=t.left,this.cleanup()}cleanup(){var t,n;const e=(t=this.window.component)==null?void 0:t.useCssClass();e!=null&&e.dragging&&((n=this.context)==null||n.target.classList.remove(e.dragging)),this.onDragging&&window.removeEventListener("pointermove",this.onDragging),this.onDragend&&window.removeEventListener("pointerup",this.onDragend),this.onDragging=void 0,this.onDragend=void 0,this.context=void 0}}const N=class N extends H{constructor(t){super();r(this,"CREATE_RESOLVE");r(this,"CREATE_REJECT");r(this,"id");r(this,"type");r(this,"options");r(this,"body");r(this,"state");r(this,"created",!1);r(this,"destroyed",!1);r(this,"component");r(this,"draggable");r(this,"resizable");r(this,"handles",{});r(this,"dragstart");r(this,"resizestart");const{body:n,type:o,...d}=t;this.type=o??A.SIMPLE_WINDOW,this.options=s.reactive(this.createOptions(d)),this.body=n,Reflect.defineProperty(this,"id",{enumerable:!0,configurable:!1,writable:!1,value:N.seed++}),this.initDraggable(),this.initResizable(),this.initHooks()}static create(t){return t instanceof N?t:new N(t)}get wid(){return"window--"+this.id}get isReady(){return this.created===!0}get allowDrag(){const t=this.options.draggable;return t!==!1&&(typeof t!="number"||t>0)}get allowDragArea(){const t=this.options.draggable;return typeof t=="number"&&t>0?t:O.draggaleHeight}get isMaximize(){var t;return((t=this.state)==null?void 0:t.splitMode)===a.MAXIMIZE}createOptions(t){return{...t,title:t.title??"未命名的窗口",icon:t.icon,className:t.className,width:t.width??"640px",minWidth:t.minWidth??360,maxWidth:t.maxWidth,height:t.height,minHeight:t.minHeight??32,maxHeight:t.maxHeight,top:t.top,left:t.left,zIndex:t.zIndex,maximize:t.maximize===!0,teleport:t.teleport??"body",draggable:t.draggable==null||t.draggable,resizeMode:t.resizeMode??x.RESIZE,closeable:t.closeable!==!1,mask:t.mask===!0,pinnable:t.pinnable!==!1,displayAfterCreate:t.displayAfterCreate!==!1,destroyAfterClose:t.destroyAfterClose!==!1,closeOnPressEsc:t.closeOnPressEsc!==!1}}createEvent(t,n){return new F(t,this,n)}initDraggable(){this.draggable=new Nt(this),this.dragstart=this.draggable.dragstart.bind(this.draggable)}initResizable(){this.resizable=new D(this),this.resizestart=this.resizable.resizestart.bind(this.resizable)}initHooks(){this.once("created",()=>{this.created=!0,typeof this.CREATE_RESOLVE=="function"&&this.CREATE_RESOLVE(),delete this.CREATE_REJECT,delete this.CREATE_RESOLVE})}ready(){return this.created===!0?Promise.resolve():new Promise((t,n)=>{this.CREATE_RESOLVE=t,this.CREATE_REJECT=n})}show(){this.state!=null&&(this.dispatch(this.createEvent("beforeShow")).defaultPrevented||(this.state.visible=!0))}close(t=!1){if(this.state==null||this.options.closeable===!1&&t!==!0)return!1;const n=this.dispatch(this.createEvent("beforeClose"));return(t===!0||!n.defaultPrevented)&&(this.state.visible=!1,this.dispatch(this.createEvent("close")),this.state.focused&&setTimeout(Rt),this.destroyed||this.options.destroyAfterClose===!1||this.destroy(),!0)}cleanup(){super.cleanup(),this.dragstart=void 0,this.resizestart=void 0,this.component=void 0,this.state=void 0,this.handles={}}destroy(){var t;this.destroyed=!0,((t=this.state)==null?void 0:t.visible)===!0&&this.close(),this.dispatch(this.createEvent("beforeDestroy")),function(n){if(!l.stack.has(n)||(l.stack.delete(n),!l.isMounted))return;const o=l.ids.value.indexOf(n);o<0||l.ids.value.splice(o,1)}(this.id),setTimeout(()=>this.cleanup(),100)}getElement(){var t;return(t=this.component)==null?void 0:t.getElement()}useMenus(){return this.component.useMenus()}focus(){var t;this.state==null||this.state.focused||(t=this.id,V(l.stack.get(t)))}startTransition(){const t=document.documentElement,n=function(o){o.target.matches("."+m.WINDOW)&&(t.classList.remove(m.TRANSITION),t.removeEventListener("transitionend",n))};t.classList.add(m.TRANSITION),t.addEventListener("transitionend",n)}requestMaximize(){const t=this.state;t!=null&&this.options.resizeMode===x.RESIZE&&(t.splitMode=a.MAXIMIZE,this.startTransition(),this.dispatch(this.createEvent("maximizeChange")))}exitMaximize(){const t=this.state;t!=null&&this.options.resizeMode===x.RESIZE&&(t.splitMode=a.NONE,this.startTransition(),this.dispatch(this.createEvent("maximizeChange")))}toggleMaximize(){const t=this.state;t!=null&&this.options.resizeMode===x.RESIZE&&(t.splitMode===a.MAXIMIZE?this.exitMaximize():this.requestMaximize())}pin(){const t=this.state;t!=null&&(t.pinned=!0)}unpin(){const t=this.state;t!=null&&(t.pinned=!1)}togglePin(){const t=this.state;t!=null&&(t.pinned?this.unpin():this.pin())}useHandle(t,n){this.handles[t]=n}async callHandle(t){const n=this.handles[t];if(typeof n=="function")return await n()}dispatchConfirm(){return this.callHandle("confirm").then(t=>this.confirm(t))}confirm(t){this.dispatch(this.createEvent("confirm",t)),this.close(!0)}dispatchCancel(){return this.callHandle("cancel").then(t=>this.cancel(!0,t))}cancel(t=!0,n){this.close(t)&&this.dispatch(this.createEvent("cancel",n))}promisify(){return new Promise((t,n)=>{this.once("confirm",o=>t(o.detail)),this.once("cancel",o=>n(o.detail))})}};r(N,"seed",1e3);let W=N;class C extends W{static create(e){return e instanceof C?e:new C(e)}constructor(e){super(e)}updateMenus(e){this.options.menus=e}}const dt=1e3,O={},l={appContext:null,isMounted:!1,zIndex:1e3,stack:new Map,ids:s.ref([]),topWindow:null,previewState:s.reactive({mode:a.NONE,width:0,height:0})};function Pt(i){var e;O.zIndex=(e=i==null?void 0:i.zIndex,typeof e!="number"?dt:Number.isFinite(e)?Math.floor(e):dt),O.draggaleHeight=(i==null?void 0:i.draggaleHeight)??32,O.size=(i==null?void 0:i.size)??{},l.zIndex=O.zIndex}function lt(i,e){var o;const t=i.state,n=((o=i.component)==null?void 0:o.useCssClass())??{};switch(e){case v.CLOSE:return s.createVNode("button",{onClick:function(){i.cancel()},type:"button",innerHTML:U,class:n.closeMenu,title:"关闭"},null);case v.PIN:case v.UNPIN:const d=t.pinned?"取消固定":"固定",f=t.pinned?n.pinMenu:n.menu;return s.createVNode("button",{onClick:function(){i.togglePin()},type:"button",innerHTML:J,class:f,title:d},null);case v.MAXIMIZE:case v.RESTORE:const T=t.splitMode==a.MAXIMIZE?Q:K,G=t.splitMode==a.MAXIMIZE?"还原":"最大化";return s.createVNode("button",{onClick:function(X){X.preventDefault(),i.toggleMaximize()},type:"button",innerHTML:T,class:n.menu,title:G},null)}return null}a.BOTTOM_LEFT,a.LEFT,a.BOTTOM_RIGHT,a.RIGHT,a.LEFT,a.TOP_LEFT,a.RIGHT,a.TOP_RIGHT,a.MAXIMIZE,a.TOP_LEFT,a.LEFT,a.TOP_RIGHT,a.RIGHT,a.LEFT,a.BOTTOM_LEFT,a.RIGHT,a.BOTTOM_RIGHT,a.NONE,a.TOP_RIGHT,a.TOP_LEFT,a.TOP_LEFT,a.TOP_RIGHT,a.BOTTOM_RIGHT,a.BOTTOM_LEFT,a.BOTTOM_LEFT,a.BOTTOM_RIGHT,a.LEFT,a.TOP_LEFT,a.TOP_RIGHT,a.TOP_RIGHT,a.TOP_LEFT,a.BOTTOM_LEFT,a.BOTTOM_RIGHT,a.BOTTOM_RIGHT,a.BOTTOM_LEFT,a.RIGHT;const k=s.defineComponent({name:"WindowManager",setup(){const i=l.ids;function e(t){t.key,t.ctrlKey}return l.isMounted=!0,window.addEventListener("keydown",e,!0),s.onBeforeUnmount(()=>{it(),window.removeEventListener("keydown",e,!0)}),function(){const t=i.value.map(n=>{const o=function(f){return l.stack.get(f)}(n);if(o==null)return null;const d=et(o.type);return s.h(d,{abstractWindow:o,key:o.wid})});return s.createVNode(s.Fragment,null,[t])}}});function ut(i){const e=function(n){if(n.length==1){const o=n[0];return o==null?null:typeof o=="object"?{...o}:null}if(n.length==2){const[o,d]=n;if(typeof o=="string"&&d!=null)return{title:o,body:d}}if(n.length==3){const[o,d,f]=n;if(typeof o=="string"&&d!=null)return{...f,title:o,body:d}}return null}(i)??{},t=typeof e.size=="string"?Reflect.get(O.size,e.size):null;return t!=null&&(e.width=t.width,e.height=t.height,e.top=t.top,e.left=t.left),e}function ht(...i){const e=ut(i)??{};return e.type=tt.SIMPLE_WINDOW,pt(e)}function pt(i){const e=Lt(i);return e.ready().then(()=>{i.displayAfterCreate!==!1&&e.show()}),e}const Wt=Object.freeze({renderMenu:lt});function ft(i,e){i.component(k.name,k),Pt(e),window.addEventListener("keydown",nt,!0),function(t){l.appContext=t._context}(i)}const gt="0.2.7",wt={install:ft,version:gt};h.AbstractWindow=W,h.RENDER_STATES=L,h.RESIZE_MODE=x,h.Render=Wt,h.SPLIT_MODES=a,h.SimpleWindow=C,h.WindowDragContext=ct,h.WindowManager=k,h.cleanup=at,h.default=wt,h.install=ft,h.useBlankWindow=function(...i){const e=ut(i)??{};return e.type=tt.BLANK_WINDOW,pt(e)},h.useIcons=function(){return{IconClose:U,IconMax:K,IconPin:J,IconWindow:q,IconRestore:Q}},h.useSimpleWindow=ht,h.useWindow=function(...i){return ht(i)},h.useWindowApi=function(){return s.inject(M)},h.useWindowManager=function(){return{closeTopWindow:rt,getTopWindow:xt,getTopZIndex:st,getWindowCount:yt,getZIndex:ot,setFocusedWindow:V,cleanup:at}},h.useWindowSize=function(i,e){O.size==null&&(O.size={}),O.size[i]=e},h.version=gt,h.xWindow=wt,Object.defineProperties(h,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
