import type { WindowBody as Body } from '../model/Common'

import { type PropType, defineComponent } from 'vue'
import { useWindowApi } from '../api/store'
import { LOG } from '../util'

export const WindowBody = defineComponent({
  name: 'WindowBody',
  props: {
    wid: String,
    body: {
      type: [Object, Function, String, Number] as PropType<Body>,
      default: null,
    },
  },
  setup(props) {
    const instance = useWindowApi()
    return function () {
      if (__IS_DEV__) LOG.DEBUG('render body:', props.wid)
      if (instance == null) {
        LOG.WARN(`窗体实例(${props.wid})不存在`)
        return null
      }

      const vnode = typeof props.body == 'function' ? props.body(instance) : props.body
      if (vnode == null) LOG.WARN('请指定窗体内容:', instance.options.title)
      return vnode
    }
  },
})
