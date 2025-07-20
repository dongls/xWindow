import classes from '../styles/window.module.scss'

import type { WindowMenu } from '../model/Common'
import type { BlankWindow } from '../model/Windows'

import { defineComponent, isVNode, h } from 'vue'
import { CLASS, WINDOW_TYPE } from '../model/Constant'
import { BlankWindowComponent } from './BlankWindow'
import { stopPropagation } from '../util'
import { IconWindow } from '../svg/index'
import { WindowBody } from './WindowBody'
import { WindowMenus } from './WindowMenus'
import { SimpleWindow } from '../model/Windows'

function createIcon(win: BlankWindow): any {
  const icon = win.options.icon

  if (typeof icon == 'string') return <i class={[classes.logo, 'icon', icon]} />
  if (isVNode(icon)) return icon
  if (typeof icon == 'function') return icon(win)

  return <i class={classes.logo} innerHTML={IconWindow} />
}

export const SimpleWindowComponent = defineComponent({
  name: WINDOW_TYPE.SIMPLE_WINDOW,
  props: {
    instance: {
      type: SimpleWindow,
      required: true,
    },
  },
  setup(props) {
    const instance = props.instance

    function callMenuHandler(menu: WindowMenu, event: MouseEvent) {
      event.stopPropagation()
      if (typeof menu.handler == 'function') menu.handler(instance)
    }

    function createMenu(menu: WindowMenu) {
      return (
        <button type="button" class="x-window-text-menu" onClick={callMenuHandler.bind(null, menu)}>
          {menu.label}
        </button>
      )
    }

    return function () {
      return h(BlankWindowComponent, { instance }, function () {
        const external = instance.options.menus ?? []
        return (
          <div class={classes.simpleWindow}>
            <div class={[classes.header, CLASS.HEADER]}>
              {createIcon(instance)}
              <div class={classes.title}>{instance.options.title ?? '新窗口'}</div>
              <div class={classes.menus} onMousedown={stopPropagation}>
                {external.map(menu => createMenu(menu))}
                <WindowMenus instance={instance} />
              </div>
            </div>
            <div class={[classes.body, CLASS.BODY]}>
              <WindowBody body={instance.body} key={instance.wid} />
            </div>
          </div>
        )
      })
    }
  },
})
