/*! @dongls/xWindow v0.0.5 https://github.com/dongls/xWindow
Copyright 2023-present dongls
Released under the MIT License */
var yt = Object.defineProperty;
var Ht = (t, e, n) => e in t ? yt(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var I = (t, e, n) => (Ht(t, typeof e != "symbol" ? e + "" : e, n), n);
import { shallowRef as Nt, inject as Q, getCurrentInstance as F, h as G, createVNode as f, defineComponent as E, ref as C, reactive as Wt, computed as y, watch as xt, onBeforeUnmount as tt, onUnmounted as Rt, provide as Ct, Teleport as et, isVNode as U, nextTick as k } from "vue";
const kt = "https://github.com/dongls/xWindow", Vt = "0.0.5", Ft = "onUpdate:visible", Gt = "onBeforeUnmount", Ut = "onUnmount", X = Symbol(), M = Object.freeze({
  INIT: 0,
  MOUNTED: 1,
  UNMOUNTED: 2
});
var h = /* @__PURE__ */ ((t) => (t[t.TOP = 0] = "TOP", t[t.BOTTOM = 1] = "BOTTOM", t[t.LEFT = 2] = "LEFT", t[t.RIGHT = 3] = "RIGHT", t[t.LEFT_TOP = 4] = "LEFT_TOP", t[t.LEFT_BOTTOM = 5] = "LEFT_BOTTOM", t[t.RIGHT_TOP = 6] = "RIGHT_TOP", t[t.RIGHT_BOTTOM = 7] = "RIGHT_BOTTOM", t))(h || {});
const Y = {
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
  /** 窗口的固定层级, 参照`CSS`的`zIndex`语法 */
  zIndex: {
    type: Number,
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
}, T = Object.freeze({
  NONE: "none",
  LEFT: "left",
  RIGHT: "right"
}), p = Object.freeze({
  NULL: 0,
  TOP: 1,
  RIGHT: 1 << 1,
  BOTTOM: 1 << 2,
  LEFT: 1 << 3
});
Object.freeze({
  TOP: p.TOP,
  LEFT: p.LEFT,
  RIGHT: p.RIGHT,
  TOP_LEFT: p.TOP | p.LEFT,
  TOP_RIGHT: p.TOP | p.RIGHT,
  BOTTOM_LEFT: p.BOTTOM | p.LEFT,
  BOTTOM_RIGHT: p.BOTTOM | p.RIGHT
});
let Xt = 1e3;
class m {
  /** 统一使用`UID.create`方法创建 */
  constructor() {
    I(this, "value");
    this.value = Xt++;
  }
  get wid() {
    return "window--" + this.value;
  }
  static create(e) {
    return e instanceof m ? e : Object.freeze(new m());
  }
}
class H {
  constructor(e) {
    I(this, "uid");
    I(this, "type");
    I(this, "visible");
    I(this, "others");
    I(this, "body");
    const { visible: n, body: o, type: u, ...l } = e;
    this.uid = m.create(), this.type = u, this.visible = n, this.body = o, this.others = l;
  }
  static create(e) {
    return e instanceof H ? e : new H(e);
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
  ghost: Nt([]),
  options: /* @__PURE__ */ new Map(),
  topWindow: null
};
function Yt() {
  d.isMounted = !0;
}
function jt() {
  d.isMounted = !1, d.topWindow = null, d.ghost.value = [], d.stack.clear(), d.options.clear();
}
function Dt() {
  return d.isMounted;
}
function nt() {
  return d.zIndex;
}
function it() {
  return d.zIndex += 1;
}
function Pt(t) {
  typeof t == "number" && Number.isFinite(t) && (d.zIndex = Math.floor(t));
}
function At(t, e) {
  d.stack.set(t, e);
}
function ot(t) {
  d.stack.delete(t), d.options.delete(t);
  const e = d.ghost.value.indexOf(t);
  if (e >= 0) {
    const n = d.ghost.value;
    n.splice(e, 1), d.ghost.value = n.slice();
  }
}
function st() {
  d.stack.size == 0 || d.topWindow == null || d.topWindow.close();
}
function Zt(t) {
  return d.options.get(t);
}
function $t(t) {
  const e = d.ghost.value;
  return e.push(t.uid), d.ghost.value = e.slice(), d.options.set(t.uid, t), t.uid;
}
function qt(t) {
  return d.stack.get(t);
}
function lt() {
  return d.ghost;
}
function ut(t) {
  if (d.topWindow = t, t != null) {
    for (const e of d.stack.values()) {
      const n = e.windowState;
      n.focused = e === t;
    }
    t.zIndex < nt() && (t.zIndex = it());
  }
}
function ct(t) {
  const e = d.stack.get(t);
  ut(e);
}
function rt() {
  const t = Jt();
  ut(t);
}
function Jt() {
  return d.stack.size == 0 ? null : Array.from(d.stack.values()).filter((e) => e.visible).sort((e, n) => n.zIndex - e.zIndex)[0];
}
function Xe() {
  return {
    closeTopWindow: st,
    getTopZIndex: it,
    getWindowProxy: qt,
    getZIndex: nt,
    setFocusedWindow: ct
  };
}
function Kt(t) {
  Pt(t == null ? void 0 : t.zIndex);
}
function Ye() {
  return Q(X);
}
const Qt = "_window_d2gsu_7", te = "_dragging_d2gsu_17", ee = "_resizing_d2gsu_17", ne = "_fullscreen_d2gsu_21", ie = "_focused_d2gsu_31", oe = "_header_d2gsu_34", se = "_main_d2gsu_38", le = "_init_d2gsu_45", ue = "_title_d2gsu_63", ce = "_menus_d2gsu_73", re = "_body_d2gsu_79", de = "_footer_d2gsu_84", ae = "_menu_d2gsu_73", fe = "_closeMenu_d2gsu_135 _menu_d2gsu_73", he = "_pinMenu_d2gsu_146 _menu_d2gsu_73", ge = "_logo_d2gsu_153", we = "_resize_d2gsu_165", pe = "_resizeBar_d2gsu_169", _e = "_resizeTop_d2gsu_174 _resizeBar_d2gsu_169", Te = "_resizeBottom_d2gsu_175 _resizeBar_d2gsu_169", me = "_resizeRight_d2gsu_191 _resizeBar_d2gsu_169", ve = "_resizeLeft_d2gsu_192 _resizeBar_d2gsu_169", ze = "_resizeLeftTop_d2gsu_208 _resizeBar_d2gsu_169", be = "_resizeLeftBottom_d2gsu_209 _resizeBar_d2gsu_169", Oe = "_resizeRightTop_d2gsu_210 _resizeBar_d2gsu_169", Ie = "_resizeRightBottom_d2gsu_211 _resizeBar_d2gsu_169", Me = "_mask_d2gsu_241", r = {
  window: Qt,
  dragging: te,
  resizing: ee,
  fullscreen: ne,
  focused: ie,
  header: oe,
  main: se,
  init: le,
  title: ue,
  menus: ce,
  body: re,
  footer: de,
  menu: ae,
  closeMenu: fe,
  pinMenu: he,
  logo: ge,
  resize: we,
  resizeBar: pe,
  resizeTop: _e,
  resizeBottom: Te,
  resizeRight: me,
  resizeLeft: ve,
  resizeLeftTop: ze,
  resizeLeftBottom: be,
  resizeRightTop: Oe,
  resizeRightBottom: Ie,
  mask: Me
}, dt = '<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M590.265 511.987l305.521-305.468c21.617-21.589 21.617-56.636.027-78.252-21.616-21.617-56.663-21.617-78.279 0L512.012 433.735 206.544 128.213c-21.617-21.617-56.635-21.617-78.252 0-21.616 21.589-21.616 56.635-.027 78.252L433.76 511.987 128.211 817.482c-21.617 21.59-21.617 56.635 0 78.251 10.808 10.81 24.967 16.213 39.125 16.213 14.159 0 28.318-5.403 39.126-16.213l305.522-305.468L817.48 895.788C828.289 906.597 842.447 912 856.606 912s28.317-5.403 39.125-16.212c21.618-21.59 21.618-56.636.028-78.252L590.265 511.987z"/></svg>', at = '<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M928.7 135.8H99.8c-21.15 0-37.8 17.55-37.8 35.1v685.35c0 17.55 17.1 31.5 37.8 31.5h828.45c21.15 0 33.3-14.4 33.3-31.5v-684.9c.45-17.55-12.15-35.55-32.85-35.55zm-53.1 666.9H147.5V222.2h728.1v580.5z"/></svg>', ft = '<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M38.794 124.791v778.495h946.412V124.791H38.794zm896.678 728.033H89.292v-460.9h846.18v460.9z"/></svg>', ht = '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M738.793 681.382v-48.331l88.242-88.243a298.676 298.676 0 00156.712-83.482 38.836 38.836 0 000-54.923l-366.15-366.15a38.836 38.836 0 00-54.923 0 298.52 298.52 0 00-83.519 156.749l-88.169 88.169h-48.332a411.145 411.145 0 00-292.59 121.232c-15.16 15.159-15.16 39.764 0 54.923L278.906 690.17 86.642 882.436a38.836 38.836 0 1054.922 54.922l192.23-192.229 228.844 228.845a38.836 38.836 0 0054.922 0 411.042 411.042 0 00121.233-292.592zM134.02 435.44a333.473 333.473 0 01208.56-72.571l64.406.037a38.836 38.836 0 0027.461-11.351L544.292 241.71a38.68 38.68 0 0011.351-27.462 180.096 180.096 0 0136.798-89.01L898.8 431.593a180.925 180.925 0 01-89.12 36.835 38.836 38.836 0 00-27.462 11.35L672.373 589.626c-7.287 7.286-11.387 17.173-11.35 27.461l.036 64.406a333.318 333.318 0 01-72.608 208.596L134.021 435.44z"/></svg>', gt = '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M958 967.127h-63.69a9.094 9.094 0 01-9.127-9.126V894.31a9.116 9.116 0 019.127-9.127H958a9.116 9.116 0 019.127 9.127V958a9.094 9.094 0 01-9.126 9.127zm-164.826 0h-64.727a9.094 9.094 0 01-9.127-9.126V894.31a9.116 9.116 0 019.127-9.127h64.727c5.016 0 9.061 4.078 9.061 9.127V958a9.094 9.094 0 01-9.061 9.127zm-165.895 0h-64.727a9.094 9.094 0 01-9.062-9.126V894.31c0-5.05 4.045-9.127 9.062-9.127h64.727a9.116 9.116 0 019.126 9.127V958a9.094 9.094 0 01-9.126 9.127zm165.895-828.31h-64.727a9.094 9.094 0 01-9.127-9.127V66.032a9.116 9.116 0 019.127-9.127h64.727c5.016 0 9.061 4.078 9.061 9.127v63.69a9.094 9.094 0 01-9.061 9.127zm-165.895 0h-64.727a9.094 9.094 0 01-9.062-9.127V66.032c0-5.05 4.045-9.127 9.062-9.127h64.727a9.116 9.116 0 019.126 9.127v63.69a9.094 9.094 0 01-9.126 9.127zm330.722 0H894.31a9.094 9.094 0 01-9.127-9.127V66.032a9.116 9.116 0 019.127-9.127H958a9.116 9.116 0 019.127 9.127v63.69a9.094 9.094 0 01-9.126 9.127zm0 663.45H894.31a9.094 9.094 0 01-9.127-9.126v-64.727c0-5.016 4.078-9.061 9.127-9.061H958c5.05 0 9.127 4.045 9.127 9.061v64.727a9.094 9.094 0 01-9.126 9.127zm0-165.862H894.31a9.094 9.094 0 01-9.127-9.126v-64.727c0-5.017 4.078-9.062 9.127-9.062H958c5.05 0 9.127 4.045 9.127 9.062v64.727a9.094 9.094 0 01-9.126 9.126zm0-165.863H894.31a9.094 9.094 0 01-9.127-9.094v-64.727a9.116 9.116 0 019.127-9.126H958a9.116 9.116 0 019.127 9.126v64.727a9.094 9.094 0 01-9.126 9.062zm0-165.862H894.31a9.094 9.094 0 01-9.127-9.094v-64.727a9.116 9.116 0 019.127-9.127H958c5.05 0 9.127 4.078 9.127 9.094v64.727a9.094 9.094 0 01-9.126 9.127zM443.713 967.127H93.314a36.409 36.409 0 01-36.409-36.441V93.314c0-20.065 16.311-36.409 36.441-36.409h350.367c20.065 0 36.409 16.311 36.409 36.441v837.405c0 20.065-16.311 36.409-36.409 36.409zm-295.802-81.976h241.205a9.094 9.094 0 009.094-9.094V147.91a9.094 9.094 0 00-9.062-9.094H147.911a9.094 9.094 0 00-9.094 9.094V876.09c0 5.016 4.078 9.094 9.094 9.094z"/></svg>', wt = '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M66 56.905h63.69c5.05 0 9.127 4.046 9.127 9.062v63.756a9.094 9.094 0 01-9.127 9.062H66.032a9.094 9.094 0 01-9.127-9.062V65.967c0-5.016 4.078-9.062 9.127-9.062zm164.859 0h64.727a9.047 9.047 0 019.061 9.062v63.756a9.094 9.094 0 01-9.061 9.062h-64.727a9.094 9.094 0 01-9.127-9.062V65.967c0-5.016 4.078-9.062 9.127-9.062zm165.862 0h64.727a9.047 9.047 0 019.062 9.062v63.756a9.094 9.094 0 01-9.062 9.062h-64.727a9.094 9.094 0 01-9.126-9.062V65.967c0-5.016 4.078-9.062 9.126-9.062zM230.86 885.183h64.727c5.016 0 9.061 4.078 9.061 9.127V958a9.094 9.094 0 01-9.061 9.127H230.86a9.094 9.094 0 01-9.127-9.126V894.31a9.116 9.116 0 019.127-9.127zm165.862 0h64.727c5.017 0 9.062 4.078 9.062 9.127V958a9.094 9.094 0 01-9.062 9.127h-64.727a9.094 9.094 0 01-9.126-9.126V894.31a9.116 9.116 0 019.126-9.127zm-330.722 0h63.691a9.116 9.116 0 019.127 9.127V958a9.094 9.094 0 01-9.127 9.127H66.032a9.094 9.094 0 01-9.127-9.126V894.31a9.116 9.116 0 019.127-9.127zm0-663.45h63.691a9.116 9.116 0 019.127 9.126v64.727a9.094 9.094 0 01-9.127 9.061H66.032a9.094 9.094 0 01-9.127-9.061v-64.727a9.116 9.116 0 019.127-9.127zm0 165.862h63.691a9.116 9.116 0 019.127 9.126v64.727a9.094 9.094 0 01-9.127 9.062H66.032a9.094 9.094 0 01-9.127-9.062v-64.727a9.116 9.116 0 019.127-9.126zm0 165.863h63.691c5.05 0 9.127 4.077 9.127 9.094v64.727a9.094 9.094 0 01-9.127 9.126H66.032a9.094 9.094 0 01-9.127-9.126v-64.727c0-5.017 4.078-9.062 9.127-9.062zm0 165.862h63.691c5.05 0 9.127 4.078 9.127 9.094v64.727a9.094 9.094 0 01-9.127 9.127H66.032a9.094 9.094 0 01-9.127-9.127v-64.727c0-5.016 4.078-9.061 9.127-9.061zM580.287 56.905h350.431c20.066 0 36.41 16.279 36.41 36.377v837.404c0 20.13-16.312 36.409-36.442 36.409h-350.4a36.409 36.409 0 01-36.408-36.377V93.314c0-20.13 16.311-36.409 36.409-36.409zm295.802 81.88H634.884a9.094 9.094 0 00-9.094 9.126V876.09c0 5.016 4.078 9.094 9.062 9.094h241.237a9.094 9.094 0 009.094-9.094V147.91a9.094 9.094 0 00-9.094-9.094z"/></svg>';
function je() {
  return {
    IconClose: dt,
    IconMax: at,
    IconPin: ht,
    IconSplitLeft: gt,
    IconSplitRight: wt,
    IconWindow: ft
  };
}
function w(t, e, n) {
  return e != null && Number.isFinite(e) && t < e ? e : n != null && Number.isFinite(n) && t > n ? n : t;
}
function $(t) {
  return t == null || typeof t != "string" ? !0 : t.length == 0;
}
const q = "__xWindow_resize_prop__", B = 360, L = 32;
function J(t, e, n) {
  const o = e.getBoundingClientRect(), u = document.documentElement.getBoundingClientRect();
  if (n.direction == h.TOP) {
    const l = t.clientY - u.top;
    return {
      height: w(o.bottom - t.clientY, L),
      top: l
    };
  }
  if (n.direction == h.BOTTOM) {
    const l = w(t.clientY - o.top, L), s = t.clientY - l - u.top;
    return {
      height: l,
      top: s
    };
  }
  if (n.direction == h.LEFT) {
    const l = w(o.right - t.clientX, B), s = t.clientX - u.left;
    return {
      width: l,
      left: s
    };
  }
  if (n.direction == h.RIGHT) {
    const l = w(t.clientX - o.left, B), s = t.clientX - l - u.left;
    return {
      width: l,
      left: s
    };
  }
  if (n.direction == h.LEFT_TOP) {
    const l = t.clientY - u.top, s = t.clientX - u.left, a = w(o.right - t.clientX, B), i = w(o.bottom - t.clientY, L);
    return {
      top: l,
      left: s,
      width: a,
      height: i
    };
  }
  if (n.direction == h.LEFT_BOTTOM) {
    const l = w(t.clientY - o.top, L), s = w(o.right - t.clientX, B), a = t.clientY - l - u.top, i = t.clientX - u.left;
    return {
      top: a,
      left: i,
      width: s,
      height: l
    };
  }
  if (n.direction == h.RIGHT_TOP) {
    const l = w(t.clientX - o.left, B), s = w(o.bottom - t.clientY, L), a = t.clientY - u.top, i = t.clientX - l - u.left;
    return {
      top: a,
      left: i,
      width: l,
      height: s
    };
  }
  if (n.direction == h.RIGHT_BOTTOM) {
    const l = w(t.clientY - o.top, L), s = w(t.clientX - o.left, B), a = t.clientY - l - u.top, i = t.clientX - s - u.left;
    return {
      top: a,
      left: i,
      width: s,
      height: l
    };
  }
  return null;
}
function Be(t) {
  const e = F(), n = [[r.resizeTop, h.TOP], [r.resizeBottom, h.BOTTOM], [r.resizeLeft, h.LEFT], [r.resizeRight, h.RIGHT], [r.resizeLeftTop, h.LEFT_TOP], [r.resizeLeftBottom, h.LEFT_BOTTOM], [r.resizeRightTop, h.RIGHT_TOP], [r.resizeRightBottom, h.RIGHT_BOTTOM]], o = {
    init: !1,
    direction: -1,
    top: 0,
    left: 0,
    width: 0,
    height: 0
  };
  function u(i) {
    i.preventDefault(), o.init = !1, o.direction = i.target[q], o.top = t.windowState.top, o.left = t.windowState.left, o.width = t.windowState.width, o.height = t.windowState.height, window.addEventListener("mousemove", l), window.addEventListener("mouseup", s);
  }
  function l(i) {
    i.preventDefault();
    const g = e == null ? void 0 : e.refs.window;
    o.init || (g.classList.add(r.resizing), o.init = !0), t.windowState.splitPosition != T.NONE && (t.exitSplitMode(), o.top = t.windowState.top, o.left = t.windowState.left, o.width = t.windowState.width, o.height = t.windowState.height);
    const _ = J(i, g, o);
    if (_ != null)
      for (const z in _) {
        const v = Math.round(_[z]);
        Reflect.set(o, z, v), Reflect.set(g.style, z, v + "px");
      }
  }
  function s(i) {
    if (i.preventDefault(), o.init) {
      const g = e == null ? void 0 : e.refs.window;
      J(i, g, o) != null && (t.windowState.top = o.top, t.windowState.left = o.left, t.windowState.width = o.width, t.windowState.height = o.height), g.classList.remove(r.resizing);
    }
    window.removeEventListener("mousemove", l), window.removeEventListener("mouseup", s);
  }
  const a = n.map((i) => G("div", {
    className: i[0],
    ["." + q]: i[1]
  }));
  return f("div", {
    class: r.resize,
    onMousedown: u
  }, [a]);
}
function Le(t) {
  const e = F(), n = {
    init: !1,
    left: 0,
    top: 0,
    prevClientX: 0,
    prevClientY: 0
  };
  function o(s) {
    if (t.windowState.fullscreen)
      return;
    const i = (e == null ? void 0 : e.refs.window).getBoundingClientRect();
    s.clientY - i.top > 30 || (s.preventDefault(), n.init = !1, n.left = t.windowState.left, n.top = t.windowState.top, n.prevClientX = s.clientX, n.prevClientY = s.clientY, window.addEventListener("mousemove", u), window.addEventListener("mouseup", l));
  }
  function u(s) {
    s.preventDefault();
    const a = e == null ? void 0 : e.refs.window;
    n.init || (a.classList.add(r.dragging), n.init = !0), t.windowState.splitPosition != T.NONE && (t.exitSplitMode(), n.left = t.windowState.left, n.top = t.windowState.top), n.left = Math.round(n.left + s.clientX - n.prevClientX), n.top = Math.round(n.top + s.clientY - n.prevClientY), n.prevClientX = s.clientX, n.prevClientY = s.clientY, a.style.left = n.left + "px", a.style.top = n.top + "px";
  }
  function l(s) {
    if (s.preventDefault(), n.init) {
      const a = e == null ? void 0 : e.refs.window;
      t.windowState.top = n.top, t.windowState.left = n.left, a.classList.remove(r.dragging);
    }
    window.removeEventListener("mousemove", u), window.removeEventListener("mouseup", l);
  }
  return { dragStart: o };
}
const Se = /* @__PURE__ */ E({
  name: "WindowBody",
  props: {
    uid: m,
    body: {
      default: null
    }
  },
  setup(t) {
    const e = Q(X);
    return function() {
      return typeof t.body == "function" ? t.body(e) : t.body;
    };
  }
});
function Ee(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !U(t);
}
const ye = Math.floor(Number.MAX_SAFE_INTEGER / 1e3);
function He() {
  return {
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    fullscreen: !1,
    focused: !1,
    pinned: !1,
    splitPosition: T.NONE
  };
}
const pt = /* @__PURE__ */ E({
  name: "BaseWindow",
  props: {
    ...Y,
    uid: {
      type: m,
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
    const u = m.create(t.uid), l = F(), s = C(M.INIT), a = C(0), i = Wt(He()), g = {
      width: 0,
      height: 0
    }, _ = y(() => t.draggable && t.resizable), z = y(() => typeof t.zIndex == "number" && t.zIndex > 0 ? t.zIndex : (i.pinned ? ye : 0) + a.value), v = {
      get uid() {
        return u;
      },
      get visible() {
        return t.visible;
      },
      get windowState() {
        return i;
      },
      get zIndex() {
        return z.value;
      },
      set zIndex(c) {
        a.value = c;
      },
      get menus() {
        return P();
      },
      exitSplitMode: Lt,
      close: x
    }, W = t.draggable ? Le(v) : null, _t = _.value ? Be(v) : null, Tt = y(() => {
      const c = [r.window];
      return s.value == M.INIT && c.push(r.init), i.fullscreen && c.push(r.fullscreen), i.focused && c.push(r.focused), c;
    }), mt = y(() => {
      if (s.value == M.INIT)
        return {
          width: t.width,
          height: t.height,
          left: t.left,
          top: t.top
        };
      const c = t.mask ? null : z.value;
      return i.fullscreen ? {
        zIndex: c
      } : i.splitPosition === T.LEFT || i.splitPosition === T.RIGHT ? {
        top: 0,
        left: i.splitPosition == T.RIGHT ? "50vw" : 0,
        width: "50vw",
        height: "100vh",
        zIndex: c
      } : {
        top: i.top + "px",
        left: i.left + "px",
        width: i.width + "px",
        height: s.value == M.INIT ? null : i.height + "px",
        zIndex: c
      };
    });
    async function vt(c) {
      await k();
      const b = c.el.getBoundingClientRect();
      if (s.value == M.INIT) {
        const R = lt().value.length;
        let A = b.left, Z = b.top;
        $(t.left) && (A = (window.innerWidth - b.width) / 2), $(t.top) && (Z = window.innerHeight * 0.18 + R * 30), i.width = b.width, i.height = b.height, i.left = A, i.top = Z, s.value = M.MOUNTED;
      }
      j();
    }
    function x(c) {
      t.closeable && (c == null || c.stopPropagation(), e("update:visible", !1));
    }
    function zt() {
      i.focused = !1, k(rt);
    }
    function bt(c) {
      c.stopPropagation();
    }
    function j() {
      i.focused || ct(u);
    }
    function Ot() {
      i.fullscreen = !i.fullscreen;
    }
    function It() {
      i.pinned = !i.pinned;
    }
    function Mt() {
      D(), i.splitPosition = T.LEFT;
    }
    function Bt() {
      D(), i.splitPosition = T.RIGHT;
    }
    function D() {
      g.width = i.width, g.height = i.height;
    }
    function Lt() {
      const S = l.refs.window.getBoundingClientRect();
      i.top = S.top, i.left = S.left, i.width = g.width, i.height = g.height, i.splitPosition = T.NONE;
    }
    function St(c) {
      c.stopPropagation();
    }
    const Et = xt(() => t.visible, () => {
      t.visible || zt();
    });
    At(u, v), tt(() => {
      e("beforeUnmount"), x(), ot(u);
    }), Rt(() => {
      e("unmount"), Et(), s.value = M.UNMOUNTED;
    }), Ct(X, v), n(v);
    function P() {
      const c = [];
      return t.mask !== !0 && (c.push(f("button", {
        onClick: Mt,
        type: "button",
        innerHTML: gt,
        class: r.menu,
        title: "向左分割"
      }, null)), c.push(f("button", {
        onClick: Bt,
        type: "button",
        innerHTML: wt,
        class: r.menu,
        title: "向右分割"
      }, null)), c.push(f("button", {
        onClick: It,
        type: "button",
        innerHTML: ht,
        class: i.pinned ? r.pinMenu : r.menu,
        title: "固定"
      }, null))), _.value && c.push(f("button", {
        onClick: Ot,
        type: "button",
        innerHTML: at,
        class: r.menu,
        title: "最大化"
      }, null)), t.closeable && c.push(f("button", {
        onClick: x,
        type: "button",
        innerHTML: dt,
        class: r.closeMenu,
        title: "关闭"
      }, null)), c.length == 0 ? null : f("div", {
        class: r.menus,
        onMousedown: bt
      }, [c]);
    }
    return function() {
      if (!t.visible)
        return null;
      const c = typeof o.header == "function" ? o.header(P()) : null, S = f("div", {
        class: r.main,
        onMousedown: W == null ? void 0 : W.dragStart
      }, [c, f("div", {
        class: r.body,
        onClick: St
      }, [f(Se, {
        body: t.body,
        key: u.wid,
        uid: u
      }, null)])]), b = {
        ref: "window",
        id: t.id ?? u.wid,
        onVnodeMounted: vt,
        onMousedownCapture: j,
        class: Tt.value,
        style: mt.value
      };
      let O = G("div", b, [S, _t]);
      if (t.mask === !0) {
        const R = {
          zIndex: z.value
        };
        O = f("div", {
          class: r.mask,
          style: R
        }, [O]);
      }
      return t.appendToBody ? f(et, {
        to: "body"
      }, Ee(O) ? O : {
        default: () => [O]
      }) : O;
    };
  }
});
function Ne(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !U(t);
}
const V = /* @__PURE__ */ E({
  name: "SimpleWindow",
  props: {
    ...Y
  },
  setup(t, {
    slots: e,
    attrs: n
  }) {
    const {
      uid: o,
      ...u
    } = n, l = m.create(n.uid), s = {
      header(a) {
        return f("div", {
          class: r.header
        }, [f("i", {
          class: r.logo,
          innerHTML: ft
        }, null), f("div", {
          class: r.title
        }, [t.title ?? "新窗口"]), a]);
      }
    };
    return function() {
      const a = {
        ...t,
        ...u,
        uid: l,
        body: e.default
      };
      return f(pt, a, Ne(s) ? s : {
        default: () => [s]
      });
    };
  }
});
function We(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !U(t);
}
const N = /* @__PURE__ */ E({
  name: "BlankWindow",
  props: {
    ...Y
  },
  setup(t, {
    slots: e,
    attrs: n
  }) {
    const {
      body: o,
      ...u
    } = e, {
      uid: l,
      ...s
    } = n, a = m.create(n.uid);
    return function() {
      const i = {
        ...t,
        ...s,
        uid: a,
        body: e.default
      };
      return f(pt, i, We(u) ? u : {
        default: () => [u]
      });
    };
  }
}), xe = "_grid_bnl2r_1", Re = {
  grid: xe
}, K = /* @__PURE__ */ E({
  name: "WindowManager",
  setup() {
    const t = lt();
    function e(o) {
      o.key == "Escape" && st();
    }
    Yt(), window.addEventListener("keydown", e, !0), tt(() => {
      jt(), window.removeEventListener("keydown", e, !0);
    });
    function n(o) {
      return o == N.name ? N : V;
    }
    return function() {
      const o = t.value.map((u) => {
        const l = Zt(u);
        if (l == null)
          return;
        const s = n(l.type);
        return G(s, l.buildProps());
      });
      return [f(et, {
        to: "body"
      }, {
        default: () => [f("div", {
          class: Re.grid
        }, null)]
      }), o];
    };
  }
});
function Ce(t) {
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
function De(...t) {
  const e = Ce(t);
  return e == null ? (console.error("[xWindow]: 参数有误"), null) : ke(e);
}
function ke(t) {
  if (!Dt())
    return console.error("[xWindow] 需要先创建`WindowManager`组件，见文档 " + kt + " 。"), null;
  const { displayAfterCreate: e, unmountAfterClose: n, afterUnmount: o, ...u } = t, l = {
    uid: null,
    visible: C(e !== !1),
    isUnmounted: !1
  }, s = () => l.visible.value = !0, a = () => {
    l.visible.value = !1, n !== !1 && i();
  }, i = () => {
    l.visible.value && a(), ot(l.uid), k(rt);
  }, g = Object.assign({}, u, {
    visible: l.visible,
    [Ft](_) {
      _ ? s() : a();
    },
    [Gt]() {
      l.isUnmounted = !0;
    },
    [Ut]() {
      typeof o == "function" && o();
    }
  });
  return l.uid = $t(H.create(g)), {
    uid: l.uid,
    get isUnmounted() {
      return l.isUnmounted;
    },
    get visible() {
      return l.visible.value;
    },
    show: s,
    close: a,
    unmount: i
  };
}
function Ve(t, e) {
  t.component(V.name, V), t.component(N.name, N), t.component(K.name, K), Kt(e);
}
const Fe = Vt, Pe = { install: Ve, version: Fe };
export {
  M as ComponentStates,
  V as SimpleWindow,
  K as WindowManager,
  Pe as default,
  Ve as install,
  je as useIcons,
  De as useWindow,
  Xe as useWindowManager,
  Ye as useWindowProxy,
  Fe as version,
  Pe as xWindow
};
