var tn=Object.defineProperty;var ln=(a,s,n)=>s in a?tn(a,s,{enumerable:!0,configurable:!0,writable:!0,value:n}):a[s]=n;var r=(a,s,n)=>(ln(a,typeof s!="symbol"?s+"":s,n),n);import{d as I,c as J,h as V,s as en,r as Q,a as Y,p as on,b as p,T as cn,i as ms,n as js,e as vs,f as pn,o as Is,F as D,g as W,j as M,k as b,t as z,l as e,u as Cs,m as y,q as E,w as A,v as K,x as rs,y as rn,z as hs,A as fs,B as gs,C as xs,D as un,E as dn,G as hn,H as jn,I as gn}from"./vendor-BaZTgjQt.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))t(l);new MutationObserver(l=>{for(const o of l)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&t(c)}).observe(document,{childList:!0,subtree:!0});function n(l){const o={};return l.integrity&&(o.integrity=l.integrity),l.referrerPolicy&&(o.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?o.credentials="include":l.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function t(l){if(l.ep)return;l.ep=!0;const o=n(l);fetch(l.href,o)}})();const mn="0.2.7",Os=Symbol(),L=Object.freeze({WINDOW:"x-window",SIMPLE_WINDOW:"x-simple-window",TRANSITION:"x-window-is-transition",MENU:"x-window-is-menu",FOCUSED:"x-window-is-focused",MAXIMIZE:"x-window-is-maximize",HEADER:"x-window-header",BODY:"x-window-body"}),w=Object.freeze({NONE:0,TOP:1,BOTTOM:2,LEFT:4,RIGHT:8}),H=Object.freeze({TOP:w.TOP,BOTTOM:w.BOTTOM,LEFT:w.LEFT,RIGHT:w.RIGHT,TOP_LEFT:w.TOP|w.LEFT,TOP_RIGHT:w.TOP|w.RIGHT,BOTTOM_LEFT:w.BOTTOM|w.LEFT,BOTTOM_RIGHT:w.BOTTOM|w.RIGHT}),d=Object.freeze({NONE:w.NONE,MAXIMIZE:w.TOP,LEFT:w.LEFT,RIGHT:w.RIGHT,TOP_LEFT:w.TOP|w.LEFT,TOP_RIGHT:w.TOP|w.RIGHT,BOTTOM_LEFT:w.BOTTOM|w.LEFT,BOTTOM_RIGHT:w.BOTTOM|w.RIGHT}),S=Object.freeze({DISABLED:0,RESIZE:1,RESIZE_ONLY:2}),U=Object.freeze({INIT:0,MOUNTED:1,UNMOUNTED:2}),ws=Object.freeze({SIMPLE_WINDOW:"SimpleWindow",BLANK_WINDOW:"BlankWindow"}),P=Object.freeze({CLOSE:0,MAXIMIZE:1,RESTORE:2,PIN:3,UNPIN:4});class bs{constructor(s,n,t){r(this,"type");r(this,"stopped",!1);r(this,"defaultPrevented",!1);r(this,"instance");r(this,"detail");this.type=s,this.instance=n,this.detail=t}stop(){this.stopped=!0}preventDefault(){this.defaultPrevented=!0}}class os{constructor(){r(this,"ALL_EVENTS",new Map)}static NOOP(){}on(s,n){const t=this.ALL_EVENTS.get(s);return t==null?(this.ALL_EVENTS.set(s,[n]),this):t.includes(n)?this:(t.push(n),this)}once(s,n){const t=l=>{n(l),this.off(s,t,!0)};return this.on(s,t),this}off(s,n,t=!1){const l=this.ALL_EVENTS.get(s);if(l==null)return this;const o=l.indexOf(n);return o<0?this:(t?l.splice(o,1,os.NOOP):l.splice(o,1),this)}dispatch(s){const n=this.ALL_EVENTS.get(s.type);if(n==null)return s;for(const l of n)if(typeof l=="function"&&l(s),s.stopped)break;const t=n.filter(l=>l!=os.NOOP);return this.ALL_EVENTS.set(s.type,t),s}cleanup(){this.ALL_EVENTS.clear()}}function $(a,s,n){return s!=null&&Number.isFinite(s)&&a<s?s:a}function Es(a){return a==null||typeof a!="string"?!0:a.length==0}function fn(a){return a==null||typeof a!="string"?!1:a.length!=0}function wn(a){a.stopPropagation()}const bn={top:"offsetTop",left:"offsetLeft",width:"offsetWidth",height:"offsetHeight"};class yn{constructor(s){r(this,"init",!1);r(this,"defaultPrevented",!1);r(this,"originalEvent");r(this,"target");r(this,"direction");this.originalEvent=s,this.target=s.target,this.direction=Reflect.get(this.target,us.PROP)}createEvent(s,n){return new bs(s,n,this)}}class us{constructor(s){r(this,"context");r(this,"window");r(this,"onResizing");r(this,"onResizeend");this.window=s}resizestart(s){s.stopPropagation(),s.preventDefault();const n=new yn(s);this.context=n,this.onResizing=this.resizing.bind(this),this.onResizeend=this.resizeend.bind(this),window.addEventListener("pointermove",this.onResizing),window.addEventListener("pointerup",this.onResizeend)}resizing(s){if(this.context==null)return;s.stopPropagation(),s.preventDefault();const n=this.context;if(!n.init){if(this.window.dispatch(this.context.createEvent("resizeStart",this.window)).defaultPrevented)return this.cleanup();n.target.setPointerCapture(s.pointerId),n.init=!0}const t=this.calcWindowState(s),l=this.window.getElement();for(const c in t){const j=Math.round(t[c]);Reflect.set(l.style,c,j+"px")}n.originalEvent=s;const o=this.context.createEvent("resizing",this.window);this.window.dispatch(o)}resizeend(s){if(this.context==null)return;s.stopPropagation(),s.preventDefault();const n=this.context;if(n.init){const t=n.createEvent("resizeEnd",this.window);this.window.dispatch(t),this.patchWindowState(this.calcWindowState(s)),n.target.releasePointerCapture(s.pointerId)}this.cleanup()}cleanup(){this.onResizing&&window.removeEventListener("pointermove",this.onResizing),this.onResizeend&&window.removeEventListener("pointerup",this.onResizeend),this.onResizing=void 0,this.onResizeend=void 0,this.context=void 0}calcWindowState(s){const n=this.context,t=this.window.options,l=typeof t.minWidth=="number"&&t.minWidth>=0?t.minWidth:360,o=typeof t.minHeight=="number"&&t.minHeight>=0?t.minHeight:32,c=this.window.getElement().getBoundingClientRect(),j={};return n.direction&w.TOP&&(j.height=$(c.bottom-$(s.clientY,0),o),j.top=c.bottom-j.height),n.direction&w.BOTTOM&&(j.height=$(s.clientY-c.top,o)),n.direction&w.LEFT&&(j.width=$(c.right-$(s.clientX,0),l),j.left=c.right-j.width),n.direction&w.RIGHT&&(j.width=$(s.clientX-c.left,l)),j}patchWindowState(s){const n=this.window.state;for(const t in s){const l=Math.round(s[t]),o=bn[t];o!=null&&Reflect.set(n,o,l)}}}r(us,"PROP","__xwindow_resize_prop__");const _n="_1T2rhwiL",vn="yi9w1sZD",xn="Ja2o9U31",En="_1eMSsKoB",Tn="_3czvPpS2",Wn="GiVk7T8N",Mn="VuG4WNig x-window-is-menu",kn="yBPezU8e",In="xbuRK23n",Cn="_9t1NJBZM",On="shyxrRzw",Sn="nkEGqTFw",zn="pk12TusX",Rn="noixF94i",Pn="_5duVmvKs x-window-is-menu",Ln="ifXDegN1 VuG4WNig x-window-is-menu",Nn="X5A6roxN VuG4WNig x-window-is-menu",Bn="PPmfTMRL",An="v8UGXgKi PPmfTMRL",Dn="_74VJ9GNt PPmfTMRL",qn="gg9Mcwey PPmfTMRL",Hn="Tw7sCaLt PPmfTMRL",Fn="CPuApFyD PPmfTMRL",Vn="VBRi4FWg PPmfTMRL",$n="gCRpuZdB PPmfTMRL",Xn="iRYpNoUT PPmfTMRL",Un="xTcKGSVA",Gn="Mh7BVc1o",x={window:_n,dragging:vn,resizing:xn,maximize:En,focused:Tn,header:Wn,menu:Mn,logo:kn,main:In,init:Cn,title:On,menus:Sn,body:zn,footer:Rn,textMenu:Pn,closeMenu:Ln,pinMenu:Nn,resizeBar:Bn,resizeTop:An,resizeBottom:Dn,resizeRight:qn,resizeLeft:Hn,resizeTopLeft:Fn,resizeBottomLeft:Vn,resizeTopRight:$n,resizeBottomRight:Xn,mask:Un,simpleWindow:Gn},Ss=I({name:"WindowBody",props:{wid:String,body:{type:[Object,Function,String,Number],default:null},abstractWindow:{type:Object,required:!0}},setup(a){return function(){const s=typeof a.body=="function"?a.body(a.abstractWindow):a.body;return s==null&&console.warn("[xWindow] 请指定窗体内容:",a.abstractWindow.options.title),s}}}),Zn=Math.floor(Number.MAX_SAFE_INTEGER/10)-1e4;function Yn(){return{visible:!1,offsetWidth:0,offsetHeight:0,offsetTop:0,offsetLeft:0,focused:!1,pinned:!1,zIndex:0,splitMode:d.NONE}}const Jn=[[x.resizeTop,H.TOP],[x.resizeBottom,H.BOTTOM],[x.resizeLeft,H.LEFT],[x.resizeRight,H.RIGHT],[x.resizeTopLeft,H.TOP_LEFT],[x.resizeTopRight,H.TOP_RIGHT],[x.resizeBottomLeft,H.BOTTOM_LEFT],[x.resizeBottomRight,H.BOTTOM_RIGHT]];function Kn(a,s,n,t){return J(()=>{const l=a.options;if(s.value==U.INIT)return{width:l.width,height:l.height,left:l.left,top:l.top};const o=l.mask?null:t.value;return{top:n.offsetTop+"px",left:n.offsetLeft+"px",width:n.offsetWidth+"px",height:s.value==U.INIT?void 0:n.offsetHeight+"px",zIndex:o}})}function Qn(a,s){return a==S.DISABLED?null:Jn.map(n=>V("div",{["."+us.PROP]:n[1],className:n[0],onPointerdown:s}))}function sa(a){return typeof a=="function"||Object.prototype.toString.call(a)==="[object Object]"&&!ms(a)}const cs=I({name:"BlankWindow",props:{abstractWindow:{type:Object,required:!0}},setup(a,{slots:s}){const n=en(),t=Q(Yn()),l=Y(U.INIT),o=J(()=>{const u=a.abstractWindow.options;return typeof u.zIndex=="number"&&u.zIndex>0}),c=J(()=>{const u=a.abstractWindow.options;return o.value?u.zIndex:(t.pinned?Zn:0)+t.zIndex}),j=Kn(a.abstractWindow,l,t,c),_=J(()=>{const u=[L.WINDOW,x.window],f=a.abstractWindow;return f.type===ws.SIMPLE_WINDOW&&u.push(L.SIMPLE_WINDOW),l.value==U.INIT&&u.push(x.init),t.splitMode==d.MAXIMIZE&&u.push(x.maximize,L.MAXIMIZE),t.focused&&u.push(x.focused,L.FOCUSED),fn(f.options.className)&&u.push(f.options.className),u}),F=J(()=>{const u=[],k=a.abstractWindow.options;return k.pinnable&&k.mask!==!0&&o.value!==!0&&u.push(t.pinned?P.PIN:P.UNPIN),k.resizeMode==S.RESIZE&&u.push(t.splitMode==d.MAXIMIZE?P.RESTORE:P.MAXIMIZE),k.closeable&&u.push(P.CLOSE),u}),N={getElement:T,getRenderState:i,useCssClass:h,useMenus:O};function T(){return n.value}function i(){return l.value}function h(){return x}async function v(u){u==null||u.preventDefault(),a.abstractWindow.toggleMaximize()}function g(){JSON.parse(JSON.stringify(t))}function O(){return F}function C(u){const f=Array.from(u.querySelectorAll("[autofocus]"));for(const k of f)if(k instanceof HTMLElement&&k.autofocus)return k.focus()}async function R(u){await js();const f=a.abstractWindow,k=f.options,ls=u.el,q=ls.getBoundingClientRect();if(l.value==U.INIT){let B=Math.round(q.left),es=Math.round(q.top);Es(k.left)&&(B=Math.floor((window.innerWidth-q.width)/2)),Es(k.top)&&(es=Math.floor((window.innerHeight-q.height)/2)),t.offsetWidth=q.width,t.offsetHeight=q.height,t.offsetLeft=B,t.offsetTop=es,k.maximize&&v(),l.value=U.MOUNTED,g(),js(()=>{const an=f.createEvent("show");f.dispatch(an),C(ls)})}f.focus()}function ss(u){const f=a.abstractWindow;f.focus(),!(!f.allowDrag||f.isMaximize)&&f.dragstart(u)}function ns(u){const f=T();if(f==null)return;const k=f.getBoundingClientRect();u.clientY-k.top>a.abstractWindow.allowDragArea||v(u)}function as(){const u=a.abstractWindow;u.component=N,u.state=t,ea(u.id,u);const f=u.createEvent("created");u.dispatch(f)}function ts(){const u=a.abstractWindow;return p(Ss,{body:u.body,abstractWindow:a.abstractWindow,key:u.wid},null)}return on(Os,a.abstractWindow),as(),function(){const u=a.abstractWindow,f=u.options;if(t.visible!==!0)return null;const k=p("div",{class:x.main,onDblclick:ns},[typeof s.default=="function"?s.default(N):ts()]),ls={ref:n,id:u.wid,onVnodeMounted:R,onPointerdown:ss,class:_.value,style:j.value},q=Qn(f.resizeMode,u.resizestart);let B=V("div",ls,[k,q]);if(f.mask===!0){const es={zIndex:c.value};B=p("div",{class:x.mask,style:es},[B])}return f.teleport===!1?B:p(cn,{to:f.teleport},sa(B)?B:{default:()=>[B]})}}}),zs='<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M590.265 511.987l305.521-305.468c21.617-21.589 21.617-56.636.027-78.252-21.616-21.617-56.663-21.617-78.279 0L512.012 433.735 206.544 128.213c-21.617-21.617-56.635-21.617-78.252 0-21.616 21.589-21.616 56.635-.027 78.252L433.76 511.987 128.211 817.482c-21.617 21.59-21.617 56.635 0 78.251 10.808 10.81 24.967 16.213 39.125 16.213 14.159 0 28.318-5.403 39.126-16.213l305.522-305.468L817.48 895.788C828.289 906.597 842.447 912 856.606 912s28.317-5.403 39.125-16.212c21.618-21.59 21.618-56.636.028-78.252L590.265 511.987z"/></svg>',Rs='<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5228" width="64" height="64"><path d="M97.74775349 97.74775349h828.50449302v828.50449302H97.74775349V97.74775349z m103.56306133 103.56306133v621.37837036h621.37837036V201.31081482H201.31081482z" fill="currentColor"></path></svg>',Ps='<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M38.794 124.791v778.495h946.412V124.791H38.794zm896.678 728.033H89.292v-460.9h846.18v460.9z"/></svg>',Ls='<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M738.793 681.382v-48.331l88.242-88.243a298.676 298.676 0 00156.712-83.482 38.836 38.836 0 000-54.923l-366.15-366.15a38.836 38.836 0 00-54.923 0 298.52 298.52 0 00-83.519 156.749l-88.169 88.169h-48.332a411.145 411.145 0 00-292.59 121.232c-15.16 15.159-15.16 39.764 0 54.923L278.906 690.17 86.642 882.436a38.836 38.836 0 1054.922 54.922l192.23-192.229 228.844 228.845a38.836 38.836 0 0054.922 0 411.042 411.042 0 00121.233-292.592zM134.02 435.44a333.473 333.473 0 01208.56-72.571l64.406.037a38.836 38.836 0 0027.461-11.351L544.292 241.71a38.68 38.68 0 0011.351-27.462 180.096 180.096 0 0136.798-89.01L898.8 431.593a180.925 180.925 0 01-89.12 36.835 38.836 38.836 0 00-27.462 11.35L672.373 589.626c-7.287 7.286-11.387 17.173-11.35 27.461l.036 64.406a333.318 333.318 0 01-72.608 208.596L134.021 435.44z"/></svg>',Ns='<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M845.40952426 212.52063539H65.21904746v702.17142826h780.1904768V212.52063539z m-702.17142933 624.1523808V290.53968285h624.1523808v546.13333334H143.23809493z" fill="currentColor"></path><path d="M981.53650809 76.3936505H201.34603129v78.01904746h702.17142933v624.15238187h78.01904747V76.3936505z" fill="currentColor"></path></svg>';function na(){return{IconClose:zs,IconMax:Rs,IconPin:Ls,IconWindow:Ps,IconRestore:Ns}}function aa(a){const s=a.options.icon;return typeof s=="string"?p("i",{class:[x.logo,"icon",s]},null):ms(s)?s:typeof s=="function"?s(a):p("i",{class:x.logo,innerHTML:Ps},null)}const Bs=I({name:"SimpleWindow",props:{abstractWindow:{type:Object,required:!0}},setup(a){const s=a.abstractWindow;function n(l,o){o.stopPropagation(),typeof l.handler=="function"&&l.handler(s)}function t(l){return p("button",{type:"button",class:x.textMenu,onClick:n.bind(null,l)},[l.label])}return function(){return p(cs,{abstractWindow:s},function(l){const o=l.useMenus(),c=s.options.menus??[];return p("div",{class:x.simpleWindow},[p("div",{class:[x.header,L.HEADER]},[aa(s),p("div",{class:x.title},[s.options.title??"新窗口"]),p("div",{class:x.menus,onMousedown:wn},[c.map(j=>t(j)),o.value.map(j=>Xs(s,j))])]),p("div",{class:[x.body,L.BODY]},[p(Ss,{body:s.body,abstractWindow:a.abstractWindow,key:s.wid},null)])])})}}}),As=Object.freeze({SIMPLE_WINDOW:Bs.name,BLANK_WINDOW:cs.name});function Ds(a){return a==cs.name?cs:Bs}function qs(a){if(a.key=="Escape")return $s({pressEsc:!0,forced:!1})}function ta(){m.isMounted=!0}function Hs(){m.isMounted=!1,m.topWindow=null,m.ids.value=[],m.stack.clear()}function Fs(){return m.zIndex}function Vs(){return m.zIndex+=1}function la(){return m.topWindow}function ea(a,s){m.stack.set(a,s)}function oa(a){if(!m.stack.has(a)||(m.stack.delete(a),!m.isMounted))return;const s=m.ids.value.indexOf(a);if(s<0)return;m.ids.value.splice(s,1)}function $s(a){if(m.stack.size==0||m.topWindow==null)return;const s=m.topWindow;(a==null?void 0:a.pressEsc)===!0&&s.options.closeOnPressEsc!==!0||m.topWindow.cancel(a==null?void 0:a.forced)}function ca(a){const s=document.createDocumentFragment(),n=Ds(a.type),t=V(n,{abstractWindow:a});t.appContext=m.appContext,vs(t,s),document.body.appendChild(s),a.on("beforeDestroy",()=>{vs(null,s)})}function ia(a){const s=a.type===ws.SIMPLE_WINDOW?ps.create(a):is.create(a);return m.isMounted?(m.ids.value.push(s.id),m.stack.set(s.id,s),s):(ca(s),s)}function pa(a){return m.stack.get(a)}function ra(){return m.ids}function ys(a){if(m.topWindow=a,a!=null){for(const s of m.stack.values()){const n=s.state;n!=null&&(n.focused=s===a)}a.state!=null&&a.state.zIndex<Fs()&&(a.state.zIndex=Vs())}}function ua(a){const s=m.stack.get(a);ys(s)}function da(){const a=ha();ys(a)}function ha(){if(m.stack.size==0)return;let a;for(const s of m.stack.values())if(!(s.state==null||s.state.visible!==!0)){if(a==null){a=s;continue}a.state.zIndex<s.state.zIndex&&(a=s)}return a}function ja(){return m.stack.size}function ga(){window.addEventListener("keydown",qs,!0)}function ma(a){m.appContext=a._context}function fa(){m.appContext=null,Hs(),window.removeEventListener("keydown",qs,!0)}function wa(){return{closeTopWindow:$s,getTopWindow:la,getTopZIndex:Vs,getWindowCount:ja,getZIndex:Fs,setFocusedWindow:ys,cleanup:fa}}class ba{constructor(s,n){r(this,"moved",!1);r(this,"originalEvent");r(this,"target");r(this,"deltaX");r(this,"deltaY");r(this,"initialX");r(this,"initialY");r(this,"left",0);r(this,"top",0);r(this,"prevClientX");r(this,"prevClientY");const t=s.getBoundingClientRect();this.originalEvent=n,this.target=s,this.deltaX=Math.round(t.left-n.clientX),this.deltaY=Math.round(t.top-n.clientY),this.initialX=n.clientX,this.initialY=n.clientY,this.prevClientX=n.clientX,this.prevClientY=n.clientY}preventDragEvent(s){return!(this.moved||Math.abs(s.clientX-this.initialX)>4||Math.abs(s.clientY-this.initialY)>4)}createEvent(s,n){return new bs(s,n,this)}}class ya{constructor(s){r(this,"window");r(this,"context");r(this,"onDragging");r(this,"onDragend");this.window=s}static isConflict(s,n){const t=s.getBoundingClientRect(),l=n.getBoundingClientRect();return!(t.top>l.bottom||t.right<l.left||t.bottom<l.top||t.left>l.right)}static findElementsFromPoint(s,n,t,l){return typeof document.elementsFromPoint!="function"?[]:document.elementsFromPoint(s,n).filter(c=>l!=null&&!l.contains(c)?!1:typeof t=="string"?c.matches(t):!1)}dragstart(s){if(s.button!==0)return;const n=s.target;if(n instanceof Element&&n.closest("."+L.MENU))return;const t=this.window.getElement();if(t==null)return;const l=t.getBoundingClientRect();s.clientY-l.top>this.window.allowDragArea||(s.preventDefault(),s.stopPropagation(),this.context=new ba(t,s),this.context.left=this.window.state.offsetLeft,this.context.top=this.window.state.offsetTop,this.onDragging=this.dragging.bind(this),this.onDragend=this.dragend.bind(this),window.addEventListener("pointermove",this.onDragging),window.addEventListener("pointerup",this.onDragend))}dragging(s){var o;if(this.context==null)return;const n=this.context;if(!n.moved){if(this.window.dispatch(this.context.createEvent("dragStart",this.window)).defaultPrevented)return this.cleanup();const j=(o=this.window.component)==null?void 0:o.useCssClass();j!=null&&j.dragging&&n.target.classList.add(j.dragging),n.target.setPointerCapture(s.pointerId),n.moved=!0}if(n.preventDragEvent(s))return;s.preventDefault(),s.stopPropagation(),n.originalEvent=s,n.left=s.clientX+n.deltaX,n.top=s.clientY+n.deltaY,n.prevClientX=s.clientX,n.prevClientY=s.clientY;const t=n.target;t.style.left=n.left+"px",t.style.top=n.top+"px";const l=this.context.createEvent("dragging",this.window);this.window.dispatch(l)}dragend(s){if(this.context==null||!this.context.moved)return this.cleanup();s.preventDefault(),s.stopPropagation();const n=this.context;n.originalEvent=s,n.target.releasePointerCapture(s.pointerId);const t=n.createEvent("dragEnd",this.window);this.window.dispatch(t),this.window.state.offsetTop=n.top,this.window.state.offsetLeft=n.left,this.cleanup()}cleanup(){var n,t;const s=(n=this.window.component)==null?void 0:n.useCssClass();s!=null&&s.dragging&&((t=this.context)==null||t.target.classList.remove(s.dragging)),this.onDragging&&window.removeEventListener("pointermove",this.onDragging),this.onDragend&&window.removeEventListener("pointerup",this.onDragend),this.onDragging=void 0,this.onDragend=void 0,this.context=void 0}}const Z=class Z extends os{constructor(n){super();r(this,"CREATE_RESOLVE");r(this,"CREATE_REJECT");r(this,"id");r(this,"type");r(this,"options");r(this,"body");r(this,"state");r(this,"created",!1);r(this,"destroyed",!1);r(this,"component");r(this,"draggable");r(this,"resizable");r(this,"handles",{});r(this,"dragstart");r(this,"resizestart");const{body:t,type:l,...o}=n;this.type=l??ws.SIMPLE_WINDOW,this.options=Q(this.createOptions(o)),this.body=t,Reflect.defineProperty(this,"id",{enumerable:!0,configurable:!1,writable:!1,value:Z.seed++}),this.initDraggable(),this.initResizable(),this.initHooks()}static create(n){return n instanceof Z?n:new Z(n)}get wid(){return"window--"+this.id}get isReady(){return this.created===!0}get allowDrag(){const n=this.options.draggable;return n===!1?!1:typeof n=="number"?n>0:!0}get allowDragArea(){const n=this.options.draggable;return typeof n=="number"&&n>0?n:G.draggaleHeight}get isMaximize(){var n;return((n=this.state)==null?void 0:n.splitMode)===d.MAXIMIZE}createOptions(n){return{...n,title:n.title??"未命名的窗口",icon:n.icon,className:n.className,width:n.width??"640px",minWidth:n.minWidth??360,maxWidth:n.maxWidth,height:n.height,minHeight:n.minHeight??32,maxHeight:n.maxHeight,top:n.top,left:n.left,zIndex:n.zIndex,maximize:n.maximize===!0,teleport:n.teleport??"body",draggable:n.draggable==null?!0:n.draggable,resizeMode:n.resizeMode??S.RESIZE,closeable:n.closeable!==!1,mask:n.mask===!0,pinnable:n.pinnable!==!1,displayAfterCreate:n.displayAfterCreate!==!1,destroyAfterClose:n.destroyAfterClose!==!1,closeOnPressEsc:n.closeOnPressEsc!==!1}}createEvent(n,t){return new bs(n,this,t)}initDraggable(){this.draggable=new ya(this),this.dragstart=this.draggable.dragstart.bind(this.draggable)}initResizable(){this.resizable=new us(this),this.resizestart=this.resizable.resizestart.bind(this.resizable)}initHooks(){this.once("created",()=>{this.created=!0,typeof this.CREATE_RESOLVE=="function"&&this.CREATE_RESOLVE(),delete this.CREATE_REJECT,delete this.CREATE_RESOLVE})}ready(){return this.created===!0?Promise.resolve():new Promise((n,t)=>{this.CREATE_RESOLVE=n,this.CREATE_REJECT=t})}show(){this.state==null||this.dispatch(this.createEvent("beforeShow")).defaultPrevented||(this.state.visible=!0)}close(n=!1){if(this.state==null||this.options.closeable===!1&&n!==!0)return!1;const t=this.dispatch(this.createEvent("beforeClose"));return n!==!0&&t.defaultPrevented?!1:(this.state.visible=!1,this.dispatch(this.createEvent("close")),this.state.focused&&setTimeout(da),!this.destroyed&&this.options.destroyAfterClose!==!1&&this.destroy(),!0)}cleanup(){super.cleanup(),this.dragstart=void 0,this.resizestart=void 0,this.component=void 0,this.state=void 0,this.handles={}}destroy(){var n;this.destroyed=!0,((n=this.state)==null?void 0:n.visible)===!0&&this.close(),this.dispatch(this.createEvent("beforeDestroy")),oa(this.id),setTimeout(()=>this.cleanup(),100)}getElement(){var n;return(n=this.component)==null?void 0:n.getElement()}useMenus(){return this.component.useMenus()}focus(){this.state==null||this.state.focused||ua(this.id)}startTransition(){const n=document.documentElement,t=function(l){l.target.matches("."+L.WINDOW)&&(n.classList.remove(L.TRANSITION),n.removeEventListener("transitionend",t))};n.classList.add(L.TRANSITION),n.addEventListener("transitionend",t)}requestMaximize(){const n=this.state;n==null||this.options.resizeMode!==S.RESIZE||(n.splitMode=d.MAXIMIZE,this.startTransition(),this.dispatch(this.createEvent("maximizeChange")))}exitMaximize(){const n=this.state;n==null||this.options.resizeMode!==S.RESIZE||(n.splitMode=d.NONE,this.startTransition(),this.dispatch(this.createEvent("maximizeChange")))}toggleMaximize(){const n=this.state;n==null||this.options.resizeMode!==S.RESIZE||(n.splitMode===d.MAXIMIZE?this.exitMaximize():this.requestMaximize())}pin(){const n=this.state;n!=null&&(n.pinned=!0)}unpin(){const n=this.state;n!=null&&(n.pinned=!1)}togglePin(){const n=this.state;n!=null&&(n.pinned?this.unpin():this.pin())}useHandle(n,t){this.handles[n]=t}async callHandle(n){const t=this.handles[n];if(typeof t=="function")return await t()}dispatchConfirm(){return this.callHandle("confirm").then(n=>this.confirm(n))}confirm(n){this.dispatch(this.createEvent("confirm",n)),this.close(!0)}dispatchCancel(){return this.callHandle("cancel").then(n=>this.cancel(!0,n))}cancel(n=!0,t){this.close(n)&&this.dispatch(this.createEvent("cancel",t))}promisify(){return new Promise((n,t)=>{this.once("confirm",l=>n(l.detail)),this.once("cancel",l=>t(l.detail))})}};r(Z,"seed",1e3);let is=Z;class ps extends is{static create(s){return s instanceof ps?s:new ps(s)}constructor(s){super(s)}updateMenus(s){this.options.menus=s}}const Ts=1e3,G={},m=xa();function _a(a){return typeof a!="number"||!Number.isFinite(a)?Ts:Math.floor(a)}function va(a){G.zIndex=_a(a==null?void 0:a.zIndex),G.draggaleHeight=(a==null?void 0:a.draggaleHeight)??32,G.size=(a==null?void 0:a.size)??{},m.zIndex=G.zIndex}function ds(){return pn(Os)}function xa(){return{appContext:null,isMounted:!1,zIndex:1e3,stack:new Map,ids:Y([]),topWindow:null,previewState:Q({mode:d.NONE,width:0,height:0})}}function Xs(a,s){var j;const n=a.state,t=((j=a.component)==null?void 0:j.useCssClass())??{};function l(){a.cancel()}function o(){a.togglePin()}function c(_){_.preventDefault(),a.toggleMaximize()}switch(s){case P.CLOSE:return p("button",{onClick:l,type:"button",innerHTML:zs,class:t.closeMenu,title:"关闭"},null);case P.PIN:case P.UNPIN:const _=n.pinned?"取消固定":"固定",F=n.pinned?t.pinMenu:t.menu;return p("button",{onClick:o,type:"button",innerHTML:Ls,class:F,title:_},null);case P.MAXIMIZE:case P.RESTORE:const N=n.splitMode==d.MAXIMIZE?Ns:Rs,T=n.splitMode==d.MAXIMIZE?"还原":"最大化";return p("button",{onClick:c,type:"button",innerHTML:N,class:t.menu,title:T},null)}return null}const Ea={ArrowUp:{[d.BOTTOM_LEFT]:d.LEFT,[d.BOTTOM_RIGHT]:d.RIGHT,[d.LEFT]:d.TOP_LEFT,[d.RIGHT]:d.TOP_RIGHT,fallback:d.MAXIMIZE},ArrowDown:{[d.TOP_LEFT]:d.LEFT,[d.TOP_RIGHT]:d.RIGHT,[d.LEFT]:d.BOTTOM_LEFT,[d.RIGHT]:d.BOTTOM_RIGHT,fallback:d.NONE},ArrowLeft:{[d.TOP_RIGHT]:d.TOP_LEFT,[d.TOP_LEFT]:d.TOP_RIGHT,[d.BOTTOM_RIGHT]:d.BOTTOM_LEFT,[d.BOTTOM_LEFT]:d.BOTTOM_RIGHT,fallback:d.LEFT},ArrowRight:{[d.TOP_LEFT]:d.TOP_RIGHT,[d.TOP_RIGHT]:d.TOP_LEFT,[d.BOTTOM_LEFT]:d.BOTTOM_RIGHT,[d.BOTTOM_RIGHT]:d.BOTTOM_LEFT,fallback:d.RIGHT}},Ws=I({name:"WindowManager",setup(){const a=ra();function s(n){const t=n.key;n.ctrlKey&&t in Ea}return ta(),window.addEventListener("keydown",s,!0),Is(()=>{Hs(),window.removeEventListener("keydown",s,!0)}),function(){const n=a.value.map(t=>{const l=pa(t);if(l==null)return null;const o=Ds(l.type);return V(o,{abstractWindow:l,key:l.wid})});return p(D,null,[n])}}});function Ta(a){if(a.length==1){const s=a[0];return s==null?null:typeof s=="object"?{...s}:null}if(a.length==2){const[s,n]=a;if(typeof s=="string"&&n!=null)return{title:s,body:n}}if(a.length==3){const[s,n,t]=a;if(typeof s=="string"&&n!=null)return{...t,title:s,body:n}}return null}function Us(a){const s=Ta(a)??{},n=typeof s.size=="string"?Reflect.get(G.size,s.size):null;return n!=null&&(s.width=n.width,s.height=n.height,s.top=n.top,s.left=n.left),s}function X(...a){return Zs(a)}function Gs(...a){const s=Us(a)??{};return s.type=As.BLANK_WINDOW,Ys(s)}function Zs(...a){const s=Us(a)??{};return s.type=As.SIMPLE_WINDOW,Ys(s)}function Ys(a){const s=ia(a);return s.ready().then(()=>{a.displayAfterCreate!==!1&&s.show()}),s}const Js=Object.freeze({renderMenu:Xs});function Wa(a,s){a.component(Ws.name,Ws),va(s),ga(),ma(a)}const Ma=mn,ka={install:Wa,version:Ma},Ia=`<svg viewBox="0 0 1024 1024" version="1.1"
  xmlns="http://www.w3.org/2000/svg" p-id="4032" xmlns:xlink="http://www.w3.org/1999/xlink"
  width="64" height="64">
  <path d="M511.0625 34.90625C162.3125 34.90625 32 339.5 32 510.125s124.59375 479.0625 469.5 479.0625c0 0 86.25 1.875 86.25-74.71875s-38.34375-51.75-38.34375-107.34375 38.34375-80.4375 57.46875-80.4375 139.875 9.5625 208.875-17.25c67.03125-26.8125 176.25-109.21875 176.25-251.0625C990.125 333.78125 859.8125 34.90625 511.0625 34.90625zM219.78125 512c-46.03125 0-82.40625-36.375-82.40625-82.40625s36.375-82.40625 82.40625-82.40625 82.40625 36.375 82.40625 82.40625-36.375 82.40625-82.40625 82.40625z m155.25-205.03125c-46.03125 0-82.40625-36.375-82.40625-82.40625s36.375-82.40625 82.40625-82.40625 82.40625 36.375 82.40625 82.40625c1.875 44.0625-36.46875 82.40625-82.40625 82.40625z m268.21875 0c-46.03125 0-82.40625-36.375-82.40625-82.40625s36.375-82.40625 82.40625-82.40625c46.03125 0 82.40625 36.375 82.40625 82.40625 0 44.0625-36.375 82.40625-82.40625 82.40625zM800.375 512c-46.03125 0-82.40625-36.375-82.40625-82.40625s36.375-82.40625 82.40625-82.40625c46.03125 0 82.40625 36.375 82.40625 82.40625 1.875 46.03125-36.375 82.40625-82.40625 82.40625z" fill="currentColor"></path>
