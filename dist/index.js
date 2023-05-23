/*! @dongls/xWindow v0.0.6 https://github.com/dongls/xWindow
Copyright 2023-present dongls
Released under the MIT License */
var Vt = Object.defineProperty;
var Zt = (t, n, e) => n in t ? Vt(t, n, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[n] = e;
var I = (t, n, e) => (Zt(t, typeof n != "symbol" ? n + "" : n, e), e);
import { getCurrentInstance as V, h as P, createVNode as g, defineComponent as z, inject as dt, ref as F, reactive as j, computed as M, watch as qt, onBeforeUnmount as at, onUnmounted as Kt, provide as Jt, Teleport as ft, isVNode as B, nextTick as X, mergeProps as $t, shallowRef as Qt, render as ot, Transition as At } from "vue";
const te = "0.0.6", Z = Symbol(), ee = "onUpdate:visible", ne = "onBeforeUnmount", ie = "onUnmount", f = Object.freeze({
  NONE: 0,
  TOP: 1 << 0,
  BOTTOM: 1 << 1,
  LEFT: 1 << 2,
  RIGHT: 1 << 3
}), b = Object.freeze({
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
}), H = Object.freeze({
  /** 禁止调整窗口大小 */
  DISABLED: 0,
  /** 允许调整窗口大小，允许全屏（默认）*/
  RESIZE: 1,
  /** 只允许调整窗口大小 */
  RESIZE_ONLY: 2
}), N = Object.freeze({
  /** 窗口初始化，不显示 */
  INIT: 0,
  /** 窗口初始化完成，并展示 */
  MOUNTED: 1,
  /** 窗口已销毁 */
  UNMOUNTED: 2
}), q = {
  /** 窗口的id */
  id: String,
  /** 窗口的标题 */
  title: String,
  /** 是否显示窗口 */
  visible: {
    type: Boolean,
    default: !1
  },
  /** 窗口的`CSS`类名 */
  className: String,
  /** 窗口初始宽度，参照`CSS`中`width`语法 */
  width: {
    type: String,
    default: "640px"
  },
  /** 窗口最小宽度, 最小为0，单位像素 */
  minWidth: {
    type: Number,
    default: 360
  },
  /** TODO: 窗口最大宽度，默认不限制，单位像素 */
  maxWidth: Number,
  /** 窗口初始高度，参照`CSS`中`height`语法 */
  height: {
    type: String
  },
  /** 窗口最小高度, 最小为0，单位像素 */
  minHeight: {
    type: Number,
    default: 32
  },
  /** TODO: 窗口最大高度，默认不限制，单位像素 */
  maxHeight: Number,
  /** 窗口初始位置，参照`CSS`的`left`语法 */
  left: {
    type: String
  },
  /** 窗口初始位置，参照`CSS`的`top`语法 */
  top: {
    type: String
  },
  /** 
   * @deprecated 此属性可能会发生变动，请谨慎使用  
   * 窗口的固定层级, 参照`CSS`的`zIndex`语法 
   */
  zIndex: {
    type: Number
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
    default: H.RESIZE
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
}, oe = {
  /** 窗口图标 */
  icon: [String, Object, Function]
};
let le = 1e3;
class L {
  /** 统一使用`UID.create`方法创建 */
  constructor() {
    I(this, "value");
    Reflect.defineProperty(this, "value", {
      enumerable: !0,
      configurable: !1,
      writable: !1,
      value: le++
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
    I(this, "uid");
    I(this, "type");
    I(this, "visible");
    I(this, "others");
    I(this, "body");
    /** 清理组件相关内容 */
    I(this, "cleanup");
    const { visible: e, body: d, type: c, ...s } = n;
    this.uid = L.create(), this.type = c, this.visible = e, this.body = d, this.others = s;
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
const se = "MRXpCPpv", re = "GN2MDwyg", ue = "EXcuNyL9", ce = "Aeh9c3oD", de = "WxtjLxNz", ae = "jr741FS8", fe = "_4V8hNMH5", we = "UFJeuGjh", he = "F1CoqfyB", Te = "HHXpkEA9", pe = "_7QPhBUHP", ge = "M2ERgJNF", Ee = "dyQFmHbP", me = "pHBGjqnr", Oe = "uwWxA5xK _4V8hNMH5", Se = "KFT5NXAz _4V8hNMH5", ve = "_79xcArL5", Le = "Ud16jCEc", Ie = "v9PGfix8 Ud16jCEc", be = "_3pC57Wjn Ud16jCEc", We = "ycrLgKRA Ud16jCEc", Ne = "_2UTecfau Ud16jCEc", Me = "QDf2kvbw Ud16jCEc", Re = "sb3oaSqT Ud16jCEc", ye = "w1CvuStH Ud16jCEc", _e = "jPnS9C6D Ud16jCEc", ze = "nQ23Wwvq", h = {
  window: se,
  dragging: re,
  resizing: ue,
  fullscreen: ce,
  focused: de,
  header: ae,
  menu: fe,
  logo: we,
  main: he,
  init: Te,
  title: pe,
  menus: ge,
  body: Ee,
  footer: me,
  closeMenu: Oe,
  pinMenu: Se,
  resize: ve,
  resizeBar: Le,
  resizeTop: Ie,
  resizeBottom: be,
  resizeRight: We,
  resizeLeft: Ne,
  resizeTopLeft: Me,
  resizeBottomLeft: Re,
  resizeTopRight: ye,
  resizeBottomRight: _e,
  mask: ze
}, wt = '<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M590.265 511.987l305.521-305.468c21.617-21.589 21.617-56.636.027-78.252-21.616-21.617-56.663-21.617-78.279 0L512.012 433.735 206.544 128.213c-21.617-21.617-56.635-21.617-78.252 0-21.616 21.589-21.616 56.635-.027 78.252L433.76 511.987 128.211 817.482c-21.617 21.59-21.617 56.635 0 78.251 10.808 10.81 24.967 16.213 39.125 16.213 14.159 0 28.318-5.403 39.126-16.213l305.522-305.468L817.48 895.788C828.289 906.597 842.447 912 856.606 912s28.317-5.403 39.125-16.212c21.618-21.59 21.618-56.636.028-78.252L590.265 511.987z"/></svg>', ht = '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5228" width="64" height="64"><path d="M97.74775349 97.74775349h828.50449302v828.50449302H97.74775349V97.74775349z m103.56306133 103.56306133v621.37837036h621.37837036V201.31081482H201.31081482z" fill="currentColor"></path></svg>', Tt = '<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M38.794 124.791v778.495h946.412V124.791H38.794zm896.678 728.033H89.292v-460.9h846.18v460.9z"/></svg>', pt = '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M738.793 681.382v-48.331l88.242-88.243a298.676 298.676 0 00156.712-83.482 38.836 38.836 0 000-54.923l-366.15-366.15a38.836 38.836 0 00-54.923 0 298.52 298.52 0 00-83.519 156.749l-88.169 88.169h-48.332a411.145 411.145 0 00-292.59 121.232c-15.16 15.159-15.16 39.764 0 54.923L278.906 690.17 86.642 882.436a38.836 38.836 0 1054.922 54.922l192.23-192.229 228.844 228.845a38.836 38.836 0 0054.922 0 411.042 411.042 0 00121.233-292.592zM134.02 435.44a333.473 333.473 0 01208.56-72.571l64.406.037a38.836 38.836 0 0027.461-11.351L544.292 241.71a38.68 38.68 0 0011.351-27.462 180.096 180.096 0 0136.798-89.01L898.8 431.593a180.925 180.925 0 01-89.12 36.835 38.836 38.836 0 00-27.462 11.35L672.373 589.626c-7.287 7.286-11.387 17.173-11.35 27.461l.036 64.406a333.318 333.318 0 01-72.608 208.596L134.021 435.44z"/></svg>', gt = '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M845.40952426 212.52063539H65.21904746v702.17142826h780.1904768V212.52063539z m-702.17142933 624.1523808V290.53968285h624.1523808v546.13333334H143.23809493z" fill="currentColor"></path><path d="M981.53650809 76.3936505H201.34603129v78.01904746h702.17142933v624.15238187h78.01904747V76.3936505z" fill="currentColor"></path></svg>';
function bn() {
  return {
    IconClose: wt,
    IconMax: ht,
    IconPin: pt,
    IconWindow: Tt,
    IconRestore: gt
  };
}
function m(t, n, e) {
  return n != null && Number.isFinite(n) && t < n ? n : e != null && Number.isFinite(e) && t > e ? e : t;
}
function lt(t) {
  return t == null || typeof t != "string" ? !0 : t.length == 0;
}
function Be(t) {
  return t == null || typeof t != "string" ? !1 : t.length != 0;
}
const st = "__xWindow_resize_prop__", He = [[h.resizeTop, b.TOP], [h.resizeBottom, b.BOTTOM], [h.resizeLeft, b.LEFT], [h.resizeRight, b.RIGHT], [h.resizeTopLeft, b.TOP_LEFT], [h.resizeTopRight, b.TOP_RIGHT], [h.resizeBottomLeft, b.BOTTOM_LEFT], [h.resizeBottomRight, b.BOTTOM_RIGHT]];
function rt(t, n, e, d) {
  const c = typeof d.minWidth == "number" && d.minWidth >= 0 ? d.minWidth : null, s = typeof d.minHeight == "number" && d.minHeight >= 0 ? d.minHeight : null, l = n.getBoundingClientRect(), r = document.documentElement.getBoundingClientRect(), o = e.relatedWindow != null, a = {};
  if (e.direction & f.TOP) {
    const T = m(l.bottom - m(t.clientY, 0), s), p = m(t.clientY - r.top, 0, window.innerHeight - T);
    a.height = T, a.top = p;
  }
  if (e.direction & f.BOTTOM) {
    const T = m(m(t.clientY, 0, window.innerHeight) - l.top, s), p = m(t.clientY - T - r.top, 0, window.innerHeight - T);
    a.height = T, a.top = p;
  }
  if (e.direction & f.LEFT) {
    const T = m(l.right - m(t.clientX, 0), c, o ? window.innerWidth - c : window.innerWidth), p = m(t.clientX - r.left, o ? c : 0, window.innerWidth - T);
    a.width = T, a.left = p;
  }
  if (e.direction & f.RIGHT) {
    const T = m(m(t.clientX, 0) - l.left, c, o ? window.innerWidth - c : window.innerWidth), p = m(t.clientX - T - r.left, 0, window.innerWidth - T - (o ? c : 0));
    a.width = T, a.left = p;
  }
  return a;
}
function Fe(t) {
  const n = V(), e = {
    init: !1,
    direction: null,
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    relatedWindow: null
  };
  function d(r) {
    r.preventDefault(), r.stopPropagation();
    const o = t.windowState, a = t.splitState;
    e.init = !1, e.direction = Reflect.get(r.target, st), e.top = o.top, e.left = o.left, e.width = o.width, e.height = o.height, a.mode == i.LEFT && e.direction & f.RIGHT && (e.relatedWindow = Y(i.RIGHT)), a.mode == i.RIGHT && e.direction & f.LEFT && (e.relatedWindow = Y(i.LEFT)), window.addEventListener("mousemove", c), window.addEventListener("mouseup", s);
  }
  function c(r) {
    r.preventDefault();
    const o = n == null ? void 0 : n.refs.window, a = t.splitState;
    if (e.init || (o.classList.add(h.resizing), e.init = !0), t.splitState.mode != i.NONE) {
      if (e.relatedWindow == null) {
        const p = o.getBoundingClientRect();
        t.windowState.top = p.top, t.windowState.left = p.left, t.windowState.width = p.width, t.windowState.height = p.height, t.splitState.mode = i.NONE;
      }
      e.top = t.windowState.top, e.left = t.windowState.left, e.width = t.windowState.width, e.height = t.windowState.height;
    }
    const T = rt(r, o, e, t.props);
    for (const p in T) {
      const O = Math.round(T[p]);
      Reflect.set(e, p, O), Reflect.set(o.style, p, O + "px");
    }
    if (a.mode == i.LEFT || a.mode == i.RIGHT) {
      const p = e.relatedWindow;
      if (p != null) {
        const O = p.getWindowEl();
        Reflect.set(O.style, "width", window.innerWidth - e.width + "px");
      }
    }
  }
  function s(r) {
    if (r.preventDefault(), e.init) {
      const o = n == null ? void 0 : n.refs.window;
      rt(r, o, e, t.props) != null && (t.windowState.top = e.top, t.windowState.left = e.left, t.windowState.width = e.width, t.windowState.height = e.height, t.saveWindowState()), o.classList.remove(h.resizing);
      const T = t.splitState;
      if (T.mode == i.LEFT || T.mode == i.RIGHT) {
        const p = e.relatedWindow;
        if (p != null) {
          const O = t.splitState;
          O.width = e.width / window.innerWidth * 100;
          const R = 100 - O.width;
          p.splitState.width = R;
        }
      }
    }
    window.removeEventListener("mousemove", c), window.removeEventListener("mouseup", s);
  }
  const l = He.map((r) => P("div", {
    className: r[0],
    ["." + st]: r[1]
  }));
  return g("div", {
    class: h.resize,
    onMousedown: d
  }, [l]);
}
function xe(t) {
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
  function d(l) {
    const o = (n == null ? void 0 : n.refs.window).getBoundingClientRect();
    l.clientY - o.top > 30 || (l.preventDefault(), e.init = !1, e.left = t.windowState.left, e.top = t.windowState.top, e.prevClientX = l.clientX, e.prevClientY = l.clientY, window.addEventListener("mousemove", c), window.addEventListener("mouseup", s));
  }
  function c(l) {
    l.preventDefault();
    const r = n == null ? void 0 : n.refs.window;
    e.init || (r.classList.add(h.dragging), e.init = !0), t.splitState.mode != i.NONE && (t.exitSplitMode(l), e.left = t.windowState.left, e.top = t.windowState.top), e.left = Math.round(e.left + l.clientX - e.prevClientX), e.top = Math.round(e.top + l.clientY - e.prevClientY), e.prevClientX = l.clientX, e.prevClientY = l.clientY, r.style.left = e.left + "px", r.style.top = e.top + "px";
    const o = en(l);
    e.splitMode = o.mode, e.splitWidth = o.width, e.relatedWindow = o.relatedWindow;
  }
  function s(l) {
    if (l.preventDefault(), e.init) {
      const r = n == null ? void 0 : n.refs.window;
      if (t.windowState.top = e.top, t.windowState.left = e.left, e.splitMode !== i.NONE) {
        if (t.splitState.mode = e.splitMode, e.relatedWindow) {
          const o = e.splitWidth / window.innerWidth * 100;
          t.splitState.width = o, e.relatedWindow.splitState.width = 100 - o;
        }
        nn();
      }
      r.classList.remove(h.dragging);
    }
    window.removeEventListener("mousemove", c), window.removeEventListener("mouseup", s);
  }
  return { dragStart: d };
}
const Ce = /* @__PURE__ */ z({
  name: "WindowBody",
  props: {
    uid: L,
    body: {
      default: null
    }
  },
  setup(t) {
    const n = dt(Z);
    return function() {
      return typeof t.body == "function" ? t.body(n) : t.body;
    };
  }
});
function Pe(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !B(t);
}
const Ge = Math.floor(Number.MAX_SAFE_INTEGER / 10) - 1e4;
function ke() {
  return {
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    focused: !1,
    pinned: !1
  };
}
function Ue() {
  return {
    mode: i.NONE,
    width: 50,
    height: 50
  };
}
function De(t, n, e, d, c) {
  return M(() => {
    if (n.value == N.INIT)
      return {
        width: t.width,
        height: t.height,
        left: t.left,
        top: t.top
      };
    const s = t.mask ? null : c.value, l = d.mode;
    return l == i.FULLSCREEN ? {
      zIndex: s
    } : l === i.LEFT || l === i.RIGHT ? {
      top: 0,
      left: l == i.LEFT ? 0 : null,
      right: l == i.RIGHT ? 0 : null,
      width: (d.width ?? 50) + "vw",
      height: "100vh",
      zIndex: s
    } : l == i.TOP_LEFT || l == i.TOP_RIGHT || l == i.BOTTOM_LEFT || l == i.BOTTOM_RIGHT ? {
      top: l == i.TOP_LEFT || l == i.TOP_RIGHT ? 0 : null,
      left: l == i.TOP_LEFT || l == i.BOTTOM_LEFT ? 0 : null,
      right: l == i.TOP_RIGHT || l == i.BOTTOM_RIGHT ? 0 : null,
      bottom: l == i.BOTTOM_LEFT || l == i.BOTTOM_RIGHT ? 0 : null,
      width: "50vw",
      height: "50vh",
      zIndex: s
    } : {
      top: e.top + "px",
      left: e.left + "px",
      width: e.width + "px",
      height: n.value == N.INIT ? null : e.height + "px",
      zIndex: s
    };
  });
}
const Et = /* @__PURE__ */ z({
  name: "BaseWindow",
  props: {
    ...q,
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
    slots: d
  }) {
    const c = L.create(t.uid), s = V(), l = F(N.INIT), r = F(0), o = j(ke()), a = j(Ue()), T = {
      width: 0,
      height: 0
    }, p = M(() => t.resizeMode != H.DISABLED), O = M(() => typeof t.zIndex == "number" && t.zIndex > 0), R = M(() => O.value ? t.zIndex : (o.pinned ? Ge : 0) + r.value), y = {
      get uid() {
        return c;
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
        return R.value;
      },
      set zIndex(w) {
        r.value = w;
      },
      get props() {
        return t;
      },
      exitSplitMode: kt,
      close: k,
      saveWindowState: A,
      getWindowEl() {
        return s.refs.window;
      },
      getWindow() {
        return s;
      },
      useCssClass: Xt,
      useMenus: tt
    }, G = t.draggable ? xe(y) : null, zt = p.value ? Fe(y) : null, Bt = M(() => {
      const w = [h.window];
      return l.value == N.INIT && w.push(h.init), a.mode == i.FULLSCREEN && w.push(h.fullscreen), o.focused && w.push(h.focused), Be(t.className) && w.push(t.className), w;
    }), Ht = De(t, l, o, a, R);
    async function Ft(w) {
      await X();
      const S = w.el.getBoundingClientRect();
      if (l.value == N.INIT) {
        const D = Nt().value.length;
        let et = S.left, nt = S.top, it = S.width, Yt = S.height;
        lt(t.left) && (et = (window.innerWidth - it) / 2), lt(t.top) && (nt = window.innerHeight * 0.12 + (D - 1) * 30), o.width = it, o.height = Yt, o.left = et, o.top = nt, t.fullscreen && U(), l.value = N.MOUNTED, A();
      }
      Q();
    }
    function k(w = !1) {
      !t.closeable && w !== !0 || n("update:visible", !1);
    }
    function xt(w) {
      t.closeable && (w == null || w.stopPropagation(), k());
    }
    function Ct() {
      o.focused = !1, X(yt);
    }
    function Pt(w) {
      w.stopPropagation();
    }
    function Q() {
      o.focused || Rt(c);
    }
    function U() {
      if (t.resizeMode !== H.RESIZE)
        return;
      if (a.mode == i.NONE)
        return a.mode = i.FULLSCREEN;
      const {
        innerWidth: w,
        innerHeight: E
      } = window;
      o.top < 0 && (o.top = 0), o.top > E - o.height && (o.top = E - o.height), o.left < 0 && (o.left = 0), o.left > w - o.width && (o.left = w - o.width), a.mode = i.NONE;
    }
    function Gt() {
      o.pinned = !o.pinned;
    }
    function A() {
      T.width = o.width, T.height = o.height;
    }
    function kt(w) {
      o.top = w.clientY - 15, o.left = w.clientX - T.width / 2, o.width = T.width, o.height = T.height, a.mode = i.NONE, a.width = 50, a.height = 50;
    }
    function Ut(w) {
      w.stopPropagation();
    }
    function Dt(w) {
      const S = (s == null ? void 0 : s.refs.window).getBoundingClientRect();
      w.clientY - S.top > 30 || (w.preventDefault(), U());
    }
    const jt = qt(() => t.visible, () => {
      t.visible || Ct();
    });
    Je(c, y), at(() => {
      n("beforeUnmount"), k(), bt(c);
    }), Kt(() => {
      n("unmount"), jt(), l.value = N.UNMOUNTED;
    }), Jt(Z, y), e(y);
    function Xt() {
      return h;
    }
    function tt(w = {}) {
      const E = [];
      if (t.pinnable && t.mask !== !0 && O.value !== !0 && E.push(g("button", {
        onClick: Gt,
        type: "button",
        innerHTML: pt,
        class: o.pinned ? h.pinMenu : h.menu,
        title: "固定"
      }, null)), t.resizeMode == H.RESIZE) {
        const S = a.mode == i.FULLSCREEN ? gt : ht, v = a.mode == i.FULLSCREEN ? "还原" : "最大化";
        E.push(g("button", {
          onClick: U,
          type: "button",
          innerHTML: S,
          class: h.menu,
          title: v
        }, null));
      }
      return t.closeable && E.push(g("button", {
        onClick: xt,
        type: "button",
        innerHTML: wt,
        class: h.closeMenu,
        title: "关闭"
      }, null)), E.length == 0 ? null : (w == null ? void 0 : w.custom) === !0 ? E : g("div", {
        class: h.menus,
        onMousedown: Pt
      }, [E]);
    }
    return function() {
      if (!t.visible)
        return null;
      const w = typeof d.header == "function" ? d.header(tt) : null, E = g("div", {
        class: h.main,
        onMousedown: G == null ? void 0 : G.dragStart,
        onDblclick: Dt
      }, [w, g("div", {
        class: h.body,
        onClick: Ut
      }, [g(Ce, {
        body: t.body,
        key: c.wid,
        uid: c
      }, null)])]), S = {
        ref: "window",
        id: t.id ?? c.wid,
        onVnodeMounted: Ft,
        onMousedownCapture: Q,
        class: Bt.value,
        style: Ht.value
      };
      let v = P("div", S, [E, zt]);
      if (t.mask === !0) {
        const D = {
          zIndex: R.value
        };
        v = g("div", {
          class: h.mask,
          style: D
        }, [v]);
      }
      return t.appendToBody ? g(ft, {
        to: "body"
      }, Pe(v) ? v : {
        default: () => [v]
      }) : v;
    };
  }
});
function je(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !B(t);
}
const _ = /* @__PURE__ */ z({
  name: "BlankWindow",
  props: {
    ...q
  },
  setup(t, {
    slots: n,
    attrs: e
  }) {
    const {
      body: d,
      ...c
    } = n, {
      uid: s,
      ...l
    } = e, r = L.create(e.uid);
    return function() {
      const o = {
        ...t,
        ...l,
        uid: r,
        body: n.default
      };
      return g(Et, o, je(c) ? c : {
        default: () => [c]
      });
    };
  }
});
function Xe(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !B(t);
}
function Ye(t) {
  return typeof t == "string" ? g("i", {
    class: [h.logo, "icon"]
  }, null) : B(t) ? t : typeof t == "function" ? t() : g("i", {
    class: h.logo,
    innerHTML: Tt
  }, null);
}
const C = /* @__PURE__ */ z({
  name: "SimpleWindow",
  props: {
    ...q,
    ...oe
  },
  setup(t, {
    slots: n,
    attrs: e
  }) {
    const d = L.create(e.uid), c = F(null);
    function s(r) {
      r.preventDefault();
      const o = c.value;
      if (o == null)
        return;
      const a = o.windowState.splitMode;
      o.windowState.splitMode = a == i.FULLSCREEN ? i.NONE : i.FULLSCREEN;
    }
    const l = {
      header(r) {
        const o = r();
        return g("div", {
          class: h.header,
          onDblclick: s
        }, [Ye(t.icon), g("div", {
          class: h.title
        }, [t.title ?? "新窗口"]), o]);
      }
    };
    return function() {
      const {
        icon: r,
        ...o
      } = t, {
        uid: a,
        ...T
      } = e, p = {
        ...o,
        ...T,
        uid: d,
        body: n.default
      };
      return g(Et, $t(p, {
        ref: c
      }), Xe(l) ? l : {
        default: () => [l]
      });
    };
  }
}), mt = Object.freeze({
  SIMPLE_WINDOW: C.name,
  BLANK_WINDOW: _.name
});
let K = null;
function Ot(t) {
  if (t.key == "Escape")
    return Wt();
}
function Ve(t) {
  const { clientX: n, clientY: e } = t, { innerWidth: d, innerHeight: c } = window;
  let s = f.NONE;
  return e <= 5 && (s |= f.TOP), e >= c - 5 && (s |= f.BOTTOM), n <= 5 && (s |= f.LEFT), n >= d - 5 && (s |= f.RIGHT), s;
}
const u = {
  isMounted: !1,
  zIndex: 1e3,
  stack: /* @__PURE__ */ new Map(),
  ghost: Qt([]),
  options: /* @__PURE__ */ new Map(),
  topWindow: null,
  previewState: j({
    mode: i.NONE,
    width: null,
    height: null
  })
};
function Ze() {
  u.isMounted = !0;
}
function St() {
  u.isMounted = !1, u.topWindow = null, u.ghost.value = [], u.stack.clear(), u.options.clear(), u.previewState.mode = i.NONE, u.previewState.width = null, u.previewState.height = null;
}
function vt() {
  return u.zIndex;
}
function Lt() {
  return u.zIndex += 1;
}
function qe() {
  const t = u.topWindow;
  return t ? t.zIndex : 1;
}
function Ke(t) {
  typeof t == "number" && Number.isFinite(t) && (u.zIndex = Math.floor(t));
}
function It() {
  return u.topWindow;
}
function Je(t, n) {
  u.stack.set(t, n);
}
function bt(t) {
  if (!u.stack.has(t))
    return;
  const n = u.options.get(t);
  if (u.stack.delete(t), u.options.delete(t), u.isMounted) {
    const e = u.ghost.value.indexOf(t);
    if (e >= 0) {
      const d = u.ghost.value;
      d.splice(e, 1), u.ghost.value = d.slice();
    }
  } else
    typeof (n == null ? void 0 : n.cleanup) == "function" && (n.cleanup(), n.cleanup = null);
}
function Wt() {
  u.stack.size == 0 || u.topWindow == null || u.topWindow.close();
}
function $e(t) {
  return u.options.get(t);
}
function Qe(t) {
  const n = x.create(t);
  if (u.isMounted) {
    const e = u.ghost.value;
    e.push(n.uid), u.ghost.value = e.slice();
  } else
    n.cleanup = sn(n);
  return u.options.set(n.uid, n), n.uid;
}
function Ae(t) {
  return u.stack.get(t);
}
function Nt() {
  return u.ghost;
}
function Mt(t) {
  if (u.topWindow = t, t != null) {
    for (const n of u.stack.values()) {
      const e = n.windowState;
      e.focused = n === t;
    }
    t.zIndex < vt() && (t.zIndex = Lt());
  }
}
function Rt(t) {
  const n = u.stack.get(t);
  Mt(n);
}
function yt() {
  const t = tn();
  Mt(t);
}
function tn() {
  return u.stack.size == 0 ? null : Array.from(u.stack.values()).filter((n) => n.visible).sort((n, e) => e.zIndex - n.zIndex)[0];
}
function en(t) {
  let n = null;
  const e = Ve(t);
  if (u.previewState.mode = e, (e == i.LEFT || e == i.RIGHT) && (n = Y(e == i.LEFT ? i.RIGHT : i.LEFT), n)) {
    const d = window.innerWidth - n.getWindowEl().offsetWidth;
    u.previewState.width = d;
  }
  return {
    mode: u.previewState.mode,
    width: u.previewState.width,
    relatedWindow: n
  };
}
function nn() {
  return u.previewState.mode = i.NONE, u.previewState.height = null, u.previewState.width = null, i.NONE;
}
function on() {
  return u.previewState;
}
function Y(t) {
  let n = null;
  for (const e of u.stack.values())
    e.splitState.mode === t && (n == null || e.zIndex > n.zIndex) && (n = e);
  return n;
}
function ln() {
  return u.stack.size;
}
function _t(t) {
  return t == _.name ? _ : C;
}
function sn(t) {
  const n = document.createDocumentFragment(), e = _t(t.type), d = t.buildProps();
  d.appendToBody = !1;
  const c = P(e, d);
  return c.appContext = K, ot(c, n), document.body.appendChild(n), function() {
    ot(null, n);
  };
}
function rn() {
  window.addEventListener("keydown", Ot, !0);
}
function un(t) {
  K = t._context;
}
function cn() {
  K = null, St(), window.removeEventListener("keydown", Ot, !0);
}
function Wn() {
  return {
    closeTopWindow: Wt,
    getTopWindow: It,
    getTopZIndex: Lt,
    getWindowApi: Ae,
    getWindowCount: ln,
    getZIndex: vt,
    setFocusedWindow: Rt,
    cleanup: cn
  };
}
function dn(t) {
  Ke(t == null ? void 0 : t.zIndex);
}
function Nn() {
  return dt(Z);
}
const an = "HzEmqECo", fn = "XUDdvk9e", wn = "_4zCHSbJq", hn = "JddaaXJ1", Tn = "txMh9EMP", pn = "z9NcXYt7", gn = "_5iCg4sbq", En = "_6RVH3zN3", W = {
  splitWindowMask: an,
  fullscreen: fn,
  splitLeft: wn,
  splitRight: hn,
  splitTopLeft: Tn,
  splitTopRight: pn,
  splitBottomLeft: gn,
  splitBottomRight: En
};
function mn(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !B(t);
}
const On = {
  [i.FULLSCREEN]: W.fullscreen,
  [i.LEFT]: W.splitLeft,
  [i.RIGHT]: W.splitRight,
  [i.TOP_LEFT]: W.splitTopLeft,
  [i.TOP_RIGHT]: W.splitTopRight,
  [i.BOTTOM_LEFT]: W.splitBottomLeft,
  [i.BOTTOM_RIGHT]: W.splitBottomRight
}, ut = {
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
}, ct = /* @__PURE__ */ z({
  name: "WindowManager",
  setup() {
    const t = Nt(), n = on();
    function e(s) {
      const l = s.key;
      if (s.ctrlKey && l in ut) {
        const r = It();
        if (!r.resizable || !r.draggable)
          return;
        const o = Reflect.get(ut, l), a = o[r.splitState.mode] ?? o.fallback;
        r.splitState.mode = a;
        return;
      }
    }
    Ze(), window.addEventListener("keydown", e, !0), at(() => {
      St(), window.removeEventListener("keydown", e, !0);
    });
    const d = M(() => {
      const s = [W.splitWindowMask], l = On[n.mode];
      return l != null && s.push(l), s;
    });
    function c() {
      let s = null;
      if (n.mode != i.NONE) {
        const r = {
          zIndex: qe() + 1,
          width: n.width ? n.width - 20 + "px" : null
        };
        s = g("div", {
          class: d.value,
          style: r
        }, null);
      }
      return g(ft, {
        to: "body"
      }, {
        default: () => [g(At, {
          name: "fade"
        }, mn(s) ? s : {
          default: () => [s]
        })]
      });
    }
    return function() {
      return [...t.value.map((l) => {
        const r = $e(l);
        if (r == null)
          return;
        const o = _t(r.type);
        return P(o, r.buildProps());
      }), c()];
    };
  }
});
function J(t) {
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
    const [n, e, d] = t;
    if (typeof n == "string" && e != null)
      return { title: n, body: e, ...d };
  }
  return null;
}
function Mn(...t) {
  const n = J(t);
  return n == null ? (console.error("[xWindow]: 参数有误"), null) : $(n);
}
function Rn(...t) {
  const n = J(t);
  return n == null ? (console.error("[xWindow]: 参数有误"), null) : (n.type = mt.BLANK_WINDOW, $(n));
}
function yn(...t) {
  const n = J(t);
  return n == null ? (console.error("[xWindow]: 参数有误"), null) : (n.type = mt.SIMPLE_WINDOW, $(n));
}
function $(t) {
  const { displayAfterCreate: n, unmountAfterClose: e, afterUnmount: d, ...c } = t, s = {
    uid: null,
    visible: F(n !== !1),
    isUnmounted: !1
  }, l = () => s.visible.value = !0, r = () => {
    s.visible.value = !1, e !== !1 && o();
  }, o = () => {
    s.visible.value && r(), bt(s.uid), X(yt);
  }, a = Object.assign({}, c, {
    visible: s.visible,
    [ee](T) {
      T ? l() : r();
    },
    [ne]() {
      s.isUnmounted = !0;
    },
    [ie]() {
      typeof d == "function" && d();
    }
  });
  return s.uid = Qe(a), {
    uid: s.uid,
    get isUnmounted() {
      return s.isUnmounted;
    },
    get visible() {
      return s.visible.value;
    },
    show: l,
    close: r,
    unmount: o
  };
}
function Sn(t, n) {
  t.component(C.name, C), t.component(_.name, _), t.component(ct.name, ct), dn(n), rn(), un(t);
}
const vn = te, _n = { install: Sn, version: vn };
export {
  _ as BlankWindow,
  H as RESIZE_MODE,
  C as SimpleWindow,
  N as WINDOW_STATES,
  ct as WindowManager,
  cn as cleanup,
  _n as default,
  Sn as install,
  Rn as useBlankWindow,
  bn as useIcons,
  yn as useSimpleWindow,
  Mn as useWindow,
  Nn as useWindowApi,
  Wn as useWindowManager,
  vn as version,
  _n as xWindow
};
