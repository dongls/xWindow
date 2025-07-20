import { defineComponent } from 'vue'
import { BlankWindow } from '../model/Windows'
import { MENU_TYPE, WINDOW_MODES } from '../model/Constant'
import { IconClose, IconMax, IconPin, IconRestore } from '../svg/index'

export const WindowMenus = defineComponent({
  props: {
    instance: {
      type: BlankWindow,
      required: true,
    },
  },
  setup(props) {
    function closeWindow() {
      props.instance.cancel()
    }

    function togglePin() {
      props.instance.togglePin()
    }

    function toggleMaximize(event: MouseEvent) {
      event.preventDefault()
      props.instance.toggleMaximize()
    }

    return function () {
      const menus = props.instance.useMenus()
      const classes = props.instance.useCssModule() ?? {}
      const winState = props.instance.state
      return menus.map(menu => {
        switch (menu) {
          case MENU_TYPE.CLOSE: {
            return <button onClick={closeWindow} type="button" innerHTML={IconClose} class={classes.closeMenu} title="关闭" />
          }
          case MENU_TYPE.PIN:
          case MENU_TYPE.UNPIN: {
            const pinTitle = winState?.pinned ? '取消固定' : '固定'
            const pinIcon = winState?.pinned ? classes.pinMenu : classes.menu
            return <button onClick={togglePin} type="button" innerHTML={IconPin} class={pinIcon} title={pinTitle} />
          }
          case MENU_TYPE.MAXIMIZE:
          case MENU_TYPE.RESTORE: {
            const fullIcon = winState?.windowMode == WINDOW_MODES.MAXIMIZE ? IconRestore : IconMax
            const fullTitle = winState?.windowMode == WINDOW_MODES.MAXIMIZE ? '还原' : '最大化'
            return <button onClick={toggleMaximize} type="button" innerHTML={fullIcon} class={classes.menu} title={fullTitle} />
          }
          default:
            return null
        }
      })
    }
  },
})
