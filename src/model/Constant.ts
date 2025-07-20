export const HOME_PAGE = __HOMEPAGE__
export const VERSION = __VERSION__
export const INJECTION_WINDOW_API = Symbol()
export const PINNED_ZINDEX = Math.floor(Number.MAX_SAFE_INTEGER / 10) - 10000

export const CLASS = Object.freeze({
  WINDOW: 'x-window',
  SIMPLE_WINDOW: 'x-simple-window',
  TRANSITION: 'x-window-is-transition',
  MENU: 'x-window-is-menu',
  FOCUSED: 'x-window-is-focused',
  MAXIMIZE: 'x-window-is-maximize',
  HEADER: 'x-window-header',
  BODY: 'x-window-body',
})

export const POSITION_FLAGS = Object.freeze({
  NONE: 0,
  TOP: 1 << 0,
  BOTTOM: 1 << 1,
  LEFT: 1 << 2,
  RIGHT: 1 << 3,
})

export const RESIZE_PROPS = Object.freeze({
  TOP: POSITION_FLAGS.TOP,
  BOTTOM: POSITION_FLAGS.BOTTOM,
  LEFT: POSITION_FLAGS.LEFT,
  RIGHT: POSITION_FLAGS.RIGHT,
  TOP_LEFT: POSITION_FLAGS.TOP | POSITION_FLAGS.LEFT,
  TOP_RIGHT: POSITION_FLAGS.TOP | POSITION_FLAGS.RIGHT,
  BOTTOM_LEFT: POSITION_FLAGS.BOTTOM | POSITION_FLAGS.LEFT,
  BOTTOM_RIGHT: POSITION_FLAGS.BOTTOM | POSITION_FLAGS.RIGHT,
})

/** 窗口模式 */
export const WINDOW_MODES = Object.freeze({
  NONE: POSITION_FLAGS.NONE,
  MAXIMIZE: POSITION_FLAGS.TOP,
})

/** 窗口调整模式 */
export const RESIZE_MODE = Object.freeze({
  /** 禁止调整窗口大小 */
  DISABLED: 0,
  /** 允许调整窗口大小，允许最大化（默认）*/
  RESIZE: 1,
  /** 只允许调整窗口大小 */
  RESIZE_ONLY: 2,
})

/** 窗口渲染状态 */
export const RENDER_STATES = Object.freeze({
  /** 窗口初始化，不显示 */
  INIT: 0,
  /** 窗口初始化完成，并展示 */
  MOUNTED: 1,
  /** 窗口已销毁 */
  UNMOUNTED: 2,
})

export const WINDOW_TYPE = Object.freeze({
  SIMPLE_WINDOW: 'SimpleWindow',
  BLANK_WINDOW: 'BlankWindow',
})

export const MENU_TYPE = Object.freeze({
  /** 关闭按钮 */
  CLOSE: 0,
  /** 最大化按钮 */
  MAXIMIZE: 1,
  /** 恢复按钮 */
  RESTORE: 2,
  /** 固定按钮 */
  PIN: 3,
  /** 取消固定按钮 */
  UNPIN: 4,
})
