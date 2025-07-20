import type { WindowBody, WindowState, WindowOptions, ComponentApi, EventType, WindowType, HandlerType, SimpleWindowOptions, WindowMenu } from './Common'

import { reactive } from 'vue'
import { Emitter, WindowEvent } from './Emitter'
import { RESIZE_MODE, WINDOW_TYPE, WINDOW_MODES, CLASS, PINNED_ZINDEX } from './Constant'
import { Draggable } from './Draggable'
import { Resizable } from './Resizable'
import { removeWindow, focusWindow, focusTopWindow } from '../api/manager'
import { PLUGIN_OPTIONS } from '../api/store'

/** 空白窗口类，所有窗口的基类 */
export class BlankWindow extends Emitter<BlankWindow> {
  static seed = 1000
  static create(params: any) {
    if (params instanceof BlankWindow) return params
    return new BlankWindow(params)
  }

  private CREATE_RESOLVE?: Function
  private CREATE_REJECT?: Function

  /** 窗口id，自动生成 */
  readonly id!: number
  /** 窗口类型 */
  type: WindowType
  /** 窗口选项 */
  options: WindowOptions
  /** 窗体内容 */
  body?: WindowBody

  /** 窗口状态，组件挂载后可用 */
  state?: WindowState
  /** 是否创建窗口 */
  created: boolean = false
  /** 窗口是否被销毁 */
  destroyed: boolean = false
  /** 组件API, 组件挂载后可用 */
  component: ComponentApi | null | undefined

  /** 拖拽 */
  private draggable!: Draggable
  private resizable!: Resizable
  private handles: Partial<Record<HandlerType, Function>> = {}

  dragstart: any
  resizestart: any

  constructor(params: any) {
    super()

    // 生成窗口id
    Reflect.defineProperty(this, 'id', { enumerable: true, configurable: false, writable: false, value: BlankWindow.seed++ })

    const { body, type, ...options } = params
    this.type = type ?? WINDOW_TYPE.SIMPLE_WINDOW
    this.options = reactive(this.createOptions(options)) as any
    this.body = body

    this.initDraggable()
    this.initResizable()
    this.initHooks()
  }

  /** 窗口组件根元素的id */
  get wid() {
    return 'window--' + this.id
  }

  /** 窗口组件是否已创建 */
  get isReady() {
    return this.created === true
  }

  /** 是否允许窗口拖拽 */
  get allowDrag() {
    const draggable = this.options.draggable

    if (draggable === false) return false
    if (typeof draggable == 'number') return draggable > 0

    return true
  }

  /** 顶部可拖拽区域，默认只有顶部32px以内可以拖动 */
  get allowDragArea() {
    const draggable = this.options.draggable
    if (typeof draggable === 'number' && draggable > 0) return draggable

    return PLUGIN_OPTIONS.draggaleHeight
  }

  /** 窗口是否已最大化 */
  get isMaximize() {
    return this.state?.windowMode === WINDOW_MODES.MAXIMIZE
  }

  /** 是否为固定层级的窗口 */
  get isFixedZIndex() {
    const options = this.options
    return typeof options.zIndex == 'number' && options.zIndex > 0
  }

  /** 窗口的层级 */
  get zIndex() {
    if (this.isFixedZIndex) return this.options.zIndex!

    // 窗口尚未初始化
    const state = this.state
    if (state == null) return 0

    return (state.pinned ? PINNED_ZINDEX : 0) + state.zIndex
  }

  private createOptions(params: WindowOptions): WindowOptions {
    return {
      ...params,
      title: params.title ?? '未命名的窗口',
      icon: params.icon,
      className: params.className,
      width: params.width ?? '640px',
      minWidth: params.minWidth ?? 360,
      maxWidth: params.maxWidth,
      height: params.height,
      minHeight: params.minHeight ?? 32,
      maxHeight: params.maxHeight,
      top: params.top,
      left: params.left,
      zIndex: params.zIndex,
      maximize: params.maximize === true,
      teleport: params.teleport ?? 'body',
      draggable: params.draggable == null ? true : params.draggable,
      resizeMode: params.resizeMode ?? RESIZE_MODE.RESIZE,
      closeable: params.closeable !== false,
      mask: params.mask === true,
      pinnable: params.pinnable !== false,
      displayAfterCreate: params.displayAfterCreate !== false,
      destroyAfterClose: params.destroyAfterClose !== false,
      closeOnPressEsc: params.closeOnPressEsc !== false,
    } as any
  }

  createEvent(type: EventType, data?: any) {
    return new WindowEvent(type, this, data)
  }

  private initDraggable() {
    this.draggable = new Draggable(this)
    this.dragstart = this.draggable.dragstart.bind(this.draggable)
  }

  private initResizable() {
    this.resizable = new Resizable(this)
    this.resizestart = this.resizable.resizestart.bind(this.resizable)
  }

  private initHooks() {
    this.once('created', () => {
      this.created = true

      if (typeof this.CREATE_RESOLVE == 'function') this.CREATE_RESOLVE()
      delete this.CREATE_REJECT
      delete this.CREATE_RESOLVE
    })
  }

