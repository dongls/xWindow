import type { VNode, VNodeArrayChildren, AppContext, Ref } from 'vue'
import type { BlankWindow, TabsWindow } from './Windows'

export type InferValue<T> = T[keyof T]

export type DragEventType = 'dragStart' | 'dragging' | 'dragEnd'
export type ResizeEventType = 'resizeStart' | 'resizing' | 'resizeEnd'
export type LifeCycleEventType = 'created' | 'beforeShow' | 'show' | 'beforeClose' | 'close' | 'beforeDestroy'
export type ChangeEventType = 'maximizeChange'
export type UserEventType = 'confirm' | 'cancel'
export type EventType = LifeCycleEventType | DragEventType | ResizeEventType | ChangeEventType | UserEventType

export type WindowType = 'SimpleWindow' | 'BlankWindow' | 'TabsWindow'
export type HandlerType = 'confirm' | 'cancel'

export type WindowIcon = string | VNode | ((win: BlankWindow) => VNode)
export type WindowBody = string | number | VNode | VNodeArrayChildren | ((win: BlankWindow, ...params: any) => any)
export type WindowPreset = Partial<Omit<SimpleWindowOptions, 'title'>>

export type TabsWindowBody = (win: TabsWindow, active: string) => any

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

export interface SimpleWindowMenu {
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
  /** 窗口调整模式,默认为`RESIZE_MODE.REISZE` */
  resizeMode: number
  /** 是否可拖拽, 默认为`true`, 如果值为数字, 则用于指定`header`的高度 */
  draggable: boolean | number
  /** 是否可关闭窗口,默认为`true` */
  closeable: boolean
  /** 是否允许固定窗口,默认为`true` */
  pinnable: boolean
  /** 是否包含遮罩层,默认为`false` */
  mask: boolean
  /** 创建后立即显示窗口，默认为`true` */
  displayAfterCreate: boolean
  /** 关闭后销毁窗口，默认为`true` */
  destroyAfterClose: boolean
  /** 按下`Esc`键关闭窗口，默认为`true` */
  closeOnPressEsc: boolean
}

export interface SimpleWindowOptions extends WindowOptions {
  /** 窗口菜单 */
  menus?: SimpleWindowMenu[]
}

export interface WindowTab {
  label: string
  name: string
  disabled?: boolean
  active?: boolean
}

export interface TabsWindowOptions extends WindowOptions {
  /** 窗口的标签 */
  tabs: WindowTab[]
}

export interface UseWindowCommonOptions {
  /** 窗口类型 */
  type?: WindowType
  /** 窗口的内容，可以是`VNode`或者一个返回`VNode`的函数 */
  body?: WindowBody
  /** 窗口预设 */
  preset?: string
}

export type UseWindowOptions = UseWindowCommonOptions & Partial<WindowOptions> & Record<string, any>
export type UseBlankWindowOptions = UseWindowCommonOptions & Partial<WindowOptions>
export type UseTabsWindowOptions = UseWindowCommonOptions & Partial<TabsWindowOptions>
export type UseSimpleWindowOptions = Omit<UseWindowCommonOptions, 'body'> & Partial<SimpleWindowOptions> & { body?: TabsWindowBody }

export interface ComponentApi {
  /** 获取窗口顶层DOM对象 */
  getElement(): HTMLElement | undefined
  /** 获取组件当前渲染状态 */
  getRenderState(): number
  /** 获取组件样式 */
  useCssModule(): Record<string, string>
  /** 获取窗口菜单 */
  useMenus(): number[]
  /** 显示加载提示 */
  showLoading(text?: string): void
  /** 隐藏加载提示 */
  hideLoading(): void
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

/** @deprecated use `UseWindowOptions` instead */
export type UseWindowParams = UseWindowOptions
/** @deprecated use `UseSimpleWindowOptions` instead */
export type UseSimpleWindowParams = UseSimpleWindowOptions
/** @deprecated use `UseBlankWindowOptions` instead */
export type UseBlankWindowParams = UseBlankWindowOptions
