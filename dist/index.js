/*! @dongls/xWindow v0.0.6 https://github.com/dongls/xWindow
Copyright 2023-present dongls
Released under the MIT License */
var Ut = Object.defineProperty;
var jt = (t, n, e) => n in t ? Ut(t, n, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[n] = e;
var W = (t, n, e) => (jt(t, typeof n != "symbol" ? n + "" : n, e), e);
import { shallowRef as Dt, reactive as X, inject as ft, getCurrentInstance as V, h as $, createVNode as _, defineComponent as H, ref as G, computed as z, watch as Xt, onBeforeUnmount as wt, onUnmounted as Yt, provide as Zt, Teleport as Tt, isVNode as k, nextTick as Y, mergeProps as Vt, Transition as $t } from "vue";
const Kt = "https://github.com/dongls/xWindow", Jt = "0.0.6", Qt = "onUpdate:visible", At = "onBeforeUnmount", te = "onUnmount", K = Symbol(), b = Object.freeze({
  INIT: 0,
  MOUNTED: 1,
  UNMOUNTED: 2
}), J = {
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
  /** 是否包含遮罩层，默认为`false` */
  mask: {
    type: Boolean,
    default: !1
  }
}, T = Object.freeze({
  NONE: 0,
  TOP: 1 << 0,
  BOTTOM: 1 << 1,
  LEFT: 1 << 2,
  RIGHT: 1 << 3
}), S = Object.freeze({
  TOP: T.TOP,
  BOTTOM: T.BOTTOM,
  LEFT: T.LEFT,
  RIGHT: T.RIGHT,
  TOP_LEFT: T.TOP | T.LEFT,
  TOP_RIGHT: T.TOP | T.RIGHT,
  BOTTOM_LEFT: T.BOTTOM | T.LEFT,
  BOTTOM_RIGHT: T.BOTTOM | T.RIGHT
}), i = Object.freeze({
  NONE: T.NONE,
  FULLSCREEN: T.TOP,
  LEFT: T.LEFT,
  RIGHT: T.RIGHT,
  TOP_LEFT: T.TOP | T.LEFT,
  TOP_RIGHT: T.TOP | T.RIGHT,
  BOTTOM_LEFT: T.BOTTOM | T.LEFT,
  BOTTOM_RIGHT: T.BOTTOM | T.RIGHT
});
let ee = 1e3;
class E {
  /** 统一使用`UID.create`方法创建 */
  constructor() {
    W(this, "value");
    this.value = ee++;
  }
  get wid() {
    return "window--" + this.value;
  }
  static create(n) {
    return n instanceof E ? n : Object.freeze(new E());
  }
}
class x {
  constructor(n) {
    W(this, "uid");
    W(this, "type");
    W(this, "visible");
    W(this, "others");
    W(this, "body");
    const { visible: e, body: a, type: d, ...r } = n;
    this.uid = E.create(), this.type = d, this.visible = e, this.body = a, this.others = r;
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
function ne(t) {
  const { clientX: n, clientY: e } = t, { innerWidth: a, innerHeight: d } = window;
  let r = T.NONE;
  return e <= 5 && (r |= T.TOP), e >= d - 5 && (r |= T.BOTTOM), n <= 5 && (r |= T.LEFT), n >= a - 5 && (r |= T.RIGHT), r;
}
const u = {
  isMounted: !1,
  zIndex: 1e3,
  stack: /* @__PURE__ */ new Map(),
  ghost: Dt([]),
  options: /* @__PURE__ */ new Map(),
  topWindow: null,
  previewState: X({
    mode: i.NONE,
    width: null,
    height: null
  })
};
function ie() {
  u.isMounted = !0;
}
function oe() {
  u.isMounted = !1, u.topWindow = null, u.ghost.value = [], u.stack.clear(), u.options.clear();
}
function se() {
  return u.isMounted;
}
function ht() {
  return u.zIndex;
}
function pt() {
  return u.zIndex += 1;
}
function le() {
  const t = u.topWindow;
  return t ? t.zIndex : 1;
}
function re(t) {
  typeof t == "number" && Number.isFinite(t) && (u.zIndex = Math.floor(t));
}
function ue() {
  return u.topWindow;
}
function de(t, n) {
  u.stack.set(t, n);
}
function _t(t) {
  u.stack.delete(t), u.options.delete(t);
  const n = u.ghost.value.indexOf(t);
  if (n >= 0) {
    const e = u.ghost.value;
    e.splice(n, 1), u.ghost.value = e.slice();
  }
}
function gt() {
  u.stack.size == 0 || u.topWindow == null || u.topWindow.close();
}
function ce(t) {
  return u.options.get(t);
}
function ae(t) {
  const n = u.ghost.value;
  return n.push(t.uid), u.ghost.value = n.slice(), u.options.set(t.uid, t), t.uid;
}
function fe(t) {
  return u.stack.get(t);
}
function Ot() {
  return u.ghost;
}
function mt(t) {
  if (u.topWindow = t, t != null) {
    for (const n of u.stack.values()) {
      const e = n.windowState;
      e.focused = n === t;
    }
    t.zIndex < ht() && (t.zIndex = pt());
  }
}
function Et(t) {
  const n = u.stack.get(t);
  mt(n);
}
function Lt() {
  const t = we();
  mt(t);
}
function we() {
  return u.stack.size == 0 ? null : Array.from(u.stack.values()).filter((n) => n.visible).sort((n, e) => e.zIndex - n.zIndex)[0];
}
function Te(t) {
  let n = null;
  const e = ne(t);
  if (u.previewState.mode = e, (e == i.LEFT || e == i.RIGHT) && (n = Z(e == i.LEFT ? i.RIGHT : i.LEFT), n)) {
    const a = window.innerWidth - n.getWindowEl().offsetWidth;
    u.previewState.width = a;
  }
  return {
    mode: u.previewState.mode,
    width: u.previewState.width,
    relatedWindow: n
  };
}
function he() {
  return u.previewState.mode = i.NONE, u.previewState.height = null, u.previewState.width = null, i.NONE;
}
function pe() {
  return u.previewState;
}
function Z(t) {
  let n = null;
  for (const e of u.stack.values())
    e.splitState.mode === t && (n == null || e.zIndex > n.zIndex) && (n = e);
  return n;
}
function _e() {
  return u.ghost.value.length;
}
function gn() {
  return {
    closeTopWindow: gt,
    getTopZIndex: pt,
    getWindowApi: fe,
    getZIndex: ht,
    setFocusedWindow: Et,
    getWindowCount: _e
  };
}
function ge(t) {
  re(t == null ? void 0 : t.zIndex);
}
function On() {
  return ft(K);
}
const Oe = "_window_1seq0_7", me = "_dragging_1seq0_17", Ee = "_resizing_1seq0_17", Le = "_fullscreen_1seq0_21", Se = "_focused_1seq0_31", Ie = "_header_1seq0_34", ve = "_menu_1seq0_38", Me = "_logo_1seq0_41", Re = "_main_1seq0_45", We = "_init_1seq0_52", be = "_title_1seq0_70", Be = "_menus_1seq0_80", ze = "_body_1seq0_86", Ne = "_footer_1seq0_91", ye = "_closeMenu_1seq0_142 _menu_1seq0_38", Fe = "_pinMenu_1seq0_153 _menu_1seq0_38", He = "_resize_1seq0_172", Pe = "_resizeBar_1seq0_176", Ge = "_resizeTop_1seq0_181 _resizeBar_1seq0_176", xe = "_resizeBottom_1seq0_182 _resizeBar_1seq0_176", Ce = "_resizeRight_1seq0_198 _resizeBar_1seq0_176", ke = "_resizeLeft_1seq0_199 _resizeBar_1seq0_176", qe = "_resizeTopLeft_1seq0_215 _resizeBar_1seq0_176", Ue = "_resizeBottomLeft_1seq0_216 _resizeBar_1seq0_176", je = "_resizeTopRight_1seq0_217 _resizeBar_1seq0_176", De = "_resizeBottomRight_1seq0_218 _resizeBar_1seq0_176", Xe = "_mask_1seq0_248", w = {
  window: Oe,
  dragging: me,
  resizing: Ee,
  fullscreen: Le,
  focused: Se,
  header: Ie,
  menu: ve,
  logo: Me,
  main: Re,
  init: We,
  title: be,
  menus: Be,
  body: ze,
  footer: Ne,
  closeMenu: ye,
  pinMenu: Fe,
  resize: He,
  resizeBar: Pe,
  resizeTop: Ge,
  resizeBottom: xe,
  resizeRight: Ce,
  resizeLeft: ke,
  resizeTopLeft: qe,
  resizeBottomLeft: Ue,
  resizeTopRight: je,
  resizeBottomRight: De,
  mask: Xe
}, St = '<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M590.265 511.987l305.521-305.468c21.617-21.589 21.617-56.636.027-78.252-21.616-21.617-56.663-21.617-78.279 0L512.012 433.735 206.544 128.213c-21.617-21.617-56.635-21.617-78.252 0-21.616 21.589-21.616 56.635-.027 78.252L433.76 511.987 128.211 817.482c-21.617 21.59-21.617 56.635 0 78.251 10.808 10.81 24.967 16.213 39.125 16.213 14.159 0 28.318-5.403 39.126-16.213l305.522-305.468L817.48 895.788C828.289 906.597 842.447 912 856.606 912s28.317-5.403 39.125-16.212c21.618-21.59 21.618-56.636.028-78.252L590.265 511.987z"/></svg>', It = '<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M928.7 135.8H99.8c-21.15 0-37.8 17.55-37.8 35.1v685.35c0 17.55 17.1 31.5 37.8 31.5h828.45c21.15 0 33.3-14.4 33.3-31.5v-684.9c.45-17.55-12.15-35.55-32.85-35.55zm-53.1 666.9H147.5V222.2h728.1v580.5z"/></svg>', vt = '<svg width="64" height="64" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M38.794 124.791v778.495h946.412V124.791H38.794zm896.678 728.033H89.292v-460.9h846.18v460.9z"/></svg>', Mt = '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M738.793 681.382v-48.331l88.242-88.243a298.676 298.676 0 00156.712-83.482 38.836 38.836 0 000-54.923l-366.15-366.15a38.836 38.836 0 00-54.923 0 298.52 298.52 0 00-83.519 156.749l-88.169 88.169h-48.332a411.145 411.145 0 00-292.59 121.232c-15.16 15.159-15.16 39.764 0 54.923L278.906 690.17 86.642 882.436a38.836 38.836 0 1054.922 54.922l192.23-192.229 228.844 228.845a38.836 38.836 0 0054.922 0 411.042 411.042 0 00121.233-292.592zM134.02 435.44a333.473 333.473 0 01208.56-72.571l64.406.037a38.836 38.836 0 0027.461-11.351L544.292 241.71a38.68 38.68 0 0011.351-27.462 180.096 180.096 0 0136.798-89.01L898.8 431.593a180.925 180.925 0 01-89.12 36.835 38.836 38.836 0 00-27.462 11.35L672.373 589.626c-7.287 7.286-11.387 17.173-11.35 27.461l.036 64.406a333.318 333.318 0 01-72.608 208.596L134.021 435.44z"/></svg>';
function mn() {
  return {
    IconClose: St,
    IconMax: It,
    IconPin: Mt,
    IconWindow: vt
  };
}
function O(t, n, e) {
  return n != null && Number.isFinite(n) && t < n ? n : e != null && Number.isFinite(e) && t > e ? e : t;
}
function lt(t) {
  return t == null || typeof t != "string" ? !0 : t.length == 0;
}
const rt = "__xWindow_resize_prop__", B = 360, ut = 32, I = {
  TOP: v(S.TOP),
  BOTTOM: v(S.BOTTOM),
  LEFT: v(S.LEFT),
  RIGHT: v(S.RIGHT),
  TOP_LEFT: v(S.TOP_LEFT),
  TOP_RIGHT: v(S.TOP_RIGHT),
  BOTTOM_LEFT: v(S.BOTTOM_LEFT),
  BOTTOM_RIGHT: v(S.BOTTOM_RIGHT)
}, Ye = [[w.resizeTop, I.TOP], [w.resizeBottom, I.BOTTOM], [w.resizeLeft, I.LEFT], [w.resizeRight, I.RIGHT], [w.resizeTopLeft, I.TOP_LEFT], [w.resizeTopRight, I.TOP_RIGHT], [w.resizeBottomLeft, I.BOTTOM_LEFT], [w.resizeBottomRight, I.BOTTOM_RIGHT]];
function v(t) {
  return t.toString(2).padStart(4, "0");
}
function dt(t, n, e) {
  const a = n.getBoundingClientRect(), d = document.documentElement.getBoundingClientRect(), r = e.relatedWindow != null, s = {};
  if (e.direction[3] == "1") {
    const l = O(a.bottom - O(t.clientY, 0), ut), o = O(t.clientY - d.top, 0, window.innerHeight - l);
    s.height = l, s.top = o;
  }
  if (e.direction[2] == "1") {
    const l = O(O(t.clientY, 0, window.innerHeight) - a.top, ut), o = O(t.clientY - l - d.top, 0, window.innerHeight - l);
    s.height = l, s.top = o;
  }
  if (e.direction[1] == "1") {
    const l = O(a.right - O(t.clientX, 0), B, r ? window.innerWidth - B : window.innerWidth), o = O(t.clientX - d.left, r ? B : 0, window.innerWidth - l);
    s.width = l, s.left = o;
  }
  if (e.direction[0] == "1") {
    const l = O(O(t.clientX, 0) - a.left, B, r ? window.innerWidth - B : window.innerWidth), o = O(t.clientX - l - d.left, 0, window.innerWidth - l - (r ? B : 0));
    s.width = l, s.left = o;
  }
  return s;
}
function Ze(t) {
  const n = V(), e = {
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
    const o = t.windowState, f = t.splitState;
    e.init = !1, e.direction = l.target[rt], e.top = o.top, e.left = o.left, e.width = o.width, e.height = o.height, f.mode == i.LEFT && e.direction == i.RIGHT.toString(2).padStart(4, "0") && (e.relatedWindow = Z(i.RIGHT)), f.mode == i.RIGHT && e.direction == i.LEFT.toString(2).padStart(4, "0") && (e.relatedWindow = Z(i.LEFT)), window.addEventListener("mousemove", d), window.addEventListener("mouseup", r);
  }
  function d(l) {
    l.preventDefault();
    const o = n == null ? void 0 : n.refs.window, f = t.splitState;
    if (e.init || (o.classList.add(w.resizing), e.init = !0), t.splitState.mode != i.NONE) {
      if (e.relatedWindow == null) {
        const p = o.getBoundingClientRect();
        t.windowState.top = p.top, t.windowState.left = p.left, t.windowState.width = p.width, t.windowState.height = p.height, t.splitState.mode = i.NONE;
      }
      e.top = t.windowState.top, e.left = t.windowState.left, e.width = t.windowState.width, e.height = t.windowState.height;
    }
    const h = dt(l, o, e);
    for (const p in h) {
      const m = Math.round(h[p]);
      Reflect.set(e, p, m), Reflect.set(o.style, p, m + "px");
    }
    if (f.mode == i.LEFT || f.mode == i.RIGHT) {
      const p = e.relatedWindow;
      if (p != null) {
        const m = p.getWindowEl();
        Reflect.set(m.style, "width", window.innerWidth - e.width + "px");
      }
    }
  }
  function r(l) {
    if (l.preventDefault(), e.init) {
      const o = n == null ? void 0 : n.refs.window;
      dt(l, o, e) != null && (t.windowState.top = e.top, t.windowState.left = e.left, t.windowState.width = e.width, t.windowState.height = e.height, t.saveWindowState()), o.classList.remove(w.resizing);
      const h = t.splitState;
      if (h.mode == i.LEFT || h.mode == i.RIGHT) {
        const p = e.relatedWindow;
        if (p != null) {
          const m = t.splitState;
          m.width = e.width / window.innerWidth * 100;
          const N = 100 - m.width;
          p.splitState.width = N;
        }
      }
    }
    window.removeEventListener("mousemove", d), window.removeEventListener("mouseup", r);
  }
  const s = Ye.map((l) => $("div", {
    className: l[0],
    ["." + rt]: l[1]
  }));
  return _("div", {
    class: w.resize,
    onMousedown: a
  }, [s]);
}
function Ve(t) {
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
  function a(s) {
    const o = (n == null ? void 0 : n.refs.window).getBoundingClientRect();
    s.clientY - o.top > 30 || (s.preventDefault(), e.init = !1, e.left = t.windowState.left, e.top = t.windowState.top, e.prevClientX = s.clientX, e.prevClientY = s.clientY, window.addEventListener("mousemove", d), window.addEventListener("mouseup", r));
  }
  function d(s) {
    s.preventDefault();
    const l = n == null ? void 0 : n.refs.window;
    e.init || (l.classList.add(w.dragging), e.init = !0), t.splitState.mode != i.NONE && (t.exitSplitMode(s), e.left = t.windowState.left, e.top = t.windowState.top), e.left = Math.round(e.left + s.clientX - e.prevClientX), e.top = Math.round(e.top + s.clientY - e.prevClientY), e.prevClientX = s.clientX, e.prevClientY = s.clientY, l.style.left = e.left + "px", l.style.top = e.top + "px";
    const o = Te(s);
    e.splitMode = o.mode, e.splitWidth = o.width, e.relatedWindow = o.relatedWindow;
  }
  function r(s) {
    if (s.preventDefault(), e.init) {
      const l = n == null ? void 0 : n.refs.window;
      if (t.windowState.top = e.top, t.windowState.left = e.left, e.splitMode !== i.NONE) {
        if (t.splitState.mode = e.splitMode, e.relatedWindow) {
          const o = e.splitWidth / window.innerWidth * 100;
          t.splitState.width = o, e.relatedWindow.splitState.width = 100 - o;
        }
        he();
      }
      l.classList.remove(w.dragging);
    }
    window.removeEventListener("mousemove", d), window.removeEventListener("mouseup", r);
  }
  return { dragStart: a };
}
const $e = /* @__PURE__ */ H({
  name: "WindowBody",
  props: {
    uid: E,
    body: {
      default: null
    }
  },
  setup(t) {
    const n = ft(K);
    return function() {
      return typeof t.body == "function" ? t.body(n) : t.body;
    };
  }
});
function Ke(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !k(t);
}
const Je = Math.floor(Number.MAX_SAFE_INTEGER / 10) - 1e4;
function Qe() {
  return {
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    focused: !1,
    pinned: !1
  };
}
function Ae(t) {
  return {
    mode: t.fullscreen ? i.FULLSCREEN : i.NONE,
    width: 50,
    height: 50
  };
}
function tn(t, n, e, a, d) {
  return z(() => {
    if (n.value == b.INIT)
      return {
        width: t.width,
        height: t.height,
        left: t.left,
        top: t.top
      };
    const r = t.mask ? null : d.value, s = a.mode;
    return s == i.FULLSCREEN ? {
      zIndex: r
    } : s === i.LEFT || s === i.RIGHT ? {
      top: 0,
      left: s == i.LEFT ? 0 : null,
      right: s == i.RIGHT ? 0 : null,
      width: (a.width ?? 50) + "vw",
      height: "100vh",
      zIndex: r
    } : s == i.TOP_LEFT || s == i.TOP_RIGHT || s == i.BOTTOM_LEFT || s == i.BOTTOM_RIGHT ? {
      top: s == i.TOP_LEFT || s == i.TOP_RIGHT ? 0 : null,
      left: s == i.TOP_LEFT || s == i.BOTTOM_LEFT ? 0 : null,
      right: s == i.TOP_RIGHT || s == i.BOTTOM_RIGHT ? 0 : null,
      bottom: s == i.BOTTOM_LEFT || s == i.BOTTOM_RIGHT ? 0 : null,
      width: "50vw",
      height: "50vh",
      zIndex: r
    } : {
      top: e.top + "px",
      left: e.left + "px",
      width: e.width + "px",
      height: n.value == b.INIT ? null : e.height + "px",
      zIndex: r
    };
  });
}
const Rt = /* @__PURE__ */ H({
  name: "BaseWindow",
  props: {
    ...J,
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
    const d = E.create(t.uid), r = V(), s = G(b.INIT), l = G(0), o = X(Qe()), f = X(Ae(t)), h = {
      width: 0,
      height: 0
    }, p = z(() => t.draggable && t.resizable), m = z(() => typeof t.zIndex == "number" && t.zIndex > 0), N = z(() => m.value ? t.zIndex : (o.pinned ? Je : 0) + l.value), y = {
      get uid() {
        return d;
      },
      get visible() {
        return t.visible;
      },
      get windowState() {
        return o;
      },
      get splitState() {
        return f;
      },
      get zIndex() {
        return N.value;
      },
      set zIndex(c) {
        l.value = c;
      },
      exitSplitMode: Gt,
      close: U,
      saveWindowState: nt,
      getWindowEl() {
        return r.refs.window;
      },
      useCssClass: qt,
      useMenus: it
    }, q = t.draggable ? Ve(y) : null, bt = p.value ? Ze(y) : null, Bt = z(() => {
      const c = [w.window];
      return s.value == b.INIT && c.push(w.init), f.mode == i.FULLSCREEN && c.push(w.fullscreen), o.focused && c.push(w.focused), c;
    }), zt = tn(t, s, o, f, N);
    async function Nt(c) {
      await Y();
      const L = c.el.getBoundingClientRect();
      if (s.value == b.INIT) {
        const j = Ot().value.length;
        let ot = L.left, st = L.top, P = L.width, D = L.height;
        t.fullscreen === !0 && (P = P * 0.75, D = D * 0.75), lt(t.left) && (ot = (window.innerWidth - P) / 2), lt(t.top) && (st = window.innerHeight * 0.12 + (j - 1) * 30), o.width = P, o.height = D, o.left = ot, o.top = st, s.value = b.MOUNTED, nt();
      }
      tt();
    }
    function U(c = !1) {
      !t.closeable && c !== !0 || n("update:visible", !1);
    }
    function yt(c) {
      t.closeable && (c == null || c.stopPropagation(), U());
    }
    function Ft() {
      o.focused = !1, Y(Lt);
    }
    function Ht(c) {
      c.stopPropagation();
    }
    function tt() {
      o.focused || Et(d);
    }
    function et() {
      if (f.mode == i.NONE)
        return f.mode = i.FULLSCREEN;
      const {
        innerWidth: c,
        innerHeight: g
      } = window;
      o.top < 0 && (o.top = 0), o.top > g - o.height && (o.top = c - o.height), o.left < 0 && (o.left = 0), o.left > c - o.width && (o.left = c - o.width), f.mode = i.NONE;
    }
    function Pt() {
      o.pinned = !o.pinned;
    }
    function nt() {
      h.width = o.width, h.height = o.height;
    }
    function Gt(c) {
      o.top = c.clientY - 15, o.left = c.clientX - h.width / 2, o.width = h.width, o.height = h.height, f.mode = i.NONE, f.width = 50, f.height = 50;
    }
    function xt(c) {
      c.stopPropagation();
    }
    function Ct(c) {
      const L = (r == null ? void 0 : r.refs.window).getBoundingClientRect();
      c.clientY - L.top > 30 || (c.preventDefault(), et());
    }
    const kt = Xt(() => t.visible, () => {
      t.visible || Ft();
    });
    de(d, y), wt(() => {
      n("beforeUnmount"), U(), _t(d);
    }), Yt(() => {
      n("unmount"), kt(), s.value = b.UNMOUNTED;
    }), Zt(K, y), e(y);
    function qt() {
      return w;
    }
    function it(c = {}) {
      const g = [];
      return t.mask !== !0 && m.value !== !0 && g.push(_("button", {
        onClick: Pt,
        type: "button",
        innerHTML: Mt,
        class: o.pinned ? w.pinMenu : w.menu,
        title: "固定"
      }, null)), p.value && g.push(_("button", {
        onClick: et,
        type: "button",
        innerHTML: It,
        class: w.menu,
        title: "最大化"
      }, null)), t.closeable && g.push(_("button", {
        onClick: yt,
        type: "button",
        innerHTML: St,
        class: w.closeMenu,
        title: "关闭"
      }, null)), g.length == 0 ? null : (c == null ? void 0 : c.custom) === !0 ? g : _("div", {
        class: w.menus,
        onMousedown: Ht
      }, [g]);
    }
    return function() {
      if (!t.visible)
        return null;
      const c = typeof a.header == "function" ? a.header(it) : null, g = _("div", {
        class: w.main,
        onMousedown: q == null ? void 0 : q.dragStart,
        onDblclick: Ct
      }, [c, _("div", {
        class: w.body,
        onClick: xt
      }, [_($e, {
        body: t.body,
        key: d.wid,
        uid: d
      }, null)])]), L = {
        ref: "window",
        id: t.id ?? d.wid,
        onVnodeMounted: Nt,
        onMousedownCapture: tt,
        class: Bt.value,
        style: zt.value
      };
      let R = $("div", L, [g, bt]);
      if (t.mask === !0) {
        const j = {
          zIndex: N.value
        };
        R = _("div", {
          class: w.mask,
          style: j
        }, [R]);
      }
      return t.appendToBody ? _(Tt, {
        to: "body"
      }, Ke(R) ? R : {
        default: () => [R]
      }) : R;
    };
  }
});
function en(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !k(t);
}
const F = /* @__PURE__ */ H({
  name: "BlankWindow",
  props: {
    ...J
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
      ...s
    } = e, l = E.create(e.uid);
    return function() {
      const o = {
        ...t,
        ...s,
        uid: l,
        body: n.default
      };
      return _(Rt, o, en(d) ? d : {
        default: () => [d]
      });
    };
  }
});
function nn(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !k(t);
}
const C = /* @__PURE__ */ H({
  name: "SimpleWindow",
  props: {
    ...J
  },
  setup(t, {
    slots: n,
    attrs: e
  }) {
    const {
      uid: a,
      ...d
    } = e, r = E.create(e.uid), s = G(null);
    function l(f) {
      f.preventDefault();
      const h = s.value;
      if (h == null)
        return;
      const p = h.windowState.splitMode;
      h.windowState.splitMode = p == i.FULLSCREEN ? i.NONE : i.FULLSCREEN;
    }
    const o = {
      header(f) {
        const h = f();
        return _("div", {
          class: w.header,
          onDblclick: l
        }, [_("i", {
          class: w.logo,
          innerHTML: vt
        }, null), _("div", {
          class: w.title
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
      return _(Rt, Vt(f, {
        ref: s
      }), nn(o) ? o : {
        default: () => [o]
      });
    };
  }
}), Wt = Object.freeze({
  SIMPLE_WINDOW: C.name,
  BLANK_WINDOW: F.name
});
const on = "_splitWindowMask_348ej_1", sn = "_fullscreen_348ej_9", ln = "_splitLeft_348ej_16", rn = "_splitRight_348ej_23", un = "_splitTopLeft_348ej_30", dn = "_splitTopRight_348ej_37", cn = "_splitBottomLeft_348ej_44", an = "_splitBottomRight_348ej_51", M = {
  splitWindowMask: on,
  fullscreen: sn,
  splitLeft: ln,
  splitRight: rn,
  splitTopLeft: un,
  splitTopRight: dn,
  splitBottomLeft: cn,
  splitBottomRight: an
};
function fn(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !k(t);
}
const wn = {
  [i.FULLSCREEN]: M.fullscreen,
  [i.LEFT]: M.splitLeft,
  [i.RIGHT]: M.splitRight,
  [i.TOP_LEFT]: M.splitTopLeft,
  [i.TOP_RIGHT]: M.splitTopRight,
  [i.BOTTOM_LEFT]: M.splitBottomLeft,
  [i.BOTTOM_RIGHT]: M.splitBottomRight
}, ct = {
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
}, at = /* @__PURE__ */ H({
  name: "WindowManager",
  setup() {
    const t = Ot(), n = pe();
    function e(s) {
      const l = s.key;
      if (l == "Escape")
        return gt();
      if (s.ctrlKey && l in ct) {
        const o = ue(), f = Reflect.get(ct, l), h = f[o.splitState.mode] ?? f.fallback;
        o.splitState.mode = h;
        return;
      }
    }
    ie(), window.addEventListener("keydown", e, !0), wt(() => {
      oe(), window.removeEventListener("keydown", e, !0);
    });
    function a(s) {
      return s == F.name ? F : C;
    }
    const d = z(() => {
      const s = [M.splitWindowMask], l = wn[n.mode];
      return l != null && s.push(l), s;
    });
    function r() {
      let s = null;
      if (n.mode != i.NONE) {
        const o = {
          zIndex: le() + 1,
          width: n.width ? n.width - 20 + "px" : null
        };
        s = _("div", {
          class: d.value,
          style: o
        }, null);
      }
      return _(Tt, {
        to: "body"
      }, {
        default: () => [_($t, {
          name: "fade"
        }, fn(s) ? s : {
          default: () => [s]
        })]
      });
    }
    return function() {
      return [...t.value.map((l) => {
        const o = ce(l);
        if (o == null)
          return;
        const f = a(o.type);
        return $(f, o.buildProps());
      }), r()];
    };
  }
});
function Q(t) {
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
    const [n, e, a] = t;
    if (typeof n == "string" && e != null)
      return { title: n, body: e, ...a };
  }
  return null;
}
function En(...t) {
  const n = Q(t);
  return n == null ? (console.error("[xWindow]: 参数有误"), null) : A(n);
}
function Ln(...t) {
  const n = Q(t);
  return n == null ? (console.error("[xWindow]: 参数有误"), null) : (n.type = Wt.BLANK_WINDOW, A(n));
}
function Sn(...t) {
  const n = Q(t);
  return n == null ? (console.error("[xWindow]: 参数有误"), null) : (n.type = Wt.SIMPLE_WINDOW, A(n));
}
function A(t) {
  if (!se())
    return console.error("[xWindow] 需要先创建`WindowManager`组件，见文档 " + Kt + " 。"), null;
  const { displayAfterCreate: n, unmountAfterClose: e, afterUnmount: a, ...d } = t, r = {
    uid: null,
    visible: G(n !== !1),
    isUnmounted: !1
  }, s = () => r.visible.value = !0, l = () => {
    r.visible.value = !1, e !== !1 && o();
  }, o = () => {
    r.visible.value && l(), _t(r.uid), Y(Lt);
  }, f = Object.assign({}, d, {
    visible: r.visible,
    [Qt](h) {
      h ? s() : l();
    },
    [At]() {
      r.isUnmounted = !0;
    },
    [te]() {
      typeof a == "function" && a();
    }
  });
  return r.uid = ae(x.create(f)), {
    uid: r.uid,
    get isUnmounted() {
      return r.isUnmounted;
    },
    get visible() {
      return r.visible.value;
    },
    show: s,
    close: l,
    unmount: o
  };
}
function Tn(t, n) {
  t.component(C.name, C), t.component(F.name, F), t.component(at.name, at), ge(n);
}
const hn = Jt, In = { install: Tn, version: hn };
export {
  F as BlankWindow,
  b as ComponentStates,
  C as SimpleWindow,
  at as WindowManager,
  In as default,
  Tn as install,
  Ln as useBlankWindow,
  mn as useIcons,
  Sn as useSimpleWindow,
  En as useWindow,
  On as useWindowApi,
  gn as useWindowManager,
  hn as version,
  In as xWindow
};
