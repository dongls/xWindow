import type { VNode, VNodeArrayChildren, AppContext, Ref } from 'vue'
import type { BlankWindow } from './Windows'

export type InferValue<T> = T[keyof T]

export type DragEventType = 'dragStart' | 'dragging' | 'dragEnd'
export type ResizeEventType = 'resizeStart' | 'resizing' | 'resizeEnd'
export type LifeCycleEventType = 'created' | 'beforeShow' | 'show' | 'beforeClose' | 'close' | 'beforeDestroy'
export type ChangeEventType = 'maximizeChange'
export type UserEventType = 'confirm' | 'cancel'
export type EventType = LifeCycleEventType | DragEventType | ResizeEventType | ChangeEventType | UserEventType

export type WindowType = 'SimpleWindow' | 'BlankWindow'
export type HandlerType = 'confirm' | 'cancel'

export type WindowIcon = string | VNode | ((win: BlankWindow) => VNode)
export type WindowBody = string | number | VNode | VNodeArrayChildren | ((win: BlankWindow) => any)
export type WindowPreset = Partial<Omit<SimpleWindowOptions, 'title'>>

export interface WindowSize {
  width: string
  height: string
  left?: string
  top?: string
}

export interface PluginOptions {
  /** 窗口的层级管理对象 */
  zIndex?: WindowZIndexManager
  /** 窗口可推拽的高度，默认为`32px` */
  draggaleHeight?: number
  /** 窗口的预设 */
  presets?: Record<string, WindowPreset>
}

export interface WindowContext {
  appContext: AppContext | null
  /** `WindowManager`是否挂载 */
  isMounted: boolean
  /** 所有窗口实例 */
  stack: Map<number, BlankWindow>
  /** 所有窗口id */
  ids: Ref<number[]>
  /** 顶层窗口 */
  topWindow: BlankWindow | undefined | null
}

/** 窗口状态信息 */
export interface WindowState {
  /** 是否显示窗口 */
  visible: boolean
  /** 窗口实际宽度 */
  offsetWidth: number
  /** 窗口实际高度 */
  offsetHeight: number
  /** 窗口距容器顶部距离 */
  offsetTop: number
  /** 窗口距容器左侧距离 */
  offsetLeft: number
  /** 窗口是否聚焦 */
  focused: boolean
  /** 窗口是否被固定 */
  pinned: boolean
  /** 窗口层级 */
  zIndex: number
  /** 窗口模式 */
  windowMode: number
}

export interface WindowMenu {
  label?: string
  // icon?: string
  handler: (win: BlankWindow) => any
}

export interface WindowOptions {
  /** 窗口的标题 */
  title: string
  /**
   * 窗口的图标,如果不指定则使用默认的图标
   * - `string` 传入值当作`CSS`中的类选择器使用
   * - `VNode` 以传入的`VNode`当作图标
   * - `Function` 需返回一个`VNode`当作图标
   */
  icon?: WindowIcon
  /** 窗口的`CSS`类名 */
  className?: string
  /** 窗口初始宽度,参照`CSS`中`width`语法,默认为`640px` */
  width: string
  /** 窗口最小宽度,最小为0,默认为`360`,单位像素 */
  minWidth: number
  /** TODO: 窗口最大宽度,默认不限制，单位像素 */
  maxWidth?: number
  /** 窗口初始高度，参照`CSS`中`height`语法 */
  height?: string
  /** 窗口最小高度, 最小为0,默认为`32`单位像素 */
  minHeight: number
  /** TODO: 窗口最大高度，默认不限制，单位像素 */
  maxHeight?: number
  /** 窗口相对浏览器窗口顶部的初始位置，参照`CSS`的`top`语法 */
  top?: string
  /** 窗口相对浏览器窗口左侧的初始位置，参照`CSS`的`left`语法 */
  left?: string
  /**
   * 窗口的固定层级, 参照`CSS`的`zIndex`语法
   * 指定后，窗口的层级将会固定，层级管理将失效
   */
  zIndex?: number
  /** 窗口最大化,默认为`false` */
  maximize: boolean
  /** 窗口插入的位置,默认为`body`,值为`false`禁用此行为 */
  teleport: string | false
  /** 是否可拖拽, 默认为`true`, 如果值为数字, 则用于指定`header`的高度 */
  draggable: boolean | number
  /** 窗口调整模式,默认为`RESIZE_MODE.REISZE` */
  resizeMode: number
  /** 是否可关闭窗口,默认为`true` */
  closeable: boolean
  /** 是否包含遮罩层,默认为`false` */
  mask: boolean
  /** 是否允许固定窗口,默认为`true` */
  pinnable: boolean
  /** 创建后立即显示窗口，默认为`true` */
  displayAfterCreate: boolean
  /** 关闭后销毁窗口，默认为`true` */
  destroyAfterClose: boolean
  /** 按下`Esc`键关闭窗口，默认为`true` */
  closeOnPressEsc: boolean
}

export interface SimpleWindowOptions extends WindowOptions {
  /** 是否包含窗尾，默认为`true` */
  footer?: boolean
  /** 窗口菜单 */
  menus?: WindowMenu[]
}

export interface UseWindowParams {
  /** 窗口类型 */
  type?: WindowType
  /** 窗口的内容，可以是`VNode`或者一个返回`VNode`的函数 */
  body?: WindowBody
  /** 窗口预设 */
  preset?: string
}

export type UseBlankWindowParams = UseWindowParams & Partial<WindowOptions>

export type UseSimpleWindowParams = UseWindowParams & Partial<SimpleWindowOptions>

export interface ComponentApi {
  /** 获取窗口顶层DOM对象 */
  getElement(): HTMLElement | undefined
  /** 获取组件当前渲染状态 */
  getRenderState(): number
  /** 获取组件样式 */
  useCssModule(): Record<string, string>
  /** 获取窗口菜单 */
  useMenus(): number[]
}

export interface CloseTopOptions {
  pressEsc?: boolean
  forced?: boolean
}

export interface WindowZIndexManager {
  getZIndex(): number
  setZIndex(value: number): void
  getNextZIndex(): number
}
