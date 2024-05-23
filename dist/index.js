/*! @dongls/xWindow v0.1.0 https://github.com/dongls/xWindow
Copyright 2023-present dongls
Released under the MIT License */
var vt = Object.defineProperty;
var Lt = (n, e, t) => e in n ? vt(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var r = (n, e, t) => (Lt(n, typeof e != "symbol" ? e + "" : e, t), t);
import { defineComponent as D, computed as x, h as A, shallowRef as xt, reactive as tt, ref as et, provide as Wt, createVNode as T, Teleport as nt, isVNode as k, nextTick as K, render as J, inject as yt, onBeforeUnmount as Pt, Transition as Nt } from "vue";
const St = "0.1.0", it = Symbol(), L = Object.freeze({
  WINDOW: "x-window",
  TRANSITION: "x-window-is-transition",
  MENU: "x-window-is-menu",
  FOCUSED: "x-window-is-focused",
  MAXIMIZE: "x-window-is-maximize",
  HEADER: "x-window-header",
  BODY: "x-window-body"
}), u = Object.freeze({
  NONE: 0,
  TOP: 1,
  BOTTOM: 2,
  LEFT: 4,
  RIGHT: 8
}), b = Object.freeze({
  TOP: u.TOP,
  BOTTOM: u.BOTTOM,
  LEFT: u.LEFT,
  RIGHT: u.RIGHT,
  TOP_LEFT: u.TOP | u.LEFT,
  TOP_RIGHT: u.TOP | u.RIGHT,
  BOTTOM_LEFT: u.BOTTOM | u.LEFT,
  BOTTOM_RIGHT: u.BOTTOM | u.RIGHT
}), o = Object.freeze({
  NONE: u.NONE,
  MAXIMIZE: u.TOP,
  LEFT: u.LEFT,
  RIGHT: u.RIGHT,
  TOP_LEFT: u.TOP | u.LEFT,
  TOP_RIGHT: u.TOP | u.RIGHT,
  BOTTOM_LEFT: u.BOTTOM | u.LEFT,
  BOTTOM_RIGHT: u.BOTTOM | u.RIGHT
}), W = Object.freeze({
  /** 禁止调整窗口大小 */
  DISABLED: 0,
  /** 允许调整窗口大小，允许最大化（默认）*/
  RESIZE: 1,
  /** 只允许调整窗口大小 */
  RESIZE_ONLY: 2
}), y = Object.freeze({
  /** 窗口初始化，不显示 */
  INIT: 0,
  /** 窗口初始化完成，并展示 */
  MOUNTED: 1,
  /** 窗口已销毁 */
  UNMOUNTED: 2
}), _t = Object.freeze({
  SIMPLE_WINDOW: "SimpleWindow",
  BLANK_WINDOW: "BlankWindow"
}), O = Object.freeze({
  /** 关闭按钮 */
  CLOSE: 0,
  /** 最大化按钮 */
  MAXIMIZE: 1,
  /** 恢复按钮 */
  RESTORE: 2,
  /** 固定按钮 */
  PIN: 3,
  /** 取消固定按钮 */
  UNPIN: 4
});
class Z {
  constructor(e, t, i) {
    /** 事件类型 */
    r(this, "type");
    /** 事件是否被阻止继续执行 */
    r(this, "stopped", !1);
    /** 是否已取消默认行为 */
    r(this, "defaultPrevented", !1);
    /** 事件触发窗口实例 */
    r(this, "instance");
    /** 事件的参数 */
    r(this, "detail");
    this.type = e, this.instance = t, this.detail = i;
  }
  /** 阻止事件继续执行 */
  stop() {
    this.stopped = !0;
  }
  /** 阻止事件默认行为 */
  preventDefault() {
    this.defaultPrevented = !0;
  }
}
class H {
  constructor() {
    r(this, "ALL_EVENTS", /* @__PURE__ */ new Map());
  }
  static NOOP() {
  }
  /** 监听事件 */
  on(e, t) {
    const i = this.ALL_EVENTS.get(e);
    return i == null ? (this.ALL_EVENTS.set(e, [t]), this) : i.includes(t) ? this : (i.push(t), this);
  }
  /** 监听事件，仅生效一次 */
  once(e, t) {
    const i = (s) => {
      t(s), this.off(e, i, !0);
    };
    return this.on(e, i), this;
  }
  /** 取消事件监听 */
  off(e, t, i = !1) {
    const s = this.ALL_EVENTS.get(e);
    if (s == null)
      return this;
    const a = s.indexOf(t);
    return a < 0 ? this : (i ? s.splice(a, 1, H.NOOP) : s.splice(a, 1), this);
  }
  /** 触发一个事件 */
  dispatch(e) {
    const t = this.ALL_EVENTS.get(e.type);
    if (t == null)
      return e;
    for (const s of t)
      if (typeof s == "function" && s(e), e.stopped)
        break;
    const i = t.filter((s) => s != H.NOOP);
    return this.ALL_EVENTS.set(e.type, i), e;
  }
  /** 清空所有事件监听函数 */
  cleanup() {
    this.ALL_EVENTS.clear();
  }
}
function I(n, e, t) {
  return e != null && Number.isFinite(e) && n < e ? e : t != null && Number.isFinite(t) && n > t ? t : n;
}
function q(n) {
  return n == null || typeof n != "string" ? !0 : n.length == 0;
}
function Ct(n) {
  return n == null || typeof n != "string" ? !1 : n.length != 0;
}
function Ht(n) {
  n.stopPropagation();
}
const Bt = {
  top: "offsetTop",
  left: "offsetLeft",
  width: "offsetWidth",
  height: "offsetHeight"
};
class Dt {
  constructor(e) {
    r(this, "init", !1);
    r(this, "defaultPrevented", !1);
    r(this, "originalEvent");
    r(this, "target");
    r(this, "direction");
    this.originalEvent = e, this.target = e.target, this.direction = Reflect.get(this.target, F.PROP);
  }
  createEvent(e, t) {
    return new Z(e, t, this);
  }
}
class F {
  constructor(e) {
    r(this, "context");
    r(this, "window");
    r(this, "onResizing");
    r(this, "onResizeend");
    this.window = e;
  }
  resizestart(e) {
    e.stopPropagation(), e.preventDefault();
    const t = new Dt(e);
    this.context = t, this.onResizing = this.resizing.bind(this), this.onResizeend = this.resizeend.bind(this), window.addEventListener("pointermove", this.onResizing), window.addEventListener("pointerup", this.onResizeend);
  }
  resizing(e) {
    if (this.context == null)
      return;
    e.stopPropagation(), e.preventDefault();
    const t = this.context;
    if (!t.init) {
      if (this.window.dispatch(this.context.createEvent("resizeStart", this.window)).defaultPrevented)
        return this.cleanup();
      t.target.setPointerCapture(e.pointerId), t.init = !0;
    }
    const i = this.calcWindowState(e), s = this.window.getElement();
    for (const f in i) {
      const h = Math.round(i[f]);
      Reflect.set(s.style, f, h + "px");
    }
    t.originalEvent = e;
    const a = this.context.createEvent("resizing", this.window);
    this.window.dispatch(a);
  }
  resizeend(e) {
    if (this.context == null)
      return;
    e.stopPropagation(), e.preventDefault();
    const t = this.context;
    if (t.init) {
      const i = t.createEvent("resizeEnd", this.window);
      this.window.dispatch(i), this.patchWindowState(this.calcWindowState(e)), t.target.releasePointerCapture(e.pointerId);
    }
    this.cleanup();
  }
  cleanup() {
    this.onResizing && window.removeEventListener("pointermove", this.onResizing), this.onResizeend && window.removeEventListener("pointerup", this.onResizeend), this.onResizing = void 0, this.onResizeend = void 0, this.context = void 0;
  }
  calcWindowState(e) {
    const t = this.context, i = this.window.options, s = typeof i.minWidth == "number" && i.minWidth >= 0 ? i.minWidth : 360, a = typeof i.minHeight == "number" && i.minHeight >= 0 ? i.minHeight : 32, f = this.window.getElement().getBoundingClientRect(), h = document.documentElement.getBoundingClientRect(), p = {};
    if (t.direction & u.TOP) {
      const g = I(f.bottom - I(e.clientY, 0), a), m = I(e.clientY - h.top, 0, window.innerHeight - g);
      p.height = g, p.top = m;
    }
    if (t.direction & u.BOTTOM) {
      const g = I(I(e.clientY, 0, window.innerHeight) - f.top, a), m = I(e.clientY - g - h.top, 0, window.innerHeight - g);
      p.height = g, p.top = m;
    }
    if (t.direction & u.LEFT) {
      const g = I(f.right - I(e.clientX, 0), s, window.innerWidth), m = I(e.clientX - h.left, 0, window.innerWidth - g);
      p.width = g, p.left = m;
    }
    if (t.direction & u.RIGHT) {
      const g = I(I(e.clientX, 0) - f.left, s, window.innerWidth), m = I(e.clientX - g - h.left, 0, window.innerWidth - g - 0);
      p.width = g, p.left = m;
    }
    return p;
  }
  patchWindowState(e) {
    const t = this.window.state;
    for (const i in e) {
      const s = Math.round(e[i]), a = Bt[i];
      a != null && Reflect.set(t, a, s);
    }
  }
}
r(F, "PROP", "__xwindow_resize_prop__");
const At = "_1T2rhwiL", kt = "yi9w1sZD", Ft = "Ja2o9U31", Gt = "_1eMSsKoB", Xt = "_3czvPpS2", Zt = "GiVk7T8N", Vt = "VuG4WNig x-window-is-menu", Yt = "yBPezU8e", jt = "xbuRK23n", Ut = "_9t1NJBZM", Kt = "shyxrRzw", Jt = "nkEGqTFw", qt = "pk12TusX", $t = "noixF94i", Qt = "ifXDegN1 VuG4WNig x-window-is-menu", te = "X5A6roxN VuG4WNig x-window-is-menu", ee = "PPmfTMRL", ne = "v8UGXgKi PPmfTMRL", ie = "_74VJ9GNt PPmfTMRL", oe = "gg9Mcwey PPmfTMRL", se = "Tw7sCaLt PPmfTMRL", re = "CPuApFyD PPmfTMRL", ce = "VBRi4FWg PPmfTMRL", ae = "gCRpuZdB PPmfTMRL", le = "iRYpNoUT PPmfTMRL", ue = "xTcKGSVA", w = {
  window: At,
  dragging: kt,
  resizing: Ft,
  maximize: Gt,
  focused: Xt,
  header: Zt,
  menu: Vt,
  logo: Yt,
  main: jt,
  init: Ut,
  title: Kt,
  menus: Jt,
  body: qt,
  footer: $t,
  closeMenu: Qt,
  pinMenu: te,
  resizeBar: ee,
  resizeTop: ne,
  resizeBottom: ie,
  resizeRight: oe,
  resizeLeft: se,
  resizeTopLeft: re,
  resizeBottomLeft: ce,
  resizeTopRight: ae,
  resizeBottomRight: le,
  mask: ue
}, de = /* @__PURE__ */ D({
  name: "WindowBody",
  props: {
    wid: String,
    body: {
      type: [Object, Function, String, Number],
      default: null
    },
    abstractWindow: {
      type: Object,
      required: !0
    }
  },
  setup(n) {
    return function() {
      const e = typeof n.body == "function" ? n.body(n.abstractWindow) : n.body;
      return e == null && console.warn("[xWindow] 请指定窗体内容:", n.abstractWindow.options.title), e;
    };
  }
}), fe = Math.floor(Number.MAX_SAFE_INTEGER / 10) - 1e4;
function he() {
  return {
    visible: !1,
    offsetWidth: 0,
    offsetHeight: 0,
    offsetTop: 0,
    offsetLeft: 0,
    focused: !1,
    pinned: !1,
    zIndex: 0,
    splitMode: o.NONE
  };
}
const we = [[w.resizeTop, b.TOP], [w.resizeBottom, b.BOTTOM], [w.resizeLeft, b.LEFT], [w.resizeRight, b.RIGHT], [w.resizeTopLeft, b.TOP_LEFT], [w.resizeTopRight, b.TOP_RIGHT], [w.resizeBottomLeft, b.BOTTOM_LEFT], [w.resizeBottomRight, b.BOTTOM_RIGHT]];
function pe(n, e, t, i) {
  return x(() => {
    const s = n.options;
    if (e.value == y.INIT)
      return {
        width: s.width,
        height: s.height,
        left: s.left,
        top: s.top
      };
    const a = s.mask ? null : i.value;
    return {
      top: t.offsetTop + "px",
      left: t.offsetLeft + "px",
      width: t.offsetWidth + "px",
      height: e.value == y.INIT ? void 0 : t.offsetHeight + "px",
      zIndex: a
    };
  });
}
function ge(n, e) {
  return n == W.DISABLED ? null : we.map((t) => A("div", {
    ["." + F.PROP]: t[1],
    className: t[0],
    onPointerdown: e
  }));
}
function Te(n) {
  return typeof n == "function" || Object.prototype.toString.call(n) === "[object Object]" && !k(n);
}
const N = /* @__PURE__ */ D({
  name: "BlankWindow",
  props: {
    abstractWindow: {
      type: Object,
      required: !0
    }
  },
  setup(n, {
    slots: e
  }) {
    const t = xt(), i = tt(he()), s = et(y.INIT), a = x(() => {
      const c = n.abstractWindow.options;
      return typeof c.zIndex == "number" && c.zIndex > 0;
    }), f = x(() => {
      const c = n.abstractWindow.options;
      return a.value ? c.zIndex : (i.pinned ? fe : 0) + i.zIndex;
    }), h = pe(n.abstractWindow, s, i, f), p = x(() => {
      const c = [L.WINDOW, w.window], d = n.abstractWindow;
      return s.value == y.INIT && c.push(w.init), i.splitMode == o.MAXIMIZE && c.push(w.maximize, L.MAXIMIZE), i.focused && c.push(w.focused, L.FOCUSED), Ct(d.options.className) && c.push(d.options.className), c;
    }), g = x(() => {
      const c = [], E = n.abstractWindow.options;
      return E.pinnable && E.mask !== !0 && a.value !== !0 && c.push(i.pinned ? O.PIN : O.UNPIN), E.resizeMode == W.RESIZE && c.push(i.splitMode == o.MAXIMIZE ? O.RESTORE : O.MAXIMIZE), E.closeable && c.push(O.CLOSE), c;
    }), m = {
      getElement: S,
      getRenderState: Tt,
      useCssClass: Et,
      useMenus: It
    };
    function S() {
      return t.value;
    }
    function Tt() {
      return s.value;
    }
    function Et() {
      return w;
    }
    async function U(c) {
      c == null || c.preventDefault(), n.abstractWindow.toggleMaximize();
    }
    function mt() {
      JSON.parse(JSON.stringify(i));
    }
    function It() {
      return g;
    }
    function Ot(c) {
      const d = Array.from(c.querySelectorAll("[autofocus]"));
      for (const E of d)
        if (E instanceof HTMLElement && E.autofocus)
          return E.focus();
    }
    async function Mt(c) {
      await K();
      const d = n.abstractWindow, E = d.options, _ = c.el, z = _.getBoundingClientRect();
      if (s.value == y.INIT) {
        let C = Math.round(z.left), M = Math.round(z.top);
        q(E.left) && (C = Math.floor((window.innerWidth - z.width) / 2)), q(E.top) && (M = Math.floor((window.innerHeight - z.height) / 2)), i.offsetWidth = z.width, i.offsetHeight = z.height, i.offsetLeft = C, i.offsetTop = M, E.maximize && U(), s.value = y.MOUNTED, mt(), K(() => {
          const G = d.createEvent("show");
          d.dispatch(G), Ot(_);
        });
      }
      d.focus();
    }
    function Rt(c) {
      const d = n.abstractWindow;
      d.focus(), !(!d.allowDrag || d.isMaximize) && d.dragstart(c);
    }
    function zt(c) {
      const d = S();
      if (d == null)
        return;
      const E = d.getBoundingClientRect();
      c.clientY - E.top > n.abstractWindow.allowDragArea || U(c);
    }
    function bt() {
      const c = n.abstractWindow;
      c.component = m, c.state = i, Re(c.id, c);
      const d = c.createEvent("created");
      c.dispatch(d);
    }
    return Wt(it, n.abstractWindow), bt(), function() {
      const c = n.abstractWindow, d = c.options;
      if (i.visible !== !0)
        return null;
      const E = typeof e.header == "function" ? e.header(m) : null, _ = T("div", {
        class: w.main,
        onDblclick: zt
      }, [E, T("div", {
        class: [w.body, L.BODY, d.bodyClassName]
      }, [T(de, {
        body: c.body,
        abstractWindow: n.abstractWindow,
        key: c.wid
      }, null)])]), z = {
        ref: t,
        id: c.wid,
        onVnodeMounted: Mt,
        onPointerdown: Rt,
        class: p.value,
        style: h.value
      }, C = ge(d.resizeMode, c.resizestart);
      let M = A("div", z, [_, C]);
      if (d.mask === !0) {
        const G = {
          zIndex: f.value
        };
        M = T("div", {
          class: w.mask,
          style: G
        }, [M]);
      }
      return d.teleport === !1 ? M : T(nt, {
        to: d.teleport
      }, Te(M) ? M : {
        default: () => [M]
      });
    };
  }
}), ot = '<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M590.265 511.987l305.521-305.468c21.617-21.589 21.617-56.636.027-78.252-21.616-21.617-56.663-21.617-78.279 0L512.012 433.735 206.544 128.213c-21.617-21.617-56.635-21.617-78.252 0-21.616 21.589-21.616 56.635-.027 78.252L433.76 511.987 128.211 817.482c-21.617 21.59-21.617 56.635 0 78.251 10.808 10.81 24.967 16.213 39.125 16.213 14.159 0 28.318-5.403 39.126-16.213l305.522-305.468L817.48 895.788C828.289 906.597 842.447 912 856.606 912s28.317-5.403 39.125-16.212c21.618-21.59 21.618-56.636.028-78.252L590.265 511.987z"/></svg>', st = '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5228" width="64" height="64"><path d="M97.74775349 97.74775349h828.50449302v828.50449302H97.74775349V97.74775349z m103.56306133 103.56306133v621.37837036h621.37837036V201.31081482H201.31081482z" fill="currentColor"></path></svg>', rt = '<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M38.794 124.791v778.495h946.412V124.791H38.794zm896.678 728.033H89.292v-460.9h846.18v460.9z"/></svg>', ct = '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M738.793 681.382v-48.331l88.242-88.243a298.676 298.676 0 00156.712-83.482 38.836 38.836 0 000-54.923l-366.15-366.15a38.836 38.836 0 00-54.923 0 298.52 298.52 0 00-83.519 156.749l-88.169 88.169h-48.332a411.145 411.145 0 00-292.59 121.232c-15.16 15.159-15.16 39.764 0 54.923L278.906 690.17 86.642 882.436a38.836 38.836 0 1054.922 54.922l192.23-192.229 228.844 228.845a38.836 38.836 0 0054.922 0 411.042 411.042 0 00121.233-292.592zM134.02 435.44a333.473 333.473 0 01208.56-72.571l64.406.037a38.836 38.836 0 0027.461-11.351L544.292 241.71a38.68 38.68 0 0011.351-27.462 180.096 180.096 0 0136.798-89.01L898.8 431.593a180.925 180.925 0 01-89.12 36.835 38.836 38.836 0 00-27.462 11.35L672.373 589.626c-7.287 7.286-11.387 17.173-11.35 27.461l.036 64.406a333.318 333.318 0 01-72.608 208.596L134.021 435.44z"/></svg>', at = '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M845.40952426 212.52063539H65.21904746v702.17142826h780.1904768V212.52063539z m-702.17142933 624.1523808V290.53968285h624.1523808v546.13333334H143.23809493z" fill="currentColor"></path><path d="M981.53650809 76.3936505H201.34603129v78.01904746h702.17142933v624.15238187h78.01904747V76.3936505z" fill="currentColor"></path></svg>';
function sn() {
  return {
    IconClose: ot,
    IconMax: st,
    IconPin: ct,
    IconWindow: rt,
    IconRestore: at
  };
}
function Ee(n) {
  return typeof n == "function" || Object.prototype.toString.call(n) === "[object Object]" && !k(n);
}
function me(n) {
  const e = n.options.icon;
  return typeof e == "string" ? T("i", {
    class: [w.logo, "icon", e]
  }, null) : k(e) ? e : typeof e == "function" ? e(n) : T("i", {
    class: w.logo,
    innerHTML: rt
  }, null);
}
const B = /* @__PURE__ */ D({
  name: "SimpleWindow",
  props: {
    abstractWindow: {
      type: Object,
      required: !0
    }
  },
  setup(n) {
    const e = n.abstractWindow, t = {
      header() {
        const i = e.useMenus();
        return T("div", {
          class: w.header
        }, [me(e), T("div", {
          class: w.title
        }, [e.options.title ?? "新窗口"]), T("div", {
          class: w.menus,
          onMousedown: Ht
        }, [i.value.map((s) => gt(e, s))])]);
      }
    };
    return function() {
      return T(N, {
        abstractWindow: n.abstractWindow
      }, Ee(t) ? t : {
        default: () => [t]
      });
    };
  }
}), lt = Object.freeze({
  SIMPLE_WINDOW: B.name,
  BLANK_WINDOW: N.name
});
function ut(n) {
  return n == N.name ? N : B;
}
function dt(n) {
  if (n.key == "Escape")
    return pt({ pressEsc: !0, forced: !1 });
}
function Ie() {
  l.isMounted = !0;
}
function ft() {
  l.isMounted = !1, l.topWindow = null, l.ids.value = [], l.stack.clear();
}
function ht() {
  return l.zIndex;
}
function wt() {
  return l.zIndex += 1;
}
function Oe() {
  const n = l.topWindow;
  return n ? n.state.zIndex : 1;
}
function Me() {
  return l.topWindow;
}
function Re(n, e) {
  l.stack.set(n, e);
}
function ze(n) {
  if (console.log("[xWindow]: remove window", n), !l.stack.has(n) || (l.stack.delete(n), !l.isMounted))
    return;
  const e = l.ids.value.indexOf(n);
  if (e < 0)
    return;
  l.ids.value.splice(e, 1);
}
function pt(n) {
  if (l.stack.size == 0 || l.topWindow == null)
    return;
  const e = l.topWindow;
  (n == null ? void 0 : n.pressEsc) === !0 && e.options.closeOnPressEsc !== !0 || l.topWindow.cancel(n == null ? void 0 : n.forced);
}
function be(n) {
  const e = document.createDocumentFragment(), t = ut(n.type), i = A(t, { abstractWindow: n });
  i.appContext = l.appContext, J(i, e), document.body.appendChild(e), n.on("beforeDestroy", () => {
    J(null, e);
  });
}
function ve(n) {
  const e = X.create(n);
  return l.isMounted ? (l.ids.value.push(e.id), l.stack.set(e.id, e), e) : (be(e), e);
}
function Le(n) {
  return l.stack.get(n);
}
function xe() {
  return l.ids;
}
function V(n) {
  if (l.topWindow = n, n != null) {
    for (const e of l.stack.values()) {
      const t = e.state;
      t != null && (t.focused = e === n);
    }
    n.state != null && n.state.zIndex < ht() && (n.state.zIndex = wt());
  }
}
function We(n) {
  const e = l.stack.get(n);
  V(e);
}
function ye() {
  const n = Pe();
  V(n);
}
function Pe() {
  if (l.stack.size == 0)
    return;
  let n;
  for (const e of l.stack.values())
    if (!(e.state == null || e.state.visible !== !0)) {
      if (n == null) {
        n = e;
        continue;
      }
      n.state.zIndex < e.state.zIndex && (n = e);
    }
  return n;
}
function Ne() {
  return l.previewState;
}
function Se() {
  return l.stack.size;
}
function _e() {
  window.addEventListener("keydown", dt, !0);
}
function Ce(n) {
  l.appContext = n._context;
}
function He() {
  l.appContext = null, ft(), window.removeEventListener("keydown", dt, !0);
}
function rn() {
  return {
    closeTopWindow: pt,
    getTopWindow: Me,
    getTopZIndex: wt,
    getWindowCount: Se,
    getZIndex: ht,
    setFocusedWindow: V,
    cleanup: He
  };
}
class Be {
  constructor(e, t) {
    r(this, "moved", !1);
    r(this, "originalEvent");
    r(this, "target");
    r(this, "deltaX");
    r(this, "deltaY");
    r(this, "initialX");
    r(this, "initialY");
    r(this, "left", 0);
    r(this, "top", 0);
    r(this, "prevClientX");
    r(this, "prevClientY");
    const i = e.getBoundingClientRect();
    this.originalEvent = t, this.target = e, this.deltaX = i.left - t.clientX, this.deltaY = i.top - t.clientY, this.initialX = t.clientX, this.initialY = t.clientY, this.prevClientX = t.clientX, this.prevClientY = t.clientY;
  }
  /** 如果移动距离小,则阻止后续事件触发 */
  preventDragEvent(e) {
    return !(this.moved || Math.abs(e.clientX - this.initialX) > 4 || Math.abs(e.clientY - this.initialY) > 4);
  }
  createEvent(e, t) {
    return new Z(e, t, this);
  }
}
class De {
  constructor(e) {
    r(this, "window");
    r(this, "context");
    r(this, "onDragging");
    r(this, "onDragend");
    this.window = e;
  }
  /** 检测两个`Element`是否存在重叠 */
  static isConflict(e, t) {
    const i = e.getBoundingClientRect(), s = t.getBoundingClientRect();
    return !(i.top > s.bottom || i.right < s.left || i.bottom < s.top || i.left > s.right);
  }
  static findElementsFromPoint(e, t, i, s) {
    return typeof document.elementsFromPoint != "function" ? [] : document.elementsFromPoint(e, t).filter((f) => s != null && !s.contains(f) ? !1 : typeof i == "string" ? f.matches(i) : !1);
  }
  // on(eventType: "dragstart", handler: EventHandler): this;
  // on(eventType: "dragging", handler: EventHandler): this;
  // on(eventType: "dragend", handler: EventHandler): this;
  // on(eventType: any, handler: any) {
  //   this.window.on(eventType, handler);
  //   return this;
  // }
  dragstart(e) {
    if (e.button !== 0)
      return;
    const t = e.target;
    if (t instanceof Element && t.closest("." + L.MENU))
      return;
    const i = this.window.getElement();
    if (i == null)
      return;
    const s = i.getBoundingClientRect();
    e.clientY - s.top > this.window.allowDragArea || (e.preventDefault(), e.stopPropagation(), this.context = new Be(i, e), this.context.left = this.window.state.offsetLeft, this.context.top = this.window.state.offsetTop, this.onDragging = this.dragging.bind(this), this.onDragend = this.dragend.bind(this), window.addEventListener("pointermove", this.onDragging), window.addEventListener("pointerup", this.onDragend));
  }
  dragging(e) {
    var a;
    if (this.context == null)
      return;
    const t = this.context;
    if (!t.moved) {
      if (this.window.dispatch(this.context.createEvent("dragStart", this.window)).defaultPrevented)
        return this.cleanup();
      const h = (a = this.window.component) == null ? void 0 : a.useCssClass();
      h != null && h.dragging && t.target.classList.add(h.dragging), t.target.setPointerCapture(e.pointerId), t.moved = !0;
    }
    if (t.preventDragEvent(e))
      return;
    e.preventDefault(), e.stopPropagation(), t.originalEvent = e, t.left = Math.round(t.left + e.clientX - t.prevClientX), t.top = Math.round(t.top + e.clientY - t.prevClientY), t.prevClientX = e.clientX, t.prevClientY = e.clientY;
    const i = t.target;
    i.style.left = t.left + "px", i.style.top = t.top + "px";
    const s = this.context.createEvent("dragging", this.window);
    this.window.dispatch(s);
  }
  dragend(e) {
    if (this.context == null || !this.context.moved)
      return this.cleanup();
    e.preventDefault(), e.stopPropagation();
    const t = this.context;
    t.originalEvent = e, t.target.releasePointerCapture(e.pointerId);
    const i = t.createEvent("dragEnd", this.window);
    this.window.dispatch(i), this.window.state.offsetTop = t.top, this.window.state.offsetLeft = t.left, this.cleanup();
  }
  cleanup() {
    var t, i;
    const e = (t = this.window.component) == null ? void 0 : t.useCssClass();
    e != null && e.dragging && ((i = this.context) == null || i.target.classList.remove(e.dragging)), this.onDragging && window.removeEventListener("pointermove", this.onDragging), this.onDragend && window.removeEventListener("pointerup", this.onDragend), this.onDragging = void 0, this.onDragend = void 0, this.context = void 0;
  }
}
const P = class P extends H {
  constructor(t) {
    super();
    r(this, "CREATE_RESOLVE");
    r(this, "CREATE_REJECT");
    /** 窗口id，自动生成 */
    r(this, "id");
    /** 窗口类型 */
    r(this, "type");
    /** 窗口选项 */
    r(this, "options");
    /** 窗体内容 */
    r(this, "body");
    /** 窗口状态，组件挂载后可用 */
    r(this, "state");
    /** 是否创建窗口 */
    r(this, "created", !1);
    /** 窗口是否被销毁 */
    r(this, "destroyed", !1);
    /** 组件API, 组件挂载后可用 */
    r(this, "component");
    /** 拖拽 */
    r(this, "draggable");
    r(this, "resizable");
    r(this, "handles", {});
    r(this, "dragstart");
    r(this, "resizestart");
    this.type = t.type ?? _t.SIMPLE_WINDOW, this.options = this.createOptions(t), this.body = t.body, Reflect.defineProperty(this, "id", { enumerable: !0, configurable: !1, writable: !1, value: P.seed++ }), this.initDraggable(), this.initResizable(), this.initHooks();
  }
  static create(t) {
    return t instanceof P ? t : new P(t);
  }
  /** 窗口组件根元素的id */
  get wid() {
    return "window--" + this.id;
  }
  /** 窗口组件是否已创建 */
  get isReady() {
    return this.created === !0;
  }
  /** 是否允许窗口拖拽 */
  get allowDrag() {
    const t = this.options.draggable;
    return t === !1 ? !1 : typeof t == "number" ? t > 0 : !0;
  }
  /** 顶部可拖拽区域，默认只有顶部32px以内可以拖动 */
  get allowDragArea() {
    const t = this.options.draggable;
    return typeof t == "number" && t > 0 ? t : R.draggaleHeight;
  }
  /** 窗口是否已最大化 */
  get isMaximize() {
    var t;
    return ((t = this.state) == null ? void 0 : t.splitMode) === o.MAXIMIZE;
  }
  createOptions(t) {
    return {
      title: t.title ?? "未命名的窗口",
      icon: t.icon,
      className: t.className,
      bodyClassName: t.bodyClassName,
      width: t.width ?? "640px",
      minWidth: t.minWidth ?? 360,
      maxWidth: t.maxWidth,
      height: t.height,
      minHeight: t.minHeight ?? 32,
      maxHeight: t.maxHeight,
      top: t.top,
      left: t.left,
      zIndex: t.zIndex,
      maximize: t.maximize === !0,
      teleport: t.teleport ?? "body",
      draggable: t.draggable == null ? !0 : t.draggable,
      resizeMode: t.resizeMode ?? W.RESIZE,
      closeable: t.closeable !== !1,
      mask: t.mask === !0,
      pinnable: t.pinnable !== !1,
      displayAfterCreate: t.displayAfterCreate !== !1,
      destroyAfterClose: t.destroyAfterClose !== !1,
      closeOnPressEsc: t.closeOnPressEsc !== !1
    };
  }
  createEvent(t, i) {
    return new Z(t, this, i);
  }
  initDraggable() {
    this.draggable = new De(this), this.dragstart = this.draggable.dragstart.bind(this.draggable);
  }
  initResizable() {
    this.resizable = new F(this), this.resizestart = this.resizable.resizestart.bind(this.resizable);
  }
  initHooks() {
    this.once("created", () => {
      this.created = !0, typeof this.CREATE_RESOLVE == "function" && this.CREATE_RESOLVE(), delete this.CREATE_REJECT, delete this.CREATE_RESOLVE;
    });
  }
  /** 等待窗口组件创建完成 */
  ready() {
    return this.created === !0 ? Promise.resolve() : new Promise((t, i) => {
      this.CREATE_RESOLVE = t, this.CREATE_REJECT = i;
    });
  }
  /** 显示窗口 */
  show() {
    this.state == null || this.dispatch(this.createEvent("beforeShow")).defaultPrevented || (this.state.visible = !0);
  }
  /**
   * 关闭窗口
   * @param {boolean} forced - 是否强制关闭窗口
   */
  close(t = !1) {
    if (this.state == null || this.options.closeable === !1 && t !== !0)
      return !1;
    const i = this.dispatch(this.createEvent("beforeClose"));
    return t !== !0 && i.defaultPrevented ? !1 : (this.state.visible = !1, this.dispatch(this.createEvent("close")), this.state.focused && setTimeout(ye), !this.destroyed && this.options.destroyAfterClose !== !1 && this.destroy(), !0);
  }
  cleanup() {
    super.cleanup(), this.dragstart = void 0, this.resizestart = void 0, this.component = void 0, this.state = void 0, this.handles = {};
  }
  /** 销毁窗口 */
  destroy() {
    var t;
    this.destroyed = !0, ((t = this.state) == null ? void 0 : t.visible) === !0 && this.close(), this.dispatch(this.createEvent("beforeDestroy")), ze(this.id), setTimeout(() => this.cleanup(), 100);
  }
  /** 获取窗口根元素 */
  getElement() {
    var t;
    return (t = this.component) == null ? void 0 : t.getElement();
  }
  /** 获取窗口菜单，返回菜单类型数组 */
  useMenus() {
    return this.component.useMenus();
  }
  /** 窗口聚焦 */
  focus() {
    this.state == null || this.state.focused || We(this.id);
  }
  startTransition() {
    const t = document.documentElement, i = function(s) {
      s.target.matches("." + L.WINDOW) && (t.classList.remove(L.TRANSITION), t.removeEventListener("transitionend", i));
    };
    t.classList.add(L.TRANSITION), t.addEventListener("transitionend", i);
  }
  requestMaximize() {
    const t = this.state;
    t == null || this.options.resizeMode !== W.RESIZE || (t.splitMode = o.MAXIMIZE, this.startTransition(), this.dispatch(this.createEvent("maximizeChange")));
  }
  exitMaximize() {
    const t = this.state;
    t == null || this.options.resizeMode !== W.RESIZE || (t.splitMode = o.NONE, this.startTransition(), this.dispatch(this.createEvent("maximizeChange")));
  }
  /** 切换窗口最大化 */
  toggleMaximize() {
    const t = this.state;
    t == null || this.options.resizeMode !== W.RESIZE || (t.splitMode === o.MAXIMIZE ? this.exitMaximize() : this.requestMaximize());
  }
  /** 固定窗口 */
  pin() {
    const t = this.state;
    t != null && (t.pinned = !0);
  }
  /** 取消窗口固定 */
  unpin() {
    const t = this.state;
    t != null && (t.pinned = !1);
  }
  /** 切换窗口的固定状态 */
  togglePin() {
    const t = this.state;
    t != null && (t.pinned ? this.unpin() : this.pin());
  }
  /** 注册事件处理函数, 用于窗口和组件之间的交互 */
  useHandle(t, i) {
    this.handles[t] = i;
  }
  async callHandle(t) {
    const i = this.handles[t];
    if (typeof i == "function")
      return await i();
  }
  /** 确认并关闭窗口 */
  confirm() {
    return this.callHandle("confirm").then((t) => {
      this.dispatch(this.createEvent("confirm", t)), this.close(!0);
    });
  }
  /** 取消并关闭窗口 */
  cancel(t = !0) {
    return this.callHandle("cancel").then((i) => {
      const s = this.close(t);
      console.log(s), s && this.dispatch(this.createEvent("cancel", i));
    });
  }
};
r(P, "seed", 1e3);
let X = P;
const $ = 1e3, R = {}, l = Fe();
function Ae(n) {
  return typeof n != "number" || !Number.isFinite(n) ? $ : Math.floor(n);
}
function ke(n) {
  R.zIndex = Ae(n == null ? void 0 : n.zIndex), R.draggaleHeight = (n == null ? void 0 : n.draggaleHeight) ?? 32, R.size = (n == null ? void 0 : n.size) ?? {}, l.zIndex = R.zIndex;
}
function cn(n, e) {
  R.size == null && (R.size = {}), R.size[n] = e;
}
function an() {
  return yt(it);
}
function Fe() {
  return {
    appContext: null,
    isMounted: !1,
    zIndex: 1e3,
    stack: /* @__PURE__ */ new Map(),
    ids: et([]),
    topWindow: null,
    previewState: tt({
      mode: o.NONE,
      width: 0,
      height: 0
    })
  };
}
function gt(n, e) {
  var h;
  const t = n.state, i = ((h = n.component) == null ? void 0 : h.useCssClass()) ?? {};
  function s() {
    n.cancel();
  }
  function a() {
    n.togglePin();
  }
  function f(p) {
    p.preventDefault(), n.toggleMaximize();
  }
  switch (e) {
    case O.CLOSE:
      return T("button", {
        onClick: s,
        type: "button",
        innerHTML: ot,
        class: i.closeMenu,
        title: "关闭"
      }, null);
    case O.PIN:
    case O.UNPIN:
      const p = t.pinned ? "取消固定" : "固定", g = t.pinned ? i.pinMenu : i.menu;
      return T("button", {
        onClick: a,
        type: "button",
        innerHTML: ct,
        class: g,
        title: p
      }, null);
    case O.MAXIMIZE:
    case O.RESTORE:
      const m = t.splitMode == o.MAXIMIZE ? at : st, S = t.splitMode == o.MAXIMIZE ? "还原" : "最大化";
      return T("button", {
        onClick: f,
        type: "button",
        innerHTML: m,
        class: i.menu,
        title: S
      }, null);
  }
  return null;
}
const Ge = "Ycke6mYQ", Xe = "esgrGyhH", Ze = "UkryRM5g", Ve = "U5LZXLJZ", Ye = "_2rffDKab", je = "vcVMeNrL", Ue = "koc15mYi", Ke = "_4VxfFKcG", v = {
  splitWindowMask: Ge,
  maximize: Xe,
  splitLeft: Ze,
  splitRight: Ve,
  splitTopLeft: Ye,
  splitTopRight: je,
  splitBottomLeft: Ue,
  splitBottomRight: Ke
};
function Je(n) {
  return typeof n == "function" || Object.prototype.toString.call(n) === "[object Object]" && !k(n);
}
const qe = {
  [o.MAXIMIZE]: v.maximize,
  [o.LEFT]: v.splitLeft,
  [o.RIGHT]: v.splitRight,
  [o.TOP_LEFT]: v.splitTopLeft,
  [o.TOP_RIGHT]: v.splitTopRight,
  [o.BOTTOM_LEFT]: v.splitBottomLeft,
  [o.BOTTOM_RIGHT]: v.splitBottomRight
}, $e = {
  ArrowUp: {
    [o.BOTTOM_LEFT]: o.LEFT,
    [o.BOTTOM_RIGHT]: o.RIGHT,
    [o.LEFT]: o.TOP_LEFT,
    [o.RIGHT]: o.TOP_RIGHT,
    fallback: o.MAXIMIZE
  },
  ArrowDown: {
    [o.TOP_LEFT]: o.LEFT,
    [o.TOP_RIGHT]: o.RIGHT,
    [o.LEFT]: o.BOTTOM_LEFT,
    [o.RIGHT]: o.BOTTOM_RIGHT,
    fallback: o.NONE
  },
  ArrowLeft: {
    [o.TOP_RIGHT]: o.TOP_LEFT,
    [o.TOP_LEFT]: o.TOP_RIGHT,
    [o.BOTTOM_RIGHT]: o.BOTTOM_LEFT,
    [o.BOTTOM_LEFT]: o.BOTTOM_RIGHT,
    fallback: o.LEFT
  },
  ArrowRight: {
    [o.TOP_LEFT]: o.TOP_RIGHT,
    [o.TOP_RIGHT]: o.TOP_LEFT,
    [o.BOTTOM_LEFT]: o.BOTTOM_RIGHT,
    [o.BOTTOM_RIGHT]: o.BOTTOM_LEFT,
    fallback: o.RIGHT
  }
}, Q = /* @__PURE__ */ D({
  name: "WindowManager",
  setup() {
    const n = xe(), e = Ne();
    function t(a) {
      const f = a.key;
      a.ctrlKey && f in $e;
    }
    Ie(), window.addEventListener("keydown", t, !0), Pt(() => {
      ft(), window.removeEventListener("keydown", t, !0);
    });
    const i = x(() => {
      const a = [v.splitWindowMask], f = qe[e.mode];
      return f != null && a.push(f), a;
    });
    function s() {
      let a = null;
      if (e.mode != o.NONE) {
        const h = {
          zIndex: Oe() + 1,
          width: e.width ? e.width - 20 + "px" : void 0
        };
        a = T("div", {
          class: i.value,
          style: h
        }, null);
      }
      return T(nt, {
        to: "body"
      }, {
        default: () => [T(Nt, {
          name: "fade"
        }, Je(a) ? a : {
          default: () => [a]
        })]
      });
    }
    return function() {
      return [...n.value.map((f) => {
        const h = Le(f);
        if (h == null)
          return null;
        const p = ut(h.type);
        return A(p, {
          abstractWindow: h,
          key: h.wid
        });
      }), s()];
    };
  }
});
function Qe(n) {
  if (n.length == 1) {
    const e = n[0];
    return e == null ? null : typeof e == "object" ? { ...e } : null;
  }
  if (n.length == 2) {
    const [e, t] = n;
    if (typeof e == "string" && t != null)
      return { title: e, body: t };
  }
  if (n.length == 3) {
    const [e, t, i] = n;
    if (typeof e == "string" && t != null)
      return { ...i, title: e, body: t };
  }
  return null;
}
function Y(n) {
  const e = Qe(n) ?? {}, t = typeof e.size == "string" ? Reflect.get(R.size, e.size) : null;
  return t != null && (e.width = t.width, e.height = t.height, e.top = t.top, e.left = t.left), e;
}
function ln(...n) {
  const e = Y(n) ?? {};
  return j(e);
}
function un(...n) {
  const e = Y(n) ?? {};
  return e.type = lt.BLANK_WINDOW, j(e);
}
function dn(...n) {
  const e = Y(n) ?? {};
  return e.type = lt.SIMPLE_WINDOW, j(e);
}
function j(n) {
  const e = ve(n);
  return e.ready().then(() => {
    n.displayAfterCreate !== !1 && e.show();
  }), e;
}
const fn = Object.freeze({
  renderMenu: gt
});
function tn(n, e) {
  n.component(B.name, B), n.component(N.name, N), n.component(Q.name, Q), ke(e), _e(), Ce(n);
}
const en = St, hn = { install: tn, version: en };
export {
  X as AbstractWindow,
  N as BlankWindow,
  y as RENDER_STATES,
  W as RESIZE_MODE,
  fn as Render,
  o as SPLIT_MODES,
  B as SimpleWindow,
  Be as WindowDragContext,
  Q as WindowManager,
  He as cleanup,
  hn as default,
  tn as install,
  un as useBlankWindow,
  sn as useIcons,
  dn as useSimpleWindow,
  ln as useWindow,
  an as useWindowApi,
  rn as useWindowManager,
  cn as useWindowSize,
  en as version,
  hn as xWindow
};