</svg>`,Ca=`<svg viewBox="0 0 1024 1024" version="1.1"
  xmlns="http://www.w3.org/2000/svg" p-id="4199" xmlns:xlink="http://www.w3.org/1999/xlink"
  width="64" height="64">
  <path
    d="M34.13333333 512c0 208.21333333 133.12 385.70666667 320.85333334 450.56 23.89333333 6.82666667 20.48-10.24 20.48-23.89333333v-81.92c-143.36 17.06666667-150.18666667-78.50666667-160.42666667-95.57333334-20.48-34.13333333-64.85333333-40.96-51.2-58.02666666 34.13333333-17.06666667 68.26666667 3.41333333 105.81333333 61.44 27.30666667 40.96 81.92 34.13333333 112.64 27.30666666 6.82666667-23.89333333 20.48-47.78666667 37.54666667-64.85333333-153.6-23.89333333-215.04-116.05333333-215.04-225.28 0-51.2 17.06666667-102.4 51.2-139.94666667-23.89333333-64.85333333 0-122.88 3.41333333-129.70666666 61.44-6.82666667 126.29333333 44.37333333 133.12 47.78666666 34.13333333-10.24 75.09333333-13.65333333 119.46666667-13.65333333 44.37333333 0 85.33333333 6.82666667 119.46666667 13.65333333 13.65333333-10.24 71.68-51.2 129.70666666-47.78666666 3.41333333 6.82666667 27.30666667 61.44 6.82666667 126.29333333 34.13333333 40.96 51.2 88.74666667 51.2 139.94666667 0 109.22666667-61.44 201.38666667-215.04 228.69333333 23.89333333 23.89333333 40.96 58.02666667 40.96 98.98666667v119.46666666c0 10.24 0 20.48 17.06666667 20.48C853.33333333 901.12 989.86666667 723.62666667 989.86666667 512c0-262.82666667-215.04-477.86666667-477.86666667-477.86666667S34.13333333 249.17333333 34.13333333 512z"
    fill="currentColor"></path>
