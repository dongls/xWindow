/*! @dongls/xWindow v0.2.2 https://github.com/dongls/xWindow
Copyright 2023-present dongls
Released under the MIT License */
var Lt = Object.defineProperty;
var zt = (i, e, t) => e in i ? Lt(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t;
var a = (i, e, t) => (zt(i, typeof e != "symbol" ? e + "" : e, t), t);
import { defineComponent as B, computed as x, h as H, shallowRef as Rt, reactive as tt, ref as et, provide as xt, createVNode as g, Teleport as nt, isVNode as X, nextTick as K, render as J, inject as yt, onBeforeUnmount as Pt, Transition as Wt } from "vue";
const it = Symbol(), m = Object.freeze({ WINDOW: "x-window", SIMPLE_WINDOW: "x-simple-window", TRANSITION: "x-window-is-transition", MENU: "x-window-is-menu", FOCUSED: "x-window-is-focused", MAXIMIZE: "x-window-is-maximize", HEADER: "x-window-header", BODY: "x-window-body" }), h = Object.freeze({ NONE: 0, TOP: 1, BOTTOM: 2, LEFT: 4, RIGHT: 8 }), I = Object.freeze({ TOP: h.TOP, BOTTOM: h.BOTTOM, LEFT: h.LEFT, RIGHT: h.RIGHT, TOP_LEFT: h.TOP | h.LEFT, TOP_RIGHT: h.TOP | h.RIGHT, BOTTOM_LEFT: h.BOTTOM | h.LEFT, BOTTOM_RIGHT: h.BOTTOM | h.RIGHT }), o = Object.freeze({ NONE: h.NONE, MAXIMIZE: h.TOP, LEFT: h.LEFT, RIGHT: h.RIGHT, TOP_LEFT: h.TOP | h.LEFT, TOP_RIGHT: h.TOP | h.RIGHT, BOTTOM_LEFT: h.BOTTOM | h.LEFT, BOTTOM_RIGHT: h.BOTTOM | h.RIGHT }), y = Object.freeze({ DISABLED: 0, RESIZE: 1, RESIZE_ONLY: 2 }), z = Object.freeze({ INIT: 0, MOUNTED: 1, UNMOUNTED: 2 }), st = Object.freeze({ SIMPLE_WINDOW: "SimpleWindow", BLANK_WINDOW: "BlankWindow" }), E = Object.freeze({ CLOSE: 0, MAXIMIZE: 1, RESTORE: 2, PIN: 3, UNPIN: 4 });
class V {
  constructor(e, t, n) {
    a(this, "type");
    a(this, "stopped", !1);
    a(this, "defaultPrevented", !1);
    a(this, "instance");
    a(this, "detail");
    this.type = e, this.instance = t, this.detail = n;
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
    a(this, "ALL_EVENTS", /* @__PURE__ */ new Map());
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
    const r = s.indexOf(t);
    return r < 0 || (n ? s.splice(r, 1, S.NOOP) : s.splice(r, 1)), this;
  }
  dispatch(e) {
    const t = this.ALL_EVENTS.get(e.type);
    if (t == null)
      return e;
    for (const s of t)
      if (typeof s == "function" && s(e), e.stopped)
        break;
    const n = t.filter((s) => s != S.NOOP);
    return this.ALL_EVENTS.set(e.type, n), e;
  }
  cleanup() {
    this.ALL_EVENTS.clear();
  }
}
function R(i, e, t) {
  return e != null && Number.isFinite(e) && i < e ? e : i;
}
function q(i) {
  return i == null || typeof i != "string" || i.length == 0;
}
function Nt(i) {
  i.stopPropagation();
}
const _t = { top: "offsetTop", left: "offsetLeft", width: "offsetWidth", height: "offsetHeight" };
class Ct {
  constructor(e) {
    a(this, "init", !1);
    a(this, "defaultPrevented", !1);
    a(this, "originalEvent");
    a(this, "target");
    a(this, "direction");
    this.originalEvent = e, this.target = e.target, this.direction = Reflect.get(this.target, A.PROP);
  }
  createEvent(e, t) {
    return new V(e, t, this);
  }
}
class A {
  constructor(e) {
    a(this, "context");
    a(this, "window");
    a(this, "onResizing");
    a(this, "onResizeend");
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
    const n = this.calcWindowState(e), s = this.window.getElement();
    for (const l in n) {
      const p = Math.round(n[l]);
      Reflect.set(s.style, l, p + "px");
    }
    t.originalEvent = e;
    const r = this.context.createEvent("resizing", this.window);
    this.window.dispatch(r);
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
    const t = this.context, n = this.window.options, s = typeof n.minWidth == "number" && n.minWidth >= 0 ? n.minWidth : 360, r = typeof n.minHeight == "number" && n.minHeight >= 0 ? n.minHeight : 32, l = this.window.getElement().getBoundingClientRect(), p = {};
    return t.direction & h.TOP && (p.height = R(l.bottom - R(e.clientY, 0), r), p.top = l.bottom - p.height), t.direction & h.BOTTOM && (p.height = R(e.clientY - l.top, r)), t.direction & h.LEFT && (p.width = R(l.right - R(e.clientX, 0), s), p.left = l.right - p.width), t.direction & h.RIGHT && (p.width = R(e.clientX - l.left, s)), p;
  }
  patchWindowState(e) {
    const t = this.window.state;
    for (const n in e) {
      const s = Math.round(e[n]), r = _t[n];
      r != null && Reflect.set(t, r, s);
    }
  }
}
a(A, "PROP", "__xwindow_resize_prop__");
const f = { window: "_1T2rhwiL", dragging: "yi9w1sZD", resizing: "Ja2o9U31", maximize: "_1eMSsKoB", focused: "_3czvPpS2", header: "GiVk7T8N", menu: "VuG4WNig x-window-is-menu", logo: "yBPezU8e", main: "xbuRK23n", init: "_9t1NJBZM", title: "shyxrRzw", menus: "nkEGqTFw", body: "pk12TusX", footer: "noixF94i", textMenu: "_5duVmvKs x-window-is-menu", closeMenu: "ifXDegN1 VuG4WNig x-window-is-menu", pinMenu: "X5A6roxN VuG4WNig x-window-is-menu", resizeBar: "PPmfTMRL", resizeTop: "v8UGXgKi PPmfTMRL", resizeBottom: "_74VJ9GNt PPmfTMRL", resizeRight: "gg9Mcwey PPmfTMRL", resizeLeft: "Tw7sCaLt PPmfTMRL", resizeTopLeft: "CPuApFyD PPmfTMRL", resizeBottomLeft: "VBRi4FWg PPmfTMRL", resizeTopRight: "gCRpuZdB PPmfTMRL", resizeBottomRight: "iRYpNoUT PPmfTMRL", mask: "xTcKGSVA", simpleWindow: "Mh7BVc1o" }, ot = B({ name: "WindowBody", props: { wid: String, body: { type: [Object, Function, String, Number], default: null }, abstractWindow: { type: Object, required: !0 } }, setup: (i) => function() {
  const e = typeof i.body == "function" ? i.body(i.abstractWindow) : i.body;
  return e == null && console.warn("[xWindow] 请指定窗体内容:", i.abstractWindow.options.title), e;
} }), Ht = Math.floor(Number.MAX_SAFE_INTEGER / 10) - 1e4, St = [[f.resizeTop, I.TOP], [f.resizeBottom, I.BOTTOM], [f.resizeLeft, I.LEFT], [f.resizeRight, I.RIGHT], [f.resizeTopLeft, I.TOP_LEFT], [f.resizeTopRight, I.TOP_RIGHT], [f.resizeBottomLeft, I.BOTTOM_LEFT], [f.resizeBottomRight, I.BOTTOM_RIGHT]], W = B({ name: "BlankWindow", props: { abstractWindow: { type: Object, required: !0 } }, setup(i, { slots: e }) {
  const t = Rt(), n = tt({ visible: !1, offsetWidth: 0, offsetHeight: 0, offsetTop: 0, offsetLeft: 0, focused: !1, pinned: !1, zIndex: 0, splitMode: o.NONE }), s = et(z.INIT), r = x(() => {
    const c = i.abstractWindow.options;
    return typeof c.zIndex == "number" && c.zIndex > 0;
  }), l = x(() => {
    const c = i.abstractWindow.options;
    return r.value ? c.zIndex : (n.pinned ? Ht : 0) + n.zIndex;
  }), p = function(c, u, w, O) {
    return x(() => {
      const T = c.options;
      if (u.value == z.INIT)
        return { width: T.width, height: T.height, left: T.left, top: T.top };
      const b = T.mask ? null : O.value;
      return { top: w.offsetTop + "px", left: w.offsetLeft + "px", width: w.offsetWidth + "px", height: u.value == z.INIT ? void 0 : w.offsetHeight + "px", zIndex: b };
    });
  }(i.abstractWindow, s, n, l), N = x(() => {
    const c = [m.WINDOW, f.window], u = i.abstractWindow;
    var w;
    return u.type === st.SIMPLE_WINDOW && c.push(m.SIMPLE_WINDOW), s.value == z.INIT && c.push(f.init), n.splitMode == o.MAXIMIZE && c.push(f.maximize, m.MAXIMIZE), n.focused && c.push(f.focused, m.FOCUSED), (w = u.options.className) != null && typeof w == "string" && w.length != 0 && c.push(u.options.className), c;
  }), F = x(() => {
    const c = [], u = i.abstractWindow.options;
    return u.pinnable && u.mask !== !0 && r.value !== !0 && c.push(n.pinned ? E.PIN : E.UNPIN), u.resizeMode == y.RESIZE && c.push(n.splitMode == o.MAXIMIZE ? E.RESTORE : E.MAXIMIZE), u.closeable && c.push(E.CLOSE), c;
  }), Y = { getElement: j, getRenderState: function() {
    return s.value;
  }, useCssClass: function() {
    return f;
  }, useMenus: function() {
    return F;
  } };
  function j() {
    return t.value;
  }
  async function U(c) {
    c == null || c.preventDefault(), i.abstractWindow.toggleMaximize();
  }
  async function Ot(c) {
    await K();
    const u = i.abstractWindow, w = u.options, O = c.el, T = O.getBoundingClientRect();
    if (s.value == z.INIT) {
      let b = Math.round(T.left), _ = Math.round(T.top);
      q(w.left) && (b = Math.floor((window.innerWidth - T.width) / 2)), q(w.top) && (_ = Math.floor((window.innerHeight - T.height) / 2)), n.offsetWidth = T.width, n.offsetHeight = T.height, n.offsetLeft = b, n.offsetTop = _, w.maximize && U(), s.value = z.MOUNTED, JSON.parse(JSON.stringify(n)), K(() => {
        const M = u.createEvent("show");
        u.dispatch(M), function(C) {
          const L = Array.from(C.querySelectorAll("[autofocus]"));
          for (const k of L)
            if (k instanceof HTMLElement && k.autofocus)
              return k.focus();
        }(O);
      });
    }
    u.focus();
  }
  function Mt(c) {
    const u = i.abstractWindow;
    u.focus(), u.allowDrag && !u.isMaximize && u.dragstart(c);
  }
  function It(c) {
    const u = j();
    if (u == null)
      return;
    const w = u.getBoundingClientRect();
    c.clientY - w.top > i.abstractWindow.allowDragArea || U(c);
  }
  function bt() {
    const c = i.abstractWindow;
    return g(ot, { body: c.body, abstractWindow: i.abstractWindow, key: c.wid }, null);
  }
  return xt(it, i.abstractWindow), function() {
    const c = i.abstractWindow;
    var u, w;
    c.component = Y, c.state = n, u = c.id, w = c, d.stack.set(u, w);
    const O = c.createEvent("created");
    c.dispatch(O);
  }(), function() {
    const c = i.abstractWindow, u = c.options;
    if (n.visible !== !0)
      return null;
    const w = g("div", { class: f.main, onDblclick: It }, [typeof e.default == "function" ? e.default(Y) : bt()]), O = { ref: t, id: c.wid, onVnodeMounted: Ot, onPointerdown: Mt, class: N.value, style: p.value }, T = (b = u.resizeMode, _ = c.resizestart, b == y.DISABLED ? null : St.map((L) => H("div", { ["." + A.PROP]: L[1], className: L[0], onPointerdown: _ })));
    var b, _;
    let M = H("div", O, [w, T]);
    if (u.mask === !0) {
      const L = { zIndex: l.value };
      M = g("div", { class: f.mask, style: L }, [M]);
    }
    return u.teleport === !1 ? M : g(nt, { to: u.teleport }, typeof (C = M) == "function" || Object.prototype.toString.call(C) === "[object Object]" && !X(C) ? M : { default: () => [M] });
    var C;
  };
} }), rt = '<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M590.265 511.987l305.521-305.468c21.617-21.589 21.617-56.636.027-78.252-21.616-21.617-56.663-21.617-78.279 0L512.012 433.735 206.544 128.213c-21.617-21.617-56.635-21.617-78.252 0-21.616 21.589-21.616 56.635-.027 78.252L433.76 511.987 128.211 817.482c-21.617 21.59-21.617 56.635 0 78.251 10.808 10.81 24.967 16.213 39.125 16.213 14.159 0 28.318-5.403 39.126-16.213l305.522-305.468L817.48 895.788C828.289 906.597 842.447 912 856.606 912s28.317-5.403 39.125-16.212c21.618-21.59 21.618-56.636.028-78.252L590.265 511.987z"/></svg>', at = '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5228" width="64" height="64"><path d="M97.74775349 97.74775349h828.50449302v828.50449302H97.74775349V97.74775349z m103.56306133 103.56306133v621.37837036h621.37837036V201.31081482H201.31081482z" fill="currentColor"></path></svg>', ct = '<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M38.794 124.791v778.495h946.412V124.791H38.794zm896.678 728.033H89.292v-460.9h846.18v460.9z"/></svg>', lt = '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M738.793 681.382v-48.331l88.242-88.243a298.676 298.676 0 00156.712-83.482 38.836 38.836 0 000-54.923l-366.15-366.15a38.836 38.836 0 00-54.923 0 298.52 298.52 0 00-83.519 156.749l-88.169 88.169h-48.332a411.145 411.145 0 00-292.59 121.232c-15.16 15.159-15.16 39.764 0 54.923L278.906 690.17 86.642 882.436a38.836 38.836 0 1054.922 54.922l192.23-192.229 228.844 228.845a38.836 38.836 0 0054.922 0 411.042 411.042 0 00121.233-292.592zM134.02 435.44a333.473 333.473 0 01208.56-72.571l64.406.037a38.836 38.836 0 0027.461-11.351L544.292 241.71a38.68 38.68 0 0011.351-27.462 180.096 180.096 0 0136.798-89.01L898.8 431.593a180.925 180.925 0 01-89.12 36.835 38.836 38.836 0 00-27.462 11.35L672.373 589.626c-7.287 7.286-11.387 17.173-11.35 27.461l.036 64.406a333.318 333.318 0 01-72.608 208.596L134.021 435.44z"/></svg>', dt = '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M845.40952426 212.52063539H65.21904746v702.17142826h780.1904768V212.52063539z m-702.17142933 624.1523808V290.53968285h624.1523808v546.13333334H143.23809493z" fill="currentColor"></path><path d="M981.53650809 76.3936505H201.34603129v78.01904746h702.17142933v624.15238187h78.01904747V76.3936505z" fill="currentColor"></path></svg>';
function re() {
  return { IconClose: rt, IconMax: at, IconPin: lt, IconWindow: ct, IconRestore: dt };
}
function Dt(i) {
  const e = i.options.icon;
  return typeof e == "string" ? g("i", { class: [f.logo, "icon", e] }, null) : X(e) ? e : typeof e == "function" ? e(i) : g("i", { class: f.logo, innerHTML: ct }, null);
}
const D = B({ name: "SimpleWindow", props: { abstractWindow: { type: Object, required: !0 } }, setup(i) {
  const e = i.abstractWindow;
  function t(n, s) {
    s.stopPropagation(), typeof n.handler == "function" && n.handler(e);
  }
  return function() {
    return g(W, { abstractWindow: e }, function(n) {
      const s = n.useMenus(), r = e.options.menus ?? [];
      return g("div", { class: f.simpleWindow }, [g("div", { class: [f.header, m.HEADER] }, [Dt(e), g("div", { class: f.title }, [e.options.title ?? "新窗口"]), g("div", { class: f.menus, onMousedown: Nt }, [r.map((l) => function(p) {
        return g("button", { type: "button", class: f.textMenu, onClick: t.bind(null, p) }, [p.label]);
      }(l)), s.value.map((l) => Et(e, l))])]), g("div", { class: [f.body, m.BODY] }, [g(ot, { body: e.body, abstractWindow: i.abstractWindow, key: e.wid }, null)])]);
    });
  };
} }), ut = Object.freeze({ SIMPLE_WINDOW: D.name, BLANK_WINDOW: W.name });
function ht(i) {
  return i == W.name ? W : D;
}
function pt(i) {
  if (i.key == "Escape")
    return Tt({ pressEsc: !0, forced: !1 });
}
function ft() {
  d.isMounted = !1, d.topWindow = null, d.ids.value = [], d.stack.clear();
}
function gt() {
  return d.zIndex;
}
function wt() {
  return d.zIndex += 1;
}
function Bt() {
  return d.topWindow;
}
function Tt(i) {
  if (d.stack.size == 0 || d.topWindow == null)
    return;
  const e = d.topWindow;
  (i == null ? void 0 : i.pressEsc) === !0 && e.options.closeOnPressEsc !== !0 || d.topWindow.cancel(i == null ? void 0 : i.forced);
}
function At(i) {
  const e = G.create(i);
  return d.isMounted ? (d.ids.value.push(e.id), d.stack.set(e.id, e), e) : (function(t) {
    const n = document.createDocumentFragment(), s = ht(t.type), r = H(s, { abstractWindow: t });
    r.appContext = d.appContext, J(r, n), document.body.appendChild(n), t.on("beforeDestroy", () => {
      J(null, n);
    });
  }(e), e);
}
function Z(i) {
  if (d.topWindow = i, i != null) {
    for (const e of d.stack.values()) {
      const t = e.state;
      t != null && (t.focused = e === i);
    }
    i.state != null && i.state.zIndex < gt() && (i.state.zIndex = wt());
  }
}
function Ft() {
  Z(function() {
    if (d.stack.size == 0)
      return;
    let i;
    for (const e of d.stack.values())
      e.state != null && e.state.visible === !0 && (i != null ? i.state.zIndex < e.state.zIndex && (i = e) : i = e);
    return i;
  }());
}
function kt() {
  return d.stack.size;
}
function Gt() {
  d.appContext = null, ft(), window.removeEventListener("keydown", pt, !0);
}
function ae() {
  return { closeTopWindow: Tt, getTopWindow: Bt, getTopZIndex: wt, getWindowCount: kt, getZIndex: gt, setFocusedWindow: Z, cleanup: Gt };
}
class Xt {
  constructor(e, t) {
    a(this, "moved", !1);
    a(this, "originalEvent");
    a(this, "target");
    a(this, "deltaX");
    a(this, "deltaY");
    a(this, "initialX");
    a(this, "initialY");
    a(this, "left", 0);
    a(this, "top", 0);
    a(this, "prevClientX");
    a(this, "prevClientY");
    const n = e.getBoundingClientRect();
    this.originalEvent = t, this.target = e, this.deltaX = Math.round(n.left - t.clientX), this.deltaY = Math.round(n.top - t.clientY), this.initialX = t.clientX, this.initialY = t.clientY, this.prevClientX = t.clientX, this.prevClientY = t.clientY;
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
    a(this, "window");
    a(this, "context");
    a(this, "onDragging");
    a(this, "onDragend");
    this.window = e;
  }
  static isConflict(e, t) {
    const n = e.getBoundingClientRect(), s = t.getBoundingClientRect();
    return !(n.top > s.bottom || n.right < s.left || n.bottom < s.top || n.left > s.right);
  }
  static findElementsFromPoint(e, t, n, s) {
    return typeof document.elementsFromPoint != "function" ? [] : document.elementsFromPoint(e, t).filter((r) => !(s != null && !s.contains(r)) && typeof n == "string" && r.matches(n));
  }
  dragstart(e) {
    if (e.button !== 0)
      return;
    const t = e.target;
    if (t instanceof Element && t.closest("." + m.MENU))
      return;
    const n = this.window.getElement();
    if (n == null)
      return;
    const s = n.getBoundingClientRect();
    e.clientY - s.top > this.window.allowDragArea || (e.preventDefault(), e.stopPropagation(), this.context = new Xt(n, e), this.context.left = this.window.state.offsetLeft, this.context.top = this.window.state.offsetTop, this.onDragging = this.dragging.bind(this), this.onDragend = this.dragend.bind(this), window.addEventListener("pointermove", this.onDragging), window.addEventListener("pointerup", this.onDragend));
  }
  dragging(e) {
    var r;
    if (this.context == null)
      return;
    const t = this.context;
    if (!t.moved) {
      if (this.window.dispatch(this.context.createEvent("dragStart", this.window)).defaultPrevented)
        return this.cleanup();
      const l = (r = this.window.component) == null ? void 0 : r.useCssClass();
      l != null && l.dragging && t.target.classList.add(l.dragging), t.target.setPointerCapture(e.pointerId), t.moved = !0;
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
const P = class P extends S {
  constructor(t) {
    super();
    a(this, "CREATE_RESOLVE");
    a(this, "CREATE_REJECT");
    a(this, "id");
    a(this, "type");
    a(this, "options");
    a(this, "body");
    a(this, "state");
    a(this, "created", !1);
    a(this, "destroyed", !1);
    a(this, "component");
    a(this, "draggable");
    a(this, "resizable");
    a(this, "handles", {});
    a(this, "dragstart");
    a(this, "resizestart");
    const { body: n, type: s, ...r } = t;
    this.type = s ?? st.SIMPLE_WINDOW, this.options = this.createOptions(r), this.body = n, Reflect.defineProperty(this, "id", { enumerable: !0, configurable: !1, writable: !1, value: P.seed++ }), this.initDraggable(), this.initResizable(), this.initHooks();
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
    return { ...t, title: t.title ?? "未命名的窗口", icon: t.icon, className: t.className, width: t.width ?? "640px", minWidth: t.minWidth ?? 360, maxWidth: t.maxWidth, height: t.height, minHeight: t.minHeight ?? 32, maxHeight: t.maxHeight, top: t.top, left: t.left, zIndex: t.zIndex, maximize: t.maximize === !0, teleport: t.teleport ?? "body", draggable: t.draggable == null || t.draggable, resizeMode: t.resizeMode ?? y.RESIZE, closeable: t.closeable !== !1, mask: t.mask === !0, pinnable: t.pinnable !== !1, displayAfterCreate: t.displayAfterCreate !== !1, destroyAfterClose: t.destroyAfterClose !== !1, closeOnPressEsc: t.closeOnPressEsc !== !1 };
  }
  createEvent(t, n) {
    return new V(t, this, n);
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
    return (t === !0 || !n.defaultPrevented) && (this.state.visible = !1, this.dispatch(this.createEvent("close")), this.state.focused && setTimeout(Ft), this.destroyed || this.options.destroyAfterClose === !1 || this.destroy(), !0);
  }
  cleanup() {
    super.cleanup(), this.dragstart = void 0, this.resizestart = void 0, this.component = void 0, this.state = void 0, this.handles = {};
  }
  destroy() {
    var t;
    this.destroyed = !0, ((t = this.state) == null ? void 0 : t.visible) === !0 && this.close(), this.dispatch(this.createEvent("beforeDestroy")), function(n) {
      if (!d.stack.has(n) || (d.stack.delete(n), !d.isMounted))
        return;
      const s = d.ids.value.indexOf(n);
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
    const t = document.documentElement, n = function(s) {
      s.target.matches("." + m.WINDOW) && (t.classList.remove(m.TRANSITION), t.removeEventListener("transitionend", n));
    };
    t.classList.add(m.TRANSITION), t.addEventListener("transitionend", n);
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
  useHandle(t, n) {
    this.handles[t] = n;
  }
  async callHandle(t) {
    const n = this.handles[t];
    if (typeof n == "function")
      return await n();
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
  cancel(t = !0, n) {
    this.close(t) && this.dispatch(this.createEvent("cancel", n));
  }
  promise() {
    return new Promise((t, n) => {
      this.once("confirm", (s) => t(s.detail)), this.once("cancel", (s) => n(s.detail));
    });
  }
};
a(P, "seed", 1e3);
let G = P;
const Q = 1e3, v = {}, d = { appContext: null, isMounted: !1, zIndex: 1e3, stack: /* @__PURE__ */ new Map(), ids: et([]), topWindow: null, previewState: tt({ mode: o.NONE, width: 0, height: 0 }) };
function Zt(i) {
  var e;
  v.zIndex = (e = i == null ? void 0 : i.zIndex, typeof e != "number" ? Q : Number.isFinite(e) ? Math.floor(e) : Q), v.draggaleHeight = (i == null ? void 0 : i.draggaleHeight) ?? 32, v.size = (i == null ? void 0 : i.size) ?? {}, d.zIndex = v.zIndex;
}
function ce(i, e) {
  v.size == null && (v.size = {}), v.size[i] = e;
}
function le() {
  return yt(it);
}
function Et(i, e) {
  var s;
  const t = i.state, n = ((s = i.component) == null ? void 0 : s.useCssClass()) ?? {};
  switch (e) {
    case E.CLOSE:
      return g("button", { onClick: function() {
        i.cancel();
      }, type: "button", innerHTML: rt, class: n.closeMenu, title: "关闭" }, null);
    case E.PIN:
    case E.UNPIN:
      const r = t.pinned ? "取消固定" : "固定", l = t.pinned ? n.pinMenu : n.menu;
      return g("button", { onClick: function() {
        i.togglePin();
      }, type: "button", innerHTML: lt, class: l, title: r }, null);
    case E.MAXIMIZE:
    case E.RESTORE:
      const p = t.splitMode == o.MAXIMIZE ? dt : at, N = t.splitMode == o.MAXIMIZE ? "还原" : "最大化";
      return g("button", { onClick: function(F) {
        F.preventDefault(), i.toggleMaximize();
      }, type: "button", innerHTML: p, class: n.menu, title: N }, null);
  }
  return null;
}
const Yt = "Ycke6mYQ", jt = "esgrGyhH", Ut = "UkryRM5g", Kt = "U5LZXLJZ", Jt = "_2rffDKab", qt = "vcVMeNrL", Qt = "koc15mYi", $t = "_4VxfFKcG", te = { [o.MAXIMIZE]: jt, [o.LEFT]: Ut, [o.RIGHT]: Kt, [o.TOP_LEFT]: Jt, [o.TOP_RIGHT]: qt, [o.BOTTOM_LEFT]: Qt, [o.BOTTOM_RIGHT]: $t }, $ = (o.BOTTOM_LEFT, o.LEFT, o.BOTTOM_RIGHT, o.RIGHT, o.LEFT, o.TOP_LEFT, o.RIGHT, o.TOP_RIGHT, o.MAXIMIZE, o.TOP_LEFT, o.LEFT, o.TOP_RIGHT, o.RIGHT, o.LEFT, o.BOTTOM_LEFT, o.RIGHT, o.BOTTOM_RIGHT, o.NONE, o.TOP_RIGHT, o.TOP_LEFT, o.TOP_LEFT, o.TOP_RIGHT, o.BOTTOM_RIGHT, o.BOTTOM_LEFT, o.BOTTOM_LEFT, o.BOTTOM_RIGHT, o.LEFT, o.TOP_LEFT, o.TOP_RIGHT, o.TOP_RIGHT, o.TOP_LEFT, o.BOTTOM_LEFT, o.BOTTOM_RIGHT, o.BOTTOM_RIGHT, o.BOTTOM_LEFT, o.RIGHT, B({ name: "WindowManager", setup() {
  const i = d.ids, e = d.previewState;
  function t(r) {
    r.key, r.ctrlKey;
  }
  d.isMounted = !0, window.addEventListener("keydown", t, !0), Pt(() => {
    ft(), window.removeEventListener("keydown", t, !0);
  });
  const n = x(() => {
    const r = [Yt], l = te[e.mode];
    return l != null && r.push(l), r;
  });
  function s() {
    let r = null;
    if (e.mode != o.NONE) {
      const l = { zIndex: function() {
        const p = d.topWindow;
        return p ? p.state.zIndex : 1;
      }() + 1, width: e.width ? e.width - 20 + "px" : void 0 };
      r = g("div", { class: n.value, style: l }, null);
    }
    return g(nt, { to: "body" }, { default: () => {
      return [g(Wt, { name: "fade" }, (l = r, typeof l == "function" || Object.prototype.toString.call(l) === "[object Object]" && !X(l) ? r : { default: () => [r] }))];
      var l;
    } });
  }
  return function() {
    return [...i.value.map((r) => {
      const l = function(N) {
        return d.stack.get(N);
      }(r);
      if (l == null)
        return null;
      const p = ht(l.type);
      return H(p, { abstractWindow: l, key: l.wid });
    }), s()];
  };
} }));
function mt(i) {
  const e = function(n) {
    if (n.length == 1) {
      const s = n[0];
      return s == null ? null : typeof s == "object" ? { ...s } : null;
    }
    if (n.length == 2) {
      const [s, r] = n;
      if (typeof s == "string" && r != null)
        return { title: s, body: r };
    }
    if (n.length == 3) {
      const [s, r, l] = n;
      if (typeof s == "string" && r != null)
        return { ...l, title: s, body: r };
    }
    return null;
  }(i) ?? {}, t = typeof e.size == "string" ? Reflect.get(v.size, e.size) : null;
  return t != null && (e.width = t.width, e.height = t.height, e.top = t.top, e.left = t.left), e;
}
function de(...i) {
  return ee(i);
}
function ue(...i) {
  const e = mt(i) ?? {};
  return e.type = ut.BLANK_WINDOW, vt(e);
}
function ee(...i) {
  const e = mt(i) ?? {};
  return e.type = ut.SIMPLE_WINDOW, vt(e);
}
function vt(i) {
  const e = At(i);
  return e.ready().then(() => {
    i.displayAfterCreate !== !1 && e.show();
  }), e;
}
const he = Object.freeze({ renderMenu: Et });
function ne(i, e) {
  i.component(D.name, D), i.component(W.name, W), i.component($.name, $), Zt(e), window.addEventListener("keydown", pt, !0), function(t) {
    d.appContext = t._context;
  }(i);
}
const ie = "0.2.2", pe = { install: ne, version: ie };
export {
  G as AbstractWindow,
  W as BlankWindow,
  z as RENDER_STATES,
  y as RESIZE_MODE,
  he as Render,
  o as SPLIT_MODES,
  D as SimpleWindow,
  Xt as WindowDragContext,
  $ as WindowManager,
  Gt as cleanup,
  pe as default,
  ne as install,
  ue as useBlankWindow,
  re as useIcons,
  ee as useSimpleWindow,
  de as useWindow,
  le as useWindowApi,
  ae as useWindowManager,
  ce as useWindowSize,
  ie as version,
  pe as xWindow
};
