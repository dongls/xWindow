/*! @dongls/xWindow v0.1.4 https://github.com/dongls/xWindow
Copyright 2023-present dongls
Released under the MIT License */
var zt = Object.defineProperty;
var Rt = (i, e, t) => e in i ? zt(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t;
var r = (i, e, t) => (Rt(i, typeof e != "symbol" ? e + "" : e, t), t);
import { defineComponent as k, computed as N, h as A, shallowRef as xt, reactive as it, ref as st, provide as yt, createVNode as g, Teleport as ot, isVNode as X, nextTick as Q, render as $, inject as Wt, onBeforeUnmount as Pt, Transition as Nt } from "vue";
const rt = Symbol(), I = Object.freeze({ WINDOW: "x-window", SIMPLE_WINDOW: "x-simple-window", TRANSITION: "x-window-is-transition", MENU: "x-window-is-menu", FOCUSED: "x-window-is-focused", MAXIMIZE: "x-window-is-maximize", HEADER: "x-window-header", BODY: "x-window-body" }), h = Object.freeze({ NONE: 0, TOP: 1, BOTTOM: 2, LEFT: 4, RIGHT: 8 }), x = Object.freeze({ TOP: h.TOP, BOTTOM: h.BOTTOM, LEFT: h.LEFT, RIGHT: h.RIGHT, TOP_LEFT: h.TOP | h.LEFT, TOP_RIGHT: h.TOP | h.RIGHT, BOTTOM_LEFT: h.BOTTOM | h.LEFT, BOTTOM_RIGHT: h.BOTTOM | h.RIGHT }), o = Object.freeze({ NONE: h.NONE, MAXIMIZE: h.TOP, LEFT: h.LEFT, RIGHT: h.RIGHT, TOP_LEFT: h.TOP | h.LEFT, TOP_RIGHT: h.TOP | h.RIGHT, BOTTOM_LEFT: h.BOTTOM | h.LEFT, BOTTOM_RIGHT: h.BOTTOM | h.RIGHT }), _ = Object.freeze({ DISABLED: 0, RESIZE: 1, RESIZE_ONLY: 2 }), P = Object.freeze({ INIT: 0, MOUNTED: 1, UNMOUNTED: 2 }), at = Object.freeze({ SIMPLE_WINDOW: "SimpleWindow", BLANK_WINDOW: "BlankWindow" }), M = Object.freeze({ CLOSE: 0, MAXIMIZE: 1, RESTORE: 2, PIN: 3, UNPIN: 4 });
class Y {
  constructor(e, t, n) {
    r(this, "type");
    r(this, "stopped", !1);
    r(this, "defaultPrevented", !1);
    r(this, "instance");
    r(this, "detail");
    this.type = e, this.instance = t, this.detail = n;
  }
  stop() {
    this.stopped = !0;
  }
  preventDefault() {
    this.defaultPrevented = !0;
  }
}
class F {
  constructor() {
    r(this, "ALL_EVENTS", /* @__PURE__ */ new Map());
  }
  static NOOP() {
  }
  on(e, t) {
    const n = this.ALL_EVENTS.get(e);
    return n == null ? (this.ALL_EVENTS.set(e, [t]), this) : (n.includes(t) || n.push(t), this);
  }
  once(e, t) {
    const n = (s) => {
      t(s), this.off(e, n, !0);
    };
    return this.on(e, n), this;
  }
  off(e, t, n = !1) {
    const s = this.ALL_EVENTS.get(e);
    if (s == null)
      return this;
    const a = s.indexOf(t);
    return a < 0 || (n ? s.splice(a, 1, F.NOOP) : s.splice(a, 1)), this;
  }
  dispatch(e) {
    const t = this.ALL_EVENTS.get(e.type);
    if (t == null)
      return e;
    for (const s of t)
      if (typeof s == "function" && s(e), e.stopped)
        break;
    const n = t.filter((s) => s != F.NOOP);
    return this.ALL_EVENTS.set(e.type, n), e;
  }
  cleanup() {
    this.ALL_EVENTS.clear();
  }
}
function v(i, e, t) {
  return e != null && Number.isFinite(e) && i < e ? e : t != null && Number.isFinite(t) && i > t ? t : i;
}
function tt(i) {
  return i == null || typeof i != "string" || i.length == 0;
}
function _t(i) {
  i.stopPropagation();
}
const Ct = { top: "offsetTop", left: "offsetLeft", width: "offsetWidth", height: "offsetHeight" };
class Ht {
  constructor(e) {
    r(this, "init", !1);
    r(this, "defaultPrevented", !1);
    r(this, "originalEvent");
    r(this, "target");
    r(this, "direction");
    this.originalEvent = e, this.target = e.target, this.direction = Reflect.get(this.target, V.PROP);
  }
  createEvent(e, t) {
    return new Y(e, t, this);
  }
}
class V {
  constructor(e) {
    r(this, "context");
    r(this, "window");
    r(this, "onResizing");
    r(this, "onResizeend");
    this.window = e;
  }
  resizestart(e) {
    e.stopPropagation(), e.preventDefault();
    const t = new Ht(e);
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
    const n = this.calcWindowState(e), s = this.window.getElement();
    for (const d in n) {
      const T = Math.round(n[d]);
      Reflect.set(s.style, d, T + "px");
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
      const n = t.createEvent("resizeEnd", this.window);
      this.window.dispatch(n), this.patchWindowState(this.calcWindowState(e)), t.target.releasePointerCapture(e.pointerId);
    }
    this.cleanup();
  }
  cleanup() {
    this.onResizing && window.removeEventListener("pointermove", this.onResizing), this.onResizeend && window.removeEventListener("pointerup", this.onResizeend), this.onResizing = void 0, this.onResizeend = void 0, this.context = void 0;
  }
  calcWindowState(e) {
    const t = this.context, n = this.window.options, s = typeof n.minWidth == "number" && n.minWidth >= 0 ? n.minWidth : 360, a = typeof n.minHeight == "number" && n.minHeight >= 0 ? n.minHeight : 32, d = this.window.getElement().getBoundingClientRect(), T = document.documentElement.getBoundingClientRect(), E = {};
    if (t.direction & h.TOP) {
      const w = v(d.bottom - v(e.clientY, 0), a), O = v(e.clientY - T.top, 0, window.innerHeight - w);
      E.height = w, E.top = O;
    }
    if (t.direction & h.BOTTOM) {
      const w = v(v(e.clientY, 0, window.innerHeight) - d.top, a), O = v(e.clientY - w - T.top, 0, window.innerHeight - w);
      E.height = w, E.top = O;
    }
    if (t.direction & h.LEFT) {
      const w = v(d.right - v(e.clientX, 0), s, window.innerWidth), O = v(e.clientX - T.left, 0, window.innerWidth - w);
      E.width = w, E.left = O;
    }
    if (t.direction & h.RIGHT) {
      const w = v(v(e.clientX, 0) - d.left, s, window.innerWidth), O = v(e.clientX - w - T.left, 0, window.innerWidth - w - 0);
      E.width = w, E.left = O;
    }
    return E;
  }
  patchWindowState(e) {
    const t = this.window.state;
    for (const n in e) {
      const s = Math.round(e[n]), a = Ct[n];
      a != null && Reflect.set(t, a, s);
    }
  }
}
r(V, "PROP", "__xwindow_resize_prop__");
const p = { window: "_1T2rhwiL", dragging: "yi9w1sZD", resizing: "Ja2o9U31", maximize: "_1eMSsKoB", focused: "_3czvPpS2", header: "GiVk7T8N", menu: "VuG4WNig x-window-is-menu", logo: "yBPezU8e", main: "xbuRK23n", init: "_9t1NJBZM", title: "shyxrRzw", menus: "nkEGqTFw", body: "pk12TusX", footer: "noixF94i", closeMenu: "ifXDegN1 VuG4WNig x-window-is-menu", pinMenu: "X5A6roxN VuG4WNig x-window-is-menu", resizeBar: "PPmfTMRL", resizeTop: "v8UGXgKi PPmfTMRL", resizeBottom: "_74VJ9GNt PPmfTMRL", resizeRight: "gg9Mcwey PPmfTMRL", resizeLeft: "Tw7sCaLt PPmfTMRL", resizeTopLeft: "CPuApFyD PPmfTMRL", resizeBottomLeft: "VBRi4FWg PPmfTMRL", resizeTopRight: "gCRpuZdB PPmfTMRL", resizeBottomRight: "iRYpNoUT PPmfTMRL", mask: "xTcKGSVA" }, ct = k({ name: "WindowBody", props: { wid: String, body: { type: [Object, Function, String, Number], default: null }, abstractWindow: { type: Object, required: !0 } }, setup: (i) => function() {
  const e = typeof i.body == "function" ? i.body(i.abstractWindow) : i.body;
  return e == null && console.warn("[xWindow] 请指定窗体内容:", i.abstractWindow.options.title), e;
} }), St = Math.floor(Number.MAX_SAFE_INTEGER / 10) - 1e4, Bt = [[p.resizeTop, x.TOP], [p.resizeBottom, x.BOTTOM], [p.resizeLeft, x.LEFT], [p.resizeRight, x.RIGHT], [p.resizeTopLeft, x.TOP_LEFT], [p.resizeTopRight, x.TOP_RIGHT], [p.resizeBottomLeft, x.BOTTOM_LEFT], [p.resizeBottomRight, x.BOTTOM_RIGHT]], H = k({ name: "BlankWindow", props: { abstractWindow: { type: Object, required: !0 } }, setup(i, { slots: e }) {
  const t = xt(), n = it({ visible: !1, offsetWidth: 0, offsetHeight: 0, offsetTop: 0, offsetLeft: 0, focused: !1, pinned: !1, zIndex: 0, splitMode: o.NONE }), s = st(P.INIT), a = N(() => {
    const c = i.abstractWindow.options;
    return typeof c.zIndex == "number" && c.zIndex > 0;
  }), d = N(() => {
    const c = i.abstractWindow.options;
    return a.value ? c.zIndex : (n.pinned ? St : 0) + n.zIndex;
  }), T = function(c, u, f, L) {
    return N(() => {
      const m = c.options;
      if (u.value == P.INIT)
        return { width: m.width, height: m.height, left: m.left, top: m.top };
      const W = m.mask ? null : L.value;
      return { top: f.offsetTop + "px", left: f.offsetLeft + "px", width: f.offsetWidth + "px", height: u.value == P.INIT ? void 0 : f.offsetHeight + "px", zIndex: W };
    });
  }(i.abstractWindow, s, n, d), E = N(() => {
    const c = [I.WINDOW, p.window], u = i.abstractWindow;
    var f;
    return u.type === at.SIMPLE_WINDOW && c.push(I.SIMPLE_WINDOW), s.value == P.INIT && c.push(p.init), n.splitMode == o.MAXIMIZE && c.push(p.maximize, I.MAXIMIZE), n.focused && c.push(p.focused, I.FOCUSED), (f = u.options.className) != null && typeof f == "string" && f.length != 0 && c.push(u.options.className), c;
  }), w = N(() => {
    const c = [], u = i.abstractWindow.options;
    return u.pinnable && u.mask !== !0 && a.value !== !0 && c.push(n.pinned ? M.PIN : M.UNPIN), u.resizeMode == _.RESIZE && c.push(n.splitMode == o.MAXIMIZE ? M.RESTORE : M.MAXIMIZE), u.closeable && c.push(M.CLOSE), c;
  }), O = { getElement: J, getRenderState: function() {
    return s.value;
  }, useCssClass: function() {
    return p;
  }, useMenus: function() {
    return w;
  } };
  function J() {
    return t.value;
  }
  async function q(c) {
    c == null || c.preventDefault(), i.abstractWindow.toggleMaximize();
  }
  async function Mt(c) {
    await Q();
    const u = i.abstractWindow, f = u.options, L = c.el, m = L.getBoundingClientRect();
    if (s.value == P.INIT) {
      let W = Math.round(m.left), S = Math.round(m.top);
      tt(f.left) && (W = Math.floor((window.innerWidth - m.width) / 2)), tt(f.top) && (S = Math.floor((window.innerHeight - m.height) / 2)), n.offsetWidth = m.width, n.offsetHeight = m.height, n.offsetLeft = W, n.offsetTop = S, f.maximize && q(), s.value = P.MOUNTED, JSON.parse(JSON.stringify(n)), Q(() => {
        const B = u.createEvent("show");
        u.dispatch(B), function(D) {
          const z = Array.from(D.querySelectorAll("[autofocus]"));
          for (const y of z)
            if (y instanceof HTMLElement && y.autofocus)
              return y.focus();
        }(L);
      });
    }
    u.focus();
  }
  function It(c) {
    const u = i.abstractWindow;
    u.focus(), u.allowDrag && !u.isMaximize && u.dragstart(c);
  }
  function bt(c) {
    const u = J();
    if (u == null)
      return;
    const f = u.getBoundingClientRect();
    c.clientY - f.top > i.abstractWindow.allowDragArea || q(c);
  }
  return yt(rt, i.abstractWindow), function() {
    const c = i.abstractWindow;
    var u, f;
    c.component = O, c.state = n, u = c.id, f = c, l.stack.set(u, f);
    const L = c.createEvent("created");
    c.dispatch(L);
  }(), function() {
    const c = i.abstractWindow, u = c.options;
    if (n.visible !== !0)
      return null;
    const f = typeof e.header == "function" ? e.header(O) : null, L = typeof e.body == "function" ? e.body(O) : function() {
      const R = i.abstractWindow, Lt = R.options;
      return g(ct, { class: Lt.bodyClassName, body: R.body, abstractWindow: i.abstractWindow, key: R.wid }, null);
    }(), m = g("div", { class: p.main, onDblclick: bt }, [f, L]), W = { ref: t, id: c.wid, onVnodeMounted: Mt, onPointerdown: It, class: E.value, style: T.value }, S = (B = u.resizeMode, D = c.resizestart, B == _.DISABLED ? null : Bt.map((R) => A("div", { ["." + V.PROP]: R[1], className: R[0], onPointerdown: D })));
    var B, D;
    let z = A("div", W, [m, S]);
    if (u.mask === !0) {
      const R = { zIndex: d.value };
      z = g("div", { class: p.mask, style: R }, [z]);
    }
    return u.teleport === !1 ? z : g(ot, { to: u.teleport }, typeof (y = z) == "function" || Object.prototype.toString.call(y) === "[object Object]" && !X(y) ? z : { default: () => [z] });
    var y;
  };
} }), lt = '<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M590.265 511.987l305.521-305.468c21.617-21.589 21.617-56.636.027-78.252-21.616-21.617-56.663-21.617-78.279 0L512.012 433.735 206.544 128.213c-21.617-21.617-56.635-21.617-78.252 0-21.616 21.589-21.616 56.635-.027 78.252L433.76 511.987 128.211 817.482c-21.617 21.59-21.617 56.635 0 78.251 10.808 10.81 24.967 16.213 39.125 16.213 14.159 0 28.318-5.403 39.126-16.213l305.522-305.468L817.48 895.788C828.289 906.597 842.447 912 856.606 912s28.317-5.403 39.125-16.212c21.618-21.59 21.618-56.636.028-78.252L590.265 511.987z"/></svg>', dt = '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5228" width="64" height="64"><path d="M97.74775349 97.74775349h828.50449302v828.50449302H97.74775349V97.74775349z m103.56306133 103.56306133v621.37837036h621.37837036V201.31081482H201.31081482z" fill="currentColor"></path></svg>', ut = '<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M38.794 124.791v778.495h946.412V124.791H38.794zm896.678 728.033H89.292v-460.9h846.18v460.9z"/></svg>', ht = '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M738.793 681.382v-48.331l88.242-88.243a298.676 298.676 0 00156.712-83.482 38.836 38.836 0 000-54.923l-366.15-366.15a38.836 38.836 0 00-54.923 0 298.52 298.52 0 00-83.519 156.749l-88.169 88.169h-48.332a411.145 411.145 0 00-292.59 121.232c-15.16 15.159-15.16 39.764 0 54.923L278.906 690.17 86.642 882.436a38.836 38.836 0 1054.922 54.922l192.23-192.229 228.844 228.845a38.836 38.836 0 0054.922 0 411.042 411.042 0 00121.233-292.592zM134.02 435.44a333.473 333.473 0 01208.56-72.571l64.406.037a38.836 38.836 0 0027.461-11.351L544.292 241.71a38.68 38.68 0 0011.351-27.462 180.096 180.096 0 0136.798-89.01L898.8 431.593a180.925 180.925 0 01-89.12 36.835 38.836 38.836 0 00-27.462 11.35L672.373 589.626c-7.287 7.286-11.387 17.173-11.35 27.461l.036 64.406a333.318 333.318 0 01-72.608 208.596L134.021 435.44z"/></svg>', pt = '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M845.40952426 212.52063539H65.21904746v702.17142826h780.1904768V212.52063539z m-702.17142933 624.1523808V290.53968285h624.1523808v546.13333334H143.23809493z" fill="currentColor"></path><path d="M981.53650809 76.3936505H201.34603129v78.01904746h702.17142933v624.15238187h78.01904747V76.3936505z" fill="currentColor"></path></svg>';
function re() {
  return { IconClose: lt, IconMax: dt, IconPin: ht, IconWindow: ut, IconRestore: pt };
}
function Dt(i) {
  const e = i.options.icon;
  return typeof e == "string" ? g("i", { class: [p.logo, "icon", e] }, null) : X(e) ? e : typeof e == "function" ? e(i) : g("i", { class: p.logo, innerHTML: ut }, null);
}
const G = k({ name: "SimpleWindow", props: { abstractWindow: { type: Object, required: !0 } }, setup(i) {
  const e = i.abstractWindow, t = { header() {
    const n = e.useMenus();
    return g("div", { class: p.header }, [Dt(e), g("div", { class: p.title }, [e.options.title ?? "新窗口"]), g("div", { class: p.menus, onMousedown: _t }, [n.value.map((s) => Ot(e, s))])]);
  }, body() {
    const n = e.options;
    return g("div", { class: [p.body, I.BODY, n.bodyClassName] }, [g(ct, { body: e.body, abstractWindow: i.abstractWindow, key: e.wid }, null)]);
  } };
  return function() {
    return g(H, { abstractWindow: i.abstractWindow }, typeof (n = t) == "function" || Object.prototype.toString.call(n) === "[object Object]" && !X(n) ? t : { default: () => [t] });
    var n;
  };
} }), ft = Object.freeze({ SIMPLE_WINDOW: G.name, BLANK_WINDOW: H.name });
function gt(i) {
  return i == H.name ? H : G;
}
function wt(i) {
  if (i.key == "Escape")
    return vt({ pressEsc: !0, forced: !1 });
}
function Tt() {
  l.isMounted = !1, l.topWindow = null, l.ids.value = [], l.stack.clear();
}
function Et() {
  return l.zIndex;
}
function mt() {
  return l.zIndex += 1;
}
function At() {
  return l.topWindow;
}
function vt(i) {
  if (l.stack.size == 0 || l.topWindow == null)
    return;
  const e = l.topWindow;
  (i == null ? void 0 : i.pressEsc) === !0 && e.options.closeOnPressEsc !== !0 || l.topWindow.cancel(i == null ? void 0 : i.forced);
}
function Ft(i) {
  const e = Z.create(i);
  return l.isMounted ? (l.ids.value.push(e.id), l.stack.set(e.id, e), e) : (function(t) {
    const n = document.createDocumentFragment(), s = gt(t.type), a = A(s, { abstractWindow: t });
    a.appContext = l.appContext, $(a, n), document.body.appendChild(n), t.on("beforeDestroy", () => {
      $(null, n);
    });
  }(e), e);
}
function j(i) {
  if (l.topWindow = i, i != null) {
    for (const e of l.stack.values()) {
      const t = e.state;
      t != null && (t.focused = e === i);
    }
    i.state != null && i.state.zIndex < Et() && (i.state.zIndex = mt());
  }
}
function Gt() {
  j(function() {
    if (l.stack.size == 0)
      return;
    let i;
    for (const e of l.stack.values())
      e.state != null && e.state.visible === !0 && (i != null ? i.state.zIndex < e.state.zIndex && (i = e) : i = e);
    return i;
  }());
}
function kt() {
  return l.stack.size;
}
function Xt() {
  l.appContext = null, Tt(), window.removeEventListener("keydown", wt, !0);
}
function ae() {
  return { closeTopWindow: vt, getTopWindow: At, getTopZIndex: mt, getWindowCount: kt, getZIndex: Et, setFocusedWindow: j, cleanup: Xt };
}
class Vt {
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
    const n = e.getBoundingClientRect();
    this.originalEvent = t, this.target = e, this.deltaX = Math.round(n.left - t.clientX), this.deltaY = Math.round(n.top - t.clientY), this.initialX = t.clientX, this.initialY = t.clientY, this.prevClientX = t.clientX, this.prevClientY = t.clientY;
  }
  preventDragEvent(e) {
    return !this.moved && !(Math.abs(e.clientX - this.initialX) > 4) && !(Math.abs(e.clientY - this.initialY) > 4);
  }
  createEvent(e, t) {
    return new Y(e, t, this);
  }
}
class Zt {
  constructor(e) {
    r(this, "window");
    r(this, "context");
    r(this, "onDragging");
    r(this, "onDragend");
    this.window = e;
  }
  static isConflict(e, t) {
    const n = e.getBoundingClientRect(), s = t.getBoundingClientRect();
    return !(n.top > s.bottom || n.right < s.left || n.bottom < s.top || n.left > s.right);
  }
  static findElementsFromPoint(e, t, n, s) {
    return typeof document.elementsFromPoint != "function" ? [] : document.elementsFromPoint(e, t).filter((a) => !(s != null && !s.contains(a)) && typeof n == "string" && a.matches(n));
  }
  dragstart(e) {
    if (e.button !== 0)
      return;
    const t = e.target;
    if (t instanceof Element && t.closest("." + I.MENU))
      return;
    const n = this.window.getElement();
    if (n == null)
      return;
    const s = n.getBoundingClientRect();
    e.clientY - s.top > this.window.allowDragArea || (e.preventDefault(), e.stopPropagation(), this.context = new Vt(n, e), this.context.left = this.window.state.offsetLeft, this.context.top = this.window.state.offsetTop, this.onDragging = this.dragging.bind(this), this.onDragend = this.dragend.bind(this), window.addEventListener("pointermove", this.onDragging), window.addEventListener("pointerup", this.onDragend));
  }
  dragging(e) {
    var a;
    if (this.context == null)
      return;
    const t = this.context;
    if (!t.moved) {
      if (this.window.dispatch(this.context.createEvent("dragStart", this.window)).defaultPrevented)
        return this.cleanup();
      const d = (a = this.window.component) == null ? void 0 : a.useCssClass();
      d != null && d.dragging && t.target.classList.add(d.dragging), t.target.setPointerCapture(e.pointerId), t.moved = !0;
    }
    if (t.preventDragEvent(e))
      return;
    e.preventDefault(), e.stopPropagation(), t.originalEvent = e, t.left = e.clientX + t.deltaX, t.top = e.clientY + t.deltaY, t.prevClientX = e.clientX, t.prevClientY = e.clientY;
    const n = t.target;
    n.style.left = t.left + "px", n.style.top = t.top + "px";
    const s = this.context.createEvent("dragging", this.window);
    this.window.dispatch(s);
  }
  dragend(e) {
    if (this.context == null || !this.context.moved)
      return this.cleanup();
    e.preventDefault(), e.stopPropagation();
    const t = this.context;
    t.originalEvent = e, t.target.releasePointerCapture(e.pointerId);
    const n = t.createEvent("dragEnd", this.window);
    this.window.dispatch(n), this.window.state.offsetTop = t.top, this.window.state.offsetLeft = t.left, this.cleanup();
  }
  cleanup() {
    var t, n;
    const e = (t = this.window.component) == null ? void 0 : t.useCssClass();
    e != null && e.dragging && ((n = this.context) == null || n.target.classList.remove(e.dragging)), this.onDragging && window.removeEventListener("pointermove", this.onDragging), this.onDragend && window.removeEventListener("pointerup", this.onDragend), this.onDragging = void 0, this.onDragend = void 0, this.context = void 0;
  }
}
const C = class C extends F {
  constructor(t) {
    super();
    r(this, "CREATE_RESOLVE");
    r(this, "CREATE_REJECT");
    r(this, "id");
    r(this, "type");
    r(this, "options");
    r(this, "body");
    r(this, "state");
    r(this, "created", !1);
    r(this, "destroyed", !1);
    r(this, "component");
    r(this, "draggable");
    r(this, "resizable");
    r(this, "handles", {});
    r(this, "dragstart");
    r(this, "resizestart");
    this.type = t.type ?? at.SIMPLE_WINDOW, this.options = this.createOptions(t), this.body = t.body, Reflect.defineProperty(this, "id", { enumerable: !0, configurable: !1, writable: !1, value: C.seed++ }), this.initDraggable(), this.initResizable(), this.initHooks();
  }
  static create(t) {
    return t instanceof C ? t : new C(t);
  }
  get wid() {
    return "window--" + this.id;
  }
  get isReady() {
    return this.created === !0;
  }
  get allowDrag() {
    const t = this.options.draggable;
    return t !== !1 && (typeof t != "number" || t > 0);
  }
  get allowDragArea() {
    const t = this.options.draggable;
    return typeof t == "number" && t > 0 ? t : b.draggaleHeight;
  }
  get isMaximize() {
    var t;
    return ((t = this.state) == null ? void 0 : t.splitMode) === o.MAXIMIZE;
  }
  createOptions(t) {
    return { title: t.title ?? "未命名的窗口", icon: t.icon, className: t.className, bodyClassName: t.bodyClassName, width: t.width ?? "640px", minWidth: t.minWidth ?? 360, maxWidth: t.maxWidth, height: t.height, minHeight: t.minHeight ?? 32, maxHeight: t.maxHeight, top: t.top, left: t.left, zIndex: t.zIndex, maximize: t.maximize === !0, teleport: t.teleport ?? "body", draggable: t.draggable == null || t.draggable, resizeMode: t.resizeMode ?? _.RESIZE, closeable: t.closeable !== !1, mask: t.mask === !0, pinnable: t.pinnable !== !1, displayAfterCreate: t.displayAfterCreate !== !1, destroyAfterClose: t.destroyAfterClose !== !1, closeOnPressEsc: t.closeOnPressEsc !== !1 };
  }
  createEvent(t, n) {
    return new Y(t, this, n);
  }
  initDraggable() {
    this.draggable = new Zt(this), this.dragstart = this.draggable.dragstart.bind(this.draggable);
  }
  initResizable() {
    this.resizable = new V(this), this.resizestart = this.resizable.resizestart.bind(this.resizable);
  }
  initHooks() {
    this.once("created", () => {
      this.created = !0, typeof this.CREATE_RESOLVE == "function" && this.CREATE_RESOLVE(), delete this.CREATE_REJECT, delete this.CREATE_RESOLVE;
    });
  }
  ready() {
    return this.created === !0 ? Promise.resolve() : new Promise((t, n) => {
      this.CREATE_RESOLVE = t, this.CREATE_REJECT = n;
    });
  }
  show() {
    this.state != null && (this.dispatch(this.createEvent("beforeShow")).defaultPrevented || (this.state.visible = !0));
  }
  close(t = !1) {
    if (this.state == null || this.options.closeable === !1 && t !== !0)
      return !1;
    const n = this.dispatch(this.createEvent("beforeClose"));
    return (t === !0 || !n.defaultPrevented) && (this.state.visible = !1, this.dispatch(this.createEvent("close")), this.state.focused && setTimeout(Gt), this.destroyed || this.options.destroyAfterClose === !1 || this.destroy(), !0);
  }
  cleanup() {
    super.cleanup(), this.dragstart = void 0, this.resizestart = void 0, this.component = void 0, this.state = void 0, this.handles = {};
  }
  destroy() {
    var t;
    this.destroyed = !0, ((t = this.state) == null ? void 0 : t.visible) === !0 && this.close(), this.dispatch(this.createEvent("beforeDestroy")), function(n) {
      if (console.log("[xWindow]: remove window", n), !l.stack.has(n) || (l.stack.delete(n), !l.isMounted))
        return;
      const s = l.ids.value.indexOf(n);
      s < 0 || l.ids.value.splice(s, 1);
    }(this.id), setTimeout(() => this.cleanup(), 100);
  }
  getElement() {
    var t;
    return (t = this.component) == null ? void 0 : t.getElement();
  }
  useMenus() {
    return this.component.useMenus();
  }
  focus() {
    var t;
    this.state == null || this.state.focused || (t = this.id, j(l.stack.get(t)));
  }
  startTransition() {
    const t = document.documentElement, n = function(s) {
      s.target.matches("." + I.WINDOW) && (t.classList.remove(I.TRANSITION), t.removeEventListener("transitionend", n));
    };
    t.classList.add(I.TRANSITION), t.addEventListener("transitionend", n);
  }
  requestMaximize() {
    const t = this.state;
    t != null && this.options.resizeMode === _.RESIZE && (t.splitMode = o.MAXIMIZE, this.startTransition(), this.dispatch(this.createEvent("maximizeChange")));
  }
  exitMaximize() {
    const t = this.state;
    t != null && this.options.resizeMode === _.RESIZE && (t.splitMode = o.NONE, this.startTransition(), this.dispatch(this.createEvent("maximizeChange")));
  }
  toggleMaximize() {
    const t = this.state;
    t != null && this.options.resizeMode === _.RESIZE && (t.splitMode === o.MAXIMIZE ? this.exitMaximize() : this.requestMaximize());
  }
  pin() {
    const t = this.state;
    t != null && (t.pinned = !0);
  }
  unpin() {
    const t = this.state;
    t != null && (t.pinned = !1);
  }
  togglePin() {
    const t = this.state;
    t != null && (t.pinned ? this.unpin() : this.pin());
  }
  useHandle(t, n) {
    this.handles[t] = n;
  }
  async callHandle(t) {
    const n = this.handles[t];
    if (typeof n == "function")
      return await n();
  }
  confirm() {
    return this.callHandle("confirm").then((t) => {
      this.dispatch(this.createEvent("confirm", t)), this.close(!0);
    });
  }
  cancel(t = !0) {
    return this.callHandle("cancel").then((n) => {
      const s = this.close(t);
      console.log(s), s && this.dispatch(this.createEvent("cancel", n));
    });
  }
};
r(C, "seed", 1e3);
let Z = C;
const et = 1e3, b = {}, l = { appContext: null, isMounted: !1, zIndex: 1e3, stack: /* @__PURE__ */ new Map(), ids: st([]), topWindow: null, previewState: it({ mode: o.NONE, width: 0, height: 0 }) };
function Yt(i) {
  var e;
  b.zIndex = (e = i == null ? void 0 : i.zIndex, typeof e != "number" ? et : Number.isFinite(e) ? Math.floor(e) : et), b.draggaleHeight = (i == null ? void 0 : i.draggaleHeight) ?? 32, b.size = (i == null ? void 0 : i.size) ?? {}, l.zIndex = b.zIndex;
}
function ce(i, e) {
  b.size == null && (b.size = {}), b.size[i] = e;
}
function le() {
  return Wt(rt);
}
function Ot(i, e) {
  var s;
  const t = i.state, n = ((s = i.component) == null ? void 0 : s.useCssClass()) ?? {};
  switch (e) {
    case M.CLOSE:
      return g("button", { onClick: function() {
        i.cancel();
      }, type: "button", innerHTML: lt, class: n.closeMenu, title: "关闭" }, null);
    case M.PIN:
    case M.UNPIN:
      const a = t.pinned ? "取消固定" : "固定", d = t.pinned ? n.pinMenu : n.menu;
      return g("button", { onClick: function() {
        i.togglePin();
      }, type: "button", innerHTML: ht, class: d, title: a }, null);
    case M.MAXIMIZE:
    case M.RESTORE:
      const T = t.splitMode == o.MAXIMIZE ? pt : dt, E = t.splitMode == o.MAXIMIZE ? "还原" : "最大化";
      return g("button", { onClick: function(w) {
        w.preventDefault(), i.toggleMaximize();
      }, type: "button", innerHTML: T, class: n.menu, title: E }, null);
  }
  return null;
}
const jt = "Ycke6mYQ", Ut = "esgrGyhH", Kt = "UkryRM5g", Jt = "U5LZXLJZ", qt = "_2rffDKab", Qt = "vcVMeNrL", $t = "koc15mYi", te = "_4VxfFKcG", ee = { [o.MAXIMIZE]: Ut, [o.LEFT]: Kt, [o.RIGHT]: Jt, [o.TOP_LEFT]: qt, [o.TOP_RIGHT]: Qt, [o.BOTTOM_LEFT]: $t, [o.BOTTOM_RIGHT]: te }, nt = (o.BOTTOM_LEFT, o.LEFT, o.BOTTOM_RIGHT, o.RIGHT, o.LEFT, o.TOP_LEFT, o.RIGHT, o.TOP_RIGHT, o.MAXIMIZE, o.TOP_LEFT, o.LEFT, o.TOP_RIGHT, o.RIGHT, o.LEFT, o.BOTTOM_LEFT, o.RIGHT, o.BOTTOM_RIGHT, o.NONE, o.TOP_RIGHT, o.TOP_LEFT, o.TOP_LEFT, o.TOP_RIGHT, o.BOTTOM_RIGHT, o.BOTTOM_LEFT, o.BOTTOM_LEFT, o.BOTTOM_RIGHT, o.LEFT, o.TOP_LEFT, o.TOP_RIGHT, o.TOP_RIGHT, o.TOP_LEFT, o.BOTTOM_LEFT, o.BOTTOM_RIGHT, o.BOTTOM_RIGHT, o.BOTTOM_LEFT, o.RIGHT, k({ name: "WindowManager", setup() {
  const i = l.ids, e = l.previewState;
  function t(a) {
    a.key, a.ctrlKey;
  }
  l.isMounted = !0, window.addEventListener("keydown", t, !0), Pt(() => {
    Tt(), window.removeEventListener("keydown", t, !0);
  });
  const n = N(() => {
    const a = [jt], d = ee[e.mode];
    return d != null && a.push(d), a;
  });
  function s() {
    let a = null;
    if (e.mode != o.NONE) {
      const d = { zIndex: function() {
        const T = l.topWindow;
        return T ? T.state.zIndex : 1;
      }() + 1, width: e.width ? e.width - 20 + "px" : void 0 };
      a = g("div", { class: n.value, style: d }, null);
    }
    return g(ot, { to: "body" }, { default: () => {
      return [g(Nt, { name: "fade" }, (d = a, typeof d == "function" || Object.prototype.toString.call(d) === "[object Object]" && !X(d) ? a : { default: () => [a] }))];
      var d;
    } });
  }
  return function() {
    return [...i.value.map((a) => {
      const d = function(E) {
        return l.stack.get(E);
      }(a);
      if (d == null)
        return null;
      const T = gt(d.type);
      return A(T, { abstractWindow: d, key: d.wid });
    }), s()];
  };
} }));
function U(i) {
  const e = function(n) {
    if (n.length == 1) {
      const s = n[0];
      return s == null ? null : typeof s == "object" ? { ...s } : null;
    }
    if (n.length == 2) {
      const [s, a] = n;
      if (typeof s == "string" && a != null)
        return { title: s, body: a };
    }
    if (n.length == 3) {
      const [s, a, d] = n;
      if (typeof s == "string" && a != null)
        return { ...d, title: s, body: a };
    }
    return null;
  }(i) ?? {}, t = typeof e.size == "string" ? Reflect.get(b.size, e.size) : null;
  return t != null && (e.width = t.width, e.height = t.height, e.top = t.top, e.left = t.left), e;
}
function de(...i) {
  return K(U(i) ?? {});
}
function ue(...i) {
  const e = U(i) ?? {};
  return e.type = ft.BLANK_WINDOW, K(e);
}
function he(...i) {
  const e = U(i) ?? {};
  return e.type = ft.SIMPLE_WINDOW, K(e);
}
function K(i) {
  const e = Ft(i);
  return e.ready().then(() => {
    i.displayAfterCreate !== !1 && e.show();
  }), e;
}
const pe = Object.freeze({ renderMenu: Ot });
function ne(i, e) {
  i.component(G.name, G), i.component(H.name, H), i.component(nt.name, nt), Yt(e), window.addEventListener("keydown", wt, !0), function(t) {
    l.appContext = t._context;
  }(i);
}
const ie = "0.1.4", fe = { install: ne, version: ie };
export {
  Z as AbstractWindow,
  H as BlankWindow,
  P as RENDER_STATES,
  _ as RESIZE_MODE,
  pe as Render,
  o as SPLIT_MODES,
  G as SimpleWindow,
  Vt as WindowDragContext,
  nt as WindowManager,
  Xt as cleanup,
  fe as default,
  ne as install,
  ue as useBlankWindow,
  re as useIcons,
  he as useSimpleWindow,
  de as useWindow,
  le as useWindowApi,
  ae as useWindowManager,
  ce as useWindowSize,
  ie as version,
  fe as xWindow
};
