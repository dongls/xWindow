import './styles/global.scss'

import type { App } from 'vue'
import type { PluginOptions } from './model/Common'

import { VERSION } from './model/Constant'
import { useConfig } from './api/store'
import { useAppContext, useEscEvent } from './api/manager'

function install(app: App, options?: PluginOptions) {
  useConfig(options)
  useEscEvent()
  useAppContext(app)
}

const version = VERSION
const xWindow = { install, version }

export { RENDER_STATES, RESIZE_MODE, WINDOW_MODES } from './model/Constant'
export { BlankWindow, SimpleWindow } from './model/Windows'

export { useWindowApi, registerPreset, registerZIndexManager } from './api/store'
export { useWindow, useBlankWindow, useSimpleWindow, createSingleWindow } from './api/window'
export { useWindowManager, cleanup, hasOpenWindow } from './api/manager'
export { useIcons } from './svg/index'

export { WindowMenus } from './components/WindowMenus'
export { WindowManager } from './components/WindowManger'
export { install, version, xWindow as default, xWindow }

export type { WindowBody, WindowIcon, PluginOptions, UseSimpleWindowParams, UseBlankWindowParams, WindowSize, WindowZIndexManager } from './model/Common'
