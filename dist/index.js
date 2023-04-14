/*! @dongls/xWindow v0.0.5 https://github.com/dongls/xWindow
Copyright 2023-present dongls
Released under the MIT License */
var yt = Object.defineProperty;
var Ft = (t, n, e) => n in t ? yt(t, n, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[n] = e;
var z = (t, n, e) => (Ft(t, typeof n != "symbol" ? n + "" : n, e), e);
import { shallowRef as Ht, reactive as U, inject as lt, getCurrentInstance as Y, h as Z, createVNode as p, defineComponent as y, ref as F, computed as N, watch as Pt, onBeforeUnmount as rt, onUnmounted as Gt, provide as xt, Teleport as ut, isVNode as G, nextTick as j, mergeProps as kt, Transition as Ct } from "vue";
const Ut = "https://github.com/dongls/xWindow", jt = "0.0.5", Dt = "onUpdate:visible", Xt = "onBeforeUnmount", Yt = "onUnmount", V = Symbol(), B = Object.freeze({
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
  mask: {
    type: Boolean,
    default: !1
  }
}, c = Object.freeze({
  NONE: 0,
  TOP: 1 << 0,
  BOTTOM: 1 << 1,
  LEFT: 1 << 2,
  RIGHT: 1 << 3
}), L = Object.freeze({
  TOP: c.TOP,
  BOTTOM: c.BOTTOM,
  LEFT: c.LEFT,
  RIGHT: c.RIGHT,
  TOP_LEFT: c.TOP | c.LEFT,
  TOP_RIGHT: c.TOP | c.RIGHT,
  BOTTOM_LEFT: c.BOTTOM | c.LEFT,
  BOTTOM_RIGHT: c.BOTTOM | c.RIGHT
}), o = Object.freeze({
  NONE: c.NONE,
  FULLSCREEN: c.TOP,
  LEFT: c.LEFT,
  RIGHT: c.RIGHT,
  TOP_LEFT: c.TOP | c.LEFT,
  TOP_RIGHT: c.TOP | c.RIGHT,
  BOTTOM_LEFT: c.BOTTOM | c.LEFT,
  BOTTOM_RIGHT: c.BOTTOM | c.RIGHT
});
let Zt = 1e3;
class E {
  /** 统一使用`UID.create`方法创建 */
  constructor() {
    z(this, "value");
    this.value = Zt++;
  }
  get wid() {
    return "window--" + this.value;
  }
  static create(n) {
    return n instanceof E ? n : Object.freeze(new E());
  }
}
class H {
  constructor(n) {
    z(this, "uid");
    z(this, "type");
    z(this, "visible");
    z(this, "others");
    z(this, "body");
    const { visible: e, body: a, type: d, ...r } = n;
    this.uid = E.create(), this.type = d, this.visible = e, this.body = a, this.others = r;
  }
  static create(n) {
    return n instanceof H ? n : new H(n);
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
function Vt(t) {
  const { clientX: n, clientY: e } = t, { innerWidth: a, innerHeight: d } = window;
  let r = c.NONE;
  return e <= 5 && (r |= c.TOP), e >= d - 5 && (r |= c.BOTTOM), n <= 5 && (r |= c.LEFT), n >= a - 5 && (r |= c.RIGHT), r;
}
const u = {
  isMounted: !1,
  zIndex: 1e3,
  stack: /* @__PURE__ */ new Map(),
  ghost: Ht([]),
  options: /* @__PURE__ */ new Map(),
  topWindow: null,
  previewState: U({
    mode: o.NONE,
    width: null,
    height: null
  })
};
function $t() {
  u.isMounted = !0;
}
function Kt() {
  u.isMounted = !1, u.topWindow = null, u.ghost.value = [], u.stack.clear(), u.options.clear();
}
function qt() {
  return u.isMounted;
}
function dt() {
  return u.zIndex;
}
function ct() {
  return u.zIndex += 2;
}
function Jt() {
  const t = u.topWindow;
  return t ? t.zIndex : 1;
}
function Qt(t) {
  typeof t == "number" && Number.isFinite(t) && (u.zIndex = Math.floor(t));
}
function At() {
  return u.topWindow;
}
function te(t, n) {
  u.stack.set(t, n);
}
function at(t) {
  u.stack.delete(t), u.options.delete(t);
  const n = u.ghost.value.indexOf(t);
  if (n >= 0) {
    const e = u.ghost.value;
    e.splice(n, 1), u.ghost.value = e.slice();
  }
}
function ft() {
  u.stack.size == 0 || u.topWindow == null || u.topWindow.close();
}
function ee(t) {
  return u.options.get(t);
}
function ne(t) {
  const n = u.ghost.value;
  return n.push(t.uid), u.ghost.value = n.slice(), u.options.set(t.uid, t), t.uid;
}
function oe(t) {
  return u.stack.get(t);
}
function Tt() {
  return u.ghost;
}
function wt(t) {
  if (u.topWindow = t, t != null) {
    for (const n of u.stack.values()) {
      const e = n.windowState;
      e.focused = n === t;
    }
    t.zIndex < dt() && (t.zIndex = ct());
  }
}
function ht(t) {
  const n = u.stack.get(t);
  wt(n);
}
function gt() {
  const t = ie();
  wt(t);
}
function ie() {
  return u.stack.size == 0 ? null : Array.from(u.stack.values()).filter((n) => n.visible).sort((n, e) => e.zIndex - n.zIndex)[0];
}
function se(t) {
  let n = null;
  const e = Vt(t);
  if (u.previewState.mode = e, (e == o.LEFT || e == o.RIGHT) && (n = D(e == o.LEFT ? o.RIGHT : o.LEFT), n)) {
    const a = window.innerWidth - n.getWindowEl().offsetWidth;
    u.previewState.width = a;
  }
  return {
    mode: u.previewState.mode,
    width: u.previewState.width,
    relatedWindow: n
  };
}
function le() {
  return u.previewState.mode = o.NONE, u.previewState.height = null, u.previewState.width = null, o.NONE;
}
function re() {
  return u.previewState;
}
function D(t) {
  let n = null;
  for (const e of u.stack.values())
    e.splitState.mode === t && (n == null || e.zIndex > n.zIndex) && (n = e);
  return n;
}
function cn() {
  return {
    closeTopWindow: ft,
    getTopZIndex: ct,
    getWindowApi: oe,
    getZIndex: dt,
    setFocusedWindow: ht
  };
}
function ue(t) {
  Qt(t == null ? void 0 : t.zIndex);
}
function an() {
  return lt(V);
}
const de = "_window_o9g8u_7", ce = "_dragging_o9g8u_17", ae = "_resizing_o9g8u_17", fe = "_fullscreen_o9g8u_21", Te = "_focused_o9g8u_31", we = "_header_o9g8u_34", he = "_main_o9g8u_38", ge = "_init_o9g8u_45", pe = "_title_o9g8u_63", _e = "_menus_o9g8u_73", Oe = "_body_o9g8u_79", me = "_footer_o9g8u_84", Ee = "_menu_o9g8u_73", Le = "_closeMenu_o9g8u_135 _menu_o9g8u_73", Se = "_pinMenu_o9g8u_146 _menu_o9g8u_73", ve = "_logo_o9g8u_153", Ie = "_resize_o9g8u_165", Re = "_resizeBar_o9g8u_169", Me = "_resizeTop_o9g8u_174 _resizeBar_o9g8u_169", be = "_resizeBottom_o9g8u_175 _resizeBar_o9g8u_169", ze = "_resizeRight_o9g8u_191 _resizeBar_o9g8u_169", Be = "_resizeLeft_o9g8u_192 _resizeBar_o9g8u_169", We = "_resizeTopLeft_o9g8u_208 _resizeBar_o9g8u_169", Ne = "_resizeBottomLeft_o9g8u_209 _resizeBar_o9g8u_169", ye = "_resizeTopRight_o9g8u_210 _resizeBar_o9g8u_169", Fe = "_resizeBottomRight_o9g8u_211 _resizeBar_o9g8u_169", He = "_mask_o9g8u_241", T = {
  window: de,
  dragging: ce,
  resizing: ae,
  fullscreen: fe,
  focused: Te,
  header: we,
  main: he,
  init: ge,
  title: pe,
  menus: _e,
  body: Oe,
  footer: me,
  menu: Ee,
  closeMenu: Le,
  pinMenu: Se,
  logo: ve,
  resize: Ie,
  resizeBar: Re,
  resizeTop: Me,
  resizeBottom: be,
  resizeRight: ze,
  resizeLeft: Be,
  resizeTopLeft: We,
  resizeBottomLeft: Ne,
  resizeTopRight: ye,
  resizeBottomRight: Fe,
  mask: He
}, pt = '<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M590.265 511.987l305.521-305.468c21.617-21.589 21.617-56.636.027-78.252-21.616-21.617-56.663-21.617-78.279 0L512.012 433.735 206.544 128.213c-21.617-21.617-56.635-21.617-78.252 0-21.616 21.589-21.616 56.635-.027 78.252L433.76 511.987 128.211 817.482c-21.617 21.59-21.617 56.635 0 78.251 10.808 10.81 24.967 16.213 39.125 16.213 14.159 0 28.318-5.403 39.126-16.213l305.522-305.468L817.48 895.788C828.289 906.597 842.447 912 856.606 912s28.317-5.403 39.125-16.212c21.618-21.59 21.618-56.636.028-78.252L590.265 511.987z"/></svg>', _t = '<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M928.7 135.8H99.8c-21.15 0-37.8 17.55-37.8 35.1v685.35c0 17.55 17.1 31.5 37.8 31.5h828.45c21.15 0 33.3-14.4 33.3-31.5v-684.9c.45-17.55-12.15-35.55-32.85-35.55zm-53.1 666.9H147.5V222.2h728.1v580.5z"/></svg>', Ot = '<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M38.794 124.791v778.495h946.412V124.791H38.794zm896.678 728.033H89.292v-460.9h846.18v460.9z"/></svg>', mt = '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M738.793 681.382v-48.331l88.242-88.243a298.676 298.676 0 00156.712-83.482 38.836 38.836 0 000-54.923l-366.15-366.15a38.836 38.836 0 00-54.923 0 298.52 298.52 0 00-83.519 156.749l-88.169 88.169h-48.332a411.145 411.145 0 00-292.59 121.232c-15.16 15.159-15.16 39.764 0 54.923L278.906 690.17 86.642 882.436a38.836 38.836 0 1054.922 54.922l192.23-192.229 228.844 228.845a38.836 38.836 0 0054.922 0 411.042 411.042 0 00121.233-292.592zM134.02 435.44a333.473 333.473 0 01208.56-72.571l64.406.037a38.836 38.836 0 0027.461-11.351L544.292 241.71a38.68 38.68 0 0011.351-27.462 180.096 180.096 0 0136.798-89.01L898.8 431.593a180.925 180.925 0 01-89.12 36.835 38.836 38.836 0 00-27.462 11.35L672.373 589.626c-7.287 7.286-11.387 17.173-11.35 27.461l.036 64.406a333.318 333.318 0 01-72.608 208.596L134.021 435.44z"/></svg>';
function fn() {
  return {
    IconClose: pt,
    IconMax: _t,
    IconPin: mt,
    IconWindow: Ot
  };
}
function _(t, n, e) {
  return n != null && Number.isFinite(n) && t < n ? n : e != null && Number.isFinite(e) && t > e ? e : t;
}
function tt(t) {
  return t == null || typeof t != "string" ? !0 : t.length == 0;
}
const et = "__xWindow_resize_prop__", W = 360, nt = 32, S = {
  TOP: v(L.TOP),
  BOTTOM: v(L.BOTTOM),
  LEFT: v(L.LEFT),
  RIGHT: v(L.RIGHT),
  TOP_LEFT: v(L.TOP_LEFT),
  TOP_RIGHT: v(L.TOP_RIGHT),
  BOTTOM_LEFT: v(L.BOTTOM_LEFT),
  BOTTOM_RIGHT: v(L.BOTTOM_RIGHT)
}, Pe = [[T.resizeTop, S.TOP], [T.resizeBottom, S.BOTTOM], [T.resizeLeft, S.LEFT], [T.resizeRight, S.RIGHT], [T.resizeTopLeft, S.TOP_LEFT], [T.resizeTopRight, S.TOP_RIGHT], [T.resizeBottomLeft, S.BOTTOM_LEFT], [T.resizeBottomRight, S.BOTTOM_RIGHT]];
function v(t) {
  return t.toString(2).padStart(4, "0");
}
function ot(t, n, e) {
  const a = n.getBoundingClientRect(), d = document.documentElement.getBoundingClientRect(), r = e.relatedWindow != null, i = {};
  if (e.direction[3] == "1") {
    const l = _(a.bottom - _(t.clientY, 0), nt), s = _(t.clientY - d.top, 0, window.innerHeight - l);
    i.height = l, i.top = s;
  }
  if (e.direction[2] == "1") {
    const l = _(_(t.clientY, 0, window.innerHeight) - a.top, nt), s = _(t.clientY - l - d.top, 0, window.innerHeight - l);
    i.height = l, i.top = s;
  }
  if (e.direction[1] == "1") {
    const l = _(a.right - _(t.clientX, 0), W, r ? window.innerWidth - W : window.innerWidth), s = _(t.clientX - d.left, r ? W : 0, window.innerWidth - l);
    i.width = l, i.left = s;
  }
  if (e.direction[0] == "1") {
    const l = _(_(t.clientX, 0) - a.left, W, r ? window.innerWidth - W : window.innerWidth), s = _(t.clientX - l - d.left, 0, window.innerWidth - l - (r ? W : 0));
    i.width = l, i.left = s;
  }
  return i;
}
function Ge(t) {
  const n = Y(), e = {
    init: !1,
    direction: null,
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    relatedWindow: null
  };
  function a(l) {
    l.preventDefault(), l.stopPropagation();
    const s = t.windowState, f = t.splitState;
    e.init = !1, e.direction = l.target[et], e.top = s.top, e.left = s.left, e.width = s.width, e.height = s.height, f.mode == o.LEFT && e.direction == o.RIGHT.toString(2).padStart(4, "0") && (e.relatedWindow = D(o.RIGHT)), f.mode == o.RIGHT && e.direction == o.LEFT.toString(2).padStart(4, "0") && (e.relatedWindow = D(o.LEFT)), window.addEventListener("mousemove", d), window.addEventListener("mouseup", r);
  }
  function d(l) {
    l.preventDefault();
    const s = n == null ? void 0 : n.refs.window, f = t.splitState;
    if (e.init || (s.classList.add(T.resizing), e.init = !0), t.splitState.mode != o.NONE) {
      if (e.relatedWindow == null) {
        const g = s.getBoundingClientRect();
        t.windowState.top = g.top, t.windowState.left = g.left, t.windowState.width = g.width, t.windowState.height = g.height, t.splitState.mode = o.NONE;
      }
      e.top = t.windowState.top, e.left = t.windowState.left, e.width = t.windowState.width, e.height = t.windowState.height;
    }
    const h = ot(l, s, e);
    for (const g in h) {
      const O = Math.round(h[g]);
      Reflect.set(e, g, O), Reflect.set(s.style, g, O + "px");
    }
    if (f.mode == o.LEFT || f.mode == o.RIGHT) {
      const g = e.relatedWindow;
      if (g != null) {
        const O = g.getWindowEl();
        Reflect.set(O.style, "width", window.innerWidth - e.width + "px");
      }
    }
  }
  function r(l) {
    if (l.preventDefault(), e.init) {
      const s = n == null ? void 0 : n.refs.window;
      ot(l, s, e) != null && (t.windowState.top = e.top, t.windowState.left = e.left, t.windowState.width = e.width, t.windowState.height = e.height, t.saveWindowState()), s.classList.remove(T.resizing);
      const h = t.splitState;
      if (h.mode == o.LEFT || h.mode == o.RIGHT) {
        const g = e.relatedWindow;
        if (g != null) {
          const O = t.splitState;
          O.width = e.width / window.innerWidth * 100;
          const R = 100 - O.width;
          g.splitState.width = R;
        }
      }
    }
    window.removeEventListener("mousemove", d), window.removeEventListener("mouseup", r);
  }
  const i = Pe.map((l) => Z("div", {
    className: l[0],
    ["." + et]: l[1]
  }));
  return p("div", {
    class: T.resize,
    onMousedown: a
  }, [i]);
}
function xe(t) {
  const n = Y(), e = {
    init: !1,
    left: 0,
    top: 0,
    prevClientX: 0,
    prevClientY: 0,
    splitMode: o.NONE,
    splitWidth: null,
    relatedWindow: null
  };
  function a(i) {
    const s = (n == null ? void 0 : n.refs.window).getBoundingClientRect();
    i.clientY - s.top > 30 || (i.preventDefault(), e.init = !1, e.left = t.windowState.left, e.top = t.windowState.top, e.prevClientX = i.clientX, e.prevClientY = i.clientY, window.addEventListener("mousemove", d), window.addEventListener("mouseup", r));
  }
  function d(i) {
    i.preventDefault();
    const l = n == null ? void 0 : n.refs.window;
    e.init || (l.classList.add(T.dragging), e.init = !0), t.splitState.mode != o.NONE && (t.exitSplitMode(i), e.left = t.windowState.left, e.top = t.windowState.top), e.left = Math.round(e.left + i.clientX - e.prevClientX), e.top = Math.round(e.top + i.clientY - e.prevClientY), e.prevClientX = i.clientX, e.prevClientY = i.clientY, l.style.left = e.left + "px", l.style.top = e.top + "px";
    const s = se(i);
    e.splitMode = s.mode, e.splitWidth = s.width, e.relatedWindow = s.relatedWindow;
  }
  function r(i) {
    if (i.preventDefault(), e.init) {
      const l = n == null ? void 0 : n.refs.window;
      if (t.windowState.top = e.top, t.windowState.left = e.left, e.splitMode !== o.NONE) {
        if (t.splitState.mode = e.splitMode, e.relatedWindow) {
          const s = e.splitWidth / window.innerWidth * 100;
          t.splitState.width = s, e.relatedWindow.splitState.width = 100 - s;
        }
        le();
      }
      l.classList.remove(T.dragging);
    }
    window.removeEventListener("mousemove", d), window.removeEventListener("mouseup", r);
  }
  return { dragStart: a };
}
const ke = /* @__PURE__ */ y({
  name: "WindowBody",
  props: {
    uid: E,
    body: {
      default: null
    }
  },
  setup(t) {
    const n = lt(V);
    return function() {
      return typeof t.body == "function" ? t.body(n) : t.body;
    };
  }
});
function Ce(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !G(t);
}
const Ue = Math.floor(Number.MAX_SAFE_INTEGER / 10) - 1e4;
function je() {
  return {
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    focused: !1,
    pinned: !1
  };
}
function De() {
  return {
    mode: o.NONE,
    width: 50,
    height: 50
  };
}
function Xe(t, n, e, a, d) {
  return N(() => {
    if (n.value == B.INIT)
      return {
        width: t.width,
        height: t.height,
        left: t.left,
        top: t.top
      };
    const r = t.mask ? null : d.value, i = a.mode;
    return i == o.FULLSCREEN ? {
      zIndex: r
    } : i === o.LEFT || i === o.RIGHT ? {
      top: 0,
      left: i == o.LEFT ? 0 : null,
      right: i == o.RIGHT ? 0 : null,
      width: (a.width ?? 50) + "vw",
      height: "100vh",
      zIndex: r
    } : i == o.TOP_LEFT || i == o.TOP_RIGHT || i == o.BOTTOM_LEFT || i == o.BOTTOM_RIGHT ? {
      top: i == o.TOP_LEFT || i == o.TOP_RIGHT ? 0 : null,
      left: i == o.TOP_LEFT || i == o.BOTTOM_LEFT ? 0 : null,
      right: i == o.TOP_RIGHT || i == o.BOTTOM_RIGHT ? 0 : null,
      bottom: i == o.BOTTOM_LEFT || i == o.BOTTOM_RIGHT ? 0 : null,
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
const Et = /* @__PURE__ */ y({
  name: "BaseWindow",
  props: {
    ...$,
    uid: {
      type: E,
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
    slots: a
  }) {
    const d = E.create(t.uid), r = Y(), i = F(B.INIT), l = F(0), s = U(je()), f = U(De()), h = {
      width: 0,
      height: 0
    }, g = N(() => t.draggable && t.resizable), O = N(() => typeof t.zIndex == "number" && t.zIndex > 0 ? t.zIndex : (s.pinned ? Ue : 0) + l.value), R = {
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
        return f;
      },
      get zIndex() {
        return O.value;
      },
      set zIndex(w) {
        l.value = w;
      },
      exitSplitMode: Bt,
      close: k,
      saveWindowState: q,
      getWindowEl() {
        return r.refs.window;
      },
      useMenus: J
    }, x = t.draggable ? xe(R) : null, Lt = g.value ? Ge(R) : null, St = N(() => {
      const w = [T.window];
      return i.value == B.INIT && w.push(T.init), f.mode == o.FULLSCREEN && w.push(T.fullscreen), s.focused && w.push(T.focused), w;
    }), vt = Xe(t, i, s, f, O);
    async function It(w) {
      await j();
      const M = w.el.getBoundingClientRect();
      if (i.value == B.INIT) {
        const C = Tt().value.length;
        let Q = M.left, A = M.top;
        tt(t.left) && (Q = (window.innerWidth - M.width) / 2), tt(t.top) && (A = window.innerHeight * 0.18 + C * 30), s.width = M.width, s.height = M.height, s.left = Q, s.top = A, i.value = B.MOUNTED, q();
      }
      K();
    }
    function k(w) {
      t.closeable && (w == null || w.stopPropagation(), n("update:visible", !1));
    }
    function Rt() {
      s.focused = !1, j(gt);
    }
    function Mt(w) {
      w.stopPropagation();
    }
    function K() {
      s.focused || ht(d);
    }
    function bt() {
      f.mode = f.mode == o.FULLSCREEN ? o.NONE : o.FULLSCREEN;
    }
    function zt() {
      s.pinned = !s.pinned;
    }
    function q() {
      h.width = s.width, h.height = s.height;
    }
    function Bt(w) {
      s.top = w.clientY - 15, s.left = w.clientX - h.width / 2, s.width = h.width, s.height = h.height, f.mode = o.NONE, f.width = 50, f.height = 50;
    }
    function Wt(w) {
      w.stopPropagation();
    }
    const Nt = Pt(() => t.visible, () => {
      t.visible || Rt();
    });
    te(d, R), rt(() => {
      n("beforeUnmount"), k(), at(d);
    }), Gt(() => {
      n("unmount"), Nt(), i.value = B.UNMOUNTED;
    }), xt(V, R), e(R);
    function J(w = {}) {
      const m = [];
      return t.mask !== !0 && m.push(p("button", {
        onClick: zt,
        type: "button",
        innerHTML: mt,
        class: s.pinned ? T.pinMenu : T.menu,
        title: "固定"
      }, null)), g.value && m.push(p("button", {
        onClick: bt,
        type: "button",
        innerHTML: _t,
        class: T.menu,
        title: "最大化"
      }, null)), t.closeable && m.push(p("button", {
        onClick: k,
        type: "button",
        innerHTML: pt,
        class: T.closeMenu,
        title: "关闭"
      }, null)), m.length == 0 ? null : (w == null ? void 0 : w.custom) === !0 ? m : p("div", {
        class: T.menus,
        onMousedown: Mt
      }, [m]);
    }
    return function() {
      if (!t.visible)
        return null;
      const w = typeof a.header == "function" ? a.header(J) : null, m = p("div", {
        class: T.main,
        onMousedown: x == null ? void 0 : x.dragStart
      }, [w, p("div", {
        class: T.body,
        onClick: Wt
      }, [p(ke, {
        body: t.body,
        key: d.wid,
        uid: d
      }, null)])]), M = {
        ref: "window",
        id: t.id ?? d.wid,
        onVnodeMounted: It,
        onMousedownCapture: K,
        class: St.value,
        style: vt.value
      };
      let b = Z("div", M, [m, Lt]);
      if (t.mask === !0) {
        const C = {
          zIndex: O.value
        };
        b = p("div", {
          class: T.mask,
          style: C
        }, [b]);
      }
      return t.appendToBody ? p(ut, {
        to: "body"
      }, Ce(b) ? b : {
        default: () => [b]
      }) : b;
    };
  }
});
function Ye(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !G(t);
}
const X = /* @__PURE__ */ y({
  name: "SimpleWindow",
  props: {
    ...$
  },
  setup(t, {
    slots: n,
    attrs: e
  }) {
    const {
      uid: a,
      ...d
    } = e, r = E.create(e.uid), i = F(null);
    function l(f) {
      f.preventDefault();
      const h = i.value;
      if (h == null)
        return;
      const g = h.windowState.splitMode;
      h.windowState.splitMode = g == o.FULLSCREEN ? o.NONE : o.FULLSCREEN;
    }
    const s = {
      header(f) {
        const h = f();
        return p("div", {
          class: T.header,
          onDblclick: l
        }, [p("i", {
          class: T.logo,
          innerHTML: Ot
        }, null), p("div", {
          class: T.title
        }, [t.title ?? "新窗口"]), h]);
      }
    };
    return function() {
      const f = {
        ...t,
        ...d,
        uid: r,
        body: n.default
      };
      return p(Et, kt(f, {
        ref: i
      }), Ye(s) ? s : {
        default: () => [s]
      });
    };
  }
});
function Ze(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !G(t);
}
const P = /* @__PURE__ */ y({
  name: "BlankWindow",
  props: {
    ...$
  },
  setup(t, {
    slots: n,
    attrs: e
  }) {
    const {
      body: a,
      ...d
    } = n, {
      uid: r,
      ...i
    } = e, l = E.create(e.uid);
    return function() {
      const s = {
        ...t,
        ...i,
        uid: l,
        body: n.default
      };
      return p(Et, s, Ze(d) ? d : {
        default: () => [d]
      });
    };
  }
});
const Ve = "_splitWindowMask_348ej_1", $e = "_fullscreen_348ej_9", Ke = "_splitLeft_348ej_16", qe = "_splitRight_348ej_23", Je = "_splitTopLeft_348ej_30", Qe = "_splitTopRight_348ej_37", Ae = "_splitBottomLeft_348ej_44", tn = "_splitBottomRight_348ej_51", I = {
  splitWindowMask: Ve,
  fullscreen: $e,
  splitLeft: Ke,
  splitRight: qe,
  splitTopLeft: Je,
  splitTopRight: Qe,
  splitBottomLeft: Ae,
  splitBottomRight: tn
};
function en(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !G(t);
}
const nn = {
  [o.FULLSCREEN]: I.fullscreen,
  [o.LEFT]: I.splitLeft,
  [o.RIGHT]: I.splitRight,
  [o.TOP_LEFT]: I.splitTopLeft,
  [o.TOP_RIGHT]: I.splitTopRight,
  [o.BOTTOM_LEFT]: I.splitBottomLeft,
  [o.BOTTOM_RIGHT]: I.splitBottomRight
}, it = {
  ArrowUp: {
    [o.BOTTOM_LEFT]: o.LEFT,
    [o.BOTTOM_RIGHT]: o.RIGHT,
    [o.LEFT]: o.TOP_LEFT,
    [o.RIGHT]: o.TOP_RIGHT,
    fallback: o.FULLSCREEN
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
}, st = /* @__PURE__ */ y({
  name: "WindowManager",
  setup() {
    const t = Tt(), n = re();
    function e(i) {
      const l = i.key;
      if (l == "Escape")
        return ft();
      if (i.ctrlKey && l in it) {
        const s = At(), f = Reflect.get(it, l), h = f[s.splitState.mode] ?? f.fallback;
        s.splitState.mode = h;
        return;
      }
    }
    $t(), window.addEventListener("keydown", e, !0), rt(() => {
      Kt(), window.removeEventListener("keydown", e, !0);
    });
    function a(i) {
      return i == P.name ? P : X;
    }
    const d = N(() => {
      const i = [I.splitWindowMask], l = nn[n.mode];
      return l != null && i.push(l), i;
    });
    function r() {
      let i = null;
      if (n.mode != o.NONE) {
        const s = {
          zIndex: Jt() + 1,
          width: n.width ? n.width - 20 + "px" : null
        };
        i = p("div", {
          class: d.value,
          style: s
        }, null);
      }
      return p(ut, {
        to: "body"
      }, {
        default: () => [p(Ct, {
          name: "fade"
        }, en(i) ? i : {
          default: () => [i]
        })]
      });
    }
    return function() {
      return [...t.value.map((l) => {
        const s = ee(l);
        if (s == null)
          return;
        const f = a(s.type);
        return Z(f, s.buildProps());
      }), r()];
    };
  }
});
function on(t) {
  if (t.length == 1) {
    const n = t[0];
    return n == null ? null : typeof n == "object" ? n : null;
  }
  if (t.length == 2) {
    const [n, e] = t;
    if (typeof n == "string" && e != null)
      return { title: n, body: e };
  }
  return null;
}
function Tn(...t) {
  const n = on(t);
  return n == null ? (console.error("[xWindow]: 参数有误"), null) : sn(n);
}
function sn(t) {
  if (!qt())
    return console.error("[xWindow] 需要先创建`WindowManager`组件，见文档 " + Ut + " 。"), null;
  const { displayAfterCreate: n, unmountAfterClose: e, afterUnmount: a, ...d } = t, r = {
    uid: null,
    visible: F(n !== !1),
    isUnmounted: !1
  }, i = () => r.visible.value = !0, l = () => {
    r.visible.value = !1, e !== !1 && s();
  }, s = () => {
    r.visible.value && l(), at(r.uid), j(gt);
  }, f = Object.assign({}, d, {
    visible: r.visible,
    [Dt](h) {
      h ? i() : l();
    },
    [Xt]() {
      r.isUnmounted = !0;
    },
    [Yt]() {
      typeof a == "function" && a();
    }
  });
  return r.uid = ne(H.create(f)), {
    uid: r.uid,
    get isUnmounted() {
      return r.isUnmounted;
    },
    get visible() {
      return r.visible.value;
    },
    show: i,
    close: l,
    unmount: s
  };
}
function ln(t, n) {
  t.component(X.name, X), t.component(P.name, P), t.component(st.name, st), ue(n);
}
const rn = jt, wn = { install: ln, version: rn };
export {
  P as BlankWindow,
  B as ComponentStates,
  X as SimpleWindow,
  st as WindowManager,
  wn as default,
  ln as install,
  fn as useIcons,
  Tn as useWindow,
  an as useWindowApi,
  cn as useWindowManager,
  rn as version,
  wn as xWindow
};
