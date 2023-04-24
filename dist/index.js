/*! @dongls/xWindow v0.0.5 https://github.com/dongls/xWindow
Copyright 2023-present dongls
Released under the MIT License */
var Pt = Object.defineProperty;
var Gt = (t, n, e) => n in t ? Pt(t, n, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[n] = e;
var b = (t, n, e) => (Gt(t, typeof n != "symbol" ? n + "" : n, e), e);
import { shallowRef as xt, reactive as U, inject as ut, getCurrentInstance as Y, h as Z, createVNode as _, defineComponent as F, ref as H, computed as W, watch as Ct, onBeforeUnmount as dt, onUnmounted as kt, provide as qt, Teleport as ct, isVNode as x, nextTick as j, mergeProps as Ut, Transition as jt } from "vue";
const Dt = "https://github.com/dongls/xWindow", Xt = "0.0.5", Yt = "onUpdate:visible", Zt = "onBeforeUnmount", Vt = "onUnmount", V = Symbol(), B = Object.freeze({
  INIT: 0,
  MOUNTED: 1,
  UNMOUNTED: 2
}), $ = {
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
  /** 是否包含遮罩层，默认为`false` */
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
}), S = Object.freeze({
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
let $t = 1e3;
class L {
  /** 统一使用`UID.create`方法创建 */
  constructor() {
    b(this, "value");
    this.value = $t++;
  }
  get wid() {
    return "window--" + this.value;
  }
  static create(n) {
    return n instanceof L ? n : Object.freeze(new L());
  }
}
class P {
  constructor(n) {
    b(this, "uid");
    b(this, "type");
    b(this, "visible");
    b(this, "others");
    b(this, "body");
    const { visible: e, body: c, type: d, ...r } = n;
    this.uid = L.create(), this.type = d, this.visible = e, this.body = c, this.others = r;
  }
  static create(n) {
    return n instanceof P ? n : new P(n);
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
function Kt(t) {
  const { clientX: n, clientY: e } = t, { innerWidth: c, innerHeight: d } = window;
  let r = f.NONE;
  return e <= 5 && (r |= f.TOP), e >= d - 5 && (r |= f.BOTTOM), n <= 5 && (r |= f.LEFT), n >= c - 5 && (r |= f.RIGHT), r;
}
const u = {
  isMounted: !1,
  zIndex: 1e3,
  stack: /* @__PURE__ */ new Map(),
  ghost: xt([]),
  options: /* @__PURE__ */ new Map(),
  topWindow: null,
  previewState: U({
    mode: i.NONE,
    width: null,
    height: null
  })
};
function Jt() {
  u.isMounted = !0;
}
function Qt() {
  u.isMounted = !1, u.topWindow = null, u.ghost.value = [], u.stack.clear(), u.options.clear();
}
function At() {
  return u.isMounted;
}
function at() {
  return u.zIndex;
}
function ft() {
  return u.zIndex += 1;
}
function te() {
  const t = u.topWindow;
  return t ? t.zIndex : 1;
}
function ee(t) {
  typeof t == "number" && Number.isFinite(t) && (u.zIndex = Math.floor(t));
}
function ne() {
  return u.topWindow;
}
function ie(t, n) {
  u.stack.set(t, n);
}
function Tt(t) {
  u.stack.delete(t), u.options.delete(t);
  const n = u.ghost.value.indexOf(t);
  if (n >= 0) {
    const e = u.ghost.value;
    e.splice(n, 1), u.ghost.value = e.slice();
  }
}
function wt() {
  u.stack.size == 0 || u.topWindow == null || u.topWindow.close();
}
function oe(t) {
  return u.options.get(t);
}
function se(t) {
  const n = u.ghost.value;
  return n.push(t.uid), u.ghost.value = n.slice(), u.options.set(t.uid, t), t.uid;
}
function le(t) {
  return u.stack.get(t);
}
function ht() {
  return u.ghost;
}
function pt(t) {
  if (u.topWindow = t, t != null) {
    for (const n of u.stack.values()) {
      const e = n.windowState;
      e.focused = n === t;
    }
    t.zIndex < at() && (t.zIndex = ft());
  }
}
function _t(t) {
  const n = u.stack.get(t);
  pt(n);
}
function gt() {
  const t = re();
  pt(t);
}
function re() {
  return u.stack.size == 0 ? null : Array.from(u.stack.values()).filter((n) => n.visible).sort((n, e) => e.zIndex - n.zIndex)[0];
}
function ue(t) {
  let n = null;
  const e = Kt(t);
  if (u.previewState.mode = e, (e == i.LEFT || e == i.RIGHT) && (n = D(e == i.LEFT ? i.RIGHT : i.LEFT), n)) {
    const c = window.innerWidth - n.getWindowEl().offsetWidth;
    u.previewState.width = c;
  }
  return {
    mode: u.previewState.mode,
    width: u.previewState.width,
    relatedWindow: n
  };
}
function de() {
  return u.previewState.mode = i.NONE, u.previewState.height = null, u.previewState.width = null, i.NONE;
}
function ce() {
  return u.previewState;
}
function D(t) {
  let n = null;
  for (const e of u.stack.values())
    e.splitState.mode === t && (n == null || e.zIndex > n.zIndex) && (n = e);
  return n;
}
function Tn() {
  return {
    closeTopWindow: wt,
    getTopZIndex: ft,
    getWindowApi: le,
    getZIndex: at,
    setFocusedWindow: _t
  };
}
function ae(t) {
  ee(t == null ? void 0 : t.zIndex);
}
function wn() {
  return ut(V);
}
const fe = "_window_1seq0_7", Te = "_dragging_1seq0_17", we = "_resizing_1seq0_17", he = "_fullscreen_1seq0_21", pe = "_focused_1seq0_31", _e = "_header_1seq0_34", ge = "_menu_1seq0_38", Oe = "_logo_1seq0_41", me = "_main_1seq0_45", Ee = "_init_1seq0_52", Le = "_title_1seq0_70", Se = "_menus_1seq0_80", ve = "_body_1seq0_86", Ie = "_footer_1seq0_91", Re = "_closeMenu_1seq0_142 _menu_1seq0_38", Me = "_pinMenu_1seq0_153 _menu_1seq0_38", be = "_resize_1seq0_172", Be = "_resizeBar_1seq0_176", ze = "_resizeTop_1seq0_181 _resizeBar_1seq0_176", We = "_resizeBottom_1seq0_182 _resizeBar_1seq0_176", ye = "_resizeRight_1seq0_198 _resizeBar_1seq0_176", Ne = "_resizeLeft_1seq0_199 _resizeBar_1seq0_176", Fe = "_resizeTopLeft_1seq0_215 _resizeBar_1seq0_176", He = "_resizeBottomLeft_1seq0_216 _resizeBar_1seq0_176", Pe = "_resizeTopRight_1seq0_217 _resizeBar_1seq0_176", Ge = "_resizeBottomRight_1seq0_218 _resizeBar_1seq0_176", xe = "_mask_1seq0_248", a = {
  window: fe,
  dragging: Te,
  resizing: we,
  fullscreen: he,
  focused: pe,
  header: _e,
  menu: ge,
  logo: Oe,
  main: me,
  init: Ee,
  title: Le,
  menus: Se,
  body: ve,
  footer: Ie,
  closeMenu: Re,
  pinMenu: Me,
  resize: be,
  resizeBar: Be,
  resizeTop: ze,
  resizeBottom: We,
  resizeRight: ye,
  resizeLeft: Ne,
  resizeTopLeft: Fe,
  resizeBottomLeft: He,
  resizeTopRight: Pe,
  resizeBottomRight: Ge,
  mask: xe
}, Ot = '<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M590.265 511.987l305.521-305.468c21.617-21.589 21.617-56.636.027-78.252-21.616-21.617-56.663-21.617-78.279 0L512.012 433.735 206.544 128.213c-21.617-21.617-56.635-21.617-78.252 0-21.616 21.589-21.616 56.635-.027 78.252L433.76 511.987 128.211 817.482c-21.617 21.59-21.617 56.635 0 78.251 10.808 10.81 24.967 16.213 39.125 16.213 14.159 0 28.318-5.403 39.126-16.213l305.522-305.468L817.48 895.788C828.289 906.597 842.447 912 856.606 912s28.317-5.403 39.125-16.212c21.618-21.59 21.618-56.636.028-78.252L590.265 511.987z"/></svg>', mt = '<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M928.7 135.8H99.8c-21.15 0-37.8 17.55-37.8 35.1v685.35c0 17.55 17.1 31.5 37.8 31.5h828.45c21.15 0 33.3-14.4 33.3-31.5v-684.9c.45-17.55-12.15-35.55-32.85-35.55zm-53.1 666.9H147.5V222.2h728.1v580.5z"/></svg>', Et = '<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M38.794 124.791v778.495h946.412V124.791H38.794zm896.678 728.033H89.292v-460.9h846.18v460.9z"/></svg>', Lt = '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M738.793 681.382v-48.331l88.242-88.243a298.676 298.676 0 00156.712-83.482 38.836 38.836 0 000-54.923l-366.15-366.15a38.836 38.836 0 00-54.923 0 298.52 298.52 0 00-83.519 156.749l-88.169 88.169h-48.332a411.145 411.145 0 00-292.59 121.232c-15.16 15.159-15.16 39.764 0 54.923L278.906 690.17 86.642 882.436a38.836 38.836 0 1054.922 54.922l192.23-192.229 228.844 228.845a38.836 38.836 0 0054.922 0 411.042 411.042 0 00121.233-292.592zM134.02 435.44a333.473 333.473 0 01208.56-72.571l64.406.037a38.836 38.836 0 0027.461-11.351L544.292 241.71a38.68 38.68 0 0011.351-27.462 180.096 180.096 0 0136.798-89.01L898.8 431.593a180.925 180.925 0 01-89.12 36.835 38.836 38.836 0 00-27.462 11.35L672.373 589.626c-7.287 7.286-11.387 17.173-11.35 27.461l.036 64.406a333.318 333.318 0 01-72.608 208.596L134.021 435.44z"/></svg>';
function hn() {
  return {
    IconClose: Ot,
    IconMax: mt,
    IconPin: Lt,
    IconWindow: Et
  };
}
function g(t, n, e) {
  return n != null && Number.isFinite(n) && t < n ? n : e != null && Number.isFinite(e) && t > e ? e : t;
}
function nt(t) {
  return t == null || typeof t != "string" ? !0 : t.length == 0;
}
const it = "__xWindow_resize_prop__", z = 360, ot = 32, v = {
  TOP: I(S.TOP),
  BOTTOM: I(S.BOTTOM),
  LEFT: I(S.LEFT),
  RIGHT: I(S.RIGHT),
  TOP_LEFT: I(S.TOP_LEFT),
  TOP_RIGHT: I(S.TOP_RIGHT),
  BOTTOM_LEFT: I(S.BOTTOM_LEFT),
  BOTTOM_RIGHT: I(S.BOTTOM_RIGHT)
}, Ce = [[a.resizeTop, v.TOP], [a.resizeBottom, v.BOTTOM], [a.resizeLeft, v.LEFT], [a.resizeRight, v.RIGHT], [a.resizeTopLeft, v.TOP_LEFT], [a.resizeTopRight, v.TOP_RIGHT], [a.resizeBottomLeft, v.BOTTOM_LEFT], [a.resizeBottomRight, v.BOTTOM_RIGHT]];
function I(t) {
  return t.toString(2).padStart(4, "0");
}
function st(t, n, e) {
  const c = n.getBoundingClientRect(), d = document.documentElement.getBoundingClientRect(), r = e.relatedWindow != null, o = {};
  if (e.direction[3] == "1") {
    const l = g(c.bottom - g(t.clientY, 0), ot), s = g(t.clientY - d.top, 0, window.innerHeight - l);
    o.height = l, o.top = s;
  }
  if (e.direction[2] == "1") {
    const l = g(g(t.clientY, 0, window.innerHeight) - c.top, ot), s = g(t.clientY - l - d.top, 0, window.innerHeight - l);
    o.height = l, o.top = s;
  }
  if (e.direction[1] == "1") {
    const l = g(c.right - g(t.clientX, 0), z, r ? window.innerWidth - z : window.innerWidth), s = g(t.clientX - d.left, r ? z : 0, window.innerWidth - l);
    o.width = l, o.left = s;
  }
  if (e.direction[0] == "1") {
    const l = g(g(t.clientX, 0) - c.left, z, r ? window.innerWidth - z : window.innerWidth), s = g(t.clientX - l - d.left, 0, window.innerWidth - l - (r ? z : 0));
    o.width = l, o.left = s;
  }
  return o;
}
function ke(t) {
  const n = Y(), e = {
    init: !1,
    direction: null,
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    relatedWindow: null
  };
  function c(l) {
    l.preventDefault(), l.stopPropagation();
    const s = t.windowState, T = t.splitState;
    e.init = !1, e.direction = l.target[it], e.top = s.top, e.left = s.left, e.width = s.width, e.height = s.height, T.mode == i.LEFT && e.direction == i.RIGHT.toString(2).padStart(4, "0") && (e.relatedWindow = D(i.RIGHT)), T.mode == i.RIGHT && e.direction == i.LEFT.toString(2).padStart(4, "0") && (e.relatedWindow = D(i.LEFT)), window.addEventListener("mousemove", d), window.addEventListener("mouseup", r);
  }
  function d(l) {
    l.preventDefault();
    const s = n == null ? void 0 : n.refs.window, T = t.splitState;
    if (e.init || (s.classList.add(a.resizing), e.init = !0), t.splitState.mode != i.NONE) {
      if (e.relatedWindow == null) {
        const p = s.getBoundingClientRect();
        t.windowState.top = p.top, t.windowState.left = p.left, t.windowState.width = p.width, t.windowState.height = p.height, t.splitState.mode = i.NONE;
      }
      e.top = t.windowState.top, e.left = t.windowState.left, e.width = t.windowState.width, e.height = t.windowState.height;
    }
    const h = st(l, s, e);
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
      st(l, s, e) != null && (t.windowState.top = e.top, t.windowState.left = e.left, t.windowState.width = e.width, t.windowState.height = e.height, t.saveWindowState()), s.classList.remove(a.resizing);
      const h = t.splitState;
      if (h.mode == i.LEFT || h.mode == i.RIGHT) {
        const p = e.relatedWindow;
        if (p != null) {
          const O = t.splitState;
          O.width = e.width / window.innerWidth * 100;
          const y = 100 - O.width;
          p.splitState.width = y;
        }
      }
    }
    window.removeEventListener("mousemove", d), window.removeEventListener("mouseup", r);
  }
  const o = Ce.map((l) => Z("div", {
    className: l[0],
    ["." + it]: l[1]
  }));
  return _("div", {
    class: a.resize,
    onMousedown: c
  }, [o]);
}
function qe(t) {
  const n = Y(), e = {
    init: !1,
    left: 0,
    top: 0,
    prevClientX: 0,
    prevClientY: 0,
    splitMode: i.NONE,
    splitWidth: null,
    relatedWindow: null
  };
  function c(o) {
    const s = (n == null ? void 0 : n.refs.window).getBoundingClientRect();
    o.clientY - s.top > 30 || (o.preventDefault(), e.init = !1, e.left = t.windowState.left, e.top = t.windowState.top, e.prevClientX = o.clientX, e.prevClientY = o.clientY, window.addEventListener("mousemove", d), window.addEventListener("mouseup", r));
  }
  function d(o) {
    o.preventDefault();
    const l = n == null ? void 0 : n.refs.window;
    e.init || (l.classList.add(a.dragging), e.init = !0), t.splitState.mode != i.NONE && (t.exitSplitMode(o), e.left = t.windowState.left, e.top = t.windowState.top), e.left = Math.round(e.left + o.clientX - e.prevClientX), e.top = Math.round(e.top + o.clientY - e.prevClientY), e.prevClientX = o.clientX, e.prevClientY = o.clientY, l.style.left = e.left + "px", l.style.top = e.top + "px";
    const s = ue(o);
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
        de();
      }
      l.classList.remove(a.dragging);
    }
    window.removeEventListener("mousemove", d), window.removeEventListener("mouseup", r);
  }
  return { dragStart: c };
}
const Ue = /* @__PURE__ */ F({
  name: "WindowBody",
  props: {
    uid: L,
    body: {
      default: null
    }
  },
  setup(t) {
    const n = ut(V);
    return function() {
      return typeof t.body == "function" ? t.body(n) : t.body;
    };
  }
});
function je(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !x(t);
}
const De = Math.floor(Number.MAX_SAFE_INTEGER / 10) - 1e4;
function Xe() {
  return {
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    focused: !1,
    pinned: !1
  };
}
function Ye() {
  return {
    mode: i.NONE,
    width: 50,
    height: 50
  };
}
function Ze(t, n, e, c, d) {
  return W(() => {
    if (n.value == B.INIT)
      return {
        width: t.width,
        height: t.height,
        left: t.left,
        top: t.top
      };
    const r = t.mask ? null : d.value, o = c.mode;
    return o == i.FULLSCREEN ? {
      zIndex: r
    } : o === i.LEFT || o === i.RIGHT ? {
      top: 0,
      left: o == i.LEFT ? 0 : null,
      right: o == i.RIGHT ? 0 : null,
      width: (c.width ?? 50) + "vw",
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
const St = /* @__PURE__ */ F({
  name: "BaseWindow",
  props: {
    ...$,
    uid: {
      type: L,
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
    slots: c
  }) {
    const d = L.create(t.uid), r = Y(), o = H(B.INIT), l = H(0), s = U(Xe()), T = U(Ye()), h = {
      width: 0,
      height: 0
    }, p = W(() => t.draggable && t.resizable), O = W(() => typeof t.zIndex == "number" && t.zIndex > 0), y = W(() => O.value ? t.zIndex : (s.pinned ? De : 0) + l.value), N = {
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
        return y.value;
      },
      set zIndex(w) {
        l.value = w;
      },
      exitSplitMode: Wt,
      close: k,
      saveWindowState: Q,
      getWindowEl() {
        return r.refs.window;
      },
      useCssClass: Ht,
      useMenus: A
    }, C = t.draggable ? qe(N) : null, vt = p.value ? ke(N) : null, It = W(() => {
      const w = [a.window];
      return o.value == B.INIT && w.push(a.init), T.mode == i.FULLSCREEN && w.push(a.fullscreen), s.focused && w.push(a.focused), w;
    }), Rt = Ze(t, o, s, T, y);
    async function Mt(w) {
      await j();
      const E = w.el.getBoundingClientRect();
      if (o.value == B.INIT) {
        const q = ht().value.length;
        let tt = E.left, et = E.top;
        nt(t.left) && (tt = (window.innerWidth - E.width) / 2), nt(t.top) && (et = window.innerHeight * 0.18 + q * 30), s.width = E.width, s.height = E.height, s.left = tt, s.top = et, o.value = B.MOUNTED, Q();
      }
      K();
    }
    function k(w) {
      t.closeable && (w == null || w.stopPropagation(), n("update:visible", !1));
    }
    function bt() {
      s.focused = !1, j(gt);
    }
    function Bt(w) {
      w.stopPropagation();
    }
    function K() {
      s.focused || _t(d);
    }
    function J() {
      T.mode = T.mode == i.FULLSCREEN ? i.NONE : i.FULLSCREEN;
    }
    function zt() {
      s.pinned = !s.pinned;
    }
    function Q() {
      h.width = s.width, h.height = s.height;
    }
    function Wt(w) {
      s.top = w.clientY - 15, s.left = w.clientX - h.width / 2, s.width = h.width, s.height = h.height, T.mode = i.NONE, T.width = 50, T.height = 50;
    }
    function yt(w) {
      w.stopPropagation();
    }
    function Nt(w) {
      const E = (r == null ? void 0 : r.refs.window).getBoundingClientRect();
      w.clientY - E.top > 30 || (w.preventDefault(), J());
    }
    const Ft = Ct(() => t.visible, () => {
      t.visible || bt();
    });
    ie(d, N), dt(() => {
      n("beforeUnmount"), k(), Tt(d);
    }), kt(() => {
      n("unmount"), Ft(), o.value = B.UNMOUNTED;
    }), qt(V, N), e(N);
    function Ht() {
      return a;
    }
    function A(w = {}) {
      const m = [];
      return t.mask !== !0 && O.value !== !0 && m.push(_("button", {
        onClick: zt,
        type: "button",
        innerHTML: Lt,
        class: s.pinned ? a.pinMenu : a.menu,
        title: "固定"
      }, null)), p.value && m.push(_("button", {
        onClick: J,
        type: "button",
        innerHTML: mt,
        class: a.menu,
        title: "最大化"
      }, null)), t.closeable && m.push(_("button", {
        onClick: k,
        type: "button",
        innerHTML: Ot,
        class: a.closeMenu,
        title: "关闭"
      }, null)), m.length == 0 ? null : (w == null ? void 0 : w.custom) === !0 ? m : _("div", {
        class: a.menus,
        onMousedown: Bt
      }, [m]);
    }
    return function() {
      if (!t.visible)
        return null;
      const w = typeof c.header == "function" ? c.header(A) : null, m = _("div", {
        class: a.main,
        onMousedown: C == null ? void 0 : C.dragStart,
        onDblclick: Nt
      }, [w, _("div", {
        class: a.body,
        onClick: yt
      }, [_(Ue, {
        body: t.body,
        key: d.wid,
        uid: d
      }, null)])]), E = {
        ref: "window",
        id: t.id ?? d.wid,
        onVnodeMounted: Mt,
        onMousedownCapture: K,
        class: It.value,
        style: Rt.value
      };
      let M = Z("div", E, [m, vt]);
      if (t.mask === !0) {
        const q = {
          zIndex: y.value
        };
        M = _("div", {
          class: a.mask,
          style: q
        }, [M]);
      }
      return t.appendToBody ? _(ct, {
        to: "body"
      }, je(M) ? M : {
        default: () => [M]
      }) : M;
    };
  }
});
function Ve(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !x(t);
}
const X = /* @__PURE__ */ F({
  name: "SimpleWindow",
  props: {
    ...$
  },
  setup(t, {
    slots: n,
    attrs: e
  }) {
    const {
      uid: c,
      ...d
    } = e, r = L.create(e.uid), o = H(null);
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
          class: a.header,
          onDblclick: l
        }, [_("i", {
          class: a.logo,
          innerHTML: Et
        }, null), _("div", {
          class: a.title
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
      return _(St, Ut(T, {
        ref: o
      }), Ve(s) ? s : {
        default: () => [s]
      });
    };
  }
});
function $e(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !x(t);
}
const G = /* @__PURE__ */ F({
  name: "BlankWindow",
  props: {
    ...$
  },
  setup(t, {
    slots: n,
    attrs: e
  }) {
    const {
      body: c,
      ...d
    } = n, {
      uid: r,
      ...o
    } = e, l = L.create(e.uid);
    return function() {
      const s = {
        ...t,
        ...o,
        uid: l,
        body: n.default
      };
      return _(St, s, $e(d) ? d : {
        default: () => [d]
      });
    };
  }
});
const Ke = "_splitWindowMask_348ej_1", Je = "_fullscreen_348ej_9", Qe = "_splitLeft_348ej_16", Ae = "_splitRight_348ej_23", tn = "_splitTopLeft_348ej_30", en = "_splitTopRight_348ej_37", nn = "_splitBottomLeft_348ej_44", on = "_splitBottomRight_348ej_51", R = {
  splitWindowMask: Ke,
  fullscreen: Je,
  splitLeft: Qe,
  splitRight: Ae,
  splitTopLeft: tn,
  splitTopRight: en,
  splitBottomLeft: nn,
  splitBottomRight: on
};
function sn(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !x(t);
}
const ln = {
  [i.FULLSCREEN]: R.fullscreen,
  [i.LEFT]: R.splitLeft,
  [i.RIGHT]: R.splitRight,
  [i.TOP_LEFT]: R.splitTopLeft,
  [i.TOP_RIGHT]: R.splitTopRight,
  [i.BOTTOM_LEFT]: R.splitBottomLeft,
  [i.BOTTOM_RIGHT]: R.splitBottomRight
}, lt = {
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
}, rt = /* @__PURE__ */ F({
  name: "WindowManager",
  setup() {
    const t = ht(), n = ce();
    function e(o) {
      const l = o.key;
      if (l == "Escape")
        return wt();
      if (o.ctrlKey && l in lt) {
        const s = ne(), T = Reflect.get(lt, l), h = T[s.splitState.mode] ?? T.fallback;
        s.splitState.mode = h;
        return;
      }
    }
    Jt(), window.addEventListener("keydown", e, !0), dt(() => {
      Qt(), window.removeEventListener("keydown", e, !0);
    });
    function c(o) {
      return o == G.name ? G : X;
    }
    const d = W(() => {
      const o = [R.splitWindowMask], l = ln[n.mode];
      return l != null && o.push(l), o;
    });
    function r() {
      let o = null;
      if (n.mode != i.NONE) {
        const s = {
          zIndex: te() + 1,
          width: n.width ? n.width - 20 + "px" : null
        };
        o = _("div", {
          class: d.value,
          style: s
        }, null);
      }
      return _(ct, {
        to: "body"
      }, {
        default: () => [_(jt, {
          name: "fade"
        }, sn(o) ? o : {
          default: () => [o]
        })]
      });
    }
    return function() {
      return [...t.value.map((l) => {
        const s = oe(l);
        if (s == null)
          return;
        const T = c(s.type);
        return Z(T, s.buildProps());
      }), r()];
    };
  }
});
function rn(t) {
  if (t.length == 1) {
    const n = t[0];
    return n == null ? null : typeof n == "object" ? n : null;
  }
  if (t.length == 2) {
    const [n, e] = t;
    if (typeof n == "string" && e != null)
      return { title: n, body: e };
  }
  if (t.length == 3) {
    const [n, e, c] = t;
    if (typeof n == "string" && e != null)
      return { title: n, body: e, ...c };
  }
  return null;
}
function pn(...t) {
  const n = rn(t);
  return n == null ? (console.error("[xWindow]: 参数有误"), null) : un(n);
}
function un(t) {
  if (!At())
    return console.error("[xWindow] 需要先创建`WindowManager`组件，见文档 " + Dt + " 。"), null;
  const { displayAfterCreate: n, unmountAfterClose: e, afterUnmount: c, ...d } = t, r = {
    uid: null,
    visible: H(n !== !1),
    isUnmounted: !1
  }, o = () => r.visible.value = !0, l = () => {
    r.visible.value = !1, e !== !1 && s();
  }, s = () => {
    r.visible.value && l(), Tt(r.uid), j(gt);
  }, T = Object.assign({}, d, {
    visible: r.visible,
    [Yt](h) {
      h ? o() : l();
    },
    [Zt]() {
      r.isUnmounted = !0;
    },
    [Vt]() {
      typeof c == "function" && c();
    }
  });
  return r.uid = se(P.create(T)), {
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
function dn(t, n) {
  t.component(X.name, X), t.component(G.name, G), t.component(rt.name, rt), ae(n);
}
const cn = Xt, _n = { install: dn, version: cn };
export {
  G as BlankWindow,
  B as ComponentStates,
  X as SimpleWindow,
  rt as WindowManager,
  _n as default,
  dn as install,
  hn as useIcons,
  pn as useWindow,
  wn as useWindowApi,
  Tn as useWindowManager,
  cn as version,
  _n as xWindow
};
