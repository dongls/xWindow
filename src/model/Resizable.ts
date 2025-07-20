import type { BlankWindow } from './Windows'
import type { EventType } from './Common'

import { POSITION_FLAGS } from './Constant'
import { toSafeNumber } from '../util'
import { WindowEvent } from './Emitter'

const PROP_MAPPING: Record<string, string> = {
  top: 'offsetTop',
  left: 'offsetLeft',
  width: 'offsetWidth',
  height: 'offsetHeight',
}

export class WindowResizeContext {
  init: boolean = false
  defaultPrevented = false

  originalEvent: PointerEvent
  target: HTMLElement
  direction: number

  constructor(event: PointerEvent) {
    this.originalEvent = event
    this.target = event.target as HTMLElement
    this.direction = Reflect.get(this.target, Resizable.PROP)
  }

  createEvent(type: EventType, instance: BlankWindow) {
    return new WindowEvent(type, instance, this)
  }
}

export class Resizable {
  static PROP = '__xwindow_resize_prop__'

  private context?: WindowResizeContext
  private window: BlankWindow

  private onResizing?: any
  private onResizeend?: any

  constructor(window: BlankWindow) {
    this.window = window
  }

  resizestart(event: PointerEvent) {
    event.stopPropagation()
    event.preventDefault()

    const context = new WindowResizeContext(event)
    this.context = context
    this.onResizing = this.resizing.bind(this)
    this.onResizeend = this.resizeend.bind(this)

    window.addEventListener('pointermove', this.onResizing)
    window.addEventListener('pointerup', this.onResizeend)
  }

  resizing(event: PointerEvent) {
    if (this.context == null) return

    event.stopPropagation()
    event.preventDefault()

    const context = this.context
    if (!context.init) {
      const winEvent = this.window.dispatch(this.context.createEvent('resizeStart', this.window))
      if (winEvent.defaultPrevented) return this.cleanup()

      context.target.setPointerCapture(event.pointerId)
      context.init = true
    }

    // 更新窗口状态
    const newWinState = this.calcWindowState(event)
    const element = this.window.getElement()!
    for (const prop in newWinState) {
      const value = Math.round(newWinState[prop])
      Reflect.set(element.style, prop, value + 'px')
    }

    context.originalEvent = event

    const winEvent = this.context.createEvent('resizing', this.window)
    this.window.dispatch(winEvent)
  }

  resizeend(event: PointerEvent) {
    if (this.context == null) return

    event.stopPropagation()
    event.preventDefault()

    const context = this.context
    if (context.init) {
      const winEvent = context.createEvent('resizeEnd', this.window)
      this.window.dispatch(winEvent)
      this.patchWindowState(this.calcWindowState(event))
      context.target.releasePointerCapture(event.pointerId)
    }

    this.cleanup()
  }

  cleanup() {
    if (this.onResizing) window.removeEventListener('pointermove', this.onResizing)
    if (this.onResizeend) window.removeEventListener('pointerup', this.onResizeend)

    this.onResizing = undefined
    this.onResizeend = undefined
    this.context = undefined
  }

  calcWindowState(event: PointerEvent) {
    const state = this.context!
    const options = this.window.options
    const MIN_WIDTH = typeof options.minWidth == 'number' && options.minWidth >= 0 ? options.minWidth : 360
    const MIN_HEIGHT = typeof options.minHeight == 'number' && options.minHeight >= 0 ? options.minHeight : 32
    const rect = this.window.getElement()!.getBoundingClientRect()
    const props: any = {}

    // 上
    if (state.direction & POSITION_FLAGS.TOP) {
      props.height = toSafeNumber(rect.bottom - toSafeNumber(event.clientY, 0), MIN_HEIGHT)
      props.top = rect.bottom - props.height
    }

    // 下
    if (state.direction & POSITION_FLAGS.BOTTOM) {
      props.height = toSafeNumber(event.clientY - rect.top, MIN_HEIGHT)
    }

    // 左
    if (state.direction & POSITION_FLAGS.LEFT) {
      props.width = toSafeNumber(rect.right - toSafeNumber(event.clientX, 0), MIN_WIDTH)
      props.left = rect.right - props.width
    }

    //右
    if (state.direction & POSITION_FLAGS.RIGHT) {
      props.width = toSafeNumber(event.clientX - rect.left, MIN_WIDTH)
    }

    return props
  }

  patchWindowState(state: any) {
    const winState = this.window.state!
    for (const prop in state) {
      const value = Math.round(state[prop])
      const key = PROP_MAPPING[prop]
      if (key == null) continue

      Reflect.set(winState, key, value)
    }
  }
}
