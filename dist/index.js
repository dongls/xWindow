/*! @dongls/xWindow v0.2.8 https://github.com/dongls/xWindow
Copyright 2023-present dongls
Released under the MIT License */
var zt = Object.defineProperty;
var Lt = (i, e, t) => e in i ? zt(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t;
var o = (i, e, t) => (Lt(i, typeof e != "symbol" ? e + "" : e, t), t);
import { defineComponent as B, computed as N, h as C, shallowRef as Rt, reactive as X, ref as et, provide as xt, createVNode as w, Teleport as yt, isVNode as nt, nextTick as K, render as q, inject as Pt, onBeforeUnmount as Wt, Fragment as Nt } from "vue";
const it = Symbol(), m = Object.freeze({ WINDOW: "x-window", SIMPLE_WINDOW: "x-simple-window", TRANSITION: "x-window-is-transition", MENU: "x-window-is-menu", FOCUSED: "x-window-is-focused", MAXIMIZE: "x-window-is-maximize", HEADER: "x-window-header", BODY: "x-window-body" }), u = Object.freeze({ NONE: 0, TOP: 1, BOTTOM: 2, LEFT: 4, RIGHT: 8 }), I = Object.freeze({ TOP: u.TOP, BOTTOM: u.BOTTOM, LEFT: u.LEFT, RIGHT: u.RIGHT, TOP_LEFT: u.TOP | u.LEFT, TOP_RIGHT: u.TOP | u.RIGHT, BOTTOM_LEFT: u.BOTTOM | u.LEFT, BOTTOM_RIGHT: u.BOTTOM | u.RIGHT }), r = Object.freeze({ NONE: u.NONE, MAXIMIZE: u.TOP, LEFT: u.LEFT, RIGHT: u.RIGHT, TOP_LEFT: u.TOP | u.LEFT, TOP_RIGHT: u.TOP | u.RIGHT, BOTTOM_LEFT: u.BOTTOM | u.LEFT, BOTTOM_RIGHT: u.BOTTOM | u.RIGHT }), x = Object.freeze({ DISABLED: 0, RESIZE: 1, RESIZE_ONLY: 2 }), L = Object.freeze({ INIT: 0, MOUNTED: 1, UNMOUNTED: 2 }), V = Object.freeze({ SIMPLE_WINDOW: "SimpleWindow", BLANK_WINDOW: "BlankWindow" }), E = Object.freeze({ CLOSE: 0, MAXIMIZE: 1, RESTORE: 2, PIN: 3, UNPIN: 4 });
class Z {
  constructor(e, t, n) {
    o(this, "type");
    o(this, "stopped", !1);
    o(this, "defaultPrevented", !1);
    o(this, "instance");
    o(this, "detail");
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
    o(this, "ALL_EVENTS", /* @__PURE__ */ new Map());
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
    const c = s.indexOf(t);
    return c < 0 || (n ? s.splice(c, 1, S.NOOP) : s.splice(c, 1)), this;
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
function Q(i) {
  return i == null || typeof i != "string" || i.length == 0;
}
function Ct(i) {
  i.stopPropagation();
}
const St = { top: "offsetTop", left: "offsetLeft", width: "offsetWidth", height: "offsetHeight" };
class _t {
  constructor(e) {
    o(this, "init", !1);
    o(this, "defaultPrevented", !1);
    o(this, "originalEvent");
    o(this, "target");
    o(this, "direction");
    this.originalEvent = e, this.target = e.target, this.direction = Reflect.get(this.target, A.PROP);
  }
  createEvent(e, t) {
    return new Z(e, t, this);
  }
}
class A {
  constructor(e) {
    o(this, "context");
    o(this, "window");
    o(this, "onResizing");
    o(this, "onResizeend");
    this.window = e;
  }
  resizestart(e) {
    e.stopPropagation(), e.preventDefault();
    const t = new _t(e);
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
    for (const h in n) {
      const g = Math.round(n[h]);
      Reflect.set(s.style, h, g + "px");
    }
    t.originalEvent = e;
    const c = this.context.createEvent("resizing", this.window);
    this.window.dispatch(c);
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
    const t = this.context, n = this.window.options, s = typeof n.minWidth == "number" && n.minWidth >= 0 ? n.minWidth : 360, c = typeof n.minHeight == "number" && n.minHeight >= 0 ? n.minHeight : 32, h = this.window.getElement().getBoundingClientRect(), g = {};
    return t.direction & u.TOP && (g.height = R(h.bottom - R(e.clientY, 0), c), g.top = h.bottom - g.height), t.direction & u.BOTTOM && (g.height = R(e.clientY - h.top, c)), t.direction & u.LEFT && (g.width = R(h.right - R(e.clientX, 0), s), g.left = h.right - g.width), t.direction & u.RIGHT && (g.width = R(e.clientX - h.left, s)), g;
  }
  patchWindowState(e) {
    const t = this.window.state;
    for (const n in e) {
      const s = Math.round(e[n]), c = St[n];
      c != null && Reflect.set(t, c, s);
    }
  }
}
o(A, "PROP", "__xwindow_resize_prop__");
const p = { window: "_1T2rhwiL", dragging: "yi9w1sZD", resizing: "Ja2o9U31", maximize: "_1eMSsKoB", focused: "_3czvPpS2", header: "GiVk7T8N", menu: "VuG4WNig x-window-is-menu", logo: "yBPezU8e", main: "xbuRK23n", init: "_9t1NJBZM", title: "shyxrRzw", menus: "nkEGqTFw", body: "pk12TusX", footer: "noixF94i", closeMenu: "ifXDegN1 VuG4WNig x-window-is-menu", pinMenu: "X5A6roxN VuG4WNig x-window-is-menu", resizeBar: "PPmfTMRL", resizeTop: "v8UGXgKi PPmfTMRL", resizeBottom: "_74VJ9GNt PPmfTMRL", resizeRight: "gg9Mcwey PPmfTMRL", resizeLeft: "Tw7sCaLt PPmfTMRL", resizeTopLeft: "CPuApFyD PPmfTMRL", resizeBottomLeft: "VBRi4FWg PPmfTMRL", resizeTopRight: "gCRpuZdB PPmfTMRL", resizeBottomRight: "iRYpNoUT PPmfTMRL", mask: "xTcKGSVA", simpleWindow: "Mh7BVc1o" }, st = B({ name: "WindowBody", props: { wid: String, body: { type: [Object, Function, String, Number], default: null }, abstractWindow: { type: Object, required: !0 } }, setup: (i) => function() {
  const e = typeof i.body == "function" ? i.body(i.abstractWindow) : i.body;
  return e == null && console.warn("[xWindow] 请指定窗体内容:", i.abstractWindow.options.title), e;
} }), Dt = Math.floor(Number.MAX_SAFE_INTEGER / 10) - 1e4, Ht = [[p.resizeTop, I.TOP], [p.resizeBottom, I.BOTTOM], [p.resizeLeft, I.LEFT], [p.resizeRight, I.RIGHT], [p.resizeTopLeft, I.TOP_LEFT], [p.resizeTopRight, I.TOP_RIGHT], [p.resizeBottomLeft, I.BOTTOM_LEFT], [p.resizeBottomRight, I.BOTTOM_RIGHT]], _ = B({ name: "BlankWindow", props: { abstractWindow: { type: Object, required: !0 } }, setup(i, { slots: e }) {
  const t = Rt(), n = X({ visible: !1, offsetWidth: 0, offsetHeight: 0, offsetTop: 0, offsetLeft: 0, focused: !1, pinned: !1, zIndex: 0, splitMode: r.NONE }), s = et(L.INIT), c = N(() => {
    const a = i.abstractWindow.options;
    return typeof a.zIndex == "number" && a.zIndex > 0;
  }), h = N(() => {
    const a = i.abstractWindow.options;
    return c.value ? a.zIndex : (n.pinned ? Dt : 0) + n.zIndex;
  }), g = function(a, d, f, O) {
    return N(() => {
      const T = a.options;
      if (d.value == L.INIT)
        return { width: T.width, height: T.height, left: T.left, top: T.top };
      const b = T.mask ? null : O.value;
      return { top: f.offsetTop + "px", left: f.offsetLeft + "px", width: f.offsetWidth + "px", height: d.value == L.INIT ? void 0 : f.offsetHeight + "px", zIndex: b };
    });
  }(i.abstractWindow, s, n, h), F = N(() => {
    const a = [m.WINDOW, p.window], d = i.abstractWindow;
    var f;
    return d.type === V.SIMPLE_WINDOW && a.push(m.SIMPLE_WINDOW), s.value == L.INIT && a.push(p.init), n.splitMode == r.MAXIMIZE && a.push(p.maximize, m.MAXIMIZE), n.focused && a.push(p.focused, m.FOCUSED), (f = d.options.className) != null && typeof f == "string" && f.length != 0 && a.push(d.options.className), a;
  }), k = N(() => {
    const a = [], d = i.abstractWindow.options;
    return d.pinnable && d.mask !== !0 && c.value !== !0 && a.push(n.pinned ? E.PIN : E.UNPIN), d.resizeMode == x.RESIZE && a.push(n.splitMode == r.MAXIMIZE ? E.RESTORE : E.MAXIMIZE), d.closeable && a.push(E.CLOSE), a;
  }), j = { getElement: U, getRenderState: function() {
    return s.value;
  }, useCssClass: function() {
    return p;
  }, useMenus: function() {
    return k;
  } };
  function U() {
    return t.value;
  }
  async function J(a) {
    a == null || a.preventDefault(), i.abstractWindow.toggleMaximize();
  }
  async function Ot(a) {
    await K();
    const d = i.abstractWindow, f = d.options, O = a.el, T = O.getBoundingClientRect();
    if (s.value == L.INIT) {
      let b = Math.round(T.left), P = Math.round(T.top);
      Q(f.left) && (b = Math.floor((window.innerWidth - T.width) / 2)), Q(f.top) && (P = Math.floor((window.innerHeight - T.height) / 2)), n.offsetWidth = T.width, n.offsetHeight = T.height, n.offsetLeft = b, n.offsetTop = P, f.maximize && J(), s.value = L.MOUNTED, JSON.parse(JSON.stringify(n)), K(() => {
        const M = d.createEvent("show");
        d.dispatch(M), function(W) {
          const z = Array.from(W.querySelectorAll("[autofocus]"));
          for (const G of z)
            if (G instanceof HTMLElement && G.autofocus)
              return G.focus();
        }(O);
      });
    }
    d.focus();
  }
  function Mt(a) {
    const d = i.abstractWindow;
    d.focus(), d.allowDrag && !d.isMaximize && d.dragstart(a);
  }
  function It(a) {
    const d = U();
    if (d == null)
      return;
    const f = d.getBoundingClientRect();
    a.clientY - f.top > i.abstractWindow.allowDragArea || J(a);
  }
  function bt() {
    const a = i.abstractWindow;
    return w(st, { body: a.body, abstractWindow: i.abstractWindow, key: a.wid }, null);
  }
  return xt(it, i.abstractWindow), function() {
    const a = i.abstractWindow;
    var d, f;
    a.component = j, a.state = n, d = a.id, f = a, l.stack.set(d, f);
    const O = a.createEvent("created");
    a.dispatch(O);
  }(), function() {
    const a = i.abstractWindow, d = a.options;
    if (n.visible !== !0)
      return null;
    const f = w("div", { class: p.main, onDblclick: It }, [typeof e.default == "function" ? e.default(j) : bt()]), O = { ref: t, id: a.wid, onVnodeMounted: Ot, onPointerdown: Mt, class: F.value, style: g.value }, T = (b = d.resizeMode, P = a.resizestart, b == x.DISABLED ? null : Ht.map((z) => C("div", { ["." + A.PROP]: z[1], className: z[0], onPointerdown: P })));
    var b, P;
    let M = C("div", O, [f, T]);
    if (d.mask === !0) {
      const z = { zIndex: h.value };
      M = w("div", { class: p.mask, style: z }, [M]);
    }
    return d.teleport === !1 ? M : w(yt, { to: d.teleport }, typeof (W = M) == "function" || Object.prototype.toString.call(W) === "[object Object]" && !nt(W) ? M : { default: () => [M] });
    var W;
  };
} }), ot = '<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M590.265 511.987l305.521-305.468c21.617-21.589 21.617-56.636.027-78.252-21.616-21.617-56.663-21.617-78.279 0L512.012 433.735 206.544 128.213c-21.617-21.617-56.635-21.617-78.252 0-21.616 21.589-21.616 56.635-.027 78.252L433.76 511.987 128.211 817.482c-21.617 21.59-21.617 56.635 0 78.251 10.808 10.81 24.967 16.213 39.125 16.213 14.159 0 28.318-5.403 39.126-16.213l305.522-305.468L817.48 895.788C828.289 906.597 842.447 912 856.606 912s28.317-5.403 39.125-16.212c21.618-21.59 21.618-56.636.028-78.252L590.265 511.987z"/></svg>', rt = '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5228" width="64" height="64"><path d="M97.74775349 97.74775349h828.50449302v828.50449302H97.74775349V97.74775349z m103.56306133 103.56306133v621.37837036h621.37837036V201.31081482H201.31081482z" fill="currentColor"></path></svg>', at = '<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M38.794 124.791v778.495h946.412V124.791H38.794zm896.678 728.033H89.292v-460.9h846.18v460.9z"/></svg>', ct = '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M738.793 681.382v-48.331l88.242-88.243a298.676 298.676 0 00156.712-83.482 38.836 38.836 0 000-54.923l-366.15-366.15a38.836 38.836 0 00-54.923 0 298.52 298.52 0 00-83.519 156.749l-88.169 88.169h-48.332a411.145 411.145 0 00-292.59 121.232c-15.16 15.159-15.16 39.764 0 54.923L278.906 690.17 86.642 882.436a38.836 38.836 0 1054.922 54.922l192.23-192.229 228.844 228.845a38.836 38.836 0 0054.922 0 411.042 411.042 0 00121.233-292.592zM134.02 435.44a333.473 333.473 0 01208.56-72.571l64.406.037a38.836 38.836 0 0027.461-11.351L544.292 241.71a38.68 38.68 0 0011.351-27.462 180.096 180.096 0 0136.798-89.01L898.8 431.593a180.925 180.925 0 01-89.12 36.835 38.836 38.836 0 00-27.462 11.35L672.373 589.626c-7.287 7.286-11.387 17.173-11.35 27.461l.036 64.406a333.318 333.318 0 01-72.608 208.596L134.021 435.44z"/></svg>', lt = '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M845.40952426 212.52063539H65.21904746v702.17142826h780.1904768V212.52063539z m-702.17142933 624.1523808V290.53968285h624.1523808v546.13333334H143.23809493z" fill="currentColor"></path><path d="M981.53650809 76.3936505H201.34603129v78.01904746h702.17142933v624.15238187h78.01904747V76.3936505z" fill="currentColor"></path></svg>';
function Qt() {
  return { IconClose: ot, IconMax: rt, IconPin: ct, IconWindow: at, IconRestore: lt };
}
function Bt(i) {
  const e = i.options.icon;
  return typeof e == "string" ? w("i", { class: [p.logo, "icon", e] }, null) : nt(e) ? e : typeof e == "function" ? e(i) : w("i", { class: p.logo, innerHTML: at }, null);
}
const dt = B({ name: "SimpleWindow", props: { abstractWindow: { type: Object, required: !0 } }, setup(i) {
  const e = i.abstractWindow;
  function t(n, s) {
    s.stopPropagation(), typeof n.handler == "function" && n.handler(e);
  }
  return function() {
    return w(_, { abstractWindow: e }, function(n) {
      const s = n.useMenus(), c = e.options.menus ?? [];
      return w("div", { class: p.simpleWindow }, [w("div", { class: [p.header, m.HEADER] }, [Bt(e), w("div", { class: p.title }, [e.options.title ?? "新窗口"]), w("div", { class: p.menus, onMousedown: Ct }, [c.map((h) => function(g) {
        return w("button", { type: "button", class: "x-window-text-menu", onClick: t.bind(null, g) }, [g.label]);
      }(h)), s.value.map((h) => Et(e, h))])]), w("div", { class: [p.body, m.BODY] }, [w(st, { body: e.body, abstractWindow: i.abstractWindow, key: e.wid }, null)])]);
    });
  };
} }), ut = Object.freeze({ SIMPLE_WINDOW: dt.name, BLANK_WINDOW: _.name });
function ht(i) {
  return i == _.name ? _ : dt;
}
function pt(i) {
  if (i.key == "Escape")
    return Tt({ pressEsc: !0, forced: !1 });
}
function ft() {
  l.isMounted = !1, l.topWindow = null, l.ids.value = [], l.stack.clear();
}
function gt() {
  return l.zIndex;
}
function wt() {
  return l.zIndex += 1;
}
function At() {
  return l.topWindow;
}
function Tt(i) {
  if (l.stack.size == 0 || l.topWindow == null)
    return;
  const e = l.topWindow;
  (i == null ? void 0 : i.pressEsc) === !0 && e.options.closeOnPressEsc !== !0 || l.topWindow.cancel(i == null ? void 0 : i.forced);
}
function Ft(i) {
  const e = i.type === V.SIMPLE_WINDOW ? H.create(i) : D.create(i);
  return l.isMounted ? (l.ids.value.push(e.id), l.stack.set(e.id, e), e) : (function(t) {
    const n = document.createDocumentFragment(), s = ht(t.type), c = C(s, { abstractWindow: t });
    c.appContext = l.appContext, q(c, n), document.body.appendChild(n), t.on("beforeDestroy", () => {
      q(null, n);
    });
  }(e), e);
}
function Y(i) {
  if (l.topWindow = i, i != null) {
    for (const e of l.stack.values()) {
      const t = e.state;
      t != null && (t.focused = e === i);
    }
    i.state != null && i.state.zIndex < gt() && (i.state.zIndex = wt());
  }
}
function kt() {
  Y(function() {
    if (l.stack.size == 0)
      return;
    let i;
    for (const e of l.stack.values())
      e.state != null && e.state.visible === !0 && (i != null ? i.state.zIndex < e.state.zIndex && (i = e) : i = e);
    return i;
  }());
}
function Gt() {
  return l.stack.size;
}
function Xt() {
  l.appContext = null, ft(), window.removeEventListener("keydown", pt, !0);
}
function $t() {
  return { closeTopWindow: Tt, getTopWindow: At, getTopZIndex: wt, getWindowCount: Gt, getZIndex: gt, setFocusedWindow: Y, cleanup: Xt };
}
class Vt {
  constructor(e, t) {
    o(this, "moved", !1);
    o(this, "originalEvent");
    o(this, "target");
    o(this, "deltaX");
    o(this, "deltaY");
    o(this, "initialX");
    o(this, "initialY");
    o(this, "left", 0);
    o(this, "top", 0);
    o(this, "prevClientX");
    o(this, "prevClientY");
    const n = e.getBoundingClientRect();
    this.originalEvent = t, this.target = e, this.deltaX = Math.round(n.left - t.clientX), this.deltaY = Math.round(n.top - t.clientY), this.initialX = t.clientX, this.initialY = t.clientY, this.prevClientX = t.clientX, this.prevClientY = t.clientY;
  }
  preventDragEvent(e) {
    return !this.moved && !(Math.abs(e.clientX - this.initialX) > 4) && !(Math.abs(e.clientY - this.initialY) > 4);
  }
  createEvent(e, t) {
    return new Z(e, t, this);
  }
}
class Zt {
  constructor(e) {
    o(this, "window");
    o(this, "context");
    o(this, "onDragging");
    o(this, "onDragend");
    this.window = e;
  }
  static isConflict(e, t) {
    const n = e.getBoundingClientRect(), s = t.getBoundingClientRect();
    return !(n.top > s.bottom || n.right < s.left || n.bottom < s.top || n.left > s.right);
  }
  static findElementsFromPoint(e, t, n, s) {
    return typeof document.elementsFromPoint != "function" ? [] : document.elementsFromPoint(e, t).filter((c) => !(s != null && !s.contains(c)) && typeof n == "string" && c.matches(n));
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
    e.clientY - s.top > this.window.allowDragArea || (e.preventDefault(), e.stopPropagation(), this.context = new Vt(n, e), this.context.left = this.window.state.offsetLeft, this.context.top = this.window.state.offsetTop, this.onDragging = this.dragging.bind(this), this.onDragend = this.dragend.bind(this), window.addEventListener("pointermove", this.onDragging), window.addEventListener("pointerup", this.onDragend));
  }
  dragging(e) {
    var c;
    if (this.context == null)
      return;
    const t = this.context;
    if (!t.moved) {
      if (this.window.dispatch(this.context.createEvent("dragStart", this.window)).defaultPrevented)
        return this.cleanup();
      const h = (c = this.window.component) == null ? void 0 : c.useCssClass();
      h != null && h.dragging && t.target.classList.add(h.dragging), t.target.setPointerCapture(e.pointerId), t.moved = !0;
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
const y = class y extends S {
  constructor(t) {
    super();
    o(this, "CREATE_RESOLVE");
    o(this, "CREATE_REJECT");
    o(this, "id");
    o(this, "type");
    o(this, "options");
    o(this, "body");
    o(this, "state");
    o(this, "created", !1);
    o(this, "destroyed", !1);
    o(this, "component");
    o(this, "draggable");
    o(this, "resizable");
    o(this, "handles", {});
    o(this, "dragstart");
    o(this, "resizestart");
    const { body: n, type: s, ...c } = t;
    this.type = s ?? V.SIMPLE_WINDOW, this.options = X(this.createOptions(c)), this.body = n, Reflect.defineProperty(this, "id", { enumerable: !0, configurable: !1, writable: !1, value: y.seed++ }), this.initDraggable(), this.initResizable(), this.initHooks();
  }
  static create(t) {
    return t instanceof y ? t : new y(t);
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
    return ((t = this.state) == null ? void 0 : t.splitMode) === r.MAXIMIZE;
  }
  createOptions(t) {
    return { ...t, title: t.title ?? "未命名的窗口", icon: t.icon, className: t.className, width: t.width ?? "640px", minWidth: t.minWidth ?? 360, maxWidth: t.maxWidth, height: t.height, minHeight: t.minHeight ?? 32, maxHeight: t.maxHeight, top: t.top, left: t.left, zIndex: t.zIndex, maximize: t.maximize === !0, teleport: t.teleport ?? "body", draggable: t.draggable == null || t.draggable, resizeMode: t.resizeMode ?? x.RESIZE, closeable: t.closeable !== !1, mask: t.mask === !0, pinnable: t.pinnable !== !1, displayAfterCreate: t.displayAfterCreate !== !1, destroyAfterClose: t.destroyAfterClose !== !1, closeOnPressEsc: t.closeOnPressEsc !== !1 };
  }
  createEvent(t, n) {
    return new Z(t, this, n);
  }
  initDraggable() {
    this.draggable = new Zt(this), this.dragstart = this.draggable.dragstart.bind(this.draggable);
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
    return (t === !0 || !n.defaultPrevented) && (this.state.visible = !1, this.dispatch(this.createEvent("close")), this.state.focused && setTimeout(kt), this.destroyed || this.options.destroyAfterClose === !1 || this.destroy(), !0);
  }
  cleanup() {
    super.cleanup(), this.dragstart = void 0, this.resizestart = void 0, this.component = void 0, this.state = void 0, this.handles = {};
  }
  destroy() {
    var t;
    this.destroyed = !0, ((t = this.state) == null ? void 0 : t.visible) === !0 && this.close(), this.dispatch(this.createEvent("beforeDestroy")), function(n) {
      if (!l.stack.has(n) || (l.stack.delete(n), !l.isMounted))
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
    this.state == null || this.state.focused || (t = this.id, Y(l.stack.get(t)));
  }
  startTransition() {
    const t = document.documentElement, n = function(s) {
      s.target.matches("." + m.WINDOW) && (t.classList.remove(m.TRANSITION), t.removeEventListener("transitionend", n));
    };
    t.classList.add(m.TRANSITION), t.addEventListener("transitionend", n);
  }
  requestMaximize() {
    const t = this.state;
    t != null && this.options.resizeMode === x.RESIZE && (t.splitMode = r.MAXIMIZE, this.startTransition(), this.dispatch(this.createEvent("maximizeChange")));
  }
  exitMaximize() {
    const t = this.state;
    t != null && this.options.resizeMode === x.RESIZE && (t.splitMode = r.NONE, this.startTransition(), this.dispatch(this.createEvent("maximizeChange")));
  }
  toggleMaximize() {
    const t = this.state;
    t != null && this.options.resizeMode === x.RESIZE && (t.splitMode === r.MAXIMIZE ? this.exitMaximize() : this.requestMaximize());
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
  dispatchConfirm() {
    return this.callHandle("confirm").then((t) => this.confirm(t));
  }
  confirm(t) {
    this.dispatch(this.createEvent("confirm", t)), this.close(!0);
  }
  dispatchCancel() {
    return this.callHandle("cancel").then((t) => this.cancel(!0, t));
  }
  cancel(t = !0, n) {
    this.close(t) && this.dispatch(this.createEvent("cancel", n));
  }
  promisify() {
    return new Promise((t, n) => {
      this.once("confirm", (s) => t(s.detail)), this.once("cancel", (s) => n(s.detail));
    });
  }
};
o(y, "seed", 1e3);
let D = y;
class H extends D {
  static create(e) {
    return e instanceof H ? e : new H(e);
  }
  constructor(e) {
    super(e);
  }
  updateMenus(e) {
    this.options.menus = e;
  }
}
const $ = 1e3, v = {}, l = { appContext: null, isMounted: !1, zIndex: 1e3, stack: /* @__PURE__ */ new Map(), ids: et([]), topWindow: null, previewState: X({ mode: r.NONE, width: 0, height: 0 }) };
function Yt(i) {
  var e;
  v.zIndex = (e = i == null ? void 0 : i.zIndex, typeof e != "number" ? $ : Number.isFinite(e) ? Math.floor(e) : $), v.draggaleHeight = (i == null ? void 0 : i.draggaleHeight) ?? 32, v.size = (i == null ? void 0 : i.size) ?? {}, l.zIndex = v.zIndex;
}
function te(i, e) {
  v.size == null && (v.size = {}), v.size[i] = e;
}
function ee() {
  return Pt(it);
}
function Et(i, e) {
  var s;
  const t = i.state, n = ((s = i.component) == null ? void 0 : s.useCssClass()) ?? {};
  switch (e) {
    case E.CLOSE:
      return w("button", { onClick: function() {
        i.cancel();
      }, type: "button", innerHTML: ot, class: n.closeMenu, title: "关闭" }, null);
    case E.PIN:
    case E.UNPIN:
      const c = t.pinned ? "取消固定" : "固定", h = t.pinned ? n.pinMenu : n.menu;
      return w("button", { onClick: function() {
        i.togglePin();
      }, type: "button", innerHTML: ct, class: h, title: c }, null);
    case E.MAXIMIZE:
    case E.RESTORE:
      const g = t.splitMode == r.MAXIMIZE ? lt : rt, F = t.splitMode == r.MAXIMIZE ? "还原" : "最大化";
      return w("button", { onClick: function(k) {
        k.preventDefault(), i.toggleMaximize();
      }, type: "button", innerHTML: g, class: n.menu, title: F }, null);
  }
  return null;
}
r.BOTTOM_LEFT, r.LEFT, r.BOTTOM_RIGHT, r.RIGHT, r.LEFT, r.TOP_LEFT, r.RIGHT, r.TOP_RIGHT, r.MAXIMIZE, r.TOP_LEFT, r.LEFT, r.TOP_RIGHT, r.RIGHT, r.LEFT, r.BOTTOM_LEFT, r.RIGHT, r.BOTTOM_RIGHT, r.NONE, r.TOP_RIGHT, r.TOP_LEFT, r.TOP_LEFT, r.TOP_RIGHT, r.BOTTOM_RIGHT, r.BOTTOM_LEFT, r.BOTTOM_LEFT, r.BOTTOM_RIGHT, r.LEFT, r.TOP_LEFT, r.TOP_RIGHT, r.TOP_RIGHT, r.TOP_LEFT, r.BOTTOM_LEFT, r.BOTTOM_RIGHT, r.BOTTOM_RIGHT, r.BOTTOM_LEFT, r.RIGHT;
const tt = B({ name: "WindowManager", setup() {
  const i = l.ids;
  function e(t) {
    t.key, t.ctrlKey;
  }
  return l.isMounted = !0, window.addEventListener("keydown", e, !0), Wt(() => {
    ft(), window.removeEventListener("keydown", e, !0);
  }), function() {
    const t = i.value.map((n) => {
      const s = function(h) {
        return l.stack.get(h);
      }(n);
      if (s == null)
        return null;
      const c = ht(s.type);
      return C(c, { abstractWindow: s, key: s.wid });
    });
    return w(Nt, null, [t]);
  };
} });
function mt(i) {
  const e = function(n) {
    if (n.length == 1) {
      const s = n[0];
      return s == null ? null : typeof s == "object" ? { ...s } : null;
    }
    if (n.length == 2) {
      const [s, c] = n;
      if (typeof s == "string" && c != null)
        return { title: s, body: c };
    }
    if (n.length == 3) {
      const [s, c, h] = n;
      if (typeof s == "string" && c != null)
        return { ...h, title: s, body: c };
    }
    return null;
  }(i) ?? {}, t = typeof e.size == "string" ? Reflect.get(v.size, e.size) : null;
  return t != null && (e.width = t.width, e.height = t.height, e.top = t.top, e.left = t.left), e;
}
function ne(...i) {
  return jt(i);
}
function ie(...i) {
  const e = mt(i) ?? {};
  return e.type = ut.BLANK_WINDOW, vt(e);
}
function jt(...i) {
  const e = mt(i) ?? {};
  return e.type = ut.SIMPLE_WINDOW, vt(e);
}
function vt(i) {
  const e = Ft(i);
  return e.ready().then(() => {
    i.displayAfterCreate !== !1 && e.show();
  }), e;
}
const se = Object.freeze({ renderMenu: Et });
function Ut(i, e) {
  i.component(tt.name, tt), Yt(e), window.addEventListener("keydown", pt, !0), function(t) {
    l.appContext = t._context;
  }(i);
}
const Jt = "0.2.8", oe = { install: Ut, version: Jt };
export {
  D as AbstractWindow,
  L as RENDER_STATES,
  x as RESIZE_MODE,
  se as Render,
  r as SPLIT_MODES,
  H as SimpleWindow,
  Vt as WindowDragContext,
  tt as WindowManager,
  Xt as cleanup,
  oe as default,
  Ut as install,
  ie as useBlankWindow,
  Qt as useIcons,
  jt as useSimpleWindow,
  ne as useWindow,
  ee as useWindowApi,
  $t as useWindowManager,
  te as useWindowSize,
  Jt as version,
  oe as xWindow
};
