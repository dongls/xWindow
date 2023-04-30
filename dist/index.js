/*! @dongls/xWindow v0.0.6 https://github.com/dongls/xWindow
Copyright 2023-present dongls
Released under the MIT License */
var Kt = Object.defineProperty;
var Qt = (t, n, e) => n in t ? Kt(t, n, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[n] = e;
var L = (t, n, e) => (Qt(t, typeof n != "symbol" ? n + "" : n, e), e);
import { getCurrentInstance as K, h as C, createVNode as g, defineComponent as z, inject as ft, ref as x, reactive as X, computed as y, watch as Jt, onBeforeUnmount as wt, onUnmounted as $t, provide as qt, Teleport as Tt, isVNode as F, nextTick as Z, mergeProps as At, shallowRef as te, render as st, Transition as ee } from "vue";
const ne = "0.0.6", Q = Symbol(), ie = "onUpdate:visible", oe = "onBeforeUnmount", le = "onUnmount", h = Object.freeze({
  NONE: 0,
  TOP: 1 << 0,
  BOTTOM: 1 << 1,
  LEFT: 1 << 2,
  RIGHT: 1 << 3
}), W = Object.freeze({
  TOP: h.TOP,
  BOTTOM: h.BOTTOM,
  LEFT: h.LEFT,
  RIGHT: h.RIGHT,
  TOP_LEFT: h.TOP | h.LEFT,
  TOP_RIGHT: h.TOP | h.RIGHT,
  BOTTOM_LEFT: h.BOTTOM | h.LEFT,
  BOTTOM_RIGHT: h.BOTTOM | h.RIGHT
}), i = Object.freeze({
  NONE: h.NONE,
  FULLSCREEN: h.TOP,
  LEFT: h.LEFT,
  RIGHT: h.RIGHT,
  TOP_LEFT: h.TOP | h.LEFT,
  TOP_RIGHT: h.TOP | h.RIGHT,
  BOTTOM_LEFT: h.BOTTOM | h.LEFT,
  BOTTOM_RIGHT: h.BOTTOM | h.RIGHT
}), P = Object.freeze({
  /** 禁止调整窗口大小 */
  NONE: 0,
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
}), J = {
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
  /** 窗口初始宽度，参照`CSS`的`width`语法 */
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
  /** 窗口初始高度，参照`CSS`的`height`语法 */
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
  /** 窗口的固定层级, 参照`CSS`的`zIndex`语法 */
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
}, se = {
  /** 窗口图标 */
  icon: [String, Object, Function]
};
let re = 1e3;
class I {
  /** 统一使用`UID.create`方法创建 */
  constructor() {
    L(this, "value");
    Reflect.defineProperty(this, "value", {
      enumerable: !0,
      configurable: !1,
      writable: !1,
      value: re++
    });
  }
  get wid() {
    return "window--" + this.value;
  }
  static create(n) {
    return n instanceof I ? n : new I();
  }
}
class G {
  constructor(n) {
    L(this, "uid");
    L(this, "type");
    L(this, "visible");
    L(this, "others");
    L(this, "body");
    /** 清理组件相关内容 */
    L(this, "cleanup");
    const { visible: e, body: d, type: c, ...s } = n;
    this.uid = I.create(), this.type = c, this.visible = e, this.body = d, this.others = s;
  }
  static create(n) {
    return n instanceof G ? n : new G(n);
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
const ue = "H7JlXKXGTK4-", ce = "PzRl2fA8ugU-", de = "EHL7-6c1hxo-", ae = "_4ZVmcNd62BM-", fe = "iU5hVdW6G24-", we = "B-jw6ufWF2I-", Te = "_8ieSHFWGBgo-", he = "_9HQI-NflpPY-", pe = "e746h5hsuG0-", ge = "nI2hYl14Img-", Oe = "oWTG6bvA3Xg-", me = "Yz3R0x2mXE8-", Ee = "xw3-QoH59gg-", Se = "K-SrrvkFQ7c-", ve = "QSq10DrgJLk- _8ieSHFWGBgo-", Ie = "Id-Jv1pgyi4- _8ieSHFWGBgo-", Le = "_4HqxhZPrrOU-", We = "_1wmTr8SgYkw-", be = "AVGSdUwykow- _1wmTr8SgYkw-", Re = "MWNRixkj-RQ- _1wmTr8SgYkw-", Me = "wGpk4F7JAIo- _1wmTr8SgYkw-", Ne = "BmA3h5iOK6E- _1wmTr8SgYkw-", ye = "fmiPoabUvPU- _1wmTr8SgYkw-", _e = "M7KJ4hUxg4A- _1wmTr8SgYkw-", Be = "_-6Gcri48YtQ- _1wmTr8SgYkw-", He = "l5iXh0eYtm4- _1wmTr8SgYkw-", ze = "ktQHHANby0U-", w = {
  window: ue,
  dragging: ce,
  resizing: de,
  fullscreen: ae,
  focused: fe,
  header: we,
  menu: Te,
  logo: he,
  main: pe,
  init: ge,
  title: Oe,
  menus: me,
  body: Ee,
  footer: Se,
  closeMenu: ve,
  pinMenu: Ie,
  resize: Le,
  resizeBar: We,
  resizeTop: be,
  resizeBottom: Re,
  resizeRight: Me,
  resizeLeft: Ne,
  resizeTopLeft: ye,
  resizeBottomLeft: _e,
  resizeTopRight: Be,
  resizeBottomRight: He,
  mask: ze
}, ht = '<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M590.265 511.987l305.521-305.468c21.617-21.589 21.617-56.636.027-78.252-21.616-21.617-56.663-21.617-78.279 0L512.012 433.735 206.544 128.213c-21.617-21.617-56.635-21.617-78.252 0-21.616 21.589-21.616 56.635-.027 78.252L433.76 511.987 128.211 817.482c-21.617 21.59-21.617 56.635 0 78.251 10.808 10.81 24.967 16.213 39.125 16.213 14.159 0 28.318-5.403 39.126-16.213l305.522-305.468L817.48 895.788C828.289 906.597 842.447 912 856.606 912s28.317-5.403 39.125-16.212c21.618-21.59 21.618-56.636.028-78.252L590.265 511.987z"/></svg>', pt = '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5228" width="64" height="64"><path d="M97.74775349 97.74775349h828.50449302v828.50449302H97.74775349V97.74775349z m103.56306133 103.56306133v621.37837036h621.37837036V201.31081482H201.31081482z" fill="currentColor"></path></svg>', gt = '<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M38.794 124.791v778.495h946.412V124.791H38.794zm896.678 728.033H89.292v-460.9h846.18v460.9z"/></svg>', Ot = '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M738.793 681.382v-48.331l88.242-88.243a298.676 298.676 0 00156.712-83.482 38.836 38.836 0 000-54.923l-366.15-366.15a38.836 38.836 0 00-54.923 0 298.52 298.52 0 00-83.519 156.749l-88.169 88.169h-48.332a411.145 411.145 0 00-292.59 121.232c-15.16 15.159-15.16 39.764 0 54.923L278.906 690.17 86.642 882.436a38.836 38.836 0 1054.922 54.922l192.23-192.229 228.844 228.845a38.836 38.836 0 0054.922 0 411.042 411.042 0 00121.233-292.592zM134.02 435.44a333.473 333.473 0 01208.56-72.571l64.406.037a38.836 38.836 0 0027.461-11.351L544.292 241.71a38.68 38.68 0 0011.351-27.462 180.096 180.096 0 0136.798-89.01L898.8 431.593a180.925 180.925 0 01-89.12 36.835 38.836 38.836 0 00-27.462 11.35L672.373 589.626c-7.287 7.286-11.387 17.173-11.35 27.461l.036 64.406a333.318 333.318 0 01-72.608 208.596L134.021 435.44z"/></svg>', mt = '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M845.40952426 212.52063539H65.21904746v702.17142826h780.1904768V212.52063539z m-702.17142933 624.1523808V290.53968285h624.1523808v546.13333334H143.23809493z" fill="currentColor"></path><path d="M981.53650809 76.3936505H201.34603129v78.01904746h702.17142933v624.15238187h78.01904747V76.3936505z" fill="currentColor"></path></svg>';
function Rn() {
  return {
    IconClose: ht,
    IconMax: pt,
    IconPin: Ot,
    IconWindow: gt,
    IconRestore: mt
  };
}
function m(t, n, e) {
  return n != null && Number.isFinite(n) && t < n ? n : e != null && Number.isFinite(e) && t > e ? e : t;
}
function rt(t) {
  return t == null || typeof t != "string" ? !0 : t.length == 0;
}
function Fe(t) {
  return t == null || typeof t != "string" ? !1 : t.length != 0;
}
const ut = "__xWindow_resize_prop__", b = {
  TOP: R(W.TOP),
  BOTTOM: R(W.BOTTOM),
  LEFT: R(W.LEFT),
  RIGHT: R(W.RIGHT),
  TOP_LEFT: R(W.TOP_LEFT),
  TOP_RIGHT: R(W.TOP_RIGHT),
  BOTTOM_LEFT: R(W.BOTTOM_LEFT),
  BOTTOM_RIGHT: R(W.BOTTOM_RIGHT)
}, Pe = [[w.resizeTop, b.TOP], [w.resizeBottom, b.BOTTOM], [w.resizeLeft, b.LEFT], [w.resizeRight, b.RIGHT], [w.resizeTopLeft, b.TOP_LEFT], [w.resizeTopRight, b.TOP_RIGHT], [w.resizeBottomLeft, b.BOTTOM_LEFT], [w.resizeBottomRight, b.BOTTOM_RIGHT]];
function R(t) {
  return t.toString(2).padStart(4, "0");
}
function ct(t, n, e, d) {
  const c = typeof d.minWidth == "number" && d.minWidth >= 0 ? d.minWidth : null, s = typeof d.minHeight == "number" && d.minHeight >= 0 ? d.minHeight : null, l = n.getBoundingClientRect(), r = document.documentElement.getBoundingClientRect(), o = e.relatedWindow != null, a = {};
  if (e.direction[3] == "1") {
    const T = m(l.bottom - m(t.clientY, 0), s), p = m(t.clientY - r.top, 0, window.innerHeight - T);
    a.height = T, a.top = p;
  }
  if (e.direction[2] == "1") {
    const T = m(m(t.clientY, 0, window.innerHeight) - l.top, s), p = m(t.clientY - T - r.top, 0, window.innerHeight - T);
    a.height = T, a.top = p;
  }
  if (e.direction[1] == "1") {
    const T = m(l.right - m(t.clientX, 0), c, o ? window.innerWidth - c : window.innerWidth), p = m(t.clientX - r.left, o ? c : 0, window.innerWidth - T);
    a.width = T, a.left = p;
  }
  if (e.direction[0] == "1") {
    const T = m(m(t.clientX, 0) - l.left, c, o ? window.innerWidth - c : window.innerWidth), p = m(t.clientX - T - r.left, 0, window.innerWidth - T - (o ? c : 0));
    a.width = T, a.left = p;
  }
  return a;
}
function xe(t) {
  const n = K(), e = {
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
    e.init = !1, e.direction = r.target[ut], e.top = o.top, e.left = o.left, e.width = o.width, e.height = o.height, a.mode == i.LEFT && e.direction == i.RIGHT.toString(2).padStart(4, "0") && (e.relatedWindow = V(i.RIGHT)), a.mode == i.RIGHT && e.direction == i.LEFT.toString(2).padStart(4, "0") && (e.relatedWindow = V(i.LEFT)), window.addEventListener("mousemove", c), window.addEventListener("mouseup", s);
  }
  function c(r) {
    r.preventDefault();
    const o = n == null ? void 0 : n.refs.window, a = t.splitState;
    if (e.init || (o.classList.add(w.resizing), e.init = !0), t.splitState.mode != i.NONE) {
      if (e.relatedWindow == null) {
        const p = o.getBoundingClientRect();
        t.windowState.top = p.top, t.windowState.left = p.left, t.windowState.width = p.width, t.windowState.height = p.height, t.splitState.mode = i.NONE;
      }
      e.top = t.windowState.top, e.left = t.windowState.left, e.width = t.windowState.width, e.height = t.windowState.height;
    }
    const T = ct(r, o, e, t.props);
    for (const p in T) {
      const E = Math.round(T[p]);
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
  function s(r) {
    if (r.preventDefault(), e.init) {
      const o = n == null ? void 0 : n.refs.window;
      ct(r, o, e, t.props) != null && (t.windowState.top = e.top, t.windowState.left = e.left, t.windowState.width = e.width, t.windowState.height = e.height, t.saveWindowState()), o.classList.remove(w.resizing);
      const T = t.splitState;
      if (T.mode == i.LEFT || T.mode == i.RIGHT) {
        const p = e.relatedWindow;
        if (p != null) {
          const E = t.splitState;
          E.width = e.width / window.innerWidth * 100;
          const _ = 100 - E.width;
          p.splitState.width = _;
        }
      }
    }
    window.removeEventListener("mousemove", c), window.removeEventListener("mouseup", s);
  }
  const l = Pe.map((r) => C("div", {
    className: r[0],
    ["." + ut]: r[1]
  }));
  return g("div", {
    class: w.resize,
    onMousedown: d
  }, [l]);
}
function Ge(t) {
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
  function d(l) {
    const o = (n == null ? void 0 : n.refs.window).getBoundingClientRect();
    l.clientY - o.top > 30 || (l.preventDefault(), e.init = !1, e.left = t.windowState.left, e.top = t.windowState.top, e.prevClientX = l.clientX, e.prevClientY = l.clientY, window.addEventListener("mousemove", c), window.addEventListener("mouseup", s));
  }
  function c(l) {
    l.preventDefault();
    const r = n == null ? void 0 : n.refs.window;
    e.init || (r.classList.add(w.dragging), e.init = !0), t.splitState.mode != i.NONE && (t.exitSplitMode(l), e.left = t.windowState.left, e.top = t.windowState.top), e.left = Math.round(e.left + l.clientX - e.prevClientX), e.top = Math.round(e.top + l.clientY - e.prevClientY), e.prevClientX = l.clientX, e.prevClientY = l.clientY, r.style.left = e.left + "px", r.style.top = e.top + "px";
    const o = on(l);
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
        ln();
      }
      r.classList.remove(w.dragging);
    }
    window.removeEventListener("mousemove", c), window.removeEventListener("mouseup", s);
  }
  return { dragStart: d };
}
const ke = /* @__PURE__ */ z({
  name: "WindowBody",
  props: {
    uid: I,
    body: {
      default: null
    }
  },
  setup(t) {
    const n = ft(Q);
    return function() {
      return typeof t.body == "function" ? t.body(n) : t.body;
    };
  }
});
function Ce(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !F(t);
}
const Ue = Math.floor(Number.MAX_SAFE_INTEGER / 10) - 1e4;
function De() {
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
function je(t, n, e, d, c) {
  return y(() => {
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
    ...J,
    uid: {
      type: I,
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
    const c = I.create(t.uid), s = K(), l = x(N.INIT), r = x(0), o = X(De()), a = X(Ye()), T = {
      width: 0,
      height: 0
    }, p = y(() => t.resizeMode != P.NONE), E = y(() => typeof t.zIndex == "number" && t.zIndex > 0), _ = y(() => E.value ? t.zIndex : (o.pinned ? Ue : 0) + r.value), B = {
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
        return _.value;
      },
      set zIndex(f) {
        r.value = f;
      },
      get props() {
        return t;
      },
      exitSplitMode: Dt,
      close: D,
      saveWindowState: et,
      getWindowEl() {
        return s.refs.window;
      },
      getWindow() {
        return s;
      },
      useCssClass: Zt,
      useMenus: nt
    }, U = t.draggable ? Ge(B) : null, zt = p.value ? xe(B) : null, Ft = y(() => {
      const f = [w.window];
      return l.value == N.INIT && f.push(w.init), a.mode == i.FULLSCREEN && f.push(w.fullscreen), o.focused && f.push(w.focused), Fe(t.className) && f.push(t.className), f;
    }), Pt = je(t, l, o, a, _);
    async function xt(f) {
      await Z();
      const S = f.el.getBoundingClientRect();
      if (l.value == N.INIT) {
        const j = Nt().value.length;
        let it = S.left, ot = S.top, lt = S.width, Vt = S.height;
        rt(t.left) && (it = (window.innerWidth - lt) / 2), rt(t.top) && (ot = window.innerHeight * 0.12 + (j - 1) * 30), o.width = lt, o.height = Vt, o.left = it, o.top = ot, t.fullscreen && Y(), l.value = N.MOUNTED, et();
      }
      tt();
    }
    function D(f = !1) {
      !t.closeable && f !== !0 || n("update:visible", !1);
    }
    function Gt(f) {
      t.closeable && (f == null || f.stopPropagation(), D());
    }
    function kt() {
      o.focused = !1, Z(Bt);
    }
    function Ct(f) {
      f.stopPropagation();
    }
    function tt() {
      o.focused || _t(c);
    }
    function Y() {
      if (t.resizeMode !== P.RESIZE)
        return;
      if (a.mode == i.NONE)
        return a.mode = i.FULLSCREEN;
      const {
        innerWidth: f,
        innerHeight: O
      } = window;
      o.top < 0 && (o.top = 0), o.top > O - o.height && (o.top = O - o.height), o.left < 0 && (o.left = 0), o.left > f - o.width && (o.left = f - o.width), a.mode = i.NONE;
    }
    function Ut() {
      o.pinned = !o.pinned;
    }
    function et() {
      T.width = o.width, T.height = o.height;
    }
    function Dt(f) {
      o.top = f.clientY - 15, o.left = f.clientX - T.width / 2, o.width = T.width, o.height = T.height, a.mode = i.NONE, a.width = 50, a.height = 50;
    }
    function Yt(f) {
      f.stopPropagation();
    }
    function jt(f) {
      const S = (s == null ? void 0 : s.refs.window).getBoundingClientRect();
      f.clientY - S.top > 30 || (f.preventDefault(), Y());
    }
    const Xt = Jt(() => t.visible, () => {
      t.visible || kt();
    });
    qe(c, B), wt(() => {
      n("beforeUnmount"), D(), Rt(c);
    }), $t(() => {
      n("unmount"), Xt(), l.value = N.UNMOUNTED;
    }), qt(Q, B), e(B);
    function Zt() {
      return w;
    }
    function nt(f = {}) {
      const O = [];
      if (t.pinnable && t.mask !== !0 && E.value !== !0 && O.push(g("button", {
        onClick: Ut,
        type: "button",
        innerHTML: Ot,
        class: o.pinned ? w.pinMenu : w.menu,
        title: "固定"
      }, null)), t.resizeMode == P.RESIZE) {
        const S = a.mode == i.FULLSCREEN ? mt : pt, v = a.mode == i.FULLSCREEN ? "还原" : "最大化";
        O.push(g("button", {
          onClick: Y,
          type: "button",
          innerHTML: S,
          class: w.menu,
          title: v
        }, null));
      }
      return t.closeable && O.push(g("button", {
        onClick: Gt,
        type: "button",
        innerHTML: ht,
        class: w.closeMenu,
        title: "关闭"
      }, null)), O.length == 0 ? null : (f == null ? void 0 : f.custom) === !0 ? O : g("div", {
        class: w.menus,
        onMousedown: Ct
      }, [O]);
    }
    return function() {
      if (!t.visible)
        return null;
      const f = typeof d.header == "function" ? d.header(nt) : null, O = g("div", {
        class: w.main,
        onMousedown: U == null ? void 0 : U.dragStart,
        onDblclick: jt
      }, [f, g("div", {
        class: w.body,
        onClick: Yt
      }, [g(ke, {
        body: t.body,
        key: c.wid,
        uid: c
      }, null)])]), S = {
        ref: "window",
        id: t.id ?? c.wid,
        onVnodeMounted: xt,
        onMousedownCapture: tt,
        class: Ft.value,
        style: Pt.value
      };
      let v = C("div", S, [O, zt]);
      if (t.mask === !0) {
        const j = {
          zIndex: _.value
        };
        v = g("div", {
          class: w.mask,
          style: j
        }, [v]);
      }
      return t.appendToBody ? g(Tt, {
        to: "body"
      }, Ce(v) ? v : {
        default: () => [v]
      }) : v;
    };
  }
});
function Xe(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !F(t);
}
const H = /* @__PURE__ */ z({
  name: "BlankWindow",
  props: {
    ...J
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
    } = e, r = I.create(e.uid);
    return function() {
      const o = {
        ...t,
        ...l,
        uid: r,
        body: n.default
      };
      return g(Et, o, Xe(c) ? c : {
        default: () => [c]
      });
    };
  }
});
function Ze(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !F(t);
}
function Ve(t) {
  return typeof t == "string" ? g("i", {
    class: [w.logo, "icon"]
  }, null) : F(t) ? t : typeof t == "function" ? t() : g("i", {
    class: w.logo,
    innerHTML: gt
  }, null);
}
const k = /* @__PURE__ */ z({
  name: "SimpleWindow",
  props: {
    ...J,
    ...se
  },
  setup(t, {
    slots: n,
    attrs: e
  }) {
    const d = I.create(e.uid), c = x(null);
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
          class: w.header,
          onDblclick: s
        }, [Ve(t.icon), g("div", {
          class: w.title
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
      return g(Et, At(p, {
        ref: c
      }), Ze(l) ? l : {
        default: () => [l]
      });
    };
  }
}), St = Object.freeze({
  SIMPLE_WINDOW: k.name,
  BLANK_WINDOW: H.name
});
let $ = null;
function vt(t) {
  if (t.key == "Escape")
    return Mt();
}
function Ke(t) {
  const { clientX: n, clientY: e } = t, { innerWidth: d, innerHeight: c } = window;
  let s = h.NONE;
  return e <= 5 && (s |= h.TOP), e >= c - 5 && (s |= h.BOTTOM), n <= 5 && (s |= h.LEFT), n >= d - 5 && (s |= h.RIGHT), s;
}
const u = {
  isMounted: !1,
  zIndex: 1e3,
  stack: /* @__PURE__ */ new Map(),
  ghost: te([]),
  options: /* @__PURE__ */ new Map(),
  topWindow: null,
  previewState: X({
    mode: i.NONE,
    width: null,
    height: null
  })
};
function Qe() {
  u.isMounted = !0;
}
function It() {
  u.isMounted = !1, u.topWindow = null, u.ghost.value = [], u.stack.clear(), u.options.clear(), u.previewState.mode = i.NONE, u.previewState.width = null, u.previewState.height = null;
}
function Lt() {
  return u.zIndex;
}
function Wt() {
  return u.zIndex += 1;
}
function Je() {
  const t = u.topWindow;
  return t ? t.zIndex : 1;
}
function $e(t) {
  typeof t == "number" && Number.isFinite(t) && (u.zIndex = Math.floor(t));
}
function bt() {
  return u.topWindow;
}
function qe(t, n) {
  u.stack.set(t, n);
}
function Rt(t) {
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
    typeof n.cleanup == "function" && (n.cleanup(), n.cleanup = null);
}
function Mt() {
  u.stack.size == 0 || u.topWindow == null || u.topWindow.close();
}
function Ae(t) {
  return u.options.get(t);
}
function tn(t) {
  const n = G.create(t);
  if (u.isMounted) {
    const e = u.ghost.value;
    e.push(n.uid), u.ghost.value = e.slice();
  } else
    n.cleanup = un(n);
  return u.options.set(n.uid, n), n.uid;
}
function en(t) {
  return u.stack.get(t);
}
function Nt() {
  return u.ghost;
}
function yt(t) {
  if (u.topWindow = t, t != null) {
    for (const n of u.stack.values()) {
      const e = n.windowState;
      e.focused = n === t;
    }
    t.zIndex < Lt() && (t.zIndex = Wt());
  }
}
function _t(t) {
  const n = u.stack.get(t);
  yt(n);
}
function Bt() {
  const t = nn();
  yt(t);
}
function nn() {
  return u.stack.size == 0 ? null : Array.from(u.stack.values()).filter((n) => n.visible).sort((n, e) => e.zIndex - n.zIndex)[0];
}
function on(t) {
  let n = null;
  const e = Ke(t);
  if (u.previewState.mode = e, (e == i.LEFT || e == i.RIGHT) && (n = V(e == i.LEFT ? i.RIGHT : i.LEFT), n)) {
    const d = window.innerWidth - n.getWindowEl().offsetWidth;
    u.previewState.width = d;
  }
  return {
    mode: u.previewState.mode,
    width: u.previewState.width,
    relatedWindow: n
  };
}
function ln() {
  return u.previewState.mode = i.NONE, u.previewState.height = null, u.previewState.width = null, i.NONE;
}
function sn() {
  return u.previewState;
}
function V(t) {
  let n = null;
  for (const e of u.stack.values())
    e.splitState.mode === t && (n == null || e.zIndex > n.zIndex) && (n = e);
  return n;
}
function rn() {
  return u.stack.size;
}
function Ht(t) {
  return t == H.name ? H : k;
}
function un(t) {
  const n = document.createDocumentFragment(), e = Ht(t.type), d = t.buildProps();
  d.appendToBody = !1;
  const c = C(e, d);
  return c.appContext = $, st(c, n), document.body.appendChild(n), function() {
    st(null, n);
  };
}
function cn() {
  window.addEventListener("keydown", vt, !0);
}
function dn(t) {
  $ = t._context;
}
function an() {
  $ = null, It(), window.removeEventListener("keydown", vt, !0);
}
function Mn() {
  return {
    closeTopWindow: Mt,
    getTopWindow: bt,
    getTopZIndex: Wt,
    getWindowApi: en,
    getWindowCount: rn,
    getZIndex: Lt,
    setFocusedWindow: _t,
    cleanup: an
  };
}
function fn(t) {
  $e(t == null ? void 0 : t.zIndex);
}
function Nn() {
  return ft(Q);
}
const wn = "FmVMmgP6zyw-", Tn = "cRBxd8q9gfU-", hn = "pG7CwNOo88U-", pn = "uN9dQU07tlg-", gn = "WZwjXs4FPMs-", On = "jKQsQOLHRSE-", mn = "LDMmH7O6eHg-", En = "_0kT-lzOVlCA-", M = {
  splitWindowMask: wn,
  fullscreen: Tn,
  splitLeft: hn,
  splitRight: pn,
  splitTopLeft: gn,
  splitTopRight: On,
  splitBottomLeft: mn,
  splitBottomRight: En
};
function Sn(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !F(t);
}
const vn = {
  [i.FULLSCREEN]: M.fullscreen,
  [i.LEFT]: M.splitLeft,
  [i.RIGHT]: M.splitRight,
  [i.TOP_LEFT]: M.splitTopLeft,
  [i.TOP_RIGHT]: M.splitTopRight,
  [i.BOTTOM_LEFT]: M.splitBottomLeft,
  [i.BOTTOM_RIGHT]: M.splitBottomRight
}, dt = {
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
}, at = /* @__PURE__ */ z({
  name: "WindowManager",
  setup() {
    const t = Nt(), n = sn();
    function e(s) {
      const l = s.key;
      if (s.ctrlKey && l in dt) {
        const r = bt();
        if (!r.resizable || !r.draggable)
          return;
        const o = Reflect.get(dt, l), a = o[r.splitState.mode] ?? o.fallback;
        r.splitState.mode = a;
        return;
      }
    }
    Qe(), window.addEventListener("keydown", e, !0), wt(() => {
      It(), window.removeEventListener("keydown", e, !0);
    });
    const d = y(() => {
      const s = [M.splitWindowMask], l = vn[n.mode];
      return l != null && s.push(l), s;
    });
    function c() {
      let s = null;
      if (n.mode != i.NONE) {
        const r = {
          zIndex: Je() + 1,
          width: n.width ? n.width - 20 + "px" : null
        };
        s = g("div", {
          class: d.value,
          style: r
        }, null);
      }
      return g(Tt, {
        to: "body"
      }, {
        default: () => [g(ee, {
          name: "fade"
        }, Sn(s) ? s : {
          default: () => [s]
        })]
      });
    }
    return function() {
      return [...t.value.map((l) => {
        const r = Ae(l);
        if (r == null)
          return;
        const o = Ht(r.type);
        return C(o, r.buildProps());
      }), c()];
    };
  }
});
function q(t) {
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
function yn(...t) {
  const n = q(t);
  return n == null ? (console.error("[xWindow]: 参数有误"), null) : A(n);
}
function _n(...t) {
  const n = q(t);
  return n == null ? (console.error("[xWindow]: 参数有误"), null) : (n.type = St.BLANK_WINDOW, A(n));
}
function Bn(...t) {
  const n = q(t);
  return n == null ? (console.error("[xWindow]: 参数有误"), null) : (n.type = St.SIMPLE_WINDOW, A(n));
}
function A(t) {
  const { displayAfterCreate: n, unmountAfterClose: e, afterUnmount: d, ...c } = t, s = {
    uid: null,
    visible: x(n !== !1),
    isUnmounted: !1
  }, l = () => s.visible.value = !0, r = () => {
    s.visible.value = !1, e !== !1 && o();
  }, o = () => {
    s.visible.value && r(), Rt(s.uid), Z(Bt);
  }, a = Object.assign({}, c, {
    visible: s.visible,
    [ie](T) {
      T ? l() : r();
    },
    [oe]() {
      s.isUnmounted = !0;
    },
    [le]() {
      typeof d == "function" && d();
    }
  });
  return s.uid = tn(a), {
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
function In(t, n) {
  t.component(k.name, k), t.component(H.name, H), t.component(at.name, at), fn(n), cn(), dn(t);
}
const Ln = ne, Hn = { install: In, version: Ln };
export {
  H as BlankWindow,
  P as RESIZE_MODE,
  k as SimpleWindow,
  N as WINDOW_STATES,
  at as WindowManager,
  an as cleanup,
  Hn as default,
  In as install,
  _n as useBlankWindow,
  Rn as useIcons,
  Bn as useSimpleWindow,
  yn as useWindow,
  Nn as useWindowApi,
  Mn as useWindowManager,
  Ln as version,
  Hn as xWindow
};
