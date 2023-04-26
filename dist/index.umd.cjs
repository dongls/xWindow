/*! @dongls/xWindow v0.0.6 https://github.com/dongls/xWindow
Copyright 2023-present dongls
Released under the MIT License */
(function(p,s){typeof exports=="object"&&typeof module<"u"?s(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],s):(p=typeof globalThis<"u"?globalThis:p||self,s(p.xWindow={},p.Vue))})(this,function(p,s){"use strict";var Ie=Object.defineProperty;var We=(p,s,z)=>s in p?Ie(p,s,{enumerable:!0,configurable:!0,writable:!0,value:z}):p[s]=z;var b=(p,s,z)=>(We(p,typeof s!="symbol"?s+"":s,z),z);const z="https://github.com/dongls/xWindow",St="0.0.6",It="onUpdate:visible",Wt="onBeforeUnmount",Mt="onUnmount",C=Symbol(),W=Object.freeze({INIT:0,MOUNTED:1,UNMOUNTED:2}),k={title:String,id:String,visible:{type:Boolean,default:!1},width:{type:String,default:"640px"},height:{type:String,default:null},left:{type:String,default:null},top:{type:String,default:null},zIndex:{type:Number,default:null},fullscreen:{type:Boolean,default:!1},appendToBody:{type:Boolean,default:!0},draggable:{type:Boolean,default:!0},resizable:{type:Boolean,default:!0},closeable:{type:Boolean,default:!0},mask:{type:Boolean,default:!1},pinnable:{type:Boolean,default:!0}},T=Object.freeze({NONE:0,TOP:1<<0,BOTTOM:1<<1,LEFT:1<<2,RIGHT:1<<3}),M=Object.freeze({TOP:T.TOP,BOTTOM:T.BOTTOM,LEFT:T.LEFT,RIGHT:T.RIGHT,TOP_LEFT:T.TOP|T.LEFT,TOP_RIGHT:T.TOP|T.RIGHT,BOTTOM_LEFT:T.BOTTOM|T.LEFT,BOTTOM_RIGHT:T.BOTTOM|T.RIGHT}),i=Object.freeze({NONE:T.NONE,FULLSCREEN:T.TOP,LEFT:T.LEFT,RIGHT:T.RIGHT,TOP_LEFT:T.TOP|T.LEFT,TOP_RIGHT:T.TOP|T.RIGHT,BOTTOM_LEFT:T.BOTTOM|T.LEFT,BOTTOM_RIGHT:T.BOTTOM|T.RIGHT});let Rt=1e3;class S{constructor(){b(this,"value");this.value=Rt++}get wid(){return"window--"+this.value}static create(n){return n instanceof S?n:Object.freeze(new S)}}class G{constructor(n){b(this,"uid");b(this,"type");b(this,"visible");b(this,"others");b(this,"body");const{visible:e,body:w,type:u,...d}=n;this.uid=S.create(),this.type=u,this.visible=e,this.body=w,this.others=d}static create(n){return n instanceof G?n:new G(n)}get id(){return this.uid.wid}buildProps(){return Object.assign({},this.others,{visible:this.visible.value,body:this.body,uid:this.uid,key:this.id})}}function Nt(t){const{clientX:n,clientY:e}=t,{innerWidth:w,innerHeight:u}=window;let d=T.NONE;return e<=5&&(d|=T.TOP),e>=u-5&&(d|=T.BOTTOM),n<=5&&(d|=T.LEFT),n>=w-5&&(d|=T.RIGHT),d}const c={isMounted:!1,zIndex:1e3,stack:new Map,ghost:s.shallowRef([]),options:new Map,topWindow:null,previewState:s.reactive({mode:i.NONE,width:null,height:null})};function Bt(){c.isMounted=!0}function zt(){c.isMounted=!1,c.topWindow=null,c.ghost.value=[],c.stack.clear(),c.options.clear()}function bt(){return c.isMounted}function Y(){return c.zIndex}function Z(){return c.zIndex+=1}function yt(){const t=c.topWindow;return t?t.zIndex:1}function vt(t){typeof t=="number"&&Number.isFinite(t)&&(c.zIndex=Math.floor(t))}function Ft(){return c.topWindow}function Ht(t,n){c.stack.set(t,n)}function $(t){c.stack.delete(t),c.options.delete(t);const n=c.ghost.value.indexOf(t);if(n>=0){const e=c.ghost.value;e.splice(n,1),c.ghost.value=e.slice()}}function K(){c.stack.size==0||c.topWindow==null||c.topWindow.close()}function Pt(t){return c.options.get(t)}function Gt(t){const n=c.ghost.value;return n.push(t.uid),c.ghost.value=n.slice(),c.options.set(t.uid,t),t.uid}function Ct(t){return c.stack.get(t)}function J(){return c.ghost}function Q(t){if(c.topWindow=t,t!=null){for(const n of c.stack.values()){const e=n.windowState;e.focused=n===t}t.zIndex<Y()&&(t.zIndex=Z())}}function A(t){const n=c.stack.get(t);Q(n)}function tt(){const t=kt();Q(t)}function kt(){return c.stack.size==0?null:Array.from(c.stack.values()).filter(n=>n.visible).sort((n,e)=>e.zIndex-n.zIndex)[0]}function xt(t){let n=null;const e=Nt(t);if(c.previewState.mode=e,(e==i.LEFT||e==i.RIGHT)&&(n=x(e==i.LEFT?i.RIGHT:i.LEFT),n)){const w=window.innerWidth-n.getWindowEl().offsetWidth;c.previewState.width=w}return{mode:c.previewState.mode,width:c.previewState.width,relatedWindow:n}}function qt(){return c.previewState.mode=i.NONE,c.previewState.height=null,c.previewState.width=null,i.NONE}function Ut(){return c.previewState}function x(t){let n=null;for(const e of c.stack.values())e.splitState.mode===t&&(n==null||e.zIndex>n.zIndex)&&(n=e);return n}function jt(){return c.ghost.value.length}function Vt(){return{closeTopWindow:K,getTopZIndex:Z,getWindowApi:Ct,getZIndex:Y,setFocusedWindow:A,getWindowCount:jt}}function Dt(t){vt(t==null?void 0:t.zIndex)}function Xt(){return s.inject(C)}const h={window:"_window_1seq0_7",dragging:"_dragging_1seq0_17",resizing:"_resizing_1seq0_17",fullscreen:"_fullscreen_1seq0_21",focused:"_focused_1seq0_31",header:"_header_1seq0_34",menu:"_menu_1seq0_38",logo:"_logo_1seq0_41",main:"_main_1seq0_45",init:"_init_1seq0_52",title:"_title_1seq0_70",menus:"_menus_1seq0_80",body:"_body_1seq0_86",footer:"_footer_1seq0_91",closeMenu:"_closeMenu_1seq0_142 _menu_1seq0_38",pinMenu:"_pinMenu_1seq0_153 _menu_1seq0_38",resize:"_resize_1seq0_172",resizeBar:"_resizeBar_1seq0_176",resizeTop:"_resizeTop_1seq0_181 _resizeBar_1seq0_176",resizeBottom:"_resizeBottom_1seq0_182 _resizeBar_1seq0_176",resizeRight:"_resizeRight_1seq0_198 _resizeBar_1seq0_176",resizeLeft:"_resizeLeft_1seq0_199 _resizeBar_1seq0_176",resizeTopLeft:"_resizeTopLeft_1seq0_215 _resizeBar_1seq0_176",resizeBottomLeft:"_resizeBottomLeft_1seq0_216 _resizeBar_1seq0_176",resizeTopRight:"_resizeTopRight_1seq0_217 _resizeBar_1seq0_176",resizeBottomRight:"_resizeBottomRight_1seq0_218 _resizeBar_1seq0_176",mask:"_mask_1seq0_248"},et='<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M590.265 511.987l305.521-305.468c21.617-21.589 21.617-56.636.027-78.252-21.616-21.617-56.663-21.617-78.279 0L512.012 433.735 206.544 128.213c-21.617-21.617-56.635-21.617-78.252 0-21.616 21.589-21.616 56.635-.027 78.252L433.76 511.987 128.211 817.482c-21.617 21.59-21.617 56.635 0 78.251 10.808 10.81 24.967 16.213 39.125 16.213 14.159 0 28.318-5.403 39.126-16.213l305.522-305.468L817.48 895.788C828.289 906.597 842.447 912 856.606 912s28.317-5.403 39.125-16.212c21.618-21.59 21.618-56.636.028-78.252L590.265 511.987z"/></svg>',nt='<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5228" width="64" height="64"><path d="M97.74775349 97.74775349h828.50449302v828.50449302H97.74775349V97.74775349z m103.56306133 103.56306133v621.37837036h621.37837036V201.31081482H201.31081482z" fill="currentColor"></path></svg>',it='<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M38.794 124.791v778.495h946.412V124.791H38.794zm896.678 728.033H89.292v-460.9h846.18v460.9z"/></svg>',ot='<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M738.793 681.382v-48.331l88.242-88.243a298.676 298.676 0 00156.712-83.482 38.836 38.836 0 000-54.923l-366.15-366.15a38.836 38.836 0 00-54.923 0 298.52 298.52 0 00-83.519 156.749l-88.169 88.169h-48.332a411.145 411.145 0 00-292.59 121.232c-15.16 15.159-15.16 39.764 0 54.923L278.906 690.17 86.642 882.436a38.836 38.836 0 1054.922 54.922l192.23-192.229 228.844 228.845a38.836 38.836 0 0054.922 0 411.042 411.042 0 00121.233-292.592zM134.02 435.44a333.473 333.473 0 01208.56-72.571l64.406.037a38.836 38.836 0 0027.461-11.351L544.292 241.71a38.68 38.68 0 0011.351-27.462 180.096 180.096 0 0136.798-89.01L898.8 431.593a180.925 180.925 0 01-89.12 36.835 38.836 38.836 0 00-27.462 11.35L672.373 589.626c-7.287 7.286-11.387 17.173-11.35 27.461l.036 64.406a333.318 333.318 0 01-72.608 208.596L134.021 435.44z"/></svg>',st='<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M845.40952426 212.52063539H65.21904746v702.17142826h780.1904768V212.52063539z m-702.17142933 624.1523808V290.53968285h624.1523808v546.13333334H143.23809493z" fill="currentColor"></path><path d="M981.53650809 76.3936505H201.34603129v78.01904746h702.17142933v624.15238187h78.01904747V76.3936505z" fill="currentColor"></path></svg>';function Yt(){return{IconClose:et,IconMax:nt,IconPin:ot,IconWindow:it,IconRestore:st}}function O(t,n,e){return n!=null&&Number.isFinite(n)&&t<n?n:e!=null&&Number.isFinite(e)&&t>e?e:t}function lt(t){return t==null||typeof t!="string"?!0:t.length==0}const rt="__xWindow_resize_prop__",y=360,dt=32,R={TOP:N(M.TOP),BOTTOM:N(M.BOTTOM),LEFT:N(M.LEFT),RIGHT:N(M.RIGHT),TOP_LEFT:N(M.TOP_LEFT),TOP_RIGHT:N(M.TOP_RIGHT),BOTTOM_LEFT:N(M.BOTTOM_LEFT),BOTTOM_RIGHT:N(M.BOTTOM_RIGHT)},Zt=[[h.resizeTop,R.TOP],[h.resizeBottom,R.BOTTOM],[h.resizeLeft,R.LEFT],[h.resizeRight,R.RIGHT],[h.resizeTopLeft,R.TOP_LEFT],[h.resizeTopRight,R.TOP_RIGHT],[h.resizeBottomLeft,R.BOTTOM_LEFT],[h.resizeBottomRight,R.BOTTOM_RIGHT]];function N(t){return t.toString(2).padStart(4,"0")}function ct(t,n,e){const w=n.getBoundingClientRect(),u=document.documentElement.getBoundingClientRect(),d=e.relatedWindow!=null,l={};if(e.direction[3]=="1"){const r=O(w.bottom-O(t.clientY,0),dt),o=O(t.clientY-u.top,0,window.innerHeight-r);l.height=r,l.top=o}if(e.direction[2]=="1"){const r=O(O(t.clientY,0,window.innerHeight)-w.top,dt),o=O(t.clientY-r-u.top,0,window.innerHeight-r);l.height=r,l.top=o}if(e.direction[1]=="1"){const r=O(w.right-O(t.clientX,0),y,d?window.innerWidth-y:window.innerWidth),o=O(t.clientX-u.left,d?y:0,window.innerWidth-r);l.width=r,l.left=o}if(e.direction[0]=="1"){const r=O(O(t.clientX,0)-w.left,y,d?window.innerWidth-y:window.innerWidth),o=O(t.clientX-r-u.left,0,window.innerWidth-r-(d?y:0));l.width=r,l.left=o}return l}function $t(t){const n=s.getCurrentInstance(),e={init:!1,direction:null,top:0,left:0,width:0,height:0,relatedWindow:null};function w(r){r.preventDefault(),r.stopPropagation();const o=t.windowState,f=t.splitState;e.init=!1,e.direction=r.target[rt],e.top=o.top,e.left=o.left,e.width=o.width,e.height=o.height,f.mode==i.LEFT&&e.direction==i.RIGHT.toString(2).padStart(4,"0")&&(e.relatedWindow=x(i.RIGHT)),f.mode==i.RIGHT&&e.direction==i.LEFT.toString(2).padStart(4,"0")&&(e.relatedWindow=x(i.LEFT)),window.addEventListener("mousemove",u),window.addEventListener("mouseup",d)}function u(r){r.preventDefault();const o=n==null?void 0:n.refs.window,f=t.splitState;if(e.init||(o.classList.add(h.resizing),e.init=!0),t.splitState.mode!=i.NONE){if(e.relatedWindow==null){const _=o.getBoundingClientRect();t.windowState.top=_.top,t.windowState.left=_.left,t.windowState.width=_.width,t.windowState.height=_.height,t.splitState.mode=i.NONE}e.top=t.windowState.top,e.left=t.windowState.left,e.width=t.windowState.width,e.height=t.windowState.height}const g=ct(r,o,e);for(const _ in g){const E=Math.round(g[_]);Reflect.set(e,_,E),Reflect.set(o.style,_,E+"px")}if(f.mode==i.LEFT||f.mode==i.RIGHT){const _=e.relatedWindow;if(_!=null){const E=_.getWindowEl();Reflect.set(E.style,"width",window.innerWidth-e.width+"px")}}}function d(r){if(r.preventDefault(),e.init){const o=n==null?void 0:n.refs.window;ct(r,o,e)!=null&&(t.windowState.top=e.top,t.windowState.left=e.left,t.windowState.width=e.width,t.windowState.height=e.height,t.saveWindowState()),o.classList.remove(h.resizing);const g=t.splitState;if(g.mode==i.LEFT||g.mode==i.RIGHT){const _=e.relatedWindow;if(_!=null){const E=t.splitState;E.width=e.width/window.innerWidth*100;const H=100-E.width;_.splitState.width=H}}}window.removeEventListener("mousemove",u),window.removeEventListener("mouseup",d)}const l=Zt.map(r=>s.h("div",{className:r[0],["."+rt]:r[1]}));return s.createVNode("div",{class:h.resize,onMousedown:w},[l])}function Kt(t){const n=s.getCurrentInstance(),e={init:!1,left:0,top:0,prevClientX:0,prevClientY:0,splitMode:i.NONE,splitWidth:null,relatedWindow:null};function w(l){const o=(n==null?void 0:n.refs.window).getBoundingClientRect();l.clientY-o.top>30||(l.preventDefault(),e.init=!1,e.left=t.windowState.left,e.top=t.windowState.top,e.prevClientX=l.clientX,e.prevClientY=l.clientY,window.addEventListener("mousemove",u),window.addEventListener("mouseup",d))}function u(l){l.preventDefault();const r=n==null?void 0:n.refs.window;e.init||(r.classList.add(h.dragging),e.init=!0),t.splitState.mode!=i.NONE&&(t.exitSplitMode(l),e.left=t.windowState.left,e.top=t.windowState.top),e.left=Math.round(e.left+l.clientX-e.prevClientX),e.top=Math.round(e.top+l.clientY-e.prevClientY),e.prevClientX=l.clientX,e.prevClientY=l.clientY,r.style.left=e.left+"px",r.style.top=e.top+"px";const o=xt(l);e.splitMode=o.mode,e.splitWidth=o.width,e.relatedWindow=o.relatedWindow}function d(l){if(l.preventDefault(),e.init){const r=n==null?void 0:n.refs.window;if(t.windowState.top=e.top,t.windowState.left=e.left,e.splitMode!==i.NONE){if(t.splitState.mode=e.splitMode,e.relatedWindow){const o=e.splitWidth/window.innerWidth*100;t.splitState.width=o,e.relatedWindow.splitState.width=100-o}qt()}r.classList.remove(h.dragging)}window.removeEventListener("mousemove",u),window.removeEventListener("mouseup",d)}return{dragStart:w}}const Jt=s.defineComponent({name:"WindowBody",props:{uid:S,body:{default:null}},setup(t){const n=s.inject(C);return function(){return typeof t.body=="function"?t.body(n):t.body}}});function Qt(t){return typeof t=="function"||Object.prototype.toString.call(t)==="[object Object]"&&!s.isVNode(t)}const At=Math.floor(Number.MAX_SAFE_INTEGER/10)-1e4;function te(){return{width:0,height:0,left:0,top:0,focused:!1,pinned:!1}}function ee(){return{mode:i.NONE,width:50,height:50}}function ne(t,n,e,w,u){return s.computed(()=>{if(n.value==W.INIT)return{width:t.width,height:t.height,left:t.left,top:t.top};const d=t.mask?null:u.value,l=w.mode;return l==i.FULLSCREEN?{zIndex:d}:l===i.LEFT||l===i.RIGHT?{top:0,left:l==i.LEFT?0:null,right:l==i.RIGHT?0:null,width:(w.width??50)+"vw",height:"100vh",zIndex:d}:l==i.TOP_LEFT||l==i.TOP_RIGHT||l==i.BOTTOM_LEFT||l==i.BOTTOM_RIGHT?{top:l==i.TOP_LEFT||l==i.TOP_RIGHT?0:null,left:l==i.TOP_LEFT||l==i.BOTTOM_LEFT?0:null,right:l==i.TOP_RIGHT||l==i.BOTTOM_RIGHT?0:null,bottom:l==i.BOTTOM_LEFT||l==i.BOTTOM_RIGHT?0:null,width:"50vw",height:"50vh",zIndex:d}:{top:e.top+"px",left:e.left+"px",width:e.width+"px",height:n.value==W.INIT?null:e.height+"px",zIndex:d}})}const ut=s.defineComponent({name:"BaseWindow",props:{...k,uid:{type:S,required:!0},body:{default:null}},emits:["update:visible","beforeUnmount","unmount"],setup(t,{emit:n,expose:e,slots:w}){const u=S.create(t.uid),d=s.getCurrentInstance(),l=s.ref(W.INIT),r=s.ref(0),o=s.reactive(te()),f=s.reactive(ee()),g={width:0,height:0},_=s.computed(()=>t.draggable&&t.resizable),E=s.computed(()=>typeof t.zIndex=="number"&&t.zIndex>0),H=s.computed(()=>E.value?t.zIndex:(o.pinned?At:0)+r.value),P={get uid(){return u},get visible(){return t.visible},get windowState(){return o},get splitState(){return f},get zIndex(){return H.value},set zIndex(a){r.value=a},exitSplitMode:_e,close:D,saveWindowState:_t,getWindowEl(){return d.refs.window},useCssClass:Le,useMenus:mt},V=t.draggable?Kt(P):null,ue=_.value?$t(P):null,ae=s.computed(()=>{const a=[h.window];return l.value==W.INIT&&a.push(h.init),f.mode==i.FULLSCREEN&&a.push(h.fullscreen),o.focused&&a.push(h.focused),a}),fe=ne(t,l,o,f,H);async function we(a){await s.nextTick();const L=a.el.getBoundingClientRect();if(l.value==W.INIT){const X=J().value.length;let Ot=L.left,Et=L.top,Lt=L.width,Se=L.height;lt(t.left)&&(Ot=(window.innerWidth-Lt)/2),lt(t.top)&&(Et=window.innerHeight*.12+(X-1)*30),o.width=Lt,o.height=Se,o.left=Ot,o.top=Et,t.fullscreen&&(f.mode=i.FULLSCREEN),l.value=W.MOUNTED,_t()}pt()}function D(a=!1){!t.closeable&&a!==!0||n("update:visible",!1)}function Te(a){t.closeable&&(a==null||a.stopPropagation(),D())}function he(){o.focused=!1,s.nextTick(tt)}function pe(a){a.stopPropagation()}function pt(){o.focused||A(u)}function gt(){if(f.mode==i.NONE)return f.mode=i.FULLSCREEN;const{innerWidth:a,innerHeight:m}=window;o.top<0&&(o.top=0),o.top>m-o.height&&(o.top=m-o.height),o.left<0&&(o.left=0),o.left>a-o.width&&(o.left=a-o.width),f.mode=i.NONE}function ge(){o.pinned=!o.pinned}function _t(){g.width=o.width,g.height=o.height}function _e(a){o.top=a.clientY-15,o.left=a.clientX-g.width/2,o.width=g.width,o.height=g.height,f.mode=i.NONE,f.width=50,f.height=50}function me(a){a.stopPropagation()}function Oe(a){const L=(d==null?void 0:d.refs.window).getBoundingClientRect();a.clientY-L.top>30||(a.preventDefault(),gt())}const Ee=s.watch(()=>t.visible,()=>{t.visible||he()});Ht(u,P),s.onBeforeUnmount(()=>{n("beforeUnmount"),D(),$(u)}),s.onUnmounted(()=>{n("unmount"),Ee(),l.value=W.UNMOUNTED}),s.provide(C,P),e(P);function Le(){return h}function mt(a={}){const m=[];if(t.pinnable&&t.mask!==!0&&E.value!==!0&&m.push(s.createVNode("button",{onClick:ge,type:"button",innerHTML:ot,class:o.pinned?h.pinMenu:h.menu,title:"固定"},null)),_.value){const L=f.mode==i.FULLSCREEN?st:nt,I=f.mode==i.FULLSCREEN?"还原":"最大化";m.push(s.createVNode("button",{onClick:gt,type:"button",innerHTML:L,class:h.menu,title:I},null))}return t.closeable&&m.push(s.createVNode("button",{onClick:Te,type:"button",innerHTML:et,class:h.closeMenu,title:"关闭"},null)),m.length==0?null:(a==null?void 0:a.custom)===!0?m:s.createVNode("div",{class:h.menus,onMousedown:pe},[m])}return function(){if(!t.visible)return null;const a=typeof w.header=="function"?w.header(mt):null,m=s.createVNode("div",{class:h.main,onMousedown:V==null?void 0:V.dragStart,onDblclick:Oe},[a,s.createVNode("div",{class:h.body,onClick:me},[s.createVNode(Jt,{body:t.body,key:u.wid,uid:u},null)])]),L={ref:"window",id:t.id??u.wid,onVnodeMounted:we,onMousedownCapture:pt,class:ae.value,style:fe.value};let I=s.h("div",L,[m,ue]);if(t.mask===!0){const X={zIndex:H.value};I=s.createVNode("div",{class:h.mask,style:X},[I])}return t.appendToBody?s.createVNode(s.Teleport,{to:"body"},Qt(I)?I:{default:()=>[I]}):I}}});function ie(t){return typeof t=="function"||Object.prototype.toString.call(t)==="[object Object]"&&!s.isVNode(t)}const v=s.defineComponent({name:"BlankWindow",props:{...k},setup(t,{slots:n,attrs:e}){const{body:w,...u}=n,{uid:d,...l}=e,r=S.create(e.uid);return function(){const o={...t,...l,uid:r,body:n.default};return s.createVNode(ut,o,ie(u)?u:{default:()=>[u]})}}});function oe(t){return typeof t=="function"||Object.prototype.toString.call(t)==="[object Object]"&&!s.isVNode(t)}const F=s.defineComponent({name:"SimpleWindow",props:{...k},setup(t,{slots:n,attrs:e}){const{uid:w,...u}=e,d=S.create(e.uid),l=s.ref(null);function r(f){f.preventDefault();const g=l.value;if(g==null)return;const _=g.windowState.splitMode;g.windowState.splitMode=_==i.FULLSCREEN?i.NONE:i.FULLSCREEN}const o={header(f){const g=f();return s.createVNode("div",{class:h.header,onDblclick:r},[s.createVNode("i",{class:h.logo,innerHTML:it},null),s.createVNode("div",{class:h.title},[t.title??"新窗口"]),g])}};return function(){const f={...t,...u,uid:d,body:n.default};return s.createVNode(ut,s.mergeProps(f,{ref:l}),oe(o)?o:{default:()=>[o]})}}}),at=Object.freeze({SIMPLE_WINDOW:F.name,BLANK_WINDOW:v.name}),Ae="",B={splitWindowMask:"_splitWindowMask_348ej_1",fullscreen:"_fullscreen_348ej_9",splitLeft:"_splitLeft_348ej_16",splitRight:"_splitRight_348ej_23",splitTopLeft:"_splitTopLeft_348ej_30",splitTopRight:"_splitTopRight_348ej_37",splitBottomLeft:"_splitBottomLeft_348ej_44",splitBottomRight:"_splitBottomRight_348ej_51"};function se(t){return typeof t=="function"||Object.prototype.toString.call(t)==="[object Object]"&&!s.isVNode(t)}const le={[i.FULLSCREEN]:B.fullscreen,[i.LEFT]:B.splitLeft,[i.RIGHT]:B.splitRight,[i.TOP_LEFT]:B.splitTopLeft,[i.TOP_RIGHT]:B.splitTopRight,[i.BOTTOM_LEFT]:B.splitBottomLeft,[i.BOTTOM_RIGHT]:B.splitBottomRight},ft={ArrowUp:{[i.BOTTOM_LEFT]:i.LEFT,[i.BOTTOM_RIGHT]:i.RIGHT,[i.LEFT]:i.TOP_LEFT,[i.RIGHT]:i.TOP_RIGHT,fallback:i.FULLSCREEN},ArrowDown:{[i.TOP_LEFT]:i.LEFT,[i.TOP_RIGHT]:i.RIGHT,[i.LEFT]:i.BOTTOM_LEFT,[i.RIGHT]:i.BOTTOM_RIGHT,fallback:i.NONE},ArrowLeft:{[i.TOP_RIGHT]:i.TOP_LEFT,[i.TOP_LEFT]:i.TOP_RIGHT,[i.BOTTOM_RIGHT]:i.BOTTOM_LEFT,[i.BOTTOM_LEFT]:i.BOTTOM_RIGHT,fallback:i.LEFT},ArrowRight:{[i.TOP_LEFT]:i.TOP_RIGHT,[i.TOP_RIGHT]:i.TOP_LEFT,[i.BOTTOM_LEFT]:i.BOTTOM_RIGHT,[i.BOTTOM_RIGHT]:i.BOTTOM_LEFT,fallback:i.RIGHT}},q=s.defineComponent({name:"WindowManager",setup(){const t=J(),n=Ut();function e(l){const r=l.key;if(r=="Escape")return K();if(l.ctrlKey&&r in ft){const o=Ft(),f=Reflect.get(ft,r),g=f[o.splitState.mode]??f.fallback;o.splitState.mode=g;return}}Bt(),window.addEventListener("keydown",e,!0),s.onBeforeUnmount(()=>{zt(),window.removeEventListener("keydown",e,!0)});function w(l){return l==v.name?v:F}const u=s.computed(()=>{const l=[B.splitWindowMask],r=le[n.mode];return r!=null&&l.push(r),l});function d(){let l=null;if(n.mode!=i.NONE){const o={zIndex:yt()+1,width:n.width?n.width-20+"px":null};l=s.createVNode("div",{class:u.value,style:o},null)}return s.createVNode(s.Teleport,{to:"body"},{default:()=>[s.createVNode(s.Transition,{name:"fade"},se(l)?l:{default:()=>[l]})]})}return function(){return[...t.value.map(r=>{const o=Pt(r);if(o==null)return;const f=w(o.type);return s.h(f,o.buildProps())}),d()]}}});function U(t){if(t.length==1){const n=t[0];return n==null?null:typeof n=="object"?n:null}if(t.length==2){const[n,e]=t;if(typeof n=="string"&&e!=null)return{title:n,body:e}}if(t.length==3){const[n,e,w]=t;if(typeof n=="string"&&e!=null)return{title:n,body:e,...w}}return null}function re(...t){const n=U(t);return n==null?(console.error("[xWindow]: 参数有误"),null):j(n)}function de(...t){const n=U(t);return n==null?(console.error("[xWindow]: 参数有误"),null):(n.type=at.BLANK_WINDOW,j(n))}function ce(...t){const n=U(t);return n==null?(console.error("[xWindow]: 参数有误"),null):(n.type=at.SIMPLE_WINDOW,j(n))}function j(t){if(!bt())return console.error("[xWindow] 需要先创建`WindowManager`组件，见文档 "+z+" 。"),null;const{displayAfterCreate:n,unmountAfterClose:e,afterUnmount:w,...u}=t,d={uid:null,visible:s.ref(n!==!1),isUnmounted:!1},l=()=>d.visible.value=!0,r=()=>{d.visible.value=!1,e!==!1&&o()},o=()=>{d.visible.value&&r(),$(d.uid),s.nextTick(tt)},f=Object.assign({},u,{visible:d.visible,[It](g){g?l():r()},[Wt](){d.isUnmounted=!0},[Mt](){typeof w=="function"&&w()}});return d.uid=Gt(G.create(f)),{uid:d.uid,get isUnmounted(){return d.isUnmounted},get visible(){return d.visible.value},show:l,close:r,unmount:o}}function wt(t,n){t.component(F.name,F),t.component(v.name,v),t.component(q.name,q),Dt(n)}const Tt=St,ht={install:wt,version:Tt};p.BlankWindow=v,p.ComponentStates=W,p.SimpleWindow=F,p.WindowManager=q,p.default=ht,p.install=wt,p.useBlankWindow=de,p.useIcons=Yt,p.useSimpleWindow=ce,p.useWindow=re,p.useWindowApi=Xt,p.useWindowManager=Vt,p.version=Tt,p.xWindow=ht,Object.defineProperties(p,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
