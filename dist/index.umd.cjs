/*! @dongls/xWindow v0.1.1 https://github.com/dongls/xWindow
Copyright 2023-present dongls
Released under the MIT License */
(function(h,s){typeof exports=="object"&&typeof module<"u"?s(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],s):s((h=typeof globalThis<"u"?globalThis:h||self).xWindow={},h.Vue)})(this,function(h,s){"use strict";var ke=Object.defineProperty;var Xe=(h,s,z)=>s in h?ke(h,s,{enumerable:!0,configurable:!0,writable:!0,value:z}):h[s]=z;var a=(h,s,z)=>(Xe(h,typeof s!="symbol"?s+"":s,z),z);const z=Symbol(),R=Object.freeze({WINDOW:"x-window",TRANSITION:"x-window-is-transition",MENU:"x-window-is-menu",FOCUSED:"x-window-is-focused",MAXIMIZE:"x-window-is-maximize",HEADER:"x-window-header",BODY:"x-window-body"}),f=Object.freeze({NONE:0,TOP:1,BOTTOM:2,LEFT:4,RIGHT:8}),L=Object.freeze({TOP:f.TOP,BOTTOM:f.BOTTOM,LEFT:f.LEFT,RIGHT:f.RIGHT,TOP_LEFT:f.TOP|f.LEFT,TOP_RIGHT:f.TOP|f.RIGHT,BOTTOM_LEFT:f.BOTTOM|f.LEFT,BOTTOM_RIGHT:f.BOTTOM|f.RIGHT}),r=Object.freeze({NONE:f.NONE,MAXIMIZE:f.TOP,LEFT:f.LEFT,RIGHT:f.RIGHT,TOP_LEFT:f.TOP|f.LEFT,TOP_RIGHT:f.TOP|f.RIGHT,BOTTOM_LEFT:f.BOTTOM|f.LEFT,BOTTOM_RIGHT:f.BOTTOM|f.RIGHT}),P=Object.freeze({DISABLED:0,RESIZE:1,RESIZE_ONLY:2}),W=Object.freeze({INIT:0,MOUNTED:1,UNMOUNTED:2}),we=Object.freeze({SIMPLE_WINDOW:"SimpleWindow",BLANK_WINDOW:"BlankWindow"}),M=Object.freeze({CLOSE:0,MAXIMIZE:1,RESTORE:2,PIN:3,UNPIN:4});class k{constructor(t,e,n){a(this,"type");a(this,"stopped",!1);a(this,"defaultPrevented",!1);a(this,"instance");a(this,"detail");this.type=t,this.instance=e,this.detail=n}stop(){this.stopped=!0}preventDefault(){this.defaultPrevented=!0}}class A{constructor(){a(this,"ALL_EVENTS",new Map)}static NOOP(){}on(t,e){const n=this.ALL_EVENTS.get(t);return n==null?(this.ALL_EVENTS.set(t,[e]),this):(n.includes(e)||n.push(e),this)}once(t,e){const n=o=>{e(o),this.off(t,n,!0)};return this.on(t,n),this}off(t,e,n=!1){const o=this.ALL_EVENTS.get(t);if(o==null)return this;const c=o.indexOf(e);return c<0||(n?o.splice(c,1,A.NOOP):o.splice(c,1)),this}dispatch(t){const e=this.ALL_EVENTS.get(t.type);if(e==null)return t;for(const o of e)if(typeof o=="function"&&o(t),t.stopped)break;const n=e.filter(o=>o!=A.NOOP);return this.ALL_EVENTS.set(t.type,n),t}cleanup(){this.ALL_EVENTS.clear()}}function O(i,t,e){return t!=null&&Number.isFinite(t)&&i<t?t:e!=null&&Number.isFinite(e)&&i>e?e:i}function U(i){return i==null||typeof i!="string"||i.length==0}function Te(i){i.stopPropagation()}const Ee={top:"offsetTop",left:"offsetLeft",width:"offsetWidth",height:"offsetHeight"};class me{constructor(t){a(this,"init",!1);a(this,"defaultPrevented",!1);a(this,"originalEvent");a(this,"target");a(this,"direction");this.originalEvent=t,this.target=t.target,this.direction=Reflect.get(this.target,F.PROP)}createEvent(t,e){return new k(t,e,this)}}class F{constructor(t){a(this,"context");a(this,"window");a(this,"onResizing");a(this,"onResizeend");this.window=t}resizestart(t){t.stopPropagation(),t.preventDefault();const e=new me(t);this.context=e,this.onResizing=this.resizing.bind(this),this.onResizeend=this.resizeend.bind(this),window.addEventListener("pointermove",this.onResizing),window.addEventListener("pointerup",this.onResizeend)}resizing(t){if(this.context==null)return;t.stopPropagation(),t.preventDefault();const e=this.context;if(!e.init){if(this.window.dispatch(this.context.createEvent("resizeStart",this.window)).defaultPrevented)return this.cleanup();e.target.setPointerCapture(t.pointerId),e.init=!0}const n=this.calcWindowState(t),o=this.window.getElement();for(const u in n){const E=Math.round(n[u]);Reflect.set(o.style,u,E+"px")}e.originalEvent=t;const c=this.context.createEvent("resizing",this.window);this.window.dispatch(c)}resizeend(t){if(this.context==null)return;t.stopPropagation(),t.preventDefault();const e=this.context;if(e.init){const n=e.createEvent("resizeEnd",this.window);this.window.dispatch(n),this.patchWindowState(this.calcWindowState(t)),e.target.releasePointerCapture(t.pointerId)}this.cleanup()}cleanup(){this.onResizing&&window.removeEventListener("pointermove",this.onResizing),this.onResizeend&&window.removeEventListener("pointerup",this.onResizeend),this.onResizing=void 0,this.onResizeend=void 0,this.context=void 0}calcWindowState(t){const e=this.context,n=this.window.options,o=typeof n.minWidth=="number"&&n.minWidth>=0?n.minWidth:360,c=typeof n.minHeight=="number"&&n.minHeight>=0?n.minHeight:32,u=this.window.getElement().getBoundingClientRect(),E=document.documentElement.getBoundingClientRect(),m={};if(e.direction&f.TOP){const T=O(u.bottom-O(t.clientY,0),c),I=O(t.clientY-E.top,0,window.innerHeight-T);m.height=T,m.top=I}if(e.direction&f.BOTTOM){const T=O(O(t.clientY,0,window.innerHeight)-u.top,c),I=O(t.clientY-T-E.top,0,window.innerHeight-T);m.height=T,m.top=I}if(e.direction&f.LEFT){const T=O(u.right-O(t.clientX,0),o,window.innerWidth),I=O(t.clientX-E.left,0,window.innerWidth-T);m.width=T,m.left=I}if(e.direction&f.RIGHT){const T=O(O(t.clientX,0)-u.left,o,window.innerWidth),I=O(t.clientX-T-E.left,0,window.innerWidth-T-0);m.width=T,m.left=I}return m}patchWindowState(t){const e=this.window.state;for(const n in t){const o=Math.round(t[n]),c=Ee[n];c!=null&&Reflect.set(e,c,o)}}}a(F,"PROP","__xwindow_resize_prop__");const g={window:"_1T2rhwiL",dragging:"yi9w1sZD",resizing:"Ja2o9U31",maximize:"_1eMSsKoB",focused:"_3czvPpS2",header:"GiVk7T8N",menu:"VuG4WNig x-window-is-menu",logo:"yBPezU8e",main:"xbuRK23n",init:"_9t1NJBZM",title:"shyxrRzw",menus:"nkEGqTFw",body:"pk12TusX",footer:"noixF94i",closeMenu:"ifXDegN1 VuG4WNig x-window-is-menu",pinMenu:"X5A6roxN VuG4WNig x-window-is-menu",resizeBar:"PPmfTMRL",resizeTop:"v8UGXgKi PPmfTMRL",resizeBottom:"_74VJ9GNt PPmfTMRL",resizeRight:"gg9Mcwey PPmfTMRL",resizeLeft:"Tw7sCaLt PPmfTMRL",resizeTopLeft:"CPuApFyD PPmfTMRL",resizeBottomLeft:"VBRi4FWg PPmfTMRL",resizeTopRight:"gCRpuZdB PPmfTMRL",resizeBottomRight:"iRYpNoUT PPmfTMRL",mask:"xTcKGSVA"},ve=s.defineComponent({name:"WindowBody",props:{wid:String,body:{type:[Object,Function,String,Number],default:null},abstractWindow:{type:Object,required:!0}},setup:i=>function(){const t=typeof i.body=="function"?i.body(i.abstractWindow):i.body;return t==null&&console.warn("[xWindow] 请指定窗体内容:",i.abstractWindow.options.title),t}}),Oe=Math.floor(Number.MAX_SAFE_INTEGER/10)-1e4,Me=[[g.resizeTop,L.TOP],[g.resizeBottom,L.BOTTOM],[g.resizeLeft,L.LEFT],[g.resizeRight,L.RIGHT],[g.resizeTopLeft,L.TOP_LEFT],[g.resizeTopRight,L.TOP_RIGHT],[g.resizeBottomLeft,L.BOTTOM_LEFT],[g.resizeBottomRight,L.BOTTOM_RIGHT]],C=s.defineComponent({name:"BlankWindow",props:{abstractWindow:{type:Object,required:!0}},setup(i,{slots:t}){const e=s.shallowRef(),n=s.reactive({visible:!1,offsetWidth:0,offsetHeight:0,offsetTop:0,offsetLeft:0,focused:!1,pinned:!1,zIndex:0,splitMode:r.NONE}),o=s.ref(W.INIT),c=s.computed(()=>{const d=i.abstractWindow.options;return typeof d.zIndex=="number"&&d.zIndex>0}),u=s.computed(()=>{const d=i.abstractWindow.options;return c.value?d.zIndex:(n.pinned?Oe:0)+n.zIndex}),E=function(d,p,w,x){return s.computed(()=>{const v=d.options;if(p.value==W.INIT)return{width:v.width,height:v.height,left:v.left,top:v.top};const H=v.mask?null:x.value;return{top:w.offsetTop+"px",left:w.offsetLeft+"px",width:w.offsetWidth+"px",height:p.value==W.INIT?void 0:w.offsetHeight+"px",zIndex:H}})}(i.abstractWindow,o,n,u),m=s.computed(()=>{const d=[R.WINDOW,g.window],p=i.abstractWindow;var w;return o.value==W.INIT&&d.push(g.init),n.splitMode==r.MAXIMIZE&&d.push(g.maximize,R.MAXIMIZE),n.focused&&d.push(g.focused,R.FOCUSED),(w=p.options.className)!=null&&typeof w=="string"&&w.length!=0&&d.push(p.options.className),d}),T=s.computed(()=>{const d=[],p=i.abstractWindow.options;return p.pinnable&&p.mask!==!0&&c.value!==!0&&d.push(n.pinned?M.PIN:M.UNPIN),p.resizeMode==P.RESIZE&&d.push(n.splitMode==r.MAXIMIZE?M.RESTORE:M.MAXIMIZE),p.closeable&&d.push(M.CLOSE),d}),I={getElement:fe,getRenderState:function(){return o.value},useCssClass:function(){return g},useMenus:function(){return T}};function fe(){return e.value}async function ge(d){d==null||d.preventDefault(),i.abstractWindow.toggleMaximize()}async function Fe(d){await s.nextTick();const p=i.abstractWindow,w=p.options,x=d.el,v=x.getBoundingClientRect();if(o.value==W.INIT){let H=Math.round(v.left),B=Math.round(v.top);U(w.left)&&(H=Math.floor((window.innerWidth-v.width)/2)),U(w.top)&&(B=Math.floor((window.innerHeight-v.height)/2)),n.offsetWidth=v.width,n.offsetHeight=v.height,n.offsetLeft=H,n.offsetTop=B,w.maximize&&ge(),o.value=W.MOUNTED,JSON.parse(JSON.stringify(n)),s.nextTick(()=>{const G=p.createEvent("show");p.dispatch(G),function(y){const D=Array.from(y.querySelectorAll("[autofocus]"));for(const N of D)if(N instanceof HTMLElement&&N.autofocus)return N.focus()}(x)})}p.focus()}function Ve(d){const p=i.abstractWindow;p.focus(),p.allowDrag&&!p.isMaximize&&p.dragstart(d)}function Ge(d){const p=fe();if(p==null)return;const w=p.getBoundingClientRect();d.clientY-w.top>i.abstractWindow.allowDragArea||ge(d)}return s.provide(z,i.abstractWindow),function(){const d=i.abstractWindow;var p,w;d.component=I,d.state=n,p=d.id,w=d,l.stack.set(p,w);const x=d.createEvent("created");d.dispatch(x)}(),function(){const d=i.abstractWindow,p=d.options;if(n.visible!==!0)return null;const w=typeof t.header=="function"?t.header(I):null,x=s.createVNode("div",{class:g.main,onDblclick:Ge},[w,s.createVNode("div",{class:[g.body,R.BODY,p.bodyClassName]},[s.createVNode(ve,{body:d.body,abstractWindow:i.abstractWindow,key:d.wid},null)])]),v={ref:e,id:d.wid,onVnodeMounted:Fe,onPointerdown:Ve,class:m.value,style:E.value},H=(B=p.resizeMode,G=d.resizestart,B==P.DISABLED?null:Me.map(N=>s.h("div",{["."+F.PROP]:N[1],className:N[0],onPointerdown:G})));var B,G;let y=s.h("div",v,[x,H]);if(p.mask===!0){const N={zIndex:u.value};y=s.createVNode("div",{class:g.mask,style:N},[y])}return p.teleport===!1?y:s.createVNode(s.Teleport,{to:p.teleport},typeof(D=y)=="function"||Object.prototype.toString.call(D)==="[object Object]"&&!s.isVNode(D)?y:{default:()=>[y]});var D}}}),K='<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M590.265 511.987l305.521-305.468c21.617-21.589 21.617-56.636.027-78.252-21.616-21.617-56.663-21.617-78.279 0L512.012 433.735 206.544 128.213c-21.617-21.617-56.635-21.617-78.252 0-21.616 21.589-21.616 56.635-.027 78.252L433.76 511.987 128.211 817.482c-21.617 21.59-21.617 56.635 0 78.251 10.808 10.81 24.967 16.213 39.125 16.213 14.159 0 28.318-5.403 39.126-16.213l305.522-305.468L817.48 895.788C828.289 906.597 842.447 912 856.606 912s28.317-5.403 39.125-16.212c21.618-21.59 21.618-56.636.028-78.252L590.265 511.987z"/></svg>',J='<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5228" width="64" height="64"><path d="M97.74775349 97.74775349h828.50449302v828.50449302H97.74775349V97.74775349z m103.56306133 103.56306133v621.37837036h621.37837036V201.31081482H201.31081482z" fill="currentColor"></path></svg>',q='<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M38.794 124.791v778.495h946.412V124.791H38.794zm896.678 728.033H89.292v-460.9h846.18v460.9z"/></svg>',Q='<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M738.793 681.382v-48.331l88.242-88.243a298.676 298.676 0 00156.712-83.482 38.836 38.836 0 000-54.923l-366.15-366.15a38.836 38.836 0 00-54.923 0 298.52 298.52 0 00-83.519 156.749l-88.169 88.169h-48.332a411.145 411.145 0 00-292.59 121.232c-15.16 15.159-15.16 39.764 0 54.923L278.906 690.17 86.642 882.436a38.836 38.836 0 1054.922 54.922l192.23-192.229 228.844 228.845a38.836 38.836 0 0054.922 0 411.042 411.042 0 00121.233-292.592zM134.02 435.44a333.473 333.473 0 01208.56-72.571l64.406.037a38.836 38.836 0 0027.461-11.351L544.292 241.71a38.68 38.68 0 0011.351-27.462 180.096 180.096 0 0136.798-89.01L898.8 431.593a180.925 180.925 0 01-89.12 36.835 38.836 38.836 0 00-27.462 11.35L672.373 589.626c-7.287 7.286-11.387 17.173-11.35 27.461l.036 64.406a333.318 333.318 0 01-72.608 208.596L134.021 435.44z"/></svg>',$='<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M845.40952426 212.52063539H65.21904746v702.17142826h780.1904768V212.52063539z m-702.17142933 624.1523808V290.53968285h624.1523808v546.13333334H143.23809493z" fill="currentColor"></path><path d="M981.53650809 76.3936505H201.34603129v78.01904746h702.17142933v624.15238187h78.01904747V76.3936505z" fill="currentColor"></path></svg>';function Ie(i){const t=i.options.icon;return typeof t=="string"?s.createVNode("i",{class:[g.logo,"icon",t]},null):s.isVNode(t)?t:typeof t=="function"?t(i):s.createVNode("i",{class:g.logo,innerHTML:q},null)}const S=s.defineComponent({name:"SimpleWindow",props:{abstractWindow:{type:Object,required:!0}},setup(i){const t=i.abstractWindow,e={header(){const n=t.useMenus();return s.createVNode("div",{class:g.header},[Ie(t),s.createVNode("div",{class:g.title},[t.options.title??"新窗口"]),s.createVNode("div",{class:g.menus,onMousedown:Te},[n.value.map(o=>le(t,o))])])}};return function(){return s.createVNode(C,{abstractWindow:i.abstractWindow},typeof(n=e)=="function"||Object.prototype.toString.call(n)==="[object Object]"&&!s.isVNode(n)?e:{default:()=>[e]});var n}}}),ee=Object.freeze({SIMPLE_WINDOW:S.name,BLANK_WINDOW:C.name});function te(i){return i==C.name?C:S}function ne(i){if(i.key=="Escape")return re({pressEsc:!0,forced:!1})}function ie(){l.isMounted=!1,l.topWindow=null,l.ids.value=[],l.stack.clear()}function oe(){return l.zIndex}function se(){return l.zIndex+=1}function be(){return l.topWindow}function re(i){if(l.stack.size==0||l.topWindow==null)return;const t=l.topWindow;(i==null?void 0:i.pressEsc)===!0&&t.options.closeOnPressEsc!==!0||l.topWindow.cancel(i==null?void 0:i.forced)}function ze(i){const t=V.create(i);return l.isMounted?(l.ids.value.push(t.id),l.stack.set(t.id,t),t):(function(e){const n=document.createDocumentFragment(),o=te(e.type),c=s.h(o,{abstractWindow:e});c.appContext=l.appContext,s.render(c,n),document.body.appendChild(n),e.on("beforeDestroy",()=>{s.render(null,n)})}(t),t)}function X(i){if(l.topWindow=i,i!=null){for(const t of l.stack.values()){const e=t.state;e!=null&&(e.focused=t===i)}i.state!=null&&i.state.zIndex<oe()&&(i.state.zIndex=se())}}function Re(){X(function(){if(l.stack.size==0)return;let i;for(const t of l.stack.values())t.state!=null&&t.state.visible===!0&&(i!=null?i.state.zIndex<t.state.zIndex&&(i=t):i=t);return i}())}function Le(){return l.stack.size}function ae(){l.appContext=null,ie(),window.removeEventListener("keydown",ne,!0)}class ce{constructor(t,e){a(this,"moved",!1);a(this,"originalEvent");a(this,"target");a(this,"deltaX");a(this,"deltaY");a(this,"initialX");a(this,"initialY");a(this,"left",0);a(this,"top",0);a(this,"prevClientX");a(this,"prevClientY");const n=t.getBoundingClientRect();this.originalEvent=e,this.target=t,this.deltaX=Math.round(n.left-e.clientX),this.deltaY=Math.round(n.top-e.clientY),this.initialX=e.clientX,this.initialY=e.clientY,this.prevClientX=e.clientX,this.prevClientY=e.clientY}preventDragEvent(t){return!this.moved&&!(Math.abs(t.clientX-this.initialX)>4)&&!(Math.abs(t.clientY-this.initialY)>4)}createEvent(t,e){return new k(t,e,this)}}class xe{constructor(t){a(this,"window");a(this,"context");a(this,"onDragging");a(this,"onDragend");this.window=t}static isConflict(t,e){const n=t.getBoundingClientRect(),o=e.getBoundingClientRect();return!(n.top>o.bottom||n.right<o.left||n.bottom<o.top||n.left>o.right)}static findElementsFromPoint(t,e,n,o){return typeof document.elementsFromPoint!="function"?[]:document.elementsFromPoint(t,e).filter(c=>!(o!=null&&!o.contains(c))&&typeof n=="string"&&c.matches(n))}dragstart(t){if(t.button!==0)return;const e=t.target;if(e instanceof Element&&e.closest("."+R.MENU))return;const n=this.window.getElement();if(n==null)return;const o=n.getBoundingClientRect();t.clientY-o.top>this.window.allowDragArea||(t.preventDefault(),t.stopPropagation(),this.context=new ce(n,t),this.context.left=this.window.state.offsetLeft,this.context.top=this.window.state.offsetTop,this.onDragging=this.dragging.bind(this),this.onDragend=this.dragend.bind(this),window.addEventListener("pointermove",this.onDragging),window.addEventListener("pointerup",this.onDragend))}dragging(t){var c;if(this.context==null)return;const e=this.context;if(!e.moved){if(this.window.dispatch(this.context.createEvent("dragStart",this.window)).defaultPrevented)return this.cleanup();const u=(c=this.window.component)==null?void 0:c.useCssClass();u!=null&&u.dragging&&e.target.classList.add(u.dragging),e.target.setPointerCapture(t.pointerId),e.moved=!0}if(e.preventDragEvent(t))return;t.preventDefault(),t.stopPropagation(),e.originalEvent=t,e.left=t.clientX+e.deltaX,e.top=t.clientY+e.deltaY,e.prevClientX=t.clientX,e.prevClientY=t.clientY;const n=e.target;n.style.left=e.left+"px",n.style.top=e.top+"px";const o=this.context.createEvent("dragging",this.window);this.window.dispatch(o)}dragend(t){if(this.context==null||!this.context.moved)return this.cleanup();t.preventDefault(),t.stopPropagation();const e=this.context;e.originalEvent=t,e.target.releasePointerCapture(t.pointerId);const n=e.createEvent("dragEnd",this.window);this.window.dispatch(n),this.window.state.offsetTop=e.top,this.window.state.offsetLeft=e.left,this.cleanup()}cleanup(){var e,n;const t=(e=this.window.component)==null?void 0:e.useCssClass();t!=null&&t.dragging&&((n=this.context)==null||n.target.classList.remove(t.dragging)),this.onDragging&&window.removeEventListener("pointermove",this.onDragging),this.onDragend&&window.removeEventListener("pointerup",this.onDragend),this.onDragging=void 0,this.onDragend=void 0,this.context=void 0}}const _=class _ extends A{constructor(e){super();a(this,"CREATE_RESOLVE");a(this,"CREATE_REJECT");a(this,"id");a(this,"type");a(this,"options");a(this,"body");a(this,"state");a(this,"created",!1);a(this,"destroyed",!1);a(this,"component");a(this,"draggable");a(this,"resizable");a(this,"handles",{});a(this,"dragstart");a(this,"resizestart");this.type=e.type??we.SIMPLE_WINDOW,this.options=this.createOptions(e),this.body=e.body,Reflect.defineProperty(this,"id",{enumerable:!0,configurable:!1,writable:!1,value:_.seed++}),this.initDraggable(),this.initResizable(),this.initHooks()}static create(e){return e instanceof _?e:new _(e)}get wid(){return"window--"+this.id}get isReady(){return this.created===!0}get allowDrag(){const e=this.options.draggable;return e!==!1&&(typeof e!="number"||e>0)}get allowDragArea(){const e=this.options.draggable;return typeof e=="number"&&e>0?e:b.draggaleHeight}get isMaximize(){var e;return((e=this.state)==null?void 0:e.splitMode)===r.MAXIMIZE}createOptions(e){return{title:e.title??"未命名的窗口",icon:e.icon,className:e.className,bodyClassName:e.bodyClassName,width:e.width??"640px",minWidth:e.minWidth??360,maxWidth:e.maxWidth,height:e.height,minHeight:e.minHeight??32,maxHeight:e.maxHeight,top:e.top,left:e.left,zIndex:e.zIndex,maximize:e.maximize===!0,teleport:e.teleport??"body",draggable:e.draggable==null||e.draggable,resizeMode:e.resizeMode??P.RESIZE,closeable:e.closeable!==!1,mask:e.mask===!0,pinnable:e.pinnable!==!1,displayAfterCreate:e.displayAfterCreate!==!1,destroyAfterClose:e.destroyAfterClose!==!1,closeOnPressEsc:e.closeOnPressEsc!==!1}}createEvent(e,n){return new k(e,this,n)}initDraggable(){this.draggable=new xe(this),this.dragstart=this.draggable.dragstart.bind(this.draggable)}initResizable(){this.resizable=new F(this),this.resizestart=this.resizable.resizestart.bind(this.resizable)}initHooks(){this.once("created",()=>{this.created=!0,typeof this.CREATE_RESOLVE=="function"&&this.CREATE_RESOLVE(),delete this.CREATE_REJECT,delete this.CREATE_RESOLVE})}ready(){return this.created===!0?Promise.resolve():new Promise((e,n)=>{this.CREATE_RESOLVE=e,this.CREATE_REJECT=n})}show(){this.state!=null&&(this.dispatch(this.createEvent("beforeShow")).defaultPrevented||(this.state.visible=!0))}close(e=!1){if(this.state==null||this.options.closeable===!1&&e!==!0)return!1;const n=this.dispatch(this.createEvent("beforeClose"));return(e===!0||!n.defaultPrevented)&&(this.state.visible=!1,this.dispatch(this.createEvent("close")),this.state.focused&&setTimeout(Re),this.destroyed||this.options.destroyAfterClose===!1||this.destroy(),!0)}cleanup(){super.cleanup(),this.dragstart=void 0,this.resizestart=void 0,this.component=void 0,this.state=void 0,this.handles={}}destroy(){var e;this.destroyed=!0,((e=this.state)==null?void 0:e.visible)===!0&&this.close(),this.dispatch(this.createEvent("beforeDestroy")),function(n){if(console.log("[xWindow]: remove window",n),!l.stack.has(n)||(l.stack.delete(n),!l.isMounted))return;const o=l.ids.value.indexOf(n);o<0||l.ids.value.splice(o,1)}(this.id),setTimeout(()=>this.cleanup(),100)}getElement(){var e;return(e=this.component)==null?void 0:e.getElement()}useMenus(){return this.component.useMenus()}focus(){var e;this.state==null||this.state.focused||(e=this.id,X(l.stack.get(e)))}startTransition(){const e=document.documentElement,n=function(o){o.target.matches("."+R.WINDOW)&&(e.classList.remove(R.TRANSITION),e.removeEventListener("transitionend",n))};e.classList.add(R.TRANSITION),e.addEventListener("transitionend",n)}requestMaximize(){const e=this.state;e!=null&&this.options.resizeMode===P.RESIZE&&(e.splitMode=r.MAXIMIZE,this.startTransition(),this.dispatch(this.createEvent("maximizeChange")))}exitMaximize(){const e=this.state;e!=null&&this.options.resizeMode===P.RESIZE&&(e.splitMode=r.NONE,this.startTransition(),this.dispatch(this.createEvent("maximizeChange")))}toggleMaximize(){const e=this.state;e!=null&&this.options.resizeMode===P.RESIZE&&(e.splitMode===r.MAXIMIZE?this.exitMaximize():this.requestMaximize())}pin(){const e=this.state;e!=null&&(e.pinned=!0)}unpin(){const e=this.state;e!=null&&(e.pinned=!1)}togglePin(){const e=this.state;e!=null&&(e.pinned?this.unpin():this.pin())}useHandle(e,n){this.handles[e]=n}async callHandle(e){const n=this.handles[e];if(typeof n=="function")return await n()}confirm(){return this.callHandle("confirm").then(e=>{this.dispatch(this.createEvent("confirm",e)),this.close(!0)})}cancel(e=!0){return this.callHandle("cancel").then(n=>{const o=this.close(e);console.log(o),o&&this.dispatch(this.createEvent("cancel",n))})}};a(_,"seed",1e3);let V=_;const de=1e3,b={},l={appContext:null,isMounted:!1,zIndex:1e3,stack:new Map,ids:s.ref([]),topWindow:null,previewState:s.reactive({mode:r.NONE,width:0,height:0})};function ye(i){var t;b.zIndex=(t=i==null?void 0:i.zIndex,typeof t!="number"?de:Number.isFinite(t)?Math.floor(t):de),b.draggaleHeight=(i==null?void 0:i.draggaleHeight)??32,b.size=(i==null?void 0:i.size)??{},l.zIndex=b.zIndex}function le(i,t){var o;const e=i.state,n=((o=i.component)==null?void 0:o.useCssClass())??{};switch(t){case M.CLOSE:return s.createVNode("button",{onClick:function(){i.cancel()},type:"button",innerHTML:K,class:n.closeMenu,title:"关闭"},null);case M.PIN:case M.UNPIN:const c=e.pinned?"取消固定":"固定",u=e.pinned?n.pinMenu:n.menu;return s.createVNode("button",{onClick:function(){i.togglePin()},type:"button",innerHTML:Q,class:u,title:c},null);case M.MAXIMIZE:case M.RESTORE:const E=e.splitMode==r.MAXIMIZE?$:J,m=e.splitMode==r.MAXIMIZE?"还原":"最大化";return s.createVNode("button",{onClick:function(T){T.preventDefault(),i.toggleMaximize()},type:"button",innerHTML:E,class:n.menu,title:m},null)}return null}const Ne="Ycke6mYQ",Pe="esgrGyhH",We="UkryRM5g",Ce="U5LZXLJZ",_e="_2rffDKab",He="vcVMeNrL",Se="koc15mYi",Be="_4VxfFKcG",De={[r.MAXIMIZE]:Pe,[r.LEFT]:We,[r.RIGHT]:Ce,[r.TOP_LEFT]:_e,[r.TOP_RIGHT]:He,[r.BOTTOM_LEFT]:Se,[r.BOTTOM_RIGHT]:Be},Z=(r.BOTTOM_LEFT,r.LEFT,r.BOTTOM_RIGHT,r.RIGHT,r.LEFT,r.TOP_LEFT,r.RIGHT,r.TOP_RIGHT,r.MAXIMIZE,r.TOP_LEFT,r.LEFT,r.TOP_RIGHT,r.RIGHT,r.LEFT,r.BOTTOM_LEFT,r.RIGHT,r.BOTTOM_RIGHT,r.NONE,r.TOP_RIGHT,r.TOP_LEFT,r.TOP_LEFT,r.TOP_RIGHT,r.BOTTOM_RIGHT,r.BOTTOM_LEFT,r.BOTTOM_LEFT,r.BOTTOM_RIGHT,r.LEFT,r.TOP_LEFT,r.TOP_RIGHT,r.TOP_RIGHT,r.TOP_LEFT,r.BOTTOM_LEFT,r.BOTTOM_RIGHT,r.BOTTOM_RIGHT,r.BOTTOM_LEFT,r.RIGHT,s.defineComponent({name:"WindowManager",setup(){const i=l.ids,t=l.previewState;function e(c){c.key,c.ctrlKey}l.isMounted=!0,window.addEventListener("keydown",e,!0),s.onBeforeUnmount(()=>{ie(),window.removeEventListener("keydown",e,!0)});const n=s.computed(()=>{const c=[Ne],u=De[t.mode];return u!=null&&c.push(u),c});function o(){let c=null;if(t.mode!=r.NONE){const u={zIndex:function(){const E=l.topWindow;return E?E.state.zIndex:1}()+1,width:t.width?t.width-20+"px":void 0};c=s.createVNode("div",{class:n.value,style:u},null)}return s.createVNode(s.Teleport,{to:"body"},{default:()=>{return[s.createVNode(s.Transition,{name:"fade"},(u=c,typeof u=="function"||Object.prototype.toString.call(u)==="[object Object]"&&!s.isVNode(u)?c:{default:()=>[c]}))];var u}})}return function(){return[...i.value.map(c=>{const u=function(m){return l.stack.get(m)}(c);if(u==null)return null;const E=te(u.type);return s.h(E,{abstractWindow:u,key:u.wid})}),o()]}}}));function j(i){const t=function(n){if(n.length==1){const o=n[0];return o==null?null:typeof o=="object"?{...o}:null}if(n.length==2){const[o,c]=n;if(typeof o=="string"&&c!=null)return{title:o,body:c}}if(n.length==3){const[o,c,u]=n;if(typeof o=="string"&&c!=null)return{...u,title:o,body:c}}return null}(i)??{},e=typeof t.size=="string"?Reflect.get(b.size,t.size):null;return e!=null&&(t.width=e.width,t.height=e.height,t.top=e.top,t.left=e.left),t}function Y(i){const t=ze(i);return t.ready().then(()=>{i.displayAfterCreate!==!1&&t.show()}),t}const Ae=Object.freeze({renderMenu:le});function ue(i,t){i.component(S.name,S),i.component(C.name,C),i.component(Z.name,Z),ye(t),window.addEventListener("keydown",ne,!0),function(e){l.appContext=e._context}(i)}const he="0.1.1",pe={install:ue,version:he};h.AbstractWindow=V,h.BlankWindow=C,h.RENDER_STATES=W,h.RESIZE_MODE=P,h.Render=Ae,h.SPLIT_MODES=r,h.SimpleWindow=S,h.WindowDragContext=ce,h.WindowManager=Z,h.cleanup=ae,h.default=pe,h.install=ue,h.useBlankWindow=function(...i){const t=j(i)??{};return t.type=ee.BLANK_WINDOW,Y(t)},h.useIcons=function(){return{IconClose:K,IconMax:J,IconPin:Q,IconWindow:q,IconRestore:$}},h.useSimpleWindow=function(...i){const t=j(i)??{};return t.type=ee.SIMPLE_WINDOW,Y(t)},h.useWindow=function(...i){return Y(j(i)??{})},h.useWindowApi=function(){return s.inject(z)},h.useWindowManager=function(){return{closeTopWindow:re,getTopWindow:be,getTopZIndex:se,getWindowCount:Le,getZIndex:oe,setFocusedWindow:X,cleanup:ae}},h.useWindowSize=function(i,t){b.size==null&&(b.size={}),b.size[i]=t},h.version=he,h.xWindow=pe,Object.defineProperties(h,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
