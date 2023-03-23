/*! @dongls/xWindow v0.0.5 https://github.com/dongls/xWindow
Copyright 2023-present dongls
Released under the MIT License */
var Nt = Object.defineProperty;
var yt = (t, n, e) => n in t ? Nt(t, n, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[n] = e;
var z = (t, n, e) => (yt(t, typeof n != "symbol" ? n + "" : n, e), e);
import { shallowRef as Ft, reactive as k, inject as st, getCurrentInstance as X, h as Y, createVNode as p, defineComponent as N, ref as y, computed as B, watch as Ht, onBeforeUnmount as rt, onUnmounted as Pt, provide as Gt, Teleport as lt, isVNode as P, nextTick as U, mergeProps as xt, Transition as Ct } from "vue";
const kt = "https://github.com/dongls/xWindow", Ut = "0.0.5", jt = "onUpdate:visible", Dt = "onBeforeUnmount", Xt = "onUnmount", V = Symbol(), b = Object.freeze({
  INIT: 0,
  MOUNTED: 1,
  UNMOUNTED: 2
}), Z = {
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
}, f = Object.freeze({
  NONE: 0,
  TOP: 1 << 0,
  BOTTOM: 1 << 1,
  LEFT: 1 << 2,
  RIGHT: 1 << 3
}), L = Object.freeze({
  TOP: f.TOP,
  BOTTOM: f.BOTTOM,
  LEFT: f.LEFT,
  RIGHT: f.RIGHT,
  TOP_LEFT: f.TOP | f.LEFT,
  TOP_RIGHT: f.TOP | f.RIGHT,
  BOTTOM_LEFT: f.BOTTOM | f.LEFT,
  BOTTOM_RIGHT: f.BOTTOM | f.RIGHT
}), i = Object.freeze({
  NONE: f.NONE,
  FULLSCREEN: f.TOP,
  LEFT: f.LEFT,
  RIGHT: f.RIGHT,
  TOP_LEFT: f.TOP | f.LEFT,
  TOP_RIGHT: f.TOP | f.RIGHT,
  BOTTOM_LEFT: f.BOTTOM | f.LEFT,
  BOTTOM_RIGHT: f.BOTTOM | f.RIGHT
});
let Yt = 1e3;
class E {
  /** 统一使用`UID.create`方法创建 */
  constructor() {
    z(this, "value");
    this.value = Yt++;
  }
  get wid() {
    return "window--" + this.value;
  }
  static create(n) {
    return n instanceof E ? n : Object.freeze(new E());
  }
}
class F {
  constructor(n) {
    z(this, "uid");
    z(this, "type");
    z(this, "visible");
    z(this, "others");
    z(this, "body");
    const { visible: e, body: T, type: d, ...u } = n;
    this.uid = E.create(), this.type = d, this.visible = e, this.body = T, this.others = u;
  }
  static create(n) {
    return n instanceof F ? n : new F(n);
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
function Vt(t) {
  const { clientX: n, clientY: e } = t, { innerWidth: T, innerHeight: d } = window;
  let u = f.NONE;
  return e <= 5 && (u |= f.TOP), e >= d - 5 && (u |= f.BOTTOM), n <= 5 && (u |= f.LEFT), n >= T - 5 && (u |= f.RIGHT), u;
}
const l = {
  isMounted: !1,
  zIndex: 1e3,
  stack: /* @__PURE__ */ new Map(),
  ghost: Ft([]),
  options: /* @__PURE__ */ new Map(),
  topWindow: null,
  previewState: k({
    mode: i.NONE,
    width: null,
    height: null
  })
};
function Zt() {
  l.isMounted = !0;
}
function $t() {
  l.isMounted = !1, l.topWindow = null, l.ghost.value = [], l.stack.clear(), l.options.clear();
}
function Kt() {
  return l.isMounted;
}
function ut() {
  return l.zIndex;
}
function dt() {
  return l.zIndex += 2;
}
function qt() {
  const t = l.topWindow;
  return t ? t.zIndex : 1;
}
function Jt(t) {
  typeof t == "number" && Number.isFinite(t) && (l.zIndex = Math.floor(t));
}
function Qt() {
  return l.topWindow;
}
function At(t, n) {
  l.stack.set(t, n);
}
function ct(t) {
  l.stack.delete(t), l.options.delete(t);
  const n = l.ghost.value.indexOf(t);
  if (n >= 0) {
    const e = l.ghost.value;
    e.splice(n, 1), l.ghost.value = e.slice();
  }
}
function at() {
  l.stack.size == 0 || l.topWindow == null || l.topWindow.close();
}
function te(t) {
  return l.options.get(t);
}
function ee(t) {
  const n = l.ghost.value;
  return n.push(t.uid), l.ghost.value = n.slice(), l.options.set(t.uid, t), t.uid;
}
function ne(t) {
  return l.stack.get(t);
}
function ft() {
  return l.ghost;
}
function wt(t) {
  if (l.topWindow = t, t != null) {
    for (const n of l.stack.values()) {
      const e = n.windowState;
      e.focused = n === t;
    }
    t.zIndex < ut() && (t.zIndex = dt());
  }
}
function Tt(t) {
  const n = l.stack.get(t);
  wt(n);
}
function ht() {
  const t = ie();
  wt(t);
}
function ie() {
  return l.stack.size == 0 ? null : Array.from(l.stack.values()).filter((n) => n.visible).sort((n, e) => e.zIndex - n.zIndex)[0];
}
function oe(t) {
  let n = null;
  const e = Vt(t);
  if (l.previewState.mode = e, (e == i.LEFT || e == i.RIGHT) && (n = j(e == i.LEFT ? i.RIGHT : i.LEFT), n)) {
    const T = window.innerWidth - n.getWindowEl().offsetWidth;
    l.previewState.width = T;
  }
  return {
    mode: l.previewState.mode,
    width: l.previewState.width,
    relatedWindow: n
  };
}
function se() {
  return l.previewState.mode = i.NONE, l.previewState.height = null, l.previewState.width = null, i.NONE;
}
function re() {
  return l.previewState;
}
function j(t) {
  let n = null;
  for (const e of l.stack.values())
    e.splitState.mode === t && (n == null || e.zIndex > n.zIndex) && (n = e);
  return n;
}
function wn() {
  return {
    closeTopWindow: at,
    getTopZIndex: dt,
    getWindowApi: ne,
    getZIndex: ut,
    setFocusedWindow: Tt
  };
}
function le(t) {
  Jt(t == null ? void 0 : t.zIndex);
}
function Tn() {
  return st(V);
}
const ue = "_window_o9g8u_7", de = "_dragging_o9g8u_17", ce = "_resizing_o9g8u_17", ae = "_fullscreen_o9g8u_21", fe = "_focused_o9g8u_31", we = "_header_o9g8u_34", Te = "_main_o9g8u_38", he = "_init_o9g8u_45", ge = "_title_o9g8u_63", pe = "_menus_o9g8u_73", _e = "_body_o9g8u_79", Oe = "_footer_o9g8u_84", me = "_menu_o9g8u_73", Se = "_closeMenu_o9g8u_135 _menu_o9g8u_73", Ee = "_pinMenu_o9g8u_146 _menu_o9g8u_73", Le = "_logo_o9g8u_153", ve = "_resize_o9g8u_165", Ie = "_resizeBar_o9g8u_169", Re = "_resizeTop_o9g8u_174 _resizeBar_o9g8u_169", Me = "_resizeBottom_o9g8u_175 _resizeBar_o9g8u_169", ze = "_resizeRight_o9g8u_191 _resizeBar_o9g8u_169", be = "_resizeLeft_o9g8u_192 _resizeBar_o9g8u_169", We = "_resizeTopLeft_o9g8u_208 _resizeBar_o9g8u_169", Be = "_resizeBottomLeft_o9g8u_209 _resizeBar_o9g8u_169", Ne = "_resizeTopRight_o9g8u_210 _resizeBar_o9g8u_169", ye = "_resizeBottomRight_o9g8u_211 _resizeBar_o9g8u_169", Fe = "_mask_o9g8u_241", w = {
  window: ue,
  dragging: de,
  resizing: ce,
  fullscreen: ae,
  focused: fe,
  header: we,
  main: Te,
  init: he,
  title: ge,
  menus: pe,
  body: _e,
  footer: Oe,
  menu: me,
  closeMenu: Se,
  pinMenu: Ee,
  logo: Le,
  resize: ve,
  resizeBar: Ie,
  resizeTop: Re,
  resizeBottom: Me,
  resizeRight: ze,
  resizeLeft: be,
  resizeTopLeft: We,
  resizeBottomLeft: Be,
  resizeTopRight: Ne,
  resizeBottomRight: ye,
  mask: Fe
}, gt = '<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M590.265 511.987l305.521-305.468c21.617-21.589 21.617-56.636.027-78.252-21.616-21.617-56.663-21.617-78.279 0L512.012 433.735 206.544 128.213c-21.617-21.617-56.635-21.617-78.252 0-21.616 21.589-21.616 56.635-.027 78.252L433.76 511.987 128.211 817.482c-21.617 21.59-21.617 56.635 0 78.251 10.808 10.81 24.967 16.213 39.125 16.213 14.159 0 28.318-5.403 39.126-16.213l305.522-305.468L817.48 895.788C828.289 906.597 842.447 912 856.606 912s28.317-5.403 39.125-16.212c21.618-21.59 21.618-56.636.028-78.252L590.265 511.987z"/></svg>', pt = '<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M928.7 135.8H99.8c-21.15 0-37.8 17.55-37.8 35.1v685.35c0 17.55 17.1 31.5 37.8 31.5h828.45c21.15 0 33.3-14.4 33.3-31.5v-684.9c.45-17.55-12.15-35.55-32.85-35.55zm-53.1 666.9H147.5V222.2h728.1v580.5z"/></svg>', _t = '<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M38.794 124.791v778.495h946.412V124.791H38.794zm896.678 728.033H89.292v-460.9h846.18v460.9z"/></svg>', Ot = '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M738.793 681.382v-48.331l88.242-88.243a298.676 298.676 0 00156.712-83.482 38.836 38.836 0 000-54.923l-366.15-366.15a38.836 38.836 0 00-54.923 0 298.52 298.52 0 00-83.519 156.749l-88.169 88.169h-48.332a411.145 411.145 0 00-292.59 121.232c-15.16 15.159-15.16 39.764 0 54.923L278.906 690.17 86.642 882.436a38.836 38.836 0 1054.922 54.922l192.23-192.229 228.844 228.845a38.836 38.836 0 0054.922 0 411.042 411.042 0 00121.233-292.592zM134.02 435.44a333.473 333.473 0 01208.56-72.571l64.406.037a38.836 38.836 0 0027.461-11.351L544.292 241.71a38.68 38.68 0 0011.351-27.462 180.096 180.096 0 0136.798-89.01L898.8 431.593a180.925 180.925 0 01-89.12 36.835 38.836 38.836 0 00-27.462 11.35L672.373 589.626c-7.287 7.286-11.387 17.173-11.35 27.461l.036 64.406a333.318 333.318 0 01-72.608 208.596L134.021 435.44z"/></svg>';
function hn() {
  return {
    IconClose: gt,
    IconMax: pt,
    IconPin: Ot,
    IconWindow: _t
  };
}
function O(t, n, e) {
  return n != null && Number.isFinite(n) && t < n ? n : e != null && Number.isFinite(e) && t > e ? e : t;
}
function A(t) {
  return t == null || typeof t != "string" ? !0 : t.length == 0;
}
const tt = "__xWindow_resize_prop__", W = 360, et = 32, He = [[w.resizeTop, v(L.TOP)], [w.resizeBottom, v(L.BOTTOM)], [w.resizeLeft, v(L.LEFT)], [w.resizeRight, v(L.RIGHT)], [w.resizeTopLeft, v(L.TOP_LEFT)], [w.resizeTopRight, v(L.TOP_RIGHT)], [w.resizeBottomLeft, v(L.BOTTOM_LEFT)], [w.resizeBottomRight, v(L.BOTTOM_RIGHT)]];
function v(t) {
  return t.toString(2).padStart(4, "0");
}
function nt(t, n, e) {
  const T = n.getBoundingClientRect(), d = document.documentElement.getBoundingClientRect(), u = e.relatedWindow != null, s = {};
  if (e.direction[3] == "1") {
    const r = O(T.bottom - O(t.clientY, 0), et), o = O(t.clientY - d.top, 0, window.innerHeight - r);
    s.height = r, s.top = o;
  }
  if (e.direction[2] == "1") {
    const r = O(O(t.clientY, 0, window.innerHeight) - T.top, et), o = O(t.clientY - r - d.top, 0, window.innerHeight - r);
    s.height = r, s.top = o;
  }
  if (e.direction[1] == "1") {
    const r = O(T.right - O(t.clientX, 0), W, u ? window.innerWidth - W : window.innerWidth), o = O(t.clientX - d.left, u ? W : 0, window.innerWidth - r);
    s.width = r, s.left = o;
  }
  if (e.direction[0] == "1") {
    const r = O(O(t.clientX, 0) - T.left, W, u ? window.innerWidth - W : window.innerWidth), o = O(t.clientX - r - d.left, 0, window.innerWidth - r - (u ? W : 0));
    s.width = r, s.left = o;
  }
  return s;
}
function Pe(t) {
  const n = X(), e = {
    init: !1,
    direction: null,
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    relatedWindow: null
  };
  function T(r) {
    r.preventDefault(), r.stopPropagation();
    const o = t.windowState, a = t.splitState;
    e.init = !1, e.direction = r.target[tt], e.top = o.top, e.left = o.left, e.width = o.width, e.height = o.height, a.mode == i.LEFT && e.direction == i.RIGHT.toString(2).padStart(4, "0") && (e.relatedWindow = j(i.RIGHT)), a.mode == i.RIGHT && e.direction == i.LEFT.toString(2).padStart(4, "0") && (e.relatedWindow = j(i.LEFT)), window.addEventListener("mousemove", d), window.addEventListener("mouseup", u);
  }
  function d(r) {
    r.preventDefault();
    const o = n == null ? void 0 : n.refs.window, a = t.splitState;
    if (e.init || (o.classList.add(w.resizing), e.init = !0), t.splitState.mode != i.NONE && (e.top = t.windowState.top, e.left = t.windowState.left, e.width = t.windowState.width, e.height = t.windowState.height, !(a.mode == i.LEFT && e.direction == i.RIGHT.toString(2).padStart(4, "0") || a.mode == i.RIGHT && e.direction == i.LEFT.toString(2).padStart(4, "0")))) {
      const g = o.getBoundingClientRect();
      t.windowState.top = g.top, t.windowState.left = g.left, t.windowState.width = g.width, t.windowState.height = g.height, t.splitState.mode = i.NONE, e.top = t.windowState.top, e.left = t.windowState.left, e.width = t.windowState.width, e.height = t.windowState.height;
    }
    const _ = nt(r, o, e);
    for (const g in _) {
      const m = Math.round(_[g]);
      Reflect.set(e, g, m), Reflect.set(o.style, g, m + "px");
    }
    if (a.mode == i.LEFT || a.mode == i.RIGHT) {
      const g = e.relatedWindow;
      if (g != null) {
        const m = g.getWindowEl();
        Reflect.set(m.style, "width", window.innerWidth - e.width + "px");
      }
    }
  }
  function u(r) {
    if (r.preventDefault(), e.init) {
      const o = n == null ? void 0 : n.refs.window;
      nt(r, o, e) != null && (t.windowState.top = e.top, t.windowState.left = e.left, t.windowState.width = e.width, t.windowState.height = e.height, t.saveWindowState()), o.classList.remove(w.resizing);
      const _ = t.splitState;
      if (_.mode == i.LEFT || _.mode == i.RIGHT) {
        const g = e.relatedWindow;
        if (g != null) {
          const m = t.splitState;
          m.width = e.width / window.innerWidth * 100;
          const R = 100 - m.width;
          g.splitState.width = R;
        }
      }
    }
    window.removeEventListener("mousemove", d), window.removeEventListener("mouseup", u);
  }
  const s = He.map((r) => Y("div", {
    className: r[0],
    ["." + tt]: r[1]
  }));
  return p("div", {
    class: w.resize,
    onMousedown: T
  }, [s]);
}
function Ge(t) {
  const n = X(), e = {
    init: !1,
    left: 0,
    top: 0,
    prevClientX: 0,
    prevClientY: 0,
    splitMode: i.NONE,
    splitWidth: null,
    relatedWindow: null
  };
  function T(s) {
    const o = (n == null ? void 0 : n.refs.window).getBoundingClientRect();
    s.clientY - o.top > 30 || (s.preventDefault(), e.init = !1, e.left = t.windowState.left, e.top = t.windowState.top, e.prevClientX = s.clientX, e.prevClientY = s.clientY, window.addEventListener("mousemove", d), window.addEventListener("mouseup", u));
  }
  function d(s) {
    s.preventDefault();
    const r = n == null ? void 0 : n.refs.window;
    e.init || (r.classList.add(w.dragging), e.init = !0), t.splitState.mode != i.NONE && (t.exitSplitMode(s), e.left = t.windowState.left, e.top = t.windowState.top), e.left = Math.round(e.left + s.clientX - e.prevClientX), e.top = Math.round(e.top + s.clientY - e.prevClientY), e.prevClientX = s.clientX, e.prevClientY = s.clientY, r.style.left = e.left + "px", r.style.top = e.top + "px";
    const o = oe(s);
    e.splitMode = o.mode, e.splitWidth = o.width, e.relatedWindow = o.relatedWindow;
  }
  function u(s) {
    if (s.preventDefault(), e.init) {
      const r = n == null ? void 0 : n.refs.window;
      if (t.windowState.top = e.top, t.windowState.left = e.left, e.splitMode !== i.NONE) {
        if (t.splitState.mode = e.splitMode, e.relatedWindow) {
          const o = e.splitWidth / window.innerWidth * 100;
          t.splitState.width = o, e.relatedWindow.splitState.width = 100 - o;
        }
        se();
      }
      r.classList.remove(w.dragging);
    }
    window.removeEventListener("mousemove", d), window.removeEventListener("mouseup", u);
  }
  return { dragStart: T };
}
const xe = /* @__PURE__ */ N({
  name: "WindowBody",
  props: {
    uid: E,
    body: {
      default: null
    }
  },
  setup(t) {
    const n = st(V);
    return function() {
      return typeof t.body == "function" ? t.body(n) : t.body;
    };
  }
});
function Ce(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !P(t);
}
const ke = Math.floor(Number.MAX_SAFE_INTEGER / 10) - 1e4;
function Ue() {
  return {
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    focused: !1,
    pinned: !1
  };
}
function je() {
  return {
    mode: i.NONE,
    width: 50,
    height: 50
  };
}
const mt = /* @__PURE__ */ N({
  name: "BaseWindow",
  props: {
    ...Z,
    uid: {
      type: E,
      required: !0
    },
    body: {
      default: null
    }
  },
  emits: ["update:visible", "beforeUnmount", "unmount"],
  setup(t, {
    emit: n,
    expose: e,
    slots: T
  }) {
    const d = E.create(t.uid), u = X(), s = y(b.INIT), r = y(0), o = k(Ue()), a = k(je()), _ = {
      width: 0,
      height: 0
    }, g = B(() => t.draggable && t.resizable), m = B(() => typeof t.zIndex == "number" && t.zIndex > 0 ? t.zIndex : (o.pinned ? ke : 0) + r.value), R = {
      get uid() {
        return d;
      },
      get visible() {
        return t.visible;
      },
      get windowState() {
        return o;
      },
      get splitState() {
        return a;
      },
      get zIndex() {
        return m.value;
      },
      get menus() {
        return q();
      },
      set zIndex(c) {
        r.value = c;
      },
      exitSplitMode: bt,
      close: x,
      saveWindowState: K,
      getWindowEl() {
        return u.refs.window;
      }
    }, G = t.draggable ? Ge(R) : null, St = g.value ? Pe(R) : null, Et = B(() => {
      const c = [w.window];
      return s.value == b.INIT && c.push(w.init), a.mode == i.FULLSCREEN && c.push(w.fullscreen), o.focused && c.push(w.focused), c;
    }), Lt = B(() => {
      if (s.value == b.INIT)
        return {
          width: t.width,
          height: t.height,
          left: t.left,
          top: t.top
        };
      const c = t.mask ? null : m.value, h = a.mode;
      if (h == i.FULLSCREEN)
        return {
          zIndex: c
        };
      if (h === i.LEFT || h === i.RIGHT) {
        const S = a.width ?? 50;
        return {
          top: 0,
          // left: winState.splitMode == SPLIT_MODES.RIGHT ? '50vw' : 0,
          left: h == i.LEFT ? 0 : null,
          right: h == i.RIGHT ? 0 : null,
          width: S + "vw",
          height: "100vh",
          zIndex: c
        };
      }
      return h == i.TOP_LEFT || h == i.TOP_RIGHT || h == i.BOTTOM_LEFT || h == i.BOTTOM_RIGHT ? {
        top: h == i.TOP_LEFT || h == i.TOP_RIGHT ? 0 : null,
        left: h == i.TOP_LEFT || h == i.BOTTOM_LEFT ? 0 : null,
        right: h == i.TOP_RIGHT || h == i.BOTTOM_RIGHT ? 0 : null,
        bottom: h == i.BOTTOM_LEFT || h == i.BOTTOM_RIGHT ? 0 : null,
        width: "50vw",
        height: "50vh",
        zIndex: c
      } : {
        top: o.top + "px",
        left: o.left + "px",
        width: o.width + "px",
        height: s.value == b.INIT ? null : o.height + "px",
        zIndex: c
      };
    });
    async function vt(c) {
      await U();
      const S = c.el.getBoundingClientRect();
      if (s.value == b.INIT) {
        const C = ft().value.length;
        let J = S.left, Q = S.top;
        A(t.left) && (J = (window.innerWidth - S.width) / 2), A(t.top) && (Q = window.innerHeight * 0.18 + C * 30), o.width = S.width, o.height = S.height, o.left = J, o.top = Q, s.value = b.MOUNTED, K();
      }
      $();
    }
    function x(c) {
      t.closeable && (c == null || c.stopPropagation(), n("update:visible", !1));
    }
    function It() {
      o.focused = !1, U(ht);
    }
    function Rt(c) {
      c.stopPropagation();
    }
    function $() {
      o.focused || Tt(d);
    }
    function Mt() {
      a.mode = a.mode == i.FULLSCREEN ? i.NONE : i.FULLSCREEN;
    }
    function zt() {
      o.pinned = !o.pinned;
    }
    function K() {
      _.width = o.width, _.height = o.height;
    }
    function bt(c) {
      o.top = c.clientY - 15, o.left = c.clientX - _.width / 2, o.width = _.width, o.height = _.height, a.mode = i.NONE, a.width = 50, a.height = 50;
    }
    function Wt(c) {
      c.stopPropagation();
    }
    const Bt = Ht(() => t.visible, () => {
      t.visible || It();
    });
    At(d, R), rt(() => {
      n("beforeUnmount"), x(), ct(d);
    }), Pt(() => {
      n("unmount"), Bt(), s.value = b.UNMOUNTED;
    }), Gt(V, R), e(R);
    function q() {
      const c = [];
      return t.mask !== !0 && c.push(p("button", {
        onClick: zt,
        type: "button",
        innerHTML: Ot,
        class: o.pinned ? w.pinMenu : w.menu,
        title: "固定"
      }, null)), g.value && c.push(p("button", {
        onClick: Mt,
        type: "button",
        innerHTML: pt,
        class: w.menu,
        title: "最大化"
      }, null)), t.closeable && c.push(p("button", {
        onClick: x,
        type: "button",
        innerHTML: gt,
        class: w.closeMenu,
        title: "关闭"
      }, null)), c.length == 0 ? null : p("div", {
        class: w.menus,
        onMousedown: Rt
      }, [c]);
    }
    return function() {
      if (!t.visible)
        return null;
      const c = typeof T.header == "function" ? T.header(q()) : null, h = p("div", {
        class: w.main,
        onMousedown: G == null ? void 0 : G.dragStart
      }, [c, p("div", {
        class: w.body,
        onClick: Wt
      }, [p(xe, {
        body: t.body,
        key: d.wid,
        uid: d
      }, null)])]), S = {
        ref: "window",
        id: t.id ?? d.wid,
        onVnodeMounted: vt,
        onMousedownCapture: $,
        class: Et.value,
        style: Lt.value
      };
      let M = Y("div", S, [h, St]);
      if (t.mask === !0) {
        const C = {
          zIndex: m.value
        };
        M = p("div", {
          class: w.mask,
          style: C
        }, [M]);
      }
      return t.appendToBody ? p(lt, {
        to: "body"
      }, Ce(M) ? M : {
        default: () => [M]
      }) : M;
    };
  }
});
function De(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !P(t);
}
const D = /* @__PURE__ */ N({
  name: "SimpleWindow",
  props: {
    ...Z
  },
  setup(t, {
    slots: n,
    attrs: e
  }) {
    const {
      uid: T,
      ...d
    } = e, u = E.create(e.uid), s = y(null);
    function r(a) {
      a.preventDefault();
      const _ = s.value;
      if (_ == null)
        return;
      const g = _.windowState.splitMode;
      _.windowState.splitMode = g == i.FULLSCREEN ? i.NONE : i.FULLSCREEN;
    }
    const o = {
      header(a) {
        return p("div", {
          class: w.header,
          onDblclick: r
        }, [p("i", {
          class: w.logo,
          innerHTML: _t
        }, null), p("div", {
          class: w.title
        }, [t.title ?? "新窗口"]), a]);
      }
    };
    return function() {
      const a = {
        ...t,
        ...d,
        uid: u,
        body: n.default
      };
      return p(mt, xt(a, {
        ref: s
      }), De(o) ? o : {
        default: () => [o]
      });
    };
  }
});
function Xe(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !P(t);
}
const H = /* @__PURE__ */ N({
  name: "BlankWindow",
  props: {
    ...Z
  },
  setup(t, {
    slots: n,
    attrs: e
  }) {
    const {
      body: T,
      ...d
    } = n, {
      uid: u,
      ...s
    } = e, r = E.create(e.uid);
    return function() {
      const o = {
        ...t,
        ...s,
        uid: r,
        body: n.default
      };
      return p(mt, o, Xe(d) ? d : {
        default: () => [d]
      });
    };
  }
});
const Ye = "_splitWindowMask_348ej_1", Ve = "_fullscreen_348ej_9", Ze = "_splitLeft_348ej_16", $e = "_splitRight_348ej_23", Ke = "_splitTopLeft_348ej_30", qe = "_splitTopRight_348ej_37", Je = "_splitBottomLeft_348ej_44", Qe = "_splitBottomRight_348ej_51", I = {
  splitWindowMask: Ye,
  fullscreen: Ve,
  splitLeft: Ze,
  splitRight: $e,
  splitTopLeft: Ke,
  splitTopRight: qe,
  splitBottomLeft: Je,
  splitBottomRight: Qe
};
function Ae(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !P(t);
}
const tn = {
  [i.FULLSCREEN]: I.fullscreen,
  [i.LEFT]: I.splitLeft,
  [i.RIGHT]: I.splitRight,
  [i.TOP_LEFT]: I.splitTopLeft,
  [i.TOP_RIGHT]: I.splitTopRight,
  [i.BOTTOM_LEFT]: I.splitBottomLeft,
  [i.BOTTOM_RIGHT]: I.splitBottomRight
};
function en(t) {
  return t == i.BOTTOM_LEFT ? i.LEFT : t == i.BOTTOM_RIGHT ? i.RIGHT : t == i.LEFT ? i.TOP_LEFT : t == i.RIGHT ? i.TOP_RIGHT : i.FULLSCREEN;
}
function nn(t) {
  return t == i.TOP_LEFT ? i.LEFT : t == i.TOP_RIGHT ? i.RIGHT : t == i.LEFT ? i.BOTTOM_LEFT : t == i.RIGHT ? i.BOTTOM_RIGHT : i.NONE;
}
function on(t) {
  return t == i.TOP_RIGHT ? i.TOP_LEFT : t == i.BOTTOM_RIGHT ? i.BOTTOM_LEFT : t == i.TOP_LEFT ? i.TOP_RIGHT : t == i.BOTTOM_LEFT ? i.BOTTOM_RIGHT : i.LEFT;
}
function sn(t) {
  return t == i.TOP_LEFT ? i.TOP_RIGHT : t == i.BOTTOM_LEFT ? i.BOTTOM_RIGHT : t == i.TOP_RIGHT ? i.TOP_LEFT : t == i.BOTTOM_RIGHT ? i.BOTTOM_LEFT : i.RIGHT;
}
const it = {
  ArrowUp: en,
  ArrowDown: nn,
  ArrowLeft: on,
  ArrowRight: sn
};
function rn() {
  at();
}
const ot = /* @__PURE__ */ N({
  name: "WindowManager",
  setup() {
    const t = ft(), n = re();
    function e(s) {
      const r = s.key;
      if (r == "Escape")
        return rn();
      if (s.ctrlKey && r in it) {
        const o = Qt(), a = it[r];
        o.splitState.mode = a(o.splitState.mode);
        return;
      }
    }
    Zt(), window.addEventListener("keydown", e, !0), rt(() => {
      $t(), window.removeEventListener("keydown", e, !0);
    });
    function T(s) {
      return s == H.name ? H : D;
    }
    const d = B(() => {
      const s = [I.splitWindowMask], r = tn[n.mode];
      return r != null && s.push(r), s;
    });
    function u() {
      let s = null;
      if (n.mode != i.NONE) {
        const o = {
          zIndex: qt() + 1,
          width: n.width ? n.width - 20 + "px" : null
        };
        s = p("div", {
          class: d.value,
          style: o
        }, null);
      }
      return p(lt, {
        to: "body"
      }, {
        default: () => [p(Ct, {
          name: "fade"
        }, Ae(s) ? s : {
          default: () => [s]
        })]
      });
    }
    return function() {
      return [...t.value.map((r) => {
        const o = te(r);
        if (o == null)
          return;
        const a = T(o.type);
        return Y(a, o.buildProps());
      }), u()];
    };
  }
});
function ln(t) {
  if (t.length == 1) {
    const n = t[0];
    return n == null ? null : typeof n == "object" ? n : null;
  }
  if (t.length == 2) {
    const [n, e] = t;
    if (typeof n == "string" && e != null)
      return { title: n, body: e };
  }
  return null;
}
function gn(...t) {
  const n = ln(t);
  return n == null ? (console.error("[xWindow]: 参数有误"), null) : un(n);
}
function un(t) {
  if (!Kt())
    return console.error("[xWindow] 需要先创建`WindowManager`组件，见文档 " + kt + " 。"), null;
  const { displayAfterCreate: n, unmountAfterClose: e, afterUnmount: T, ...d } = t, u = {
    uid: null,
    visible: y(n !== !1),
    isUnmounted: !1
  }, s = () => u.visible.value = !0, r = () => {
    u.visible.value = !1, e !== !1 && o();
  }, o = () => {
    u.visible.value && r(), ct(u.uid), U(ht);
  }, a = Object.assign({}, d, {
    visible: u.visible,
    [jt](_) {
      _ ? s() : r();
    },
    [Dt]() {
      u.isUnmounted = !0;
    },
    [Xt]() {
      typeof T == "function" && T();
    }
  });
  return u.uid = ee(F.create(a)), {
    uid: u.uid,
    get isUnmounted() {
      return u.isUnmounted;
    },
    get visible() {
      return u.visible.value;
    },
    show: s,
    close: r,
    unmount: o
  };
}
function dn(t, n) {
  t.component(D.name, D), t.component(H.name, H), t.component(ot.name, ot), le(n);
}
const cn = Ut, pn = { install: dn, version: cn };
export {
  H as BlankWindow,
  b as ComponentStates,
  D as SimpleWindow,
  ot as WindowManager,
  pn as default,
  dn as install,
  hn as useIcons,
  gn as useWindow,
  Tn as useWindowApi,
  wn as useWindowManager,
  cn as version,
  pn as xWindow
};
