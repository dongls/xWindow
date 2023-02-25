var lt = Object.defineProperty;
var ct = (t, e, i) => e in t ? lt(t, e, { enumerable: !0, configurable: !0, writable: !0, value: i }) : t[e] = i;
var T = (t, e, i) => (ct(t, typeof e != "symbol" ? e + "" : e, i), i);
import { shallowRef as ut, getCurrentInstance as I, h as H, createVNode as h, defineComponent as L, ref as F, reactive as rt, computed as B, onBeforeUnmount as Y, provide as at, Teleport as dt, isVNode as k, inject as ft, nextTick as E } from "vue";
const u = {
  isMounted: !1,
  zIndex: 1e3,
  stack: /* @__PURE__ */ new Map(),
  ghost: ut([]),
  options: /* @__PURE__ */ new Map(),
  topWindow: null
};
function ht() {
  u.isMounted = !0;
}
function wt() {
  u.isMounted = !1, u.topWindow = null, u.ghost.value = [], u.stack.clear(), u.options.clear();
}
function gt() {
  return u.isMounted;
}
function X() {
  return u.zIndex;
}
function U() {
  return u.zIndex += 1;
}
function pt(t) {
  typeof t == "number" && Number.isFinite(t) && (u.zIndex = Math.floor(t));
}
function mt(t, e) {
  u.stack.set(t, e);
}
function G(t) {
  u.stack.delete(t), u.options.delete(t);
  const e = u.ghost.value.indexOf(t);
  e >= 0 && u.ghost.value.splice(e, 1);
}
function D() {
  u.stack.size == 0 || u.topWindow == null || u.topWindow.close();
}
function _t(t) {
  return u.options.get(t);
}
function vt(t) {
  const e = u.ghost.value;
  return e.push(t.uid), u.ghost.value = e.slice(), u.options.set(t.uid, t), t.uid;
}
function Tt(t) {
  return u.stack.get(t);
}
function zt() {
  return u.ghost;
}
function j(t) {
  if (u.topWindow = t, t == null)
    return;
  for (const i of u.stack.values()) {
    const o = i.windowState;
    o.focused = i === t;
  }
  const e = t.windowState;
  e.zIndex < X() && (e.zIndex = U());
}
function A(t) {
  const e = u.stack.get(t);
  j(e);
}
function P() {
  const t = bt();
  j(t);
}
function bt() {
  return u.stack.size == 0 ? null : Array.from(u.stack.values()).filter((e) => e.visible).sort((e, i) => {
    const o = e.windowState;
    return i.windowState.zIndex - o.zIndex;
  })[0];
}
function _e() {
  return {
    closeTopWindow: D,
    getTopZIndex: U,
    getWindowProxy: Tt,
    getZIndex: X,
    setFocusedWindow: A
  };
}
function yt(t) {
  pt(t == null ? void 0 : t.zIndex);
}
const Mt = "https://github.com/dongls/xWindow", Ot = "0.0.1", Lt = "onUpdate:visible", St = "onBeforeUnmount", Z = Symbol(), p = Object.freeze({
  INIT: 0,
  LAYOUT: 1,
  MOUNTED: 2,
  UNMOUNTED: 3
});
var f = /* @__PURE__ */ ((t) => (t[t.TOP = 0] = "TOP", t[t.BOTTOM = 1] = "BOTTOM", t[t.LEFT = 2] = "LEFT", t[t.RIGHT = 3] = "RIGHT", t[t.LEFT_TOP = 4] = "LEFT_TOP", t[t.LEFT_BOTTOM = 5] = "LEFT_BOTTOM", t[t.RIGHT_TOP = 6] = "RIGHT_TOP", t[t.RIGHT_BOTTOM = 7] = "RIGHT_BOTTOM", t))(f || {});
const q = {
  title: String,
  id: String,
  visible: {
    type: Boolean,
    default: !1
  },
  width: {
    type: String,
    default: "640px"
  },
  appendToBody: {
    type: Boolean,
    default: !0
  },
  draggable: {
    type: Boolean,
    default: !0
  },
  resizable: {
    type: Boolean,
    default: !0
  },
  closeable: {
    type: Boolean,
    default: !0
  }
}, m = Object.freeze({
  NONE: "none",
  LEFT: "left",
  RIGHT: "right"
});
let Bt = 1e3;
class z {
  /** 统一使用`UID.create`方法创建 */
  constructor() {
    T(this, "value");
    this.value = Bt++;
  }
  get wid() {
    return "window--" + this.value;
  }
  static create(e) {
    return e instanceof z ? e : Object.freeze(new z());
  }
}
class O {
  constructor(e) {
    T(this, "uid");
    T(this, "type");
    T(this, "visible");
    T(this, "others");
    T(this, "body");
    const { visible: i, body: o, ...l } = e;
    this.uid = z.create(), this.visible = i, this.body = o, this.others = l;
  }
  static create(e) {
    return e instanceof O ? e : new O(e);
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
const Et = "_window_9myun_9", It = "_dragging_9myun_18", Ht = "_resizing_9myun_18", Nt = "_fullscreen_9myun_22", Wt = "_focused_9myun_32", Ct = "_main_9myun_36", Vt = "_init_9myun_43", xt = "_layout_9myun_53", Rt = "_header_9myun_61", Ft = "_title_9myun_71", Yt = "_menus_9myun_81", kt = "_body_9myun_87", Xt = "_footer_9myun_93", Ut = "_menu_9myun_81", Gt = "_closeMenu_9myun_123 _menu_9myun_81", Dt = "_pinMenu_9myun_131 _menu_9myun_81", jt = "_logo_9myun_139", At = "_resize_9myun_149", Pt = "_resizeBar_9myun_153", Zt = "_resizeTop_9myun_158 _resizeBar_9myun_153", qt = "_resizeBottom_9myun_159 _resizeBar_9myun_153", Jt = "_resizeRight_9myun_175 _resizeBar_9myun_153", $t = "_resizeLeft_9myun_176 _resizeBar_9myun_153", Kt = "_resizeLeftTop_9myun_192 _resizeBar_9myun_153", Qt = "_resizeLeftBottom_9myun_193 _resizeBar_9myun_153", te = "_resizeRightTop_9myun_194 _resizeBar_9myun_153", ee = "_resizeRightBottom_9myun_195 _resizeBar_9myun_153", c = {
  window: Et,
  dragging: It,
  resizing: Ht,
  fullscreen: Nt,
  focused: Wt,
  main: Ct,
  init: Vt,
  layout: xt,
  header: Rt,
  title: Ft,
  menus: Yt,
  body: kt,
  footer: Xt,
  menu: Ut,
  closeMenu: Gt,
  pinMenu: Dt,
  logo: jt,
  resize: At,
  resizeBar: Pt,
  resizeTop: Zt,
  resizeBottom: qt,
  resizeRight: Jt,
  resizeLeft: $t,
  resizeLeftTop: Kt,
  resizeLeftBottom: Qt,
  resizeRightTop: te,
  resizeRightBottom: ee
}, ne = '<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M590.265 511.987l305.521-305.468c21.617-21.589 21.617-56.636.027-78.252-21.616-21.617-56.663-21.617-78.279 0L512.012 433.735 206.544 128.213c-21.617-21.617-56.635-21.617-78.252 0-21.616 21.589-21.616 56.635-.027 78.252L433.76 511.987 128.211 817.482c-21.617 21.59-21.617 56.635 0 78.251 10.808 10.81 24.967 16.213 39.125 16.213 14.159 0 28.318-5.403 39.126-16.213l305.522-305.468L817.48 895.788C828.289 906.597 842.447 912 856.606 912s28.317-5.403 39.125-16.212c21.618-21.59 21.618-56.636.028-78.252L590.265 511.987z"/></svg>', ie = '<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M928.7 135.8H99.8c-21.15 0-37.8 17.55-37.8 35.1v685.35c0 17.55 17.1 31.5 37.8 31.5h828.45c21.15 0 33.3-14.4 33.3-31.5v-684.9c.45-17.55-12.15-35.55-32.85-35.55zm-53.1 666.9H147.5V222.2h728.1v580.5z"/></svg>', oe = '<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M38.794 124.791v778.495h946.412V124.791H38.794zm896.678 728.033H89.292v-460.9h846.18v460.9z"/></svg>', se = '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M738.793 681.382v-48.331l88.242-88.243a298.676 298.676 0 00156.712-83.482 38.836 38.836 0 000-54.923l-366.15-366.15a38.836 38.836 0 00-54.923 0 298.52 298.52 0 00-83.519 156.749l-88.169 88.169h-48.332a411.145 411.145 0 00-292.59 121.232c-15.16 15.159-15.16 39.764 0 54.923L278.906 690.17 86.642 882.436a38.836 38.836 0 1054.922 54.922l192.23-192.229 228.844 228.845a38.836 38.836 0 0054.922 0 411.042 411.042 0 00121.233-292.592zM134.02 435.44a333.473 333.473 0 01208.56-72.571l64.406.037a38.836 38.836 0 0027.461-11.351L544.292 241.71a38.68 38.68 0 0011.351-27.462 180.096 180.096 0 0136.798-89.01L898.8 431.593a180.925 180.925 0 01-89.12 36.835 38.836 38.836 0 00-27.462 11.35L672.373 589.626c-7.287 7.286-11.387 17.173-11.35 27.461l.036 64.406a333.318 333.318 0 01-72.608 208.596L134.021 435.44z"/></svg>', le = '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M958 967.127h-63.69a9.094 9.094 0 01-9.127-9.126V894.31a9.116 9.116 0 019.127-9.127H958a9.116 9.116 0 019.127 9.127V958a9.094 9.094 0 01-9.126 9.127zm-164.826 0h-64.727a9.094 9.094 0 01-9.127-9.126V894.31a9.116 9.116 0 019.127-9.127h64.727c5.016 0 9.061 4.078 9.061 9.127V958a9.094 9.094 0 01-9.061 9.127zm-165.895 0h-64.727a9.094 9.094 0 01-9.062-9.126V894.31c0-5.05 4.045-9.127 9.062-9.127h64.727a9.116 9.116 0 019.126 9.127V958a9.094 9.094 0 01-9.126 9.127zm165.895-828.31h-64.727a9.094 9.094 0 01-9.127-9.127V66.032a9.116 9.116 0 019.127-9.127h64.727c5.016 0 9.061 4.078 9.061 9.127v63.69a9.094 9.094 0 01-9.061 9.127zm-165.895 0h-64.727a9.094 9.094 0 01-9.062-9.127V66.032c0-5.05 4.045-9.127 9.062-9.127h64.727a9.116 9.116 0 019.126 9.127v63.69a9.094 9.094 0 01-9.126 9.127zm330.722 0H894.31a9.094 9.094 0 01-9.127-9.127V66.032a9.116 9.116 0 019.127-9.127H958a9.116 9.116 0 019.127 9.127v63.69a9.094 9.094 0 01-9.126 9.127zm0 663.45H894.31a9.094 9.094 0 01-9.127-9.126v-64.727c0-5.016 4.078-9.061 9.127-9.061H958c5.05 0 9.127 4.045 9.127 9.061v64.727a9.094 9.094 0 01-9.126 9.127zm0-165.862H894.31a9.094 9.094 0 01-9.127-9.126v-64.727c0-5.017 4.078-9.062 9.127-9.062H958c5.05 0 9.127 4.045 9.127 9.062v64.727a9.094 9.094 0 01-9.126 9.126zm0-165.863H894.31a9.094 9.094 0 01-9.127-9.094v-64.727a9.116 9.116 0 019.127-9.126H958a9.116 9.116 0 019.127 9.126v64.727a9.094 9.094 0 01-9.126 9.062zm0-165.862H894.31a9.094 9.094 0 01-9.127-9.094v-64.727a9.116 9.116 0 019.127-9.127H958c5.05 0 9.127 4.078 9.127 9.094v64.727a9.094 9.094 0 01-9.126 9.127zM443.713 967.127H93.314a36.409 36.409 0 01-36.409-36.441V93.314c0-20.065 16.311-36.409 36.441-36.409h350.367c20.065 0 36.409 16.311 36.409 36.441v837.405c0 20.065-16.311 36.409-36.409 36.409zm-295.802-81.976h241.205a9.094 9.094 0 009.094-9.094V147.91a9.094 9.094 0 00-9.062-9.094H147.911a9.094 9.094 0 00-9.094 9.094V876.09c0 5.016 4.078 9.094 9.094 9.094z"/></svg>', ce = '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M66 56.905h63.69c5.05 0 9.127 4.046 9.127 9.062v63.756a9.094 9.094 0 01-9.127 9.062H66.032a9.094 9.094 0 01-9.127-9.062V65.967c0-5.016 4.078-9.062 9.127-9.062zm164.859 0h64.727a9.047 9.047 0 019.061 9.062v63.756a9.094 9.094 0 01-9.061 9.062h-64.727a9.094 9.094 0 01-9.127-9.062V65.967c0-5.016 4.078-9.062 9.127-9.062zm165.862 0h64.727a9.047 9.047 0 019.062 9.062v63.756a9.094 9.094 0 01-9.062 9.062h-64.727a9.094 9.094 0 01-9.126-9.062V65.967c0-5.016 4.078-9.062 9.126-9.062zM230.86 885.183h64.727c5.016 0 9.061 4.078 9.061 9.127V958a9.094 9.094 0 01-9.061 9.127H230.86a9.094 9.094 0 01-9.127-9.126V894.31a9.116 9.116 0 019.127-9.127zm165.862 0h64.727c5.017 0 9.062 4.078 9.062 9.127V958a9.094 9.094 0 01-9.062 9.127h-64.727a9.094 9.094 0 01-9.126-9.126V894.31a9.116 9.116 0 019.126-9.127zm-330.722 0h63.691a9.116 9.116 0 019.127 9.127V958a9.094 9.094 0 01-9.127 9.127H66.032a9.094 9.094 0 01-9.127-9.126V894.31a9.116 9.116 0 019.127-9.127zm0-663.45h63.691a9.116 9.116 0 019.127 9.126v64.727a9.094 9.094 0 01-9.127 9.061H66.032a9.094 9.094 0 01-9.127-9.061v-64.727a9.116 9.116 0 019.127-9.127zm0 165.862h63.691a9.116 9.116 0 019.127 9.126v64.727a9.094 9.094 0 01-9.127 9.062H66.032a9.094 9.094 0 01-9.127-9.062v-64.727a9.116 9.116 0 019.127-9.126zm0 165.863h63.691c5.05 0 9.127 4.077 9.127 9.094v64.727a9.094 9.094 0 01-9.127 9.126H66.032a9.094 9.094 0 01-9.127-9.126v-64.727c0-5.017 4.078-9.062 9.127-9.062zm0 165.862h63.691c5.05 0 9.127 4.078 9.127 9.094v64.727a9.094 9.094 0 01-9.127 9.127H66.032a9.094 9.094 0 01-9.127-9.127v-64.727c0-5.016 4.078-9.061 9.127-9.061zM580.287 56.905h350.431c20.066 0 36.41 16.279 36.41 36.377v837.404c0 20.13-16.312 36.409-36.442 36.409h-350.4a36.409 36.409 0 01-36.408-36.377V93.314c0-20.13 16.311-36.409 36.409-36.409zm295.802 81.88H634.884a9.094 9.094 0 00-9.094 9.126V876.09c0 5.016 4.078 9.094 9.062 9.094h241.237a9.094 9.094 0 009.094-9.094V147.91a9.094 9.094 0 00-9.094-9.094z"/></svg>';
function g(t, e, i) {
  return e != null && Number.isFinite(e) && t < e ? e : i != null && Number.isFinite(i) && t > i ? i : t;
}
const C = "__xWindow_resize_prop__";
function V(t, e, i) {
  const o = e.getBoundingClientRect(), l = document.documentElement.getBoundingClientRect();
  if (i.direction == f.TOP) {
    const s = t.clientY - l.top;
    return {
      height: g(o.bottom - t.clientY, 30),
      top: s
    };
  }
  if (i.direction == f.BOTTOM) {
    const s = g(t.clientY - o.top, 30), n = t.clientY - s - l.top;
    return {
      height: s,
      top: n
    };
  }
  if (i.direction == f.LEFT) {
    const s = g(o.right - t.clientX, 160), n = t.clientX - l.left;
    return {
      width: s,
      left: n
    };
  }
  if (i.direction == f.RIGHT) {
    const s = g(t.clientX - o.left, 160), n = t.clientX - s - l.left;
    return {
      width: s,
      left: n
    };
  }
  if (i.direction == f.LEFT_TOP) {
    const s = t.clientY - l.top, n = t.clientX - l.left, d = g(o.right - t.clientX, 160), a = g(o.bottom - t.clientY, 30);
    return {
      top: s,
      left: n,
      width: d,
      height: a
    };
  }
  if (i.direction == f.LEFT_BOTTOM) {
    const s = g(t.clientY - o.top, 30), n = g(o.right - t.clientX, 160), d = t.clientY - s - l.top, a = t.clientX - l.left;
    return {
      top: d,
      left: a,
      width: n,
      height: s
    };
  }
  if (i.direction == f.RIGHT_TOP) {
    const s = g(t.clientX - o.left, 160), n = g(o.bottom - t.clientY, 30), d = t.clientY - l.top, a = t.clientX - s - l.left;
    return {
      top: d,
      left: a,
      width: s,
      height: n
    };
  }
  if (i.direction == f.RIGHT_BOTTOM) {
    const s = g(t.clientY - o.top, 30), n = g(t.clientX - o.left, 160), d = t.clientY - s - l.top, a = t.clientX - n - l.left;
    return {
      top: d,
      left: a,
      width: n,
      height: s
    };
  }
  return null;
}
function ue(t) {
  const e = I(), i = [[c.resizeTop, f.TOP], [c.resizeBottom, f.BOTTOM], [c.resizeLeft, f.LEFT], [c.resizeRight, f.RIGHT], [c.resizeLeftTop, f.LEFT_TOP], [c.resizeLeftBottom, f.LEFT_BOTTOM], [c.resizeRightTop, f.RIGHT_TOP], [c.resizeRightBottom, f.RIGHT_BOTTOM]], o = {
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
    const _ = V(a, w, o);
    if (_ != null)
      for (const b in _) {
        const M = Math.round(_[b]);
        Reflect.set(o, b, M), Reflect.set(w.style, b, M + "px");
      }
  }
  function n(a) {
    if (a.preventDefault(), o.init) {
      const w = e == null ? void 0 : e.refs.window;
      V(a, w, o) != null && (t.windowState.top = o.top, t.windowState.left = o.left, t.windowState.width = o.width, t.windowState.height = o.height), w.classList.remove(c.resizing);
    }
    window.removeEventListener("mousemove", s), window.removeEventListener("mouseup", n);
  }
  const d = i.map((a) => H("div", {
    className: a[0],
    ["." + C]: a[1]
  }));
  return h("div", {
    class: c.resize,
    onMousedown: l
  }, [d]);
}
function re(t) {
  const e = I(), i = {
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
function ae(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !k(t);
}
const de = Math.floor(Number.MAX_SAFE_INTEGER / 1e3);
function fe() {
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
const he = /* @__PURE__ */ L({
  name: "WindowBody",
  props: {
    body: {
      type: [Function, Object],
      default: null
    }
  },
  setup(t) {
    const e = ft(Z);
    return function() {
      return k(t.body) ? t.body : typeof t.body == "function" ? t.body(e) : null;
    };
  }
}), J = /* @__PURE__ */ L({
  name: "BaseWindow",
  props: {
    ...q,
    uid: {
      type: z,
      required: !0
    },
    body: {
      type: [Function, Object],
      default: null
    }
  },
  emits: ["update:visible", "beforeUnmount"],
  setup(t, {
    emit: e,
    expose: i
  }) {
    const o = z.create(t.uid), l = I(), s = F(p.INIT), n = rt(fe()), d = {
      width: 0,
      height: 0
    }, a = B(() => t.draggable && t.resizable), w = {
      get uid() {
        return o;
      },
      get visible() {
        return t.visible;
      },
      get windowState() {
        return n;
      },
      exitSplitMode: ot,
      close: S
    }, _ = t.draggable ? re(w) : null, b = a.value ? ue(w) : null, M = B(() => {
      const r = [c.window];
      return s.value == p.INIT && r.push(c.init), s.value == p.LAYOUT && r.push(c.layout), n.fullscreen && r.push(c.fullscreen), n.focused && r.push(c.focused), r;
    }), $ = B(() => {
      if (s.value == p.INIT)
        return {
          width: t.width
        };
      const r = (n.pinned ? de : 0) + n.zIndex;
      return n.splitPosition === m.LEFT || n.splitPosition === m.RIGHT ? {
        top: 0,
        left: n.splitPosition == m.RIGHT ? "50vw" : 0,
        width: "50vw",
        height: "100vh",
        zIndex: r
      } : {
        top: n.top + "px",
        left: n.left + "px",
        width: n.width + "px",
        height: s.value == p.INIT ? null : n.height + "px",
        zIndex: r
      };
    });
    async function K(r) {
      await E();
      const v = r.el.getBoundingClientRect();
      s.value == p.INIT && (n.width = v.width, n.height = v.height, n.left = (window.innerWidth - v.width) / 2, n.top = window.innerHeight * 0.15, s.value = p.LAYOUT, setTimeout(() => s.value = p.MOUNTED, 0)), N();
    }
    function S(r) {
      t.closeable && (r == null || r.stopPropagation(), n.focused = !1, e("update:visible", !1), E(P));
    }
    function Q(r) {
      r.stopPropagation();
    }
    function N() {
      n.focused || A(o);
    }
    function tt() {
      n.fullscreen = !n.fullscreen;
    }
    function et() {
      n.pinned = !n.pinned;
    }
    function nt() {
      W(), n.splitPosition = m.LEFT;
    }
    function it() {
      W(), n.splitPosition = m.RIGHT;
    }
    function W() {
      d.width = n.width, d.height = n.height;
    }
    function ot() {
      const y = l.refs.window.getBoundingClientRect();
      n.top = y.top, n.left = y.left, n.width = d.width, n.height = d.height, n.splitPosition = m.NONE;
    }
    mt(o, w), Y(() => {
      e("beforeUnmount"), S(), G(o), s.value = p.UNMOUNTED;
    }), at(Z, w), i(w);
    function st() {
      const r = [];
      return r.push(h("button", {
        onClick: nt,
        type: "button",
        innerHTML: le,
        class: c.menu,
        title: "向左分割"
      }, null)), r.push(h("button", {
        onClick: it,
        type: "button",
        innerHTML: ce,
        class: c.menu,
        title: "向右分割"
      }, null)), r.push(h("button", {
        onClick: et,
        type: "button",
        innerHTML: se,
        class: n.pinned ? c.pinMenu : c.menu,
        title: "固定"
      }, null)), a.value && r.push(h("button", {
        onClick: tt,
        type: "button",
        innerHTML: ie,
        class: c.menu,
        title: "最大化"
      }, null)), t.closeable && r.push(h("button", {
        onClick: S,
        type: "button",
        innerHTML: ne,
        class: c.closeMenu,
        title: "关闭"
      }, null)), r.length == 0 ? null : h("div", {
        class: c.menus,
        onMousedown: Q
      }, [r]);
    }
    return function() {
      if (!t.visible)
        return null;
      const r = h("div", {
        class: c.main
      }, [h("div", {
        class: c.header,
        onMousedown: _ == null ? void 0 : _.dragStart
      }, [h("i", {
        class: c.logo,
        innerHTML: oe
      }, null), h("div", {
        class: c.title
      }, [t.title ?? "新窗口"]), st()]), h("div", {
        class: c.body
      }, [h(he, {
        body: t.body,
        key: o.wid
      }, null)])]), y = {
        ref: "window",
        id: t.id ?? o.wid,
        onVnodeMounted: K,
        onMousedownCapture: N,
        class: M.value,
        style: $.value
      }, v = H("div", y, [r, b]);
      return t.appendToBody ? h(dt, {
        to: "body"
      }, ae(v) ? v : {
        default: () => [v]
      }) : v;
    };
  }
}), x = /* @__PURE__ */ L({
  name: "SimpleWindow",
  props: {
    ...q
  },
  setup(t, {
    slots: e,
    attrs: i
  }) {
    const o = z.create();
    return function() {
      const l = {
        ...t,
        ...i,
        uid: o,
        body: e.default
      };
      return h(J, l, null);
    };
  }
}), R = /* @__PURE__ */ L({
  name: "WindowManager",
  setup() {
    const t = zt();
    function e(i) {
      i.key == "Escape" && D();
    }
    return ht(), window.addEventListener("keydown", e, !0), Y(() => {
      wt(), window.removeEventListener("keydown", e, !0);
    }), function() {
      return t.value.map((i) => {
        const o = _t(i);
        if (o != null)
          return H(J, o.buildProps());
      });
    };
  }
});
function ve(t) {
  if (!gt())
    throw new Error("[xWindow] 需要先创建`WindowManager`组件，见文档 " + Mt + " 。");
  const { displayAfterCreate: e, unmountAfterClose: i, ...o } = t, l = {
    uid: null,
    visible: F(e !== !1),
    isUnmounted: !1
  }, s = () => l.visible.value = !0, n = () => {
    l.visible.value = !1, i !== !1 && d();
  }, d = () => {
    l.visible.value && n(), G(l.uid), E(P);
  }, a = Object.assign({}, o, {
    visible: l.visible,
    [Lt](w) {
      w ? s() : n();
    },
    [St]() {
      l.isUnmounted = !0;
    }
  });
  return l.uid = vt(O.create(a)), {
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
function we(t, e) {
  t.component(x.name, x), t.component(R.name, R), yt(e);
}
const ge = Ot, Te = { install: we, version: ge };
export {
  p as ComponentStates,
  x as SimpleWindow,
  R as WindowManager,
  Te as default,
  we as install,
  ve as useWindow,
  _e as useWindowManager,
  ge as version,
  Te as xWindow
};
