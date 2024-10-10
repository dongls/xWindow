/*! @dongls/xWindow v0.2.1 https://github.com/dongls/xWindow
Copyright 2023-present dongls
Released under the MIT License */
var Lt = Object.defineProperty;
var zt = (n, e, t) => e in n ? Lt(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var r = (n, e, t) => (zt(n, typeof e != "symbol" ? e + "" : e, t), t);
import { defineComponent as B, computed as x, h as H, shallowRef as Rt, reactive as nt, ref as it, provide as xt, createVNode as w, Teleport as st, isVNode as X, nextTick as q, render as Q, inject as yt, onBeforeUnmount as Pt, Transition as Wt } from "vue";
const ot = Symbol(), m = Object.freeze({ WINDOW: "x-window", SIMPLE_WINDOW: "x-simple-window", TRANSITION: "x-window-is-transition", MENU: "x-window-is-menu", FOCUSED: "x-window-is-focused", MAXIMIZE: "x-window-is-maximize", HEADER: "x-window-header", BODY: "x-window-body" }), h = Object.freeze({ NONE: 0, TOP: 1, BOTTOM: 2, LEFT: 4, RIGHT: 8 }), I = Object.freeze({ TOP: h.TOP, BOTTOM: h.BOTTOM, LEFT: h.LEFT, RIGHT: h.RIGHT, TOP_LEFT: h.TOP | h.LEFT, TOP_RIGHT: h.TOP | h.RIGHT, BOTTOM_LEFT: h.BOTTOM | h.LEFT, BOTTOM_RIGHT: h.BOTTOM | h.RIGHT }), o = Object.freeze({ NONE: h.NONE, MAXIMIZE: h.TOP, LEFT: h.LEFT, RIGHT: h.RIGHT, TOP_LEFT: h.TOP | h.LEFT, TOP_RIGHT: h.TOP | h.RIGHT, BOTTOM_LEFT: h.BOTTOM | h.LEFT, BOTTOM_RIGHT: h.BOTTOM | h.RIGHT }), y = Object.freeze({ DISABLED: 0, RESIZE: 1, RESIZE_ONLY: 2 }), z = Object.freeze({ INIT: 0, MOUNTED: 1, UNMOUNTED: 2 }), rt = Object.freeze({ SIMPLE_WINDOW: "SimpleWindow", BLANK_WINDOW: "BlankWindow" }), E = Object.freeze({ CLOSE: 0, MAXIMIZE: 1, RESTORE: 2, PIN: 3, UNPIN: 4 });
class V {
  constructor(e, t, i) {
    r(this, "type");
    r(this, "stopped", !1);
    r(this, "defaultPrevented", !1);
    r(this, "instance");
    r(this, "detail");
    this.type = e, this.instance = t, this.detail = i;
  }
  stop() {
    this.stopped = !0;
  }
  preventDefault() {
    this.defaultPrevented = !0;
  }
}
class S {
  constructor() {
    r(this, "ALL_EVENTS", /* @__PURE__ */ new Map());
  }
  static NOOP() {
  }
  on(e, t) {
    const i = this.ALL_EVENTS.get(e);
    return i == null ? (this.ALL_EVENTS.set(e, [t]), this) : (i.includes(t) || i.push(t), this);
  }
  once(e, t) {
    const i = (s) => {
      t(s), this.off(e, i, !0);
    };
    return this.on(e, i), this;
  }
  off(e, t, i = !1) {
    const s = this.ALL_EVENTS.get(e);
    if (s == null)
      return this;
    const a = s.indexOf(t);
    return a < 0 || (i ? s.splice(a, 1, S.NOOP) : s.splice(a, 1)), this;
  }
  dispatch(e) {
    const t = this.ALL_EVENTS.get(e.type);
    if (t == null)
      return e;
    for (const s of t)
      if (typeof s == "function" && s(e), e.stopped)
        break;
    const i = t.filter((s) => s != S.NOOP);
    return this.ALL_EVENTS.set(e.type, i), e;
  }
  cleanup() {
    this.ALL_EVENTS.clear();
  }
}
function R(n, e, t) {
  return e != null && Number.isFinite(e) && n < e ? e : n;
}
function $(n) {
  return n == null || typeof n != "string" || n.length == 0;
}
function Nt(n) {
  n.stopPropagation();
}
const _t = { top: "offsetTop", left: "offsetLeft", width: "offsetWidth", height: "offsetHeight" };
class Ct {
  constructor(e) {
    r(this, "init", !1);
    r(this, "defaultPrevented", !1);
    r(this, "originalEvent");
    r(this, "target");
    r(this, "direction");
    this.originalEvent = e, this.target = e.target, this.direction = Reflect.get(this.target, A.PROP);
  }
  createEvent(e, t) {
    return new V(e, t, this);
  }
}
class A {
  constructor(e) {
    r(this, "context");
    r(this, "window");
    r(this, "onResizing");
    r(this, "onResizeend");
    this.window = e;
  }
  resizestart(e) {
    e.stopPropagation(), e.preventDefault();
    const t = new Ct(e);
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
    for (const l in i) {
      const f = Math.round(i[l]);
      Reflect.set(s.style, l, f + "px");
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
    const t = this.context, i = this.window.options, s = typeof i.minWidth == "number" && i.minWidth >= 0 ? i.minWidth : 360, a = typeof i.minHeight == "number" && i.minHeight >= 0 ? i.minHeight : 32, l = this.window.getElement().getBoundingClientRect(), f = {};
    return t.direction & h.TOP && (f.height = R(l.bottom - R(e.clientY, 0), a), f.top = l.bottom - f.height), t.direction & h.BOTTOM && (f.height = R(e.clientY - l.top, a)), t.direction & h.LEFT && (f.width = R(l.right - R(e.clientX, 0), s), f.left = l.right - f.width), t.direction & h.RIGHT && (f.width = R(e.clientX - l.left, s)), f;
  }
  patchWindowState(e) {
    const t = this.window.state;
    for (const i in e) {
      const s = Math.round(e[i]), a = _t[i];
      a != null && Reflect.set(t, a, s);
    }
  }
}
r(A, "PROP", "__xwindow_resize_prop__");
const p = { window: "_1T2rhwiL", dragging: "yi9w1sZD", resizing: "Ja2o9U31", maximize: "_1eMSsKoB", focused: "_3czvPpS2", header: "GiVk7T8N", menu: "VuG4WNig x-window-is-menu", logo: "yBPezU8e", main: "xbuRK23n", init: "_9t1NJBZM", title: "shyxrRzw", menus: "nkEGqTFw", body: "pk12TusX", footer: "noixF94i", closeMenu: "ifXDegN1 VuG4WNig x-window-is-menu", pinMenu: "X5A6roxN VuG4WNig x-window-is-menu", resizeBar: "PPmfTMRL", resizeTop: "v8UGXgKi PPmfTMRL", resizeBottom: "_74VJ9GNt PPmfTMRL", resizeRight: "gg9Mcwey PPmfTMRL", resizeLeft: "Tw7sCaLt PPmfTMRL", resizeTopLeft: "CPuApFyD PPmfTMRL", resizeBottomLeft: "VBRi4FWg PPmfTMRL", resizeTopRight: "gCRpuZdB PPmfTMRL", resizeBottomRight: "iRYpNoUT PPmfTMRL", mask: "xTcKGSVA", simpleWindow: "Mh7BVc1o" }, at = B({ name: "WindowBody", props: { wid: String, body: { type: [Object, Function, String, Number], default: null }, abstractWindow: { type: Object, required: !0 } }, setup: (n) => function() {
  const e = typeof n.body == "function" ? n.body(n.abstractWindow) : n.body;
  return e == null && console.warn("[xWindow] 请指定窗体内容:", n.abstractWindow.options.title), e;
} }), Ht = Math.floor(Number.MAX_SAFE_INTEGER / 10) - 1e4, St = [[p.resizeTop, I.TOP], [p.resizeBottom, I.BOTTOM], [p.resizeLeft, I.LEFT], [p.resizeRight, I.RIGHT], [p.resizeTopLeft, I.TOP_LEFT], [p.resizeTopRight, I.TOP_RIGHT], [p.resizeBottomLeft, I.BOTTOM_LEFT], [p.resizeBottomRight, I.BOTTOM_RIGHT]], W = B({ name: "BlankWindow", props: { abstractWindow: { type: Object, required: !0 } }, setup(n, { slots: e }) {
  const t = Rt(), i = nt({ visible: !1, offsetWidth: 0, offsetHeight: 0, offsetTop: 0, offsetLeft: 0, focused: !1, pinned: !1, zIndex: 0, splitMode: o.NONE }), s = it(z.INIT), a = x(() => {
    const c = n.abstractWindow.options;
    return typeof c.zIndex == "number" && c.zIndex > 0;
  }), l = x(() => {
    const c = n.abstractWindow.options;
    return a.value ? c.zIndex : (i.pinned ? Ht : 0) + i.zIndex;
  }), f = function(c, u, g, O) {
    return x(() => {
      const T = c.options;
      if (u.value == z.INIT)
        return { width: T.width, height: T.height, left: T.left, top: T.top };
      const b = T.mask ? null : O.value;
      return { top: g.offsetTop + "px", left: g.offsetLeft + "px", width: g.offsetWidth + "px", height: u.value == z.INIT ? void 0 : g.offsetHeight + "px", zIndex: b };
    });
  }(n.abstractWindow, s, i, l), N = x(() => {
    const c = [m.WINDOW, p.window], u = n.abstractWindow;
    var g;
    return u.type === rt.SIMPLE_WINDOW && c.push(m.SIMPLE_WINDOW), s.value == z.INIT && c.push(p.init), i.splitMode == o.MAXIMIZE && c.push(p.maximize, m.MAXIMIZE), i.focused && c.push(p.focused, m.FOCUSED), (g = u.options.className) != null && typeof g == "string" && g.length != 0 && c.push(u.options.className), c;
  }), F = x(() => {
    const c = [], u = n.abstractWindow.options;
    return u.pinnable && u.mask !== !0 && a.value !== !0 && c.push(i.pinned ? E.PIN : E.UNPIN), u.resizeMode == y.RESIZE && c.push(i.splitMode == o.MAXIMIZE ? E.RESTORE : E.MAXIMIZE), u.closeable && c.push(E.CLOSE), c;
  }), U = { getElement: K, getRenderState: function() {
    return s.value;
  }, useCssClass: function() {
    return p;
  }, useMenus: function() {
    return F;
  } };
  function K() {
    return t.value;
  }
  async function J(c) {
    c == null || c.preventDefault(), n.abstractWindow.toggleMaximize();
  }
  async function Ot(c) {
    await q();
    const u = n.abstractWindow, g = u.options, O = c.el, T = O.getBoundingClientRect();
    if (s.value == z.INIT) {
      let b = Math.round(T.left), _ = Math.round(T.top);
      $(g.left) && (b = Math.floor((window.innerWidth - T.width) / 2)), $(g.top) && (_ = Math.floor((window.innerHeight - T.height) / 2)), i.offsetWidth = T.width, i.offsetHeight = T.height, i.offsetLeft = b, i.offsetTop = _, g.maximize && J(), s.value = z.MOUNTED, JSON.parse(JSON.stringify(i)), q(() => {
        const M = u.createEvent("show");
        u.dispatch(M), function(C) {
          const L = Array.from(C.querySelectorAll("[autofocus]"));
          for (const G of L)
            if (G instanceof HTMLElement && G.autofocus)
              return G.focus();
        }(O);
      });
    }
    u.focus();
  }
  function Mt(c) {
    const u = n.abstractWindow;
    u.focus(), u.allowDrag && !u.isMaximize && u.dragstart(c);
  }
  function It(c) {
    const u = K();
    if (u == null)
      return;
    const g = u.getBoundingClientRect();
    c.clientY - g.top > n.abstractWindow.allowDragArea || J(c);
  }
  function bt() {
    const c = n.abstractWindow;
    return w(at, { body: c.body, abstractWindow: n.abstractWindow, key: c.wid }, null);
  }
  return xt(ot, n.abstractWindow), function() {
    const c = n.abstractWindow;
    var u, g;
    c.component = U, c.state = i, u = c.id, g = c, d.stack.set(u, g);
    const O = c.createEvent("created");
    c.dispatch(O);
  }(), function() {
    const c = n.abstractWindow, u = c.options;
    if (i.visible !== !0)
      return null;
    const g = w("div", { class: p.main, onDblclick: It }, [typeof e.default == "function" ? e.default(U) : bt()]), O = { ref: t, id: c.wid, onVnodeMounted: Ot, onPointerdown: Mt, class: N.value, style: f.value }, T = (b = u.resizeMode, _ = c.resizestart, b == y.DISABLED ? null : St.map((L) => H("div", { ["." + A.PROP]: L[1], className: L[0], onPointerdown: _ })));
    var b, _;
    let M = H("div", O, [g, T]);
    if (u.mask === !0) {
      const L = { zIndex: l.value };
      M = w("div", { class: p.mask, style: L }, [M]);
    }
    return u.teleport === !1 ? M : w(st, { to: u.teleport }, typeof (C = M) == "function" || Object.prototype.toString.call(C) === "[object Object]" && !X(C) ? M : { default: () => [M] });
    var C;
  };
} }), ct = '<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M590.265 511.987l305.521-305.468c21.617-21.589 21.617-56.636.027-78.252-21.616-21.617-56.663-21.617-78.279 0L512.012 433.735 206.544 128.213c-21.617-21.617-56.635-21.617-78.252 0-21.616 21.589-21.616 56.635-.027 78.252L433.76 511.987 128.211 817.482c-21.617 21.59-21.617 56.635 0 78.251 10.808 10.81 24.967 16.213 39.125 16.213 14.159 0 28.318-5.403 39.126-16.213l305.522-305.468L817.48 895.788C828.289 906.597 842.447 912 856.606 912s28.317-5.403 39.125-16.212c21.618-21.59 21.618-56.636.028-78.252L590.265 511.987z"/></svg>', lt = '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5228" width="64" height="64"><path d="M97.74775349 97.74775349h828.50449302v828.50449302H97.74775349V97.74775349z m103.56306133 103.56306133v621.37837036h621.37837036V201.31081482H201.31081482z" fill="currentColor"></path></svg>', dt = '<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M38.794 124.791v778.495h946.412V124.791H38.794zm896.678 728.033H89.292v-460.9h846.18v460.9z"/></svg>', ut = '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M738.793 681.382v-48.331l88.242-88.243a298.676 298.676 0 00156.712-83.482 38.836 38.836 0 000-54.923l-366.15-366.15a38.836 38.836 0 00-54.923 0 298.52 298.52 0 00-83.519 156.749l-88.169 88.169h-48.332a411.145 411.145 0 00-292.59 121.232c-15.16 15.159-15.16 39.764 0 54.923L278.906 690.17 86.642 882.436a38.836 38.836 0 1054.922 54.922l192.23-192.229 228.844 228.845a38.836 38.836 0 0054.922 0 411.042 411.042 0 00121.233-292.592zM134.02 435.44a333.473 333.473 0 01208.56-72.571l64.406.037a38.836 38.836 0 0027.461-11.351L544.292 241.71a38.68 38.68 0 0011.351-27.462 180.096 180.096 0 0136.798-89.01L898.8 431.593a180.925 180.925 0 01-89.12 36.835 38.836 38.836 0 00-27.462 11.35L672.373 589.626c-7.287 7.286-11.387 17.173-11.35 27.461l.036 64.406a333.318 333.318 0 01-72.608 208.596L134.021 435.44z"/></svg>', ht = '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M845.40952426 212.52063539H65.21904746v702.17142826h780.1904768V212.52063539z m-702.17142933 624.1523808V290.53968285h624.1523808v546.13333334H143.23809493z" fill="currentColor"></path><path d="M981.53650809 76.3936505H201.34603129v78.01904746h702.17142933v624.15238187h78.01904747V76.3936505z" fill="currentColor"></path></svg>';
function oe() {
  return { IconClose: ct, IconMax: lt, IconPin: ut, IconWindow: dt, IconRestore: ht };
}
function Dt(n) {
  const e = n.options.icon;
  return typeof e == "string" ? w("i", { class: [p.logo, "icon", e] }, null) : X(e) ? e : typeof e == "function" ? e(n) : w("i", { class: p.logo, innerHTML: dt }, null);
}
const D = B({ name: "SimpleWindow", props: { abstractWindow: { type: Object, required: !0 } }, setup(n) {
  const e = n.abstractWindow;
  return function() {
    return w(W, { abstractWindow: e }, function(t) {
      const i = t.useMenus();
      return w("div", { class: p.simpleWindow }, [w("div", { class: [p.header, m.HEADER] }, [Dt(e), w("div", { class: p.title }, [e.options.title ?? "新窗口"]), w("div", { class: p.menus, onMousedown: Nt }, [i.value.map((s) => vt(e, s))])]), w("div", { class: [p.body, m.BODY] }, [w(at, { body: e.body, abstractWindow: n.abstractWindow, key: e.wid }, null)])]);
    });
  };
} }), pt = Object.freeze({ SIMPLE_WINDOW: D.name, BLANK_WINDOW: W.name });
function ft(n) {
  return n == W.name ? W : D;
}
function gt(n) {
  if (n.key == "Escape")
    return mt({ pressEsc: !0, forced: !1 });
}
function wt() {
  d.isMounted = !1, d.topWindow = null, d.ids.value = [], d.stack.clear();
}
function Tt() {
  return d.zIndex;
}
function Et() {
  return d.zIndex += 1;
}
function Bt() {
  return d.topWindow;
}
function mt(n) {
  if (d.stack.size == 0 || d.topWindow == null)
    return;
  const e = d.topWindow;
  (n == null ? void 0 : n.pressEsc) === !0 && e.options.closeOnPressEsc !== !0 || d.topWindow.cancel(n == null ? void 0 : n.forced);
}
function At(n) {
  const e = k.create(n);
  return d.isMounted ? (d.ids.value.push(e.id), d.stack.set(e.id, e), e) : (function(t) {
    const i = document.createDocumentFragment(), s = ft(t.type), a = H(s, { abstractWindow: t });
    a.appContext = d.appContext, Q(a, i), document.body.appendChild(i), t.on("beforeDestroy", () => {
      Q(null, i);
    });
  }(e), e);
}
function Z(n) {
  if (d.topWindow = n, n != null) {
    for (const e of d.stack.values()) {
      const t = e.state;
      t != null && (t.focused = e === n);
    }
    n.state != null && n.state.zIndex < Tt() && (n.state.zIndex = Et());
  }
}
function Ft() {
  Z(function() {
    if (d.stack.size == 0)
      return;
    let n;
    for (const e of d.stack.values())
      e.state != null && e.state.visible === !0 && (n != null ? n.state.zIndex < e.state.zIndex && (n = e) : n = e);
    return n;
  }());
}
function Gt() {
  return d.stack.size;
}
function kt() {
  d.appContext = null, wt(), window.removeEventListener("keydown", gt, !0);
}
function re() {
  return { closeTopWindow: mt, getTopWindow: Bt, getTopZIndex: Et, getWindowCount: Gt, getZIndex: Tt, setFocusedWindow: Z, cleanup: kt };
}
class Xt {
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
    this.originalEvent = t, this.target = e, this.deltaX = Math.round(i.left - t.clientX), this.deltaY = Math.round(i.top - t.clientY), this.initialX = t.clientX, this.initialY = t.clientY, this.prevClientX = t.clientX, this.prevClientY = t.clientY;
  }
  preventDragEvent(e) {
    return !this.moved && !(Math.abs(e.clientX - this.initialX) > 4) && !(Math.abs(e.clientY - this.initialY) > 4);
  }
  createEvent(e, t) {
    return new V(e, t, this);
  }
}
class Vt {
  constructor(e) {
    r(this, "window");
    r(this, "context");
    r(this, "onDragging");
    r(this, "onDragend");
    this.window = e;
  }
  static isConflict(e, t) {
    const i = e.getBoundingClientRect(), s = t.getBoundingClientRect();
    return !(i.top > s.bottom || i.right < s.left || i.bottom < s.top || i.left > s.right);
  }
  static findElementsFromPoint(e, t, i, s) {
    return typeof document.elementsFromPoint != "function" ? [] : document.elementsFromPoint(e, t).filter((a) => !(s != null && !s.contains(a)) && typeof i == "string" && a.matches(i));
  }
  dragstart(e) {
    if (e.button !== 0)
      return;
    const t = e.target;
    if (t instanceof Element && t.closest("." + m.MENU))
      return;
    const i = this.window.getElement();
    if (i == null)
      return;
    const s = i.getBoundingClientRect();
    e.clientY - s.top > this.window.allowDragArea || (e.preventDefault(), e.stopPropagation(), this.context = new Xt(i, e), this.context.left = this.window.state.offsetLeft, this.context.top = this.window.state.offsetTop, this.onDragging = this.dragging.bind(this), this.onDragend = this.dragend.bind(this), window.addEventListener("pointermove", this.onDragging), window.addEventListener("pointerup", this.onDragend));
  }
  dragging(e) {
    var a;
    if (this.context == null)
      return;
    const t = this.context;
    if (!t.moved) {
      if (this.window.dispatch(this.context.createEvent("dragStart", this.window)).defaultPrevented)
        return this.cleanup();
      const l = (a = this.window.component) == null ? void 0 : a.useCssClass();
      l != null && l.dragging && t.target.classList.add(l.dragging), t.target.setPointerCapture(e.pointerId), t.moved = !0;
    }
    if (t.preventDragEvent(e))
      return;
    e.preventDefault(), e.stopPropagation(), t.originalEvent = e, t.left = e.clientX + t.deltaX, t.top = e.clientY + t.deltaY, t.prevClientX = e.clientX, t.prevClientY = e.clientY;
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
const P = class P extends S {
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
    this.type = t.type ?? rt.SIMPLE_WINDOW, this.options = this.createOptions(t), this.body = t.body, Reflect.defineProperty(this, "id", { enumerable: !0, configurable: !1, writable: !1, value: P.seed++ }), this.initDraggable(), this.initResizable(), this.initHooks();
  }
  static create(t) {
    return t instanceof P ? t : new P(t);
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
    return typeof t == "number" && t > 0 ? t : v.draggaleHeight;
  }
  get isMaximize() {
    var t;
    return ((t = this.state) == null ? void 0 : t.splitMode) === o.MAXIMIZE;
  }
  createOptions(t) {
    return { title: t.title ?? "未命名的窗口", icon: t.icon, className: t.className, width: t.width ?? "640px", minWidth: t.minWidth ?? 360, maxWidth: t.maxWidth, height: t.height, minHeight: t.minHeight ?? 32, maxHeight: t.maxHeight, top: t.top, left: t.left, zIndex: t.zIndex, maximize: t.maximize === !0, teleport: t.teleport ?? "body", draggable: t.draggable == null || t.draggable, resizeMode: t.resizeMode ?? y.RESIZE, closeable: t.closeable !== !1, mask: t.mask === !0, pinnable: t.pinnable !== !1, displayAfterCreate: t.displayAfterCreate !== !1, destroyAfterClose: t.destroyAfterClose !== !1, closeOnPressEsc: t.closeOnPressEsc !== !1 };
  }
  createEvent(t, i) {
    return new V(t, this, i);
  }
  initDraggable() {
    this.draggable = new Vt(this), this.dragstart = this.draggable.dragstart.bind(this.draggable);
  }
  initResizable() {
    this.resizable = new A(this), this.resizestart = this.resizable.resizestart.bind(this.resizable);
  }
  initHooks() {
    this.once("created", () => {
      this.created = !0, typeof this.CREATE_RESOLVE == "function" && this.CREATE_RESOLVE(), delete this.CREATE_REJECT, delete this.CREATE_RESOLVE;
    });
  }
  ready() {
    return this.created === !0 ? Promise.resolve() : new Promise((t, i) => {
      this.CREATE_RESOLVE = t, this.CREATE_REJECT = i;
    });
  }
  show() {
    this.state != null && (this.dispatch(this.createEvent("beforeShow")).defaultPrevented || (this.state.visible = !0));
  }
  close(t = !1) {
    if (this.state == null || this.options.closeable === !1 && t !== !0)
      return !1;
    const i = this.dispatch(this.createEvent("beforeClose"));
    return (t === !0 || !i.defaultPrevented) && (this.state.visible = !1, this.dispatch(this.createEvent("close")), this.state.focused && setTimeout(Ft), this.destroyed || this.options.destroyAfterClose === !1 || this.destroy(), !0);
  }
  cleanup() {
    super.cleanup(), this.dragstart = void 0, this.resizestart = void 0, this.component = void 0, this.state = void 0, this.handles = {};
  }
  destroy() {
    var t;
    this.destroyed = !0, ((t = this.state) == null ? void 0 : t.visible) === !0 && this.close(), this.dispatch(this.createEvent("beforeDestroy")), function(i) {
      if (!d.stack.has(i) || (d.stack.delete(i), !d.isMounted))
        return;
      const s = d.ids.value.indexOf(i);
      s < 0 || d.ids.value.splice(s, 1);
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
    this.state == null || this.state.focused || (t = this.id, Z(d.stack.get(t)));
  }
  startTransition() {
    const t = document.documentElement, i = function(s) {
      s.target.matches("." + m.WINDOW) && (t.classList.remove(m.TRANSITION), t.removeEventListener("transitionend", i));
    };
    t.classList.add(m.TRANSITION), t.addEventListener("transitionend", i);
  }
  requestMaximize() {
    const t = this.state;
    t != null && this.options.resizeMode === y.RESIZE && (t.splitMode = o.MAXIMIZE, this.startTransition(), this.dispatch(this.createEvent("maximizeChange")));
  }
  exitMaximize() {
    const t = this.state;
    t != null && this.options.resizeMode === y.RESIZE && (t.splitMode = o.NONE, this.startTransition(), this.dispatch(this.createEvent("maximizeChange")));
  }
  toggleMaximize() {
    const t = this.state;
    t != null && this.options.resizeMode === y.RESIZE && (t.splitMode === o.MAXIMIZE ? this.exitMaximize() : this.requestMaximize());
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
  useHandle(t, i) {
    this.handles[t] = i;
  }
  async callHandle(t) {
    const i = this.handles[t];
    if (typeof i == "function")
      return await i();
  }
  onConfirm() {
    return this.callHandle("confirm").then((t) => this.confirm(t));
  }
  confirm(t) {
    this.dispatch(this.createEvent("confirm", t)), this.close(!0);
  }
  onCancel() {
    return this.callHandle("cancel").then((t) => this.cancel(!0, t));
  }
  cancel(t = !0, i) {
    this.close(t) && this.dispatch(this.createEvent("cancel", i));
  }
  promise() {
    return new Promise((t, i) => {
      this.once("confirm", (s) => t(s.detail)), this.once("cancel", (s) => i(s.detail));
    });
  }
};
r(P, "seed", 1e3);
let k = P;
const tt = 1e3, v = {}, d = { appContext: null, isMounted: !1, zIndex: 1e3, stack: /* @__PURE__ */ new Map(), ids: it([]), topWindow: null, previewState: nt({ mode: o.NONE, width: 0, height: 0 }) };
function Zt(n) {
  var e;
  v.zIndex = (e = n == null ? void 0 : n.zIndex, typeof e != "number" ? tt : Number.isFinite(e) ? Math.floor(e) : tt), v.draggaleHeight = (n == null ? void 0 : n.draggaleHeight) ?? 32, v.size = (n == null ? void 0 : n.size) ?? {}, d.zIndex = v.zIndex;
}
function ae(n, e) {
  v.size == null && (v.size = {}), v.size[n] = e;
}
function ce() {
  return yt(ot);
}
function vt(n, e) {
  var s;
  const t = n.state, i = ((s = n.component) == null ? void 0 : s.useCssClass()) ?? {};
  switch (e) {
    case E.CLOSE:
      return w("button", { onClick: function() {
        n.cancel();
      }, type: "button", innerHTML: ct, class: i.closeMenu, title: "关闭" }, null);
    case E.PIN:
    case E.UNPIN:
      const a = t.pinned ? "取消固定" : "固定", l = t.pinned ? i.pinMenu : i.menu;
      return w("button", { onClick: function() {
        n.togglePin();
      }, type: "button", innerHTML: ut, class: l, title: a }, null);
    case E.MAXIMIZE:
    case E.RESTORE:
      const f = t.splitMode == o.MAXIMIZE ? ht : lt, N = t.splitMode == o.MAXIMIZE ? "还原" : "最大化";
      return w("button", { onClick: function(F) {
        F.preventDefault(), n.toggleMaximize();
      }, type: "button", innerHTML: f, class: i.menu, title: N }, null);
  }
  return null;
}
const Yt = "Ycke6mYQ", jt = "esgrGyhH", Ut = "UkryRM5g", Kt = "U5LZXLJZ", Jt = "_2rffDKab", qt = "vcVMeNrL", Qt = "koc15mYi", $t = "_4VxfFKcG", te = { [o.MAXIMIZE]: jt, [o.LEFT]: Ut, [o.RIGHT]: Kt, [o.TOP_LEFT]: Jt, [o.TOP_RIGHT]: qt, [o.BOTTOM_LEFT]: Qt, [o.BOTTOM_RIGHT]: $t }, et = (o.BOTTOM_LEFT, o.LEFT, o.BOTTOM_RIGHT, o.RIGHT, o.LEFT, o.TOP_LEFT, o.RIGHT, o.TOP_RIGHT, o.MAXIMIZE, o.TOP_LEFT, o.LEFT, o.TOP_RIGHT, o.RIGHT, o.LEFT, o.BOTTOM_LEFT, o.RIGHT, o.BOTTOM_RIGHT, o.NONE, o.TOP_RIGHT, o.TOP_LEFT, o.TOP_LEFT, o.TOP_RIGHT, o.BOTTOM_RIGHT, o.BOTTOM_LEFT, o.BOTTOM_LEFT, o.BOTTOM_RIGHT, o.LEFT, o.TOP_LEFT, o.TOP_RIGHT, o.TOP_RIGHT, o.TOP_LEFT, o.BOTTOM_LEFT, o.BOTTOM_RIGHT, o.BOTTOM_RIGHT, o.BOTTOM_LEFT, o.RIGHT, B({ name: "WindowManager", setup() {
  const n = d.ids, e = d.previewState;
  function t(a) {
    a.key, a.ctrlKey;
  }
  d.isMounted = !0, window.addEventListener("keydown", t, !0), Pt(() => {
    wt(), window.removeEventListener("keydown", t, !0);
  });
  const i = x(() => {
    const a = [Yt], l = te[e.mode];
    return l != null && a.push(l), a;
  });
  function s() {
    let a = null;
    if (e.mode != o.NONE) {
      const l = { zIndex: function() {
        const f = d.topWindow;
        return f ? f.state.zIndex : 1;
      }() + 1, width: e.width ? e.width - 20 + "px" : void 0 };
      a = w("div", { class: i.value, style: l }, null);
    }
    return w(st, { to: "body" }, { default: () => {
      return [w(Wt, { name: "fade" }, (l = a, typeof l == "function" || Object.prototype.toString.call(l) === "[object Object]" && !X(l) ? a : { default: () => [a] }))];
      var l;
    } });
  }
  return function() {
    return [...n.value.map((a) => {
      const l = function(N) {
        return d.stack.get(N);
      }(a);
      if (l == null)
        return null;
      const f = ft(l.type);
      return H(f, { abstractWindow: l, key: l.wid });
    }), s()];
  };
} }));
function Y(n) {
  const e = function(i) {
    if (i.length == 1) {
      const s = i[0];
      return s == null ? null : typeof s == "object" ? { ...s } : null;
    }
    if (i.length == 2) {
      const [s, a] = i;
      if (typeof s == "string" && a != null)
        return { title: s, body: a };
    }
    if (i.length == 3) {
      const [s, a, l] = i;
      if (typeof s == "string" && a != null)
        return { ...l, title: s, body: a };
    }
    return null;
  }(n) ?? {}, t = typeof e.size == "string" ? Reflect.get(v.size, e.size) : null;
  return t != null && (e.width = t.width, e.height = t.height, e.top = t.top, e.left = t.left), e;
}
function le(...n) {
  return j(Y(n) ?? {});
}
function de(...n) {
  const e = Y(n) ?? {};
  return e.type = pt.BLANK_WINDOW, j(e);
}
function ue(...n) {
  const e = Y(n) ?? {};
  return e.type = pt.SIMPLE_WINDOW, j(e);
}
function j(n) {
  const e = At(n);
  return e.ready().then(() => {
    n.displayAfterCreate !== !1 && e.show();
  }), e;
}
const he = Object.freeze({ renderMenu: vt });
function ee(n, e) {
  n.component(D.name, D), n.component(W.name, W), n.component(et.name, et), Zt(e), window.addEventListener("keydown", gt, !0), function(t) {
    d.appContext = t._context;
  }(n);
}
const ne = "0.2.1", pe = { install: ee, version: ne };
export {
  k as AbstractWindow,
  W as BlankWindow,
  z as RENDER_STATES,
  y as RESIZE_MODE,
  he as Render,
  o as SPLIT_MODES,
  D as SimpleWindow,
  Xt as WindowDragContext,
  et as WindowManager,
  kt as cleanup,
  pe as default,
  ee as install,
  de as useBlankWindow,
  oe as useIcons,
  ue as useSimpleWindow,
  le as useWindow,
  ce as useWindowApi,
  re as useWindowManager,
  ae as useWindowSize,
  ne as version,
  pe as xWindow
};