</svg>`,Oa=I({__name:"HelloWorld",setup(a){function s(){X("示例窗口",p("div",{class:"example-body"},[b("Hello, xWindow!")]))}return(n,t)=>(W(),M("button",{type:"button",onClick:s,class:"btn btn-small"},"尝试一下"))}}),Sa={class:"example-body"},za=I({__name:"WinBody",props:{text:String},setup(a){return(s,n)=>(W(),M("div",Sa,z(a.text),1))}}),Ra=I({__name:"FunctionBased",setup(a){function s(){X("窗口1",p("div",{class:"example-body"},[b("这段文本是使用JSX创建的。")]))}function n(){X("窗口2","这段本文可以直接展示。")}function t(){X("窗口3",V("div",{className:"example-body"},"这段文本是通过Vue提供的渲染函数创建的。"))}function l(){X("窗口4",()=>p("div",{class:"example-body"},[b("这段文本是通过返回VNode节点的函数创建的。")]))}function o(){X("窗口5",p(za,{text:"这段文本通过组件创建的。"},null))}return(c,j)=>(W(),M(D,null,[e("button",{class:"btn",type:"button",onClick:s},"JSX"),e("button",{class:"btn",type:"button",onClick:n},"文本"),e("button",{class:"btn",type:"button",onClick:t},"渲染函数"),e("button",{class:"btn",type:"button",onClick:l},"函数"),e("button",{class:"btn",type:"button",onClick:o},"组件")],64))}}),Pa=e("header",null,"窗口尺寸：",-1),La=e("header",null,"窗口位置：",-1),Na=e("header",null,"窗口特性：",-1),Ba=["onUpdate:modelValue"],Aa=e("header",null,"调整模式：",-1),Da=["value"],qa=e("span",null,"允许调整窗口大小，允许最大化（默认）",-1),Ha=["value"],Fa=e("span",null,"只允许调整窗口大小",-1),Va=["value"],$a=e("span",null,"禁止",-1),Ms="__WIN_EVENTS__",Xa=I({__name:"Example",setup(a){const s=Cs("classes"),n=wa(),t=[{label:"可拖拽",prop:"draggable",value:!0},{label:"可关闭",prop:"closeable",value:!0},{label:"可置顶",prop:"pinnable",value:!0},{label:"最大化",prop:"maximize",value:!1},{label:"遮罩层",prop:"mask",value:!1},{label:"按ESC键关闭",prop:"closeOnPressEsc",value:!0}],l={width:"800px",height:"600px",left:"calc(50vw - 400px)",top:"12vh",resizeMode:S.RESIZE},o=t.reduce((T,i)=>(T[i.prop]=i.value,T),{...l}),c=Q(o),j=I({props:{params:{type:Object,required:!0}},setup(T){const i=ds(),h=Reflect.get(i,Ms);function v(){i==null||i.close(!0)}return function(){var R,ss,ns,as,ts,u;const g=c.closeable?null:p("button",{type:"button",class:"btn btn-small",onClick:v},[b("关闭窗口")]),O=t.map(f=>p("p",null,[f.label,b(": "),JSON.stringify(T.params[f.prop])])),C=h.value.map(f=>p("p",null,[f]));return p("div",{class:s.exampleBody},[p("div",{class:s.params},[p("div",{class:s.panel},[p("h4",null,[b("初始参数：")]),O]),p("div",{class:s.panel},[p("h4",null,[b("窗口状态：")]),p("div",{class:s.infos},[p("p",null,[b("id: "),i==null?void 0:i.wid]),p("p",null,[b("focused: "),JSON.stringify((R=i==null?void 0:i.state)==null?void 0:R.focused)]),p("p",null,[b("left: "),(ss=i==null?void 0:i.state)==null?void 0:ss.offsetLeft,b("px")]),p("p",null,[b("top: "),(ns=i==null?void 0:i.state)==null?void 0:ns.offsetTop,b("px")]),p("p",null,[b("width: "),(as=i==null?void 0:i.state)==null?void 0:as.offsetWidth,b("px")]),p("p",null,[b("height: "),(ts=i==null?void 0:i.state)==null?void 0:ts.offsetHeight,b("px")]),p("p",null,[b("z-index: "),JSON.stringify((u=i==null?void 0:i.state)==null?void 0:u.zIndex)])])])]),p("div",{class:s.eventHeader},[p("strong",null,[b("窗口事件")]),g]),p("div",{class:s.events},[C])])}}});function _(){const T=new Date,i=T.getMinutes().toString().padStart(2,"0"),h=T.getSeconds().toString().padStart(2,"0"),v=T.getMilliseconds().toString().padStart(4,"0");return`${i}:${h}.${v}`}function F(){const T=n.getWindowCount(),i={...c},h=Y([]),v=Zs("窗口"+T,p(j,{params:i},null),i);v.on("created",()=>{h.value.unshift(`[${_()}]: call created event.`)}),v.on("beforeShow",g=>{h.value.unshift(`[${_()}]: call beforeShow event.`)}),v.on("show",g=>{h.value.unshift(`[${_()}]: call show event.`)}),v.on("close",()=>{h.value.unshift(`[${_()}]: call close event.`)}),v.on("beforeDestroy",()=>{h.value.unshift(`[${_()}]: call beforeDestroy event.`)}),v.on("dragStart",g=>{h.value.unshift(`[${_()}]: call dragStart event.`)}),v.on("dragEnd",g=>{h.value.unshift(`[${_()}]: call dragEnd event.`)}),v.on("resizeStart",g=>{h.value.unshift(`[${_()}]: call resizeStart event.`)}),v.on("resizeEnd",g=>{h.value.unshift(`[${_()}]: call resizeEnd event. `)}),v.on("maximizeChange",g=>{h.value.unshift(`[${_()}]: call maximizeChange event. isMaximize: ${v.isMaximize}`)}),Reflect.set(v,Ms,h)}function N(T,i){c.width=T+"px",c.height=i+"px"}return(T,i)=>(W(),M(D,null,[e("section",{class:y(E(s).row)},[Pa,e("div",{class:y(E(s).content)},[e("label",null,[b("宽度："),A(e("input",{type:"text","onUpdate:modelValue":i[0]||(i[0]=h=>c.width=h),placeholder:"参照CSS的width属性"},null,512),[[K,c.width]])]),e("label",null,[b("高度："),A(e("input",{type:"text","onUpdate:modelValue":i[1]||(i[1]=h=>c.height=h),placeholder:"参照CSS的height属性"},null,512),[[K,c.height]])]),e("button",{type:"button",class:"btn btn-mini",onClick:i[2]||(i[2]=h=>N(800,600))},"800px*600px"),e("button",{type:"button",class:"btn btn-mini",onClick:i[3]||(i[3]=h=>N(390,840))},"390px*840px")],2)],2),e("section",{class:y(E(s).row)},[La,e("div",{class:y(E(s).content)},[e("label",null,[b("左侧："),A(e("input",{type:"text","onUpdate:modelValue":i[4]||(i[4]=h=>c.left=h),placeholder:"参照CSS中left属性"},null,512),[[K,c.left]])]),e("label",null,[b("上侧："),A(e("input",{type:"text","onUpdate:modelValue":i[5]||(i[5]=h=>c.top=h),placeholder:"参照CSS中top属性"},null,512),[[K,c.top]])])],2)],2),e("section",{class:y(E(s).row)},[Na,e("div",{class:y(E(s).content)},[(W(),M(D,null,rs(t,h=>e("label",{key:h.prop},[A(e("input",{type:"checkbox","onUpdate:modelValue":v=>c[h.prop]=v},null,8,Ba),[[rn,c[h.prop]]]),e("span",null,z(h.label),1)])),64))],2)],2),e("section",{class:y(E(s).row)},[Aa,e("div",{class:y(E(s).content)},[e("label",null,[A(e("input",{type:"radio",name:"resizeMode",value:E(S).RESIZE,"onUpdate:modelValue":i[6]||(i[6]=h=>c.resizeMode=h)},null,8,Da),[[hs,c.resizeMode]]),qa]),e("label",null,[A(e("input",{type:"radio",name:"resizeMode",value:E(S).RESIZE_ONLY,"onUpdate:modelValue":i[7]||(i[7]=h=>c.resizeMode=h)},null,8,Ha),[[hs,c.resizeMode]]),Fa]),e("label",null,[A(e("input",{type:"radio",name:"resizeMode",value:E(S).DISABLED,"onUpdate:modelValue":i[8]||(i[8]=h=>c.resizeMode=h)},null,8,Va),[[hs,c.resizeMode]]),$a])],2)],2),e("button",{onClick:F,class:"btn"},"创建窗口")],64))}}),Ua="Zj7DQ8mX",Ga="hZ15PjHU",Za="tbtACTrZ",Ya="_3N6wV7j6",Ja="oTAjhRfW",Ka="CFWamGXp",Qa="cqiqLgbF",st="T9Y6Pp6o",nt="TUAWahwn",at={winBody:Ua,exampleBody:Ga,row:Za,content:Ya,events:Ja,params:Ka,panel:Qa,infos:st,eventHeader:nt},_s=(a,s)=>{const n=a.__vccOpts||a;for(const[t,l]of s)n[t]=l;return n},tt={classes:at},lt=_s(Xa,[["__cssModules",tt]]),et={class:"approval-form"},ot={key:0,class:"approval-form-message"},Ks=I({__name:"UseApproval",setup(a){const s=ds(),n=Q({value:"",fail:!1});return s==null||s.useHandle("confirm",()=>n.value?n.value:(n.fail=!0,Promise.reject("验证未通过"))),(t,l)=>(W(),M("div",et,[A(e("textarea",{type:"text","onUpdate:modelValue":l[0]||(l[0]=o=>n.value=o),placeholder:"请输入",ref:"inputRef",autofocus:""},null,512),[[K,n.value]]),n.fail?(W(),M("div",ot,"请输入审批意见")):fs("",!0)]))}}),ct={key:0,class:"example-modal"},it={class:"example-modal-header"},pt={class:"example-modal-title"},rt={class:"example-modal-menus"},ut={class:"example-modal-body"},dt={class:"example-modal-footer"},Qs=I({__name:"Modal",setup(a){const s=ds();function n(){s==null||s.dispatchCancel().catch(l=>console.error(l))}function t(){s==null||s.dispatchConfirm().catch(l=>console.error(l))}return(l,o)=>E(s)?(W(),M("div",ct,[e("div",it,[e("div",pt,z(E(s).options.title),1),e("div",rt,[gs(l.$slots,"menus",{abstractWindow:E(s)})])]),e("div",ut,[gs(l.$slots,"default",{abstractWindow:E(s)})]),e("div",dt,[e("button",{type:"button",class:"btn btn-small",onClick:o[0]||(o[0]=c=>n())},"取消"),e("button",{type:"button",class:"btn btn-small",onClick:o[1]||(o[1]=c=>t())},"确定")])])):fs("",!0)}}),ht=Object.freeze(Object.defineProperty({__proto__:null,Example:lt,FunctionBased:Ra,HelloWorld:Oa,Modal:Qs,UseApproval:Ks},Symbol.toStringTag,{value:"Module"})),jt=["innerHTML"],gt=["onClick"],mt=I({__name:"index",props:{menuClass:{type:String,default:null}},setup(a){const s=[{name:"皓白",primaryColor:"#ebeef0",textColor:"#000"},{name:"天缥",primaryColor:"#d5ebe1",textColor:"#000",navTextSecondaryColor:"#333"},{name:"海天霞",primaryColor:"#f3a694",textColor:"#000",navTextSecondaryColor:"#333"},{name:"暮山紫",primaryColor:"#a4abd6",textColor:"#000",navTextSecondaryColor:"#333"}].map(l=>({...l,background:l.primaryColor}));function n(l){return{"--xwindow-color-primary":l.primaryColor,"--xwindow-header-color":l.textColor,"--nav-text-secondary-color":l.navTextSecondaryColor}}function t(l){const o=document.documentElement,c=n(l);for(const j in c){const _=c[j];_==null?o.style.removeProperty(j):o.style.setProperty(j,_)}}return(l,o)=>(W(),M("div",{class:y(l.classes.picker)},[e("button",{type:"button",class:y(a.menuClass),innerHTML:E(Ia),title:"主题"},null,10,jt),e("ul",{class:y(l.classes.panel)},[(W(!0),M(D,null,rs(E(s),c=>(W(),M("li",{key:c.id,onClick:j=>t(c),style:xs({"--theme-primary-color":c.primaryColor})},[e("span",{class:y(l.classes.badge),style:xs({background:c.background})},null,6),e("strong",null,z(c.name),1)],12,gt))),128))],2)],2))}}),ft="JJwYh7Hb",wt="nGuXZaqY",bt="WnLJWuwF",yt={picker:ft,panel:wt,badge:bt},_t={classes:yt},vt=_s(mt,[["__cssModules",_t]]),xt=`<p>xWindow是仿Windows窗口的组件库，目标是提供一套快捷的API来创建和使用窗口。本文档的就是基于xWindow创建了一个窗口，你可以拖动文档查看效果。</p>
<h2 class="head-anchor article-sticky-heading" id="特性✨">特性 ✨</h2>
<ul class="doc-ul">
<li>基于<em>TypeScript</em>和<em>Vue@3.3</em>开发</li>
<li>支持窗口组件常用功能</li>
<li>支持函数式调用</li>
<li>与<code>Promise</code>结合使用，可将业务封装为一个函数</li>
<li>提供<em>SimpleWindow</em>、<em>BlankWindow</em>两种不同的窗口组件</li>
</ul>
<h2 class="head-anchor article-sticky-heading" id="设计动机">设计动机</h2>
<p>xWindow最大的特色是可以<strong>通过函数直接创建窗口</strong>，显示你想要的东西。在业务系统中，经常会遇到以下情况：</p>
<ul class="doc-ul">
<li>业务组件中存在多个弹窗</li>
<li>某一业务中需要弹窗操作，获取结果后进行下一步操作</li>
</ul>
<p>通常情况下，需要在业务组件内将其一一定义，并维护这些窗口的状态。这些状态不仅定义繁琐，而且与业务无关，例如这样：</p>
<pre v-pre class="hljs" language="vue"><code class="hljs-code"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>其他的业务代码<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">xx-dialog</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;visible1&quot;</span> <span class="hljs-attr">title</span>=<span class="hljs-string">&quot;窗口标题1&quot;</span>&gt;</span>窗口内容<span class="hljs-tag">&lt;/<span class="hljs-name">xx-dialog</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">xx-dialog</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;visible2&quot;</span> <span class="hljs-attr">title</span>=<span class="hljs-string">&quot;窗口标题2&quot;</span>&gt;</span>窗口内容<span class="hljs-tag">&lt;/<span class="hljs-name">xx-dialog</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">xx-dialog</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;visible3&quot;</span> <span class="hljs-attr">title</span>=<span class="hljs-string">&quot;窗口标题3&quot;</span>&gt;</span>窗口内容<span class="hljs-tag">&lt;/<span class="hljs-name">xx-dialog</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">setup</span>&gt;</span><span class="language-javascript">
<span class="hljs-keyword">import</span> { ref } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vue&#x27;</span>

