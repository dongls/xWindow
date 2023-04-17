/*! @dongls/xWindow v0.0.5 https://github.com/dongls/xWindow
Copyright 2023-present dongls
Released under the MIT License */
var Ft = Object.defineProperty;
var Ht = (t, n, e) => n in t ? Ft(t, n, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[n] = e;
var z = (t, n, e) => (Ht(t, typeof n != "symbol" ? n + "" : n, e), e);
import { shallowRef as Pt, reactive as q, inject as lt, getCurrentInstance as X, h as Y, createVNode as _, defineComponent as y, ref as F, computed as N, watch as Gt, onBeforeUnmount as rt, onUnmounted as xt, provide as Ct, Teleport as ut, isVNode as G, nextTick as U, mergeProps as kt, Transition as qt } from "vue";
const Ut = "https://github.com/dongls/xWindow", jt = "0.0.5", Dt = "onUpdate:visible", Xt = "onBeforeUnmount", Yt = "onUnmount", Z = Symbol(), B = Object.freeze({
  INIT: 0,
  MOUNTED: 1,
  UNMOUNTED: 2
}), V = {
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
}, a = Object.freeze({
  NONE: 0,
  TOP: 1 << 0,
  BOTTOM: 1 << 1,
  LEFT: 1 << 2,
  RIGHT: 1 << 3
}), L = Object.freeze({
  TOP: a.TOP,
  BOTTOM: a.BOTTOM,
  LEFT: a.LEFT,
  RIGHT: a.RIGHT,
  TOP_LEFT: a.TOP | a.LEFT,
  TOP_RIGHT: a.TOP | a.RIGHT,
  BOTTOM_LEFT: a.BOTTOM | a.LEFT,
  BOTTOM_RIGHT: a.BOTTOM | a.RIGHT
}), i = Object.freeze({
  NONE: a.NONE,
  FULLSCREEN: a.TOP,
  LEFT: a.LEFT,
  RIGHT: a.RIGHT,
  TOP_LEFT: a.TOP | a.LEFT,
  TOP_RIGHT: a.TOP | a.RIGHT,
  BOTTOM_LEFT: a.BOTTOM | a.LEFT,
  BOTTOM_RIGHT: a.BOTTOM | a.RIGHT
});
let Zt = 1e3;
class E {
  /** 统一使用`UID.create`方法创建 */
  constructor() {
    z(this, "value");
    this.value = Zt++;
  }
  get wid() {
    return "window--" + this.value;
  }
  static create(n) {
    return n instanceof E ? n : Object.freeze(new E());
  }
}
class H {
  constructor(n) {
    z(this, "uid");
    z(this, "type");
    z(this, "visible");
    z(this, "others");
    z(this, "body");
    const { visible: e, body: f, type: d, ...r } = n;
    this.uid = E.create(), this.type = d, this.visible = e, this.body = f, this.others = r;
  }
  static create(n) {
    return n instanceof H ? n : new H(n);
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
  const { clientX: n, clientY: e } = t, { innerWidth: f, innerHeight: d } = window;
  let r = a.NONE;
  return e <= 5 && (r |= a.TOP), e >= d - 5 && (r |= a.BOTTOM), n <= 5 && (r |= a.LEFT), n >= f - 5 && (r |= a.RIGHT), r;
}
const u = {
  isMounted: !1,
  zIndex: 1e3,
  stack: /* @__PURE__ */ new Map(),
  ghost: Pt([]),
  options: /* @__PURE__ */ new Map(),
  topWindow: null,
  previewState: q({
    mode: i.NONE,
    width: null,
    height: null
  })
};
function $t() {
  u.isMounted = !0;
}
function Kt() {
  u.isMounted = !1, u.topWindow = null, u.ghost.value = [], u.stack.clear(), u.options.clear();
}
function Jt() {
  return u.isMounted;
}
function dt() {
  return u.zIndex;
}
function ct() {
  return u.zIndex += 2;
}
function Qt() {
  const t = u.topWindow;
  return t ? t.zIndex : 1;
}
function At(t) {
  typeof t == "number" && Number.isFinite(t) && (u.zIndex = Math.floor(t));
}
function te() {
  return u.topWindow;
}
function ee(t, n) {
  u.stack.set(t, n);
}
function at(t) {
  u.stack.delete(t), u.options.delete(t);
  const n = u.ghost.value.indexOf(t);
  if (n >= 0) {
    const e = u.ghost.value;
    e.splice(n, 1), u.ghost.value = e.slice();
  }
}
function ft() {
  u.stack.size == 0 || u.topWindow == null || u.topWindow.close();
}
function ne(t) {
  return u.options.get(t);
}
function ie(t) {
  const n = u.ghost.value;
  return n.push(t.uid), u.ghost.value = n.slice(), u.options.set(t.uid, t), t.uid;
}
function oe(t) {
  return u.stack.get(t);
}
function Tt() {
  return u.ghost;
}
function wt(t) {
  if (u.topWindow = t, t != null) {
    for (const n of u.stack.values()) {
      const e = n.windowState;
      e.focused = n === t;
    }
    t.zIndex < dt() && (t.zIndex = ct());
  }
}
function ht(t) {
  const n = u.stack.get(t);
  wt(n);
}
function pt() {
  const t = se();
  wt(t);
}
function se() {
  return u.stack.size == 0 ? null : Array.from(u.stack.values()).filter((n) => n.visible).sort((n, e) => e.zIndex - n.zIndex)[0];
}
function le(t) {
  let n = null;
  const e = Vt(t);
  if (u.previewState.mode = e, (e == i.LEFT || e == i.RIGHT) && (n = j(e == i.LEFT ? i.RIGHT : i.LEFT), n)) {
    const f = window.innerWidth - n.getWindowEl().offsetWidth;
    u.previewState.width = f;
  }
  return {
    mode: u.previewState.mode,
    width: u.previewState.width,
    relatedWindow: n
  };
}
function re() {
  return u.previewState.mode = i.NONE, u.previewState.height = null, u.previewState.width = null, i.NONE;
}
function ue() {
  return u.previewState;
}
function j(t) {
  let n = null;
  for (const e of u.stack.values())
    e.splitState.mode === t && (n == null || e.zIndex > n.zIndex) && (n = e);
  return n;
}
function an() {
  return {
    closeTopWindow: ft,
    getTopZIndex: ct,
    getWindowApi: oe,
    getZIndex: dt,
    setFocusedWindow: ht
  };
}
function de(t) {
  At(t == null ? void 0 : t.zIndex);
}
function fn() {
  return lt(Z);
}
const ce = "_window_1seq0_7", ae = "_dragging_1seq0_17", fe = "_resizing_1seq0_17", Te = "_fullscreen_1seq0_21", we = "_focused_1seq0_31", he = "_header_1seq0_34", pe = "_menu_1seq0_38", _e = "_logo_1seq0_41", ge = "_main_1seq0_45", Oe = "_init_1seq0_52", me = "_title_1seq0_70", Ee = "_menus_1seq0_80", Le = "_body_1seq0_86", Se = "_footer_1seq0_91", ve = "_closeMenu_1seq0_142 _menu_1seq0_38", Ie = "_pinMenu_1seq0_153 _menu_1seq0_38", Re = "_resize_1seq0_172", Me = "_resizeBar_1seq0_176", be = "_resizeTop_1seq0_181 _resizeBar_1seq0_176", ze = "_resizeBottom_1seq0_182 _resizeBar_1seq0_176", Be = "_resizeRight_1seq0_198 _resizeBar_1seq0_176", We = "_resizeLeft_1seq0_199 _resizeBar_1seq0_176", Ne = "_resizeTopLeft_1seq0_215 _resizeBar_1seq0_176", ye = "_resizeBottomLeft_1seq0_216 _resizeBar_1seq0_176", Fe = "_resizeTopRight_1seq0_217 _resizeBar_1seq0_176", He = "_resizeBottomRight_1seq0_218 _resizeBar_1seq0_176", Pe = "_mask_1seq0_248", c = {
  window: ce,
  dragging: ae,
  resizing: fe,
  fullscreen: Te,
  focused: we,
  header: he,
  menu: pe,
  logo: _e,
  main: ge,
  init: Oe,
  title: me,
  menus: Ee,
  body: Le,
  footer: Se,
  closeMenu: ve,
  pinMenu: Ie,
  resize: Re,
  resizeBar: Me,
  resizeTop: be,
  resizeBottom: ze,
  resizeRight: Be,
  resizeLeft: We,
  resizeTopLeft: Ne,
  resizeBottomLeft: ye,
  resizeTopRight: Fe,
  resizeBottomRight: He,
  mask: Pe
}, _t = '<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M590.265 511.987l305.521-305.468c21.617-21.589 21.617-56.636.027-78.252-21.616-21.617-56.663-21.617-78.279 0L512.012 433.735 206.544 128.213c-21.617-21.617-56.635-21.617-78.252 0-21.616 21.589-21.616 56.635-.027 78.252L433.76 511.987 128.211 817.482c-21.617 21.59-21.617 56.635 0 78.251 10.808 10.81 24.967 16.213 39.125 16.213 14.159 0 28.318-5.403 39.126-16.213l305.522-305.468L817.48 895.788C828.289 906.597 842.447 912 856.606 912s28.317-5.403 39.125-16.212c21.618-21.59 21.618-56.636.028-78.252L590.265 511.987z"/></svg>', gt = '<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M928.7 135.8H99.8c-21.15 0-37.8 17.55-37.8 35.1v685.35c0 17.55 17.1 31.5 37.8 31.5h828.45c21.15 0 33.3-14.4 33.3-31.5v-684.9c.45-17.55-12.15-35.55-32.85-35.55zm-53.1 666.9H147.5V222.2h728.1v580.5z"/></svg>', Ot = '<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M38.794 124.791v778.495h946.412V124.791H38.794zm896.678 728.033H89.292v-460.9h846.18v460.9z"/></svg>', mt = '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M738.793 681.382v-48.331l88.242-88.243a298.676 298.676 0 00156.712-83.482 38.836 38.836 0 000-54.923l-366.15-366.15a38.836 38.836 0 00-54.923 0 298.52 298.52 0 00-83.519 156.749l-88.169 88.169h-48.332a411.145 411.145 0 00-292.59 121.232c-15.16 15.159-15.16 39.764 0 54.923L278.906 690.17 86.642 882.436a38.836 38.836 0 1054.922 54.922l192.23-192.229 228.844 228.845a38.836 38.836 0 0054.922 0 411.042 411.042 0 00121.233-292.592zM134.02 435.44a333.473 333.473 0 01208.56-72.571l64.406.037a38.836 38.836 0 0027.461-11.351L544.292 241.71a38.68 38.68 0 0011.351-27.462 180.096 180.096 0 0136.798-89.01L898.8 431.593a180.925 180.925 0 01-89.12 36.835 38.836 38.836 0 00-27.462 11.35L672.373 589.626c-7.287 7.286-11.387 17.173-11.35 27.461l.036 64.406a333.318 333.318 0 01-72.608 208.596L134.021 435.44z"/></svg>';
function Tn() {
  return {
    IconClose: _t,
    IconMax: gt,
    IconPin: mt,
    IconWindow: Ot
  };
}
function g(t, n, e) {
  return n != null && Number.isFinite(n) && t < n ? n : e != null && Number.isFinite(e) && t > e ? e : t;
}
function tt(t) {
  return t == null || typeof t != "string" ? !0 : t.length == 0;
}
const et = "__xWindow_resize_prop__", W = 360, nt = 32, S = {
  TOP: v(L.TOP),
  BOTTOM: v(L.BOTTOM),
  LEFT: v(L.LEFT),
  RIGHT: v(L.RIGHT),
  TOP_LEFT: v(L.TOP_LEFT),
  TOP_RIGHT: v(L.TOP_RIGHT),
  BOTTOM_LEFT: v(L.BOTTOM_LEFT),
  BOTTOM_RIGHT: v(L.BOTTOM_RIGHT)
}, Ge = [[c.resizeTop, S.TOP], [c.resizeBottom, S.BOTTOM], [c.resizeLeft, S.LEFT], [c.resizeRight, S.RIGHT], [c.resizeTopLeft, S.TOP_LEFT], [c.resizeTopRight, S.TOP_RIGHT], [c.resizeBottomLeft, S.BOTTOM_LEFT], [c.resizeBottomRight, S.BOTTOM_RIGHT]];
function v(t) {
  return t.toString(2).padStart(4, "0");
}
function it(t, n, e) {
  const f = n.getBoundingClientRect(), d = document.documentElement.getBoundingClientRect(), r = e.relatedWindow != null, o = {};
  if (e.direction[3] == "1") {
    const l = g(f.bottom - g(t.clientY, 0), nt), s = g(t.clientY - d.top, 0, window.innerHeight - l);
    o.height = l, o.top = s;
  }
  if (e.direction[2] == "1") {
    const l = g(g(t.clientY, 0, window.innerHeight) - f.top, nt), s = g(t.clientY - l - d.top, 0, window.innerHeight - l);
    o.height = l, o.top = s;
  }
  if (e.direction[1] == "1") {
    const l = g(f.right - g(t.clientX, 0), W, r ? window.innerWidth - W : window.innerWidth), s = g(t.clientX - d.left, r ? W : 0, window.innerWidth - l);
    o.width = l, o.left = s;
  }
  if (e.direction[0] == "1") {
    const l = g(g(t.clientX, 0) - f.left, W, r ? window.innerWidth - W : window.innerWidth), s = g(t.clientX - l - d.left, 0, window.innerWidth - l - (r ? W : 0));
    o.width = l, o.left = s;
  }
  return o;
}
function xe(t) {
  const n = X(), e = {
    init: !1,
    direction: null,
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    relatedWindow: null
  };
  function f(l) {
    l.preventDefault(), l.stopPropagation();
    const s = t.windowState, T = t.splitState;
    e.init = !1, e.direction = l.target[et], e.top = s.top, e.left = s.left, e.width = s.width, e.height = s.height, T.mode == i.LEFT && e.direction == i.RIGHT.toString(2).padStart(4, "0") && (e.relatedWindow = j(i.RIGHT)), T.mode == i.RIGHT && e.direction == i.LEFT.toString(2).padStart(4, "0") && (e.relatedWindow = j(i.LEFT)), window.addEventListener("mousemove", d), window.addEventListener("mouseup", r);
  }
  function d(l) {
    l.preventDefault();
    const s = n == null ? void 0 : n.refs.window, T = t.splitState;
    if (e.init || (s.classList.add(c.resizing), e.init = !0), t.splitState.mode != i.NONE) {
      if (e.relatedWindow == null) {
        const p = s.getBoundingClientRect();
        t.windowState.top = p.top, t.windowState.left = p.left, t.windowState.width = p.width, t.windowState.height = p.height, t.splitState.mode = i.NONE;
      }
      e.top = t.windowState.top, e.left = t.windowState.left, e.width = t.windowState.width, e.height = t.windowState.height;
    }
    const h = it(l, s, e);
    for (const p in h) {
      const O = Math.round(h[p]);
      Reflect.set(e, p, O), Reflect.set(s.style, p, O + "px");
    }
    if (T.mode == i.LEFT || T.mode == i.RIGHT) {
      const p = e.relatedWindow;
      if (p != null) {
        const O = p.getWindowEl();
        Reflect.set(O.style, "width", window.innerWidth - e.width + "px");
      }
    }
  }
  function r(l) {
    if (l.preventDefault(), e.init) {
      const s = n == null ? void 0 : n.refs.window;
      it(l, s, e) != null && (t.windowState.top = e.top, t.windowState.left = e.left, t.windowState.width = e.width, t.windowState.height = e.height, t.saveWindowState()), s.classList.remove(c.resizing);
      const h = t.splitState;
      if (h.mode == i.LEFT || h.mode == i.RIGHT) {
        const p = e.relatedWindow;
        if (p != null) {
          const O = t.splitState;
          O.width = e.width / window.innerWidth * 100;
          const R = 100 - O.width;
          p.splitState.width = R;
        }
      }
    }
    window.removeEventListener("mousemove", d), window.removeEventListener("mouseup", r);
  }
  const o = Ge.map((l) => Y("div", {
    className: l[0],
    ["." + et]: l[1]
  }));
  return _("div", {
    class: c.resize,
    onMousedown: f
  }, [o]);
}
function Ce(t) {
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
  function f(o) {
    const s = (n == null ? void 0 : n.refs.window).getBoundingClientRect();
    o.clientY - s.top > 30 || (o.preventDefault(), e.init = !1, e.left = t.windowState.left, e.top = t.windowState.top, e.prevClientX = o.clientX, e.prevClientY = o.clientY, window.addEventListener("mousemove", d), window.addEventListener("mouseup", r));
  }
  function d(o) {
    o.preventDefault();
    const l = n == null ? void 0 : n.refs.window;
    e.init || (l.classList.add(c.dragging), e.init = !0), t.splitState.mode != i.NONE && (t.exitSplitMode(o), e.left = t.windowState.left, e.top = t.windowState.top), e.left = Math.round(e.left + o.clientX - e.prevClientX), e.top = Math.round(e.top + o.clientY - e.prevClientY), e.prevClientX = o.clientX, e.prevClientY = o.clientY, l.style.left = e.left + "px", l.style.top = e.top + "px";
    const s = le(o);
    e.splitMode = s.mode, e.splitWidth = s.width, e.relatedWindow = s.relatedWindow;
  }
  function r(o) {
    if (o.preventDefault(), e.init) {
      const l = n == null ? void 0 : n.refs.window;
      if (t.windowState.top = e.top, t.windowState.left = e.left, e.splitMode !== i.NONE) {
        if (t.splitState.mode = e.splitMode, e.relatedWindow) {
          const s = e.splitWidth / window.innerWidth * 100;
          t.splitState.width = s, e.relatedWindow.splitState.width = 100 - s;
        }
        re();
      }
      l.classList.remove(c.dragging);
    }
    window.removeEventListener("mousemove", d), window.removeEventListener("mouseup", r);
  }
  return { dragStart: f };
}
const ke = /* @__PURE__ */ y({
  name: "WindowBody",
  props: {
    uid: E,
    body: {
      default: null
    }
  },
  setup(t) {
    const n = lt(Z);
    return function() {
      return typeof t.body == "function" ? t.body(n) : t.body;
    };
  }
});
function qe(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !G(t);
}
const Ue = Math.floor(Number.MAX_SAFE_INTEGER / 10) - 1e4;
function je() {
  return {
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    focused: !1,
    pinned: !1
  };
}
function De() {
  return {
    mode: i.NONE,
    width: 50,
    height: 50
  };
}
function Xe(t, n, e, f, d) {
  return N(() => {
    if (n.value == B.INIT)
      return {
        width: t.width,
        height: t.height,
        left: t.left,
        top: t.top
      };
    const r = t.mask ? null : d.value, o = f.mode;
    return o == i.FULLSCREEN ? {
      zIndex: r
    } : o === i.LEFT || o === i.RIGHT ? {
      top: 0,
      left: o == i.LEFT ? 0 : null,
      right: o == i.RIGHT ? 0 : null,
      width: (f.width ?? 50) + "vw",
      height: "100vh",
      zIndex: r
    } : o == i.TOP_LEFT || o == i.TOP_RIGHT || o == i.BOTTOM_LEFT || o == i.BOTTOM_RIGHT ? {
      top: o == i.TOP_LEFT || o == i.TOP_RIGHT ? 0 : null,
      left: o == i.TOP_LEFT || o == i.BOTTOM_LEFT ? 0 : null,
      right: o == i.TOP_RIGHT || o == i.BOTTOM_RIGHT ? 0 : null,
      bottom: o == i.BOTTOM_LEFT || o == i.BOTTOM_RIGHT ? 0 : null,
      width: "50vw",
      height: "50vh",
      zIndex: r
    } : {
      top: e.top + "px",
      left: e.left + "px",
      width: e.width + "px",
      height: n.value == B.INIT ? null : e.height + "px",
      zIndex: r
    };
  });
}
const Et = /* @__PURE__ */ y({
  name: "BaseWindow",
  props: {
    ...V,
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
    slots: f
  }) {
    const d = E.create(t.uid), r = X(), o = F(B.INIT), l = F(0), s = q(je()), T = q(De()), h = {
      width: 0,
      height: 0
    }, p = N(() => t.draggable && t.resizable), O = N(() => typeof t.zIndex == "number" && t.zIndex > 0 ? t.zIndex : (s.pinned ? Ue : 0) + l.value), R = {
      get uid() {
        return d;
      },
      get visible() {
        return t.visible;
      },
      get windowState() {
        return s;
      },
      get splitState() {
        return T;
      },
      get zIndex() {
        return O.value;
      },
      set zIndex(w) {
        l.value = w;
      },
      exitSplitMode: Bt,
      close: C,
      saveWindowState: K,
      getWindowEl() {
        return r.refs.window;
      },
      useCssClass: yt,
      useMenus: J
    }, x = t.draggable ? Ce(R) : null, Lt = p.value ? xe(R) : null, St = N(() => {
      const w = [c.window];
      return o.value == B.INIT && w.push(c.init), T.mode == i.FULLSCREEN && w.push(c.fullscreen), s.focused && w.push(c.focused), w;
    }), vt = Xe(t, o, s, T, O);
    async function It(w) {
      await U();
      const M = w.el.getBoundingClientRect();
      if (o.value == B.INIT) {
        const k = Tt().value.length;
        let Q = M.left, A = M.top;
        tt(t.left) && (Q = (window.innerWidth - M.width) / 2), tt(t.top) && (A = window.innerHeight * 0.18 + k * 30), s.width = M.width, s.height = M.height, s.left = Q, s.top = A, o.value = B.MOUNTED, K();
      }
      $();
    }
    function C(w) {
      t.closeable && (w == null || w.stopPropagation(), n("update:visible", !1));
    }
    function Rt() {
      s.focused = !1, U(pt);
    }
    function Mt(w) {
      w.stopPropagation();
    }
    function $() {
      s.focused || ht(d);
    }
    function bt() {
      T.mode = T.mode == i.FULLSCREEN ? i.NONE : i.FULLSCREEN;
    }
    function zt() {
      s.pinned = !s.pinned;
    }
    function K() {
      h.width = s.width, h.height = s.height;
    }
    function Bt(w) {
      s.top = w.clientY - 15, s.left = w.clientX - h.width / 2, s.width = h.width, s.height = h.height, T.mode = i.NONE, T.width = 50, T.height = 50;
    }
    function Wt(w) {
      w.stopPropagation();
    }
    const Nt = Gt(() => t.visible, () => {
      t.visible || Rt();
    });
    ee(d, R), rt(() => {
      n("beforeUnmount"), C(), at(d);
    }), xt(() => {
      n("unmount"), Nt(), o.value = B.UNMOUNTED;
    }), Ct(Z, R), e(R);
    function yt() {
      return c;
    }
    function J(w = {}) {
      const m = [];
      return t.mask !== !0 && m.push(_("button", {
        onClick: zt,
        type: "button",
        innerHTML: mt,
        class: s.pinned ? c.pinMenu : c.menu,
        title: "固定"
      }, null)), p.value && m.push(_("button", {
        onClick: bt,
        type: "button",
        innerHTML: gt,
        class: c.menu,
        title: "最大化"
      }, null)), t.closeable && m.push(_("button", {
        onClick: C,
        type: "button",
        innerHTML: _t,
        class: c.closeMenu,
        title: "关闭"
      }, null)), m.length == 0 ? null : (w == null ? void 0 : w.custom) === !0 ? m : _("div", {
        class: c.menus,
        onMousedown: Mt
      }, [m]);
    }
    return function() {
      if (!t.visible)
        return null;
      const w = typeof f.header == "function" ? f.header(J) : null, m = _("div", {
        class: c.main,
        onMousedown: x == null ? void 0 : x.dragStart
      }, [w, _("div", {
        class: c.body,
        onClick: Wt
      }, [_(ke, {
        body: t.body,
        key: d.wid,
        uid: d
      }, null)])]), M = {
        ref: "window",
        id: t.id ?? d.wid,
        onVnodeMounted: It,
        onMousedownCapture: $,
        class: St.value,
        style: vt.value
      };
      let b = Y("div", M, [m, Lt]);
      if (t.mask === !0) {
        const k = {
          zIndex: O.value
        };
        b = _("div", {
          class: c.mask,
          style: k
        }, [b]);
      }
      return t.appendToBody ? _(ut, {
        to: "body"
      }, qe(b) ? b : {
        default: () => [b]
      }) : b;
    };
  }
});
function Ye(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !G(t);
}
const D = /* @__PURE__ */ y({
  name: "SimpleWindow",
  props: {
    ...V
  },
  setup(t, {
    slots: n,
    attrs: e
  }) {
    const {
      uid: f,
      ...d
    } = e, r = E.create(e.uid), o = F(null);
    function l(T) {
      T.preventDefault();
      const h = o.value;
      if (h == null)
        return;
      const p = h.windowState.splitMode;
      h.windowState.splitMode = p == i.FULLSCREEN ? i.NONE : i.FULLSCREEN;
    }
    const s = {
      header(T) {
        const h = T();
        return _("div", {
          class: c.header,
          onDblclick: l
        }, [_("i", {
          class: c.logo,
          innerHTML: Ot
        }, null), _("div", {
          class: c.title
        }, [t.title ?? "新窗口"]), h]);
      }
    };
    return function() {
      const T = {
        ...t,
        ...d,
        uid: r,
        body: n.default
      };
      return _(Et, kt(T, {
        ref: o
      }), Ye(s) ? s : {
        default: () => [s]
      });
    };
  }
});
function Ze(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !G(t);
}
const P = /* @__PURE__ */ y({
  name: "BlankWindow",
  props: {
    ...V
  },
  setup(t, {
    slots: n,
    attrs: e
  }) {
    const {
      body: f,
      ...d
    } = n, {
      uid: r,
      ...o
    } = e, l = E.create(e.uid);
    return function() {
      const s = {
        ...t,
        ...o,
        uid: l,
        body: n.default
      };
      return _(Et, s, Ze(d) ? d : {
        default: () => [d]
      });
    };
  }
});
const Ve = "_splitWindowMask_348ej_1", $e = "_fullscreen_348ej_9", Ke = "_splitLeft_348ej_16", Je = "_splitRight_348ej_23", Qe = "_splitTopLeft_348ej_30", Ae = "_splitTopRight_348ej_37", tn = "_splitBottomLeft_348ej_44", en = "_splitBottomRight_348ej_51", I = {
  splitWindowMask: Ve,
  fullscreen: $e,
  splitLeft: Ke,
  splitRight: Je,
  splitTopLeft: Qe,
  splitTopRight: Ae,
  splitBottomLeft: tn,
  splitBottomRight: en
};
function nn(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !G(t);
}
const on = {
  [i.FULLSCREEN]: I.fullscreen,
  [i.LEFT]: I.splitLeft,
  [i.RIGHT]: I.splitRight,
  [i.TOP_LEFT]: I.splitTopLeft,
  [i.TOP_RIGHT]: I.splitTopRight,
  [i.BOTTOM_LEFT]: I.splitBottomLeft,
  [i.BOTTOM_RIGHT]: I.splitBottomRight
}, ot = {
  ArrowUp: {
    [i.BOTTOM_LEFT]: i.LEFT,
    [i.BOTTOM_RIGHT]: i.RIGHT,
    [i.LEFT]: i.TOP_LEFT,
    [i.RIGHT]: i.TOP_RIGHT,
    fallback: i.FULLSCREEN
  },
  ArrowDown: {
    [i.TOP_LEFT]: i.LEFT,
    [i.TOP_RIGHT]: i.RIGHT,
    [i.LEFT]: i.BOTTOM_LEFT,
    [i.RIGHT]: i.BOTTOM_RIGHT,
    fallback: i.NONE
  },
  ArrowLeft: {
    [i.TOP_RIGHT]: i.TOP_LEFT,
    [i.TOP_LEFT]: i.TOP_RIGHT,
    [i.BOTTOM_RIGHT]: i.BOTTOM_LEFT,
    [i.BOTTOM_LEFT]: i.BOTTOM_RIGHT,
    fallback: i.LEFT
  },
  ArrowRight: {
    [i.TOP_LEFT]: i.TOP_RIGHT,
    [i.TOP_RIGHT]: i.TOP_LEFT,
    [i.BOTTOM_LEFT]: i.BOTTOM_RIGHT,
    [i.BOTTOM_RIGHT]: i.BOTTOM_LEFT,
    fallback: i.RIGHT
  }
}, st = /* @__PURE__ */ y({
  name: "WindowManager",
  setup() {
    const t = Tt(), n = ue();
    function e(o) {
      const l = o.key;
      if (l == "Escape")
        return ft();
      if (o.ctrlKey && l in ot) {
        const s = te(), T = Reflect.get(ot, l), h = T[s.splitState.mode] ?? T.fallback;
        s.splitState.mode = h;
        return;
      }
    }
    $t(), window.addEventListener("keydown", e, !0), rt(() => {
      Kt(), window.removeEventListener("keydown", e, !0);
    });
    function f(o) {
      return o == P.name ? P : D;
    }
    const d = N(() => {
      const o = [I.splitWindowMask], l = on[n.mode];
      return l != null && o.push(l), o;
    });
    function r() {
      let o = null;
      if (n.mode != i.NONE) {
        const s = {
          zIndex: Qt() + 1,
          width: n.width ? n.width - 20 + "px" : null
        };
        o = _("div", {
          class: d.value,
          style: s
        }, null);
      }
      return _(ut, {
        to: "body"
      }, {
        default: () => [_(qt, {
          name: "fade"
        }, nn(o) ? o : {
          default: () => [o]
        })]
      });
    }
    return function() {
      return [...t.value.map((l) => {
        const s = ne(l);
        if (s == null)
          return;
        const T = f(s.type);
        return Y(T, s.buildProps());
      }), r()];
    };
  }
});
function sn(t) {
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
function wn(...t) {
  const n = sn(t);
  return n == null ? (console.error("[xWindow]: 参数有误"), null) : ln(n);
}
function ln(t) {
  if (!Jt())
    return console.error("[xWindow] 需要先创建`WindowManager`组件，见文档 " + Ut + " 。"), null;
  const { displayAfterCreate: n, unmountAfterClose: e, afterUnmount: f, ...d } = t, r = {
    uid: null,
    visible: F(n !== !1),
    isUnmounted: !1
  }, o = () => r.visible.value = !0, l = () => {
    r.visible.value = !1, e !== !1 && s();
  }, s = () => {
    r.visible.value && l(), at(r.uid), U(pt);
  }, T = Object.assign({}, d, {
    visible: r.visible,
    [Dt](h) {
      h ? o() : l();
    },
    [Xt]() {
      r.isUnmounted = !0;
    },
    [Yt]() {
      typeof f == "function" && f();
    }
  });
  return r.uid = ie(H.create(T)), {
    uid: r.uid,
    get isUnmounted() {
      return r.isUnmounted;
    },
    get visible() {
      return r.visible.value;
    },
    show: o,
    close: l,
    unmount: s
  };
}
function rn(t, n) {
  t.component(D.name, D), t.component(P.name, P), t.component(st.name, st), de(n);
}
const un = jt, hn = { install: rn, version: un };
export {
  P as BlankWindow,
  B as ComponentStates,
  D as SimpleWindow,
  st as WindowManager,
  hn as default,
  rn as install,
  Tn as useIcons,
  wn as useWindow,
  fn as useWindowApi,
  an as useWindowManager,
  un as version,
  hn as xWindow
};
