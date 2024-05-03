var sn=Object.defineProperty;var nn=(t,s,n)=>s in t?sn(t,s,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[s]=n;var u=(t,s,n)=>(nn(t,typeof s!="symbol"?s+"":s,n),n);import{d as O,c as G,h as $,s as tn,r as is,a as J,p as an,b as r,T as Os,i as ns,n as gs,e as Es,f as ln,o as Ls,g as en,j as C,k as S,l as y,t as N,m as e,F as V,u as Rs,q as _,v as T,w as F,x as Q,y as rs,z as on,A as js,B as ws,C as fs,D as Ts,E as cn,G as pn,H as rn,I as un,J as dn}from"./vendor-79HxGn9k.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))a(l);new MutationObserver(l=>{for(const o of l)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function n(l){const o={};return l.integrity&&(o.integrity=l.integrity),l.referrerPolicy&&(o.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?o.credentials="include":l.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(l){if(l.ep)return;l.ep=!0;const o=n(l);fetch(l.href,o)}})();const hn="0.1.0",Is=Symbol(),ss=Object.freeze({WINDOW:"x-window",TRANSITION:"x-window-is-transition",MENU:"x-window-is-menu"}),b=Object.freeze({NONE:0,TOP:1,BOTTOM:2,LEFT:4,RIGHT:8}),D=Object.freeze({TOP:b.TOP,BOTTOM:b.BOTTOM,LEFT:b.LEFT,RIGHT:b.RIGHT,TOP_LEFT:b.TOP|b.LEFT,TOP_RIGHT:b.TOP|b.RIGHT,BOTTOM_LEFT:b.BOTTOM|b.LEFT,BOTTOM_RIGHT:b.BOTTOM|b.RIGHT}),i=Object.freeze({NONE:b.NONE,FULLSCREEN:b.TOP,LEFT:b.LEFT,RIGHT:b.RIGHT,TOP_LEFT:b.TOP|b.LEFT,TOP_RIGHT:b.TOP|b.RIGHT,BOTTOM_LEFT:b.BOTTOM|b.LEFT,BOTTOM_RIGHT:b.BOTTOM|b.RIGHT}),P=Object.freeze({DISABLED:0,RESIZE:1,RESIZE_ONLY:2}),X=Object.freeze({INIT:0,MOUNTED:1,UNMOUNTED:2}),jn=Object.freeze({SIMPLE_WINDOW:"SimpleWindow",BLANK_WINDOW:"BlankWindow"}),B=Object.freeze({CLOSE:0,FULLSCREEN:1,RESTORE:2,PIN:3,UNPIN:4});class bs{constructor(s,n,a){u(this,"type");u(this,"stopped",!1);u(this,"defaultPrevented",!1);u(this,"instance");u(this,"detail");this.type=s,this.instance=n,this.detail=a}stop(){this.stopped=!0}preventDefault(){this.defaultPrevented=!0}}class cs{constructor(){u(this,"ALL_EVENTS",new Map)}static NOOP(){}on(s,n){const a=this.ALL_EVENTS.get(s);return a==null?(this.ALL_EVENTS.set(s,[n]),this):a.includes(n)?this:(a.push(n),this)}once(s,n){const a=l=>{n(l),this.off(s,a,!0)};return this.on(s,a),this}off(s,n,a=!1){const l=this.ALL_EVENTS.get(s);if(l==null)return this;const o=l.indexOf(n);return o<0?this:(a?l.splice(o,1,cs.NOOP):l.splice(o,1),this)}dispatch(s){const n=this.ALL_EVENTS.get(s.type);if(n==null)return s;for(const l of n)if(typeof l=="function"&&l(s),s.stopped)break;const a=n.filter(l=>l!=cs.NOOP);return this.ALL_EVENTS.set(s.type,a),s}cleanup(){this.ALL_EVENTS.clear()}}function I(t,s,n){return s!=null&&Number.isFinite(s)&&t<s?s:n!=null&&Number.isFinite(n)&&t>n?n:t}function Ws(t){return t==null||typeof t!="string"?!0:t.length==0}function gn(t){return t==null||typeof t!="string"?!1:t.length!=0}function fn(t){t.stopPropagation()}const mn={top:"offsetTop",left:"offsetLeft",width:"offsetWidth",height:"offsetHeight"};class wn{constructor(s){u(this,"init",!1);u(this,"defaultPrevented",!1);u(this,"originalEvent");u(this,"target");u(this,"direction");this.originalEvent=s,this.target=s.target,this.direction=Reflect.get(this.target,us.PROP)}createEvent(s,n){return new bs(s,n,this)}}class us{constructor(s){u(this,"context");u(this,"window");u(this,"onResizing");u(this,"onResizeend");this.window=s}resizestart(s){s.stopPropagation(),s.preventDefault();const n=new wn(s);this.context=n,this.onResizing=this.resizing.bind(this),this.onResizeend=this.resizeend.bind(this),window.addEventListener("pointermove",this.onResizing),window.addEventListener("pointerup",this.onResizeend)}resizing(s){if(this.context==null)return;s.stopPropagation(),s.preventDefault();const n=this.context;if(!n.init){if(this.window.dispatch(this.context.createEvent("resizeStart",this.window)).defaultPrevented)return this.cleanup();n.target.setPointerCapture(s.pointerId),n.init=!0}const a=this.calcWindowState(s),l=this.window.getElement();for(const c in a){const g=Math.round(a[c]);Reflect.set(l.style,c,g+"px")}n.originalEvent=s;const o=this.context.createEvent("resizing",this.window);this.window.dispatch(o)}resizeend(s){if(this.context==null)return;s.stopPropagation(),s.preventDefault();const n=this.context;if(n.init){const a=n.createEvent("resizeEnd",this.window);this.window.dispatch(a),this.patchWindowState(this.calcWindowState(s)),n.target.releasePointerCapture(s.pointerId)}this.cleanup()}cleanup(){this.onResizing&&window.removeEventListener("pointermove",this.onResizing),this.onResizeend&&window.removeEventListener("pointerup",this.onResizeend),this.onResizing=void 0,this.onResizeend=void 0,this.context=void 0}calcWindowState(s){const n=this.context,a=this.window.options,l=typeof a.minWidth=="number"&&a.minWidth>=0?a.minWidth:360,o=typeof a.minHeight=="number"&&a.minHeight>=0?a.minHeight:32,c=this.window.getElement().getBoundingClientRect(),g=document.documentElement.getBoundingClientRect(),f={};if(n.direction&b.TOP){const x=I(c.bottom-I(s.clientY,0),o),M=I(s.clientY-g.top,0,window.innerHeight-x);f.height=x,f.top=M}if(n.direction&b.BOTTOM){const x=I(I(s.clientY,0,window.innerHeight)-c.top,o),M=I(s.clientY-x-g.top,0,window.innerHeight-x);f.height=x,f.top=M}if(n.direction&b.LEFT){const x=I(c.right-I(s.clientX,0),l,window.innerWidth),M=I(s.clientX-g.left,0,window.innerWidth-x);f.width=x,f.left=M}if(n.direction&b.RIGHT){const x=I(I(s.clientX,0)-c.left,l,window.innerWidth),M=I(s.clientX-x-g.left,0,window.innerWidth-x-0);f.width=x,f.left=M}return f}patchWindowState(s){const n=this.window.state;for(const a in s){const l=Math.round(s[a]),o=mn[a];o!=null&&Reflect.set(n,o,l)}}}u(us,"PROP","__xwindow_resize_prop__");const bn="_1T2rhwiL",yn="yi9w1sZD",_n="Ja2o9U31",vn="vD5RQghg",xn="_3czvPpS2",En="GiVk7T8N",Tn="VuG4WNig x-window-is-menu",Wn="yBPezU8e",kn="xbuRK23n",Cn="_9t1NJBZM",Sn="shyxrRzw",Mn="nkEGqTFw",On="pk12TusX",Ln="noixF94i",Rn="ifXDegN1 VuG4WNig x-window-is-menu",In="X5A6roxN VuG4WNig x-window-is-menu",Pn="PPmfTMRL",Nn="v8UGXgKi PPmfTMRL",zn="_74VJ9GNt PPmfTMRL",Bn="gg9Mcwey PPmfTMRL",An="Tw7sCaLt PPmfTMRL",Fn="CPuApFyD PPmfTMRL",qn="VBRi4FWg PPmfTMRL",Dn="gCRpuZdB PPmfTMRL",Hn="iRYpNoUT PPmfTMRL",$n="xTcKGSVA",W={window:bn,dragging:yn,resizing:_n,fullscreen:vn,focused:xn,header:En,menu:Tn,logo:Wn,main:kn,init:Cn,title:Sn,menus:Mn,body:On,footer:Ln,closeMenu:Rn,pinMenu:In,resizeBar:Pn,resizeTop:Nn,resizeBottom:zn,resizeRight:Bn,resizeLeft:An,resizeTopLeft:Fn,resizeBottomLeft:qn,resizeTopRight:Dn,resizeBottomRight:Hn,mask:$n},Vn=O({name:"WindowBody",props:{wid:String,body:{type:[Object,Function,String,Number],default:null},abstractWindow:{type:Object,required:!0}},setup(t){return function(){const s=typeof t.body=="function"?t.body(t.abstractWindow):t.body;return s==null&&console.warn("[xWindow] 请指定窗体内容:",t.abstractWindow.options.title),s}}}),Un=Math.floor(Number.MAX_SAFE_INTEGER/10)-1e4;function Gn(){return{visible:!1,offsetWidth:0,offsetHeight:0,offsetTop:0,offsetLeft:0,focused:!1,pinned:!1,zIndex:0,splitMode:i.NONE}}const Xn=[[W.resizeTop,D.TOP],[W.resizeBottom,D.BOTTOM],[W.resizeLeft,D.LEFT],[W.resizeRight,D.RIGHT],[W.resizeTopLeft,D.TOP_LEFT],[W.resizeTopRight,D.TOP_RIGHT],[W.resizeBottomLeft,D.BOTTOM_LEFT],[W.resizeBottomRight,D.BOTTOM_RIGHT]];function Zn(t,s,n,a){return G(()=>{const l=t.options;if(s.value==X.INIT)return{width:l.width,height:l.height,left:l.left,top:l.top};const o=l.mask?null:a.value;return{top:n.offsetTop+"px",left:n.offsetLeft+"px",width:n.offsetWidth+"px",height:s.value==X.INIT?void 0:n.offsetHeight+"px",zIndex:o}})}function Yn(t,s){return t==P.DISABLED?null:Xn.map(n=>$("div",{["."+us.PROP]:n[1],className:n[0],onPointerdown:s}))}function Jn(t){return typeof t=="function"||Object.prototype.toString.call(t)==="[object Object]"&&!ns(t)}const K=O({name:"BlankWindow",props:{abstractWindow:{type:Object,required:!0}},setup(t,{slots:s}){const n=tn(),a=is(Gn()),l=J(X.INIT),o=G(()=>{const d=t.abstractWindow.options;return typeof d.zIndex=="number"&&d.zIndex>0}),c=G(()=>{const d=t.abstractWindow.options;return o.value?d.zIndex:(a.pinned?Un:0)+a.zIndex}),g=Zn(t.abstractWindow,l,a,c),f=G(()=>{const d=[ss.WINDOW,W.window],w=t.abstractWindow;return l.value==X.INIT&&d.push(W.init),a.splitMode==i.FULLSCREEN&&d.push(W.fullscreen),a.focused&&d.push(W.focused),gn(w.options.className)&&d.push(w.options.className),d}),x=G(()=>{const d=[],E=t.abstractWindow.options;return E.pinnable&&E.mask!==!0&&o.value!==!0&&d.push(a.pinned?B.PIN:B.UNPIN),E.resizeMode==P.RESIZE&&d.push(a.splitMode==i.FULLSCREEN?B.RESTORE:B.FULLSCREEN),E.closeable&&d.push(B.CLOSE),d}),M={getElement:k,getRenderState:p,useCssClass:h,useMenus:R};function k(){return n.value}function p(){return l.value}function h(){return W}async function v(d){d==null||d.preventDefault(),t.abstractWindow.toggleFullscreen()}function j(){JSON.parse(JSON.stringify(a))}function R(){return x}function L(d){const w=Array.from(d.querySelectorAll("[autofocus]"));for(const E of w)if(E instanceof HTMLElement&&E.autofocus)return E.focus()}async function z(d){await gs();const w=t.abstractWindow,E=w.options,es=d.el,q=es.getBoundingClientRect();if(l.value==X.INIT){let os=Math.round(q.left),A=Math.round(q.top);Ws(E.left)&&(os=Math.floor((window.innerWidth-q.width)/2)),Ws(E.top)&&(A=Math.floor((window.innerHeight-q.height)/2)),a.offsetWidth=q.width,a.offsetHeight=q.height,a.offsetLeft=os,a.offsetTop=A,E.fullscreen&&v(),l.value=X.MOUNTED,j(),gs(()=>{const hs=w.createEvent("show");w.dispatch(hs),L(es)})}w.focus()}function ts(d){const w=t.abstractWindow;w.focus(),!(!w.allowDrag||w.isFullscreen)&&w.dragstart(d)}function as(d){const w=k();if(w==null)return;const E=w.getBoundingClientRect();d.clientY-E.top>t.abstractWindow.allowDragArea||v(d)}function ls(){const d=t.abstractWindow;d.component=M,d.state=a,lt(d.id,d);const w=d.createEvent("created");d.dispatch(w)}return an(Is,t.abstractWindow),ls(),function(){const d=t.abstractWindow,w=d.options;if(a.visible!==!0)return null;const E=typeof s.header=="function"?s.header(M):null,es=r("div",{class:W.main,onDblclick:as},[E,r("div",{class:[W.body,w.bodyClassName]},[r(Vn,{body:d.body,abstractWindow:t.abstractWindow,key:d.wid},null)])]),q={ref:n,id:d.wid,onVnodeMounted:z,onPointerdown:ts,class:f.value,style:g.value},os=Yn(w.resizeMode,d.resizestart);let A=$("div",q,[es,os]);if(w.mask===!0){const hs={zIndex:c.value};A=r("div",{class:W.mask,style:hs},[A])}return w.teleport===!1?A:r(Os,{to:w.teleport},Jn(A)?A:{default:()=>[A]})}}}),Ps='<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M590.265 511.987l305.521-305.468c21.617-21.589 21.617-56.636.027-78.252-21.616-21.617-56.663-21.617-78.279 0L512.012 433.735 206.544 128.213c-21.617-21.617-56.635-21.617-78.252 0-21.616 21.589-21.616 56.635-.027 78.252L433.76 511.987 128.211 817.482c-21.617 21.59-21.617 56.635 0 78.251 10.808 10.81 24.967 16.213 39.125 16.213 14.159 0 28.318-5.403 39.126-16.213l305.522-305.468L817.48 895.788C828.289 906.597 842.447 912 856.606 912s28.317-5.403 39.125-16.212c21.618-21.59 21.618-56.636.028-78.252L590.265 511.987z"/></svg>',Ns='<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5228" width="64" height="64"><path d="M97.74775349 97.74775349h828.50449302v828.50449302H97.74775349V97.74775349z m103.56306133 103.56306133v621.37837036h621.37837036V201.31081482H201.31081482z" fill="currentColor"></path></svg>',zs='<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M38.794 124.791v778.495h946.412V124.791H38.794zm896.678 728.033H89.292v-460.9h846.18v460.9z"/></svg>',Bs='<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M738.793 681.382v-48.331l88.242-88.243a298.676 298.676 0 00156.712-83.482 38.836 38.836 0 000-54.923l-366.15-366.15a38.836 38.836 0 00-54.923 0 298.52 298.52 0 00-83.519 156.749l-88.169 88.169h-48.332a411.145 411.145 0 00-292.59 121.232c-15.16 15.159-15.16 39.764 0 54.923L278.906 690.17 86.642 882.436a38.836 38.836 0 1054.922 54.922l192.23-192.229 228.844 228.845a38.836 38.836 0 0054.922 0 411.042 411.042 0 00121.233-292.592zM134.02 435.44a333.473 333.473 0 01208.56-72.571l64.406.037a38.836 38.836 0 0027.461-11.351L544.292 241.71a38.68 38.68 0 0011.351-27.462 180.096 180.096 0 0136.798-89.01L898.8 431.593a180.925 180.925 0 01-89.12 36.835 38.836 38.836 0 00-27.462 11.35L672.373 589.626c-7.287 7.286-11.387 17.173-11.35 27.461l.036 64.406a333.318 333.318 0 01-72.608 208.596L134.021 435.44z"/></svg>',As='<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M845.40952426 212.52063539H65.21904746v702.17142826h780.1904768V212.52063539z m-702.17142933 624.1523808V290.53968285h624.1523808v546.13333334H143.23809493z" fill="currentColor"></path><path d="M981.53650809 76.3936505H201.34603129v78.01904746h702.17142933v624.15238187h78.01904747V76.3936505z" fill="currentColor"></path></svg>';function Kn(){return{IconClose:Ps,IconMax:Ns,IconPin:Bs,IconWindow:zs,IconRestore:As}}function Qn(t){return typeof t=="function"||Object.prototype.toString.call(t)==="[object Object]"&&!ns(t)}function st(t){const s=t.options.icon;return typeof s=="string"?r("i",{class:[W.logo,"icon",s]},null):ns(s)?s:typeof s=="function"?s(t):r("i",{class:W.logo,innerHTML:zs},null)}const ps=O({name:"SimpleWindow",props:{abstractWindow:{type:Object,required:!0}},setup(t){const s=t.abstractWindow,n={header(){const a=s.useMenus();return r("div",{class:W.header},[st(s),r("div",{class:W.title},[s.options.title??"新窗口"]),r("div",{class:W.menus,onMousedown:fn},[a.value.map(l=>Gs(s,l))])])}};return function(){return r(K,{abstractWindow:t.abstractWindow},Qn(n)?n:{default:()=>[n]})}}}),Fs=Object.freeze({SIMPLE_WINDOW:ps.name,BLANK_WINDOW:K.name});function qs(t){return t==K.name?K:ps}function Ds(t){if(t.key=="Escape")return Us({pressEsc:!0})}function nt(){m.isMounted=!0}function Hs(){m.isMounted=!1,m.topWindow=null,m.ids.value=[],m.stack.clear()}function $s(){return m.zIndex}function Vs(){return m.zIndex+=1}function tt(){const t=m.topWindow;return t?t.state.zIndex:1}function at(){return m.topWindow}function lt(t,s){m.stack.set(t,s)}function et(t){if(console.log("[xWindow]: remove window",t),!m.stack.has(t)||(m.stack.delete(t),!m.isMounted))return;const s=m.ids.value.indexOf(t);if(s<0)return;m.ids.value.splice(s,1)}function Us(t){if(m.stack.size==0||m.topWindow==null)return;const s=m.topWindow;(t==null?void 0:t.pressEsc)===!0&&s.options.closeOnPressEsc!==!0||m.topWindow.cancel(t==null?void 0:t.forced)}function ot(t){const s=document.createDocumentFragment(),n=qs(t.type),a=$(n,{abstractWindow:t});a.appContext=m.appContext,Es(a,s),document.body.appendChild(s),t.on("beforeDestroy",()=>{Es(null,s)})}function ct(t){const s=ms.create(t);return m.isMounted?(m.ids.value.push(s.id),m.stack.set(s.id,s),s):(ot(s),s)}function pt(t){return m.stack.get(t)}function it(){return m.ids}function ys(t){if(m.topWindow=t,t!=null){for(const s of m.stack.values()){const n=s.state;n!=null&&(n.focused=s===t)}t.state!=null&&t.state.zIndex<$s()&&(t.state.zIndex=Vs())}}function rt(t){const s=m.stack.get(t);ys(s)}function ut(){const t=dt();ys(t)}function dt(){if(m.stack.size==0)return;let t;for(const s of m.stack.values())if(!(s.state==null||s.state.visible!==!0)){if(t==null){t=s;continue}t.state.zIndex<s.state.zIndex&&(t=s)}return t}function ht(){return m.previewState}function jt(){return m.stack.size}function gt(){window.addEventListener("keydown",Ds,!0)}function ft(t){m.appContext=t._context}function mt(){m.appContext=null,Hs(),window.removeEventListener("keydown",Ds,!0)}function wt(){return{closeTopWindow:Us,getTopWindow:at,getTopZIndex:Vs,getWindowCount:jt,getZIndex:$s,setFocusedWindow:ys,cleanup:mt}}class bt{constructor(s,n){u(this,"moved",!1);u(this,"originalEvent");u(this,"target");u(this,"deltaX");u(this,"deltaY");u(this,"initialX");u(this,"initialY");u(this,"left",0);u(this,"top",0);u(this,"prevClientX");u(this,"prevClientY");const a=s.getBoundingClientRect();this.originalEvent=n,this.target=s,this.deltaX=a.left-n.clientX,this.deltaY=a.top-n.clientY,this.initialX=n.clientX,this.initialY=n.clientY,this.prevClientX=n.clientX,this.prevClientY=n.clientY}preventDragEvent(s){return!(this.moved||Math.abs(s.clientX-this.initialX)>4||Math.abs(s.clientY-this.initialY)>4)}createEvent(s,n){return new bs(s,n,this)}}class yt{constructor(s){u(this,"window");u(this,"context");u(this,"onDragging");u(this,"onDragend");this.window=s}static isConflict(s,n){const a=s.getBoundingClientRect(),l=n.getBoundingClientRect();return!(a.top>l.bottom||a.right<l.left||a.bottom<l.top||a.left>l.right)}static findElementsFromPoint(s,n,a,l){return typeof document.elementsFromPoint!="function"?[]:document.elementsFromPoint(s,n).filter(c=>l!=null&&!l.contains(c)?!1:typeof a=="string"?c.matches(a):!1)}dragstart(s){if(s.button!==0)return;const n=s.target;if(n instanceof Element&&n.closest("."+ss.MENU))return;const a=this.window.getElement();if(a==null)return;const l=a.getBoundingClientRect();s.clientY-l.top>this.window.allowDragArea||(s.preventDefault(),s.stopPropagation(),this.context=new bt(a,s),this.context.left=this.window.state.offsetLeft,this.context.top=this.window.state.offsetTop,this.onDragging=this.dragging.bind(this),this.onDragend=this.dragend.bind(this),window.addEventListener("pointermove",this.onDragging),window.addEventListener("pointerup",this.onDragend))}dragging(s){var o;if(this.context==null)return;const n=this.context;if(!n.moved){if(this.window.dispatch(this.context.createEvent("dragStart",this.window)).defaultPrevented)return this.cleanup();const g=(o=this.window.component)==null?void 0:o.useCssClass();g!=null&&g.dragging&&n.target.classList.add(g.dragging),n.target.setPointerCapture(s.pointerId),n.moved=!0}if(n.preventDragEvent(s))return;s.preventDefault(),s.stopPropagation(),n.originalEvent=s,n.left=Math.round(n.left+s.clientX-n.prevClientX),n.top=Math.round(n.top+s.clientY-n.prevClientY),n.prevClientX=s.clientX,n.prevClientY=s.clientY;const a=n.target;a.style.left=n.left+"px",a.style.top=n.top+"px";const l=this.context.createEvent("dragging",this.window);this.window.dispatch(l)}dragend(s){if(this.context==null||!this.context.moved)return this.cleanup();s.preventDefault(),s.stopPropagation();const n=this.context;n.originalEvent=s,n.target.releasePointerCapture(s.pointerId);const a=n.createEvent("dragEnd",this.window);this.window.dispatch(a),this.window.state.offsetTop=n.top,this.window.state.offsetLeft=n.left,this.cleanup()}cleanup(){var n,a;const s=(n=this.window.component)==null?void 0:n.useCssClass();s!=null&&s.dragging&&((a=this.context)==null||a.target.classList.remove(s.dragging)),this.onDragging&&window.removeEventListener("pointermove",this.onDragging),this.onDragend&&window.removeEventListener("pointerup",this.onDragend),this.onDragging=void 0,this.onDragend=void 0,this.context=void 0}}const Y=class Y extends cs{constructor(n){super();u(this,"CREATE_RESOLVE");u(this,"CREATE_REJECT");u(this,"id");u(this,"type");u(this,"options");u(this,"body");u(this,"state");u(this,"created",!1);u(this,"destroyed",!1);u(this,"component");u(this,"draggable");u(this,"resizable");u(this,"handles",{});u(this,"dragstart");u(this,"resizestart");this.type=n.type??jn.SIMPLE_WINDOW,this.options=this.createOptions(n),this.body=n.body,Reflect.defineProperty(this,"id",{enumerable:!0,configurable:!1,writable:!1,value:Y.seed++}),this.initDraggable(),this.initResizable(),this.initHooks()}static create(n){return n instanceof Y?n:new Y(n)}get wid(){return"window--"+this.id}get isReady(){return this.created===!0}get allowDrag(){const n=this.options.draggable;return n===!1?!1:typeof n=="number"?n>0:!0}get allowDragArea(){const n=this.options.draggable;return typeof n=="number"&&n>0?n:Z.draggaleHeight}get isFullscreen(){var n;return((n=this.state)==null?void 0:n.splitMode)===i.FULLSCREEN}createOptions(n){return{title:n.title??"未命名的窗口",icon:n.icon,className:n.className,bodyClassName:n.bodyClassName,width:n.width??"640px",minWidth:n.minWidth??360,maxWidth:n.maxWidth,height:n.height,minHeight:n.minHeight??32,maxHeight:n.maxHeight,top:n.top,left:n.left,zIndex:n.zIndex,fullscreen:n.fullscreen===!0,teleport:n.teleport??"body",draggable:n.draggable==null?!0:n.draggable,resizeMode:n.resizeMode??P.RESIZE,closeable:n.closeable!==!1,mask:n.mask===!0,pinnable:n.pinnable!==!1,displayAfterCreate:n.displayAfterCreate!==!1,destroyAfterClose:n.destroyAfterClose!==!1,closeOnPressEsc:n.closeOnPressEsc!==!1}}createEvent(n,a){return new bs(n,this,a)}initDraggable(){this.draggable=new yt(this),this.dragstart=this.draggable.dragstart.bind(this.draggable)}initResizable(){this.resizable=new us(this),this.resizestart=this.resizable.resizestart.bind(this.resizable)}initHooks(){this.once("created",()=>{this.created=!0,typeof this.CREATE_RESOLVE=="function"&&this.CREATE_RESOLVE(),delete this.CREATE_REJECT,delete this.CREATE_RESOLVE})}ready(){return this.created===!0?Promise.resolve():new Promise((n,a)=>{this.CREATE_RESOLVE=n,this.CREATE_REJECT=a})}show(){this.state==null||this.dispatch(this.createEvent("beforeShow")).defaultPrevented||(this.state.visible=!0)}close(n=!1){if(this.state==null||this.options.closeable===!1&&n!==!0)return!1;const a=this.dispatch(this.createEvent("beforeClose"));return n!==!0&&a.defaultPrevented?!1:(this.state.visible=!1,this.dispatch(this.createEvent("close")),this.state.focused&&setTimeout(ut),!this.destroyed&&this.options.destroyAfterClose!==!1&&this.destroy(),!0)}cleanup(){super.cleanup(),this.dragstart=void 0,this.resizestart=void 0,this.component=void 0,this.state=void 0,this.handles={}}destroy(){var n;this.destroyed=!0,((n=this.state)==null?void 0:n.visible)===!0&&this.close(),this.dispatch(this.createEvent("beforeDestroy")),et(this.id),this.cleanup()}getElement(){var n;return(n=this.component)==null?void 0:n.getElement()}useMenus(){return this.component.useMenus()}focus(){this.state==null||this.state.focused||rt(this.id)}startTransition(){const n=document.documentElement,a=function(l){l.target.matches("."+ss.WINDOW)&&(n.classList.remove(ss.TRANSITION),n.removeEventListener("transitionend",a))};n.classList.add(ss.TRANSITION),n.addEventListener("transitionend",a)}requestFullscreen(){const n=this.state;n==null||this.options.resizeMode!==P.RESIZE||(n.splitMode=i.FULLSCREEN,this.startTransition(),this.dispatch(this.createEvent("fullscreenChange")))}exitFullscreen(){const n=this.state;n==null||this.options.resizeMode!==P.RESIZE||(n.splitMode=i.NONE,this.startTransition(),this.dispatch(this.createEvent("fullscreenChange")))}toggleFullscreen(){const n=this.state;n==null||this.options.resizeMode!==P.RESIZE||(n.splitMode===i.FULLSCREEN?this.exitFullscreen():this.requestFullscreen())}pin(){const n=this.state;n!=null&&(n.pinned=!0)}unpin(){const n=this.state;n!=null&&(n.pinned=!1)}togglePin(){const n=this.state;n!=null&&(n.pinned?this.unpin():this.pin())}useHandle(n,a){this.handles[n]=a}async callHandle(n){const a=this.handles[n];if(typeof a=="function")return await a()}confirm(){return this.callHandle("confirm").then(n=>{this.dispatch(this.createEvent("confirm",n)),this.close(!0)})}cancel(n=!0){return this.callHandle("cancel").then(a=>{this.dispatch(this.createEvent("cancel",a)),this.close(n)})}};u(Y,"seed",1e3);let ms=Y;const ks=1e3,Z={},m=xt();function _t(t){return typeof t!="number"||!Number.isFinite(t)?ks:Math.floor(t)}function vt(t){Z.zIndex=_t(t==null?void 0:t.zIndex),Z.draggaleHeight=(t==null?void 0:t.draggaleHeight)??32,Z.size=(t==null?void 0:t.size)??{},m.zIndex=Z.zIndex}function ds(){return ln(Is)}function xt(){return{appContext:null,isMounted:!1,zIndex:1e3,stack:new Map,ids:J([]),topWindow:null,previewState:is({mode:i.NONE,width:0,height:0})}}function Gs(t,s){var g;const n=t.state,a=((g=t.component)==null?void 0:g.useCssClass())??{};function l(){t.cancel()}function o(){t.togglePin()}function c(f){f.preventDefault(),t.toggleFullscreen()}switch(s){case B.CLOSE:return r("button",{onClick:l,type:"button",innerHTML:Ps,class:a.closeMenu,title:"关闭"},null);case B.PIN:case B.UNPIN:const f=n.pinned?"取消固定":"固定",x=n.pinned?a.pinMenu:a.menu;return r("button",{onClick:o,type:"button",innerHTML:Bs,class:x,title:f},null);case B.FULLSCREEN:case B.RESTORE:const M=n.splitMode==i.FULLSCREEN?As:Ns,k=n.splitMode==i.FULLSCREEN?"还原":"最大化";return r("button",{onClick:c,type:"button",innerHTML:M,class:a.menu,title:k},null)}return null}const Et="Ycke6mYQ",Tt="_3QsmrztJ",Wt="UkryRM5g",kt="U5LZXLJZ",Ct="_2rffDKab",St="vcVMeNrL",Mt="koc15mYi",Ot="_4VxfFKcG",H={splitWindowMask:Et,fullscreen:Tt,splitLeft:Wt,splitRight:kt,splitTopLeft:Ct,splitTopRight:St,splitBottomLeft:Mt,splitBottomRight:Ot};function Lt(t){return typeof t=="function"||Object.prototype.toString.call(t)==="[object Object]"&&!ns(t)}const Rt={[i.FULLSCREEN]:H.fullscreen,[i.LEFT]:H.splitLeft,[i.RIGHT]:H.splitRight,[i.TOP_LEFT]:H.splitTopLeft,[i.TOP_RIGHT]:H.splitTopRight,[i.BOTTOM_LEFT]:H.splitBottomLeft,[i.BOTTOM_RIGHT]:H.splitBottomRight},It={ArrowUp:{[i.BOTTOM_LEFT]:i.LEFT,[i.BOTTOM_RIGHT]:i.RIGHT,[i.LEFT]:i.TOP_LEFT,[i.RIGHT]:i.TOP_RIGHT,fallback:i.FULLSCREEN},ArrowDown:{[i.TOP_LEFT]:i.LEFT,[i.TOP_RIGHT]:i.RIGHT,[i.LEFT]:i.BOTTOM_LEFT,[i.RIGHT]:i.BOTTOM_RIGHT,fallback:i.NONE},ArrowLeft:{[i.TOP_RIGHT]:i.TOP_LEFT,[i.TOP_LEFT]:i.TOP_RIGHT,[i.BOTTOM_RIGHT]:i.BOTTOM_LEFT,[i.BOTTOM_LEFT]:i.BOTTOM_RIGHT,fallback:i.LEFT},ArrowRight:{[i.TOP_LEFT]:i.TOP_RIGHT,[i.TOP_RIGHT]:i.TOP_LEFT,[i.BOTTOM_LEFT]:i.BOTTOM_RIGHT,[i.BOTTOM_RIGHT]:i.BOTTOM_LEFT,fallback:i.RIGHT}},Cs=O({name:"WindowManager",setup(){const t=it(),s=ht();function n(o){const c=o.key;o.ctrlKey&&c in It}nt(),window.addEventListener("keydown",n,!0),Ls(()=>{Hs(),window.removeEventListener("keydown",n,!0)});const a=G(()=>{const o=[H.splitWindowMask],c=Rt[s.mode];return c!=null&&o.push(c),o});function l(){let o=null;if(s.mode!=i.NONE){const g={zIndex:tt()+1,width:s.width?s.width-20+"px":void 0};o=r("div",{class:a.value,style:g},null)}return r(Os,{to:"body"},{default:()=>[r(en,{name:"fade"},Lt(o)?o:{default:()=>[o]})]})}return function(){return[...t.value.map(c=>{const g=pt(c);if(g==null)return null;const f=qs(g.type);return $(f,{abstractWindow:g,key:g.wid})}),l()]}}});function Pt(t){if(t.length==1){const s=t[0];return s==null?null:typeof s=="object"?{...s}:null}if(t.length==2){const[s,n]=t;if(typeof s=="string"&&n!=null)return{title:s,body:n}}if(t.length==3){const[s,n,a]=t;if(typeof s=="string"&&n!=null)return{...a,title:s,body:n}}return null}function _s(t){const s=Pt(t)??{},n=typeof s.size=="string"?Reflect.get(Z.size,s.size):null;return n!=null&&(s.width=n.width,s.height=n.height,s.top=n.top,s.left=n.left),s}function U(...t){const s=_s(t)??{};return vs(s)}function Xs(...t){const s=_s(t)??{};return s.type=Fs.BLANK_WINDOW,vs(s)}function Nt(...t){const s=_s(t)??{};return s.type=Fs.SIMPLE_WINDOW,vs(s)}function vs(t){const s=ct(t);return s.ready().then(()=>{t.displayAfterCreate!==!1&&s.show()}),s}const Zs=Object.freeze({renderMenu:Gs});function zt(t,s){t.component(ps.name,ps),t.component(K.name,K),t.component(Cs.name,Cs),vt(s),gt(),ft(t)}const Bt=hn,At={install:zt,version:Bt},Ft=`<svg viewBox="0 0 1024 1024" version="1.1"
  xmlns="http://www.w3.org/2000/svg" p-id="4032" xmlns:xlink="http://www.w3.org/1999/xlink"
  width="64" height="64">
  <path d="M511.0625 34.90625C162.3125 34.90625 32 339.5 32 510.125s124.59375 479.0625 469.5 479.0625c0 0 86.25 1.875 86.25-74.71875s-38.34375-51.75-38.34375-107.34375 38.34375-80.4375 57.46875-80.4375 139.875 9.5625 208.875-17.25c67.03125-26.8125 176.25-109.21875 176.25-251.0625C990.125 333.78125 859.8125 34.90625 511.0625 34.90625zM219.78125 512c-46.03125 0-82.40625-36.375-82.40625-82.40625s36.375-82.40625 82.40625-82.40625 82.40625 36.375 82.40625 82.40625-36.375 82.40625-82.40625 82.40625z m155.25-205.03125c-46.03125 0-82.40625-36.375-82.40625-82.40625s36.375-82.40625 82.40625-82.40625 82.40625 36.375 82.40625 82.40625c1.875 44.0625-36.46875 82.40625-82.40625 82.40625z m268.21875 0c-46.03125 0-82.40625-36.375-82.40625-82.40625s36.375-82.40625 82.40625-82.40625c46.03125 0 82.40625 36.375 82.40625 82.40625 0 44.0625-36.375 82.40625-82.40625 82.40625zM800.375 512c-46.03125 0-82.40625-36.375-82.40625-82.40625s36.375-82.40625 82.40625-82.40625c46.03125 0 82.40625 36.375 82.40625 82.40625 1.875 46.03125-36.375 82.40625-82.40625 82.40625z" fill="currentColor"></path>
</svg>`,qt=`<svg viewBox="0 0 1024 1024" version="1.1"
  xmlns="http://www.w3.org/2000/svg" p-id="4199" xmlns:xlink="http://www.w3.org/1999/xlink"
  width="64" height="64">
  <path
    d="M34.13333333 512c0 208.21333333 133.12 385.70666667 320.85333334 450.56 23.89333333 6.82666667 20.48-10.24 20.48-23.89333333v-81.92c-143.36 17.06666667-150.18666667-78.50666667-160.42666667-95.57333334-20.48-34.13333333-64.85333333-40.96-51.2-58.02666666 34.13333333-17.06666667 68.26666667 3.41333333 105.81333333 61.44 27.30666667 40.96 81.92 34.13333333 112.64 27.30666666 6.82666667-23.89333333 20.48-47.78666667 37.54666667-64.85333333-153.6-23.89333333-215.04-116.05333333-215.04-225.28 0-51.2 17.06666667-102.4 51.2-139.94666667-23.89333333-64.85333333 0-122.88 3.41333333-129.70666666 61.44-6.82666667 126.29333333 44.37333333 133.12 47.78666666 34.13333333-10.24 75.09333333-13.65333333 119.46666667-13.65333333 44.37333333 0 85.33333333 6.82666667 119.46666667 13.65333333 13.65333333-10.24 71.68-51.2 129.70666666-47.78666666 3.41333333 6.82666667 27.30666667 61.44 6.82666667 126.29333333 34.13333333 40.96 51.2 88.74666667 51.2 139.94666667 0 109.22666667-61.44 201.38666667-215.04 228.69333333 23.89333333 23.89333333 40.96 58.02666667 40.96 98.98666667v119.46666666c0 10.24 0 20.48 17.06666667 20.48C853.33333333 901.12 989.86666667 723.62666667 989.86666667 512c0-262.82666667-215.04-477.86666667-477.86666667-477.86666667S34.13333333 249.17333333 34.13333333 512z"
    fill="currentColor"></path>
</svg>`,Dt=O({__name:"HelloWorld",setup(t){function s(){U("示例窗口",r("div",{class:"example-body"},[y("Hello, xWindow!")]))}return(n,a)=>(C(),S("button",{type:"button",onClick:s,class:"btn btn-small"},"尝试一下"))}}),Ht={class:"example-body"},$t=O({__name:"WinBody",props:{text:String},setup(t){return(s,n)=>(C(),S("div",Ht,N(t.text),1))}}),Vt=O({__name:"FunctionBased",setup(t){function s(){U("窗口1",r("div",{class:"example-body"},[y("这段文本是使用JSX创建的。")]))}function n(){U("窗口2","这段本文可以直接展示。")}function a(){U("窗口3",$("div",{className:"example-body"},"这段文本是通过Vue提供的渲染函数创建的。"))}function l(){U("窗口4",()=>r("div",{class:"example-body"},[y("这段文本是通过返回VNode节点的函数创建的。")]))}function o(){U("窗口5",r($t,{text:"这段文本通过组件创建的。"},null))}return(c,g)=>(C(),S(V,null,[e("button",{class:"btn",type:"button",onClick:s},"JSX"),e("button",{class:"btn",type:"button",onClick:n},"文本"),e("button",{class:"btn",type:"button",onClick:a},"渲染函数"),e("button",{class:"btn",type:"button",onClick:l},"函数"),e("button",{class:"btn",type:"button",onClick:o},"组件")],64))}}),Ut=e("header",null,"窗口尺寸：",-1),Gt=e("header",null,"窗口位置：",-1),Xt=e("header",null,"窗口特性：",-1),Zt=["onUpdate:modelValue"],Yt=e("header",null,"调整模式：",-1),Jt=["value"],Kt=e("span",null,"允许调整窗口大小，允许全屏（默认）",-1),Qt=["value"],sa=e("span",null,"只允许调整窗口大小",-1),na=["value"],ta=e("span",null,"禁止",-1),Ss="__WIN_EVENTS__",aa=O({__name:"Example",setup(t){const s=Rs("classes"),n=wt(),a=[{label:"可拖拽",prop:"draggable",value:!0},{label:"可关闭",prop:"closeable",value:!0},{label:"可置顶",prop:"pinnable",value:!0},{label:"全屏",prop:"fullscreen",value:!1},{label:"遮罩层",prop:"mask",value:!1},{label:"按ESC键关闭",prop:"closeOnPressEsc",value:!0}],l={width:"800px",height:"600px",left:"calc(50vw - 400px)",top:"12vh",resizeMode:P.RESIZE},o=a.reduce((k,p)=>(k[p.prop]=p.value,k),{...l}),c=is(o),g=O({props:{params:{type:Object,required:!0}},setup(k){const p=ds(),h=Reflect.get(p,Ss);function v(){p==null||p.close(!0)}return function(){var z,ts,as,ls,d,w;const j=c.closeable?null:r("button",{type:"button",class:"btn",onClick:v},[y("关闭窗口")]),R=a.map(E=>r("p",null,[E.label,y(": "),JSON.stringify(k.params[E.prop])])),L=h.value.map(E=>r("p",null,[E]));return r("div",{class:s.exampleBody},[r("div",{class:s.params},[r("div",{class:s.panel},[r("h4",null,[y("初始参数：")]),R,j]),r("div",{class:s.panel},[r("h4",null,[y("窗口状态：")]),r("div",{class:s.infos},[r("p",null,[y("id: "),p==null?void 0:p.wid]),r("p",null,[y("focused: "),JSON.stringify((z=p==null?void 0:p.state)==null?void 0:z.focused)]),r("p",null,[y("left: "),(ts=p==null?void 0:p.state)==null?void 0:ts.offsetLeft,y("px")]),r("p",null,[y("top: "),(as=p==null?void 0:p.state)==null?void 0:as.offsetTop,y("px")]),r("p",null,[y("width: "),(ls=p==null?void 0:p.state)==null?void 0:ls.offsetWidth,y("px")]),r("p",null,[y("height: "),(d=p==null?void 0:p.state)==null?void 0:d.offsetHeight,y("px")]),r("p",null,[y("z-index: "),JSON.stringify((w=p==null?void 0:p.state)==null?void 0:w.zIndex)])])])]),r("h4",null,[y("窗口事件:")]),r("div",{class:s.events},[L])])}}});function f(){const k=new Date,p=k.getMinutes().toString().padStart(2,"0"),h=k.getSeconds().toString().padStart(2,"0"),v=k.getMilliseconds().toString().padStart(4,"0");return`${p}:${h}.${v}`}function x(){const k=n.getWindowCount(),p={...c,bodyClassName:s.winBody},h=J([]),v=Nt("窗口"+k,r(g,{params:p},null),p);v.on("created",()=>{h.value.unshift(`[${f()}]: call created event.`)}),v.on("beforeShow",j=>{h.value.unshift(`[${f()}]: call beforeShow event.`)}),v.on("show",j=>{h.value.unshift(`[${f()}]: call show event.`)}),v.on("close",()=>{h.value.unshift(`[${f()}]: call close event.`)}),v.on("beforeDestroy",()=>{h.value.unshift(`[${f()}]: call beforeDestroy event.`)}),v.on("dragStart",j=>{h.value.unshift(`[${f()}]: call dragStart event.`)}),v.on("dragEnd",j=>{h.value.unshift(`[${f()}]: call dragEnd event.`)}),v.on("resizeStart",j=>{h.value.unshift(`[${f()}]: call resizeStart event.`)}),v.on("resizeEnd",j=>{h.value.unshift(`[${f()}]: call resizeEnd event. `)}),v.on("fullscreenChange",j=>{h.value.unshift(`[${f()}]: call fullscreenChange event. isFullscreen: ${v.isFullscreen}`)}),Reflect.set(v,Ss,h)}function M(k,p){c.width=k+"px",c.height=p+"px"}return(k,p)=>(C(),S(V,null,[e("section",{class:_(T(s).row)},[Ut,e("div",{class:_(T(s).content)},[e("label",null,[y("宽度："),F(e("input",{type:"text","onUpdate:modelValue":p[0]||(p[0]=h=>c.width=h),placeholder:"参照CSS的width属性"},null,512),[[Q,c.width]])]),e("label",null,[y("高度："),F(e("input",{type:"text","onUpdate:modelValue":p[1]||(p[1]=h=>c.height=h),placeholder:"参照CSS的height属性"},null,512),[[Q,c.height]])]),e("button",{type:"button",class:"btn btn-mini",onClick:p[2]||(p[2]=h=>M(800,600))},"800px*600px"),e("button",{type:"button",class:"btn btn-mini",onClick:p[3]||(p[3]=h=>M(390,840))},"390px*840px")],2)],2),e("section",{class:_(T(s).row)},[Gt,e("div",{class:_(T(s).content)},[e("label",null,[y("左侧："),F(e("input",{type:"text","onUpdate:modelValue":p[4]||(p[4]=h=>c.left=h),placeholder:"参照CSS中left属性"},null,512),[[Q,c.left]])]),e("label",null,[y("上侧："),F(e("input",{type:"text","onUpdate:modelValue":p[5]||(p[5]=h=>c.top=h),placeholder:"参照CSS中top属性"},null,512),[[Q,c.top]])])],2)],2),e("section",{class:_(T(s).row)},[Xt,e("div",{class:_(T(s).content)},[(C(),S(V,null,rs(a,h=>e("label",{key:h.prop},[F(e("input",{type:"checkbox","onUpdate:modelValue":v=>c[h.prop]=v},null,8,Zt),[[on,c[h.prop]]]),e("span",null,N(h.label),1)])),64))],2)],2),e("section",{class:_(T(s).row)},[Yt,e("div",{class:_(T(s).content)},[e("label",null,[F(e("input",{type:"radio",name:"resizeMode",value:T(P).RESIZE,"onUpdate:modelValue":p[6]||(p[6]=h=>c.resizeMode=h)},null,8,Jt),[[js,c.resizeMode]]),Kt]),e("label",null,[F(e("input",{type:"radio",name:"resizeMode",value:T(P).RESIZE_ONLY,"onUpdate:modelValue":p[7]||(p[7]=h=>c.resizeMode=h)},null,8,Qt),[[js,c.resizeMode]]),sa]),e("label",null,[F(e("input",{type:"radio",name:"resizeMode",value:T(P).DISABLED,"onUpdate:modelValue":p[8]||(p[8]=h=>c.resizeMode=h)},null,8,na),[[js,c.resizeMode]]),ta])],2)],2),e("button",{onClick:x,class:"btn"},"创建窗口")],64))}}),la="Zj7DQ8mX",ea="hZ15PjHU",oa="tbtACTrZ",ca="_3N6wV7j6",pa="oTAjhRfW",ia="CFWamGXp",ra="cqiqLgbF",ua="T9Y6Pp6o",da={winBody:la,exampleBody:ea,row:oa,content:ca,events:pa,params:ia,panel:ra,infos:ua},xs=(t,s)=>{const n=t.__vccOpts||t;for(const[a,l]of s)n[a]=l;return n},ha={classes:da},ja=xs(aa,[["__cssModules",ha]]),ga={class:"approval-form"},fa={key:0,class:"approval-form-message"},Ys=O({__name:"UseApproval",setup(t){const s=ds(),n=is({value:"",fail:!1});return s==null||s.useHandle("confirm",()=>n.value?n.value:(n.fail=!0,Promise.reject("验证未通过"))),(a,l)=>(C(),S("div",ga,[F(e("textarea",{type:"text","onUpdate:modelValue":l[0]||(l[0]=o=>n.value=o),placeholder:"请输入",ref:"inputRef",autofocus:""},null,512),[[Q,n.value]]),n.fail?(C(),S("div",fa,"请输入审批意见")):ws("",!0)]))}}),ma={key:0,class:"example-modal"},wa={class:"example-modal-header"},ba={class:"example-modal-title"},ya={class:"example-modal-menus"},_a={class:"example-modal-body"},va={class:"example-modal-footer"},Js=O({__name:"Modal",setup(t){const s=ds(),n=()=>s==null?void 0:s.cancel().catch(l=>console.error(l)),a=()=>s==null?void 0:s.confirm().catch(l=>console.error(l));return(l,o)=>T(s)?(C(),S("div",ma,[e("div",wa,[e("div",ba,N(T(s).options.title),1),e("div",ya,[fs(l.$slots,"menus",{abstractWindow:T(s)})])]),e("div",_a,[fs(l.$slots,"default",{abstractWindow:T(s)})]),e("div",va,[e("button",{type:"button",class:"btn btn-small",onClick:o[0]||(o[0]=c=>n())},"取消"),e("button",{type:"button",class:"btn btn-small",onClick:o[1]||(o[1]=c=>a())},"确定")])])):ws("",!0)}}),xa=Object.freeze(Object.defineProperty({__proto__:null,Example:ja,FunctionBased:Vt,HelloWorld:Dt,Modal:Js,UseApproval:Ys},Symbol.toStringTag,{value:"Module"})),Ea=["innerHTML"],Ta=["onClick"],Wa=O({__name:"index",props:{menuClass:{type:String,default:null}},setup(t){const s=[{name:"皓白",primaryColor:"#ebeef0",textColor:"#000"},{name:"天缥",primaryColor:"#d5ebe1",textColor:"#000",navTextSecondaryColor:"#333"},{name:"西子",primaryColor:"#8ac0ca",textColor:"#000",navTextSecondaryColor:"#333"},{name:"凝脂",primaryColor:"#F5F2DF",textColor:"#000",navTextSecondaryColor:"#333"},{name:"海天霞",primaryColor:"#f3a694",textColor:"#000",navTextSecondaryColor:"#333"},{name:"暮山紫",primaryColor:"#a4abd6",textColor:"#000",navTextSecondaryColor:"#333"}].map(l=>({...l,background:l.primaryColor}));function n(l){return{"--xwindow-color-primary":l.primaryColor,"--xwindow-header-color":l.textColor,"--nav-text-secondary-color":l.navTextSecondaryColor}}function a(l){const o=document.documentElement,c=n(l);for(const g in c){const f=c[g];f==null?o.style.removeProperty(g):o.style.setProperty(g,f)}}return(l,o)=>(C(),S("div",{class:_(l.classes.picker)},[e("button",{type:"button",class:_(t.menuClass),innerHTML:T(Ft),title:"主题"},null,10,Ea),e("ul",{class:_(l.classes.panel)},[(C(!0),S(V,null,rs(T(s),c=>(C(),S("li",{key:c.id,onClick:g=>a(c),style:Ts({"--theme-primary-color":c.primaryColor})},[e("span",{class:_(l.classes.badge),style:Ts({background:c.background})},null,6),e("strong",null,N(c.name),1)],12,Ta))),128))],2)],2))}}),ka="JJwYh7Hb",Ca="nGuXZaqY",Sa="WnLJWuwF",Ma={picker:ka,panel:Ca,badge:Sa},Oa={classes:Ma},La=xs(Wa,[["__cssModules",Oa]]),Ra=`<p>xWindow是仿Windows窗口的组件库，目标是提供一套快捷的API来创建和使用窗口。本文档的就是基于xWindow创建了一个全屏的窗口，你可以拖动文档查看效果。</p>
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
<p>xWindow不需要事先在业务组件中声明，你可以在任何需要的地方直接创建一个窗口。 <HelloWorld/></p>`,Ia=`<h2 class="head-anchor article-sticky-heading" id="安装">安装</h2>
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
<span class="quickstart-function-based"><FunctionBased/></span></p>`,Pa=`<h2 class="head-anchor article-sticky-heading" id="模态框">模态框</h2>
<p>模态框是业务系统中常用的组件，你可以基于<code>xWindow</code>轻松封装符合需求的模态框。以下就是一个简单<code>Modal</code>组件：</p>
<pre v-pre class="hljs" language="vue"><code class="hljs-code"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;example-modal&quot;</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">&quot;win&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;example-modal-header&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;example-modal-title&quot;</span>&gt;</span>{{ win.options.title }}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;example-modal-menus&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;menus&quot;</span> <span class="hljs-attr">:abstractWindow</span>=<span class="hljs-string">&quot;win&quot;</span> /&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;example-modal-body&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">slot</span> <span class="hljs-attr">:abstractWindow</span>=<span class="hljs-string">&quot;win&quot;</span> /&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;example-modal-footer&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;button&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;btn btn-small&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;cancel()&quot;</span>&gt;</span>取消<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;button&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;btn btn-small&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;confirm()&quot;</span>&gt;</span>确定<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;tsx&quot;</span> <span class="hljs-attr">setup</span>&gt;</span><span class="language-javascript">
<span class="hljs-keyword">import</span> { useWindowApi } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@dongls/xwindow&#x27;</span>

<span class="hljs-keyword">const</span> win = <span class="hljs-title function_">useWindowApi</span>()
<span class="hljs-keyword">const</span> <span class="hljs-title function_">cancel</span> = (<span class="hljs-params"></span>) =&gt; win?.<span class="hljs-title function_">cancel</span>().<span class="hljs-title function_">catch</span>(<span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(e))
<span class="hljs-keyword">const</span> <span class="hljs-title function_">confirm</span> = (<span class="hljs-params"></span>) =&gt; win?.<span class="hljs-title function_">confirm</span>().<span class="hljs-title function_">catch</span>(<span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(e))
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
<p>最终效果如下：<UseExample/></p>`,Na="<Example/>",za=`<h2 class="head-anchor article-sticky-heading" id="函数式API">函数式API</h2>
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
<h3>bodyClassName</h3>
<ul class="doc-ul">
<li>类型：<code>string</code></li>
<li>描述：窗体自定义类名，用于修改窗体样式</li>
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
<h3>fullscreen</h3>
<ul class="doc-ul">
<li>类型：<code>boolean</code></li>
<li>默认值：<code>false</code></li>
<li>描述：窗口初始全屏状态。如果需要禁止窗口全屏，参照<code>resizeMode</code>说明</li>
</ul>
<h3>resizeMode</h3>
<ul class="doc-ul">
<li>类型：<code>number</code></li>
</ul>
<pre v-pre class="hljs" language="typescript"><code class="hljs-code"><span class="hljs-keyword">const</span> <span class="hljs-variable constant_">RESIZE_MODE</span> = {
  <span class="hljs-comment">/** 禁止调整窗口大小 */</span>
  <span class="hljs-attr">DISABLED</span>: <span class="hljs-number">0</span>,
  <span class="hljs-comment">/** 允许调整窗口大小，允许全屏（默认）*/</span>
  <span class="hljs-attr">RESIZE</span>: <span class="hljs-number">1</span>,
  <span class="hljs-comment">/** 只允许调整窗口大小 */</span>
  <span class="hljs-attr">RESIZE_ONLY</span>: <span class="hljs-number">2</span>,
}
</code><button type="button" class="doc-copy-btn" title="复制"/></pre>
<ul class="doc-ul">
<li>默认值：<code>RESIZE_MODE.REISZE</code></li>
<li>描述：窗口调整模式。如果需要禁止窗口全屏，请将该参数设置为<code>RESIZE_MODE.RESIZE_ONLY</code></li>
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
  <span class="hljs-comment">/** 窗口是否已全屏 */</span>
  <span class="hljs-keyword">get</span> <span class="hljs-title function_">isFullscreen</span>(): <span class="hljs-built_in">boolean</span>

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
  <span class="hljs-comment">/** 窗口全屏 */</span>
  <span class="hljs-title function_">requestFullscreen</span>(): <span class="hljs-built_in">void</span>
  <span class="hljs-comment">/** 退出全屏 */</span>
  <span class="hljs-title function_">exitFullscreen</span>(): <span class="hljs-built_in">void</span>
  <span class="hljs-comment">/** 切换窗口全屏状态 */</span>
  <span class="hljs-title function_">toggleFullscreen</span>(): <span class="hljs-built_in">void</span>
  <span class="hljs-comment">/** 固定窗口 */</span>
  <span class="hljs-title function_">pin</span>(): <span class="hljs-built_in">void</span>
  <span class="hljs-comment">/** 取消窗口固定 */</span>
  <span class="hljs-title function_">unpin</span>(): <span class="hljs-built_in">void</span>
  <span class="hljs-comment">/** 切换窗口的固定状态 */</span>
  <span class="hljs-title function_">togglePin</span>(): <span class="hljs-built_in">void</span>
  <span class="hljs-comment">/** 注册事件处理函数, 用于窗口和组件之间的交互 */</span>
  <span class="hljs-title function_">useHandle</span>(<span class="hljs-attr">type</span>: <span class="hljs-title class_">HandlerType</span>, <span class="hljs-attr">callback</span>: <span class="hljs-title class_">Function</span>): <span class="hljs-built_in">void</span>
  <span class="hljs-comment">/** 确认并关闭窗口 */</span>
  <span class="hljs-title function_">confirm</span>(): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt;
  <span class="hljs-comment">/**
   * 取消并关闭窗口
   * <span class="hljs-doctag">@param</span> {<span class="hljs-type">boolean</span>} <span class="hljs-variable">forced</span> - 是否强制关闭窗口
   */</span>
  <span class="hljs-title function_">cancel</span>(): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt;
}
</code><button type="button" class="doc-copy-btn" title="复制"/></pre>`,Ba=e("colgroup",null,[e("col",{width:"160"}),e("col",{width:"150"})],-1),Aa=e("thead",null,[e("tr",null,[e("th",null,"事件"),e("th",null,"默认行为"),e("th",null,"说明")])],-1),Fa={__name:"Events",setup(t){const s=[{type:"created",desc:"窗口组件创建时触发"},{type:"beforeShow",prevent:"可阻止窗口显示",desc:"窗口显示前触发"},{type:"show",desc:"窗口显示后触发"},{type:"beforeClose",prevent:"可阻止窗口关闭",desc:"窗口关闭前触发"},{type:"close",desc:"窗口关闭时触发"},{type:"beforeDestroy",desc:"窗口销毁前触发"},{type:"dragStart",prevent:"可阻止窗口拖动",desc:"窗口开始拖动时触发"},{type:"dragging",desc:"窗口拖动时触发"},{type:"dragEnd",desc:"窗口拖动结束时触发"},{type:"resizeStart",prevent:"可阻止窗口调整尺寸",desc:"窗口开始调整尺寸时触发"},{type:"resizing",desc:"窗口调整尺寸时触发"},{type:"resizeEnd",desc:"窗口结束调整尺寸时触发"},{type:"fullscreenChange",desc:"窗口全屏状态改变时触发"},{type:"confirm",desc:"调用窗口的confirm方法后触发，可通过此事件返回窗体的内容"},{type:"cancel",desc:"调用窗口的cancel方法后触发"}];return(n,a)=>(C(),S("table",null,[Ba,Aa,e("tbody",null,[(C(),S(V,null,rs(s,l=>e("tr",{key:l.prop},[e("td",null,N(l.type),1),e("td",null,N(l.prevent??"--"),1),e("td",null,N(l.desc),1)])),64))])]))}};function qa(t){return typeof t=="function"||Object.prototype.toString.call(t)==="[object Object]"&&!ns(t)}function Ks(t,s,n={}){n.height=n.height??"320px";const a={default(l){return typeof s=="function"?s(l.abstractWindow):s},menus(l){return l.abstractWindow.useMenus().value.map(c=>Zs.renderMenu(l.abstractWindow,c))}};return Xs(t,r(Js,null,qa(a)?a:{default:()=>[a]}),n)}function Da(){return new Promise((t,s)=>{const n={mask:!0,resizeMode:P.DISABLED},a=Ks("请输入审批意见",r(Ys,null,null),n);a.once("confirm",l=>t(l.detail)),a.once("cancel",l=>s(l.detail))})}const Ha={class:"approval-output"},$a={key:0},Va=e("span",null,"操作结果：",-1),Ua=O({__name:"UseExample",setup(t){const s=J("");async function n(){const a=await Da().catch(l=>(console.log(l),null));if(a==null){s.value="取消操作";return}s.value=a}return(a,l)=>(C(),S(V,null,[e("button",{type:"button",class:"btn btn-small",onClick:n},"审批"),e("div",Ha,[s.value?(C(),S("span",$a,[Va,e("strong",null,N(s.value),1)])):ws("",!0)])],64))}}),Ga=O({__name:"UseModal",setup(t){function s(){Ks("窗口1",r("div",null,[y("内容")]))}return(n,a)=>(C(),S("button",{type:"button",class:"btn btn-small",onClick:s},"打开模态框"))}}),Xa=Object.freeze(Object.defineProperty({__proto__:null,Events:Fa,UseExample:Ua,UseModal:Ga},Symbol.toStringTag,{value:"Module"})),Za=[{name:"简介",content:Ra},{name:"快速开始",content:Ia},{name:"进阶应用",content:Pa},{name:"API",content:za},{name:"示例",content:Na}],Ms=Za.map((t,s)=>({id:s,...t})),Ya=["innerHTML"],Ja=e("span",null,"xWindow",-1),Ka=["onClick"],Qa=e("span",null,"Copyright © 2023-present dongls",-1),sl=[Qa],nl=O({__name:"docs",setup(t){const s=Rs("classes"),n="05031014",a="0.1.0",l=0,o=ds(),c=Kn(),g=J(Ms[l]),f=J();function x(j){j.stopPropagation()}function M(){var L;if(o==null)return null;const j=o.useMenus(),R=((L=o.component)==null?void 0:L.useCssClass())??{};return r("div",{class:s.menus,onMousedown:x},[r(La,{menuClass:R.menu},null),r("button",{title:"GitHub",class:R.menu,onClick:k,innerHTML:qt},null),j==null?void 0:j.value.map(z=>Zs.renderMenu(o,z))])}function k(){window.open("https://github.com/dongls/xWindow")}function p(){const j=g.value.content,R={...xa,...Xa};return $("article",{class:"article",key:g.value.id},$({template:j,components:R}))}async function h(j){g.value=j,await gs(),f.value&&(f.value.scrollTop=0)}function v(j){const R=j.target.closest("pre.hljs");if(R==null)return;const L=R.querySelector(":scope > code.hljs-code");if(L==null)return;const z=L.textContent;z!=null&&navigator.clipboard.writeText(z)}return(j,R)=>(C(),S("div",{class:_(j.classes.app)},[e("aside",{class:_(j.classes.aside)},[e("div",{class:_(j.classes.leftHeader)},[e("i",{class:_(j.classes.logo),innerHTML:T(c).IconWindow},null,10,Ya),e("h3",{class:_(j.classes.title)},[Ja,e("small",null,"v"+N(T(a))+"_"+N(T(n)),1)],2)],2),e("nav",{class:_([j.classes.navs,"is-scroll"])},[(C(!0),S(V,null,rs(T(Ms),L=>(C(),S("div",{onClick:z=>h(L),class:_([j.classes.nav,L.id==g.value.id?j.classes.activeNav:null])},N(L.name),11,Ka))),256))],2),e("div",{class:_(j.classes.copyright)},sl,2)],2),e("main",{class:_(j.classes.main)},[e("div",{class:_(j.classes.rightHeader)},[r(M)],2),e("div",{class:_(j.classes.scroll),ref_key:"scroll",ref:f,onClick:cn(v,["stop"])},[r(p,{class:_(j.classes.content)},null,8,["class"]),fs(j.$slots,"default",{ref:"tref"})],2)],2)],2))}}),tl="Cs1eNLRW",al="mkQVrkEV",ll="fxJePVAw mkQVrkEV",el="gW5FCXxJ mkQVrkEV",ol="UCU4MEPE",cl="wascU8g5",pl="QVKApkXV",il="xQ7Xh7bM",rl="LhDQ3ctB",ul="_7RZWnCfQ",dl="_95hpDEbG",hl="cXaxwh5B",jl="_2dkZEz4e",gl="_6qjvpjzC",fl="qSce7387",ml={app:tl,header:al,leftHeader:ll,rightHeader:el,menus:ol,aside:cl,navs:pl,nav:il,activeNav:rl,main:ul,content:dl,scroll:hl,copyright:jl,logo:gl,title:fl},wl={classes:ml},bl=xs(nl,[["__cssModules",wl]]),yl=O({__name:"App",setup(t){let s=null;function n(){s&&s.close(),s=null}return Ls(n),pn(()=>{s=Xs({closeable:!1,zIndex:999,width:"1280px",height:"900px",body:r(bl,null,null),title:""})}),(a,l)=>{const o=un("WindowManager");return C(),rn(o)}}}),Qs=dn(yl);Qs.use(At);Qs.mount("#app");
