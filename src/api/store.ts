import type { PluginOptions, WindowContext, WindowPreset, WindowZIndexManager } from '../model/Common'
import type { BlankWindow, SimpleWindow } from '../model/Windows'

import { inject, ref } from 'vue'
import { INJECTION_WINDOW_API } from '../model/Constant'

export const PLUGIN_OPTIONS: Required<PluginOptions> = {} as any
export const WINDOW_CONTEXT = useWindowContext()

let ZINDEX_MANAGER: WindowZIndexManager
export function createDefaultZIndexManager(): WindowZIndexManager {
  const currentZIndex = ref(1000)

  function getZIndex() {
    return currentZIndex.value
  }

  function setZIndex(zIndex: number) {
    currentZIndex.value = zIndex
  }

  function getNextZIndex(): number {
    currentZIndex.value++
    return currentZIndex.value
  }

  return {
    getZIndex,
    setZIndex,
    getNextZIndex,
  }
}

export function useConfig(options?: PluginOptions) {
  PLUGIN_OPTIONS.draggaleHeight = options?.draggaleHeight ?? 32
  PLUGIN_OPTIONS.presets = options?.presets ?? {}
  ZINDEX_MANAGER = options?.zIndex ?? createDefaultZIndexManager()
}

export function useWindowApi() {
  return inject<BlankWindow>(INJECTION_WINDOW_API)
}

export function useSimpleWindowApi() {
  return inject<SimpleWindow>(INJECTION_WINDOW_API)
}

function useWindowContext(): WindowContext {
  return {
    appContext: null,
    isMounted: false,
    stack: new Map(),
    ids: ref([]),
    topWindow: null,
  }
}

export function useZIndexManager() {
  return ZINDEX_MANAGER
}

export function getCurrentZIndex() {
  return ZINDEX_MANAGER.getZIndex()
}

export function getNextZIndex() {
  return ZINDEX_MANAGER.getNextZIndex()
}

export function registerPreset(name: string, preset: WindowPreset) {
  PLUGIN_OPTIONS.presets[name] = preset
}

export function registerZIndexManager(manager: WindowZIndexManager) {
  if (manager) ZINDEX_MANAGER = manager
}
