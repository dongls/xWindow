/*! @dongls/xWindow v0.0.5 https://github.com/dongls/xWindow
Copyright 2023-present dongls
Released under the MIT License */
(function(h,o){typeof exports=="object"&&typeof module<"u"?o(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],o):(h=typeof globalThis<"u"?globalThis:h||self,o(h.xWindow={},h.Vue))})(this,function(h,o){"use strict";var Yt=Object.defineProperty;var Ut=(h,o,c)=>o in h?Yt(h,o,{enumerable:!0,configurable:!0,writable:!0,value:c}):h[o]=c;var v=(h,o,c)=>(Ut(h,typeof o!="symbol"?o+"":o,c),c);const c={isMounted:!1,zIndex:1e3,stack:new Map,ghost:o.shallowRef([]),options:new Map,topWindow:null};function q(){c.isMounted=!0}function $(){c.isMounted=!1,c.topWindow=null,c.ghost.value=[],c.stack.clear(),c.options.clear()}function J(){return c.isMounted}function y(){return c.zIndex}function H(){return c.zIndex+=1}function K(t){typeof t=="number"&&Number.isFinite(t)&&(c.zIndex=Math.floor(t))}function Q(t,e){c.stack.set(t,e)}function W(t){c.stack.delete(t),c.options.delete(t);const e=c.ghost.value.indexOf(t);e>=0&&c.ghost.value.splice(e,1)}function V(){c.stack.size==0||c.topWindow==null||c.topWindow.close()}function tt(t){return c.options.get(t)}function et(t){const e=c.ghost.value;return e.push(t.uid),c.ghost.value=e.slice(),c.options.set(t.uid,t),t.uid}function nt(t){return c.stack.get(t)}function it(){return c.ghost}function C(t){if(c.topWindow=t,t==null)return;for(const i of c.stack.values()){const s=i.windowState;s.focused=i===t}const e=t.windowState;e.zIndex<y()&&(e.zIndex=H())}function R(t){const e=c.stack.get(t);C(e)}function x(){const t=ot();C(t)}function ot(){return c.stack.size==0?null:Array.from(c.stack.values()).filter(e=>e.visible).sort((e,i)=>{const s=e.windowState;return i.windowState.zIndex-s.zIndex})[0]}function st(){return{closeTopWindow:V,getTopZIndex:H,getWindowProxy:nt,getZIndex:y,setFocusedWindow:R}}function lt(t){K(t==null?void 0:t.zIndex)}const ct="https://github.com/dongls/xWindow",rt="0.0.5",dt="onUpdate:visible",at="onBeforeUnmount",F=Symbol(),_=Object.freeze({INIT:0,LAYOUT:1,MOUNTED:2,UNMOUNTED:3});var w=(t=>(t[t.TOP=0]="TOP",t[t.BOTTOM=1]="BOTTOM",t[t.LEFT=2]="LEFT",t[t.RIGHT=3]="RIGHT",t[t.LEFT_TOP=4]="LEFT_TOP",t[t.LEFT_BOTTOM=5]="LEFT_BOTTOM",t[t.RIGHT_TOP=6]="RIGHT_TOP",t[t.RIGHT_BOTTOM=7]="RIGHT_BOTTOM",t))(w||{});const Y={title:String,id:String,visible:{type:Boolean,default:!1},width:{type:String,default:"640px"},appendToBody:{type:Boolean,default:!0},draggable:{type:Boolean,default:!0},resizable:{type:Boolean,default:!0},closeable:{type:Boolean,default:!0},mask:{type:Boolean,default:!1}},b=Object.freeze({NONE:"none",LEFT:"left",RIGHT:"right"});let ut=1e3;class z{constructor(){v(this,"value");this.value=ut++}get wid(){return"window--"+this.value}static create(e){return e instanceof z?e:Object.freeze(new z)}}class S{constructor(e){v(this,"uid");v(this,"type");v(this,"visible");v(this,"others");v(this,"body");const{visible:i,body:s,...r}=e;this.uid=z.create(),this.visible=i,this.body=s,this.others=r}static create(e){return e instanceof S?e:new S(e)}get id(){return this.uid.wid}buildProps(){return Object.assign({},this.others,{visible:this.visible.value,body:this.body,uid:this.uid,key:this.id})}}const d={window:"_window_1d2kb_9",dragging:"_dragging_1d2kb_20",resizing:"_resizing_1d2kb_20",fullscreen:"_fullscreen_1d2kb_24",focused:"_focused_1d2kb_34",main:"_main_1d2kb_38",init:"_init_1d2kb_45",layout:"_layout_1d2kb_55",header:"_header_1d2kb_63",title:"_title_1d2kb_73",menus:"_menus_1d2kb_83",body:"_body_1d2kb_89",footer:"_footer_1d2kb_95",menu:"_menu_1d2kb_83",closeMenu:"_closeMenu_1d2kb_129 _menu_1d2kb_83",pinMenu:"_pinMenu_1d2kb_137 _menu_1d2kb_83",logo:"_logo_1d2kb_145",resize:"_resize_1d2kb_155",resizeBar:"_resizeBar_1d2kb_159",resizeTop:"_resizeTop_1d2kb_164 _resizeBar_1d2kb_159",resizeBottom:"_resizeBottom_1d2kb_165 _resizeBar_1d2kb_159",resizeRight:"_resizeRight_1d2kb_181 _resizeBar_1d2kb_159",resizeLeft:"_resizeLeft_1d2kb_182 _resizeBar_1d2kb_159",resizeLeftTop:"_resizeLeftTop_1d2kb_198 _resizeBar_1d2kb_159",resizeLeftBottom:"_resizeLeftBottom_1d2kb_199 _resizeBar_1d2kb_159",resizeRightTop:"_resizeRightTop_1d2kb_200 _resizeBar_1d2kb_159",resizeRightBottom:"_resizeRightBottom_1d2kb_201 _resizeBar_1d2kb_159",mask:"_mask_1d2kb_231"},ft='<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M590.265 511.987l305.521-305.468c21.617-21.589 21.617-56.636.027-78.252-21.616-21.617-56.663-21.617-78.279 0L512.012 433.735 206.544 128.213c-21.617-21.617-56.635-21.617-78.252 0-21.616 21.589-21.616 56.635-.027 78.252L433.76 511.987 128.211 817.482c-21.617 21.59-21.617 56.635 0 78.251 10.808 10.81 24.967 16.213 39.125 16.213 14.159 0 28.318-5.403 39.126-16.213l305.522-305.468L817.48 895.788C828.289 906.597 842.447 912 856.606 912s28.317-5.403 39.125-16.212c21.618-21.59 21.618-56.636.028-78.252L590.265 511.987z"/></svg>',ht='<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M928.7 135.8H99.8c-21.15 0-37.8 17.55-37.8 35.1v685.35c0 17.55 17.1 31.5 37.8 31.5h828.45c21.15 0 33.3-14.4 33.3-31.5v-684.9c.45-17.55-12.15-35.55-32.85-35.55zm-53.1 666.9H147.5V222.2h728.1v580.5z"/></svg>',wt='<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M38.794 124.791v778.495h946.412V124.791H38.794zm896.678 728.033H89.292v-460.9h846.18v460.9z"/></svg>',gt='<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M738.793 681.382v-48.331l88.242-88.243a298.676 298.676 0 00156.712-83.482 38.836 38.836 0 000-54.923l-366.15-366.15a38.836 38.836 0 00-54.923 0 298.52 298.52 0 00-83.519 156.749l-88.169 88.169h-48.332a411.145 411.145 0 00-292.59 121.232c-15.16 15.159-15.16 39.764 0 54.923L278.906 690.17 86.642 882.436a38.836 38.836 0 1054.922 54.922l192.23-192.229 228.844 228.845a38.836 38.836 0 0054.922 0 411.042 411.042 0 00121.233-292.592zM134.02 435.44a333.473 333.473 0 01208.56-72.571l64.406.037a38.836 38.836 0 0027.461-11.351L544.292 241.71a38.68 38.68 0 0011.351-27.462 180.096 180.096 0 0136.798-89.01L898.8 431.593a180.925 180.925 0 01-89.12 36.835 38.836 38.836 0 00-27.462 11.35L672.373 589.626c-7.287 7.286-11.387 17.173-11.35 27.461l.036 64.406a333.318 333.318 0 01-72.608 208.596L134.021 435.44z"/></svg>',pt='<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M958 967.127h-63.69a9.094 9.094 0 01-9.127-9.126V894.31a9.116 9.116 0 019.127-9.127H958a9.116 9.116 0 019.127 9.127V958a9.094 9.094 0 01-9.126 9.127zm-164.826 0h-64.727a9.094 9.094 0 01-9.127-9.126V894.31a9.116 9.116 0 019.127-9.127h64.727c5.016 0 9.061 4.078 9.061 9.127V958a9.094 9.094 0 01-9.061 9.127zm-165.895 0h-64.727a9.094 9.094 0 01-9.062-9.126V894.31c0-5.05 4.045-9.127 9.062-9.127h64.727a9.116 9.116 0 019.126 9.127V958a9.094 9.094 0 01-9.126 9.127zm165.895-828.31h-64.727a9.094 9.094 0 01-9.127-9.127V66.032a9.116 9.116 0 019.127-9.127h64.727c5.016 0 9.061 4.078 9.061 9.127v63.69a9.094 9.094 0 01-9.061 9.127zm-165.895 0h-64.727a9.094 9.094 0 01-9.062-9.127V66.032c0-5.05 4.045-9.127 9.062-9.127h64.727a9.116 9.116 0 019.126 9.127v63.69a9.094 9.094 0 01-9.126 9.127zm330.722 0H894.31a9.094 9.094 0 01-9.127-9.127V66.032a9.116 9.116 0 019.127-9.127H958a9.116 9.116 0 019.127 9.127v63.69a9.094 9.094 0 01-9.126 9.127zm0 663.45H894.31a9.094 9.094 0 01-9.127-9.126v-64.727c0-5.016 4.078-9.061 9.127-9.061H958c5.05 0 9.127 4.045 9.127 9.061v64.727a9.094 9.094 0 01-9.126 9.127zm0-165.862H894.31a9.094 9.094 0 01-9.127-9.126v-64.727c0-5.017 4.078-9.062 9.127-9.062H958c5.05 0 9.127 4.045 9.127 9.062v64.727a9.094 9.094 0 01-9.126 9.126zm0-165.863H894.31a9.094 9.094 0 01-9.127-9.094v-64.727a9.116 9.116 0 019.127-9.126H958a9.116 9.116 0 019.127 9.126v64.727a9.094 9.094 0 01-9.126 9.062zm0-165.862H894.31a9.094 9.094 0 01-9.127-9.094v-64.727a9.116 9.116 0 019.127-9.127H958c5.05 0 9.127 4.078 9.127 9.094v64.727a9.094 9.094 0 01-9.126 9.127zM443.713 967.127H93.314a36.409 36.409 0 01-36.409-36.441V93.314c0-20.065 16.311-36.409 36.441-36.409h350.367c20.065 0 36.409 16.311 36.409 36.441v837.405c0 20.065-16.311 36.409-36.409 36.409zm-295.802-81.976h241.205a9.094 9.094 0 009.094-9.094V147.91a9.094 9.094 0 00-9.062-9.094H147.911a9.094 9.094 0 00-9.094 9.094V876.09c0 5.016 4.078 9.094 9.094 9.094z"/></svg>',_t='<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M66 56.905h63.69c5.05 0 9.127 4.046 9.127 9.062v63.756a9.094 9.094 0 01-9.127 9.062H66.032a9.094 9.094 0 01-9.127-9.062V65.967c0-5.016 4.078-9.062 9.127-9.062zm164.859 0h64.727a9.047 9.047 0 019.061 9.062v63.756a9.094 9.094 0 01-9.061 9.062h-64.727a9.094 9.094 0 01-9.127-9.062V65.967c0-5.016 4.078-9.062 9.127-9.062zm165.862 0h64.727a9.047 9.047 0 019.062 9.062v63.756a9.094 9.094 0 01-9.062 9.062h-64.727a9.094 9.094 0 01-9.126-9.062V65.967c0-5.016 4.078-9.062 9.126-9.062zM230.86 885.183h64.727c5.016 0 9.061 4.078 9.061 9.127V958a9.094 9.094 0 01-9.061 9.127H230.86a9.094 9.094 0 01-9.127-9.126V894.31a9.116 9.116 0 019.127-9.127zm165.862 0h64.727c5.017 0 9.062 4.078 9.062 9.127V958a9.094 9.094 0 01-9.062 9.127h-64.727a9.094 9.094 0 01-9.126-9.126V894.31a9.116 9.116 0 019.126-9.127zm-330.722 0h63.691a9.116 9.116 0 019.127 9.127V958a9.094 9.094 0 01-9.127 9.127H66.032a9.094 9.094 0 01-9.127-9.126V894.31a9.116 9.116 0 019.127-9.127zm0-663.45h63.691a9.116 9.116 0 019.127 9.126v64.727a9.094 9.094 0 01-9.127 9.061H66.032a9.094 9.094 0 01-9.127-9.061v-64.727a9.116 9.116 0 019.127-9.127zm0 165.862h63.691a9.116 9.116 0 019.127 9.126v64.727a9.094 9.094 0 01-9.127 9.062H66.032a9.094 9.094 0 01-9.127-9.062v-64.727a9.116 9.116 0 019.127-9.126zm0 165.863h63.691c5.05 0 9.127 4.077 9.127 9.094v64.727a9.094 9.094 0 01-9.127 9.126H66.032a9.094 9.094 0 01-9.127-9.126v-64.727c0-5.017 4.078-9.062 9.127-9.062zm0 165.862h63.691c5.05 0 9.127 4.078 9.127 9.094v64.727a9.094 9.094 0 01-9.127 9.127H66.032a9.094 9.094 0 01-9.127-9.127v-64.727c0-5.016 4.078-9.061 9.127-9.061zM580.287 56.905h350.431c20.066 0 36.41 16.279 36.41 36.377v837.404c0 20.13-16.312 36.409-36.442 36.409h-350.4a36.409 36.409 0 01-36.408-36.377V93.314c0-20.13 16.311-36.409 36.409-36.409zm295.802 81.88H634.884a9.094 9.094 0 00-9.094 9.126V876.09c0 5.016 4.078 9.094 9.062 9.094h241.237a9.094 9.094 0 009.094-9.094V147.91a9.094 9.094 0 00-9.094-9.094z"/></svg>';function p(t,e,i){return e!=null&&Number.isFinite(e)&&t<e?e:i!=null&&Number.isFinite(i)&&t>i?i:t}const U="__xWindow_resize_prop__",M=360,k=32;function X(t,e,i){const s=e.getBoundingClientRect(),r=document.documentElement.getBoundingClientRect();if(i.direction==w.TOP){const l=t.clientY-r.top;return{height:p(s.bottom-t.clientY,k),top:l}}if(i.direction==w.BOTTOM){const l=p(t.clientY-s.top,k),n=t.clientY-l-r.top;return{height:l,top:n}}if(i.direction==w.LEFT){const l=p(s.right-t.clientX,M),n=t.clientX-r.left;return{width:l,left:n}}if(i.direction==w.RIGHT){const l=p(t.clientX-s.left,M),n=t.clientX-l-r.left;return{width:l,left:n}}if(i.direction==w.LEFT_TOP){const l=t.clientY-r.top,n=t.clientX-r.left,f=p(s.right-t.clientX,M),u=p(s.bottom-t.clientY,k);return{top:l,left:n,width:f,height:u}}if(i.direction==w.LEFT_BOTTOM){const l=p(t.clientY-s.top,k),n=p(s.right-t.clientX,M),f=t.clientY-l-r.top,u=t.clientX-r.left;return{top:f,left:u,width:n,height:l}}if(i.direction==w.RIGHT_TOP){const l=p(t.clientX-s.left,M),n=p(s.bottom-t.clientY,k),f=t.clientY-r.top,u=t.clientX-l-r.left;return{top:f,left:u,width:l,height:n}}if(i.direction==w.RIGHT_BOTTOM){const l=p(t.clientY-s.top,k),n=p(t.clientX-s.left,M),f=t.clientY-l-r.top,u=t.clientX-n-r.left;return{top:f,left:u,width:n,height:l}}return null}function mt(t){const e=o.getCurrentInstance(),i=[[d.resizeTop,w.TOP],[d.resizeBottom,w.BOTTOM],[d.resizeLeft,w.LEFT],[d.resizeRight,w.RIGHT],[d.resizeLeftTop,w.LEFT_TOP],[d.resizeLeftBottom,w.LEFT_BOTTOM],[d.resizeRightTop,w.RIGHT_TOP],[d.resizeRightBottom,w.RIGHT_BOTTOM]],s={init:!1,direction:-1,top:0,left:0,width:0,height:0};function r(u){u.preventDefault(),s.init=!1,s.direction=u.target[U],s.top=t.windowState.top,s.left=t.windowState.left,s.width=t.windowState.width,s.height=t.windowState.height,window.addEventListener("mousemove",l),window.addEventListener("mouseup",n)}function l(u){u.preventDefault();const g=e==null?void 0:e.refs.window;s.init||(g.classList.add(d.resizing),s.init=!0),t.windowState.splitPosition!=b.NONE&&(t.exitSplitMode(),s.top=t.windowState.top,s.left=t.windowState.left,s.width=t.windowState.width,s.height=t.windowState.height);const T=X(u,g,s);if(T!=null)for(const O in T){const B=Math.round(T[O]);Reflect.set(s,O,B),Reflect.set(g.style,O,B+"px")}}function n(u){if(u.preventDefault(),s.init){const g=e==null?void 0:e.refs.window;X(u,g,s)!=null&&(t.windowState.top=s.top,t.windowState.left=s.left,t.windowState.width=s.width,t.windowState.height=s.height),g.classList.remove(d.resizing)}window.removeEventListener("mousemove",l),window.removeEventListener("mouseup",n)}const f=i.map(u=>o.h("div",{className:u[0],["."+U]:u[1]}));return o.createVNode("div",{class:d.resize,onMousedown:r},[f])}function bt(t){const e=o.getCurrentInstance(),i={init:!1,left:0,top:0,prevClientX:0,prevClientY:0};function s(n){n.preventDefault(),i.init=!1,i.left=t.windowState.left,i.top=t.windowState.top,i.prevClientX=n.clientX,i.prevClientY=n.clientY,window.addEventListener("mousemove",r),window.addEventListener("mouseup",l)}function r(n){n.preventDefault();const f=e==null?void 0:e.refs.window;i.init||(f.classList.add(d.dragging),i.init=!0),t.windowState.splitPosition!=b.NONE&&(t.exitSplitMode(),i.left=t.windowState.left,i.top=t.windowState.top),i.left=Math.round(i.left+n.clientX-i.prevClientX),i.top=Math.round(i.top+n.clientY-i.prevClientY),i.prevClientX=n.clientX,i.prevClientY=n.clientY,f.style.left=i.left+"px",f.style.top=i.top+"px"}function l(n){if(n.preventDefault(),i.init){const f=e==null?void 0:e.refs.window;t.windowState.top=i.top,t.windowState.left=i.left,f.classList.remove(d.dragging)}window.removeEventListener("mousemove",r),window.removeEventListener("mouseup",l)}return{dragStart:s}}const Tt=o.defineComponent({name:"WindowBody",props:{body:{default:null}},setup(t){const e=o.inject(F);return function(){return typeof t.body=="function"?t.body(e):t.body}}});function zt(t){return typeof t=="function"||Object.prototype.toString.call(t)==="[object Object]"&&!o.isVNode(t)}const vt=Math.floor(Number.MAX_SAFE_INTEGER/1e3);function Mt(){return{width:0,height:0,left:0,top:0,zIndex:0,fullscreen:!1,focused:!1,pinned:!1,splitPosition:b.NONE}}const G=o.defineComponent({name:"BaseWindow",props:{...Y,uid:{type:z,required:!0},body:{default:null}},emits:["update:visible","beforeUnmount"],setup(t,{emit:e,expose:i}){const s=z.create(t.uid),r=o.getCurrentInstance(),l=o.ref(_.INIT),n=o.reactive(Mt()),f={width:0,height:0},u=o.computed(()=>t.draggable&&t.resizable),g={get uid(){return s},get visible(){return t.visible},get windowState(){return n},exitSplitMode:Ct,close:E},T=t.draggable?bt(g):null,O=u.value?mt(g):null,B=o.computed(()=>(n.pinned?vt:0)+n.zIndex),It=o.computed(()=>{const a=[d.window];return l.value==_.INIT&&a.push(d.init),l.value==_.LAYOUT&&a.push(d.layout),n.fullscreen&&a.push(d.fullscreen),n.focused&&a.push(d.focused),a}),St=o.computed(()=>{if(l.value==_.INIT)return{width:t.width};const a=t.mask?null:B.value;return n.fullscreen?{zIndex:a}:n.splitPosition===b.LEFT||n.splitPosition===b.RIGHT?{top:0,left:n.splitPosition==b.RIGHT?"50vw":0,width:"50vw",height:"100vh",zIndex:a}:{top:n.top+"px",left:n.left+"px",width:n.width+"px",height:l.value==_.INIT?null:n.height+"px",zIndex:a}});async function Lt(a){await o.nextTick();const m=a.el.getBoundingClientRect();l.value==_.INIT&&(n.width=m.width,n.height=m.height,n.left=(window.innerWidth-m.width)/2,n.top=window.innerHeight*.15,l.value=_.LAYOUT,setTimeout(()=>{l.value=_.MOUNTED},0)),P()}function E(a){t.closeable&&(a==null||a.stopPropagation(),e("update:visible",!1))}function Nt(){n.focused=!1,o.nextTick(x)}function Et(a){a.stopPropagation()}function P(){n.focused||R(s)}function yt(){n.fullscreen=!n.fullscreen}function Ht(){n.pinned=!n.pinned}function Wt(){Z(),n.splitPosition=b.LEFT}function Vt(){Z(),n.splitPosition=b.RIGHT}function Z(){f.width=n.width,f.height=n.height}function Ct(){const I=r.refs.window.getBoundingClientRect();n.top=I.top,n.left=I.left,n.width=f.width,n.height=f.height,n.splitPosition=b.NONE}const Rt=o.watch(()=>t.visible,()=>{t.visible||Nt()});Q(s,g),o.onBeforeUnmount(()=>{e("beforeUnmount"),E(),W(s)}),o.onUnmounted(()=>{Rt(),l.value=_.UNMOUNTED}),o.provide(F,g),i(g);function xt(){const a=[];return t.mask!==!0&&(a.push(o.createVNode("button",{onClick:Wt,type:"button",innerHTML:pt,class:d.menu,title:"向左分割"},null)),a.push(o.createVNode("button",{onClick:Vt,type:"button",innerHTML:_t,class:d.menu,title:"向右分割"},null)),a.push(o.createVNode("button",{onClick:Ht,type:"button",innerHTML:gt,class:n.pinned?d.pinMenu:d.menu,title:"固定"},null))),u.value&&a.push(o.createVNode("button",{onClick:yt,type:"button",innerHTML:ht,class:d.menu,title:"最大化"},null)),t.closeable&&a.push(o.createVNode("button",{onClick:E,type:"button",innerHTML:ft,class:d.closeMenu,title:"关闭"},null)),a.length==0?null:o.createVNode("div",{class:d.menus,onMousedown:Et},[a])}return function(){if(!t.visible)return null;const a=o.createVNode("div",{class:d.main},[o.createVNode("div",{class:d.header,onMousedown:T==null?void 0:T.dragStart},[o.createVNode("i",{class:d.logo,innerHTML:wt},null),o.createVNode("div",{class:d.title},[t.title??"新窗口"]),xt()]),o.createVNode("div",{class:d.body},[o.createVNode(Tt,{body:t.body,key:s.wid},null)])]),I={ref:"window",id:t.id??s.wid,onVnodeMounted:Lt,onMousedownCapture:P,class:It.value,style:St.value};let m=o.h("div",I,[a,O]);if(t.mask===!0){const Ft={zIndex:B.value};m=o.createVNode("div",{class:d.mask,style:Ft},[m])}return t.appendToBody?o.createVNode(o.Teleport,{to:"body"},zt(m)?m:{default:()=>[m]}):m}}}),L=o.defineComponent({name:"SimpleWindow",props:{...Y},setup(t,{slots:e,attrs:i}){const s=z.create();return function(){const r={...t,...i,uid:s,body:e.default};return o.createVNode(G,r,null)}}}),N=o.defineComponent({name:"WindowManager",setup(){const t=it();function e(i){i.key=="Escape"&&V()}return q(),window.addEventListener("keydown",e,!0),o.onBeforeUnmount(()=>{$(),window.removeEventListener("keydown",e,!0)}),function(){return t.value.map(i=>{const s=tt(i);if(s!=null)return o.h(G,s.buildProps())})}}});function kt(t){if(t.length==1){const e=t[0];return e==null?null:typeof e=="object"?e:null}if(t.length==2){const[e,i]=t;if(typeof e=="string"&&i!=null)return{title:e,body:i}}return null}function Ot(...t){const e=kt(t);return e==null?(console.error("[xWindow]: 参数有误"),null):Bt(e)}function Bt(t){if(!J())return console.error("[xWindow] 需要先创建`WindowManager`组件，见文档 "+ct+" 。"),null;const{displayAfterCreate:e,unmountAfterClose:i,...s}=t,r={uid:null,visible:o.ref(e!==!1),isUnmounted:!1},l=()=>r.visible.value=!0,n=()=>{r.visible.value=!1,i!==!1&&f()},f=()=>{r.visible.value&&n(),W(r.uid),o.nextTick(x)},u=Object.assign({},s,{visible:r.visible,[dt](g){g?l():n()},[at](){r.isUnmounted=!0}});return r.uid=et(S.create(u)),{uid:r.uid,get isUnmounted(){return r.isUnmounted},get visible(){return r.visible.value},show:l,close:n,unmount:f}}function D(t,e){t.component(L.name,L),t.component(N.name,N),lt(e)}const j=rt,A={install:D,version:j};h.ComponentStates=_,h.SimpleWindow=L,h.WindowManager=N,h.default=A,h.install=D,h.useWindow=Ot,h.useWindowManager=st,h.version=j,h.xWindow=A,Object.defineProperties(h,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
