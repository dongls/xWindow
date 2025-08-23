import classes from '../styles/window.module.css'
import type { BlankWindow } from '../model/Windows'

import { IconWindow } from '../svg/index'
import { isVNode } from 'vue'

export function createIcon(win: BlankWindow): any {
  const icon = win.options.icon

  if (typeof icon == 'string') return <i class={[classes.logo, 'icon', icon]} />
  if (isVNode(icon)) return icon
  if (typeof icon == 'function') return icon(win)

  return <i class={classes.logo} innerHTML={IconWindow} />
}
