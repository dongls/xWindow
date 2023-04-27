/*! @dongls/xWindow v0.0.6 https://github.com/dongls/xWindow
Copyright 2023-present dongls
Released under the MIT License */
var Xt = Object.defineProperty;
var Zt = (t, n, e) => n in t ? Xt(t, n, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[n] = e;
var b = (t, n, e) => (Zt(t, typeof n != "symbol" ? n + "" : n, e), e);
import { shallowRef as Vt, reactive as X, inject as ft, getCurrentInstance as K, h as Q, createVNode as g, defineComponent as F, ref as G, computed as B, watch as Kt, onBeforeUnmount as wt, onUnmounted as Qt, provide as At, Teleport as Tt, isVNode as C, nextTick as Z, mergeProps as Jt, Transition as $t } from "vue";
const qt = "https://github.com/dongls/xWindow", te = "0.0.6", A = Symbol(), ee = "onUpdate:visible", ne = "onBeforeUnmount", ie = "onUnmount", T = Object.freeze({
  NONE: 0,
  TOP: 1 << 0,
  BOTTOM: 1 << 1,
  LEFT: 1 << 2,
  RIGHT: 1 << 3
}), L = Object.freeze({
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
}), _ = Object.freeze({
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
class v {
  /** 统一使用`UID.create`方法创建 */
  constructor() {
    b(this, "value");
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
    return n instanceof v ? n : new v();
  }
}
class x {
  constructor(n) {
    b(this, "uid");
    b(this, "type");
    b(this, "visible");
    b(this, "others");
    b(this, "body");
    const { visible: e, body: f, type: d, ...r } = n;
    this.uid = v.create(), this.type = d, this.visible = e, this.body = f, this.others = r;
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
function le(t) {
  const { clientX: n, clientY: e } = t, { innerWidth: f, innerHeight: d } = window;
  let r = T.NONE;
  return e <= 5 && (r |= T.TOP), e >= d - 5 && (r |= T.BOTTOM), n <= 5 && (r |= T.LEFT), n >= f - 5 && (r |= T.RIGHT), r;
}
const u = {
  isMounted: !1,
  zIndex: 1e3,
  stack: /* @__PURE__ */ new Map(),
  ghost: Vt([]),
  options: /* @__PURE__ */ new Map(),
  topWindow: null,
  previewState: X({
    mode: i.NONE,
    width: null,
    height: null
  })
};
function se() {
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
function gt() {
  return u.topWindow;
}
function ae(t, n) {
  u.stack.set(t, n);
}
function Ot(t) {
  u.stack.delete(t), u.options.delete(t);
  const n = u.ghost.value.indexOf(t);
  if (n >= 0) {
    const e = u.ghost.value;
    e.splice(n, 1), u.ghost.value = e.slice();
  }
}
function Et() {
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
function mt() {
  return u.ghost;
}
function St(t) {
  if (u.topWindow = t, t != null) {
    for (const n of u.stack.values()) {
      const e = n.windowState;
      e.focused = n === t;
    }
    t.zIndex < ht() && (t.zIndex = pt());
  }
}
function It(t) {
  const n = u.stack.get(t);
  St(n);
}
function vt() {
  const t = he();
  St(t);
}
function he() {
  return u.stack.size == 0 ? null : Array.from(u.stack.values()).filter((n) => n.visible).sort((n, e) => e.zIndex - n.zIndex)[0];
}
function pe(t) {
  let n = null;
  const e = le(t);
  if (u.previewState.mode = e, (e == i.LEFT || e == i.RIGHT) && (n = V(e == i.LEFT ? i.RIGHT : i.LEFT), n)) {
    const f = window.innerWidth - n.getWindowEl().offsetWidth;
    u.previewState.width = f;
  }
  return {
    mode: u.previewState.mode,
    width: u.previewState.width,
    relatedWindow: n
  };
}
function ge() {
  return u.previewState.mode = i.NONE, u.previewState.height = null, u.previewState.width = null, i.NONE;
}
function Oe() {
  return u.previewState;
}
function V(t) {
  let n = null;
  for (const e of u.stack.values())
    e.splitState.mode === t && (n == null || e.zIndex > n.zIndex) && (n = e);
  return n;
}
function Ee() {
  return u.ghost.value.length;
}
function mn() {
  return {
    closeTopWindow: Et,
    getTopWindow: gt,
    getTopZIndex: pt,
    getWindowApi: Te,
    getWindowCount: Ee,
    getZIndex: ht,
    setFocusedWindow: It
  };
}
function me(t) {
  ce(t == null ? void 0 : t.zIndex);
}
function Sn() {
  return ft(A);
}
const Se = "H7JlXKXGTK4-", Ie = "PzRl2fA8ugU-", ve = "EHL7-6c1hxo-", Le = "_4ZVmcNd62BM-", Me = "iU5hVdW6G24-", Re = "B-jw6ufWF2I-", We = "_8ieSHFWGBgo-", be = "_9HQI-NflpPY-", _e = "e746h5hsuG0-", Ne = "nI2hYl14Img-", Be = "oWTG6bvA3Xg-", ye = "Yz3R0x2mXE8-", ze = "xw3-QoH59gg-", He = "K-SrrvkFQ7c-", Fe = "QSq10DrgJLk- _8ieSHFWGBgo-", Pe = "Id-Jv1pgyi4- _8ieSHFWGBgo-", Ge = "_4HqxhZPrrOU-", xe = "_1wmTr8SgYkw-", ke = "AVGSdUwykow- _1wmTr8SgYkw-", Ce = "MWNRixkj-RQ- _1wmTr8SgYkw-", Ue = "wGpk4F7JAIo- _1wmTr8SgYkw-", De = "BmA3h5iOK6E- _1wmTr8SgYkw-", Ye = "fmiPoabUvPU- _1wmTr8SgYkw-", je = "M7KJ4hUxg4A- _1wmTr8SgYkw-", Xe = "_-6Gcri48YtQ- _1wmTr8SgYkw-", Ze = "l5iXh0eYtm4- _1wmTr8SgYkw-", Ve = "ktQHHANby0U-", w = {
  window: Se,
  dragging: Ie,
  resizing: ve,
  fullscreen: Le,
  focused: Me,
  header: Re,
  menu: We,
  logo: be,
  main: _e,
  init: Ne,
  title: Be,
  menus: ye,
  body: ze,
  footer: He,
  closeMenu: Fe,
  pinMenu: Pe,
  resize: Ge,
  resizeBar: xe,
  resizeTop: ke,
  resizeBottom: Ce,
  resizeRight: Ue,
  resizeLeft: De,
  resizeTopLeft: Ye,
  resizeBottomLeft: je,
  resizeTopRight: Xe,
  resizeBottomRight: Ze,
  mask: Ve
}, Lt = '<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M590.265 511.987l305.521-305.468c21.617-21.589 21.617-56.636.027-78.252-21.616-21.617-56.663-21.617-78.279 0L512.012 433.735 206.544 128.213c-21.617-21.617-56.635-21.617-78.252 0-21.616 21.589-21.616 56.635-.027 78.252L433.76 511.987 128.211 817.482c-21.617 21.59-21.617 56.635 0 78.251 10.808 10.81 24.967 16.213 39.125 16.213 14.159 0 28.318-5.403 39.126-16.213l305.522-305.468L817.48 895.788C828.289 906.597 842.447 912 856.606 912s28.317-5.403 39.125-16.212c21.618-21.59 21.618-56.636.028-78.252L590.265 511.987z"/></svg>', Mt = '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5228" width="64" height="64"><path d="M97.74775349 97.74775349h828.50449302v828.50449302H97.74775349V97.74775349z m103.56306133 103.56306133v621.37837036h621.37837036V201.31081482H201.31081482z" fill="currentColor"></path></svg>', Rt = '<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M38.794 124.791v778.495h946.412V124.791H38.794zm896.678 728.033H89.292v-460.9h846.18v460.9z"/></svg>', Wt = '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M738.793 681.382v-48.331l88.242-88.243a298.676 298.676 0 00156.712-83.482 38.836 38.836 0 000-54.923l-366.15-366.15a38.836 38.836 0 00-54.923 0 298.52 298.52 0 00-83.519 156.749l-88.169 88.169h-48.332a411.145 411.145 0 00-292.59 121.232c-15.16 15.159-15.16 39.764 0 54.923L278.906 690.17 86.642 882.436a38.836 38.836 0 1054.922 54.922l192.23-192.229 228.844 228.845a38.836 38.836 0 0054.922 0 411.042 411.042 0 00121.233-292.592zM134.02 435.44a333.473 333.473 0 01208.56-72.571l64.406.037a38.836 38.836 0 0027.461-11.351L544.292 241.71a38.68 38.68 0 0011.351-27.462 180.096 180.096 0 0136.798-89.01L898.8 431.593a180.925 180.925 0 01-89.12 36.835 38.836 38.836 0 00-27.462 11.35L672.373 589.626c-7.287 7.286-11.387 17.173-11.35 27.461l.036 64.406a333.318 333.318 0 01-72.608 208.596L134.021 435.44z"/></svg>', bt = '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M845.40952426 212.52063539H65.21904746v702.17142826h780.1904768V212.52063539z m-702.17142933 624.1523808V290.53968285h624.1523808v546.13333334H143.23809493z" fill="currentColor"></path><path d="M981.53650809 76.3936505H201.34603129v78.01904746h702.17142933v624.15238187h78.01904747V76.3936505z" fill="currentColor"></path></svg>';
function In() {
  return {
    IconClose: Lt,
    IconMax: Mt,
    IconPin: Wt,
    IconWindow: Rt,
    IconRestore: bt
  };
}
function E(t, n, e) {
  return n != null && Number.isFinite(n) && t < n ? n : e != null && Number.isFinite(e) && t > e ? e : t;
}
function st(t) {
  return t == null || typeof t != "string" ? !0 : t.length == 0;
}
const rt = "__xWindow_resize_prop__", N = 360, ut = 32, M = {
  TOP: R(L.TOP),
  BOTTOM: R(L.BOTTOM),
  LEFT: R(L.LEFT),
  RIGHT: R(L.RIGHT),
  TOP_LEFT: R(L.TOP_LEFT),
  TOP_RIGHT: R(L.TOP_RIGHT),
  BOTTOM_LEFT: R(L.BOTTOM_LEFT),
  BOTTOM_RIGHT: R(L.BOTTOM_RIGHT)
}, Ke = [[w.resizeTop, M.TOP], [w.resizeBottom, M.BOTTOM], [w.resizeLeft, M.LEFT], [w.resizeRight, M.RIGHT], [w.resizeTopLeft, M.TOP_LEFT], [w.resizeTopRight, M.TOP_RIGHT], [w.resizeBottomLeft, M.BOTTOM_LEFT], [w.resizeBottomRight, M.BOTTOM_RIGHT]];
function R(t) {
  return t.toString(2).padStart(4, "0");
}
function dt(t, n, e) {
  const f = n.getBoundingClientRect(), d = document.documentElement.getBoundingClientRect(), r = e.relatedWindow != null, l = {};
  if (e.direction[3] == "1") {
    const s = E(f.bottom - E(t.clientY, 0), ut), o = E(t.clientY - d.top, 0, window.innerHeight - s);
    l.height = s, l.top = o;
  }
  if (e.direction[2] == "1") {
    const s = E(E(t.clientY, 0, window.innerHeight) - f.top, ut), o = E(t.clientY - s - d.top, 0, window.innerHeight - s);
    l.height = s, l.top = o;
  }
  if (e.direction[1] == "1") {
    const s = E(f.right - E(t.clientX, 0), N, r ? window.innerWidth - N : window.innerWidth), o = E(t.clientX - d.left, r ? N : 0, window.innerWidth - s);
    l.width = s, l.left = o;
  }
  if (e.direction[0] == "1") {
    const s = E(E(t.clientX, 0) - f.left, N, r ? window.innerWidth - N : window.innerWidth), o = E(t.clientX - s - d.left, 0, window.innerWidth - s - (r ? N : 0));
    l.width = s, l.left = o;
  }
  return l;
}
function Qe(t) {
  const n = K(), e = {
    init: !1,
    direction: null,
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    relatedWindow: null
  };
  function f(s) {
    s.preventDefault(), s.stopPropagation();
    const o = t.windowState, a = t.splitState;
    e.init = !1, e.direction = s.target[rt], e.top = o.top, e.left = o.left, e.width = o.width, e.height = o.height, a.mode == i.LEFT && e.direction == i.RIGHT.toString(2).padStart(4, "0") && (e.relatedWindow = V(i.RIGHT)), a.mode == i.RIGHT && e.direction == i.LEFT.toString(2).padStart(4, "0") && (e.relatedWindow = V(i.LEFT)), window.addEventListener("mousemove", d), window.addEventListener("mouseup", r);
  }
  function d(s) {
    s.preventDefault();
    const o = n == null ? void 0 : n.refs.window, a = t.splitState;
    if (e.init || (o.classList.add(w.resizing), e.init = !0), t.splitState.mode != i.NONE) {
      if (e.relatedWindow == null) {
        const p = o.getBoundingClientRect();
        t.windowState.top = p.top, t.windowState.left = p.left, t.windowState.width = p.width, t.windowState.height = p.height, t.splitState.mode = i.NONE;
      }
      e.top = t.windowState.top, e.left = t.windowState.left, e.width = t.windowState.width, e.height = t.windowState.height;
    }
    const h = dt(s, o, e);
    for (const p in h) {
      const m = Math.round(h[p]);
      Reflect.set(e, p, m), Reflect.set(o.style, p, m + "px");
    }
    if (a.mode == i.LEFT || a.mode == i.RIGHT) {
      const p = e.relatedWindow;
      if (p != null) {
        const m = p.getWindowEl();
        Reflect.set(m.style, "width", window.innerWidth - e.width + "px");
      }
    }
  }
  function r(s) {
    if (s.preventDefault(), e.init) {
      const o = n == null ? void 0 : n.refs.window;
      dt(s, o, e) != null && (t.windowState.top = e.top, t.windowState.left = e.left, t.windowState.width = e.width, t.windowState.height = e.height, t.saveWindowState()), o.classList.remove(w.resizing);
      const h = t.splitState;
      if (h.mode == i.LEFT || h.mode == i.RIGHT) {
        const p = e.relatedWindow;
        if (p != null) {
          const m = t.splitState;
          m.width = e.width / window.innerWidth * 100;
          const y = 100 - m.width;
          p.splitState.width = y;
        }
      }
    }
    window.removeEventListener("mousemove", d), window.removeEventListener("mouseup", r);
  }
  const l = Ke.map((s) => Q("div", {
    className: s[0],
    ["." + rt]: s[1]
  }));
  return g("div", {
    class: w.resize,
    onMousedown: f
  }, [l]);
}
function Ae(t) {
  const n = K(), e = {
    init: !1,
    left: 0,
    top: 0,
    prevClientX: 0,
    prevClientY: 0,
    splitMode: i.NONE,
    splitWidth: null,
    relatedWindow: null
  };
  function f(l) {
    const o = (n == null ? void 0 : n.refs.window).getBoundingClientRect();
    l.clientY - o.top > 30 || (l.preventDefault(), e.init = !1, e.left = t.windowState.left, e.top = t.windowState.top, e.prevClientX = l.clientX, e.prevClientY = l.clientY, window.addEventListener("mousemove", d), window.addEventListener("mouseup", r));
  }
  function d(l) {
    l.preventDefault();
    const s = n == null ? void 0 : n.refs.window;
    e.init || (s.classList.add(w.dragging), e.init = !0), t.splitState.mode != i.NONE && (t.exitSplitMode(l), e.left = t.windowState.left, e.top = t.windowState.top), e.left = Math.round(e.left + l.clientX - e.prevClientX), e.top = Math.round(e.top + l.clientY - e.prevClientY), e.prevClientX = l.clientX, e.prevClientY = l.clientY, s.style.left = e.left + "px", s.style.top = e.top + "px";
    const o = pe(l);
    e.splitMode = o.mode, e.splitWidth = o.width, e.relatedWindow = o.relatedWindow;
  }
  function r(l) {
    if (l.preventDefault(), e.init) {
      const s = n == null ? void 0 : n.refs.window;
      if (t.windowState.top = e.top, t.windowState.left = e.left, e.splitMode !== i.NONE) {
        if (t.splitState.mode = e.splitMode, e.relatedWindow) {
          const o = e.splitWidth / window.innerWidth * 100;
          t.splitState.width = o, e.relatedWindow.splitState.width = 100 - o;
        }
        ge();
      }
      s.classList.remove(w.dragging);
    }
    window.removeEventListener("mousemove", d), window.removeEventListener("mouseup", r);
  }
  return { dragStart: f };
}
const Je = /* @__PURE__ */ F({
  name: "WindowBody",
  props: {
    uid: v,
    body: {
      default: null
    }
  },
  setup(t) {
    const n = ft(A);
    return function() {
      return typeof t.body == "function" ? t.body(n) : t.body;
    };
  }
});
function $e(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !C(t);
}
const qe = Math.floor(Number.MAX_SAFE_INTEGER / 10) - 1e4;
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
    if (n.value == _.INIT)
      return {
        width: t.width,
        height: t.height,
        left: t.left,
        top: t.top
      };
    const r = t.mask ? null : d.value, l = f.mode;
    return l == i.FULLSCREEN ? {
      zIndex: r
    } : l === i.LEFT || l === i.RIGHT ? {
      top: 0,
      left: l == i.LEFT ? 0 : null,
      right: l == i.RIGHT ? 0 : null,
      width: (f.width ?? 50) + "vw",
      height: "100vh",
      zIndex: r
    } : l == i.TOP_LEFT || l == i.TOP_RIGHT || l == i.BOTTOM_LEFT || l == i.BOTTOM_RIGHT ? {
      top: l == i.TOP_LEFT || l == i.TOP_RIGHT ? 0 : null,
      left: l == i.TOP_LEFT || l == i.BOTTOM_LEFT ? 0 : null,
      right: l == i.TOP_RIGHT || l == i.BOTTOM_RIGHT ? 0 : null,
      bottom: l == i.BOTTOM_LEFT || l == i.BOTTOM_RIGHT ? 0 : null,
      width: "50vw",
      height: "50vh",
      zIndex: r
    } : {
      top: e.top + "px",
      left: e.left + "px",
      width: e.width + "px",
      height: n.value == _.INIT ? null : e.height + "px",
      zIndex: r
    };
  });
}
const _t = /* @__PURE__ */ F({
  name: "BaseWindow",
  props: {
    ...J,
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
    emit: n,
    expose: e,
    slots: f
  }) {
    const d = v.create(t.uid), r = K(), l = G(_.INIT), s = G(0), o = X(tn()), a = X(en()), h = {
      width: 0,
      height: 0
    }, p = B(() => t.resizeMode != P.NONE), m = B(() => typeof t.zIndex == "number" && t.zIndex > 0), y = B(() => m.value ? t.zIndex : (o.pinned ? qe : 0) + s.value), z = {
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
        return y.value;
      },
      set zIndex(c) {
        s.value = c;
      },
      exitSplitMode: kt,
      close: D,
      saveWindowState: et,
      getWindowEl() {
        return r.refs.window;
      },
      useCssClass: Yt,
      useMenus: nt
    }, U = t.draggable ? Ae(z) : null, Bt = p.value ? Qe(z) : null, yt = B(() => {
      const c = [w.window];
      return l.value == _.INIT && c.push(w.init), a.mode == i.FULLSCREEN && c.push(w.fullscreen), o.focused && c.push(w.focused), c;
    }), zt = nn(t, l, o, a, y);
    async function Ht(c) {
      await Z();
      const S = c.el.getBoundingClientRect();
      if (l.value == _.INIT) {
        const j = mt().value.length;
        let it = S.left, ot = S.top, lt = S.width, jt = S.height;
        st(t.left) && (it = (window.innerWidth - lt) / 2), st(t.top) && (ot = window.innerHeight * 0.12 + (j - 1) * 30), o.width = lt, o.height = jt, o.left = it, o.top = ot, t.fullscreen && Y(), l.value = _.MOUNTED, et();
      }
      tt();
    }
    function D(c = !1) {
      !t.closeable && c !== !0 || n("update:visible", !1);
    }
    function Ft(c) {
      t.closeable && (c == null || c.stopPropagation(), D());
    }
    function Pt() {
      o.focused = !1, Z(vt);
    }
    function Gt(c) {
      c.stopPropagation();
    }
    function tt() {
      o.focused || It(d);
    }
    function Y() {
      if (t.resizeMode !== P.RESIZE)
        return;
      if (a.mode == i.NONE)
        return a.mode = i.FULLSCREEN;
      const {
        innerWidth: c,
        innerHeight: O
      } = window;
      o.top < 0 && (o.top = 0), o.top > O - o.height && (o.top = O - o.height), o.left < 0 && (o.left = 0), o.left > c - o.width && (o.left = c - o.width), a.mode = i.NONE;
    }
    function xt() {
      o.pinned = !o.pinned;
    }
    function et() {
      h.width = o.width, h.height = o.height;
    }
    function kt(c) {
      o.top = c.clientY - 15, o.left = c.clientX - h.width / 2, o.width = h.width, o.height = h.height, a.mode = i.NONE, a.width = 50, a.height = 50;
    }
    function Ct(c) {
      c.stopPropagation();
    }
    function Ut(c) {
      const S = (r == null ? void 0 : r.refs.window).getBoundingClientRect();
      c.clientY - S.top > 30 || (c.preventDefault(), Y());
    }
    const Dt = Kt(() => t.visible, () => {
      t.visible || Pt();
    });
    ae(d, z), wt(() => {
      n("beforeUnmount"), D(), Ot(d);
    }), Qt(() => {
      n("unmount"), Dt(), l.value = _.UNMOUNTED;
    }), At(A, z), e(z);
    function Yt() {
      return w;
    }
    function nt(c = {}) {
      const O = [];
      if (t.pinnable && t.mask !== !0 && m.value !== !0 && O.push(g("button", {
        onClick: xt,
        type: "button",
        innerHTML: Wt,
        class: o.pinned ? w.pinMenu : w.menu,
        title: "固定"
      }, null)), t.resizeMode == P.RESIZE) {
        const S = a.mode == i.FULLSCREEN ? bt : Mt, I = a.mode == i.FULLSCREEN ? "还原" : "最大化";
        O.push(g("button", {
          onClick: Y,
          type: "button",
          innerHTML: S,
          class: w.menu,
          title: I
        }, null));
      }
      return t.closeable && O.push(g("button", {
        onClick: Ft,
        type: "button",
        innerHTML: Lt,
        class: w.closeMenu,
        title: "关闭"
      }, null)), O.length == 0 ? null : (c == null ? void 0 : c.custom) === !0 ? O : g("div", {
        class: w.menus,
        onMousedown: Gt
      }, [O]);
    }
    return function() {
      if (!t.visible)
        return null;
      const c = typeof f.header == "function" ? f.header(nt) : null, O = g("div", {
        class: w.main,
        onMousedown: U == null ? void 0 : U.dragStart,
        onDblclick: Ut
      }, [c, g("div", {
        class: w.body,
        onClick: Ct
      }, [g(Je, {
        body: t.body,
        key: d.wid,
        uid: d
      }, null)])]), S = {
        ref: "window",
        id: t.id ?? d.wid,
        onVnodeMounted: Ht,
        onMousedownCapture: tt,
        class: yt.value,
        style: zt.value
      };
      let I = Q("div", S, [O, Bt]);
      if (t.mask === !0) {
        const j = {
          zIndex: y.value
        };
        I = g("div", {
          class: w.mask,
          style: j
        }, [I]);
      }
      return t.appendToBody ? g(Tt, {
        to: "body"
      }, $e(I) ? I : {
        default: () => [I]
      }) : I;
    };
  }
});
function on(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !C(t);
}
const H = /* @__PURE__ */ F({
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
      ...l
    } = e, s = v.create(e.uid);
    return function() {
      const o = {
        ...t,
        ...l,
        uid: s,
        body: n.default
      };
      return g(_t, o, on(d) ? d : {
        default: () => [d]
      });
    };
  }
});
function ln(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !C(t);
}
const k = /* @__PURE__ */ F({
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
    } = e, r = v.create(e.uid), l = G(null);
    function s(a) {
      a.preventDefault();
      const h = l.value;
      if (h == null)
        return;
      const p = h.windowState.splitMode;
      h.windowState.splitMode = p == i.FULLSCREEN ? i.NONE : i.FULLSCREEN;
    }
    const o = {
      header(a) {
        const h = a();
        return g("div", {
          class: w.header,
          onDblclick: s
        }, [g("i", {
          class: w.logo,
          innerHTML: Rt
        }, null), g("div", {
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
      return g(_t, Jt(a, {
        ref: l
      }), ln(o) ? o : {
        default: () => [o]
      });
    };
  }
}), Nt = Object.freeze({
  SIMPLE_WINDOW: k.name,
  BLANK_WINDOW: H.name
});
const sn = "FmVMmgP6zyw-", rn = "cRBxd8q9gfU-", un = "pG7CwNOo88U-", dn = "uN9dQU07tlg-", cn = "WZwjXs4FPMs-", an = "jKQsQOLHRSE-", fn = "LDMmH7O6eHg-", wn = "_0kT-lzOVlCA-", W = {
  splitWindowMask: sn,
  fullscreen: rn,
  splitLeft: un,
  splitRight: dn,
  splitTopLeft: cn,
  splitTopRight: an,
  splitBottomLeft: fn,
  splitBottomRight: wn
};
function Tn(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !C(t);
}
const hn = {
  [i.FULLSCREEN]: W.fullscreen,
  [i.LEFT]: W.splitLeft,
  [i.RIGHT]: W.splitRight,
  [i.TOP_LEFT]: W.splitTopLeft,
  [i.TOP_RIGHT]: W.splitTopRight,
  [i.BOTTOM_LEFT]: W.splitBottomLeft,
  [i.BOTTOM_RIGHT]: W.splitBottomRight
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
}, at = /* @__PURE__ */ F({
  name: "WindowManager",
  setup() {
    const t = mt(), n = Oe();
    function e(l) {
      const s = l.key;
      if (s == "Escape")
        return Et();
      if (l.ctrlKey && s in ct) {
        const o = gt();
        if (!o.resizable || !o.draggable)
          return;
        const a = Reflect.get(ct, s), h = a[o.splitState.mode] ?? a.fallback;
        o.splitState.mode = h;
        return;
      }
    }
    se(), window.addEventListener("keydown", e, !0), wt(() => {
      re(), window.removeEventListener("keydown", e, !0);
    });
    function f(l) {
      return l == H.name ? H : k;
    }
    const d = B(() => {
      const l = [W.splitWindowMask], s = hn[n.mode];
      return s != null && l.push(s), l;
    });
    function r() {
      let l = null;
      if (n.mode != i.NONE) {
        const o = {
          zIndex: de() + 1,
          width: n.width ? n.width - 20 + "px" : null
        };
        l = g("div", {
          class: d.value,
          style: o
        }, null);
      }
      return g(Tt, {
        to: "body"
      }, {
        default: () => [g($t, {
          name: "fade"
        }, Tn(l) ? l : {
          default: () => [l]
        })]
      });
    }
    return function() {
      return [...t.value.map((s) => {
        const o = fe(s);
        if (o == null)
          return;
        const a = f(o.type);
        return Q(a, o.buildProps());
      }), r()];
    };
  }
});
function $(t) {
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
function vn(...t) {
  const n = $(t);
  return n == null ? (console.error("[xWindow]: 参数有误"), null) : q(n);
}
function Ln(...t) {
  const n = $(t);
  return n == null ? (console.error("[xWindow]: 参数有误"), null) : (n.type = Nt.BLANK_WINDOW, q(n));
}
function Mn(...t) {
  const n = $(t);
  return n == null ? (console.error("[xWindow]: 参数有误"), null) : (n.type = Nt.SIMPLE_WINDOW, q(n));
}
function q(t) {
  if (!ue())
    return console.error("[xWindow] 需要先创建`WindowManager`组件，见文档 " + qt + " 。"), null;
  const { displayAfterCreate: n, unmountAfterClose: e, afterUnmount: f, ...d } = t, r = {
    uid: null,
    visible: G(n !== !1),
    isUnmounted: !1
  }, l = () => r.visible.value = !0, s = () => {
    r.visible.value = !1, e !== !1 && o();
  }, o = () => {
    r.visible.value && s(), Ot(r.uid), Z(vt);
  }, a = Object.assign({}, d, {
    visible: r.visible,
    [ee](h) {
      h ? l() : s();
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
    show: l,
    close: s,
    unmount: o
  };
}
function pn(t, n) {
  t.component(k.name, k), t.component(H.name, H), t.component(at.name, at), me(n);
}
const gn = te, Rn = { install: pn, version: gn };
export {
  H as BlankWindow,
  P as RESIZE_MODE,
  k as SimpleWindow,
  _ as WINDOW_STATES,
  at as WindowManager,
  Rn as default,
  pn as install,
  Ln as useBlankWindow,
  In as useIcons,
  Mn as useSimpleWindow,
  vn as useWindow,
  Sn as useWindowApi,
  mn as useWindowManager,
  gn as version,
  Rn as xWindow
};