<span class="hljs-keyword">const</span> visible1 = <span class="hljs-title function_">ref</span>(<span class="hljs-literal">false</span>)
<span class="hljs-keyword">const</span> visible2 = <span class="hljs-title function_">ref</span>(<span class="hljs-literal">false</span>)
<span class="hljs-keyword">const</span> visible3 = <span class="hljs-title function_">ref</span>(<span class="hljs-literal">false</span>)
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code><button type="button" class="doc-copy-btn" title="复制"/></pre>
<p>如果你觉得上述过程繁琐，下面是一个的基本示例：</p>
<pre v-pre class="hljs" language="js"><code class="hljs-code"><span class="hljs-keyword">import</span> { useWindow } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@dongls/xwindow&#x27;</span>

<span class="hljs-comment">//你可以在需要地方通过代码直接创建一个窗口</span>
<span class="hljs-title function_">useWindow</span>(<span class="hljs-string">&#x27;函数式调用&#x27;</span>, <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Hello, xWindow!<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>)
</code><button type="button" class="doc-copy-btn" title="复制"/></pre>
<p>xWindow不需要事先在业务组件中声明，你可以在任何需要的地方直接创建一个窗口。 <HelloWorld/></p>`,Et=`<h2 class="head-anchor article-sticky-heading" id="安装">安装</h2>
<p>推荐使用包管理器安装xWindow，通过构建工具（<a href="https://github.com/webpack/webpack" target="_blank">Webpack</a>、<a href="https://github.com/vitejs/vite" target="_blank">Vite</a>）使用。</p>
<pre v-pre class="hljs" language="bash"><code class="hljs-code">npm i @dongls/xwindow
</code><button type="button" class="doc-copy-btn" title="复制"/></pre>
<p>安装成功后，按如下代码引入即可。</p>
<pre v-pre class="hljs" language="javascript"><code class="hljs-code"><span class="hljs-keyword">import</span> <span class="hljs-string">&#x27;@dongls/xwindow/dist/style.css&#x27;</span>
<span class="hljs-keyword">import</span> { xWindow } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@dongls/xwindow&#x27;</span>

<span class="hljs-keyword">import</span> { createApp } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vue&#x27;</span>
<span class="hljs-keyword">import</span> <span class="hljs-title class_">App</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./App.vue&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-title function_">createApp</span>(<span class="hljs-title class_">App</span>)
app.<span class="hljs-title function_">use</span>(xWindow)
app.<span class="hljs-title function_">mount</span>(<span class="hljs-string">&#x27;#app&#x27;</span>)
</code><button type="button" class="doc-copy-btn" title="复制"/></pre>
<p>xWindow构建时会生成类型声明文件，你可以在<code>node_modules\\@dongls\\xwindow\\types</code>文件夹下找到它们。主流的文件编辑器或IDE都内建了对<code>TypeScript</code>的支持，你在使用过程中会得到类型提示。如果你的工程也使用了<code>TypeScript</code>，你可能需要用到xWindow定义的类型。</p>
<pre v-pre class="hljs" language="typescript"><code class="hljs-code"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">AbstractWindow</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@dongls/xwindow&#x27;</span>

<span class="hljs-keyword">let</span> <span class="hljs-attr">instance</span>: <span class="hljs-title class_">AbstractWindow</span> = <span class="hljs-literal">null</span>
</code><button type="button" class="doc-copy-btn" title="复制"/></pre>
<h2 class="head-anchor article-sticky-heading" id="函数式调用">函数式调用</h2>
<p>需要注意的是，在使用<code>useWindow</code>函数之前，推荐<strong>先声明<code>WindowManager</code>组件</strong>。该组件提供了对函数式调用的支持，以及键盘事件的响应。</p>
<pre v-pre class="hljs" language="vue"><code class="hljs-code"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- 推荐在工程的根组件中声明WindowManger组件 --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">WindowManager</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
</code><button type="button" class="doc-copy-btn" title="复制"/></pre>
<p>xWindow提供了<code>useWindow</code>函数，用于快速创建窗口。需要注意的是，由于抛弃了通过模板创建窗口，因此推荐JSX来声明要展示的内容。如果你对此并不熟悉，请先阅读Vue文档中的<a href="https://cn.vuejs.org/guide/extras/render-function.html" target="_blank">渲染函数&amp;JSX</a>一节。</p>
<pre v-pre class="hljs" language="vue"><code class="hljs-code"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;btn&quot;</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;button&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;createContentByJSX&quot;</span>&gt;</span>JSX<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;btn&quot;</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;button&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;createContentByText&quot;</span>&gt;</span>文本<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;btn&quot;</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;button&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;createContentByRenderFunction&quot;</span>&gt;</span>渲染函数<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;btn&quot;</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;button&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;createContentByFunction&quot;</span>&gt;</span>函数<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;btn&quot;</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;button&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;createContentByComponent&quot;</span>&gt;</span>组件<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;tsx&quot;</span> <span class="hljs-attr">setup</span>&gt;</span><span class="language-javascript">
<span class="hljs-keyword">import</span> <span class="hljs-title class_">WinBody</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./WinBody.vue&#x27;</span>

<span class="hljs-keyword">import</span> { h } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vue&#x27;</span>
<span class="hljs-keyword">import</span> { useWindow } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@dongls/xwindow&#x27;</span>

<span class="hljs-keyword">function</span> <span class="hljs-title function_">createContentByJSX</span>(<span class="hljs-params"></span>) {
  <span class="hljs-title function_">useWindow</span>(<span class="hljs-string">&#x27;窗口1&#x27;</span>, <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;example-body&quot;</span>&gt;</span>这段文本是使用JSX创建的。<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>)
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">createContentByText</span>(<span class="hljs-params"></span>) {
  <span class="hljs-title function_">useWindow</span>(<span class="hljs-string">&#x27;窗口2&#x27;</span>, <span class="hljs-string">&#x27;这段本文可以直接展示。&#x27;</span>)
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">createContentByRenderFunction</span>(<span class="hljs-params"></span>) {
  <span class="hljs-title function_">useWindow</span>(<span class="hljs-string">&#x27;窗口3&#x27;</span>, <span class="hljs-title function_">h</span>(<span class="hljs-string">&#x27;div&#x27;</span>, { <span class="hljs-attr">className</span>: <span class="hljs-string">&#x27;example-body&#x27;</span> }, <span class="hljs-string">&#x27;这段文本是通过Vue提供的渲染函数创建的。&#x27;</span>))
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">createContentByFunction</span>(<span class="hljs-params"></span>) {
  <span class="hljs-title function_">useWindow</span>(<span class="hljs-string">&#x27;窗口4&#x27;</span>, <span class="hljs-function">() =&gt;</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;example-body&quot;</span>&gt;</span>这段文本是通过返回VNode节点的函数创建的。<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>)
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">createContentByComponent</span>(<span class="hljs-params"></span>) {
  <span class="hljs-title function_">useWindow</span>(<span class="hljs-string">&#x27;窗口5&#x27;</span>, <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">WinBody</span> <span class="hljs-attr">text</span>=<span class="hljs-string">&quot;这段文本通过组件创建的。&quot;</span> /&gt;</span></span>)
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code><button type="button" class="doc-copy-btn" title="复制"/></pre>
<p>最终效果如下：
<span class="quickstart-function-based"><FunctionBased/></span></p>`,Tt=`<h2 class="head-anchor article-sticky-heading" id="模态框">模态框</h2>
<p>模态框是业务系统中常用的组件，你可以基于<code>xWindow</code>轻松封装符合需求的模态框。以下就是一个简单<code>Modal</code>组件：</p>
<pre v-pre class="hljs" language="vue"><code class="hljs-code"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;example-modal&quot;</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">&quot;win&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;example-modal-header&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;example-modal-title&quot;</span>&gt;</span>{{ win.options.title }}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;example-modal-menus&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;menus&quot;</span> <span class="hljs-attr">:abstractWindow</span>=<span class="hljs-string">&quot;win&quot;</span> /&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;example-modal-body&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">:abstractWindow</span>=<span class="hljs-string">&quot;win&quot;</span> /&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;example-modal-footer&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;button&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;btn btn-small&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;onCancel()&quot;</span>&gt;</span>取消<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;button&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;btn btn-small&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;onConfirm()&quot;</span>&gt;</span>确定<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;tsx&quot;</span> <span class="hljs-attr">setup</span>&gt;</span><span class="language-javascript">
<span class="hljs-keyword">import</span> { useWindowApi } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@dongls/xwindow&#x27;</span>

<span class="hljs-keyword">const</span> win = <span class="hljs-title function_">useWindowApi</span>()

<span class="hljs-keyword">function</span> <span class="hljs-title function_">onCancel</span>(<span class="hljs-params"></span>) {
  win?.<span class="hljs-title function_">dispatchCancel</span>().<span class="hljs-title function_">catch</span>(<span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(e))
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">onConfirm</span>(<span class="hljs-params"></span>) {
  win?.<span class="hljs-title function_">dispatchConfirm</span>().<span class="hljs-title function_">catch</span>(<span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(e))
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code><button type="button" class="doc-copy-btn" title="复制"/></pre>
<p>将这个<code>Modal</code>组件简单封装一下，就可以直接调用。例如：</p>
<pre v-pre class="hljs" language="typescript"><code class="hljs-code"><span class="hljs-keyword">import</span> { useBlankWindow, <span class="hljs-title class_">UseWindowParams</span>, <span class="hljs-title class_">WindowBody</span>, <span class="hljs-title class_">AbstractWindow</span>, <span class="hljs-title class_">Render</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@dongls/xwindow&#x27;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">useModal</span>(<span class="hljs-params">title: <span class="hljs-built_in">string</span>, body: WindowBody, params: UseWindowParams = {}</span>) {
  params.<span class="hljs-property">height</span> = params.<span class="hljs-property">height</span> ?? <span class="hljs-string">&#x27;320px&#x27;</span>

  <span class="hljs-keyword">const</span> slots = {
    <span class="hljs-comment">// 窗体</span>
    <span class="hljs-title function_">default</span>(<span class="hljs-params">props: { abstractWindow: AbstractWindow }</span>) {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">typeof</span> body == <span class="hljs-string">&#x27;function&#x27;</span> ? <span class="hljs-title function_">body</span>(props.<span class="hljs-property">abstractWindow</span>) : body
    },
    <span class="hljs-comment">// 菜单</span>
    <span class="hljs-title function_">menus</span>(<span class="hljs-params">props: { abstractWindow: AbstractWindow }</span>) {
      <span class="hljs-keyword">const</span> menus = props.<span class="hljs-property">abstractWindow</span>.<span class="hljs-title function_">useMenus</span>()
      <span class="hljs-keyword">return</span> menus.<span class="hljs-property">value</span>.<span class="hljs-title function_">map</span>(<span class="hljs-function"><span class="hljs-params">menu</span> =&gt;</span> <span class="hljs-title class_">Render</span>.<span class="hljs-title function_">renderMenu</span>(props.<span class="hljs-property">abstractWindow</span>, menu))
    },
  }

  <span class="hljs-comment">// 这里使用空白窗口，实现自定义</span>
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">useBlankWindow</span>(title, <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Modal</span>&gt;</span>{slots}<span class="hljs-tag">&lt;/<span class="hljs-name">Modal</span>&gt;</span></span>, params)
}
</code><button type="button" class="doc-copy-btn" title="复制"/></pre>
<p>上述代码最终效果如下：<UseModal/></p>
<h2 class="head-anchor article-sticky-heading" id="业务封装">业务封装</h2>
<p>在业务系统中，经常需要在流程中打开弹窗完成某一具体的业务操作。例如，在审批流程中，需要弹窗让用户输入审批意见。要完成上述需求，通常需要准备一个相应的业务组件，例如：</p>
<pre v-pre class="hljs" language="vue"><code class="hljs-code"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;approval-form&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">textarea</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;state.value&quot;</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;请输入&quot;</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">&quot;inputRef&quot;</span> <span class="hljs-attr">autofocus</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;approval-form-message&quot;</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">&quot;state.fail&quot;</span>&gt;</span>请输入审批意见<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;ts&quot;</span> <span class="hljs-attr">setup</span>&gt;</span><span class="language-javascript">
<span class="hljs-keyword">import</span> { reactive, shallowRef } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vue&#x27;</span>
<span class="hljs-keyword">import</span> { useWindowApi } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@dongls/xwindow&#x27;</span>

<span class="hljs-keyword">const</span> win = <span class="hljs-title function_">useWindowApi</span>()
<span class="hljs-keyword">const</span> state = <span class="hljs-title function_">reactive</span>({ <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-attr">fail</span>: <span class="hljs-literal">false</span> })

<span class="hljs-comment">// 点击确定按钮会调用此函数，返回审批意见</span>
win?.<span class="hljs-title function_">useHandle</span>(<span class="hljs-string">&#x27;confirm&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-keyword">if</span> (!state.<span class="hljs-property">value</span>) {
    state.<span class="hljs-property">fail</span> = <span class="hljs-literal">true</span>
    <span class="hljs-keyword">return</span> <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">reject</span>(<span class="hljs-string">&#x27;验证未通过&#x27;</span>)
  }

  <span class="hljs-keyword">return</span> state.<span class="hljs-property">value</span>
})
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code><button type="button" class="doc-copy-btn" title="复制"/></pre>
<p>基于上述组件以及之前封装的<code>useModal</code>函数，可以将上述业务需求封装为一个函数。例如：</p>
<pre v-pre class="hljs" language="typescript"><code class="hljs-code"><span class="hljs-keyword">import</span> { <span class="hljs-variable constant_">RESIZE_MODE</span>, <span class="hljs-title class_">UseWindowParams</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@dongls/xwindow&#x27;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">useApproval</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">string</span>&gt;(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> <span class="hljs-attr">params</span>: <span class="hljs-title class_">UseWindowParams</span> = { <span class="hljs-attr">mask</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">resizeMode</span>: <span class="hljs-variable constant_">RESIZE_MODE</span>.<span class="hljs-property">DISABLED</span> }
    <span class="hljs-keyword">const</span> instance = <span class="hljs-title function_">useModal</span>(<span class="hljs-string">&#x27;请输入审批意见&#x27;</span>, <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">UseApproval</span> /&gt;</span></span>, params)
    instance.<span class="hljs-title function_">once</span>(<span class="hljs-string">&#x27;confirm&#x27;</span>, <span class="hljs-function"><span class="hljs-params">event</span> =&gt;</span> <span class="hljs-title function_">resolve</span>(event.<span class="hljs-property">detail</span>))
    instance.<span class="hljs-title function_">once</span>(<span class="hljs-string">&#x27;cancel&#x27;</span>, <span class="hljs-function"><span class="hljs-params">event</span> =&gt;</span> <span class="hljs-title function_">reject</span>(event.<span class="hljs-property">detail</span>))
  })
}
</code><button type="button" class="doc-copy-btn" title="复制"/></pre>
<p>在需要用户审批时，可以通过以下代码直接调用</p>
<pre v-pre class="hljs" language="typescript"><code class="hljs-code"><span class="hljs-comment">// 如果用户输入并点击确认按钮，那么value的值为用户输入的内容</span>
<span class="hljs-comment">// 如果用户点击取消，或者直接关闭窗口，那么value的值为null</span>
<span class="hljs-keyword">const</span> value = <span class="hljs-keyword">await</span> <span class="hljs-title function_">useApproval</span>().<span class="hljs-title function_">catch</span>(<span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(e)
  <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>
})
<span class="hljs-comment">// 后续业务代码</span>
</code><button type="button" class="doc-copy-btn" title="复制"/></pre>
<p>效果如下：<UseExample/></p>`,Wt="<Example/>",Mt=`<h2 class="head-anchor article-sticky-heading" id="函数式API">函数式API</h2>
<hr>
<pre v-pre class="hljs" language="typescript"><code class="hljs-code"><span class="hljs-comment">// 最基础的窗口创建函数</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">useWindow</span>(<span class="hljs-params">title: <span class="hljs-built_in">string</span>, body: WindowBody</span>): <span class="hljs-title class_">AbstractWindow</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">useWindow</span>(<span class="hljs-params">title: <span class="hljs-built_in">string</span>, body: WindowBody, params: UseWindowParams</span>): <span class="hljs-title class_">AbstractWindow</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">useWindow</span>(<span class="hljs-params">params: UseWindowParams</span>): <span class="hljs-title class_">AbstractWindow</span>

<span class="hljs-comment">// 用于创建一个空白窗口</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">useBlankWindow</span>(<span class="hljs-params">params: UseWindowParams</span>): <span class="hljs-title class_">AbstractWindow</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">useBlankWindow</span>(<span class="hljs-params">title: <span class="hljs-built_in">string</span>, body: WindowBody</span>): <span class="hljs-title class_">AbstractWindow</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">useBlankWindow</span>(<span class="hljs-params">title: <span class="hljs-built_in">string</span>, body: WindowBody, params: UseWindowParams</span>): <span class="hljs-title class_">AbstractWindow</span>

<span class="hljs-comment">// 用于创建一个带标题的简单窗口</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">useSimpleWindow</span>(<span class="hljs-params">params: UseWindowParams</span>): <span class="hljs-title class_">AbstractWindow</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">useSimpleWindow</span>(<span class="hljs-params">title: <span class="hljs-built_in">string</span>, body: WindowBody</span>): <span class="hljs-title class_">AbstractWindow</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">useSimpleWindow</span>(<span class="hljs-params">title: <span class="hljs-built_in">string</span>, body: WindowBody, params: UseWindowParams</span>): <span class="hljs-title class_">AbstractWindow</span>

<span class="hljs-comment">// 用于在窗体组件中注入当前窗口实例</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">useWindowApi</span>(<span class="hljs-params"></span>): <span class="hljs-title class_">AbstractWindow</span> | <span class="hljs-literal">undefined</span>
</code><button type="button" class="doc-copy-btn" title="复制"/></pre>
<p><code>UseWindowParams</code>的类型参照<strong>窗口参数</strong>，<code>AbstractWindow</code>的类型参照<strong>窗口实例</strong>。</p>
<h2 class="head-anchor article-sticky-heading" id="窗口参数（UseWindowParams）">窗口参数（UseWindowParams）</h2>
<hr>
<h3>type</h3>
<ul class="doc-ul">
<li><strong>类型</strong>：<code>WindowType</code><pre v-pre class="hljs" language="typescript"><code class="hljs-code"><span class="hljs-keyword">type</span> <span class="hljs-title class_">WindowType</span> = <span class="hljs-string">&#x27;SimpleWindow&#x27;</span> | <span class="hljs-string">&#x27;BlankWindow&#x27;</span>
</code><button type="button" class="doc-copy-btn" title="复制"/></pre>
</li>
<li><strong>默认值</strong>：<code>SimpleWindow</code></li>
<li><strong>描述</strong>：窗口的类型。根据传入的类型，创建不同类型的窗口，仅在<code>useWindow</code>函数中有效。</li>
</ul>
<h3>title</h3>
<ul class="doc-ul">
<li><strong>类型</strong>：<code>string</code></li>
<li><strong>描述</strong>：窗口标题</li>
</ul>
<h3>body</h3>
<ul class="doc-ul">
<li>
<p><strong>类型</strong>：<code>WindowBody</code></p>
<pre v-pre class="hljs" language="typescript"><code class="hljs-code"><span class="hljs-keyword">type</span> <span class="hljs-title class_">WindowBody</span> = <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span> | <span class="hljs-title class_">VNode</span> | <span class="hljs-title class_">VNodeArrayChildren</span> | (<span class="hljs-function">(<span class="hljs-params">win: <span class="hljs-built_in">any</span></span>) =&gt;</span> <span class="hljs-built_in">any</span>)
</code><button type="button" class="doc-copy-btn" title="复制"/></pre>
</li>
<li>
<p><strong>描述</strong>：窗体，有关<code>VNode</code>的信息请参照Vue相关文档</p>
<pre v-pre class="hljs" language="typescript"><code class="hljs-code">  <span class="hljs-keyword">import</span> { useSimpleWindow } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@dongls/xwindow&#x27;</span>

  <span class="hljs-comment">// 直接传入组件作为窗体</span>
  <span class="hljs-title function_">useSimpleWindow</span>(<span class="hljs-string">&#x27;标题&#x27;</span>, &lt;<span class="hljs-title class_">Component</span>&gt;)
  <span class="hljs-comment">// 传入VNode作为窗体</span>
  <span class="hljs-title function_">useSimpleWindow</span>(<span class="hljs-string">&#x27;标题&#x27;</span>, <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>窗体<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>)
</code><button type="button" class="doc-copy-btn" title="复制"/></pre>
</li>
</ul>
<h3>icon</h3>
<ul class="doc-ul">
<li>
<p>类型：<code>WindowIcon</code></p>
<pre v-pre class="hljs" language="typescript"><code class="hljs-code"><span class="hljs-keyword">type</span> <span class="hljs-title class_">WindowIcon</span> = <span class="hljs-built_in">string</span> | <span class="hljs-title class_">VNode</span> | (<span class="hljs-function">(<span class="hljs-params">win: AbstractWindow</span>) =&gt;</span> <span class="hljs-title class_">VNode</span>)
</code><button type="button" class="doc-copy-btn" title="复制"/></pre>
</li>
<li>
<p>描述：窗口的图标,如果不指定则使用默认的图标。可以传入以下三种类型参数：</p>
<pre v-pre class="hljs" language="typescript"><code class="hljs-code"><span class="hljs-keyword">import</span> { useSimpleWindow } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@dongls/xwindow&#x27;</span>;

<span class="hljs-comment">// 传入值当作类选择器使用</span>
<span class="hljs-title function_">useSimpleWindow</span>(<span class="hljs-string">&#x27;标题&#x27;</span>, <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>窗体<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>, { <span class="hljs-attr">icon</span>: <span class="hljs-string">&#x27;icon-xxxx&#x27;</span> })

<span class="hljs-comment">// 直接传入VNode</span>
<span class="hljs-title function_">useSimpleWindow</span>(<span class="hljs-string">&#x27;标题&#x27;</span>, <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>窗体<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>, { <span class="hljs-attr">icon</span>: <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">IconXXXX</span> /&gt;</span></span> })

<span class="hljs-comment">// 返回一个VNode当作图标</span>
<span class="hljs-title function_">useSimpleWindow</span>(<span class="hljs-string">&#x27;标题&#x27;</span>, <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>窗体<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>, { <span class="hljs-attr">icon</span>: <span class="hljs-function">() =&gt;</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">IconXXXX</span> /&gt;</span></span> })
</code><button type="button" class="doc-copy-btn" title="复制"/></pre>
</li>
</ul>
<h3>className</h3>
<ul class="doc-ul">
<li>类型：<code>string</code></li>
<li>描述: 窗口自定义类名，用于修改窗口样式</li>
</ul>
<h3>width</h3>
<ul class="doc-ul">
<li>类型：<code>string</code></li>
<li>默认值：<code>640px</code></li>
<li>描述：窗口的初始宽度，参照<code>CSS</code>中<code>width</code>语法</li>
</ul>
<h3>minWidth</h3>
<ul class="doc-ul">
<li>类型：<code>number</code></li>
<li>默认值：<code>360</code></li>
<li>描述：窗口的最小宽度，单位为<code>px</code></li>
</ul>
<h3>height</h3>
<ul class="doc-ul">
<li>类型：<code>string</code></li>
<li>默认值：<code>640px</code></li>
<li>描述：窗口的初始高度，参照<code>CSS</code>中<code>height</code>语法</li>
</ul>
<h3>minHeight</h3>
<ul class="doc-ul">
<li>类型：<code>number</code></li>
<li>默认值：<code>32</code></li>
<li>描述：窗口的最小高度，单位为<code>px</code></li>
</ul>
<h3>top</h3>
<ul class="doc-ul">
<li>类型：<code>string</code></li>
<li>描述：窗口相对浏览器窗口顶部的初始位置，参照<code>CSS</code>的<code>top</code>语法</li>
</ul>
<h3>left</h3>
<ul class="doc-ul">
<li>类型：<code>string</code></li>
<li>描述：窗口相对浏览器窗口左侧的初始位置，参照<code>CSS</code>的<code>left</code>语法</li>
</ul>
<h3>maximize</h3>
<ul class="doc-ul">
<li>类型：<code>boolean</code></li>
<li>默认值：<code>false</code></li>
<li>描述：窗口最大化状态。如果需要禁止窗口最大化，参照<code>resizeMode</code>说明</li>
</ul>
<h3>resizeMode</h3>
<ul class="doc-ul">
<li>类型：<code>number</code></li>
</ul>
<pre v-pre class="hljs" language="typescript"><code class="hljs-code"><span class="hljs-keyword">const</span> <span class="hljs-variable constant_">RESIZE_MODE</span> = {
  <span class="hljs-comment">/** 禁止调整窗口大小 */</span>
  <span class="hljs-attr">DISABLED</span>: <span class="hljs-number">0</span>,
  <span class="hljs-comment">/** 允许调整窗口大小，允许最大化（默认）*/</span>
  <span class="hljs-attr">RESIZE</span>: <span class="hljs-number">1</span>,
  <span class="hljs-comment">/** 只允许调整窗口大小 */</span>
  <span class="hljs-attr">RESIZE_ONLY</span>: <span class="hljs-number">2</span>,
}
</code><button type="button" class="doc-copy-btn" title="复制"/></pre>
<ul class="doc-ul">
<li>默认值：<code>RESIZE_MODE.REISZE</code></li>
<li>描述：窗口调整模式。如果需要禁止窗口最大化，请将该参数设置为<code>RESIZE_MODE.RESIZE_ONLY</code></li>
</ul>
<pre v-pre class="hljs" language="typescript"><code class="hljs-code"><span class="hljs-keyword">import</span> { useSimpleWindow, <span class="hljs-variable constant_">RESIZE_MODE</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@dongls/xwindow&#x27;</span>

<span class="hljs-title function_">useSimpleWindow</span>(<span class="hljs-string">&#x27;标题&#x27;</span>, <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>窗体<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>, { <span class="hljs-attr">resizeMode</span>: <span class="hljs-variable constant_">RESIZE_MODE</span>.<span class="hljs-property">RESIZE_ONLY</span> })
</code><button type="button" class="doc-copy-btn" title="复制"/></pre>
<h3>draggable</h3>
<ul class="doc-ul">
<li>类型：<code>false | number</code></li>
<li>默认值：<code>32</code></li>
<li>描述：窗口是否可拖拽。
<ul class="doc-ul">
<li>如果值为数字, 则用于指定可拖动区域的高度，单位为<code>px</code></li>
<li>如果值为<code>false</code>则禁止窗口拖动</li>
</ul>
</li>
</ul>
<h3>closeable</h3>
<ul class="doc-ul">
<li>类型：<code>boolean</code></li>
<li>默认值：<code>true</code></li>
<li>描述：是否可关闭窗口</li>
</ul>
<h3>pinnable</h3>
<ul class="doc-ul">
<li>类型：<code>boolean</code></li>
<li>默认值：<code>true</code></li>
<li>描述：是否允许固定窗口</li>
</ul>
<h3>mask</h3>
<ul class="doc-ul">
<li>类型：<code>boolean</code></li>
<li>默认值：<code>false</code></li>
<li>描述：是否包含遮罩层</li>
</ul>
<h3>teleport</h3>
<ul class="doc-ul">
<li>类型：<code>string | false</code></li>
<li>默认值：<code>body</code></li>
<li>描述：窗口插入的位置，值为<code>false</code>禁用此行为。该参数的用法，请参照<a href="https://cn.vuejs.org/guide/built-ins/teleport.html" target="_blank">Teleport</a>组件的<code>to</code>属性。</li>
</ul>
<h3>displayAfterCreate</h3>
<ul class="doc-ul">
<li>类型：<code>boolean</code></li>
<li>默认值：<code>true</code></li>
<li>描述：创建后立即显示窗口</li>
</ul>
<h3>destroyAfterClose</h3>
<ul class="doc-ul">
<li>类型：<code>boolean</code></li>
<li>默认值：<code>true</code></li>
<li>描述：关闭后销毁窗口</li>
</ul>
<h3>closeOnPressEsc</h3>
<ul class="doc-ul">
<li>类型：<code>boolean</code></li>
<li>默认值：<code>true</code></li>
<li>描述：按<code>Esc</code>键关闭窗口</li>
</ul>
<h2 class="head-anchor article-sticky-heading" id="窗口事件">窗口事件</h2>
<hr>
<p>可在窗口实例上监听事件，例如：</p>
<pre v-pre class="hljs" language="typescript"><code class="hljs-code"><span class="hljs-keyword">import</span> { useSimpleWindow } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@dongls/xwindow&#x27;</span>

<span class="hljs-keyword">const</span> instance = <span class="hljs-title function_">useSimpleWindow</span>(<span class="hljs-string">&#x27;标题&#x27;</span>, <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>窗体<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>)

<span class="hljs-comment">// 所有事件的类型都为WindowEvent</span>
instance.<span class="hljs-title function_">on</span>(<span class="hljs-string">&#x27;created&#x27;</span>, <span class="hljs-function"><span class="hljs-params">event</span> =&gt;</span> <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(event))
instance.<span class="hljs-title function_">on</span>(<span class="hljs-string">&#x27;close&#x27;</span>, <span class="hljs-function"><span class="hljs-params">event</span> =&gt;</span> <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(event))

<span class="hljs-comment">// 事件对象</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">WindowEvent</span>&lt;T = <span class="hljs-title class_">AbstractWindow</span>, P = <span class="hljs-built_in">any</span>&gt; {
  <span class="hljs-comment">/** 事件类型 */</span>
  <span class="hljs-attr">type</span>: <span class="hljs-title class_">EventType</span>;
  <span class="hljs-comment">/** 事件是否被阻止继续执行 */</span>
  <span class="hljs-attr">stopped</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-comment">/** 是否已取消默认行为 */</span>
  <span class="hljs-attr">defaultPrevented</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-comment">/** 事件触发窗口实例 */</span>
  <span class="hljs-attr">instance</span>: T;
  <span class="hljs-comment">/** 事件的参数 */</span>
  detail?: P;
  <span class="hljs-comment">/** 阻止事件继续执行 */</span>
  <span class="hljs-title function_">stop</span>(): <span class="hljs-built_in">void</span>;
  <span class="hljs-comment">/** 阻止事件默认行为 */</span>
  <span class="hljs-title function_">preventDefault</span>(): <span class="hljs-built_in">void</span>;
}
</code><button type="button" class="doc-copy-btn" title="复制"/></pre>
<p>所有窗口事件请参照以下表格。 如果需要取消事件默认行为，请调用传入事件的对象<code>event.preventDefault()</code>方法实现。</p>
<Events/>
<h2 class="head-anchor article-sticky-heading" id="窗口状态">窗口状态</h2>
<hr>
<p>窗口的状态信息，该对象为响应式对象，请谨慎修改。</p>
<pre v-pre class="hljs" language="typescript"><code class="hljs-code"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">WindowState</span> {
  <span class="hljs-comment">/** 是否显示窗口 */</span>
  <span class="hljs-attr">visible</span>: <span class="hljs-built_in">boolean</span>
  <span class="hljs-comment">/** 窗口实际宽度 */</span>
  <span class="hljs-attr">offsetWidth</span>: <span class="hljs-built_in">number</span>
  <span class="hljs-comment">/** 窗口实际高度 */</span>
  <span class="hljs-attr">offsetHeight</span>: <span class="hljs-built_in">number</span>
  <span class="hljs-comment">/** 窗口距容器顶部距离 */</span>
  <span class="hljs-attr">offsetTop</span>: <span class="hljs-built_in">number</span>
  <span class="hljs-comment">/** 窗口距容器左侧距离 */</span>
  <span class="hljs-attr">offsetLeft</span>: <span class="hljs-built_in">number</span>
  <span class="hljs-comment">/** 窗口是否聚焦 */</span>
  <span class="hljs-attr">focused</span>: <span class="hljs-built_in">boolean</span>
  <span class="hljs-comment">/** 窗口是否被固定 */</span>
  <span class="hljs-attr">pinned</span>: <span class="hljs-built_in">boolean</span>
  <span class="hljs-comment">/** 窗口层级 */</span>
  <span class="hljs-attr">zIndex</span>: <span class="hljs-built_in">number</span>
  <span class="hljs-comment">/** 窗口分割状态 */</span>
  <span class="hljs-attr">splitMode</span>: <span class="hljs-built_in">number</span>
}
</code><button type="button" class="doc-copy-btn" title="复制"/></pre>
<h2 class="head-anchor article-sticky-heading" id="窗口实例">窗口实例</h2>
<hr>
<p>窗口实例都是<code>AbstractWindow</code>对象，你可以通过窗口实例操作窗口行为。可以通过以下几种方式获取到窗口实例：</p>
<pre v-pre class="hljs" language="typescript"><code class="hljs-code"><span class="hljs-keyword">import</span> { defineComponent } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vue&#x27;</span>
<span class="hljs-keyword">import</span> { useSimpleWindow, useWindowApi } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@dongls/xwindow&#x27;</span>

<span class="hljs-comment">// 函数式API的返回值就是一个窗口实例</span>
<span class="hljs-keyword">const</span> instance = <span class="hljs-title function_">useSimpleWindow</span>(<span class="hljs-string">&#x27;标题&#x27;</span>, <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>窗体<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>)

<span class="hljs-comment">// 可以在窗体组件中获取窗口实例</span>
<span class="hljs-keyword">const</span> <span class="hljs-title class_">WindowBody</span> = <span class="hljs-title function_">defineComponent</span>({
  <span class="hljs-title function_">setup</span>(<span class="hljs-params"></span>){
    <span class="hljs-keyword">const</span> instance = <span class="hljs-title function_">useWindowApi</span>()
    <span class="hljs-keyword">return</span> {}
  }
})

<span class="hljs-comment">// 可以通过函数返回窗体，窗口实例会作为参数传入</span>
<span class="hljs-title function_">useSimpleWindow</span>(<span class="hljs-string">&#x27;标题&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">instance</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>窗体<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
})
</code><button type="button" class="doc-copy-btn" title="复制"/></pre>
<p>有关<code>AbstractWindow</code>的说明，请参照以下类型定义：</p>
<pre v-pre class="hljs" language="typescript"><code class="hljs-code"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">ComponentApi</span> {
  <span class="hljs-comment">/** 获取窗口顶层DOM对象 */</span>
  <span class="hljs-title function_">getElement</span>(): <span class="hljs-title class_">HTMLElement</span> | <span class="hljs-literal">undefined</span>
  <span class="hljs-comment">/** 获取组件当前渲染状态 */</span>
  <span class="hljs-title function_">getRenderState</span>(): <span class="hljs-built_in">number</span>
  <span class="hljs-comment">/** 获取组件样式 */</span>
  <span class="hljs-title function_">useCssClass</span>(): <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>&gt;
  <span class="hljs-comment">/** 获取窗口菜单 */</span>
  <span class="hljs-title function_">useMenus</span>(): <span class="hljs-title class_">ComputedRef</span>&lt;<span class="hljs-built_in">number</span>[]&gt;
}

<span class="hljs-keyword">class</span> <span class="hljs-title class_">Emitter</span>&lt;T = <span class="hljs-built_in">any</span>&gt; {
  <span class="hljs-comment">/** 监听事件 */</span>
  <span class="hljs-title function_">on</span>(<span class="hljs-attr">type</span>: <span class="hljs-title class_">EventType</span>, <span class="hljs-attr">listener</span>: <span class="hljs-title class_">EventListener</span>&lt;T&gt;): <span class="hljs-variable language_">this</span>
  <span class="hljs-comment">/** 监听事件，仅生效一次 */</span>
  <span class="hljs-title function_">once</span>(<span class="hljs-attr">type</span>: <span class="hljs-title class_">EventType</span>, <span class="hljs-attr">listener</span>: <span class="hljs-title class_">EventListener</span>&lt;T&gt;): <span class="hljs-variable language_">this</span>
  <span class="hljs-comment">/** 取消事件监听 */</span>
  <span class="hljs-title function_">off</span>(<span class="hljs-attr">type</span>: <span class="hljs-title class_">EventType</span>, <span class="hljs-attr">listener</span>: <span class="hljs-title class_">EventListener</span>&lt;T&gt;, delay?: <span class="hljs-built_in">boolean</span>): <span class="hljs-variable language_">this</span>
  <span class="hljs-comment">/** 触发一个事件 */</span>
  <span class="hljs-title function_">dispatch</span>(<span class="hljs-attr">event</span>: <span class="hljs-title class_">WindowEvent</span>): <span class="hljs-title class_">WindowEvent</span>&lt;<span class="hljs-built_in">any</span>, <span class="hljs-built_in">any</span>&gt;
  <span class="hljs-comment">/** 清空所有事件监听函数 */</span>
  <span class="hljs-title function_">cleanup</span>(): <span class="hljs-built_in">void</span>
}

<span class="hljs-keyword">class</span> <span class="hljs-title class_">AbstractWindow</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_ inherited__">Emitter</span>&lt;<span class="hljs-title class_">AbstractWindow</span>&gt; {
  <span class="hljs-comment">/** 窗口id，自动生成 */</span>
  <span class="hljs-keyword">readonly</span> <span class="hljs-attr">id</span>: <span class="hljs-built_in">number</span>
  <span class="hljs-comment">/** 窗口类型 */</span>
  <span class="hljs-attr">type</span>: <span class="hljs-title class_">WindowType</span>
  <span class="hljs-comment">/** 窗口选项 */</span>
  <span class="hljs-attr">options</span>: <span class="hljs-title class_">WindowOptions</span>
  <span class="hljs-comment">/** 窗体内容 */</span>
  body?: <span class="hljs-title class_">WindowBody</span>
  <span class="hljs-comment">/** 窗口状态，组件挂载后可用 */</span>
  <span class="hljs-attr">state</span>: <span class="hljs-title class_">WindowState</span> | <span class="hljs-literal">null</span>
  <span class="hljs-comment">/** 是否创建窗口 */</span>
  <span class="hljs-attr">created</span>: <span class="hljs-built_in">boolean</span>
  <span class="hljs-comment">/** 窗口是否被销毁 */</span>
  <span class="hljs-attr">destroyed</span>: <span class="hljs-built_in">boolean</span>
  <span class="hljs-comment">/** 组件API, 组件挂载后可用 */</span>
  <span class="hljs-attr">component</span>: <span class="hljs-title class_">ComponentApi</span> | <span class="hljs-literal">null</span> | <span class="hljs-literal">undefined</span>

  <span class="hljs-comment">/** 窗口组件根元素的id */</span>
  <span class="hljs-keyword">get</span> <span class="hljs-title function_">wid</span>(): <span class="hljs-built_in">string</span>
  <span class="hljs-comment">/** 窗口组件是否已创建 */</span>
  <span class="hljs-keyword">get</span> <span class="hljs-title function_">isReady</span>(): <span class="hljs-built_in">boolean</span>
  <span class="hljs-comment">/** 是否允许窗口拖拽 */</span>
  <span class="hljs-keyword">get</span> <span class="hljs-title function_">allowDrag</span>(): <span class="hljs-built_in">boolean</span>
  <span class="hljs-comment">/** 顶部可拖拽区域，默认只有顶部32px以内可以拖动 */</span>
  <span class="hljs-keyword">get</span> <span class="hljs-title function_">allowDragArea</span>(): <span class="hljs-built_in">number</span>
  <span class="hljs-comment">/** 窗口是否已最大化 */</span>
  <span class="hljs-keyword">get</span> <span class="hljs-title function_">isMaximize</span>(): <span class="hljs-built_in">boolean</span>

  <span class="hljs-comment">/** 创建一个事件对象 */</span>
  <span class="hljs-title function_">createEvent</span>(<span class="hljs-attr">type</span>: <span class="hljs-title class_">EventType</span>): <span class="hljs-title class_">WindowEvent</span>&lt;<span class="hljs-variable language_">this</span>, <span class="hljs-built_in">any</span>&gt;
  <span class="hljs-comment">/** 等待窗口组件创建完成 */</span>
  <span class="hljs-title function_">ready</span>(): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">unknown</span>&gt;
  <span class="hljs-comment">/** 显示窗口 */</span>
  <span class="hljs-title function_">show</span>(): <span class="hljs-built_in">void</span>
  <span class="hljs-comment">/**
   * 关闭窗口
   * <span class="hljs-doctag">@param</span> {<span class="hljs-type">boolean</span>} <span class="hljs-variable">forced</span> - 是否强制关闭窗口
   */</span>
  <span class="hljs-title function_">close</span>(forced?: <span class="hljs-built_in">boolean</span>): <span class="hljs-built_in">boolean</span>
  <span class="hljs-comment">/** 销毁窗口 */</span>
  <span class="hljs-title function_">destroy</span>(): <span class="hljs-built_in">void</span>
  <span class="hljs-comment">/** 获取窗口根元素 */</span>
  <span class="hljs-title function_">getElement</span>(): <span class="hljs-title class_">HTMLElement</span> | <span class="hljs-literal">undefined</span>
  <span class="hljs-comment">/** 获取窗口菜单，返回菜单类型数组 */</span>
  <span class="hljs-title function_">useMenus</span>(): <span class="hljs-title class_">ComputedRef</span>&lt;<span class="hljs-built_in">number</span>[]&gt;
  <span class="hljs-comment">/** 窗口聚焦 */</span>
  <span class="hljs-title function_">focus</span>(): <span class="hljs-built_in">void</span>
  <span class="hljs-comment">/** 切换窗口最大化 */</span>
  <span class="hljs-title function_">toggleMaximize</span>(): <span class="hljs-built_in">void</span>
  <span class="hljs-comment">/** 固定窗口 */</span>
  <span class="hljs-title function_">pin</span>(): <span class="hljs-built_in">void</span>
  <span class="hljs-comment">/** 取消窗口固定 */</span>
  <span class="hljs-title function_">unpin</span>(): <span class="hljs-built_in">void</span>
  <span class="hljs-comment">/** 切换窗口的固定状态 */</span>
  <span class="hljs-title function_">togglePin</span>(): <span class="hljs-built_in">void</span>
  <span class="hljs-comment">/** 注册事件处理函数, 用于窗口和组件之间的交互 */</span>
  <span class="hljs-title function_">useHandle</span>(<span class="hljs-attr">type</span>: <span class="hljs-title class_">HandlerType</span>, <span class="hljs-attr">callback</span>: <span class="hljs-title class_">Function</span>): <span class="hljs-built_in">void</span>
  <span class="hljs-comment">/** 调用注册的confirm钩子并关闭窗口 */</span>
  <span class="hljs-title function_">dispatchConfirm</span>(): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt;
  <span class="hljs-comment">/** 确认并关闭窗口 */</span>
  <span class="hljs-title function_">confirm</span>(data?: <span class="hljs-built_in">any</span>): <span class="hljs-built_in">void</span>
  <span class="hljs-comment">/**  调用注册的cancel钩子并关闭窗口 */</span>
  <span class="hljs-title function_">dispatchCancel</span>(): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt;
  <span class="hljs-comment">/** 取消并关闭窗口 */</span>
  <span class="hljs-title function_">cancel</span>(forced?: <span class="hljs-built_in">boolean</span>, data?: <span class="hljs-built_in">any</span>): <span class="hljs-built_in">void</span>
  <span class="hljs-comment">/** 将处理confirm和cancel钩子的逻辑通过Promise对象封装*/</span>
  <span class="hljs-title function_">promisify</span>()
}
</code><button type="button" class="doc-copy-btn" title="复制"/></pre>`,kt=e("colgroup",null,[e("col",{width:"160"}),e("col",{width:"150"})],-1),It=e("thead",null,[e("tr",null,[e("th",null,"事件"),e("th",null,"默认行为"),e("th",null,"说明")])],-1),Ct={__name:"Events",setup(a){const s=[{type:"created",desc:"窗口组件创建时触发"},{type:"beforeShow",prevent:"可阻止窗口显示",desc:"窗口显示前触发"},{type:"show",desc:"窗口显示后触发"},{type:"beforeClose",prevent:"可阻止窗口关闭",desc:"窗口关闭前触发"},{type:"close",desc:"窗口关闭时触发"},{type:"beforeDestroy",desc:"窗口销毁前触发"},{type:"dragStart",prevent:"可阻止窗口拖动",desc:"窗口开始拖动时触发"},{type:"dragging",desc:"窗口拖动时触发"},{type:"dragEnd",desc:"窗口拖动结束时触发"},{type:"resizeStart",prevent:"可阻止窗口调整尺寸",desc:"窗口开始调整尺寸时触发"},{type:"resizing",desc:"窗口调整尺寸时触发"},{type:"resizeEnd",desc:"窗口结束调整尺寸时触发"},{type:"maximizeChange",desc:"窗口最大化状态改变时触发"},{type:"confirm",desc:"调用窗口的confirm方法后触发，可通过此事件返回窗体的内容"},{type:"cancel",desc:"调用窗口的cancel方法后触发"}];return(n,t)=>(W(),M("table",null,[kt,It,e("tbody",null,[(W(),M(D,null,rs(s,l=>e("tr",{key:l.prop},[e("td",null,z(l.type),1),e("td",null,z(l.prevent??"--"),1),e("td",null,z(l.desc),1)])),64))])]))}};function Ot(a){return typeof a=="function"||Object.prototype.toString.call(a)==="[object Object]"&&!ms(a)}function sn(a,s,n={}){n.height=n.height??"320px";const t={default(l){return typeof s=="function"?s(l.abstractWindow):s},menus(l){return l.abstractWindow.useMenus().value.map(c=>Js.renderMenu(l.abstractWindow,c))}};return Gs(a,p(Qs,null,Ot(t)?t:{default:()=>[t]}),n)}function St(){const a={mask:!0,resizeMode:S.DISABLED};return sn("请输入审批意见",p(Ks,null,null),a).promisify()}const zt={class:"approval-output"},Rt=e("strong",null,"操作结果：",-1),Pt=I({__name:"UseExample",setup(a){const s=Y("");async function n(){const t=await St().catch(l=>(console.log(l),null));if(t==null){s.value="取消操作";return}s.value=t}return(t,l)=>(W(),M(D,null,[e("button",{type:"button",class:"btn btn-small",onClick:n},"审批"),e("div",zt,[s.value?(W(),M(D,{key:0},[Rt,e("pre",null,z(s.value),1)],64)):fs("",!0)])],64))}}),Lt=I({__name:"UseModal",setup(a){function s(){sn("窗口1",p("div",null,[b("内容")]))}return(n,t)=>(W(),M("button",{type:"button",class:"btn btn-small",onClick:s},"打开模态框"))}}),Nt=Object.freeze(Object.defineProperty({__proto__:null,Events:Ct,UseExample:Pt,UseModal:Lt},Symbol.toStringTag,{value:"Module"})),Bt=[{name:"简介",content:xt},{name:"快速开始",content:Et},{name:"进阶应用",content:Tt},{name:"API",content:Mt},{name:"示例",content:Wt}],ks=Bt.map((a,s)=>({id:s,...a})),At=["innerHTML"],Dt=e("span",null,"xWindow",-1),qt=["onClick"],Ht=e("span",null,"Copyright © 2023-present dongls",-1),Ft=[Ht],Vt=I({__name:"docs",setup(a){const s=Cs("classes"),n="11252044",t="0.2.7",l=0,o=ds(),c=na(),j=Y(ks[l]),_=Y();function F(g){g.stopPropagation()}function N(){var C;if(o==null)return null;const g=o.useMenus(),O=((C=o.component)==null?void 0:C.useCssClass())??{};return p("div",{class:s.menus,onMousedown:F},[p(vt,{menuClass:O.menu},null),p("button",{title:"GitHub",class:O.menu,onClick:T,innerHTML:Ca},null),g==null?void 0:g.value.map(R=>Js.renderMenu(o,R))])}function T(){window.open("https://github.com/dongls/xWindow")}function i(){const g=j.value.content,O={...ht,...Nt};return V("article",{class:"article",key:j.value.id},V({template:g,components:O}))}async function h(g){j.value=g,await js(),_.value&&(_.value.scrollTop=0)}function v(g){const O=g.target.closest("pre.hljs");if(O==null)return;const C=O.querySelector(":scope > code.hljs-code");if(C==null)return;const R=C.textContent;R!=null&&navigator.clipboard.writeText(R)}return(g,O)=>(W(),M("div",{class:y(g.classes.app)},[e("aside",{class:y(g.classes.aside)},[e("div",{class:y(g.classes.leftHeader)},[e("i",{class:y(g.classes.logo),innerHTML:E(c).IconWindow},null,10,At),e("h3",{class:y(g.classes.title)},[Dt,e("small",null,"v"+z(E(t))+"_"+z(E(n)),1)],2)],2),e("nav",{class:y([g.classes.navs,"is-scroll"])},[(W(!0),M(D,null,rs(E(ks),C=>(W(),M("div",{onClick:R=>h(C),class:y([g.classes.nav,C.id==j.value.id?g.classes.activeNav:null])},z(C.name),11,qt))),256))],2),e("div",{class:y(g.classes.copyright)},Ft,2)],2),e("main",{class:y(g.classes.main)},[e("div",{class:y(g.classes.rightHeader)},[p(N)],2),e("div",{class:y(g.classes.scroll),ref_key:"scroll",ref:_,onClick:un(v,["stop"])},[p(i,{class:y(g.classes.content)},null,8,["class"]),gs(g.$slots,"default",{ref:"tref"})],2)],2)],2))}}),$t="Cs1eNLRW",Xt="mkQVrkEV",Ut="fxJePVAw mkQVrkEV",Gt="gW5FCXxJ mkQVrkEV",Zt="UCU4MEPE",Yt="wascU8g5",Jt="QVKApkXV",Kt="xQ7Xh7bM",Qt="LhDQ3ctB",sl="_7RZWnCfQ",nl="_95hpDEbG",al="cXaxwh5B",tl="_2dkZEz4e",ll="_6qjvpjzC",el="qSce7387",ol={app:$t,header:Xt,leftHeader:Ut,rightHeader:Gt,menus:Zt,aside:Yt,navs:Jt,nav:Kt,activeNav:Qt,main:sl,content:nl,scroll:al,copyright:tl,logo:ll,title:el},cl={classes:ol},il=_s(Vt,[["__cssModules",cl]]),pl=I({__name:"App",setup(a){let s=null;function n(){s&&s.close(),s=null}return Is(n),dn(()=>{s=Gs({closeable:!1,zIndex:999,width:"1280px",height:"900px",minWidth:1102,minHeight:480,body:p(il,null,null),title:"",className:"xwindow-doc"})}),(t,l)=>{const o=jn("WindowManager");return W(),hn(o)}}}),nn=gn(pl);nn.use(ka);nn.mount("#app");
