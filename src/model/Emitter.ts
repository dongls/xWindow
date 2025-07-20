import { type EventType } from './Common'

export interface EventListener<T = any> {
  (evt: WindowEvent<T>): void
}

export class WindowEvent<T = any, P = any> {
  /** 事件类型 */
  type: EventType
  /** 事件是否被阻止继续执行 */
  stopped = false
  /** 是否已取消默认行为 */
  defaultPrevented = false
  /** 事件触发窗口实例 */
  instance: T
  /** 事件的参数 */
  detail?: P

  constructor(type: EventType, instance: T, detail?: P) {
    this.type = type
    this.instance = instance
    this.detail = detail
  }

  /** 阻止事件继续执行 */
  stop() {
    this.stopped = true
  }

  /** 阻止事件默认行为 */
  preventDefault() {
    this.defaultPrevented = true
  }
}

export class Emitter<T = any> {
  private readonly __v_skip = true
  private ALL_EVENTS: Map<string, EventListener<T>[]> = new Map()

  /** 监听事件 */
  on(type: EventType, listener: EventListener<T>) {
    const listeners = this.ALL_EVENTS.get(type)
    if (listeners == null) {
      this.ALL_EVENTS.set(type, [listener])
      return this
    }

    if (listeners.includes(listener)) return this

    listeners.unshift(listener)
    return this
  }

  /** 监听事件，仅生效一次 */
  once(type: EventType, listener: EventListener<T>) {
    const handler = (event: WindowEvent) => {
      listener(event)
      this.off(type, handler)
    }

    this.on(type, handler)
    return this
  }

  /** 取消事件监听 */
  off(type: EventType, listener: EventListener<T>) {
    const listeners = this.ALL_EVENTS.get(type)
    if (listeners == null) return this

    const index = listeners.indexOf(listener)
    if (index < 0) return this

    listeners.splice(index, 1)
    return this
  }

  /** 触发一个事件 */
  dispatch(event: WindowEvent) {
    const listeners = this.ALL_EVENTS.get(event.type)
    if (listeners == null) return event

    for (let i = listeners.length - 1; i >= 0; i--) {
      const listener = listeners[i]
      if (typeof listener == 'function') listener(event)
      if (event.stopped) break
    }

    return event
  }

  /** 清空所有事件监听函数 */
  cleanup() {
    this.ALL_EVENTS.clear()
  }
}
