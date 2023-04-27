/*! @dongls/xWindow v0.0.6 https://github.com/dongls/xWindow
Copyright 2023-present dongls
Released under the MIT License */
var Yt = Object.defineProperty;
var Xt = (t, n, e) => n in t ? Yt(t, n, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[n] = e;
var W = (t, n, e) => (Xt(t, typeof n != "symbol" ? n + "" : n, e), e);
import { shallowRef as Zt, reactive as Y, inject as ft, getCurrentInstance as V, h as $, createVNode as _, defineComponent as H, ref as G, computed as B, watch as Vt, onBeforeUnmount as wt, onUnmounted as $t, provide as Kt, Teleport as Tt, isVNode as k, nextTick as X, mergeProps as Jt, Transition as Qt } from "vue";
const At = "https://github.com/dongls/xWindow", te = "0.0.6", K = Symbol(), ee = "onUpdate:visible", ne = "onBeforeUnmount", ie = "onUnmount", T = Object.freeze({
  NONE: 0,
  TOP: 1 << 0,
  BOTTOM: 1 << 1,
  LEFT: 1 << 2,
  RIGHT: 1 << 3
}), I = Object.freeze({
  TOP: T.TOP,
  BOTTOM: T.BOTTOM,
  LEFT: T.LEFT,
  RIGHT: T.RIGHT,
  TOP_LEFT: T.TOP | T.LEFT,
  TOP_RIGHT: T.TOP | T.RIGHT,
  BOTTOM_LEFT: T.BOTTOM | T.LEFT,
  BOTTOM_RIGHT: T.BOTTOM | T.RIGHT
}), i = Object.freeze({
  NONE: T.NONE,
  FULLSCREEN: T.TOP,
  LEFT: T.LEFT,
  RIGHT: T.RIGHT,
  TOP_LEFT: T.TOP | T.LEFT,
  TOP_RIGHT: T.TOP | T.RIGHT,
  BOTTOM_LEFT: T.BOTTOM | T.LEFT,
  BOTTOM_RIGHT: T.BOTTOM | T.RIGHT
}), P = Object.freeze({
  /** 禁止调整窗口大小 */
  NONE: 0,
  /** 允许调整窗口大小，允许全屏（默认）*/
  RESIZE: 1,
  /** 只允许调整窗口大小 */
  RESIZE_ONLY: 2
}), b = Object.freeze({
  /** 窗口初始化，不显示 */
  INIT: 0,
  /** 窗口初始化完成，并展示 */
  MOUNTED: 1,
  /** 窗口已销毁 */
  UNMOUNTED: 2
}), J = {
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
  /** 窗口初始全屏状态，默认为`false` */
  fullscreen: {
    type: Boolean,
    default: !1
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
  /** 窗口调整模式，默认为`RESIZE_MODE.REISZE` */
  resizeMode: {
    type: Number,
    default: P.RESIZE
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
  },
  /** 是否允许固定窗口 */
  pinnable: {
    type: Boolean,
    default: !0
  }
};
let oe = 1e3;
class L {
  /** 统一使用`UID.create`方法创建 */
  constructor() {
    W(this, "value");
    Reflect.defineProperty(this, "value", {
      enumerable: !0,
      configurable: !1,
      writable: !1,
      value: oe++
    });
  }
  get wid() {
    return "window--" + this.value;
  }
  static create(n) {
    return n instanceof L ? n : new L();
  }
}
class x {
  constructor(n) {
    W(this, "uid");
    W(this, "type");
    W(this, "visible");
    W(this, "others");
    W(this, "body");
    const { visible: e, body: f, type: d, ...r } = n;
    this.uid = L.create(), this.type = d, this.visible = e, this.body = f, this.others = r;
  }
  static create(n) {
    return n instanceof x ? n : new x(n);
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
function se(t) {
  const { clientX: n, clientY: e } = t, { innerWidth: f, innerHeight: d } = window;
  let r = T.NONE;
  return e <= 5 && (r |= T.TOP), e >= d - 5 && (r |= T.BOTTOM), n <= 5 && (r |= T.LEFT), n >= f - 5 && (r |= T.RIGHT), r;
}
const u = {
  isMounted: !1,
  zIndex: 1e3,
  stack: /* @__PURE__ */ new Map(),
  ghost: Zt([]),
  options: /* @__PURE__ */ new Map(),
  topWindow: null,
  previewState: Y({
    mode: i.NONE,
    width: null,
    height: null
  })
};
function le() {
  u.isMounted = !0;
}
function re() {
  u.isMounted = !1, u.topWindow = null, u.ghost.value = [], u.stack.clear(), u.options.clear();
}
function ue() {
  return u.isMounted;
}
function ht() {
  return u.zIndex;
}
function pt() {
  return u.zIndex += 1;
}
function de() {
  const t = u.topWindow;
  return t ? t.zIndex : 1;
}
function ce(t) {
  typeof t == "number" && Number.isFinite(t) && (u.zIndex = Math.floor(t));
}
function _t() {
  return u.topWindow;
}
function ae(t, n) {
  u.stack.set(t, n);
}
function gt(t) {
  u.stack.delete(t), u.options.delete(t);
  const n = u.ghost.value.indexOf(t);
  if (n >= 0) {
    const e = u.ghost.value;
    e.splice(n, 1), u.ghost.value = e.slice();
  }
}
function Ot() {
  u.stack.size == 0 || u.topWindow == null || u.topWindow.close();
}
function fe(t) {
  return u.options.get(t);
}
function we(t) {
  const n = u.ghost.value;
  return n.push(t.uid), u.ghost.value = n.slice(), u.options.set(t.uid, t), t.uid;
}
function Te(t) {
  return u.stack.get(t);
}
function Et() {
  return u.ghost;
}
function mt(t) {
  if (u.topWindow = t, t != null) {
    for (const n of u.stack.values()) {
      const e = n.windowState;
      e.focused = n === t;
    }
    t.zIndex < ht() && (t.zIndex = pt());
  }
}
function St(t) {
  const n = u.stack.get(t);
  mt(n);
}
function Lt() {
  const t = he();
  mt(t);
}
function he() {
  return u.stack.size == 0 ? null : Array.from(u.stack.values()).filter((n) => n.visible).sort((n, e) => e.zIndex - n.zIndex)[0];
}
function pe(t) {
  let n = null;
  const e = se(t);
  if (u.previewState.mode = e, (e == i.LEFT || e == i.RIGHT) && (n = Z(e == i.LEFT ? i.RIGHT : i.LEFT), n)) {
    const f = window.innerWidth - n.getWindowEl().offsetWidth;
    u.previewState.width = f;
  }
  return {
    mode: u.previewState.mode,
    width: u.previewState.width,
    relatedWindow: n
  };
}
function _e() {
  return u.previewState.mode = i.NONE, u.previewState.height = null, u.previewState.width = null, i.NONE;
}
function ge() {
  return u.previewState;
}
function Z(t) {
  let n = null;
  for (const e of u.stack.values())
    e.splitState.mode === t && (n == null || e.zIndex > n.zIndex) && (n = e);
  return n;
}
function Oe() {
  return u.ghost.value.length;
}
function En() {
  return {
    closeTopWindow: Ot,
    getTopWindow: _t,
    getTopZIndex: pt,
    getWindowApi: Te,
    getWindowCount: Oe,
    getZIndex: ht,
    setFocusedWindow: St
  };
}
function Ee(t) {
  ce(t == null ? void 0 : t.zIndex);
}
function mn() {
  return ft(K);
}
const me = "_window_1seq0_7", Se = "_dragging_1seq0_17", Le = "_resizing_1seq0_17", Ie = "_fullscreen_1seq0_21", ve = "_focused_1seq0_31", Re = "_header_1seq0_34", Me = "_menu_1seq0_38", We = "_logo_1seq0_41", be = "_main_1seq0_45", ze = "_init_1seq0_52", Be = "_title_1seq0_70", Ne = "_menus_1seq0_80", ye = "_body_1seq0_86", Fe = "_footer_1seq0_91", He = "_closeMenu_1seq0_142 _menu_1seq0_38", Pe = "_pinMenu_1seq0_153 _menu_1seq0_38", Ge = "_resize_1seq0_172", xe = "_resizeBar_1seq0_176", Ce = "_resizeTop_1seq0_181 _resizeBar_1seq0_176", ke = "_resizeBottom_1seq0_182 _resizeBar_1seq0_176", qe = "_resizeRight_1seq0_198 _resizeBar_1seq0_176", Ue = "_resizeLeft_1seq0_199 _resizeBar_1seq0_176", De = "_resizeTopLeft_1seq0_215 _resizeBar_1seq0_176", je = "_resizeBottomLeft_1seq0_216 _resizeBar_1seq0_176", Ye = "_resizeTopRight_1seq0_217 _resizeBar_1seq0_176", Xe = "_resizeBottomRight_1seq0_218 _resizeBar_1seq0_176", Ze = "_mask_1seq0_248", w = {
  window: me,
  dragging: Se,
  resizing: Le,
  fullscreen: Ie,
  focused: ve,
  header: Re,
  menu: Me,
  logo: We,
  main: be,
  init: ze,
  title: Be,
  menus: Ne,
  body: ye,
  footer: Fe,
  closeMenu: He,
  pinMenu: Pe,
  resize: Ge,
  resizeBar: xe,
  resizeTop: Ce,
  resizeBottom: ke,
  resizeRight: qe,
  resizeLeft: Ue,
  resizeTopLeft: De,
  resizeBottomLeft: je,
  resizeTopRight: Ye,
  resizeBottomRight: Xe,
  mask: Ze
}, It = '<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M590.265 511.987l305.521-305.468c21.617-21.589 21.617-56.636.027-78.252-21.616-21.617-56.663-21.617-78.279 0L512.012 433.735 206.544 128.213c-21.617-21.617-56.635-21.617-78.252 0-21.616 21.589-21.616 56.635-.027 78.252L433.76 511.987 128.211 817.482c-21.617 21.59-21.617 56.635 0 78.251 10.808 10.81 24.967 16.213 39.125 16.213 14.159 0 28.318-5.403 39.126-16.213l305.522-305.468L817.48 895.788C828.289 906.597 842.447 912 856.606 912s28.317-5.403 39.125-16.212c21.618-21.59 21.618-56.636.028-78.252L590.265 511.987z"/></svg>', vt = '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5228" width="64" height="64"><path d="M97.74775349 97.74775349h828.50449302v828.50449302H97.74775349V97.74775349z m103.56306133 103.56306133v621.37837036h621.37837036V201.31081482H201.31081482z" fill="currentColor"></path></svg>', Rt = '<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M38.794 124.791v778.495h946.412V124.791H38.794zm896.678 728.033H89.292v-460.9h846.18v460.9z"/></svg>', Mt = '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M738.793 681.382v-48.331l88.242-88.243a298.676 298.676 0 00156.712-83.482 38.836 38.836 0 000-54.923l-366.15-366.15a38.836 38.836 0 00-54.923 0 298.52 298.52 0 00-83.519 156.749l-88.169 88.169h-48.332a411.145 411.145 0 00-292.59 121.232c-15.16 15.159-15.16 39.764 0 54.923L278.906 690.17 86.642 882.436a38.836 38.836 0 1054.922 54.922l192.23-192.229 228.844 228.845a38.836 38.836 0 0054.922 0 411.042 411.042 0 00121.233-292.592zM134.02 435.44a333.473 333.473 0 01208.56-72.571l64.406.037a38.836 38.836 0 0027.461-11.351L544.292 241.71a38.68 38.68 0 0011.351-27.462 180.096 180.096 0 0136.798-89.01L898.8 431.593a180.925 180.925 0 01-89.12 36.835 38.836 38.836 0 00-27.462 11.35L672.373 589.626c-7.287 7.286-11.387 17.173-11.35 27.461l.036 64.406a333.318 333.318 0 01-72.608 208.596L134.021 435.44z"/></svg>', Wt = '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M845.40952426 212.52063539H65.21904746v702.17142826h780.1904768V212.52063539z m-702.17142933 624.1523808V290.53968285h624.1523808v546.13333334H143.23809493z" fill="currentColor"></path><path d="M981.53650809 76.3936505H201.34603129v78.01904746h702.17142933v624.15238187h78.01904747V76.3936505z" fill="currentColor"></path></svg>';
function Sn() {
  return {
    IconClose: It,
    IconMax: vt,
    IconPin: Mt,
    IconWindow: Rt,
    IconRestore: Wt
  };
}
function O(t, n, e) {
  return n != null && Number.isFinite(n) && t < n ? n : e != null && Number.isFinite(e) && t > e ? e : t;
}
function lt(t) {
  return t == null || typeof t != "string" ? !0 : t.length == 0;
}
const rt = "__xWindow_resize_prop__", z = 360, ut = 32, v = {
  TOP: R(I.TOP),
  BOTTOM: R(I.BOTTOM),
  LEFT: R(I.LEFT),
  RIGHT: R(I.RIGHT),
  TOP_LEFT: R(I.TOP_LEFT),
  TOP_RIGHT: R(I.TOP_RIGHT),
  BOTTOM_LEFT: R(I.BOTTOM_LEFT),
  BOTTOM_RIGHT: R(I.BOTTOM_RIGHT)
}, Ve = [[w.resizeTop, v.TOP], [w.resizeBottom, v.BOTTOM], [w.resizeLeft, v.LEFT], [w.resizeRight, v.RIGHT], [w.resizeTopLeft, v.TOP_LEFT], [w.resizeTopRight, v.TOP_RIGHT], [w.resizeBottomLeft, v.BOTTOM_LEFT], [w.resizeBottomRight, v.BOTTOM_RIGHT]];
function R(t) {
  return t.toString(2).padStart(4, "0");
}
function dt(t, n, e) {
  const f = n.getBoundingClientRect(), d = document.documentElement.getBoundingClientRect(), r = e.relatedWindow != null, s = {};
  if (e.direction[3] == "1") {
    const l = O(f.bottom - O(t.clientY, 0), ut), o = O(t.clientY - d.top, 0, window.innerHeight - l);
    s.height = l, s.top = o;
  }
  if (e.direction[2] == "1") {
    const l = O(O(t.clientY, 0, window.innerHeight) - f.top, ut), o = O(t.clientY - l - d.top, 0, window.innerHeight - l);
    s.height = l, s.top = o;
  }
  if (e.direction[1] == "1") {
    const l = O(f.right - O(t.clientX, 0), z, r ? window.innerWidth - z : window.innerWidth), o = O(t.clientX - d.left, r ? z : 0, window.innerWidth - l);
    s.width = l, s.left = o;
  }
  if (e.direction[0] == "1") {
    const l = O(O(t.clientX, 0) - f.left, z, r ? window.innerWidth - z : window.innerWidth), o = O(t.clientX - l - d.left, 0, window.innerWidth - l - (r ? z : 0));
    s.width = l, s.left = o;
  }
  return s;
}
function $e(t) {
  const n = V(), e = {
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
    const o = t.windowState, a = t.splitState;
    e.init = !1, e.direction = l.target[rt], e.top = o.top, e.left = o.left, e.width = o.width, e.height = o.height, a.mode == i.LEFT && e.direction == i.RIGHT.toString(2).padStart(4, "0") && (e.relatedWindow = Z(i.RIGHT)), a.mode == i.RIGHT && e.direction == i.LEFT.toString(2).padStart(4, "0") && (e.relatedWindow = Z(i.LEFT)), window.addEventListener("mousemove", d), window.addEventListener("mouseup", r);
  }
  function d(l) {
    l.preventDefault();
    const o = n == null ? void 0 : n.refs.window, a = t.splitState;
    if (e.init || (o.classList.add(w.resizing), e.init = !0), t.splitState.mode != i.NONE) {
      if (e.relatedWindow == null) {
        const p = o.getBoundingClientRect();
        t.windowState.top = p.top, t.windowState.left = p.left, t.windowState.width = p.width, t.windowState.height = p.height, t.splitState.mode = i.NONE;
      }
      e.top = t.windowState.top, e.left = t.windowState.left, e.width = t.windowState.width, e.height = t.windowState.height;
    }
    const h = dt(l, o, e);
    for (const p in h) {
      const E = Math.round(h[p]);
      Reflect.set(e, p, E), Reflect.set(o.style, p, E + "px");
    }
    if (a.mode == i.LEFT || a.mode == i.RIGHT) {
      const p = e.relatedWindow;
      if (p != null) {
        const E = p.getWindowEl();
        Reflect.set(E.style, "width", window.innerWidth - e.width + "px");
      }
    }
  }
  function r(l) {
    if (l.preventDefault(), e.init) {
      const o = n == null ? void 0 : n.refs.window;
      dt(l, o, e) != null && (t.windowState.top = e.top, t.windowState.left = e.left, t.windowState.width = e.width, t.windowState.height = e.height, t.saveWindowState()), o.classList.remove(w.resizing);
      const h = t.splitState;
      if (h.mode == i.LEFT || h.mode == i.RIGHT) {
        const p = e.relatedWindow;
        if (p != null) {
          const E = t.splitState;
          E.width = e.width / window.innerWidth * 100;
          const N = 100 - E.width;
          p.splitState.width = N;
        }
      }
    }
    window.removeEventListener("mousemove", d), window.removeEventListener("mouseup", r);
  }
  const s = Ve.map((l) => $("div", {
    className: l[0],
    ["." + rt]: l[1]
  }));
  return _("div", {
    class: w.resize,
    onMousedown: f
  }, [s]);
}
function Ke(t) {
  const n = V(), e = {
    init: !1,
    left: 0,
    top: 0,
    prevClientX: 0,
    prevClientY: 0,
    splitMode: i.NONE,
    splitWidth: null,
    relatedWindow: null
  };
  function f(s) {
    const o = (n == null ? void 0 : n.refs.window).getBoundingClientRect();
    s.clientY - o.top > 30 || (s.preventDefault(), e.init = !1, e.left = t.windowState.left, e.top = t.windowState.top, e.prevClientX = s.clientX, e.prevClientY = s.clientY, window.addEventListener("mousemove", d), window.addEventListener("mouseup", r));
  }
  function d(s) {
    s.preventDefault();
    const l = n == null ? void 0 : n.refs.window;
    e.init || (l.classList.add(w.dragging), e.init = !0), t.splitState.mode != i.NONE && (t.exitSplitMode(s), e.left = t.windowState.left, e.top = t.windowState.top), e.left = Math.round(e.left + s.clientX - e.prevClientX), e.top = Math.round(e.top + s.clientY - e.prevClientY), e.prevClientX = s.clientX, e.prevClientY = s.clientY, l.style.left = e.left + "px", l.style.top = e.top + "px";
    const o = pe(s);
    e.splitMode = o.mode, e.splitWidth = o.width, e.relatedWindow = o.relatedWindow;
  }
  function r(s) {
    if (s.preventDefault(), e.init) {
      const l = n == null ? void 0 : n.refs.window;
      if (t.windowState.top = e.top, t.windowState.left = e.left, e.splitMode !== i.NONE) {
        if (t.splitState.mode = e.splitMode, e.relatedWindow) {
          const o = e.splitWidth / window.innerWidth * 100;
          t.splitState.width = o, e.relatedWindow.splitState.width = 100 - o;
        }
        _e();
      }
      l.classList.remove(w.dragging);
    }
    window.removeEventListener("mousemove", d), window.removeEventListener("mouseup", r);
  }
  return { dragStart: f };
}
const Je = /* @__PURE__ */ H({
  name: "WindowBody",
  props: {
    uid: L,
    body: {
      default: null
    }
  },
  setup(t) {
    const n = ft(K);
    return function() {
      return typeof t.body == "function" ? t.body(n) : t.body;
    };
  }
});
function Qe(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !k(t);
}
const Ae = Math.floor(Number.MAX_SAFE_INTEGER / 10) - 1e4;
function tn() {
  return {
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    focused: !1,
    pinned: !1
  };
}
function en() {
  return {
    mode: i.NONE,
    width: 50,
    height: 50
  };
}
function nn(t, n, e, f, d) {
  return B(() => {
    if (n.value == b.INIT)
      return {
        width: t.width,
        height: t.height,
        left: t.left,
        top: t.top
      };
    const r = t.mask ? null : d.value, s = f.mode;
    return s == i.FULLSCREEN ? {
      zIndex: r
    } : s === i.LEFT || s === i.RIGHT ? {
      top: 0,
      left: s == i.LEFT ? 0 : null,
      right: s == i.RIGHT ? 0 : null,
      width: (f.width ?? 50) + "vw",
      height: "100vh",
      zIndex: r
    } : s == i.TOP_LEFT || s == i.TOP_RIGHT || s == i.BOTTOM_LEFT || s == i.BOTTOM_RIGHT ? {
      top: s == i.TOP_LEFT || s == i.TOP_RIGHT ? 0 : null,
      left: s == i.TOP_LEFT || s == i.BOTTOM_LEFT ? 0 : null,
      right: s == i.TOP_RIGHT || s == i.BOTTOM_RIGHT ? 0 : null,
      bottom: s == i.BOTTOM_LEFT || s == i.BOTTOM_RIGHT ? 0 : null,
      width: "50vw",
      height: "50vh",
      zIndex: r
    } : {
      top: e.top + "px",
      left: e.left + "px",
      width: e.width + "px",
      height: n.value == b.INIT ? null : e.height + "px",
      zIndex: r
    };
  });
}
const bt = /* @__PURE__ */ H({
  name: "BaseWindow",
  props: {
    ...J,
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
    slots: f
  }) {
    const d = L.create(t.uid), r = V(), s = G(b.INIT), l = G(0), o = Y(tn()), a = Y(en()), h = {
      width: 0,
      height: 0
    }, p = B(() => t.resizeMode != P.NONE), E = B(() => typeof t.zIndex == "number" && t.zIndex > 0), N = B(() => E.value ? t.zIndex : (o.pinned ? Ae : 0) + l.value), y = {
      get uid() {
        return d;
      },
      get visible() {
        return t.visible;
      },
      get windowState() {
        return o;
      },
      get resizable() {
        return p.value;
      },
      get draggable() {
        return t.draggable;
      },
      get splitState() {
        return a;
      },
      get zIndex() {
        return N.value;
      },
      set zIndex(c) {
        l.value = c;
      },
      exitSplitMode: Ct,
      close: U,
      saveWindowState: et,
      getWindowEl() {
        return r.refs.window;
      },
      useCssClass: Dt,
      useMenus: nt
    }, q = t.draggable ? Ke(y) : null, Bt = p.value ? $e(y) : null, Nt = B(() => {
      const c = [w.window];
      return s.value == b.INIT && c.push(w.init), a.mode == i.FULLSCREEN && c.push(w.fullscreen), o.focused && c.push(w.focused), c;
    }), yt = nn(t, s, o, a, N);
    async function Ft(c) {
      await X();
      const m = c.el.getBoundingClientRect();
      if (s.value == b.INIT) {
        const j = Et().value.length;
        let it = m.left, ot = m.top, st = m.width, jt = m.height;
        lt(t.left) && (it = (window.innerWidth - st) / 2), lt(t.top) && (ot = window.innerHeight * 0.12 + (j - 1) * 30), o.width = st, o.height = jt, o.left = it, o.top = ot, t.fullscreen && D(), s.value = b.MOUNTED, et();
      }
      tt();
    }
    function U(c = !1) {
      !t.closeable && c !== !0 || n("update:visible", !1);
    }
    function Ht(c) {
      t.closeable && (c == null || c.stopPropagation(), U());
    }
    function Pt() {
      o.focused = !1, X(Lt);
    }
    function Gt(c) {
      c.stopPropagation();
    }
    function tt() {
      o.focused || St(d);
    }
    function D() {
      if (t.resizeMode !== P.RESIZE)
        return;
      if (a.mode == i.NONE)
        return a.mode = i.FULLSCREEN;
      const {
        innerWidth: c,
        innerHeight: g
      } = window;
      o.top < 0 && (o.top = 0), o.top > g - o.height && (o.top = g - o.height), o.left < 0 && (o.left = 0), o.left > c - o.width && (o.left = c - o.width), a.mode = i.NONE;
    }
    function xt() {
      o.pinned = !o.pinned;
    }
    function et() {
      h.width = o.width, h.height = o.height;
    }
    function Ct(c) {
      o.top = c.clientY - 15, o.left = c.clientX - h.width / 2, o.width = h.width, o.height = h.height, a.mode = i.NONE, a.width = 50, a.height = 50;
    }
    function kt(c) {
      c.stopPropagation();
    }
    function qt(c) {
      const m = (r == null ? void 0 : r.refs.window).getBoundingClientRect();
      c.clientY - m.top > 30 || (c.preventDefault(), D());
    }
    const Ut = Vt(() => t.visible, () => {
      t.visible || Pt();
    });
    ae(d, y), wt(() => {
      n("beforeUnmount"), U(), gt(d);
    }), $t(() => {
      n("unmount"), Ut(), s.value = b.UNMOUNTED;
    }), Kt(K, y), e(y);
    function Dt() {
      return w;
    }
    function nt(c = {}) {
      const g = [];
      if (t.pinnable && t.mask !== !0 && E.value !== !0 && g.push(_("button", {
        onClick: xt,
        type: "button",
        innerHTML: Mt,
        class: o.pinned ? w.pinMenu : w.menu,
        title: "固定"
      }, null)), t.resizeMode == P.RESIZE) {
        const m = a.mode == i.FULLSCREEN ? Wt : vt, S = a.mode == i.FULLSCREEN ? "还原" : "最大化";
        g.push(_("button", {
          onClick: D,
          type: "button",
          innerHTML: m,
          class: w.menu,
          title: S
        }, null));
      }
      return t.closeable && g.push(_("button", {
        onClick: Ht,
        type: "button",
        innerHTML: It,
        class: w.closeMenu,
        title: "关闭"
      }, null)), g.length == 0 ? null : (c == null ? void 0 : c.custom) === !0 ? g : _("div", {
        class: w.menus,
        onMousedown: Gt
      }, [g]);
    }
    return function() {
      if (!t.visible)
        return null;
      const c = typeof f.header == "function" ? f.header(nt) : null, g = _("div", {
        class: w.main,
        onMousedown: q == null ? void 0 : q.dragStart,
        onDblclick: qt
      }, [c, _("div", {
        class: w.body,
        onClick: kt
      }, [_(Je, {
        body: t.body,
        key: d.wid,
        uid: d
      }, null)])]), m = {
        ref: "window",
        id: t.id ?? d.wid,
        onVnodeMounted: Ft,
        onMousedownCapture: tt,
        class: Nt.value,
        style: yt.value
      };
      let S = $("div", m, [g, Bt]);
      if (t.mask === !0) {
        const j = {
          zIndex: N.value
        };
        S = _("div", {
          class: w.mask,
          style: j
        }, [S]);
      }
      return t.appendToBody ? _(Tt, {
        to: "body"
      }, Qe(S) ? S : {
        default: () => [S]
      }) : S;
    };
  }
});
function on(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !k(t);
}
const F = /* @__PURE__ */ H({
  name: "BlankWindow",
  props: {
    ...J
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
      ...s
    } = e, l = L.create(e.uid);
    return function() {
      const o = {
        ...t,
        ...s,
        uid: l,
        body: n.default
      };
      return _(bt, o, on(d) ? d : {
        default: () => [d]
      });
    };
  }
});
function sn(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !k(t);
}
const C = /* @__PURE__ */ H({
  name: "SimpleWindow",
  props: {
    ...J
  },
  setup(t, {
    slots: n,
    attrs: e
  }) {
    const {
      uid: f,
      ...d
    } = e, r = L.create(e.uid), s = G(null);
    function l(a) {
      a.preventDefault();
      const h = s.value;
      if (h == null)
        return;
      const p = h.windowState.splitMode;
      h.windowState.splitMode = p == i.FULLSCREEN ? i.NONE : i.FULLSCREEN;
    }
    const o = {
      header(a) {
        const h = a();
        return _("div", {
          class: w.header,
          onDblclick: l
        }, [_("i", {
          class: w.logo,
          innerHTML: Rt
        }, null), _("div", {
          class: w.title
        }, [t.title ?? "新窗口"]), h]);
      }
    };
    return function() {
      const a = {
        ...t,
        ...d,
        uid: r,
        body: n.default
      };
      return _(bt, Jt(a, {
        ref: s
      }), sn(o) ? o : {
        default: () => [o]
      });
    };
  }
}), zt = Object.freeze({
  SIMPLE_WINDOW: C.name,
  BLANK_WINDOW: F.name
});
const ln = "_splitWindowMask_348ej_1", rn = "_fullscreen_348ej_9", un = "_splitLeft_348ej_16", dn = "_splitRight_348ej_23", cn = "_splitTopLeft_348ej_30", an = "_splitTopRight_348ej_37", fn = "_splitBottomLeft_348ej_44", wn = "_splitBottomRight_348ej_51", M = {
  splitWindowMask: ln,
  fullscreen: rn,
  splitLeft: un,
  splitRight: dn,
  splitTopLeft: cn,
  splitTopRight: an,
  splitBottomLeft: fn,
  splitBottomRight: wn
};
function Tn(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !k(t);
}
const hn = {
  [i.FULLSCREEN]: M.fullscreen,
  [i.LEFT]: M.splitLeft,
  [i.RIGHT]: M.splitRight,
  [i.TOP_LEFT]: M.splitTopLeft,
  [i.TOP_RIGHT]: M.splitTopRight,
  [i.BOTTOM_LEFT]: M.splitBottomLeft,
  [i.BOTTOM_RIGHT]: M.splitBottomRight
}, ct = {
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
}, at = /* @__PURE__ */ H({
  name: "WindowManager",
  setup() {
    const t = Et(), n = ge();
    function e(s) {
      const l = s.key;
      if (l == "Escape")
        return Ot();
      if (s.ctrlKey && l in ct) {
        const o = _t();
        if (!o.resizable || !o.draggable)
          return;
        const a = Reflect.get(ct, l), h = a[o.splitState.mode] ?? a.fallback;
        o.splitState.mode = h;
        return;
      }
    }
    le(), window.addEventListener("keydown", e, !0), wt(() => {
      re(), window.removeEventListener("keydown", e, !0);
    });
    function f(s) {
      return s == F.name ? F : C;
    }
    const d = B(() => {
      const s = [M.splitWindowMask], l = hn[n.mode];
      return l != null && s.push(l), s;
    });
    function r() {
      let s = null;
      if (n.mode != i.NONE) {
        const o = {
          zIndex: de() + 1,
          width: n.width ? n.width - 20 + "px" : null
        };
        s = _("div", {
          class: d.value,
          style: o
        }, null);
      }
      return _(Tt, {
        to: "body"
      }, {
        default: () => [_(Qt, {
          name: "fade"
        }, Tn(s) ? s : {
          default: () => [s]
        })]
      });
    }
    return function() {
      return [...t.value.map((l) => {
        const o = fe(l);
        if (o == null)
          return;
        const a = f(o.type);
        return $(a, o.buildProps());
      }), r()];
    };
  }
});
function Q(t) {
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
    const [n, e, f] = t;
    if (typeof n == "string" && e != null)
      return { title: n, body: e, ...f };
  }
  return null;
}
function Ln(...t) {
  const n = Q(t);
  return n == null ? (console.error("[xWindow]: 参数有误"), null) : A(n);
}
function In(...t) {
  const n = Q(t);
  return n == null ? (console.error("[xWindow]: 参数有误"), null) : (n.type = zt.BLANK_WINDOW, A(n));
}
function vn(...t) {
  const n = Q(t);
  return n == null ? (console.error("[xWindow]: 参数有误"), null) : (n.type = zt.SIMPLE_WINDOW, A(n));
}
function A(t) {
  if (!ue())
    return console.error("[xWindow] 需要先创建`WindowManager`组件，见文档 " + At + " 。"), null;
  const { displayAfterCreate: n, unmountAfterClose: e, afterUnmount: f, ...d } = t, r = {
    uid: null,
    visible: G(n !== !1),
    isUnmounted: !1
  }, s = () => r.visible.value = !0, l = () => {
    r.visible.value = !1, e !== !1 && o();
  }, o = () => {
    r.visible.value && l(), gt(r.uid), X(Lt);
  }, a = Object.assign({}, d, {
    visible: r.visible,
    [ee](h) {
      h ? s() : l();
    },
    [ne]() {
      r.isUnmounted = !0;
    },
    [ie]() {
      typeof f == "function" && f();
    }
  });
  return r.uid = we(x.create(a)), {
    uid: r.uid,
    get isUnmounted() {
      return r.isUnmounted;
    },
    get visible() {
      return r.visible.value;
    },
    show: s,
    close: l,
    unmount: o
  };
}
function pn(t, n) {
  t.component(C.name, C), t.component(F.name, F), t.component(at.name, at), Ee(n);
}
const _n = te, Rn = { install: pn, version: _n };
export {
  F as BlankWindow,
  P as RESIZE_MODE,
  C as SimpleWindow,
  b as WINDOW_STATES,
  at as WindowManager,
  Rn as default,
  pn as install,
  In as useBlankWindow,
  Sn as useIcons,
  vn as useSimpleWindow,
  Ln as useWindow,
  mn as useWindowApi,
  En as useWindowManager,
  _n as version,
  Rn as xWindow
};
