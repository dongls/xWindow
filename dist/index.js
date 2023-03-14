/*! @dongls/xWindow v0.0.5 https://github.com/dongls/xWindow
Copyright 2023-present dongls
Released under the MIT License */
var Bt = Object.defineProperty;
var yt = (t, e, o) => e in t ? Bt(t, e, { enumerable: !0, configurable: !0, writable: !0, value: o }) : t[e] = o;
var v = (t, e, o) => (yt(t, typeof e != "symbol" ? e + "" : e, o), o);
import { shallowRef as Nt, ref as z, inject as tt, getCurrentInstance as et, h as U, createVNode as g, defineComponent as R, reactive as zt, computed as N, watch as Rt, onBeforeUnmount as nt, onUnmounted as Ft, provide as Wt, Teleport as ot, isVNode as x, nextTick as C, mergeProps as Ht, Transition as xt } from "vue";
const Gt = "https://github.com/dongls/xWindow", Pt = "0.0.5", Ct = "onUpdate:visible", kt = "onBeforeUnmount", Ut = "onUnmount", j = Symbol(), S = Object.freeze({
  INIT: 0,
  MOUNTED: 1,
  UNMOUNTED: 2
});
var _ = /* @__PURE__ */ ((t) => (t[t.TOP = 0] = "TOP", t[t.BOTTOM = 1] = "BOTTOM", t[t.LEFT = 2] = "LEFT", t[t.RIGHT = 3] = "RIGHT", t[t.LEFT_TOP = 4] = "LEFT_TOP", t[t.LEFT_BOTTOM = 5] = "LEFT_BOTTOM", t[t.RIGHT_TOP = 6] = "RIGHT_TOP", t[t.RIGHT_BOTTOM = 7] = "RIGHT_BOTTOM", t))(_ || {});
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
}, p = Object.freeze({
  NONE: 0,
  TOP: 1,
  RIGHT: 1 << 1,
  BOTTOM: 1 << 2,
  LEFT: 1 << 3
}), n = Object.freeze({
  NONE: p.NONE,
  FULLSCREEN: p.TOP,
  LEFT: p.LEFT,
  RIGHT: p.RIGHT,
  TOP_LEFT: p.TOP | p.LEFT,
  TOP_RIGHT: p.TOP | p.RIGHT,
  BOTTOM_LEFT: p.BOTTOM | p.LEFT,
  BOTTOM_RIGHT: p.BOTTOM | p.RIGHT
});
let jt = 1e3;
class L {
  /** 统一使用`UID.create`方法创建 */
  constructor() {
    v(this, "value");
    this.value = jt++;
  }
  get wid() {
    return "window--" + this.value;
  }
  static create(e) {
    return e instanceof L ? e : Object.freeze(new L());
  }
}
class W {
  constructor(e) {
    v(this, "uid");
    v(this, "type");
    v(this, "visible");
    v(this, "others");
    v(this, "body");
    const { visible: o, body: u, type: c, ...l } = e;
    this.uid = L.create(), this.type = c, this.visible = o, this.body = u, this.others = l;
  }
  static create(e) {
    return e instanceof W ? e : new W(e);
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
  const { clientX: e, clientY: o } = t, { innerWidth: u, innerHeight: c } = window;
  let l = p.NONE;
  return o <= 5 && (l |= p.TOP), o >= c - 5 && (l |= p.BOTTOM), e <= 5 && (l |= p.LEFT), e >= u - 5 && (l |= p.RIGHT), l;
}
const d = {
  isMounted: !1,
  zIndex: 1e3,
  stack: /* @__PURE__ */ new Map(),
  ghost: Nt([]),
  options: /* @__PURE__ */ new Map(),
  topWindow: null,
  splitMode: z(n.NONE)
};
function Yt() {
  d.isMounted = !0;
}
function Dt() {
  d.isMounted = !1, d.topWindow = null, d.ghost.value = [], d.stack.clear(), d.options.clear();
}
function Vt() {
  return d.isMounted;
}
function it() {
  return d.zIndex;
}
function st() {
  return d.zIndex += 2;
}
function Zt() {
  const t = d.topWindow;
  return t ? t.zIndex : 1;
}
function $t(t) {
  typeof t == "number" && Number.isFinite(t) && (d.zIndex = Math.floor(t));
}
function F() {
  return d.topWindow;
}
function Kt(t, e) {
  d.stack.set(t, e);
}
function lt(t) {
  d.stack.delete(t), d.options.delete(t);
  const e = d.ghost.value.indexOf(t);
  if (e >= 0) {
    const o = d.ghost.value;
    o.splice(e, 1), d.ghost.value = o.slice();
  }
}
function rt() {
  d.stack.size == 0 || d.topWindow == null || d.topWindow.close();
}
function At(t) {
  return d.options.get(t);
}
function qt(t) {
  const e = d.ghost.value;
  return e.push(t.uid), d.ghost.value = e.slice(), d.options.set(t.uid, t), t.uid;
}
function Jt(t) {
  return d.stack.get(t);
}
function ut() {
  return d.ghost;
}
function ct(t) {
  if (d.topWindow = t, t != null) {
    for (const e of d.stack.values()) {
      const o = e.windowState;
      o.focused = e === t;
    }
    t.zIndex < it() && (t.zIndex = st());
  }
}
function dt(t) {
  const e = d.stack.get(t);
  ct(e);
}
function ft() {
  const t = Qt();
  ct(t);
}
function Qt() {
  return d.stack.size == 0 ? null : Array.from(d.stack.values()).filter((e) => e.visible).sort((e, o) => o.zIndex - e.zIndex)[0];
}
function te(t) {
  const e = Xt(t);
  return d.splitMode.value = e, e;
}
function ee() {
  return d.splitMode.value = n.NONE, n.NONE;
}
function ne() {
  return d.splitMode;
}
function ln() {
  return {
    closeTopWindow: rt,
    getTopZIndex: st,
    getWindowApi: Jt,
    getZIndex: it,
    setFocusedWindow: dt
  };
}
function oe(t) {
  $t(t == null ? void 0 : t.zIndex);
}
function rn() {
  return tt(j);
}
const ie = "_window_d2gsu_7", se = "_dragging_d2gsu_17", le = "_resizing_d2gsu_17", re = "_fullscreen_d2gsu_21", ue = "_focused_d2gsu_31", ce = "_header_d2gsu_34", de = "_main_d2gsu_38", fe = "_init_d2gsu_45", ae = "_title_d2gsu_63", Te = "_menus_d2gsu_73", we = "_body_d2gsu_79", ge = "_footer_d2gsu_84", pe = "_menu_d2gsu_73", _e = "_closeMenu_d2gsu_135 _menu_d2gsu_73", he = "_pinMenu_d2gsu_146 _menu_d2gsu_73", Oe = "_logo_d2gsu_153", Me = "_resize_d2gsu_165", Le = "_resizeBar_d2gsu_169", Ee = "_resizeTop_d2gsu_174 _resizeBar_d2gsu_169", me = "_resizeBottom_d2gsu_175 _resizeBar_d2gsu_169", Ie = "_resizeRight_d2gsu_191 _resizeBar_d2gsu_169", ve = "_resizeLeft_d2gsu_192 _resizeBar_d2gsu_169", Se = "_resizeLeftTop_d2gsu_208 _resizeBar_d2gsu_169", be = "_resizeLeftBottom_d2gsu_209 _resizeBar_d2gsu_169", Be = "_resizeRightTop_d2gsu_210 _resizeBar_d2gsu_169", ye = "_resizeRightBottom_d2gsu_211 _resizeBar_d2gsu_169", Ne = "_mask_d2gsu_241", a = {
  window: ie,
  dragging: se,
  resizing: le,
  fullscreen: re,
  focused: ue,
  header: ce,
  main: de,
  init: fe,
  title: ae,
  menus: Te,
  body: we,
  footer: ge,
  menu: pe,
  closeMenu: _e,
  pinMenu: he,
  logo: Oe,
  resize: Me,
  resizeBar: Le,
  resizeTop: Ee,
  resizeBottom: me,
  resizeRight: Ie,
  resizeLeft: ve,
  resizeLeftTop: Se,
  resizeLeftBottom: be,
  resizeRightTop: Be,
  resizeRightBottom: ye,
  mask: Ne
}, at = '<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M590.265 511.987l305.521-305.468c21.617-21.589 21.617-56.636.027-78.252-21.616-21.617-56.663-21.617-78.279 0L512.012 433.735 206.544 128.213c-21.617-21.617-56.635-21.617-78.252 0-21.616 21.589-21.616 56.635-.027 78.252L433.76 511.987 128.211 817.482c-21.617 21.59-21.617 56.635 0 78.251 10.808 10.81 24.967 16.213 39.125 16.213 14.159 0 28.318-5.403 39.126-16.213l305.522-305.468L817.48 895.788C828.289 906.597 842.447 912 856.606 912s28.317-5.403 39.125-16.212c21.618-21.59 21.618-56.636.028-78.252L590.265 511.987z"/></svg>', Tt = '<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M928.7 135.8H99.8c-21.15 0-37.8 17.55-37.8 35.1v685.35c0 17.55 17.1 31.5 37.8 31.5h828.45c21.15 0 33.3-14.4 33.3-31.5v-684.9c.45-17.55-12.15-35.55-32.85-35.55zm-53.1 666.9H147.5V222.2h728.1v580.5z"/></svg>', wt = '<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M38.794 124.791v778.495h946.412V124.791H38.794zm896.678 728.033H89.292v-460.9h846.18v460.9z"/></svg>', gt = '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M738.793 681.382v-48.331l88.242-88.243a298.676 298.676 0 00156.712-83.482 38.836 38.836 0 000-54.923l-366.15-366.15a38.836 38.836 0 00-54.923 0 298.52 298.52 0 00-83.519 156.749l-88.169 88.169h-48.332a411.145 411.145 0 00-292.59 121.232c-15.16 15.159-15.16 39.764 0 54.923L278.906 690.17 86.642 882.436a38.836 38.836 0 1054.922 54.922l192.23-192.229 228.844 228.845a38.836 38.836 0 0054.922 0 411.042 411.042 0 00121.233-292.592zM134.02 435.44a333.473 333.473 0 01208.56-72.571l64.406.037a38.836 38.836 0 0027.461-11.351L544.292 241.71a38.68 38.68 0 0011.351-27.462 180.096 180.096 0 0136.798-89.01L898.8 431.593a180.925 180.925 0 01-89.12 36.835 38.836 38.836 0 00-27.462 11.35L672.373 589.626c-7.287 7.286-11.387 17.173-11.35 27.461l.036 64.406a333.318 333.318 0 01-72.608 208.596L134.021 435.44z"/></svg>';
function un() {
  return {
    IconClose: at,
    IconMax: Tt,
    IconPin: gt,
    IconWindow: wt
  };
}
function O(t, e, o) {
  return e != null && Number.isFinite(e) && t < e ? e : o != null && Number.isFinite(o) && t > o ? o : t;
}
function K(t) {
  return t == null || typeof t != "string" ? !0 : t.length == 0;
}
const A = "__xWindow_resize_prop__", B = 360, y = 32;
function q(t, e, o) {
  const u = e.getBoundingClientRect(), c = document.documentElement.getBoundingClientRect();
  if (o.direction == _.TOP) {
    const l = t.clientY - c.top;
    return {
      height: O(u.bottom - t.clientY, y),
      top: l
    };
  }
  if (o.direction == _.BOTTOM) {
    const l = O(t.clientY - u.top, y), s = t.clientY - l - c.top;
    return {
      height: l,
      top: s
    };
  }
  if (o.direction == _.LEFT) {
    const l = O(u.right - t.clientX, B), s = t.clientX - c.left;
    return {
      width: l,
      left: s
    };
  }
  if (o.direction == _.RIGHT) {
    const l = O(t.clientX - u.left, B), s = t.clientX - l - c.left;
    return {
      width: l,
      left: s
    };
  }
  if (o.direction == _.LEFT_TOP) {
    const l = t.clientY - c.top, s = t.clientX - c.left, i = O(u.right - t.clientX, B), r = O(u.bottom - t.clientY, y);
    return {
      top: l,
      left: s,
      width: i,
      height: r
    };
  }
  if (o.direction == _.LEFT_BOTTOM) {
    const l = O(t.clientY - u.top, y), s = O(u.right - t.clientX, B), i = t.clientY - l - c.top, r = t.clientX - c.left;
    return {
      top: i,
      left: r,
      width: s,
      height: l
    };
  }
  if (o.direction == _.RIGHT_TOP) {
    const l = O(t.clientX - u.left, B), s = O(u.bottom - t.clientY, y), i = t.clientY - c.top, r = t.clientX - l - c.left;
    return {
      top: i,
      left: r,
      width: l,
      height: s
    };
  }
  if (o.direction == _.RIGHT_BOTTOM) {
    const l = O(t.clientY - u.top, y), s = O(t.clientX - u.left, B), i = t.clientY - l - c.top, r = t.clientX - s - c.left;
    return {
      top: i,
      left: r,
      width: s,
      height: l
    };
  }
  return null;
}
function ze(t) {
  const e = et(), o = [[a.resizeTop, _.TOP], [a.resizeBottom, _.BOTTOM], [a.resizeLeft, _.LEFT], [a.resizeRight, _.RIGHT], [a.resizeLeftTop, _.LEFT_TOP], [a.resizeLeftBottom, _.LEFT_BOTTOM], [a.resizeRightTop, _.RIGHT_TOP], [a.resizeRightBottom, _.RIGHT_BOTTOM]], u = {
    init: !1,
    direction: -1,
    top: 0,
    left: 0,
    width: 0,
    height: 0
  };
  function c(r) {
    r.preventDefault(), r.stopPropagation(), u.init = !1, u.direction = r.target[A], u.top = t.windowState.top, u.left = t.windowState.left, u.width = t.windowState.width, u.height = t.windowState.height, window.addEventListener("mousemove", l), window.addEventListener("mouseup", s);
  }
  function l(r) {
    r.preventDefault();
    const T = e == null ? void 0 : e.refs.window;
    u.init || (T.classList.add(a.resizing), u.init = !0), t.windowState.splitMode != n.NONE && (u.top = t.windowState.top, u.left = t.windowState.left, u.width = t.windowState.width, u.height = t.windowState.height);
    const h = q(r, T, u);
    if (h != null)
      for (const M in h) {
        const b = Math.round(h[M]);
        Reflect.set(u, M, b), Reflect.set(T.style, M, b + "px");
      }
  }
  function s(r) {
    if (r.preventDefault(), u.init) {
      const T = e == null ? void 0 : e.refs.window;
      q(r, T, u) != null && (t.windowState.top = u.top, t.windowState.left = u.left, t.windowState.width = u.width, t.windowState.height = u.height, t.saveWindowState()), T.classList.remove(a.resizing);
    }
    window.removeEventListener("mousemove", l), window.removeEventListener("mouseup", s);
  }
  const i = o.map((r) => U("div", {
    className: r[0],
    ["." + A]: r[1]
  }));
  return g("div", {
    class: a.resize,
    onMousedown: c
  }, [i]);
}
function Re(t) {
  const e = et(), o = {
    init: !1,
    left: 0,
    top: 0,
    prevClientX: 0,
    prevClientY: 0,
    splitMode: n.NONE
  };
  function u(s) {
    const r = (e == null ? void 0 : e.refs.window).getBoundingClientRect();
    s.clientY - r.top > 30 || (s.preventDefault(), o.init = !1, o.left = t.windowState.left, o.top = t.windowState.top, o.prevClientX = s.clientX, o.prevClientY = s.clientY, window.addEventListener("mousemove", c), window.addEventListener("mouseup", l));
  }
  function c(s) {
    s.preventDefault();
    const i = e == null ? void 0 : e.refs.window;
    o.init || (i.classList.add(a.dragging), o.init = !0), t.windowState.splitMode != n.NONE && (t.exitSplitMode(s), o.left = t.windowState.left, o.top = t.windowState.top), o.left = Math.round(o.left + s.clientX - o.prevClientX), o.top = Math.round(o.top + s.clientY - o.prevClientY), o.prevClientX = s.clientX, o.prevClientY = s.clientY, i.style.left = o.left + "px", i.style.top = o.top + "px", o.splitMode = te(s);
  }
  function l(s) {
    if (s.preventDefault(), o.init) {
      const i = e == null ? void 0 : e.refs.window;
      t.windowState.top = o.top, t.windowState.left = o.left, o.splitMode !== n.NONE && (t.windowState.splitMode = o.splitMode, ee()), i.classList.remove(a.dragging);
    }
    window.removeEventListener("mousemove", c), window.removeEventListener("mouseup", l);
  }
  return { dragStart: u };
}
const Fe = /* @__PURE__ */ R({
  name: "WindowBody",
  props: {
    uid: L,
    body: {
      default: null
    }
  },
  setup(t) {
    const e = tt(j);
    return function() {
      return typeof t.body == "function" ? t.body(e) : t.body;
    };
  }
});
function We(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !x(t);
}
const He = Math.floor(Number.MAX_SAFE_INTEGER / 1e3);
function xe() {
  return {
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    focused: !1,
    pinned: !1,
    splitMode: n.NONE
  };
}
const pt = /* @__PURE__ */ R({
  name: "BaseWindow",
  props: {
    ...X,
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
    emit: e,
    expose: o,
    slots: u
  }) {
    const c = L.create(t.uid), l = z(S.INIT), s = z(0), i = zt(xe()), r = {
      width: 0,
      height: 0
    }, T = N(() => t.draggable && t.resizable), h = N(() => typeof t.zIndex == "number" && t.zIndex > 0 ? t.zIndex : (i.pinned ? He : 0) + s.value), M = {
      get uid() {
        return c;
      },
      get visible() {
        return t.visible;
      },
      get windowState() {
        return i;
      },
      get zIndex() {
        return h.value;
      },
      get menus() {
        return V();
      },
      set zIndex(f) {
        s.value = f;
      },
      exitSplitMode: vt,
      close: G,
      saveWindowState: D
    }, b = t.draggable ? Re(M) : null, _t = T.value ? ze(M) : null, ht = N(() => {
      const f = [a.window];
      return l.value == S.INIT && f.push(a.init), i.splitMode == n.FULLSCREEN && f.push(a.fullscreen), i.focused && f.push(a.focused), f;
    }), Ot = N(() => {
      if (l.value == S.INIT)
        return {
          width: t.width,
          height: t.height,
          left: t.left,
          top: t.top
        };
      const f = t.mask ? null : h.value, w = i.splitMode;
      return w == n.FULLSCREEN ? {
        zIndex: f
      } : w === n.LEFT || w === n.RIGHT ? {
        top: 0,
        left: i.splitMode == n.RIGHT ? "50vw" : 0,
        width: "50vw",
        height: "100vh",
        zIndex: f
      } : w == n.TOP_LEFT || w == n.TOP_RIGHT || w == n.BOTTOM_LEFT || w == n.BOTTOM_RIGHT ? {
        top: w == n.TOP_LEFT || w == n.TOP_RIGHT ? 0 : null,
        left: w == n.TOP_LEFT || w == n.BOTTOM_LEFT ? 0 : null,
        right: w == n.TOP_RIGHT || w == n.BOTTOM_RIGHT ? 0 : null,
        bottom: w == n.BOTTOM_LEFT || w == n.BOTTOM_RIGHT ? 0 : null,
        width: "50vw",
        height: "50vh",
        zIndex: f
      } : {
        top: i.top + "px",
        left: i.left + "px",
        width: i.width + "px",
        height: l.value == S.INIT ? null : i.height + "px",
        zIndex: f
      };
    });
    async function Mt(f) {
      await C();
      const m = f.el.getBoundingClientRect();
      if (l.value == S.INIT) {
        const P = ut().value.length;
        let Z = m.left, $ = m.top;
        K(t.left) && (Z = (window.innerWidth - m.width) / 2), K(t.top) && ($ = window.innerHeight * 0.18 + P * 30), i.width = m.width, i.height = m.height, i.left = Z, i.top = $, l.value = S.MOUNTED, D();
      }
      Y();
    }
    function G(f) {
      t.closeable && (f == null || f.stopPropagation(), e("update:visible", !1));
    }
    function Lt() {
      i.focused = !1, C(ft);
    }
    function Et(f) {
      f.stopPropagation();
    }
    function Y() {
      i.focused || dt(c);
    }
    function mt() {
      i.splitMode = i.splitMode == n.FULLSCREEN ? n.NONE : n.FULLSCREEN;
    }
    function It() {
      i.pinned = !i.pinned;
    }
    function D() {
      r.width = i.width, r.height = i.height;
    }
    function vt(f) {
      i.top = f.clientY - 15, i.left = f.clientX - r.width / 2, i.width = r.width, i.height = r.height, i.splitMode = n.NONE;
    }
    function St(f) {
      f.stopPropagation();
    }
    const bt = Rt(() => t.visible, () => {
      t.visible || Lt();
    });
    Kt(c, M), nt(() => {
      e("beforeUnmount"), G(), lt(c);
    }), Ft(() => {
      e("unmount"), bt(), l.value = S.UNMOUNTED;
    }), Wt(j, M), o(M);
    function V() {
      const f = [];
      return t.mask !== !0 && f.push(g("button", {
        onClick: It,
        type: "button",
        innerHTML: gt,
        class: i.pinned ? a.pinMenu : a.menu,
        title: "固定"
      }, null)), T.value && f.push(g("button", {
        onClick: mt,
        type: "button",
        innerHTML: Tt,
        class: a.menu,
        title: "最大化"
      }, null)), t.closeable && f.push(g("button", {
        onClick: G,
        type: "button",
        innerHTML: at,
        class: a.closeMenu,
        title: "关闭"
      }, null)), f.length == 0 ? null : g("div", {
        class: a.menus,
        onMousedown: Et
      }, [f]);
    }
    return function() {
      if (!t.visible)
        return null;
      const f = typeof u.header == "function" ? u.header(V()) : null, w = g("div", {
        class: a.main,
        onMousedown: b == null ? void 0 : b.dragStart
      }, [f, g("div", {
        class: a.body,
        onClick: St
      }, [g(Fe, {
        body: t.body,
        key: c.wid,
        uid: c
      }, null)])]), m = {
        ref: "window",
        id: t.id ?? c.wid,
        onVnodeMounted: Mt,
        onMousedownCapture: Y,
        class: ht.value,
        style: Ot.value
      };
      let I = U("div", m, [w, _t]);
      if (t.mask === !0) {
        const P = {
          zIndex: h.value
        };
        I = g("div", {
          class: a.mask,
          style: P
        }, [I]);
      }
      return t.appendToBody ? g(ot, {
        to: "body"
      }, We(I) ? I : {
        default: () => [I]
      }) : I;
    };
  }
});
function Ge(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !x(t);
}
const k = /* @__PURE__ */ R({
  name: "SimpleWindow",
  props: {
    ...X
  },
  setup(t, {
    slots: e,
    attrs: o
  }) {
    const {
      uid: u,
      ...c
    } = o, l = L.create(o.uid), s = z(null);
    function i(T) {
      T.preventDefault();
      const h = s.value;
      if (h == null)
        return;
      const M = h.windowState.splitMode;
      h.windowState.splitMode = M == n.FULLSCREEN ? n.NONE : n.FULLSCREEN;
    }
    const r = {
      header(T) {
        return g("div", {
          class: a.header,
          onDblclick: i
        }, [g("i", {
          class: a.logo,
          innerHTML: wt
        }, null), g("div", {
          class: a.title
        }, [t.title ?? "新窗口"]), T]);
      }
    };
    return function() {
      const T = {
        ...t,
        ...c,
        uid: l,
        body: e.default
      };
      return g(pt, Ht(T, {
        ref: s
      }), Ge(r) ? r : {
        default: () => [r]
      });
    };
  }
});
function Pe(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !x(t);
}
const H = /* @__PURE__ */ R({
  name: "BlankWindow",
  props: {
    ...X
  },
  setup(t, {
    slots: e,
    attrs: o
  }) {
    const {
      body: u,
      ...c
    } = e, {
      uid: l,
      ...s
    } = o, i = L.create(o.uid);
    return function() {
      const r = {
        ...t,
        ...s,
        uid: i,
        body: e.default
      };
      return g(pt, r, Pe(c) ? c : {
        default: () => [c]
      });
    };
  }
});
const Ce = "_splitWindowMask_348ej_1", ke = "_fullscreen_348ej_9", Ue = "_splitLeft_348ej_16", je = "_splitRight_348ej_23", Xe = "_splitTopLeft_348ej_30", Ye = "_splitTopRight_348ej_37", De = "_splitBottomLeft_348ej_44", Ve = "_splitBottomRight_348ej_51", E = {
  splitWindowMask: Ce,
  fullscreen: ke,
  splitLeft: Ue,
  splitRight: je,
  splitTopLeft: Xe,
  splitTopRight: Ye,
  splitBottomLeft: De,
  splitBottomRight: Ve
};
function Ze(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !x(t);
}
const $e = {
  [n.FULLSCREEN]: E.fullscreen,
  [n.LEFT]: E.splitLeft,
  [n.RIGHT]: E.splitRight,
  [n.TOP_LEFT]: E.splitTopLeft,
  [n.TOP_RIGHT]: E.splitTopRight,
  [n.BOTTOM_LEFT]: E.splitBottomLeft,
  [n.BOTTOM_RIGHT]: E.splitBottomRight
};
function J(t) {
  return t == n.BOTTOM_LEFT ? n.LEFT : t == n.BOTTOM_RIGHT ? n.RIGHT : t == n.LEFT ? n.TOP_LEFT : t == n.RIGHT ? n.TOP_RIGHT : n.FULLSCREEN;
}
function Ke(t) {
  return t == n.TOP_LEFT ? n.LEFT : t == n.TOP_RIGHT ? n.RIGHT : t == n.LEFT ? n.BOTTOM_LEFT : t == n.RIGHT ? n.BOTTOM_RIGHT : n.NONE;
}
function Ae(t) {
  return t == n.TOP_RIGHT ? n.TOP_LEFT : t == n.BOTTOM_RIGHT ? n.BOTTOM_LEFT : t == n.TOP_LEFT ? n.TOP_RIGHT : t == n.BOTTOM_LEFT ? n.BOTTOM_RIGHT : n.LEFT;
}
function qe(t) {
  return t == n.TOP_LEFT ? n.TOP_RIGHT : t == n.BOTTOM_LEFT ? n.BOTTOM_RIGHT : t == n.TOP_RIGHT ? n.TOP_LEFT : t == n.BOTTOM_RIGHT ? n.BOTTOM_LEFT : n.RIGHT;
}
function Je() {
  rt();
}
const Q = /* @__PURE__ */ R({
  name: "WindowManager",
  setup() {
    const t = ut(), e = ne();
    function o(s) {
      const i = s.key;
      if (i == "Escape")
        return Je();
      if (s.ctrlKey && i == "ArrowUp") {
        const r = F(), T = J(r.windowState.splitMode);
        console.log(T), r.windowState.splitMode = J(r.windowState.splitMode);
        return;
      }
      if (s.ctrlKey && i == "ArrowDown") {
        const r = F();
        r.windowState.splitMode = Ke(r.windowState.splitMode);
        return;
      }
      if (s.ctrlKey && i == "ArrowLeft") {
        const r = F();
        r.windowState.splitMode = Ae(r.windowState.splitMode);
        return;
      }
      if (s.ctrlKey && i == "ArrowRight") {
        const r = F();
        r.windowState.splitMode = qe(r.windowState.splitMode);
        return;
      }
    }
    Yt(), window.addEventListener("keydown", o, !0), nt(() => {
      Dt(), window.removeEventListener("keydown", o, !0);
    });
    function u(s) {
      return s == H.name ? H : k;
    }
    const c = N(() => {
      const s = [E.splitWindowMask], i = $e[e.value];
      return i != null && s.push(i), s;
    });
    function l() {
      let s = null;
      if (e.value != n.NONE) {
        const r = {
          zIndex: Zt() + 1
        };
        s = g("div", {
          class: c.value,
          style: r
        }, null);
      }
      return g(ot, {
        to: "body"
      }, {
        default: () => [g(xt, {
          name: "fade"
        }, Ze(s) ? s : {
          default: () => [s]
        })]
      });
    }
    return function() {
      return [...t.value.map((i) => {
        const r = At(i);
        if (r == null)
          return;
        const T = u(r.type);
        return U(T, r.buildProps());
      }), l()];
    };
  }
});
function Qe(t) {
  if (t.length == 1) {
    const e = t[0];
    return e == null ? null : typeof e == "object" ? e : null;
  }
  if (t.length == 2) {
    const [e, o] = t;
    if (typeof e == "string" && o != null)
      return { title: e, body: o };
  }
  return null;
}
function cn(...t) {
  const e = Qe(t);
  return e == null ? (console.error("[xWindow]: 参数有误"), null) : tn(e);
}
function tn(t) {
  if (!Vt())
    return console.error("[xWindow] 需要先创建`WindowManager`组件，见文档 " + Gt + " 。"), null;
  const { displayAfterCreate: e, unmountAfterClose: o, afterUnmount: u, ...c } = t, l = {
    uid: null,
    visible: z(e !== !1),
    isUnmounted: !1
  }, s = () => l.visible.value = !0, i = () => {
    l.visible.value = !1, o !== !1 && r();
  }, r = () => {
    l.visible.value && i(), lt(l.uid), C(ft);
  }, T = Object.assign({}, c, {
    visible: l.visible,
    [Ct](h) {
      h ? s() : i();
    },
    [kt]() {
      l.isUnmounted = !0;
    },
    [Ut]() {
      typeof u == "function" && u();
    }
  });
  return l.uid = qt(W.create(T)), {
    uid: l.uid,
    get isUnmounted() {
      return l.isUnmounted;
    },
    get visible() {
      return l.visible.value;
    },
    show: s,
    close: i,
    unmount: r
  };
}
function en(t, e) {
  t.component(k.name, k), t.component(H.name, H), t.component(Q.name, Q), oe(e);
}
const nn = Pt, dn = { install: en, version: nn };
export {
  H as BlankWindow,
  S as ComponentStates,
  k as SimpleWindow,
  Q as WindowManager,
  dn as default,
  en as install,
  un as useIcons,
  cn as useWindow,
  rn as useWindowApi,
  ln as useWindowManager,
  nn as version,
  dn as xWindow
};
