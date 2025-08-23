import classes from '../styles/window.module.css'

import type { SimpleWindowMenu } from '../model/Common'

import { defineComponent, h } from 'vue'
import { CLASS, WINDOW_TYPE } from '../model/Constant'
import { BlankWindowComponent } from './BlankWindow'
import { stopPropagation } from '../util'
import { WindowBody } from './WindowBody'
import { WindowMenus } from './WindowMenus'
import { SimpleWindow } from '../model/Windows'
import { createIcon } from './utils'

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

    function callMenuHandler(menu: SimpleWindowMenu, event: MouseEvent) {
      event.stopPropagation()
      if (typeof menu.handler == 'function') menu.handler(instance)
    }

    function createMenu(menu: SimpleWindowMenu) {
      const className = [classes.simpleWindowHeaderMenu, CLASS.SIMPLE_WINDOW_MENU]
      return (
        <button type="button" class={className} onClick={callMenuHandler.bind(null, menu)}>
          {menu.label}
        </button>
      )
    }

    return function () {
      return h(BlankWindowComponent, { instance }, function () {
        const external = instance.options.menus ?? []
        return (
          <div class={classes.simpleWindow}>
            <header class={[classes.header, CLASS.HEADER]}>
              {createIcon(instance)}
              <div class={classes.title}>{instance.options.title ?? '新窗口'}</div>
              <div class={classes.menus} onMousedown={stopPropagation}>
                {external.map(menu => createMenu(menu))}
                <WindowMenus instance={instance} />
              </div>
            </header>
            <div class={[classes.body, CLASS.BODY]}>
              <WindowBody body={instance.body} key={instance.wid} />
            </div>
          </div>
        )
      })
    }
  },
})
