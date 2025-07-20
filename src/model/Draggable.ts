import type { EventType } from './Common'
import type { BlankWindow } from './Windows'
import { CLASS } from './Constant'
import { WindowEvent } from './Emitter'

export class WindowDragContext {
  moved = false

  originalEvent: PointerEvent
  target: HTMLElement
  deltaX: number
  deltaY: number
  initialX: number
  initialY: number

  left: number = 0
  top: number = 0
  prevClientX: number
  prevClientY: number

  constructor(target: HTMLElement, event: PointerEvent) {
    const rect = target.getBoundingClientRect()

    this.originalEvent = event
    this.target = target
    this.deltaX = Math.round(rect.left - event.clientX)
    this.deltaY = Math.round(rect.top - event.clientY)
    this.initialX = event.clientX
    this.initialY = event.clientY
    this.prevClientX = event.clientX
    this.prevClientY = event.clientY
  }

  /** 如果移动距离小,则阻止后续事件触发 */
  preventDragEvent(event: PointerEvent) {
    if (this.moved) return false
    if (Math.abs(event.clientX - this.initialX) > 4) return false
    if (Math.abs(event.clientY - this.initialY) > 4) return false
    return true
  }

  createEvent(type: EventType, instance: BlankWindow) {
    return new WindowEvent(type, instance, this)
  }
}

export class Draggable {
  /** 检测两个`Element`是否存在重叠 */
  static isConflict(current: HTMLElement, target: HTMLElement) {
    const cRect = current.getBoundingClientRect()
    const tRect = target.getBoundingClientRect()

    return !(cRect.top > tRect.bottom || cRect.right < tRect.left || cRect.bottom < tRect.top || cRect.left > tRect.right)
  }

  static findElementsFromPoint(x: number, y: number, selector: string, scope?: Element) {
    if (typeof document.elementsFromPoint !== 'function') return []

    const elements: Element[] = document.elementsFromPoint(x, y)
    return elements.filter(element => {
      if (scope != null && !scope.contains(element)) return false
      if (typeof selector == 'string') return element.matches(selector)
      return false
    })
  }

  private window: BlankWindow
  private context?: WindowDragContext
  private onDragging?: any
  private onDragend?: any

  constructor(window: BlankWindow) {
    this.window = window
  }

  dragstart(event: PointerEvent) {
    if (event.button !== 0) return

    const target = event.target
    if (target instanceof Element && target.closest('.' + CLASS.MENU)) return

    const element = this.window.getElement()
    if (element == null) return

    const rect = element.getBoundingClientRect()
    if (event.clientY - rect.top > this.window.allowDragArea) return

    event.preventDefault()
    event.stopPropagation()

    this.context = new WindowDragContext(element, event)
    this.context.left = this.window.state!.offsetLeft
    this.context.top = this.window.state!.offsetTop

    this.onDragging = this.dragging.bind(this)
    this.onDragend = this.dragend.bind(this)

    window.addEventListener('pointermove', this.onDragging)
    window.addEventListener('pointerup', this.onDragend)
  }

  private dragging(event: PointerEvent) {
    if (this.context == null) return

    const context = this.context
    if (!context.moved) {
      const winEvent = this.window.dispatch(this.context.createEvent('dragStart', this.window))
      if (winEvent.defaultPrevented) return this.cleanup()

      const classes = this.window.useCssModule()
      if (classes?.dragging) context.target.classList.add(classes.dragging)

      context.target.setPointerCapture(event.pointerId)
      context.moved = true
    }

    if (context.preventDragEvent(event)) return

    event.preventDefault()
    event.stopPropagation()

    context.originalEvent = event
    context.left = Math.round(event.clientX + context.deltaX)
    context.top = Math.round(event.clientY + context.deltaY)
    context.prevClientX = event.clientX
    context.prevClientY = event.clientY

    // 更新拖拽元素位置
    const element = context.target
    element.style.left = context.left + 'px'
    element.style.top = context.top + 'px'

    const winEvent = this.context.createEvent('dragging', this.window)
    this.window.dispatch(winEvent)
  }

  private dragend(event: PointerEvent) {
    if (this.context == null || !this.context.moved) return this.cleanup()

    event.preventDefault()
    event.stopPropagation()

    const context = this.context
    context.originalEvent = event
    context.target.releasePointerCapture(event.pointerId)

    const winEvent = context.createEvent('dragEnd', this.window)
    this.window.dispatch(winEvent)

    this.window.state!.offsetTop = context.top
    this.window.state!.offsetLeft = context.left

    this.cleanup()
  }

  cleanup() {
    const classes = this.window.useCssModule()
    if (classes?.dragging) this.context?.target.classList.remove(classes.dragging)

    if (this.onDragging) window.removeEventListener('pointermove', this.onDragging)
    if (this.onDragend) window.removeEventListener('pointerup', this.onDragend)

    this.onDragging = undefined
    this.onDragend = undefined
    this.context = undefined
  }
}
