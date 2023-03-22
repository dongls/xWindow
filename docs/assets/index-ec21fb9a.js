var Gs=Object.defineProperty;var Us=(s,n,t)=>n in s?Gs(s,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[n]=t;var M=(s,n,t)=>(Us(s,typeof n!="symbol"?n+"":n,t),t);import{s as Ds,r as Z,i as ms,h as F,c as w,g as ss,d as W,a as L,b as q,w as Xs,o as ts,e as Vs,p as $s,T as js,f as V,n as U,m as Ys,j as Js,k as Ts,l as N,q as C,t as As,u as g,F as ns,v as P,x as G,y as z,z as T,A,B as rs,C as Zs,D as Ks,E as Qs,G as st}from"./vendor-b43762aa.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))u(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&u(l)}).observe(document,{childList:!0,subtree:!0});function t(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerpolicy&&(o.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?o.credentials="include":i.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function u(i){if(i.ep)return;i.ep=!0;const o=t(i);fetch(i.href,o)}})();const tt="https://github.com/dongls/xWindow",nt="0.0.5",et="onUpdate:visible",at="onBeforeUnmount",lt="onUnmount",es=Symbol(),k=Object.freeze({INIT:0,MOUNTED:1,UNMOUNTED:2}),as={title:String,id:String,visible:{type:Boolean,default:!1},width:{type:String,default:"640px"},height:{type:String,default:null},left:{type:String,default:null},top:{type:String,default:null},zIndex:{type:Number,default:null},appendToBody:{type:Boolean,default:!0},draggable:{type:Boolean,default:!0},resizable:{type:Boolean,default:!0},closeable:{type:Boolean,default:!0},mask:{type:Boolean,default:!1}},h=Object.freeze({NONE:0,TOP:1<<0,BOTTOM:1<<1,LEFT:1<<2,RIGHT:1<<3}),x=Object.freeze({TOP:h.TOP,BOTTOM:h.BOTTOM,LEFT:h.LEFT,RIGHT:h.RIGHT,TOP_LEFT:h.TOP|h.LEFT,TOP_RIGHT:h.TOP|h.RIGHT,BOTTOM_LEFT:h.BOTTOM|h.LEFT,BOTTOM_RIGHT:h.BOTTOM|h.RIGHT}),e=Object.freeze({NONE:h.NONE,FULLSCREEN:h.TOP,LEFT:h.LEFT,RIGHT:h.RIGHT,TOP_LEFT:h.TOP|h.LEFT,TOP_RIGHT:h.TOP|h.RIGHT,BOTTOM_LEFT:h.BOTTOM|h.LEFT,BOTTOM_RIGHT:h.BOTTOM|h.RIGHT});let ot=1e3;class S{constructor(){M(this,"value");this.value=ot++}get wid(){return"window--"+this.value}static create(n){return n instanceof S?n:Object.freeze(new S)}}class D{constructor(n){M(this,"uid");M(this,"type");M(this,"visible");M(this,"others");M(this,"body");const{visible:t,body:u,type:i,...o}=n;this.uid=S.create(),this.type=i,this.visible=t,this.body=u,this.others=o}static create(n){return n instanceof D?n:new D(n)}get id(){return this.uid.wid}buildProps(){return Object.assign({},this.others,{visible:this.visible.value,body:this.body,uid:this.uid,key:this.id})}}function it(s){const{clientX:n,clientY:t}=s,{innerWidth:u,innerHeight:i}=window;let o=h.NONE;return t<=5&&(o|=h.TOP),t>=i-5&&(o|=h.BOTTOM),n<=5&&(o|=h.LEFT),n>=u-5&&(o|=h.RIGHT),o}const r={isMounted:!1,zIndex:1e3,stack:new Map,ghost:Ds([]),options:new Map,topWindow:null,previewState:Z({mode:e.NONE,width:null,height:null})};function ct(){r.isMounted=!0}function pt(){r.isMounted=!1,r.topWindow=null,r.ghost.value=[],r.stack.clear(),r.options.clear()}function rt(){return r.isMounted}function ut(){return r.zIndex}function dt(){return r.zIndex+=2}function ht(){const s=r.topWindow;return s?s.zIndex:1}function ft(s){typeof s=="number"&&Number.isFinite(s)&&(r.zIndex=Math.floor(s))}function gt(){return r.topWindow}function wt(s,n){r.stack.set(s,n)}function vs(s){r.stack.delete(s),r.options.delete(s);const n=r.ghost.value.indexOf(s);if(n>=0){const t=r.ghost.value;t.splice(n,1),r.ghost.value=t.slice()}}function _t(){r.stack.size==0||r.topWindow==null||r.topWindow.close()}function mt(s){return r.options.get(s)}function jt(s){const n=r.ghost.value;return n.push(s.uid),r.ghost.value=n.slice(),r.options.set(s.uid,s),s.uid}function ys(){return r.ghost}function Os(s){if(r.topWindow=s,s!=null){for(const n of r.stack.values()){const t=n.windowState;t.focused=n===s}s.zIndex<ut()&&(s.zIndex=dt())}}function Tt(s){const n=r.stack.get(s);Os(n)}function Ss(){const s=vt();Os(s)}function vt(){return r.stack.size==0?null:Array.from(r.stack.values()).filter(n=>n.visible).sort((n,t)=>t.zIndex-n.zIndex)[0]}function yt(s){let n=null;const t=it(s);if(r.previewState.mode=t,(t==e.LEFT||t==e.RIGHT)&&(n=K(t==e.LEFT?e.RIGHT:e.LEFT),n)){const u=window.innerWidth-n.getWindowEl().offsetWidth;r.previewState.width=u}return{mode:r.previewState.mode,width:r.previewState.width,relatedWindow:n}}function Ot(){return r.previewState.mode=e.NONE,r.previewState.height=null,r.previewState.width=null,e.NONE}function St(){return r.previewState}function K(s){let n=null;for(const t of r.stack.values())t.splitState.mode===s&&(n==null||t.zIndex>n.zIndex)&&(n=t);return n}function xt(s){ft(s==null?void 0:s.zIndex)}function bt(){return ms(es)}const Et="_window_o9g8u_7",Lt="_dragging_o9g8u_17",Wt="_resizing_o9g8u_17",Bt="_fullscreen_o9g8u_21",It="_focused_o9g8u_31",Mt="_header_o9g8u_34",kt="_main_o9g8u_38",Rt="_init_o9g8u_45",zt="_title_o9g8u_63",Nt="_menus_o9g8u_73",Ft="_body_o9g8u_79",qt="_footer_o9g8u_84",Ht="_menu_o9g8u_73",Ct="_closeMenu_o9g8u_135 _menu_o9g8u_73",Pt="_pinMenu_o9g8u_146 _menu_o9g8u_73",Gt="_logo_o9g8u_153",Ut="_resize_o9g8u_165",Dt="_resizeBar_o9g8u_169",Xt="_resizeTop_o9g8u_174 _resizeBar_o9g8u_169",Vt="_resizeBottom_o9g8u_175 _resizeBar_o9g8u_169",$t="_resizeRight_o9g8u_191 _resizeBar_o9g8u_169",Yt="_resizeLeft_o9g8u_192 _resizeBar_o9g8u_169",Jt="_resizeTopLeft_o9g8u_208 _resizeBar_o9g8u_169",At="_resizeBottomLeft_o9g8u_209 _resizeBar_o9g8u_169",Zt="_resizeTopRight_o9g8u_210 _resizeBar_o9g8u_169",Kt="_resizeBottomRight_o9g8u_211 _resizeBar_o9g8u_169",Qt="_mask_o9g8u_241",f={window:Et,dragging:Lt,resizing:Wt,fullscreen:Bt,focused:It,header:Mt,main:kt,init:Rt,title:zt,menus:Nt,body:Ft,footer:qt,menu:Ht,closeMenu:Ct,pinMenu:Pt,logo:Gt,resize:Ut,resizeBar:Dt,resizeTop:Xt,resizeBottom:Vt,resizeRight:$t,resizeLeft:Yt,resizeTopLeft:Jt,resizeBottomLeft:At,resizeTopRight:Zt,resizeBottomRight:Kt,mask:Qt},xs='<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M590.265 511.987l305.521-305.468c21.617-21.589 21.617-56.636.027-78.252-21.616-21.617-56.663-21.617-78.279 0L512.012 433.735 206.544 128.213c-21.617-21.617-56.635-21.617-78.252 0-21.616 21.589-21.616 56.635-.027 78.252L433.76 511.987 128.211 817.482c-21.617 21.59-21.617 56.635 0 78.251 10.808 10.81 24.967 16.213 39.125 16.213 14.159 0 28.318-5.403 39.126-16.213l305.522-305.468L817.48 895.788C828.289 906.597 842.447 912 856.606 912s28.317-5.403 39.125-16.212c21.618-21.59 21.618-56.636.028-78.252L590.265 511.987z"/></svg>',bs='<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M928.7 135.8H99.8c-21.15 0-37.8 17.55-37.8 35.1v685.35c0 17.55 17.1 31.5 37.8 31.5h828.45c21.15 0 33.3-14.4 33.3-31.5v-684.9c.45-17.55-12.15-35.55-32.85-35.55zm-53.1 666.9H147.5V222.2h728.1v580.5z"/></svg>',Es='<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M38.794 124.791v778.495h946.412V124.791H38.794zm896.678 728.033H89.292v-460.9h846.18v460.9z"/></svg>',Ls='<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M738.793 681.382v-48.331l88.242-88.243a298.676 298.676 0 00156.712-83.482 38.836 38.836 0 000-54.923l-366.15-366.15a38.836 38.836 0 00-54.923 0 298.52 298.52 0 00-83.519 156.749l-88.169 88.169h-48.332a411.145 411.145 0 00-292.59 121.232c-15.16 15.159-15.16 39.764 0 54.923L278.906 690.17 86.642 882.436a38.836 38.836 0 1054.922 54.922l192.23-192.229 228.844 228.845a38.836 38.836 0 0054.922 0 411.042 411.042 0 00121.233-292.592zM134.02 435.44a333.473 333.473 0 01208.56-72.571l64.406.037a38.836 38.836 0 0027.461-11.351L544.292 241.71a38.68 38.68 0 0011.351-27.462 180.096 180.096 0 0136.798-89.01L898.8 431.593a180.925 180.925 0 01-89.12 36.835 38.836 38.836 0 00-27.462 11.35L672.373 589.626c-7.287 7.286-11.387 17.173-11.35 27.461l.036 64.406a333.318 333.318 0 01-72.608 208.596L134.021 435.44z"/></svg>';function sn(){return{IconClose:xs,IconMax:bs,IconPin:Ls,IconWindow:Es}}function y(s,n,t){return n!=null&&Number.isFinite(n)&&s<n?n:t!=null&&Number.isFinite(t)&&s>t?t:s}function us(s){return s==null||typeof s!="string"?!0:s.length==0}const ds="__xWindow_resize_prop__",R=360,hs=32,tn=[[f.resizeTop,b(x.TOP)],[f.resizeBottom,b(x.BOTTOM)],[f.resizeLeft,b(x.LEFT)],[f.resizeRight,b(x.RIGHT)],[f.resizeTopLeft,b(x.TOP_LEFT)],[f.resizeTopRight,b(x.TOP_RIGHT)],[f.resizeBottomLeft,b(x.BOTTOM_LEFT)],[f.resizeBottomRight,b(x.BOTTOM_RIGHT)]];function b(s){return s.toString(2).padStart(4,"0")}function fs(s,n,t){const u=n.getBoundingClientRect(),i=document.documentElement.getBoundingClientRect(),o={};if(t.direction[3]=="1"){const l=y(u.bottom-y(s.clientY,0),hs),p=y(s.clientY-i.top,0,window.innerHeight-l);o.height=l,o.top=p}if(t.direction[2]=="1"){const l=y(y(s.clientY,0,window.innerHeight)-u.top,hs),p=y(s.clientY-l-i.top,0,window.innerHeight-l);o.height=l,o.top=p}if(t.direction[1]=="1"){const l=y(u.right-y(s.clientX,0),R,window.innerWidth-R),p=y(s.clientX-i.left,t.relatedWindow?R:0,window.innerWidth-l);o.width=l,o.left=p}if(t.direction[0]=="1"){const l=y(y(s.clientX,0,window.innerWidth-R)-u.left,R,window.innerWidth-R),p=y(s.clientX-l-i.left,0,window.innerWidth-l-R);o.width=l,o.left=p}return o}function nn(s){const n=ss(),t={init:!1,direction:null,top:0,left:0,width:0,height:0,relatedWindow:null};function u(p){p.preventDefault(),p.stopPropagation();const a=s.windowState,c=s.splitState;t.init=!1,t.direction=p.target[ds],t.top=a.top,t.left=a.left,t.width=a.width,t.height=a.height,c.mode==e.LEFT&&t.direction==e.RIGHT.toString(2).padStart(4,"0")&&(t.relatedWindow=K(e.RIGHT)),c.mode==e.RIGHT&&t.direction==e.LEFT.toString(2).padStart(4,"0")&&(t.relatedWindow=K(e.LEFT)),window.addEventListener("mousemove",i),window.addEventListener("mouseup",o)}function i(p){p.preventDefault();const a=n==null?void 0:n.refs.window,c=s.splitState;if(t.init||(a.classList.add(f.resizing),t.init=!0),s.splitState.mode!=e.NONE&&(t.top=s.windowState.top,t.left=s.windowState.left,t.width=s.windowState.width,t.height=s.windowState.height,!(c.mode==e.LEFT&&t.direction==e.RIGHT.toString(2).padStart(4,"0")||c.mode==e.RIGHT&&t.direction==e.LEFT.toString(2).padStart(4,"0")))){const _=a.getBoundingClientRect();s.windowState.top=_.top,s.windowState.left=_.left,s.windowState.width=_.width,s.windowState.height=_.height,s.splitState.mode=e.NONE,t.top=s.windowState.top,t.left=s.windowState.left,t.width=s.windowState.width,t.height=s.windowState.height}const j=fs(p,a,t);for(const _ in j){const v=Math.round(j[_]);Reflect.set(t,_,v),Reflect.set(a.style,_,v+"px")}if(c.mode==e.LEFT||c.mode==e.RIGHT){const _=t.relatedWindow;if(_!=null){const v=_.getWindowEl();Reflect.set(v.style,"width",window.innerWidth-t.width+"px")}}}function o(p){if(p.preventDefault(),t.init){const a=n==null?void 0:n.refs.window;fs(p,a,t)!=null&&(s.windowState.top=t.top,s.windowState.left=t.left,s.windowState.width=t.width,s.windowState.height=t.height,s.saveWindowState()),a.classList.remove(f.resizing);const j=s.splitState;if(j.mode==e.LEFT||j.mode==e.RIGHT){const _=t.relatedWindow;if(_!=null){const v=s.splitState;v.width=t.width/window.innerWidth*100;const B=100-v.width;_.splitState.width=B}}}window.removeEventListener("mousemove",i),window.removeEventListener("mouseup",o)}const l=tn.map(p=>F("div",{className:p[0],["."+ds]:p[1]}));return w("div",{class:f.resize,onMousedown:u},[l])}function en(s){const n=ss(),t={init:!1,left:0,top:0,prevClientX:0,prevClientY:0,splitMode:e.NONE,splitWidth:null,relatedWindow:null};function u(l){const a=(n==null?void 0:n.refs.window).getBoundingClientRect();l.clientY-a.top>30||(l.preventDefault(),t.init=!1,t.left=s.windowState.left,t.top=s.windowState.top,t.prevClientX=l.clientX,t.prevClientY=l.clientY,window.addEventListener("mousemove",i),window.addEventListener("mouseup",o))}function i(l){l.preventDefault();const p=n==null?void 0:n.refs.window;t.init||(p.classList.add(f.dragging),t.init=!0),s.splitState.mode!=e.NONE&&(s.exitSplitMode(l),t.left=s.windowState.left,t.top=s.windowState.top),t.left=Math.round(t.left+l.clientX-t.prevClientX),t.top=Math.round(t.top+l.clientY-t.prevClientY),t.prevClientX=l.clientX,t.prevClientY=l.clientY,p.style.left=t.left+"px",p.style.top=t.top+"px";const a=yt(l);t.splitMode=a.mode,t.splitWidth=a.width,t.relatedWindow=a.relatedWindow}function o(l){if(l.preventDefault(),t.init){const p=n==null?void 0:n.refs.window;if(s.windowState.top=t.top,s.windowState.left=t.left,t.splitMode!==e.NONE){if(s.splitState.mode=t.splitMode,t.relatedWindow){const a=t.splitWidth/window.innerWidth*100;s.splitState.width=a,t.relatedWindow.splitState.width=100-a}Ot()}p.classList.remove(f.dragging)}window.removeEventListener("mousemove",i),window.removeEventListener("mouseup",o)}return{dragStart:u}}const an=W({name:"WindowBody",props:{uid:S,body:{default:null}},setup(s){const n=ms(es);return function(){return typeof s.body=="function"?s.body(n):s.body}}});function ln(s){return typeof s=="function"||Object.prototype.toString.call(s)==="[object Object]"&&!V(s)}const on=Math.floor(Number.MAX_SAFE_INTEGER/10)-1e4;function cn(){return{width:0,height:0,left:0,top:0,focused:!1,pinned:!1}}function pn(){return{mode:e.NONE,width:50,height:50}}const Ws=W({name:"BaseWindow",props:{...as,uid:{type:S,required:!0},body:{default:null}},emits:["update:visible","beforeUnmount","unmount"],setup(s,{emit:n,expose:t,slots:u}){const i=S.create(s.uid),o=ss(),l=L(k.INIT),p=L(0),a=Z(cn()),c=Z(pn()),j={width:0,height:0},_=q(()=>s.draggable&&s.resizable),v=q(()=>typeof s.zIndex=="number"&&s.zIndex>0?s.zIndex:(a.pinned?on:0)+p.value),B={get uid(){return i},get visible(){return s.visible},get windowState(){return a},get splitState(){return c},get zIndex(){return v.value},get menus(){return is()},set zIndex(d){p.value=d},exitSplitMode:Hs,close:Y,saveWindowState:os,getWindowEl(){return o.refs.window}},$=s.draggable?en(B):null,Is=_.value?nn(B):null,Ms=q(()=>{const d=[f.window];return l.value==k.INIT&&d.push(f.init),c.mode==e.FULLSCREEN&&d.push(f.fullscreen),a.focused&&d.push(f.focused),d}),ks=q(()=>{if(l.value==k.INIT)return{width:s.width,height:s.height,left:s.left,top:s.top};const d=s.mask?null:v.value,m=c.mode;if(m==e.FULLSCREEN)return{zIndex:d};if(m===e.LEFT||m===e.RIGHT){const O=c.width??50;return{top:0,left:m==e.LEFT?0:null,right:m==e.RIGHT?0:null,width:O+"vw",height:"100vh",zIndex:d}}return m==e.TOP_LEFT||m==e.TOP_RIGHT||m==e.BOTTOM_LEFT||m==e.BOTTOM_RIGHT?{top:m==e.TOP_LEFT||m==e.TOP_RIGHT?0:null,left:m==e.TOP_LEFT||m==e.BOTTOM_LEFT?0:null,right:m==e.TOP_RIGHT||m==e.BOTTOM_RIGHT?0:null,bottom:m==e.BOTTOM_LEFT||m==e.BOTTOM_RIGHT?0:null,width:"50vw",height:"50vh",zIndex:d}:{top:a.top+"px",left:a.left+"px",width:a.width+"px",height:l.value==k.INIT?null:a.height+"px",zIndex:d}});async function Rs(d){await U();const O=d.el.getBoundingClientRect();if(l.value==k.INIT){const J=ys().value.length;let cs=O.left,ps=O.top;us(s.left)&&(cs=(window.innerWidth-O.width)/2),us(s.top)&&(ps=window.innerHeight*.18+J*30),a.width=O.width,a.height=O.height,a.left=cs,a.top=ps,l.value=k.MOUNTED,os()}ls()}function Y(d){s.closeable&&(d==null||d.stopPropagation(),n("update:visible",!1))}function zs(){a.focused=!1,U(Ss)}function Ns(d){d.stopPropagation()}function ls(){a.focused||Tt(i)}function Fs(){c.mode=c.mode==e.FULLSCREEN?e.NONE:e.FULLSCREEN}function qs(){a.pinned=!a.pinned}function os(){j.width=a.width,j.height=a.height}function Hs(d){a.top=d.clientY-15,a.left=d.clientX-j.width/2,a.width=j.width,a.height=j.height,c.mode=e.NONE,c.width=50,c.height=50}function Cs(d){d.stopPropagation()}const Ps=Xs(()=>s.visible,()=>{s.visible||zs()});wt(i,B),ts(()=>{n("beforeUnmount"),Y(),vs(i)}),Vs(()=>{n("unmount"),Ps(),l.value=k.UNMOUNTED}),$s(es,B),t(B);function is(){const d=[];return s.mask!==!0&&d.push(w("button",{onClick:qs,type:"button",innerHTML:Ls,class:a.pinned?f.pinMenu:f.menu,title:"固定"},null)),_.value&&d.push(w("button",{onClick:Fs,type:"button",innerHTML:bs,class:f.menu,title:"最大化"},null)),s.closeable&&d.push(w("button",{onClick:Y,type:"button",innerHTML:xs,class:f.closeMenu,title:"关闭"},null)),d.length==0?null:w("div",{class:f.menus,onMousedown:Ns},[d])}return function(){if(!s.visible)return null;const d=typeof u.header=="function"?u.header(is()):null,m=w("div",{class:f.main,onMousedown:$==null?void 0:$.dragStart},[d,w("div",{class:f.body,onClick:Cs},[w(an,{body:s.body,key:i.wid,uid:i},null)])]),O={ref:"window",id:s.id??i.wid,onVnodeMounted:Rs,onMousedownCapture:ls,class:Ms.value,style:ks.value};let I=F("div",O,[m,Is]);if(s.mask===!0){const J={zIndex:v.value};I=w("div",{class:f.mask,style:J},[I])}return s.appendToBody?w(js,{to:"body"},ln(I)?I:{default:()=>[I]}):I}}});function rn(s){return typeof s=="function"||Object.prototype.toString.call(s)==="[object Object]"&&!V(s)}const Q=W({name:"SimpleWindow",props:{...as},setup(s,{slots:n,attrs:t}){const{uid:u,...i}=t,o=S.create(t.uid),l=L(null);function p(c){c.preventDefault();const j=l.value;if(j==null)return;const _=j.windowState.splitMode;j.windowState.splitMode=_==e.FULLSCREEN?e.NONE:e.FULLSCREEN}const a={header(c){return w("div",{class:f.header,onDblclick:p},[w("i",{class:f.logo,innerHTML:Es},null),w("div",{class:f.title},[s.title??"新窗口"]),c])}};return function(){const c={...s,...i,uid:o,body:n.default};return w(Ws,Ys(c,{ref:l}),rn(a)?a:{default:()=>[a]})}}});function un(s){return typeof s=="function"||Object.prototype.toString.call(s)==="[object Object]"&&!V(s)}const X=W({name:"BlankWindow",props:{...as},setup(s,{slots:n,attrs:t}){const{body:u,...i}=n,{uid:o,...l}=t,p=S.create(t.uid);return function(){const a={...s,...l,uid:p,body:n.default};return w(Ws,a,un(i)?i:{default:()=>[i]})}}});const dn="_splitWindowMask_348ej_1",hn="_fullscreen_348ej_9",fn="_splitLeft_348ej_16",gn="_splitRight_348ej_23",wn="_splitTopLeft_348ej_30",_n="_splitTopRight_348ej_37",mn="_splitBottomLeft_348ej_44",jn="_splitBottomRight_348ej_51",E={splitWindowMask:dn,fullscreen:hn,splitLeft:fn,splitRight:gn,splitTopLeft:wn,splitTopRight:_n,splitBottomLeft:mn,splitBottomRight:jn};function Tn(s){return typeof s=="function"||Object.prototype.toString.call(s)==="[object Object]"&&!V(s)}const vn={[e.FULLSCREEN]:E.fullscreen,[e.LEFT]:E.splitLeft,[e.RIGHT]:E.splitRight,[e.TOP_LEFT]:E.splitTopLeft,[e.TOP_RIGHT]:E.splitTopRight,[e.BOTTOM_LEFT]:E.splitBottomLeft,[e.BOTTOM_RIGHT]:E.splitBottomRight};function yn(s){return s==e.BOTTOM_LEFT?e.LEFT:s==e.BOTTOM_RIGHT?e.RIGHT:s==e.LEFT?e.TOP_LEFT:s==e.RIGHT?e.TOP_RIGHT:e.FULLSCREEN}function On(s){return s==e.TOP_LEFT?e.LEFT:s==e.TOP_RIGHT?e.RIGHT:s==e.LEFT?e.BOTTOM_LEFT:s==e.RIGHT?e.BOTTOM_RIGHT:e.NONE}function Sn(s){return s==e.TOP_RIGHT?e.TOP_LEFT:s==e.BOTTOM_RIGHT?e.BOTTOM_LEFT:s==e.TOP_LEFT?e.TOP_RIGHT:s==e.BOTTOM_LEFT?e.BOTTOM_RIGHT:e.LEFT}function xn(s){return s==e.TOP_LEFT?e.TOP_RIGHT:s==e.BOTTOM_LEFT?e.BOTTOM_RIGHT:s==e.TOP_RIGHT?e.TOP_LEFT:s==e.BOTTOM_RIGHT?e.BOTTOM_LEFT:e.RIGHT}const gs={ArrowUp:yn,ArrowDown:On,ArrowLeft:Sn,ArrowRight:xn};function bn(){_t()}const ws=W({name:"WindowManager",setup(){const s=ys(),n=St();function t(l){const p=l.key;if(p=="Escape")return bn();if(l.ctrlKey&&p in gs){const a=gt(),c=gs[p];a.splitState.mode=c(a.splitState.mode);return}}ct(),window.addEventListener("keydown",t,!0),ts(()=>{pt(),window.removeEventListener("keydown",t,!0)});function u(l){return l==X.name?X:Q}const i=q(()=>{const l=[E.splitWindowMask],p=vn[n.mode];return p!=null&&l.push(p),l});function o(){let l=null;if(n.mode!=e.NONE){const a={zIndex:ht()+1,width:n.width?n.width-20+"px":null};l=w("div",{class:i.value,style:a},null)}return w(js,{to:"body"},{default:()=>[w(Js,{name:"fade"},Tn(l)?l:{default:()=>[l]})]})}return function(){return[...s.value.map(p=>{const a=mt(p);if(a==null)return;const c=u(a.type);return F(c,a.buildProps())}),o()]}}});function En(s){if(s.length==1){const n=s[0];return n==null?null:typeof n=="object"?n:null}if(s.length==2){const[n,t]=s;if(typeof n=="string"&&t!=null)return{title:n,body:t}}return null}function H(...s){const n=En(s);return n==null?(console.error("[xWindow]: 参数有误"),null):Ln(n)}function Ln(s){if(!rt())return console.error("[xWindow] 需要先创建`WindowManager`组件，见文档 "+tt+" 。"),null;const{displayAfterCreate:n,unmountAfterClose:t,afterUnmount:u,...i}=s,o={uid:null,visible:L(n!==!1),isUnmounted:!1},l=()=>o.visible.value=!0,p=()=>{o.visible.value=!1,t!==!1&&a()},a=()=>{o.visible.value&&p(),vs(o.uid),U(Ss)},c=Object.assign({},i,{visible:o.visible,[et](j){j?l():p()},[at](){o.isUnmounted=!0},[lt](){typeof u=="function"&&u()}});return o.uid=jt(D.create(c)),{uid:o.uid,get isUnmounted(){return o.isUnmounted},get visible(){return o.visible.value},show:l,close:p,unmount:a}}function Wn(s,n){s.component(Q.name,Q),s.component(X.name,X),s.component(ws.name,ws),xt(n)}const Bn=nt,In={install:Wn,version:Bn},Mn=`<p><code>xWindow</code>是基于<code>Vue</code>的仿<code>Windows</code>窗口的组件库，旨在提供一套快捷的API来创建和使用窗口。</p>
<p><code>xWindow</code>最大的特色是可以<strong>通过函数直接创建窗口</strong>，显示你想要的东西。 在业务系统中，由于业务的复杂性业务中往往存在多个窗口，通常情况下，需要在业务组件内将其一一定义，并维护这些窗口的状态。这些状态不仅定义繁琐，而且与业务无关，例如这样：</p>
<pre class="hljs" language="vue"><code class="hljs-code"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">xx-dialog</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;visible1&quot;</span> <span class="hljs-attr">title</span>=<span class="hljs-string">&quot;窗口标题1&quot;</span>&gt;</span>dialog content<span class="hljs-tag">&lt;/<span class="hljs-name">xx-dialog</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">xx-dialog</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;visible2&quot;</span> <span class="hljs-attr">title</span>=<span class="hljs-string">&quot;窗口标题2&quot;</span>&gt;</span>dialog content<span class="hljs-tag">&lt;/<span class="hljs-name">xx-dialog</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">xx-dialog</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;visible3&quot;</span> <span class="hljs-attr">title</span>=<span class="hljs-string">&quot;窗口标题3&quot;</span>&gt;</span>dialog content<span class="hljs-tag">&lt;/<span class="hljs-name">xx-dialog</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">setup</span>&gt;</span><span class="language-javascript">
<span class="hljs-keyword">import</span> { ref } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vue&#x27;</span>

<span class="hljs-keyword">const</span> visible1 = <span class="hljs-title function_">ref</span>(<span class="hljs-literal">false</span>)
<span class="hljs-keyword">const</span> visible2 = <span class="hljs-title function_">ref</span>(<span class="hljs-literal">false</span>)
<span class="hljs-keyword">const</span> visible3 = <span class="hljs-title function_">ref</span>(<span class="hljs-literal">false</span>)
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>如果你觉得上述过程繁琐，下面是一个<code>xWindow</code>的基本示例：</p>
<pre class="hljs" language="js"><code class="hljs-code"><span class="hljs-keyword">import</span> { useWindow } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@dongls/xwindow&#x27;</span>

<span class="hljs-comment">//你可以在需要地方通过代码直接创建一个窗口</span>
<span class="hljs-title function_">useWindow</span>(<span class="hljs-string">&#x27;函数式调用&#x27;</span>, <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Hello, xWindow!<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>)
</code></pre>
<p><code>xWindow</code>不需要事先在组件中声明，你可以在任何需要的地方直接创建一个窗口。当然，<code>xWindow</code>作为一个窗口组件也是很优秀的，内置拖拽、调整大小、<strong>分屏</strong>等功能。</p>
<h2 class="head-anchor article-sticky-heading" id="安装">安装</h2>
<p>推荐使用包管理器安装<code>xWindow</code>，通过构建工具（<a href="https://github.com/webpack/webpack">Webpack</a>、<a href="https://github.com/vitejs/vite">Vite</a>）使用。</p>
<pre class="hljs" language="bash"><code class="hljs-code">npm i @dongls/xwindow
</code></pre>
<p>安装成功后，按如下代码引入即可。</p>
<pre class="hljs" language="javascript"><code class="hljs-code"><span class="hljs-keyword">import</span> <span class="hljs-string">&#x27;@dongls/xwindow/dist/style.css&#x27;</span>
<span class="hljs-keyword">import</span> { xWindow } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@dongls/xwindow&#x27;</span>

<span class="hljs-keyword">import</span> { createApp } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vue&#x27;</span>
<span class="hljs-keyword">import</span> <span class="hljs-title class_">App</span> <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./App.vue&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-title function_">createApp</span>(<span class="hljs-title class_">App</span>)
app.<span class="hljs-title function_">use</span>(xWindow)
app.<span class="hljs-title function_">mount</span>(<span class="hljs-string">&#x27;#app&#x27;</span>)
</code></pre>
<p><code>xWindow</code>使用<code>TypeScript</code>编写，默认会创建声明文件，你可以在<code>node_modules\\@dongls\\xwindow\\types</code>文件夹下找到它们。主流的文件编辑器或IDE都内建了对<code>TypeScript</code>的支持，你在使用过程中会得到类型提示。如果你的工程也使用了<code>TypeScript</code>，你可能需要用到<code>xWindow</code>定义的类型。</p>
<pre class="hljs" language="typescript"><code class="hljs-code"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">WindowInstance</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@dongls/xwindow&#x27;</span>

<span class="hljs-keyword">let</span> <span class="hljs-attr">instance</span>:<span class="hljs-title class_">WindowInstance</span> = <span class="hljs-literal">null</span>
</code></pre>`,kn=`<p><code>xWindow</code>提供了<code>useWindow</code>函数，用于快速创建窗口，这也是推荐的使用方式。</p>
<p>需要注意的是，在使用<code>useWindow</code>函数之前，<strong>请先声明<code>WindowManager</code>组件</strong>。该组件提供了对函数式调用的支持，以及键盘事件的响应。</p>
<pre class="hljs" language="vue"><code class="hljs-code"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- 推荐在工程的根组件中声明WindowManger组件 --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">WindowManager</span>/&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
</code></pre>
<p>另外需要注意的是，由于抛弃了通过模板创建窗口，因此推荐<code>JSX</code>来声明要展示的内容。如果你对此并不熟悉，请先阅读<code>Vue</code>文档中的<a href="https://cn.vuejs.org/guide/extras/render-function.html">渲染函数&amp;JSX</a>一节。</p>
<pre class="hljs" language="vue"><code class="hljs-code"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;radio&quot;</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;type&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;0&quot;</span>&gt;</span>JSX<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;radio&quot;</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;type&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;1&quot;</span>&gt;</span>文本<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;radio&quot;</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;type&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;2&quot;</span>&gt;</span>渲染函数<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;radio&quot;</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;type&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;3&quot;</span>&gt;</span>函数<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;button&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;showWindow&quot;</span>&gt;</span>创建窗口<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;tsx&quot;</span> <span class="hljs-attr">setup</span>&gt;</span><span class="language-javascript">
<span class="hljs-keyword">import</span> { h, ref } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vue&#x27;</span>
<span class="hljs-keyword">import</span> { useWindow } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@dongls/xwindow&#x27;</span>

<span class="hljs-keyword">const</span> type = <span class="hljs-title function_">ref</span>(<span class="hljs-string">&#x27;0&#x27;</span>)

<span class="hljs-keyword">function</span> <span class="hljs-title function_">showWindow</span>(<span class="hljs-params"></span>){
  <span class="hljs-keyword">if</span>(type.<span class="hljs-property">value</span> == <span class="hljs-string">&#x27;0&#x27;</span>) <span class="hljs-keyword">return</span> <span class="hljs-title function_">createContentByJSX</span>()
  <span class="hljs-keyword">if</span>(type.<span class="hljs-property">value</span> == <span class="hljs-string">&#x27;1&#x27;</span>) <span class="hljs-keyword">return</span> <span class="hljs-title function_">createContentByText</span>()
  <span class="hljs-keyword">if</span>(type.<span class="hljs-property">value</span> == <span class="hljs-string">&#x27;2&#x27;</span>) <span class="hljs-keyword">return</span> <span class="hljs-title function_">createContentByRenderFunction</span>()
  <span class="hljs-keyword">if</span>(type.<span class="hljs-property">value</span> == <span class="hljs-string">&#x27;3&#x27;</span>) <span class="hljs-keyword">return</span> <span class="hljs-title function_">createContentByFunction</span>()
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">createContentByJSX</span>(<span class="hljs-params"></span>){
  <span class="hljs-title function_">useWindow</span>(<span class="hljs-string">&#x27;窗口1&#x27;</span>, <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;example-body&quot;</span>&gt;</span>这段文本是使用JSX创建的。<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>)
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">createContentByText</span>(<span class="hljs-params"></span>){
  <span class="hljs-title function_">useWindow</span>(<span class="hljs-string">&#x27;窗口2&#x27;</span>, <span class="hljs-string">&#x27;这段本文可以直接展示。&#x27;</span>)
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">createContentByRenderFunction</span>(<span class="hljs-params"></span>){
  <span class="hljs-title function_">useWindow</span>(<span class="hljs-string">&#x27;窗口3&#x27;</span>, <span class="hljs-title function_">h</span>(<span class="hljs-string">&#x27;div&#x27;</span>, { <span class="hljs-attr">className</span>: <span class="hljs-string">&#x27;example-body&#x27;</span> }, <span class="hljs-string">&#x27;这段文本是通过Vue提供的渲染函数创建的。&#x27;</span>))
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">createContentByFunction</span>(<span class="hljs-params"></span>){
  <span class="hljs-title function_">useWindow</span>(<span class="hljs-string">&#x27;窗口4&#x27;</span>, <span class="hljs-function">() =&gt;</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;example-body&quot;</span>&gt;</span>这段文本是通过返回VNode节点的函数创建的。<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>)
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>最终效果如下：
<span class="quickstart-function-based"><FunctionBased/></span></p>`,Rn=`<p><code>xWindow</code>默认注册了<code>SimpleWindow</code>组件，你可以直接使用它，例如：</p>
<pre class="hljs" language="vue"><code class="hljs-code"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">SimpleWindow</span> <span class="hljs-attr">v-model:visible</span>=<span class="hljs-string">&quot;visible&quot;</span> <span class="hljs-attr">title</span>=<span class="hljs-string">&quot;组件式调用&quot;</span> &gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Hello, xWindow!<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">SimpleWindow</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;button&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;showWindow&quot;</span>&gt;</span>显示窗口<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">setup</span>&gt;</span><span class="language-javascript">
<span class="hljs-keyword">import</span> { ref } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vue&#x27;</span>

<span class="hljs-keyword">const</span> visible = <span class="hljs-title function_">ref</span>(<span class="hljs-literal">false</span>)

<span class="hljs-keyword">function</span> <span class="hljs-title function_">showWindow</span>(<span class="hljs-params"></span>){
  visible.<span class="hljs-property">value</span> = <span class="hljs-literal">true</span>
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>最终效果如下：
<ComponentBased/></p>`,_s=[{id:1,name:"简介",content:Mn},{id:2,name:"组件式调用",content:Rn},{id:3,name:"函数式调用(推荐)",content:kn}],zn=g("div",null,"Hello, xWindow!",-1),Nn={__name:"ComponentBased",setup(s){const n=L(!1);function t(){n.value=!0}return(u,i)=>{const o=Ts("SimpleWindow");return N(),C(ns,null,[w(o,{visible:n.value,"onUpdate:visible":i[0]||(i[0]=l=>n.value=l),title:"组件式调用"},{default:As(()=>[zn]),_:1},8,["visible"]),g("button",{type:"button",onClick:t},"显示窗口")],64)}}},Fn=W({__name:"FunctionBased",setup(s){const n=L("0");function t(){if(n.value=="0")return u();if(n.value=="1")return i();if(n.value=="2")return o();if(n.value=="3")return l()}function u(){H("窗口1",w("div",{class:"example-body"},[z("这段文本是使用JSX创建的。")]))}function i(){H("窗口2","这段本文可以直接展示。")}function o(){H("窗口3",F("div",{className:"example-body"},"这段文本是通过Vue提供的渲染函数创建的。"))}function l(){H("窗口4",()=>w("div",{class:"example-body"},[z("这段文本是通过返回VNode节点的函数创建的。")]))}return(p,a)=>(N(),C(ns,null,[g("label",null,[P(g("input",{type:"radio","onUpdate:modelValue":a[0]||(a[0]=c=>n.value=c),value:"0"},null,512),[[G,n.value]]),z("JSX")]),g("label",null,[P(g("input",{type:"radio","onUpdate:modelValue":a[1]||(a[1]=c=>n.value=c),value:"1"},null,512),[[G,n.value]]),z("文本")]),g("label",null,[P(g("input",{type:"radio","onUpdate:modelValue":a[2]||(a[2]=c=>n.value=c),value:"2"},null,512),[[G,n.value]]),z("渲染函数")]),g("label",null,[P(g("input",{type:"radio","onUpdate:modelValue":a[3]||(a[3]=c=>n.value=c),value:"3"},null,512),[[G,n.value]]),z("函数")]),g("button",{type:"button",onClick:t},"创建窗口")],64))}}),qn={ComponentBased:Nn,FunctionBased:Fn},Hn=["innerHTML"],Cn=g("span",null,"xForm",-1),Pn=["onClick"],Gn=g("span",null,"Copyright © 2023-present dongls",-1),Un=g("a",{class:"link",href:"https://github.com/dongls/xWindow",target:"_blank"},"GitHub",-1),Dn=[Gn,Un],Xn=W({__name:"docs",setup(s){const n=bt(),t=sn(),u=L(_s[0]),i="0.0.5",o=L();function l(){return n.menus}function p(){const c=u.value.content;return F("article",{class:"article"},F({template:c,components:qn}))}async function a(c){u.value=c,await U(),o.value.scrollTop=0}return(c,j)=>(N(),C("div",{class:T(c.classes.app)},[g("aside",{class:T(c.classes.aside)},[g("div",{class:T(c.classes.leftHeader)},[g("i",{class:T(c.classes.logo),innerHTML:A(t).IconWindow},null,10,Hn),g("h3",{class:T(c.classes.title)},[Cn,g("small",null,"v"+rs(A(i)),1)],2)],2),g("nav",{class:T([c.classes.navs,"is-scroll"])},[(N(!0),C(ns,null,Zs(A(_s),_=>(N(),C("div",{onClick:v=>a(_),class:T([c.classes.nav,_.id==u.value.id?c.classes.activeNav:null])},rs(_.name),11,Pn))),256))],2),g("div",{class:T(c.classes.copyright)},Dn,2)],2),g("main",{class:T(c.classes.main)},[g("div",{class:T(c.classes.rightHeader)},[w(l,{class:T(c.classes.menus)},null,8,["class"])],2),g("div",{class:T(c.classes.scroll),ref_key:"scroll",ref:o},[w(p,{class:T(c.classes.content)},null,8,["class"])],2)],2)],2))}}),Vn="_app_1qcqk_1",$n="_header_1qcqk_8",Yn="_leftHeader_1qcqk_12 _header_1qcqk_8",Jn="_rightHeader_1qcqk_18 _header_1qcqk_8",An="_menus_1qcqk_23",Zn="_aside_1qcqk_29",Kn="_navs_1qcqk_36",Qn="_nav_1qcqk_36",se="_activeNav_1qcqk_56",te="_main_1qcqk_71",ne="_content_1qcqk_79",ee="_scroll_1qcqk_85",ae="_copyright_1qcqk_91",le="_logo_1qcqk_101",oe="_title_1qcqk_111",ie={app:Vn,header:$n,leftHeader:Yn,rightHeader:Jn,menus:An,aside:Zn,navs:Kn,nav:Qn,activeNav:se,main:te,content:ne,scroll:ee,copyright:ae,logo:le,title:oe},ce=(s,n)=>{const t=s.__vccOpts||s;for(const[u,i]of n)t[u]=i;return t},pe={classes:ie},re=ce(Xn,[["__cssModules",pe]]),ue=W({__name:"App",setup(s){let n=null,t=null;function u(){t&&clearTimeout(t),t=setTimeout(()=>{(n==null?void 0:n.isUnmounted)==!0&&(i(),t=null)},0)}function i(){return n=H({type:"BlankWindow",closeable:!1,width:"1300px",height:"90vh",left:"calc(50vw - 650px)",top:"5vh",zIndex:999,afterUnmount:u,body:w(re,null,null)}),n}function o(){n&&n.close(),n=null}return ts(o),Ks(i),(l,p)=>{const a=Ts("WindowManager");return N(),Qs(a)}}});const Bs=st(ue);Bs.use(In);Bs.mount("#app");