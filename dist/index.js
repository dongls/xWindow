/*! @dongls/xWindow v0.0.5 https://github.com/dongls/xWindow
Copyright 2023-present dongls
Released under the MIT License */
var yt = Object.defineProperty;
var Nt = (t, e, n) => e in t ? yt(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var E = (t, e, n) => (Nt(t, typeof e != "symbol" ? e + "" : e, n), n);
import { shallowRef as zt, ref as z, inject as A, getCurrentInstance as tt, h as G, createVNode as g, defineComponent as I, reactive as It, computed as N, watch as Bt, onBeforeUnmount as et, onUnmounted as Wt, provide as xt, Teleport as nt, isVNode as C, nextTick as H, mergeProps as Rt, Transition as Ct } from "vue";
const Ft = "https://github.com/dongls/xWindow", kt = "0.0.5", Ht = "onUpdate:visible", Ut = "onBeforeUnmount", Gt = "onUnmount", P = Symbol(), b = Object.freeze({
  INIT: 0,
  MOUNTED: 1,
  UNMOUNTED: 2
});
var p = /* @__PURE__ */ ((t) => (t[t.TOP = 0] = "TOP", t[t.BOTTOM = 1] = "BOTTOM", t[t.LEFT = 2] = "LEFT", t[t.RIGHT = 3] = "RIGHT", t[t.LEFT_TOP = 4] = "LEFT_TOP", t[t.LEFT_BOTTOM = 5] = "LEFT_BOTTOM", t[t.RIGHT_TOP = 6] = "RIGHT_TOP", t[t.RIGHT_BOTTOM = 7] = "RIGHT_BOTTOM", t))(p || {});
const X = {
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
}, h = Object.freeze({
  NONE: 0,
  TOP: 1,
  RIGHT: 1 << 1,
  BOTTOM: 1 << 2,
  LEFT: 1 << 3
}), f = Object.freeze({
  NONE: h.NONE,
  FULLSCREEN: h.TOP,
  LEFT: h.LEFT,
  RIGHT: h.RIGHT,
  TOP_LEFT: h.TOP | h.LEFT,
  TOP_RIGHT: h.TOP | h.RIGHT,
  BOTTOM_LEFT: h.BOTTOM | h.LEFT,
  BOTTOM_RIGHT: h.BOTTOM | h.RIGHT
});
let Pt = 1e3;
class M {
  /** 统一使用`UID.create`方法创建 */
  constructor() {
    E(this, "value");
    this.value = Pt++;
  }
  get wid() {
    return "window--" + this.value;
  }
  static create(e) {
    return e instanceof M ? e : Object.freeze(new M());
  }
}
class x {
  constructor(e) {
    E(this, "uid");
    E(this, "type");
    E(this, "visible");
    E(this, "others");
    E(this, "body");
    const { visible: n, body: u, type: r, ...s } = e;
    this.uid = M.create(), this.type = r, this.visible = n, this.body = u, this.others = s;
  }
  static create(e) {
    return e instanceof x ? e : new x(e);
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
function Xt(t) {
  const { clientX: e, clientY: n } = t, { innerWidth: u, innerHeight: r } = window;
  let s = h.NONE;
  return n <= 5 && (s |= h.TOP), n >= r - 5 && (s |= h.BOTTOM), e <= 5 && (s |= h.LEFT), e >= u - 5 && (s |= h.RIGHT), s;
}
const c = {
  isMounted: !1,
  zIndex: 1e3,
  stack: /* @__PURE__ */ new Map(),
  ghost: zt([]),
  options: /* @__PURE__ */ new Map(),
  topWindow: null,
  splitMode: z(f.NONE)
};
function Yt() {
  c.isMounted = !0;
}
function jt() {
  c.isMounted = !1, c.topWindow = null, c.ghost.value = [], c.stack.clear(), c.options.clear();
}
function Dt() {
  return c.isMounted;
}
function ot() {
  return c.zIndex;
}
function it() {
  return c.zIndex += 2;
}
function Vt() {
  const t = c.topWindow;
  return t ? t.zIndex : 1;
}
function Zt(t) {
  typeof t == "number" && Number.isFinite(t) && (c.zIndex = Math.floor(t));
}
function B() {
  return c.topWindow;
}
function $t(t, e) {
  c.stack.set(t, e);
}
function st(t) {
  c.stack.delete(t), c.options.delete(t);
  const e = c.ghost.value.indexOf(t);
  if (e >= 0) {
    const n = c.ghost.value;
    n.splice(e, 1), c.ghost.value = n.slice();
  }
}
function lt() {
  c.stack.size == 0 || c.topWindow == null || c.topWindow.close();
}
function Kt(t) {
  return c.options.get(t);
}
function qt(t) {
  const e = c.ghost.value;
  return e.push(t.uid), c.ghost.value = e.slice(), c.options.set(t.uid, t), t.uid;
}
function Jt(t) {
  return c.stack.get(t);
}
function ut() {
  return c.ghost;
}
function rt(t) {
  if (c.topWindow = t, t != null) {
    for (const e of c.stack.values()) {
      const n = e.windowState;
      n.focused = e === t;
    }
    t.zIndex < ot() && (t.zIndex = it());
  }
}
function ct(t) {
  const e = c.stack.get(t);
  rt(e);
}
function dt() {
  const t = Qt();
  rt(t);
}
function Qt() {
  return c.stack.size == 0 ? null : Array.from(c.stack.values()).filter((e) => e.visible).sort((e, n) => n.zIndex - e.zIndex)[0];
}
function At(t) {
  const e = Xt(t);
  return c.splitMode.value = e, e;
}
function te() {
  return c.splitMode.value = f.NONE, f.NONE;
}
function ee() {
  return c.splitMode;
}
function Ke() {
  return {
    closeTopWindow: lt,
    getTopZIndex: it,
    getWindowApi: Jt,
    getZIndex: ot,
    setFocusedWindow: ct
  };
}
function ne(t) {
  Zt(t == null ? void 0 : t.zIndex);
}
function qe() {
  return A(P);
}
const oe = "_window_d2gsu_7", ie = "_dragging_d2gsu_17", se = "_resizing_d2gsu_17", le = "_fullscreen_d2gsu_21", ue = "_focused_d2gsu_31", re = "_header_d2gsu_34", ce = "_main_d2gsu_38", de = "_init_d2gsu_45", ae = "_title_d2gsu_63", fe = "_menus_d2gsu_73", we = "_body_d2gsu_79", ge = "_footer_d2gsu_84", he = "_menu_d2gsu_73", pe = "_closeMenu_d2gsu_135 _menu_d2gsu_73", _e = "_pinMenu_d2gsu_146 _menu_d2gsu_73", Te = "_logo_d2gsu_153", me = "_resize_d2gsu_165", Me = "_resizeBar_d2gsu_169", Oe = "_resizeTop_d2gsu_174 _resizeBar_d2gsu_169", ve = "_resizeBottom_d2gsu_175 _resizeBar_d2gsu_169", Ee = "_resizeRight_d2gsu_191 _resizeBar_d2gsu_169", be = "_resizeLeft_d2gsu_192 _resizeBar_d2gsu_169", Se = "_resizeLeftTop_d2gsu_208 _resizeBar_d2gsu_169", Le = "_resizeLeftBottom_d2gsu_209 _resizeBar_d2gsu_169", ye = "_resizeRightTop_d2gsu_210 _resizeBar_d2gsu_169", Ne = "_resizeRightBottom_d2gsu_211 _resizeBar_d2gsu_169", ze = "_mask_d2gsu_241", a = {
  window: oe,
  dragging: ie,
  resizing: se,
  fullscreen: le,
  focused: ue,
  header: re,
  main: ce,
  init: de,
  title: ae,
  menus: fe,
  body: we,
  footer: ge,
  menu: he,
  closeMenu: pe,
  pinMenu: _e,
  logo: Te,
  resize: me,
  resizeBar: Me,
  resizeTop: Oe,
  resizeBottom: ve,
  resizeRight: Ee,
  resizeLeft: be,
  resizeLeftTop: Se,
  resizeLeftBottom: Le,
  resizeRightTop: ye,
  resizeRightBottom: Ne,
  mask: ze
}, at = '<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M590.265 511.987l305.521-305.468c21.617-21.589 21.617-56.636.027-78.252-21.616-21.617-56.663-21.617-78.279 0L512.012 433.735 206.544 128.213c-21.617-21.617-56.635-21.617-78.252 0-21.616 21.589-21.616 56.635-.027 78.252L433.76 511.987 128.211 817.482c-21.617 21.59-21.617 56.635 0 78.251 10.808 10.81 24.967 16.213 39.125 16.213 14.159 0 28.318-5.403 39.126-16.213l305.522-305.468L817.48 895.788C828.289 906.597 842.447 912 856.606 912s28.317-5.403 39.125-16.212c21.618-21.59 21.618-56.636.028-78.252L590.265 511.987z"/></svg>', ft = '<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M928.7 135.8H99.8c-21.15 0-37.8 17.55-37.8 35.1v685.35c0 17.55 17.1 31.5 37.8 31.5h828.45c21.15 0 33.3-14.4 33.3-31.5v-684.9c.45-17.55-12.15-35.55-32.85-35.55zm-53.1 666.9H147.5V222.2h728.1v580.5z"/></svg>', wt = '<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M38.794 124.791v778.495h946.412V124.791H38.794zm896.678 728.033H89.292v-460.9h846.18v460.9z"/></svg>', gt = '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M738.793 681.382v-48.331l88.242-88.243a298.676 298.676 0 00156.712-83.482 38.836 38.836 0 000-54.923l-366.15-366.15a38.836 38.836 0 00-54.923 0 298.52 298.52 0 00-83.519 156.749l-88.169 88.169h-48.332a411.145 411.145 0 00-292.59 121.232c-15.16 15.159-15.16 39.764 0 54.923L278.906 690.17 86.642 882.436a38.836 38.836 0 1054.922 54.922l192.23-192.229 228.844 228.845a38.836 38.836 0 0054.922 0 411.042 411.042 0 00121.233-292.592zM134.02 435.44a333.473 333.473 0 01208.56-72.571l64.406.037a38.836 38.836 0 0027.461-11.351L544.292 241.71a38.68 38.68 0 0011.351-27.462 180.096 180.096 0 0136.798-89.01L898.8 431.593a180.925 180.925 0 01-89.12 36.835 38.836 38.836 0 00-27.462 11.35L672.373 589.626c-7.287 7.286-11.387 17.173-11.35 27.461l.036 64.406a333.318 333.318 0 01-72.608 208.596L134.021 435.44z"/></svg>';
function Je() {
  return {
    IconClose: at,
    IconMax: ft,
    IconPin: gt,
    IconWindow: wt
  };
}
function T(t, e, n) {
  return e != null && Number.isFinite(e) && t < e ? e : n != null && Number.isFinite(n) && t > n ? n : t;
}
function K(t) {
  return t == null || typeof t != "string" ? !0 : t.length == 0;
}
const q = "__xWindow_resize_prop__", L = 360, y = 32;
function J(t, e, n) {
  const u = e.getBoundingClientRect(), r = document.documentElement.getBoundingClientRect();
  if (n.direction == p.TOP) {
    const s = t.clientY - r.top;
    return {
      height: T(u.bottom - t.clientY, y),
      top: s
    };
  }
  if (n.direction == p.BOTTOM) {
    const s = T(t.clientY - u.top, y), i = t.clientY - s - r.top;
    return {
      height: s,
      top: i
    };
  }
  if (n.direction == p.LEFT) {
    const s = T(u.right - t.clientX, L), i = t.clientX - r.left;
    return {
      width: s,
      left: i
    };
  }
  if (n.direction == p.RIGHT) {
    const s = T(t.clientX - u.left, L), i = t.clientX - s - r.left;
    return {
      width: s,
      left: i
    };
  }
  if (n.direction == p.LEFT_TOP) {
    const s = t.clientY - r.top, i = t.clientX - r.left, o = T(u.right - t.clientX, L), l = T(u.bottom - t.clientY, y);
    return {
      top: s,
      left: i,
      width: o,
      height: l
    };
  }
  if (n.direction == p.LEFT_BOTTOM) {
    const s = T(t.clientY - u.top, y), i = T(u.right - t.clientX, L), o = t.clientY - s - r.top, l = t.clientX - r.left;
    return {
      top: o,
      left: l,
      width: i,
      height: s
    };
  }
  if (n.direction == p.RIGHT_TOP) {
    const s = T(t.clientX - u.left, L), i = T(u.bottom - t.clientY, y), o = t.clientY - r.top, l = t.clientX - s - r.left;
    return {
      top: o,
      left: l,
      width: s,
      height: i
    };
  }
  if (n.direction == p.RIGHT_BOTTOM) {
    const s = T(t.clientY - u.top, y), i = T(t.clientX - u.left, L), o = t.clientY - s - r.top, l = t.clientX - i - r.left;
    return {
      top: o,
      left: l,
      width: i,
      height: s
    };
  }
  return null;
}
function Ie(t) {
  const e = tt(), n = [[a.resizeTop, p.TOP], [a.resizeBottom, p.BOTTOM], [a.resizeLeft, p.LEFT], [a.resizeRight, p.RIGHT], [a.resizeLeftTop, p.LEFT_TOP], [a.resizeLeftBottom, p.LEFT_BOTTOM], [a.resizeRightTop, p.RIGHT_TOP], [a.resizeRightBottom, p.RIGHT_BOTTOM]], u = {
    init: !1,
    direction: -1,
    top: 0,
    left: 0,
    width: 0,
    height: 0
  };
  function r(l) {
    l.preventDefault(), l.stopPropagation(), u.init = !1, u.direction = l.target[q], u.top = t.windowState.top, u.left = t.windowState.left, u.width = t.windowState.width, u.height = t.windowState.height, window.addEventListener("mousemove", s), window.addEventListener("mouseup", i);
  }
  function s(l) {
    l.preventDefault();
    const w = e == null ? void 0 : e.refs.window;
    u.init || (w.classList.add(a.resizing), u.init = !0), t.windowState.splitMode != f.NONE && (u.top = t.windowState.top, u.left = t.windowState.left, u.width = t.windowState.width, u.height = t.windowState.height);
    const _ = J(l, w, u);
    if (_ != null)
      for (const m in _) {
        const S = Math.round(_[m]);
        Reflect.set(u, m, S), Reflect.set(w.style, m, S + "px");
      }
  }
  function i(l) {
    if (l.preventDefault(), u.init) {
      const w = e == null ? void 0 : e.refs.window;
      J(l, w, u) != null && (t.windowState.top = u.top, t.windowState.left = u.left, t.windowState.width = u.width, t.windowState.height = u.height, t.saveWindowState()), w.classList.remove(a.resizing);
    }
    window.removeEventListener("mousemove", s), window.removeEventListener("mouseup", i);
  }
  const o = n.map((l) => G("div", {
    className: l[0],
    ["." + q]: l[1]
  }));
  return g("div", {
    class: a.resize,
    onMousedown: r
  }, [o]);
}
function Be(t) {
  const e = tt(), n = {
    init: !1,
    left: 0,
    top: 0,
    prevClientX: 0,
    prevClientY: 0,
    splitMode: f.NONE
  };
  function u(i) {
    const l = (e == null ? void 0 : e.refs.window).getBoundingClientRect();
    i.clientY - l.top > 30 || (i.preventDefault(), n.init = !1, n.left = t.windowState.left, n.top = t.windowState.top, n.prevClientX = i.clientX, n.prevClientY = i.clientY, window.addEventListener("mousemove", r), window.addEventListener("mouseup", s));
  }
  function r(i) {
    i.preventDefault();
    const o = e == null ? void 0 : e.refs.window;
    n.init || (o.classList.add(a.dragging), n.init = !0), t.windowState.splitMode != f.NONE && (t.exitSplitMode(i), n.left = t.windowState.left, n.top = t.windowState.top), n.left = Math.round(n.left + i.clientX - n.prevClientX), n.top = Math.round(n.top + i.clientY - n.prevClientY), n.prevClientX = i.clientX, n.prevClientY = i.clientY, o.style.left = n.left + "px", o.style.top = n.top + "px", n.splitMode = At(i);
  }
  function s(i) {
    if (i.preventDefault(), n.init) {
      const o = e == null ? void 0 : e.refs.window;
      t.windowState.top = n.top, t.windowState.left = n.left, n.splitMode !== f.NONE && (t.windowState.splitMode = n.splitMode, te()), o.classList.remove(a.dragging);
    }
    window.removeEventListener("mousemove", r), window.removeEventListener("mouseup", s);
  }
  return { dragStart: u };
}
const We = /* @__PURE__ */ I({
  name: "WindowBody",
  props: {
    uid: M,
    body: {
      default: null
    }
  },
  setup(t) {
    const e = A(P);
    return function() {
      return typeof t.body == "function" ? t.body(e) : t.body;
    };
  }
});
function xe(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !C(t);
}
const Re = Math.floor(Number.MAX_SAFE_INTEGER / 1e3);
function Ce() {
  return {
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    focused: !1,
    pinned: !1,
    splitMode: f.NONE
  };
}
const ht = /* @__PURE__ */ I({
  name: "BaseWindow",
  props: {
    ...X,
    uid: {
      type: M,
      required: !0
    },
    body: {
      default: null
    }
  },
  emits: ["update:visible", "beforeUnmount", "unmount"],
  setup(t, {
    emit: e,
    expose: n,
    slots: u
  }) {
    const r = M.create(t.uid), s = z(b.INIT), i = z(0), o = It(Ce()), l = {
      width: 0,
      height: 0
    }, w = N(() => t.draggable && t.resizable), _ = N(() => typeof t.zIndex == "number" && t.zIndex > 0 ? t.zIndex : (o.pinned ? Re : 0) + i.value), m = Object.freeze({
      get uid() {
        return r;
      },
      get visible() {
        return t.visible;
      },
      get windowState() {
        return o;
      },
      get zIndex() {
        return _.value;
      },
      set zIndex(d) {
        i.value = d;
      },
      get menus() {
        return D();
      },
      exitSplitMode: bt,
      close: F,
      saveWindowState: j
    }), S = t.draggable ? Be(m) : null, pt = w.value ? Ie(m) : null, _t = N(() => {
      const d = [a.window];
      return s.value == b.INIT && d.push(a.init), o.splitMode == f.FULLSCREEN && d.push(a.fullscreen), o.focused && d.push(a.focused), d;
    }), Tt = N(() => {
      if (s.value == b.INIT)
        return {
          width: t.width,
          height: t.height,
          left: t.left,
          top: t.top
        };
      const d = t.mask ? null : _.value;
      return o.splitMode == f.FULLSCREEN ? {
        zIndex: d
      } : o.splitMode === f.LEFT || o.splitMode === f.RIGHT ? {
        top: 0,
        left: o.splitMode == f.RIGHT ? "50vw" : 0,
        width: "50vw",
        height: "100vh",
        zIndex: d
      } : {
        top: o.top + "px",
        left: o.left + "px",
        width: o.width + "px",
        height: s.value == b.INIT ? null : o.height + "px",
        zIndex: d
      };
    });
    async function mt(d) {
      await H();
      const O = d.el.getBoundingClientRect();
      if (s.value == b.INIT) {
        const k = ut().value.length;
        let Z = O.left, $ = O.top;
        K(t.left) && (Z = (window.innerWidth - O.width) / 2), K(t.top) && ($ = window.innerHeight * 0.18 + k * 30), o.width = O.width, o.height = O.height, o.left = Z, o.top = $, s.value = b.MOUNTED, j();
      }
      Y();
    }
    function F(d) {
      t.closeable && (d == null || d.stopPropagation(), e("update:visible", !1));
    }
    function Mt() {
      o.focused = !1, H(dt);
    }
    function Ot(d) {
      d.stopPropagation();
    }
    function Y() {
      o.focused || ct(r);
    }
    function vt() {
      o.splitMode = o.splitMode == f.FULLSCREEN ? f.NONE : f.FULLSCREEN;
    }
    function Et() {
      o.pinned = !o.pinned;
    }
    function j() {
      l.width = o.width, l.height = o.height;
    }
    function bt(d) {
      o.top = d.clientY - 15, o.left = d.clientX - l.width / 2, o.width = l.width, o.height = l.height, o.splitMode = f.NONE;
    }
    function St(d) {
      d.stopPropagation();
    }
    const Lt = Bt(() => t.visible, () => {
      t.visible || Mt();
    });
    $t(r, m), et(() => {
      e("beforeUnmount"), F(), st(r);
    }), Wt(() => {
      e("unmount"), Lt(), s.value = b.UNMOUNTED;
    }), xt(P, m), n(m);
    function D() {
      const d = [];
      return t.mask !== !0 && d.push(g("button", {
        onClick: Et,
        type: "button",
        innerHTML: gt,
        class: o.pinned ? a.pinMenu : a.menu,
        title: "固定"
      }, null)), w.value && d.push(g("button", {
        onClick: vt,
        type: "button",
        innerHTML: ft,
        class: a.menu,
        title: "最大化"
      }, null)), t.closeable && d.push(g("button", {
        onClick: F,
        type: "button",
        innerHTML: at,
        class: a.closeMenu,
        title: "关闭"
      }, null)), d.length == 0 ? null : g("div", {
        class: a.menus,
        onMousedown: Ot
      }, [d]);
    }
    return function() {
      if (!t.visible)
        return null;
      const d = typeof u.header == "function" ? u.header(D()) : null, V = g("div", {
        class: a.main,
        onMousedown: S == null ? void 0 : S.dragStart
      }, [d, g("div", {
        class: a.body,
        onClick: St
      }, [g(We, {
        body: t.body,
        key: r.wid,
        uid: r
      }, null)])]), O = {
        ref: "window",
        id: t.id ?? r.wid,
        onVnodeMounted: mt,
        onMousedownCapture: Y,
        class: _t.value,
        style: Tt.value
      };
      let v = G("div", O, [V, pt]);
      if (t.mask === !0) {
        const k = {
          zIndex: _.value
        };
        v = g("div", {
          class: a.mask,
          style: k
        }, [v]);
      }
      return t.appendToBody ? g(nt, {
        to: "body"
      }, xe(v) ? v : {
        default: () => [v]
      }) : v;
    };
  }
});
function Fe(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !C(t);
}
const U = /* @__PURE__ */ I({
  name: "SimpleWindow",
  props: {
    ...X
  },
  setup(t, {
    slots: e,
    attrs: n
  }) {
    const {
      uid: u,
      ...r
    } = n, s = M.create(n.uid), i = z(null);
    function o(w) {
      w.preventDefault();
      const _ = i.value;
      if (_ == null)
        return;
      const m = _.windowState.splitMode;
      _.windowState.splitMode = m == f.FULLSCREEN ? f.NONE : f.FULLSCREEN;
    }
    const l = {
      header(w) {
        return g("div", {
          class: a.header,
          onDblclick: o
        }, [g("i", {
          class: a.logo,
          innerHTML: wt
        }, null), g("div", {
          class: a.title
        }, [t.title ?? "新窗口"]), w]);
      }
    };
    return function() {
      const w = {
        ...t,
        ...r,
        uid: s,
        body: e.default
      };
      return g(ht, Rt(w, {
        ref: i
      }), Fe(l) ? l : {
        default: () => [l]
      });
    };
  }
});
function ke(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !C(t);
}
const R = /* @__PURE__ */ I({
  name: "BlankWindow",
  props: {
    ...X
  },
  setup(t, {
    slots: e,
    attrs: n
  }) {
    const {
      body: u,
      ...r
    } = e, {
      uid: s,
      ...i
    } = n, o = M.create(n.uid);
    return function() {
      const l = {
        ...t,
        ...i,
        uid: o,
        body: e.default
      };
      return g(ht, l, ke(r) ? r : {
        default: () => [r]
      });
    };
  }
});
const He = "_splitWindowMask_7hn9w_1", Ue = "_fullscreen_7hn9w_9", Ge = "_splitLeft_7hn9w_16", Pe = "_splitRight_7hn9w_23", W = {
  splitWindowMask: He,
  fullscreen: Ue,
  splitLeft: Ge,
  splitRight: Pe
};
function Xe(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !C(t);
}
const Q = /* @__PURE__ */ I({
  name: "WindowManager",
  setup() {
    const t = ut(), e = ee();
    function n(i) {
      const o = i.key;
      if (o == "Escape")
        return lt();
      if (i.ctrlKey && o == "ArrowUp") {
        const l = B();
        l.windowState.splitMode = f.FULLSCREEN;
        return;
      }
      if (i.ctrlKey && o == "ArrowLeft") {
        const l = B();
        l.windowState.splitMode = f.LEFT;
        return;
      }
      if (i.ctrlKey && o == "ArrowRight") {
        const l = B();
        l.windowState.splitMode = f.RIGHT;
        return;
      }
      if (i.ctrlKey && o == "ArrowDown") {
        const l = B();
        l.windowState.splitMode = f.NONE;
        return;
      }
    }
    Yt(), window.addEventListener("keydown", n, !0), et(() => {
      jt(), window.removeEventListener("keydown", n, !0);
    });
    function u(i) {
      return i == R.name ? R : U;
    }
    const r = N(() => {
      const i = [W.splitWindowMask];
      return e.value == f.FULLSCREEN && i.push(W.fullscreen), e.value == f.LEFT && i.push(W.splitLeft), e.value == f.RIGHT && i.push(W.splitRight), i;
    });
    function s() {
      let i = null;
      if (e.value != f.NONE) {
        const l = {
          zIndex: Vt()
        };
        i = g("div", {
          class: r.value,
          style: l
        }, null);
      }
      return g(nt, {
        to: "body"
      }, {
        default: () => [g(Ct, {
          name: "fade"
        }, Xe(i) ? i : {
          default: () => [i]
        })]
      });
    }
    return function() {
      return [...t.value.map((o) => {
        const l = Kt(o);
        if (l == null)
          return;
        const w = u(l.type);
        return G(w, l.buildProps());
      }), s()];
    };
  }
});
function Ye(t) {
  if (t.length == 1) {
    const e = t[0];
    return e == null ? null : typeof e == "object" ? e : null;
  }
  if (t.length == 2) {
    const [e, n] = t;
    if (typeof e == "string" && n != null)
      return { title: e, body: n };
  }
  return null;
}
function Qe(...t) {
  const e = Ye(t);
  return e == null ? (console.error("[xWindow]: 参数有误"), null) : je(e);
}
function je(t) {
  if (!Dt())
    return console.error("[xWindow] 需要先创建`WindowManager`组件，见文档 " + Ft + " 。"), null;
  const { displayAfterCreate: e, unmountAfterClose: n, afterUnmount: u, ...r } = t, s = {
    uid: null,
    visible: z(e !== !1),
    isUnmounted: !1
  }, i = () => s.visible.value = !0, o = () => {
    s.visible.value = !1, n !== !1 && l();
  }, l = () => {
    s.visible.value && o(), st(s.uid), H(dt);
  }, w = Object.assign({}, r, {
    visible: s.visible,
    [Ht](_) {
      _ ? i() : o();
    },
    [Ut]() {
      s.isUnmounted = !0;
    },
    [Gt]() {
      typeof u == "function" && u();
    }
  });
  return s.uid = qt(x.create(w)), {
    uid: s.uid,
    get isUnmounted() {
      return s.isUnmounted;
    },
    get visible() {
      return s.visible.value;
    },
    show: i,
    close: o,
    unmount: l
  };
}
function De(t, e) {
  t.component(U.name, U), t.component(R.name, R), t.component(Q.name, Q), ne(e);
}
const Ve = kt, Ae = { install: De, version: Ve };
export {
  R as BlankWindow,
  b as ComponentStates,
  U as SimpleWindow,
  Q as WindowManager,
  Ae as default,
  De as install,
  Je as useIcons,
  Qe as useWindow,
  qe as useWindowApi,
  Ke as useWindowManager,
  Ve as version,
  Ae as xWindow
};
