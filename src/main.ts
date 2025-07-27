import './styles/global.scss'

import type { App } from 'vue'
import type { PluginOptions } from './model/Common'

import { VERSION } from './model/Constant'
import { useConfig, registerPreset, registerZIndexManager } from './api/store'
import { useAppContext, useEscEvent } from './api/manager'
import { BlankWindowComponent } from './components/BlankWindow'
import { SimpleWindowComponent } from './components/SimpleWindow'
import { WindowMenus } from './components/WindowMenus'
import { WindowManager } from './components/WindowManger'

function install(app: App, options?: PluginOptions) {
  useConfig(options)
  useEscEvent()
  useAppContext(app)
}

const version = VERSION
const xWindow = { install, version, registerPreset, registerZIndexManager, BlankWindow: BlankWindowComponent, SimpleWindow: SimpleWindowComponent, WindowManager, WindowMenus }

export { RENDER_STATES, RESIZE_MODE, WINDOW_MODES } from './model/Constant'
export { BlankWindow, SimpleWindow } from './model/Windows'

export { useWindowApi, registerPreset, registerZIndexManager } from './api/store'
export { useWindow, useBlankWindow, useSimpleWindow, createSingleWindow } from './api/window'
export { useWindowManager, cleanup, hasOpenWindow } from './api/manager'
export { useIcons } from './svg/index'

export { install, version, xWindow as default, xWindow, WindowManager, WindowMenus }

export type {
  WindowBody,
  WindowIcon,
  PluginOptions,
  WindowSize,
  WindowZIndexManager,
  WindowPreset,
  UseWindowParams,
  UseSimpleWindowParams,
  UseBlankWindowParams,
  UseWindowOptions,
  UseSimpleWindowOptions,
  UseBlankWindowOptions,
} from './model/Common'
