/*! @dongls/xWindow v0.0.5 https://github.com/dongls/xWindow
Copyright 2023-present dongls
Released under the MIT License */
var dt = Object.defineProperty;
var ft = (t, e, i) => e in t ? dt(t, e, { enumerable: !0, configurable: !0, writable: !0, value: i }) : t[e] = i;
var b = (t, e, i) => (ft(t, typeof e != "symbol" ? e + "" : e, i), i);
import { shallowRef as ht, getCurrentInstance as y, h as N, createVNode as h, defineComponent as B, inject as wt, ref as Y, reactive as gt, computed as L, watch as pt, onBeforeUnmount as X, onUnmounted as _t, provide as mt, Teleport as vt, isVNode as bt, nextTick as H } from "vue";
const r = {
  isMounted: !1,
  zIndex: 1e3,
  stack: /* @__PURE__ */ new Map(),
  ghost: ht([]),
  options: /* @__PURE__ */ new Map(),
  topWindow: null
};
function Tt() {
  r.isMounted = !0;
}
function zt() {
  r.isMounted = !1, r.topWindow = null, r.ghost.value = [], r.stack.clear(), r.options.clear();
}
function Mt() {
  return r.isMounted;
}
function U() {
  return r.zIndex;
}
function G() {
  return r.zIndex += 1;
}
function kt(t) {
  typeof t == "number" && Number.isFinite(t) && (r.zIndex = Math.floor(t));
}
function Ot(t, e) {
  r.stack.set(t, e);
}
function D(t) {
  r.stack.delete(t), r.options.delete(t);
  const e = r.ghost.value.indexOf(t);
  e >= 0 && r.ghost.value.splice(e, 1);
}
function j() {
  r.stack.size == 0 || r.topWindow == null || r.topWindow.close();
}
function It(t) {
  return r.options.get(t);
}
function Lt(t) {
  const e = r.ghost.value;
  return e.push(t.uid), r.ghost.value = e.slice(), r.options.set(t.uid, t), t.uid;
}
function St(t) {
  return r.stack.get(t);
}
function Bt() {
  return r.ghost;
}
function A(t) {
  if (r.topWindow = t, t == null)
    return;
  for (const i of r.stack.values()) {
    const o = i.windowState;
    o.focused = i === t;
  }
  const e = t.windowState;
  e.zIndex < U() && (e.zIndex = G());
}
function P(t) {
  const e = r.stack.get(t);
  A(e);
}
function Z() {
  const t = Et();
  A(t);
}
function Et() {
  return r.stack.size == 0 ? null : Array.from(r.stack.values()).filter((e) => e.visible).sort((e, i) => {
    const o = e.windowState;
    return i.windowState.zIndex - o.zIndex;
  })[0];
}
function Be() {
  return {
    closeTopWindow: j,
    getTopZIndex: G,
    getWindowProxy: St,
    getZIndex: U,
    setFocusedWindow: P
  };
}
function Ht(t) {
  kt(t == null ? void 0 : t.zIndex);
}
const yt = "https://github.com/dongls/xWindow", Nt = "0.0.5", Wt = "onUpdate:visible", xt = "onBeforeUnmount", q = Symbol(), _ = Object.freeze({
  INIT: 0,
  LAYOUT: 1,
  MOUNTED: 2,
  UNMOUNTED: 3
});
var f = /* @__PURE__ */ ((t) => (t[t.TOP = 0] = "TOP", t[t.BOTTOM = 1] = "BOTTOM", t[t.LEFT = 2] = "LEFT", t[t.RIGHT = 3] = "RIGHT", t[t.LEFT_TOP = 4] = "LEFT_TOP", t[t.LEFT_BOTTOM = 5] = "LEFT_BOTTOM", t[t.RIGHT_TOP = 6] = "RIGHT_TOP", t[t.RIGHT_BOTTOM = 7] = "RIGHT_BOTTOM", t))(f || {});
const J = {
  /** 窗口的标题 */
  title: String,
  /** 窗口的id */
  id: String,
  /** 是否显示窗口 */
  visible: {
    type: Boolean,
    default: !1
  },
  /** 窗口宽度，参照`CSS`的`width`语法 */
  width: {
    type: String,
    default: "640px"
  },
  /** 是否插入到`body`中，默认为`true` */
  appendToBody: {
    type: Boolean,
    default: !0
  },
  /** 是否可拖拽，默认为`true` */
  draggable: {
    type: Boolean,
    default: !0
  },
  /** 是否可改变窗口大小，默认为`true` */
  resizable: {
    type: Boolean,
    default: !0
  },
  /** 是否可关闭窗口，默认为`true` */
  closeable: {
    type: Boolean,
    default: !0
  },
  mask: {
    type: Boolean,
    default: !1
  }
}, m = Object.freeze({
  NONE: "none",
  LEFT: "left",
  RIGHT: "right"
});
let Ct = 1e3;
class T {
  /** 统一使用`UID.create`方法创建 */
  constructor() {
    b(this, "value");
    this.value = Ct++;
  }
  get wid() {
    return "window--" + this.value;
  }
  static create(e) {
    return e instanceof T ? e : Object.freeze(new T());
  }
}
class S {
  constructor(e) {
    b(this, "uid");
    b(this, "type");
    b(this, "visible");
    b(this, "others");
    b(this, "body");
    const { visible: i, body: o, ...l } = e;
    this.uid = T.create(), this.visible = i, this.body = o, this.others = l;
  }
  static create(e) {
    return e instanceof S ? e : new S(e);
  }
  get id() {
    return this.uid.wid;
  }
  buildProps() {
    return Object.assign({}, this.others, {
      visible: this.visible.value,
      body: this.body,
      uid: this.uid,
      key: this.id
    });
  }
}
const Vt = "_window_1d2kb_9", Rt = "_dragging_1d2kb_20", Ft = "_resizing_1d2kb_20", Yt = "_fullscreen_1d2kb_24", Xt = "_focused_1d2kb_34", Ut = "_main_1d2kb_38", Gt = "_init_1d2kb_45", Dt = "_layout_1d2kb_55", jt = "_header_1d2kb_63", At = "_title_1d2kb_73", Pt = "_menus_1d2kb_83", Zt = "_body_1d2kb_89", qt = "_footer_1d2kb_95", Jt = "_menu_1d2kb_83", $t = "_closeMenu_1d2kb_129 _menu_1d2kb_83", Kt = "_pinMenu_1d2kb_137 _menu_1d2kb_83", Qt = "_logo_1d2kb_145", te = "_resize_1d2kb_155", ee = "_resizeBar_1d2kb_159", ne = "_resizeTop_1d2kb_164 _resizeBar_1d2kb_159", ie = "_resizeBottom_1d2kb_165 _resizeBar_1d2kb_159", oe = "_resizeRight_1d2kb_181 _resizeBar_1d2kb_159", se = "_resizeLeft_1d2kb_182 _resizeBar_1d2kb_159", le = "_resizeLeftTop_1d2kb_198 _resizeBar_1d2kb_159", ce = "_resizeLeftBottom_1d2kb_199 _resizeBar_1d2kb_159", re = "_resizeRightTop_1d2kb_200 _resizeBar_1d2kb_159", ue = "_resizeRightBottom_1d2kb_201 _resizeBar_1d2kb_159", ae = "_mask_1d2kb_231", c = {
  window: Vt,
  dragging: Rt,
  resizing: Ft,
  fullscreen: Yt,
  focused: Xt,
  main: Ut,
  init: Gt,
  layout: Dt,
  header: jt,
  title: At,
  menus: Pt,
  body: Zt,
  footer: qt,
  menu: Jt,
  closeMenu: $t,
  pinMenu: Kt,
  logo: Qt,
  resize: te,
  resizeBar: ee,
  resizeTop: ne,
  resizeBottom: ie,
  resizeRight: oe,
  resizeLeft: se,
  resizeLeftTop: le,
  resizeLeftBottom: ce,
  resizeRightTop: re,
  resizeRightBottom: ue,
  mask: ae
}, de = '<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M590.265 511.987l305.521-305.468c21.617-21.589 21.617-56.636.027-78.252-21.616-21.617-56.663-21.617-78.279 0L512.012 433.735 206.544 128.213c-21.617-21.617-56.635-21.617-78.252 0-21.616 21.589-21.616 56.635-.027 78.252L433.76 511.987 128.211 817.482c-21.617 21.59-21.617 56.635 0 78.251 10.808 10.81 24.967 16.213 39.125 16.213 14.159 0 28.318-5.403 39.126-16.213l305.522-305.468L817.48 895.788C828.289 906.597 842.447 912 856.606 912s28.317-5.403 39.125-16.212c21.618-21.59 21.618-56.636.028-78.252L590.265 511.987z"/></svg>', fe = '<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M928.7 135.8H99.8c-21.15 0-37.8 17.55-37.8 35.1v685.35c0 17.55 17.1 31.5 37.8 31.5h828.45c21.15 0 33.3-14.4 33.3-31.5v-684.9c.45-17.55-12.15-35.55-32.85-35.55zm-53.1 666.9H147.5V222.2h728.1v580.5z"/></svg>', he = '<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M38.794 124.791v778.495h946.412V124.791H38.794zm896.678 728.033H89.292v-460.9h846.18v460.9z"/></svg>', we = '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M738.793 681.382v-48.331l88.242-88.243a298.676 298.676 0 00156.712-83.482 38.836 38.836 0 000-54.923l-366.15-366.15a38.836 38.836 0 00-54.923 0 298.52 298.52 0 00-83.519 156.749l-88.169 88.169h-48.332a411.145 411.145 0 00-292.59 121.232c-15.16 15.159-15.16 39.764 0 54.923L278.906 690.17 86.642 882.436a38.836 38.836 0 1054.922 54.922l192.23-192.229 228.844 228.845a38.836 38.836 0 0054.922 0 411.042 411.042 0 00121.233-292.592zM134.02 435.44a333.473 333.473 0 01208.56-72.571l64.406.037a38.836 38.836 0 0027.461-11.351L544.292 241.71a38.68 38.68 0 0011.351-27.462 180.096 180.096 0 0136.798-89.01L898.8 431.593a180.925 180.925 0 01-89.12 36.835 38.836 38.836 0 00-27.462 11.35L672.373 589.626c-7.287 7.286-11.387 17.173-11.35 27.461l.036 64.406a333.318 333.318 0 01-72.608 208.596L134.021 435.44z"/></svg>', ge = '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M958 967.127h-63.69a9.094 9.094 0 01-9.127-9.126V894.31a9.116 9.116 0 019.127-9.127H958a9.116 9.116 0 019.127 9.127V958a9.094 9.094 0 01-9.126 9.127zm-164.826 0h-64.727a9.094 9.094 0 01-9.127-9.126V894.31a9.116 9.116 0 019.127-9.127h64.727c5.016 0 9.061 4.078 9.061 9.127V958a9.094 9.094 0 01-9.061 9.127zm-165.895 0h-64.727a9.094 9.094 0 01-9.062-9.126V894.31c0-5.05 4.045-9.127 9.062-9.127h64.727a9.116 9.116 0 019.126 9.127V958a9.094 9.094 0 01-9.126 9.127zm165.895-828.31h-64.727a9.094 9.094 0 01-9.127-9.127V66.032a9.116 9.116 0 019.127-9.127h64.727c5.016 0 9.061 4.078 9.061 9.127v63.69a9.094 9.094 0 01-9.061 9.127zm-165.895 0h-64.727a9.094 9.094 0 01-9.062-9.127V66.032c0-5.05 4.045-9.127 9.062-9.127h64.727a9.116 9.116 0 019.126 9.127v63.69a9.094 9.094 0 01-9.126 9.127zm330.722 0H894.31a9.094 9.094 0 01-9.127-9.127V66.032a9.116 9.116 0 019.127-9.127H958a9.116 9.116 0 019.127 9.127v63.69a9.094 9.094 0 01-9.126 9.127zm0 663.45H894.31a9.094 9.094 0 01-9.127-9.126v-64.727c0-5.016 4.078-9.061 9.127-9.061H958c5.05 0 9.127 4.045 9.127 9.061v64.727a9.094 9.094 0 01-9.126 9.127zm0-165.862H894.31a9.094 9.094 0 01-9.127-9.126v-64.727c0-5.017 4.078-9.062 9.127-9.062H958c5.05 0 9.127 4.045 9.127 9.062v64.727a9.094 9.094 0 01-9.126 9.126zm0-165.863H894.31a9.094 9.094 0 01-9.127-9.094v-64.727a9.116 9.116 0 019.127-9.126H958a9.116 9.116 0 019.127 9.126v64.727a9.094 9.094 0 01-9.126 9.062zm0-165.862H894.31a9.094 9.094 0 01-9.127-9.094v-64.727a9.116 9.116 0 019.127-9.127H958c5.05 0 9.127 4.078 9.127 9.094v64.727a9.094 9.094 0 01-9.126 9.127zM443.713 967.127H93.314a36.409 36.409 0 01-36.409-36.441V93.314c0-20.065 16.311-36.409 36.441-36.409h350.367c20.065 0 36.409 16.311 36.409 36.441v837.405c0 20.065-16.311 36.409-36.409 36.409zm-295.802-81.976h241.205a9.094 9.094 0 009.094-9.094V147.91a9.094 9.094 0 00-9.062-9.094H147.911a9.094 9.094 0 00-9.094 9.094V876.09c0 5.016 4.078 9.094 9.094 9.094z"/></svg>', pe = '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M66 56.905h63.69c5.05 0 9.127 4.046 9.127 9.062v63.756a9.094 9.094 0 01-9.127 9.062H66.032a9.094 9.094 0 01-9.127-9.062V65.967c0-5.016 4.078-9.062 9.127-9.062zm164.859 0h64.727a9.047 9.047 0 019.061 9.062v63.756a9.094 9.094 0 01-9.061 9.062h-64.727a9.094 9.094 0 01-9.127-9.062V65.967c0-5.016 4.078-9.062 9.127-9.062zm165.862 0h64.727a9.047 9.047 0 019.062 9.062v63.756a9.094 9.094 0 01-9.062 9.062h-64.727a9.094 9.094 0 01-9.126-9.062V65.967c0-5.016 4.078-9.062 9.126-9.062zM230.86 885.183h64.727c5.016 0 9.061 4.078 9.061 9.127V958a9.094 9.094 0 01-9.061 9.127H230.86a9.094 9.094 0 01-9.127-9.126V894.31a9.116 9.116 0 019.127-9.127zm165.862 0h64.727c5.017 0 9.062 4.078 9.062 9.127V958a9.094 9.094 0 01-9.062 9.127h-64.727a9.094 9.094 0 01-9.126-9.126V894.31a9.116 9.116 0 019.126-9.127zm-330.722 0h63.691a9.116 9.116 0 019.127 9.127V958a9.094 9.094 0 01-9.127 9.127H66.032a9.094 9.094 0 01-9.127-9.126V894.31a9.116 9.116 0 019.127-9.127zm0-663.45h63.691a9.116 9.116 0 019.127 9.126v64.727a9.094 9.094 0 01-9.127 9.061H66.032a9.094 9.094 0 01-9.127-9.061v-64.727a9.116 9.116 0 019.127-9.127zm0 165.862h63.691a9.116 9.116 0 019.127 9.126v64.727a9.094 9.094 0 01-9.127 9.062H66.032a9.094 9.094 0 01-9.127-9.062v-64.727a9.116 9.116 0 019.127-9.126zm0 165.863h63.691c5.05 0 9.127 4.077 9.127 9.094v64.727a9.094 9.094 0 01-9.127 9.126H66.032a9.094 9.094 0 01-9.127-9.126v-64.727c0-5.017 4.078-9.062 9.127-9.062zm0 165.862h63.691c5.05 0 9.127 4.078 9.127 9.094v64.727a9.094 9.094 0 01-9.127 9.127H66.032a9.094 9.094 0 01-9.127-9.127v-64.727c0-5.016 4.078-9.061 9.127-9.061zM580.287 56.905h350.431c20.066 0 36.41 16.279 36.41 36.377v837.404c0 20.13-16.312 36.409-36.442 36.409h-350.4a36.409 36.409 0 01-36.408-36.377V93.314c0-20.13 16.311-36.409 36.409-36.409zm295.802 81.88H634.884a9.094 9.094 0 00-9.094 9.126V876.09c0 5.016 4.078 9.094 9.062 9.094h241.237a9.094 9.094 0 009.094-9.094V147.91a9.094 9.094 0 00-9.094-9.094z"/></svg>';
function g(t, e, i) {
  return e != null && Number.isFinite(e) && t < e ? e : i != null && Number.isFinite(i) && t > i ? i : t;
}
const C = "__xWindow_resize_prop__", z = 360, M = 32;
function V(t, e, i) {
  const o = e.getBoundingClientRect(), l = document.documentElement.getBoundingClientRect();
  if (i.direction == f.TOP) {
    const s = t.clientY - l.top;
    return {
      height: g(o.bottom - t.clientY, M),
      top: s
    };
  }
  if (i.direction == f.BOTTOM) {
    const s = g(t.clientY - o.top, M), n = t.clientY - s - l.top;
    return {
      height: s,
      top: n
    };
  }
  if (i.direction == f.LEFT) {
    const s = g(o.right - t.clientX, z), n = t.clientX - l.left;
    return {
      width: s,
      left: n
    };
  }
  if (i.direction == f.RIGHT) {
    const s = g(t.clientX - o.left, z), n = t.clientX - s - l.left;
    return {
      width: s,
      left: n
    };
  }
  if (i.direction == f.LEFT_TOP) {
    const s = t.clientY - l.top, n = t.clientX - l.left, d = g(o.right - t.clientX, z), a = g(o.bottom - t.clientY, M);
    return {
      top: s,
      left: n,
      width: d,
      height: a
    };
  }
  if (i.direction == f.LEFT_BOTTOM) {
    const s = g(t.clientY - o.top, M), n = g(o.right - t.clientX, z), d = t.clientY - s - l.top, a = t.clientX - l.left;
    return {
      top: d,
      left: a,
      width: n,
      height: s
    };
  }
  if (i.direction == f.RIGHT_TOP) {
    const s = g(t.clientX - o.left, z), n = g(o.bottom - t.clientY, M), d = t.clientY - l.top, a = t.clientX - s - l.left;
    return {
      top: d,
      left: a,
      width: s,
      height: n
    };
  }
  if (i.direction == f.RIGHT_BOTTOM) {
    const s = g(t.clientY - o.top, M), n = g(t.clientX - o.left, z), d = t.clientY - s - l.top, a = t.clientX - n - l.left;
    return {
      top: d,
      left: a,
      width: n,
      height: s
    };
  }
  return null;
}
function _e(t) {
  const e = y(), i = [[c.resizeTop, f.TOP], [c.resizeBottom, f.BOTTOM], [c.resizeLeft, f.LEFT], [c.resizeRight, f.RIGHT], [c.resizeLeftTop, f.LEFT_TOP], [c.resizeLeftBottom, f.LEFT_BOTTOM], [c.resizeRightTop, f.RIGHT_TOP], [c.resizeRightBottom, f.RIGHT_BOTTOM]], o = {
    init: !1,
    direction: -1,
    top: 0,
    left: 0,
    width: 0,
    height: 0
  };
  function l(a) {
    a.preventDefault(), o.init = !1, o.direction = a.target[C], o.top = t.windowState.top, o.left = t.windowState.left, o.width = t.windowState.width, o.height = t.windowState.height, window.addEventListener("mousemove", s), window.addEventListener("mouseup", n);
  }
  function s(a) {
    a.preventDefault();
    const w = e == null ? void 0 : e.refs.window;
    o.init || (w.classList.add(c.resizing), o.init = !0), t.windowState.splitPosition != m.NONE && (t.exitSplitMode(), o.top = t.windowState.top, o.left = t.windowState.left, o.width = t.windowState.width, o.height = t.windowState.height);
    const v = V(a, w, o);
    if (v != null)
      for (const k in v) {
        const O = Math.round(v[k]);
        Reflect.set(o, k, O), Reflect.set(w.style, k, O + "px");
      }
  }
  function n(a) {
    if (a.preventDefault(), o.init) {
      const w = e == null ? void 0 : e.refs.window;
      V(a, w, o) != null && (t.windowState.top = o.top, t.windowState.left = o.left, t.windowState.width = o.width, t.windowState.height = o.height), w.classList.remove(c.resizing);
    }
    window.removeEventListener("mousemove", s), window.removeEventListener("mouseup", n);
  }
  const d = i.map((a) => N("div", {
    className: a[0],
    ["." + C]: a[1]
  }));
  return h("div", {
    class: c.resize,
    onMousedown: l
  }, [d]);
}
function me(t) {
  const e = y(), i = {
    init: !1,
    left: 0,
    top: 0,
    prevClientX: 0,
    prevClientY: 0
  };
  function o(n) {
    n.preventDefault(), i.init = !1, i.left = t.windowState.left, i.top = t.windowState.top, i.prevClientX = n.clientX, i.prevClientY = n.clientY, window.addEventListener("mousemove", l), window.addEventListener("mouseup", s);
  }
  function l(n) {
    n.preventDefault();
    const d = e == null ? void 0 : e.refs.window;
    i.init || (d.classList.add(c.dragging), i.init = !0), t.windowState.splitPosition != m.NONE && (t.exitSplitMode(), i.left = t.windowState.left, i.top = t.windowState.top), i.left = Math.round(i.left + n.clientX - i.prevClientX), i.top = Math.round(i.top + n.clientY - i.prevClientY), i.prevClientX = n.clientX, i.prevClientY = n.clientY, d.style.left = i.left + "px", d.style.top = i.top + "px";
  }
  function s(n) {
    if (n.preventDefault(), i.init) {
      const d = e == null ? void 0 : e.refs.window;
      t.windowState.top = i.top, t.windowState.left = i.left, d.classList.remove(c.dragging);
    }
    window.removeEventListener("mousemove", l), window.removeEventListener("mouseup", s);
  }
  return { dragStart: o };
}
const ve = /* @__PURE__ */ B({
  name: "WindowBody",
  props: {
    body: {
      default: null
    }
  },
  setup(t) {
    const e = wt(q);
    return function() {
      return typeof t.body == "function" ? t.body(e) : t.body;
    };
  }
});
function be(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !bt(t);
}
const Te = Math.floor(Number.MAX_SAFE_INTEGER / 1e3);
function ze() {
  return {
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    zIndex: 0,
    fullscreen: !1,
    focused: !1,
    pinned: !1,
    splitPosition: m.NONE
  };
}
const $ = /* @__PURE__ */ B({
  name: "BaseWindow",
  props: {
    ...J,
    uid: {
      type: T,
      required: !0
    },
    body: {
      default: null
    }
  },
  emits: ["update:visible", "beforeUnmount"],
  setup(t, {
    emit: e,
    expose: i
  }) {
    const o = T.create(t.uid), l = y(), s = Y(_.INIT), n = gt(ze()), d = {
      width: 0,
      height: 0
    }, a = L(() => t.draggable && t.resizable), w = {
      get uid() {
        return o;
      },
      get visible() {
        return t.visible;
      },
      get windowState() {
        return n;
      },
      exitSplitMode: ct,
      close: E
    }, v = t.draggable ? me(w) : null, k = a.value ? _e(w) : null, O = L(() => (n.pinned ? Te : 0) + n.zIndex), K = L(() => {
      const u = [c.window];
      return s.value == _.INIT && u.push(c.init), s.value == _.LAYOUT && u.push(c.layout), n.fullscreen && u.push(c.fullscreen), n.focused && u.push(c.focused), u;
    }), Q = L(() => {
      if (s.value == _.INIT)
        return {
          width: t.width
        };
      const u = t.mask ? null : O.value;
      return n.fullscreen ? {
        zIndex: u
      } : n.splitPosition === m.LEFT || n.splitPosition === m.RIGHT ? {
        top: 0,
        left: n.splitPosition == m.RIGHT ? "50vw" : 0,
        width: "50vw",
        height: "100vh",
        zIndex: u
      } : {
        top: n.top + "px",
        left: n.left + "px",
        width: n.width + "px",
        height: s.value == _.INIT ? null : n.height + "px",
        zIndex: u
      };
    });
    async function tt(u) {
      await H();
      const p = u.el.getBoundingClientRect();
      s.value == _.INIT && (n.width = p.width, n.height = p.height, n.left = (window.innerWidth - p.width) / 2, n.top = window.innerHeight * 0.15, s.value = _.LAYOUT, setTimeout(() => {
        s.value = _.MOUNTED;
      }, 0)), W();
    }
    function E(u) {
      t.closeable && (u == null || u.stopPropagation(), e("update:visible", !1));
    }
    function et() {
      n.focused = !1, H(Z);
    }
    function nt(u) {
      u.stopPropagation();
    }
    function W() {
      n.focused || P(o);
    }
    function it() {
      n.fullscreen = !n.fullscreen;
    }
    function ot() {
      n.pinned = !n.pinned;
    }
    function st() {
      x(), n.splitPosition = m.LEFT;
    }
    function lt() {
      x(), n.splitPosition = m.RIGHT;
    }
    function x() {
      d.width = n.width, d.height = n.height;
    }
    function ct() {
      const I = l.refs.window.getBoundingClientRect();
      n.top = I.top, n.left = I.left, n.width = d.width, n.height = d.height, n.splitPosition = m.NONE;
    }
    const rt = pt(() => t.visible, () => {
      t.visible || et();
    });
    Ot(o, w), X(() => {
      e("beforeUnmount"), E(), D(o);
    }), _t(() => {
      rt(), s.value = _.UNMOUNTED;
    }), mt(q, w), i(w);
    function ut() {
      const u = [];
      return t.mask !== !0 && (u.push(h("button", {
        onClick: st,
        type: "button",
        innerHTML: ge,
        class: c.menu,
        title: "向左分割"
      }, null)), u.push(h("button", {
        onClick: lt,
        type: "button",
        innerHTML: pe,
        class: c.menu,
        title: "向右分割"
      }, null)), u.push(h("button", {
        onClick: ot,
        type: "button",
        innerHTML: we,
        class: n.pinned ? c.pinMenu : c.menu,
        title: "固定"
      }, null))), a.value && u.push(h("button", {
        onClick: it,
        type: "button",
        innerHTML: fe,
        class: c.menu,
        title: "最大化"
      }, null)), t.closeable && u.push(h("button", {
        onClick: E,
        type: "button",
        innerHTML: de,
        class: c.closeMenu,
        title: "关闭"
      }, null)), u.length == 0 ? null : h("div", {
        class: c.menus,
        onMousedown: nt
      }, [u]);
    }
    return function() {
      if (!t.visible)
        return null;
      const u = h("div", {
        class: c.main
      }, [h("div", {
        class: c.header,
        onMousedown: v == null ? void 0 : v.dragStart
      }, [h("i", {
        class: c.logo,
        innerHTML: he
      }, null), h("div", {
        class: c.title
      }, [t.title ?? "新窗口"]), ut()]), h("div", {
        class: c.body
      }, [h(ve, {
        body: t.body,
        key: o.wid
      }, null)])]), I = {
        ref: "window",
        id: t.id ?? o.wid,
        onVnodeMounted: tt,
        onMousedownCapture: W,
        class: K.value,
        style: Q.value
      };
      let p = N("div", I, [u, k]);
      if (t.mask === !0) {
        const at = {
          zIndex: O.value
        };
        p = h("div", {
          class: c.mask,
          style: at
        }, [p]);
      }
      return t.appendToBody ? h(vt, {
        to: "body"
      }, be(p) ? p : {
        default: () => [p]
      }) : p;
    };
  }
}), R = /* @__PURE__ */ B({
  name: "SimpleWindow",
  props: {
    ...J
  },
  setup(t, {
    slots: e,
    attrs: i
  }) {
    const o = T.create();
    return function() {
      const l = {
        ...t,
        ...i,
        uid: o,
        body: e.default
      };
      return h($, l, null);
    };
  }
}), F = /* @__PURE__ */ B({
  name: "WindowManager",
  setup() {
    const t = Bt();
    function e(i) {
      i.key == "Escape" && j();
    }
    return Tt(), window.addEventListener("keydown", e, !0), X(() => {
      zt(), window.removeEventListener("keydown", e, !0);
    }), function() {
      return t.value.map((i) => {
        const o = It(i);
        if (o != null)
          return N($, o.buildProps());
      });
    };
  }
});
function Me(t) {
  if (t.length == 1) {
    const e = t[0];
    return e == null ? null : typeof e == "object" ? e : null;
  }
  if (t.length == 2) {
    const [e, i] = t;
    if (typeof e == "string" && i != null)
      return { title: e, body: i };
  }
  return null;
}
function Ee(...t) {
  const e = Me(t);
  return e == null ? (console.error("[xWindow]: 参数有误"), null) : ke(e);
}
function ke(t) {
  if (!Mt())
    return console.error("[xWindow] 需要先创建`WindowManager`组件，见文档 " + yt + " 。"), null;
  const { displayAfterCreate: e, unmountAfterClose: i, ...o } = t, l = {
    uid: null,
    visible: Y(e !== !1),
    isUnmounted: !1
  }, s = () => l.visible.value = !0, n = () => {
    l.visible.value = !1, i !== !1 && d();
  }, d = () => {
    l.visible.value && n(), D(l.uid), H(Z);
  }, a = Object.assign({}, o, {
    visible: l.visible,
    [Wt](w) {
      w ? s() : n();
    },
    [xt]() {
      l.isUnmounted = !0;
    }
  });
  return l.uid = Lt(S.create(a)), {
    uid: l.uid,
    get isUnmounted() {
      return l.isUnmounted;
    },
    get visible() {
      return l.visible.value;
    },
    show: s,
    close: n,
    unmount: d
  };
}
function Oe(t, e) {
  t.component(R.name, R), t.component(F.name, F), Ht(e);
}
const Ie = Nt, He = { install: Oe, version: Ie };
export {
  _ as ComponentStates,
  R as SimpleWindow,
  F as WindowManager,
  He as default,
  Oe as install,
  Ee as useWindow,
  Be as useWindowManager,
  Ie as version,
  He as xWindow
};
