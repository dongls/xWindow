import classes from '../styles/window.module.css'
import Icon from './Icon.vue'

import type { BlankWindow } from '../model/Windows'

import { IconWindow } from '../svg/index'
import { isVNode } from 'vue'

export function createIcon(win: BlankWindow): any {
  const icon = win.options.icon

  if (typeof icon == 'string') {
    if (icon.startsWith('svg:')) return <Icon icon={icon.slice(4)} size="18px" />
    return <i class={[classes.logo, 'icon', icon]} />
  }

  if (isVNode(icon)) return icon
  if (typeof icon == 'function') return icon(win)

  return <i class={classes.logo} innerHTML={IconWindow} />
}
