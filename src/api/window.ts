import type { UseBlankWindowParams, UseSimpleWindowParams, WindowBody } from '../model/Common'

import { WINDOW_TYPE } from '../model/Constant'
import { BlankWindow, SimpleWindow } from '../model/Windows'
import { createWindow } from './manager'
import { PLUGIN_OPTIONS } from './store'
import { isEmptyStr, merge } from '../util'

function normalizeParams(args: any[]): any {
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
    const [title, body, params] = args
    if (typeof title == 'string' && body != null) {
      return { ...params, title, body }
    }
  }

  return null
}

function mergeWindowParams(current: any, target: any) {
  if (target == null) return

  for (const key in target) {
    if (current[key] != null) continue

    const value = target[key]
    if (value == null) continue

    current[key] = value
  }
}

function parseWindowParams(args: any[]) {
  const params = normalizeParams(args) ?? {}

  const defaultPreset = Reflect.get(PLUGIN_OPTIONS.presets, 'default')
  const targetPreset = typeof params.preset === 'string' && params.preset != 'default' ? Reflect.get(PLUGIN_OPTIONS.presets, params.preset) : undefined
  mergeWindowParams(params, targetPreset)
  mergeWindowParams(params, defaultPreset)

  return params
}

export function useWindow(title: string, body: WindowBody): SimpleWindow
export function useWindow(title: string, body: WindowBody, params: Partial<UseBlankWindowParams>): SimpleWindow
export function useWindow(params: Partial<UseSimpleWindowParams>): SimpleWindow
export function useWindow(...args: any): SimpleWindow {
  const params: any = parseWindowParams(args) ?? {}
  params.type = WINDOW_TYPE.SIMPLE_WINDOW
  return useWindowImpl(params) as any
}

export function useBlankWindow(title: string, body: WindowBody): BlankWindow
export function useBlankWindow(title: string, body: WindowBody, params: Partial<UseBlankWindowParams>): BlankWindow
export function useBlankWindow(params: Partial<UseBlankWindowParams>): BlankWindow
export function useBlankWindow(...args: any[]): BlankWindow {
  const params: any = parseWindowParams(args) ?? {}
  params.type = WINDOW_TYPE.BLANK_WINDOW
  return useWindowImpl(params)
}

export function useSimpleWindow(title: string, body: WindowBody): SimpleWindow
export function useSimpleWindow(title: string, body: WindowBody, params: Partial<UseSimpleWindowParams>): SimpleWindow
export function useSimpleWindow(params: Partial<UseSimpleWindowParams>): SimpleWindow
export function useSimpleWindow(...args: any[]): SimpleWindow {
  const params: any = parseWindowParams(args) ?? {}
  params.type = WINDOW_TYPE.SIMPLE_WINDOW
  return useWindowImpl(params) as any
}

function useWindowImpl(params: any) {
  const instance = createWindow(params)

  instance.ready().then(() => {
    if (params.displayAfterCreate !== false) instance.show()
  })

  return instance
}

/** 创建一个单例窗口 */
export function createSingleWindow<T extends (...args: any) => Promise<any>>(fn: T) {
  return function (...args: Parameters<T>): ReturnType<T> {
    const value = Reflect.get(fn, '__XWINDOW_VALUE__')
    if (value) return value as any

    const promise = fn(...args).finally(() => {
      Reflect.deleteProperty(fn, '__XWINDOW_VALUE__')
    })

    Reflect.defineProperty(fn, '__XWINDOW_VALUE__', { configurable: true, enumerable: false, writable: false, value })
    return promise as any
  }
}
