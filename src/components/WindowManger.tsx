import { defineComponent, h, onBeforeUnmount } from 'vue'
import { useRegisteredWindow, getWindow, initWindowManager, destroyContext } from '../api/manager'
import { getComponent } from './index'
import { LOG } from '../util'

export const WindowManager = defineComponent({
  name: 'WindowManager',
  setup() {
    const ids = useRegisteredWindow()
    initWindowManager()
    onBeforeUnmount(() => destroyContext())

    return function () {
      if (__IS_DEV__) LOG.DEBUG('window size:', ids.value.length, ids.value)

      const windows = ids.value.map(id => {
        const instance = getWindow(id)
        if (instance == null) return null

        const Component = getComponent(instance.type)
        if (Component == null) return null

        return h(Component, { instance, key: instance.wid })
      })

      return windows
    }
  },
})
