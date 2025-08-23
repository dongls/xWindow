import type { UseBlankWindowOptions, UseWindowOptions, WindowBody, UseSimpleWindowOptions, UseTabsWindowOptions, TabsWindowBody } from '../model/Common'

import { WINDOW_TYPE } from '../model/Constant'
import { BlankWindow, SimpleWindow, TabsWindow } from '../model/Windows'
import { createWindow } from './manager'
import { PLUGIN_OPTIONS } from './store'

function normalizeOptions(args: any[]): any {
  // useWindow({ title: 'xxxx', body: <div>body</div> })
  if (args.length == 1) {
    const p = args[0]
    if (p == null) return null

    return typeof p == 'object' ? { ...p } : null
  }

  // useWindow('title', <div>body</div>)
  if (args.length == 2) {
    const [title, body] = args

    if (typeof title == 'string' && body != null) {
      return { title, body }
    }
  }

  // useWindow('title', <div>body</div>, {})
  if (args.length == 3) {
    const [title, body, options] = args
    if (typeof title == 'string' && body != null) {
      return { ...options, title, body }
    }
  }

  return null
}

function mergeWindowOptions(current: any, target: any) {
  if (target == null) return

  for (const key in target) {
    if (current[key] != null) continue

    const value = target[key]
    if (value == null) continue

    current[key] = value
  }
}

function parseWindowOptions(args: any[]) {
  const options = normalizeOptions(args) ?? {}

  const defaultPreset = Reflect.get(PLUGIN_OPTIONS.presets, 'default')
  const targetPreset = typeof options.preset === 'string' && options.preset != 'default' ? Reflect.get(PLUGIN_OPTIONS.presets, options.preset) : undefined
  mergeWindowOptions(options, targetPreset)
  mergeWindowOptions(options, defaultPreset)

  return options
}

export function useWindow(title: string, body: WindowBody): BlankWindow
export function useWindow(title: string, body: WindowBody, options: Partial<UseWindowOptions>): BlankWindow
export function useWindow(options: Partial<UseWindowOptions>): BlankWindow
export function useWindow(...args: any): BlankWindow {
  const o: any = parseWindowOptions(args) ?? {}
  o.type = o.type ?? WINDOW_TYPE.SIMPLE_WINDOW
  return useWindowImpl(o) as any
}

export function useBlankWindow(title: string, body: WindowBody): BlankWindow
export function useBlankWindow(title: string, body: WindowBody, options: Partial<UseBlankWindowOptions>): BlankWindow
export function useBlankWindow(options: Partial<UseBlankWindowOptions>): BlankWindow
export function useBlankWindow(...args: any[]): BlankWindow {
  const o: any = parseWindowOptions(args) ?? {}
  o.type = WINDOW_TYPE.BLANK_WINDOW
  return useWindowImpl(o)
}

export function useSimpleWindow(title: string, body: WindowBody): SimpleWindow
export function useSimpleWindow(title: string, body: WindowBody, options: Partial<UseSimpleWindowOptions>): SimpleWindow
export function useSimpleWindow(options: Partial<UseSimpleWindowOptions>): SimpleWindow
export function useSimpleWindow(...args: any[]): SimpleWindow {
  const o: any = parseWindowOptions(args) ?? {}
  o.type = WINDOW_TYPE.SIMPLE_WINDOW
  return useWindowImpl(o) as any
}

export function useTabsWindow(title: string, body: TabsWindowBody): TabsWindow
export function useTabsWindow(title: string, body: TabsWindowBody, options: UseTabsWindowOptions): TabsWindow
export function useTabsWindow(options: UseTabsWindowOptions): TabsWindow
export function useTabsWindow(...args: any[]): TabsWindow {
  const o: any = parseWindowOptions(args) ?? {}
  o.type = WINDOW_TYPE.TABS_WINDOW
  return useWindowImpl(o) as any
}

function useWindowImpl(options: any) {
  const instance = createWindow(options)

  instance.ready().then(() => {
    if (options.displayAfterCreate !== false) instance.show()
  })

  return instance
}

/** 创建一个单例窗口 */
export function createSingleWindow<T extends (...args: any) => Promise<any>>(fn: T) {
  return function (...args: Parameters<T>): ReturnType<T> {
    const value = Reflect.get(fn, '__XWINDOW_VALUE__')
    if (value) return value as any

    let result = fn(...args)
    if (result instanceof BlankWindow) result = result.promisify()

    const promise = result.finally(() => {
      Reflect.deleteProperty(fn, '__XWINDOW_VALUE__')
    })

    Reflect.defineProperty(fn, '__XWINDOW_VALUE__', { configurable: true, enumerable: false, writable: false, value: promise })
    return promise as any
  }
}