  /** 等待窗口组件创建完成 */
  ready() {
    if (this.created === true) return Promise.resolve()

    return new Promise((resolve, reject) => {
      this.CREATE_RESOLVE = resolve
      this.CREATE_REJECT = reject
    })
  }

  /** 显示窗口 */
  show() {
    if (this.state == null) return

    const event = this.dispatch(this.createEvent('beforeShow'))
    if (event.defaultPrevented) return

    this.state.visible = true
  }

  /**
   * 关闭窗口
   * @param {boolean} forced - 是否强制关闭窗口
   */
  close(forced = false) {
    if (this.state == null) return false
    if (this.options.closeable === false && forced !== true) return false

    const event = this.dispatch(this.createEvent('beforeClose'))
    if (forced !== true && event.defaultPrevented) return false

    this.state.visible = false
    this.dispatch(this.createEvent('close'))
    if (this.state.focused) setTimeout(focusTopWindow)
    if (!this.destroyed && this.options.destroyAfterClose !== false) this.destroy()

    return true
  }

  cleanup() {
    super.cleanup()
    this.dragstart = undefined
    this.resizestart = undefined
    this.component = undefined
    this.state = undefined
    this.handles = {}
  }

  /** 销毁窗口 */
  destroy() {
    this.destroyed = true
    // 销毁前先检测是否关闭窗口
    if (this.state?.visible === true) this.close()

    this.dispatch(this.createEvent('beforeDestroy'))

    // 移除窗口组件
    removeWindow(this.id)

    // 清理变量
    setTimeout(() => this.cleanup(), 100)
  }

  /** 获取窗口根元素 */
  getElement(): HTMLElement | undefined {
    return this.component?.getElement()
  }

  /** 获取窗口菜单，返回菜单类型数组 */
  useMenus(): number[] {
    return this.component?.useMenus() ?? []
  }

  /** 获取组件的样式 */
  useCssModule() {
    return this.component?.useCssModule() ?? {}
  }

  /** 窗口聚焦 */
  focus() {
    if (this.state == null || this.state.focused) return

    focusWindow(this.id)
  }

  private startTransition() {
    const element = document.documentElement
    const handler = function (event: Event) {
      const target = event.target as HTMLElement
      if (!target.matches('.' + CLASS.WINDOW)) return

      element.classList.remove(CLASS.TRANSITION)
      element.removeEventListener('transitionend', handler)
    }

    element.classList.add(CLASS.TRANSITION)
    element.addEventListener('transitionend', handler)
  }

  private requestMaximize() {
    const state = this.state
    if (state == null || this.options.resizeMode !== RESIZE_MODE.RESIZE) return

    state.windowMode = WINDOW_MODES.MAXIMIZE
    this.startTransition()
    this.dispatch(this.createEvent('maximizeChange'))
  }

  private exitMaximize() {
    const state = this.state
    if (state == null || this.options.resizeMode !== RESIZE_MODE.RESIZE) return

    state.windowMode = WINDOW_MODES.NONE
    this.startTransition()
    this.dispatch(this.createEvent('maximizeChange'))
  }

  /** 切换窗口最大化 */
  toggleMaximize() {
    const state = this.state
    if (state == null || this.options.resizeMode !== RESIZE_MODE.RESIZE) return

    state.windowMode === WINDOW_MODES.MAXIMIZE ? this.exitMaximize() : this.requestMaximize()
  }

  /** 固定窗口 */
  pin() {
    const state = this.state
    if (state == null) return

    state.pinned = true
  }

  /** 取消窗口固定 */
  unpin() {
    const state = this.state
    if (state == null) return

    state.pinned = false
  }

  /** 切换窗口的固定状态 */
  togglePin() {
    const state = this.state
    if (state == null) return

    state.pinned ? this.unpin() : this.pin()
  }

  /** 注册事件处理函数, 用于窗口和组件之间的交互 */
  useHandle(type: HandlerType, callback: Function) {
    this.handles[type] = callback
  }

  private async callHandle(type: HandlerType) {
    const handle = this.handles[type]
    if (typeof handle != 'function') return undefined

    return await handle()
  }

  /** 调用注册的confirm钩子并关闭窗口 */
  dispatchConfirm() {
    return this.callHandle('confirm').then(data => this.confirm(data))
  }

  /** 确认并关闭窗口 */
  confirm(data?: any) {
    this.dispatch(this.createEvent('confirm', data))
    this.close(true)
  }

  /**  调用注册的cancel钩子并关闭窗口 */
  dispatchCancel() {
    return this.callHandle('cancel').then(data => this.cancel(true, data))
  }

  /** 取消并关闭窗口 */
  cancel(forced = true, data?: any) {
    const r = this.close(forced)
    if (r) this.dispatch(this.createEvent('cancel', data))
  }

  promisify<T = any>(): Promise<T> {
    return new Promise((resolve, reject) => {
      this.once('confirm', event => resolve(event.detail))
      this.once('cancel', event => reject(event.detail))
    })
  }
}

export class SimpleWindow extends BlankWindow {
  static create(params: any) {
    if (params instanceof SimpleWindow) return params

    return new SimpleWindow(params)
  }

  declare options: SimpleWindowOptions

  constructor(params: any) {
    super(params)
  }

  updateMenus(menus: WindowMenu[]) {
    this.options.menus = menus
  }
}
