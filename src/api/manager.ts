import type { CloseTopOptions, UseWindowParams } from '../model/Common'

import { render, h, type App } from 'vue'
import { WINDOW_TYPE } from '../model/Constant'
import { BlankWindow, SimpleWindow } from '../model/Windows'
import { getComponent } from '../components/index'
import { WINDOW_CONTEXT, getCurrentZIndex, getNextZIndex } from './store'
import { LOG } from '../util'

function onPressEsc(event: KeyboardEvent) {
  const key = event.key
  if (key == 'Escape') return closeTopWindow({ pressEsc: true, forced: false })
}

export function initWindowManager() {
  WINDOW_CONTEXT.isMounted = true
}

export function destroyContext() {
  WINDOW_CONTEXT.isMounted = false
  WINDOW_CONTEXT.topWindow = null
  WINDOW_CONTEXT.ids.value = []
  WINDOW_CONTEXT.stack.clear()
}

export function isInitWindowManager() {
  return WINDOW_CONTEXT.isMounted
}

export function getZIndex() {
  return getCurrentZIndex()
}

export function getTopZIndex() {
  return getNextZIndex()
}

export function getTopWindowZIndex() {
  const topWindow = WINDOW_CONTEXT.topWindow
  if (topWindow) return topWindow.state!.zIndex

  return 1
}

/** 获取顶层窗口 */
export function getTopWindow() {
  return WINDOW_CONTEXT.topWindow
}

export function registerWindow(id: number, instance: BlankWindow) {
  WINDOW_CONTEXT.stack.set(id, instance)
}

/** 删除窗口实例 */
export function removeWindow(id: number) {
  if (__IS_DEV__) LOG.DEBUG('remove window', id)
  if (!WINDOW_CONTEXT.stack.has(id)) return

  WINDOW_CONTEXT.stack.delete(id)
  if (!WINDOW_CONTEXT.isMounted) return

  const index = WINDOW_CONTEXT.ids.value.indexOf(id)
  if (index < 0) return

  const value = WINDOW_CONTEXT.ids.value
  value.splice(index, 1)
}

/** 关闭顶层窗口 */
export function closeTopWindow(options?: CloseTopOptions) {
  if (WINDOW_CONTEXT.stack.size == 0 || WINDOW_CONTEXT.topWindow == null) return

  const topWindow = WINDOW_CONTEXT.topWindow
  if (options?.pressEsc === true && topWindow.options.closeOnPressEsc !== true) return

  WINDOW_CONTEXT.topWindow.cancel(options?.forced)
}

function createIsolateWindow(instance: BlankWindow) {
  const container = document.createDocumentFragment() as any
  const Component = getComponent(instance.type)
  const vm = h(Component, { instance })

  vm.appContext = WINDOW_CONTEXT.appContext
  render(vm, container)
  document.body.appendChild(container)

  instance.on('beforeDestroy', () => {
    render(null, container)
  })
}

export function createWindow(newOption: UseWindowParams) {
  const instance = newOption.type === WINDOW_TYPE.SIMPLE_WINDOW ? SimpleWindow.create(newOption) : BlankWindow.create(newOption)

  // 已注册`WindowManager`组件
  if (WINDOW_CONTEXT.isMounted) {
    WINDOW_CONTEXT.ids.value.push(instance.id)
    WINDOW_CONTEXT.stack.set(instance.id, instance)
    return instance
  }

  createIsolateWindow(instance)
  return instance
}

/** 获取窗口组件暴露的`API` */
export function getWindow(id: number) {
  return WINDOW_CONTEXT.stack.get(id)
}

/** 获取所有已注册的窗口 */
export function useRegisteredWindow() {
  return WINDOW_CONTEXT.ids
}

function setFocusedWindow(focused: BlankWindow | undefined) {
  WINDOW_CONTEXT.topWindow = focused
  if (focused == null) return

  for (const item of WINDOW_CONTEXT.stack.values()) {
    const state = item.state
    if (state == null) continue

    state.focused = item === focused
  }

  if (focused.state == null || focused.isFixedZIndex) return

  // 设置窗口层级
  if (focused.state.zIndex < getZIndex()) {
    focused.state.zIndex = getTopZIndex()
  }
}

/**
 * 设置窗口为聚焦窗口
 * @param { number } id - 窗口的唯一ID
 */
export function focusWindow(id: number) {
  const focused = WINDOW_CONTEXT.stack.get(id)
  setFocusedWindow(focused)
}

export function focusTopWindow() {
  const newTopWindow = findTopWindow()
  setFocusedWindow(newTopWindow)
}

function findTopWindow() {
  if (WINDOW_CONTEXT.stack.size == 0) return

  let top = undefined
  for (const win of WINDOW_CONTEXT.stack.values()) {
    if (win.state == null || win.state.visible !== true) continue

    if (top == null) {
      top = win
      continue
    }

    if (top.zIndex < win.zIndex) top = win
  }

  return top
}

export function getWindowCount() {
  return WINDOW_CONTEXT.stack.size
}

export function useEscEvent() {
  window.addEventListener('keydown', onPressEsc, true)
}

export function useAppContext(app: App) {
  WINDOW_CONTEXT.appContext = app._context
}

export function cleanup() {
  WINDOW_CONTEXT.appContext = null
  destroyContext()
  window.removeEventListener('keydown', onPressEsc, true)
}

export function hasOpenWindow() {
  return Array.from(WINDOW_CONTEXT.stack.values()).some(win => win.state?.visible === true)
}

export function useWindowManager() {
  return {
    closeTopWindow,
    getTopWindow,
    getTopZIndex,
    getWindowCount,
    getZIndex,
    setFocusedWindow,
    cleanup,
  }
}
