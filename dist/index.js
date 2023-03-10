/*! @dongls/xWindow v0.0.5 https://github.com/dongls/xWindow
Copyright 2023-present dongls
Released under the MIT License */
var Mt = Object.defineProperty;
var Ot = (t, e, n) => e in t ? Mt(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var z = (t, e, n) => (Ot(t, typeof e != "symbol" ? e + "" : e, n), n);
import { shallowRef as St, inject as P, getCurrentInstance as C, h as k, createVNode as f, defineComponent as I, ref as Z, reactive as Bt, computed as L, watch as It, onBeforeUnmount as $, onUnmounted as yt, provide as Lt, Teleport as Et, isVNode as x, nextTick as N } from "vue";
const jt = "https://github.com/dongls/xWindow", Ht = "0.0.5", Nt = "onUpdate:visible", Wt = "onBeforeUnmount", Ct = "onUnmount", V = Symbol(), _ = Object.freeze({
  INIT: 0,
  LAYOUT: 1,
  MOUNTED: 2,
  UNMOUNTED: 3
});
var h = /* @__PURE__ */ ((t) => (t[t.TOP = 0] = "TOP", t[t.BOTTOM = 1] = "BOTTOM", t[t.LEFT = 2] = "LEFT", t[t.RIGHT = 3] = "RIGHT", t[t.LEFT_TOP = 4] = "LEFT_TOP", t[t.LEFT_BOTTOM = 5] = "LEFT_BOTTOM", t[t.RIGHT_TOP = 6] = "RIGHT_TOP", t[t.RIGHT_BOTTOM = 7] = "RIGHT_BOTTOM", t))(h || {});
const R = {
  /** 窗口的标题 */
  title: String,
  /** 窗口的id */
  id: String,
  /** 是否显示窗口 */
  visible: {
    type: Boolean,
    default: !1
  },
  /** 窗口初始宽度，参照`CSS`的`width`语法 */
  width: {
    type: String,
    default: "640px"
  },
  /** 窗口初始高度，参照`CSS`的`height`语法 */
  height: {
    type: String,
    default: null
  },
  /** 窗口初始位置，参照`CSS`的`left`语法 */
  left: {
    type: String,
    default: null
  },
  /** 窗口初始位置，参照`CSS`的`top`语法 */
  top: {
    type: String,
    default: null
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
let kt = 1e3;
class v {
  /** 统一使用`UID.create`方法创建 */
  constructor() {
    z(this, "value");
    this.value = kt++;
  }
  get wid() {
    return "window--" + this.value;
  }
  static create(e) {
    return e instanceof v ? e : Object.freeze(new v());
  }
}
class E {
  constructor(e) {
    z(this, "uid");
    z(this, "type");
    z(this, "visible");
    z(this, "others");
    z(this, "body");
    const { visible: n, body: o, type: c, ...l } = e;
    this.uid = v.create(), this.type = c, this.visible = n, this.body = o, this.others = l;
  }
  static create(e) {
    return e instanceof E ? e : new E(e);
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
const d = {
  isMounted: !1,
  zIndex: 1e3,
  stack: /* @__PURE__ */ new Map(),
  ghost: St([]),
  options: /* @__PURE__ */ new Map(),
  topWindow: null
};
function xt() {
  d.isMounted = !0;
}
function Vt() {
  d.isMounted = !1, d.topWindow = null, d.ghost.value = [], d.stack.clear(), d.options.clear();
}
function Rt() {
  return d.isMounted;
}
function q() {
  return d.zIndex;
}
function J() {
  return d.zIndex += 1;
}
function Ut(t) {
  typeof t == "number" && Number.isFinite(t) && (d.zIndex = Math.floor(t));
}
function Yt(t, e) {
  d.stack.set(t, e);
}
function K(t) {
  d.stack.delete(t), d.options.delete(t);
  const e = d.ghost.value.indexOf(t);
  if (e >= 0) {
    const n = d.ghost.value;
    n.splice(e, 1), d.ghost.value = n.slice();
  }
}
function Q() {
  d.stack.size == 0 || d.topWindow == null || d.topWindow.close();
}
function Ft(t) {
  return d.options.get(t);
}
function Xt(t) {
  const e = d.ghost.value;
  return e.push(t.uid), d.ghost.value = e.slice(), d.options.set(t.uid, t), t.uid;
}
function Gt(t) {
  return d.stack.get(t);
}
function Dt() {
  return d.ghost;
}
function tt(t) {
  if (d.topWindow = t, t == null)
    return;
  for (const n of d.stack.values()) {
    const o = n.windowState;
    o.focused = n === t;
  }
  const e = t.windowState;
  e.zIndex < q() && (e.zIndex = J());
}
function et(t) {
  const e = d.stack.get(t);
  tt(e);
}
function nt() {
  const t = At();
  tt(t);
}
function At() {
  return d.stack.size == 0 ? null : Array.from(d.stack.values()).filter((e) => e.visible).sort((e, n) => {
    const o = e.windowState;
    return n.windowState.zIndex - o.zIndex;
  })[0];
}
function ke() {
  return {
    closeTopWindow: Q,
    getTopZIndex: J,
    getWindowProxy: Gt,
    getZIndex: q,
    setFocusedWindow: et
  };
}
function Pt(t) {
  Ut(t == null ? void 0 : t.zIndex);
}
function xe() {
  return P(V);
}
const Zt = "_window_jhh1f_7", $t = "_dragging_jhh1f_18", qt = "_resizing_jhh1f_18", Jt = "_fullscreen_jhh1f_22", Kt = "_focused_jhh1f_32", Qt = "_main_jhh1f_36", te = "_init_jhh1f_43", ee = "_layout_jhh1f_51", ne = "_header_jhh1f_59", ie = "_title_jhh1f_69", oe = "_menus_jhh1f_79", se = "_body_jhh1f_85", le = "_footer_jhh1f_90", ce = "_menu_jhh1f_79", ue = "_closeMenu_jhh1f_140 _menu_jhh1f_79", re = "_pinMenu_jhh1f_151 _menu_jhh1f_79", ae = "_logo_jhh1f_158", de = "_resize_jhh1f_168", fe = "_resizeBar_jhh1f_172", he = "_resizeTop_jhh1f_177 _resizeBar_jhh1f_172", we = "_resizeBottom_jhh1f_178 _resizeBar_jhh1f_172", ge = "_resizeRight_jhh1f_194 _resizeBar_jhh1f_172", pe = "_resizeLeft_jhh1f_195 _resizeBar_jhh1f_172", _e = "_resizeLeftTop_jhh1f_211 _resizeBar_jhh1f_172", me = "_resizeLeftBottom_jhh1f_212 _resizeBar_jhh1f_172", ve = "_resizeRightTop_jhh1f_213 _resizeBar_jhh1f_172", Te = "_resizeRightBottom_jhh1f_214 _resizeBar_jhh1f_172", ze = "_mask_jhh1f_244", r = {
  window: Zt,
  dragging: $t,
  resizing: qt,
  fullscreen: Jt,
  focused: Kt,
  main: Qt,
  init: te,
  layout: ee,
  header: ne,
  title: ie,
  menus: oe,
  body: se,
  footer: le,
  menu: ce,
  closeMenu: ue,
  pinMenu: re,
  logo: ae,
  resize: de,
  resizeBar: fe,
  resizeTop: he,
  resizeBottom: we,
  resizeRight: ge,
  resizeLeft: pe,
  resizeLeftTop: _e,
  resizeLeftBottom: me,
  resizeRightTop: ve,
  resizeRightBottom: Te,
  mask: ze
}, it = '<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M590.265 511.987l305.521-305.468c21.617-21.589 21.617-56.636.027-78.252-21.616-21.617-56.663-21.617-78.279 0L512.012 433.735 206.544 128.213c-21.617-21.617-56.635-21.617-78.252 0-21.616 21.589-21.616 56.635-.027 78.252L433.76 511.987 128.211 817.482c-21.617 21.59-21.617 56.635 0 78.251 10.808 10.81 24.967 16.213 39.125 16.213 14.159 0 28.318-5.403 39.126-16.213l305.522-305.468L817.48 895.788C828.289 906.597 842.447 912 856.606 912s28.317-5.403 39.125-16.212c21.618-21.59 21.618-56.636.028-78.252L590.265 511.987z"/></svg>', ot = '<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M928.7 135.8H99.8c-21.15 0-37.8 17.55-37.8 35.1v685.35c0 17.55 17.1 31.5 37.8 31.5h828.45c21.15 0 33.3-14.4 33.3-31.5v-684.9c.45-17.55-12.15-35.55-32.85-35.55zm-53.1 666.9H147.5V222.2h728.1v580.5z"/></svg>', st = '<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M38.794 124.791v778.495h946.412V124.791H38.794zm896.678 728.033H89.292v-460.9h846.18v460.9z"/></svg>', lt = '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M738.793 681.382v-48.331l88.242-88.243a298.676 298.676 0 00156.712-83.482 38.836 38.836 0 000-54.923l-366.15-366.15a38.836 38.836 0 00-54.923 0 298.52 298.52 0 00-83.519 156.749l-88.169 88.169h-48.332a411.145 411.145 0 00-292.59 121.232c-15.16 15.159-15.16 39.764 0 54.923L278.906 690.17 86.642 882.436a38.836 38.836 0 1054.922 54.922l192.23-192.229 228.844 228.845a38.836 38.836 0 0054.922 0 411.042 411.042 0 00121.233-292.592zM134.02 435.44a333.473 333.473 0 01208.56-72.571l64.406.037a38.836 38.836 0 0027.461-11.351L544.292 241.71a38.68 38.68 0 0011.351-27.462 180.096 180.096 0 0136.798-89.01L898.8 431.593a180.925 180.925 0 01-89.12 36.835 38.836 38.836 0 00-27.462 11.35L672.373 589.626c-7.287 7.286-11.387 17.173-11.35 27.461l.036 64.406a333.318 333.318 0 01-72.608 208.596L134.021 435.44z"/></svg>', ct = '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M958 967.127h-63.69a9.094 9.094 0 01-9.127-9.126V894.31a9.116 9.116 0 019.127-9.127H958a9.116 9.116 0 019.127 9.127V958a9.094 9.094 0 01-9.126 9.127zm-164.826 0h-64.727a9.094 9.094 0 01-9.127-9.126V894.31a9.116 9.116 0 019.127-9.127h64.727c5.016 0 9.061 4.078 9.061 9.127V958a9.094 9.094 0 01-9.061 9.127zm-165.895 0h-64.727a9.094 9.094 0 01-9.062-9.126V894.31c0-5.05 4.045-9.127 9.062-9.127h64.727a9.116 9.116 0 019.126 9.127V958a9.094 9.094 0 01-9.126 9.127zm165.895-828.31h-64.727a9.094 9.094 0 01-9.127-9.127V66.032a9.116 9.116 0 019.127-9.127h64.727c5.016 0 9.061 4.078 9.061 9.127v63.69a9.094 9.094 0 01-9.061 9.127zm-165.895 0h-64.727a9.094 9.094 0 01-9.062-9.127V66.032c0-5.05 4.045-9.127 9.062-9.127h64.727a9.116 9.116 0 019.126 9.127v63.69a9.094 9.094 0 01-9.126 9.127zm330.722 0H894.31a9.094 9.094 0 01-9.127-9.127V66.032a9.116 9.116 0 019.127-9.127H958a9.116 9.116 0 019.127 9.127v63.69a9.094 9.094 0 01-9.126 9.127zm0 663.45H894.31a9.094 9.094 0 01-9.127-9.126v-64.727c0-5.016 4.078-9.061 9.127-9.061H958c5.05 0 9.127 4.045 9.127 9.061v64.727a9.094 9.094 0 01-9.126 9.127zm0-165.862H894.31a9.094 9.094 0 01-9.127-9.126v-64.727c0-5.017 4.078-9.062 9.127-9.062H958c5.05 0 9.127 4.045 9.127 9.062v64.727a9.094 9.094 0 01-9.126 9.126zm0-165.863H894.31a9.094 9.094 0 01-9.127-9.094v-64.727a9.116 9.116 0 019.127-9.126H958a9.116 9.116 0 019.127 9.126v64.727a9.094 9.094 0 01-9.126 9.062zm0-165.862H894.31a9.094 9.094 0 01-9.127-9.094v-64.727a9.116 9.116 0 019.127-9.127H958c5.05 0 9.127 4.078 9.127 9.094v64.727a9.094 9.094 0 01-9.126 9.127zM443.713 967.127H93.314a36.409 36.409 0 01-36.409-36.441V93.314c0-20.065 16.311-36.409 36.441-36.409h350.367c20.065 0 36.409 16.311 36.409 36.441v837.405c0 20.065-16.311 36.409-36.409 36.409zm-295.802-81.976h241.205a9.094 9.094 0 009.094-9.094V147.91a9.094 9.094 0 00-9.062-9.094H147.911a9.094 9.094 0 00-9.094 9.094V876.09c0 5.016 4.078 9.094 9.094 9.094z"/></svg>', ut = '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M66 56.905h63.69c5.05 0 9.127 4.046 9.127 9.062v63.756a9.094 9.094 0 01-9.127 9.062H66.032a9.094 9.094 0 01-9.127-9.062V65.967c0-5.016 4.078-9.062 9.127-9.062zm164.859 0h64.727a9.047 9.047 0 019.061 9.062v63.756a9.094 9.094 0 01-9.061 9.062h-64.727a9.094 9.094 0 01-9.127-9.062V65.967c0-5.016 4.078-9.062 9.127-9.062zm165.862 0h64.727a9.047 9.047 0 019.062 9.062v63.756a9.094 9.094 0 01-9.062 9.062h-64.727a9.094 9.094 0 01-9.126-9.062V65.967c0-5.016 4.078-9.062 9.126-9.062zM230.86 885.183h64.727c5.016 0 9.061 4.078 9.061 9.127V958a9.094 9.094 0 01-9.061 9.127H230.86a9.094 9.094 0 01-9.127-9.126V894.31a9.116 9.116 0 019.127-9.127zm165.862 0h64.727c5.017 0 9.062 4.078 9.062 9.127V958a9.094 9.094 0 01-9.062 9.127h-64.727a9.094 9.094 0 01-9.126-9.126V894.31a9.116 9.116 0 019.126-9.127zm-330.722 0h63.691a9.116 9.116 0 019.127 9.127V958a9.094 9.094 0 01-9.127 9.127H66.032a9.094 9.094 0 01-9.127-9.126V894.31a9.116 9.116 0 019.127-9.127zm0-663.45h63.691a9.116 9.116 0 019.127 9.126v64.727a9.094 9.094 0 01-9.127 9.061H66.032a9.094 9.094 0 01-9.127-9.061v-64.727a9.116 9.116 0 019.127-9.127zm0 165.862h63.691a9.116 9.116 0 019.127 9.126v64.727a9.094 9.094 0 01-9.127 9.062H66.032a9.094 9.094 0 01-9.127-9.062v-64.727a9.116 9.116 0 019.127-9.126zm0 165.863h63.691c5.05 0 9.127 4.077 9.127 9.094v64.727a9.094 9.094 0 01-9.127 9.126H66.032a9.094 9.094 0 01-9.127-9.126v-64.727c0-5.017 4.078-9.062 9.127-9.062zm0 165.862h63.691c5.05 0 9.127 4.078 9.127 9.094v64.727a9.094 9.094 0 01-9.127 9.127H66.032a9.094 9.094 0 01-9.127-9.127v-64.727c0-5.016 4.078-9.061 9.127-9.061zM580.287 56.905h350.431c20.066 0 36.41 16.279 36.41 36.377v837.404c0 20.13-16.312 36.409-36.442 36.409h-350.4a36.409 36.409 0 01-36.408-36.377V93.314c0-20.13 16.311-36.409 36.409-36.409zm295.802 81.88H634.884a9.094 9.094 0 00-9.094 9.126V876.09c0 5.016 4.078 9.094 9.062 9.094h241.237a9.094 9.094 0 009.094-9.094V147.91a9.094 9.094 0 00-9.094-9.094z"/></svg>';
function Ve() {
  return {
    IconClose: it,
    IconMax: ot,
    IconPin: lt,
    IconSplitLeft: ct,
    IconSplitRight: ut,
    IconWindow: st
  };
}
function g(t, e, n) {
  return e != null && Number.isFinite(e) && t < e ? e : n != null && Number.isFinite(n) && t > n ? n : t;
}
const G = "__xWindow_resize_prop__", O = 360, S = 32;
function D(t, e, n) {
  const o = e.getBoundingClientRect(), c = document.documentElement.getBoundingClientRect();
  if (n.direction == h.TOP) {
    const l = t.clientY - c.top;
    return {
      height: g(o.bottom - t.clientY, S),
      top: l
    };
  }
  if (n.direction == h.BOTTOM) {
    const l = g(t.clientY - o.top, S), s = t.clientY - l - c.top;
    return {
      height: l,
      top: s
    };
  }
  if (n.direction == h.LEFT) {
    const l = g(o.right - t.clientX, O), s = t.clientX - c.left;
    return {
      width: l,
      left: s
    };
  }
  if (n.direction == h.RIGHT) {
    const l = g(t.clientX - o.left, O), s = t.clientX - l - c.left;
    return {
      width: l,
      left: s
    };
  }
  if (n.direction == h.LEFT_TOP) {
    const l = t.clientY - c.top, s = t.clientX - c.left, i = g(o.right - t.clientX, O), u = g(o.bottom - t.clientY, S);
    return {
      top: l,
      left: s,
      width: i,
      height: u
    };
  }
  if (n.direction == h.LEFT_BOTTOM) {
    const l = g(t.clientY - o.top, S), s = g(o.right - t.clientX, O), i = t.clientY - l - c.top, u = t.clientX - c.left;
    return {
      top: i,
      left: u,
      width: s,
      height: l
    };
  }
  if (n.direction == h.RIGHT_TOP) {
    const l = g(t.clientX - o.left, O), s = g(o.bottom - t.clientY, S), i = t.clientY - c.top, u = t.clientX - l - c.left;
    return {
      top: i,
      left: u,
      width: l,
      height: s
    };
  }
  if (n.direction == h.RIGHT_BOTTOM) {
    const l = g(t.clientY - o.top, S), s = g(t.clientX - o.left, O), i = t.clientY - l - c.top, u = t.clientX - s - c.left;
    return {
      top: i,
      left: u,
      width: s,
      height: l
    };
  }
  return null;
}
function be(t) {
  const e = C(), n = [[r.resizeTop, h.TOP], [r.resizeBottom, h.BOTTOM], [r.resizeLeft, h.LEFT], [r.resizeRight, h.RIGHT], [r.resizeLeftTop, h.LEFT_TOP], [r.resizeLeftBottom, h.LEFT_BOTTOM], [r.resizeRightTop, h.RIGHT_TOP], [r.resizeRightBottom, h.RIGHT_BOTTOM]], o = {
    init: !1,
    direction: -1,
    top: 0,
    left: 0,
    width: 0,
    height: 0
  };
  function c(u) {
    u.preventDefault(), o.init = !1, o.direction = u.target[G], o.top = t.windowState.top, o.left = t.windowState.left, o.width = t.windowState.width, o.height = t.windowState.height, window.addEventListener("mousemove", l), window.addEventListener("mouseup", s);
  }
  function l(u) {
    u.preventDefault();
    const p = e == null ? void 0 : e.refs.window;
    o.init || (p.classList.add(r.resizing), o.init = !0), t.windowState.splitPosition != m.NONE && (t.exitSplitMode(), o.top = t.windowState.top, o.left = t.windowState.left, o.width = t.windowState.width, o.height = t.windowState.height);
    const w = D(u, p, o);
    if (w != null)
      for (const T in w) {
        const y = Math.round(w[T]);
        Reflect.set(o, T, y), Reflect.set(p.style, T, y + "px");
      }
  }
  function s(u) {
    if (u.preventDefault(), o.init) {
      const p = e == null ? void 0 : e.refs.window;
      D(u, p, o) != null && (t.windowState.top = o.top, t.windowState.left = o.left, t.windowState.width = o.width, t.windowState.height = o.height), p.classList.remove(r.resizing);
    }
    window.removeEventListener("mousemove", l), window.removeEventListener("mouseup", s);
  }
  const i = n.map((u) => k("div", {
    className: u[0],
    ["." + G]: u[1]
  }));
  return f("div", {
    class: r.resize,
    onMousedown: c
  }, [i]);
}
function Me(t) {
  const e = C(), n = {
    init: !1,
    left: 0,
    top: 0,
    prevClientX: 0,
    prevClientY: 0
  };
  function o(s) {
    if (t.windowState.fullscreen)
      return;
    const u = (e == null ? void 0 : e.refs.window).getBoundingClientRect();
    s.clientY - u.top > 30 || (s.preventDefault(), n.init = !1, n.left = t.windowState.left, n.top = t.windowState.top, n.prevClientX = s.clientX, n.prevClientY = s.clientY, window.addEventListener("mousemove", c), window.addEventListener("mouseup", l));
  }
  function c(s) {
    s.preventDefault();
    const i = e == null ? void 0 : e.refs.window;
    n.init || (i.classList.add(r.dragging), n.init = !0), t.windowState.splitPosition != m.NONE && (t.exitSplitMode(), n.left = t.windowState.left, n.top = t.windowState.top), n.left = Math.round(n.left + s.clientX - n.prevClientX), n.top = Math.round(n.top + s.clientY - n.prevClientY), n.prevClientX = s.clientX, n.prevClientY = s.clientY, i.style.left = n.left + "px", i.style.top = n.top + "px";
  }
  function l(s) {
    if (s.preventDefault(), n.init) {
      const i = e == null ? void 0 : e.refs.window;
      t.windowState.top = n.top, t.windowState.left = n.left, i.classList.remove(r.dragging);
    }
    window.removeEventListener("mousemove", c), window.removeEventListener("mouseup", l);
  }
  return { dragStart: o };
}
const Oe = /* @__PURE__ */ I({
  name: "WindowBody",
  props: {
    body: {
      default: null
    }
  },
  setup(t) {
    const e = P(V);
    return function() {
      return typeof t.body == "function" ? t.body(e) : t.body;
    };
  }
});
function Se(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !x(t);
}
const Be = Math.floor(Number.MAX_SAFE_INTEGER / 1e3);
function Ie() {
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
const rt = /* @__PURE__ */ I({
  name: "BaseWindow",
  props: {
    ...R,
    uid: {
      type: v,
      required: !0
    },
    body: {
      default: null
    }
  },
  emits: ["update:visible", "beforeUnmount", "unmount"],
  setup(t, {
    emit: e,
    expose: n,
    slots: o
  }) {
    const c = v.create(t.uid), l = C(), s = Z(_.INIT), i = Bt(Ie()), u = {
      width: 0,
      height: 0
    }, p = L(() => t.draggable && t.resizable), w = {
      get uid() {
        return c;
      },
      get visible() {
        return t.visible;
      },
      get windowState() {
        return i;
      },
      exitSplitMode: vt,
      close: H,
      getMenus: X
    }, T = t.draggable ? Me(w) : null, y = p.value ? be(w) : null, U = L(() => (i.pinned ? Be : 0) + i.zIndex), at = L(() => {
      const a = [r.window];
      return s.value == _.INIT && a.push(r.init), s.value == _.LAYOUT && a.push(r.layout), i.fullscreen && a.push(r.fullscreen), i.focused && a.push(r.focused), a;
    }), dt = L(() => {
      if (s.value == _.INIT)
        return {
          width: t.width,
          height: t.height,
          left: t.left ?? "100px",
          top: t.top ?? "15vh"
        };
      const a = t.mask ? null : U.value;
      return i.fullscreen ? {
        zIndex: a
      } : i.splitPosition === m.LEFT || i.splitPosition === m.RIGHT ? {
        top: 0,
        left: i.splitPosition == m.RIGHT ? "50vw" : 0,
        width: "50vw",
        height: "100vh",
        zIndex: a
      } : {
        top: i.top + "px",
        left: i.left + "px",
        width: i.width + "px",
        height: s.value == _.INIT ? null : i.height + "px",
        zIndex: a
      };
    });
    async function ft(a) {
      await N();
      const b = a.el.getBoundingClientRect();
      s.value == _.INIT && (i.width = b.width, i.height = b.height, i.left = b.left, i.top = b.top, s.value = _.LAYOUT, setTimeout(() => {
        s.value = _.MOUNTED;
      }, 0)), Y();
    }
    function H(a) {
      t.closeable && (a == null || a.stopPropagation(), e("update:visible", !1));
    }
    function ht() {
      i.focused = !1, N(nt);
    }
    function wt(a) {
      a.stopPropagation();
    }
    function Y() {
      i.focused || et(c);
    }
    function gt() {
      i.fullscreen = !i.fullscreen;
    }
    function pt() {
      i.pinned = !i.pinned;
    }
    function _t() {
      F(), i.splitPosition = m.LEFT;
    }
    function mt() {
      F(), i.splitPosition = m.RIGHT;
    }
    function F() {
      u.width = i.width, u.height = i.height;
    }
    function vt() {
      const B = l.refs.window.getBoundingClientRect();
      i.top = B.top, i.left = B.left, i.width = u.width, i.height = u.height, i.splitPosition = m.NONE;
    }
    function Tt(a) {
      a.stopPropagation();
    }
    const zt = It(() => t.visible, () => {
      t.visible || ht();
    });
    Yt(c, w), $(() => {
      e("beforeUnmount"), H(), K(c);
    }), yt(() => {
      e("unmount"), zt(), s.value = _.UNMOUNTED;
    }), Lt(V, w), n(w);
    function X() {
      const a = [];
      return t.mask !== !0 && (a.push(f("button", {
        onClick: _t,
        type: "button",
        innerHTML: ct,
        class: r.menu,
        title: "向左分割"
      }, null)), a.push(f("button", {
        onClick: mt,
        type: "button",
        innerHTML: ut,
        class: r.menu,
        title: "向右分割"
      }, null)), a.push(f("button", {
        onClick: pt,
        type: "button",
        innerHTML: lt,
        class: i.pinned ? r.pinMenu : r.menu,
        title: "固定"
      }, null))), p.value && a.push(f("button", {
        onClick: gt,
        type: "button",
        innerHTML: ot,
        class: r.menu,
        title: "最大化"
      }, null)), t.closeable && a.push(f("button", {
        onClick: H,
        type: "button",
        innerHTML: it,
        class: r.closeMenu,
        title: "关闭"
      }, null)), a.length == 0 ? null : f("div", {
        class: r.menus,
        onMousedown: wt
      }, [a]);
    }
    return function() {
      if (!t.visible)
        return null;
      const a = typeof o.header == "function" ? o.header(X()) : null, B = f("div", {
        class: r.main,
        onMousedown: T == null ? void 0 : T.dragStart
      }, [a, f("div", {
        class: r.body,
        onClick: Tt
      }, [f(Oe, {
        body: t.body,
        key: c.wid
      }, null)])]), b = {
        ref: "window",
        id: t.id ?? c.wid,
        onVnodeMounted: ft,
        onMousedownCapture: Y,
        class: at.value,
        style: dt.value
      };
      let M = k("div", b, [B, y]);
      if (t.mask === !0) {
        const bt = {
          zIndex: U.value
        };
        M = f("div", {
          class: r.mask,
          style: bt
        }, [M]);
      }
      return t.appendToBody ? f(Et, {
        to: "body"
      }, Se(M) ? M : {
        default: () => [M]
      }) : M;
    };
  }
});
function ye(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !x(t);
}
const W = /* @__PURE__ */ I({
  name: "SimpleWindow",
  props: {
    ...R
  },
  setup(t, {
    slots: e,
    attrs: n
  }) {
    const {
      uid: o,
      ...c
    } = n, l = v.create(n.uid), s = {
      header(i) {
        return f("div", {
          class: r.header
        }, [f("i", {
          class: r.logo,
          innerHTML: st
        }, null), f("div", {
          class: r.title
        }, [t.title ?? "新窗口"]), i]);
      }
    };
    return function() {
      const i = {
        ...t,
        ...c,
        uid: l,
        body: e.default
      };
      return f(rt, i, ye(s) ? s : {
        default: () => [s]
      });
    };
  }
});
function Le(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !x(t);
}
const j = /* @__PURE__ */ I({
  name: "BlankWindow",
  props: {
    ...R
  },
  setup(t, {
    slots: e,
    attrs: n
  }) {
    const {
      body: o,
      ...c
    } = e, {
      uid: l,
      ...s
    } = n, i = v.create(n.uid);
    return function() {
      const u = {
        ...t,
        ...s,
        uid: i,
        body: e.default
      };
      return f(rt, u, Le(c) ? c : {
        default: () => [c]
      });
    };
  }
}), A = /* @__PURE__ */ I({
  name: "WindowManager",
  setup() {
    const t = Dt();
    function e(o) {
      o.key == "Escape" && Q();
    }
    xt(), window.addEventListener("keydown", e, !0), $(() => {
      Vt(), window.removeEventListener("keydown", e, !0);
    });
    function n(o) {
      return o == j.name ? j : W;
    }
    return function() {
      return t.value.map((o) => {
        const c = Ft(o);
        if (c == null)
          return;
        const l = n(c.type);
        return k(l, c.buildProps());
      });
    };
  }
});
function Ee(t) {
  if (t.length == 1) {
    const e = t[0];
    return e == null ? null : typeof e == "object" ? e : null;
  }
  if (t.length == 2) {
    const [e, n] = t;
    if (typeof e == "string" && n != null)
      return { title: e, body: n };
  }
  return null;
}
function Re(...t) {
  const e = Ee(t);
  return e == null ? (console.error("[xWindow]: 参数有误"), null) : je(e);
}
function je(t) {
  if (!Rt())
    return console.error("[xWindow] 需要先创建`WindowManager`组件，见文档 " + jt + " 。"), null;
  const { displayAfterCreate: e, unmountAfterClose: n, afterUnmount: o, ...c } = t, l = {
    uid: null,
    visible: Z(e !== !1),
    isUnmounted: !1
  }, s = () => l.visible.value = !0, i = () => {
    l.visible.value = !1, n !== !1 && u();
  }, u = () => {
    l.visible.value && i(), K(l.uid), N(nt);
  }, p = Object.assign({}, c, {
    visible: l.visible,
    [Nt](w) {
      w ? s() : i();
    },
    [Wt]() {
      l.isUnmounted = !0;
    },
    [Ct]() {
      typeof o == "function" && o();
    }
  });
  return l.uid = Xt(E.create(p)), {
    uid: l.uid,
    get isUnmounted() {
      return l.isUnmounted;
    },
    get visible() {
      return l.visible.value;
    },
    show: s,
    close: i,
    unmount: u
  };
}
function He(t, e) {
  t.component(W.name, W), t.component(j.name, j), t.component(A.name, A), Pt(e);
}
const Ne = Ht, Ue = { install: He, version: Ne };
export {
  _ as ComponentStates,
  W as SimpleWindow,
  A as WindowManager,
  Ue as default,
  He as install,
  Ve as useIcons,
  Re as useWindow,
  ke as useWindowManager,
  xe as useWindowProxy,
  Ne as version,
  Ue as xWindow
};
