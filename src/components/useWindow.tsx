import classes from '../styles/window.module.scss'

import type { WindowState } from '../model/Common'
import type { BlankWindow } from '../model/Windows'

import { type Ref, computed, h } from 'vue'
import { RENDER_STATES, WINDOW_MODES, RESIZE_PROPS, RESIZE_MODE } from '../model/Constant'
import { Resizable } from '../model/Resizable'

export function useWindowState(): WindowState {
  return {
    visible: false,
    offsetWidth: 0,
    offsetHeight: 0,
    offsetTop: 0,
    offsetLeft: 0,
    focused: false,
    pinned: false,
    zIndex: 0,
    windowMode: WINDOW_MODES.NONE,
  }
}

export const RESIZE_NODES = [
  [classes.resizeTop, RESIZE_PROPS.TOP],
  [classes.resizeBottom, RESIZE_PROPS.BOTTOM],
  [classes.resizeLeft, RESIZE_PROPS.LEFT],
  [classes.resizeRight, RESIZE_PROPS.RIGHT],
  [classes.resizeTopLeft, RESIZE_PROPS.TOP_LEFT],
  [classes.resizeTopRight, RESIZE_PROPS.TOP_RIGHT],
  [classes.resizeBottomLeft, RESIZE_PROPS.BOTTOM_LEFT],
  [classes.resizeBottomRight, RESIZE_PROPS.BOTTOM_RIGHT],
]

export function useWindowStyle(instance: BlankWindow, renderState: Ref<Number>, winState: WindowState) {
  return computed(() => {
    const options = instance.options

    if (renderState.value == RENDER_STATES.INIT) {
      return {
        width: options.width,
        height: options.height,
        left: options.left,
        top: options.top,
      }
    }

    return {
      top: winState.offsetTop + 'px',
      left: winState.offsetLeft + 'px',
      width: winState.offsetWidth + 'px',
      height: renderState.value == RENDER_STATES.INIT ? undefined : winState.offsetHeight + 'px',
      zIndex: options.mask ? undefined : instance.zIndex,
    }
  })
}

export function createResizeNodes(mode: number, resizeStart: any) {
  if (mode == RESIZE_MODE.DISABLED) return null

  return RESIZE_NODES.map(n => {
    return h('div', {
      ['.' + Resizable.PROP]: n[1],
      className: n[0],
      onPointerdown: resizeStart,
    })
  })
}
