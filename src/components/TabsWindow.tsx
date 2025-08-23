import classes from '../styles/window.module.css'

import { computed, defineComponent, h, ref } from 'vue'
import { CLASS, WINDOW_TYPE } from '../model/Constant'
import { BlankWindowComponent } from './BlankWindow'
import { stopPropagation, normalizeWheel } from '../util'
import { WindowBody } from './WindowBody'
import { WindowMenus } from './WindowMenus'
import { TabsWindow } from '../model/Windows'
import { createIcon } from './utils'

export const TabsWindowComponent = defineComponent({
  name: WINDOW_TYPE.SIMPLE_WINDOW,
  props: {
    instance: {
      type: TabsWindow,
      required: true,
    },
  },
  setup(props) {
    const active = computed(() => {
      const tabs = props.instance.options.tabs
      const active = tabs.find(c => c.active === true)
      if (active) return active.name

      return tabs[0]?.name
    })

    function switchTab(name: string) {
      props.instance.switchTab(name)
      props.instance.focus()
    }

    function onScroll(event: WheelEvent) {
      const scroll = (event.target as HTMLElement).closest('.' + classes.tabs) as HTMLElement
      if (scroll == null || scroll.scrollWidth < scroll.offsetWidth) return

      const { pixelY } = normalizeWheel(event)
      scroll.scrollLeft += pixelY
    }

    return function () {
      const instance = props.instance
      return h(BlankWindowComponent, { instance }, function () {
        const arr = Array.isArray(instance.options.tabs) ? instance.options.tabs : []
        const tabs = arr.map(tab => {
          const className = { [classes.tab]: true, [classes.active]: tab.name == active.value, [classes.disabled]: tab.disabled }
          return (
            <div class={className} onClick={switchTab.bind(null, tab.name)} onPointerdown={stopPropagation} onDblclick={stopPropagation}>
              <span>{tab.label}</span>
            </div>
          )
        })

        return (
          <div class={classes.tabsWindow}>
            <header class={[classes.tabsHeader, CLASS.HEADER]}>
              <div class={classes.tabsMain}>
                {createIcon(instance)}
                <div class={classes.tabsTitle}>{instance.options.title ?? '新窗口'}</div>
                <div class={classes.tabs} onWheel={onScroll}>
                  {tabs}
                </div>
              </div>
              <div class={classes.menus} onMousedown={stopPropagation}>
                <WindowMenus instance={instance} />
              </div>
            </header>
            <div class={[classes.body, CLASS.BODY]}>
              <WindowBody body={instance.body} key={instance.wid} params={[active.value]} />
            </div>
          </div>
        )
      })
    }
  },
})
