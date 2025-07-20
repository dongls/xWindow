import UseApproval from '../example/UseApproval.vue'
import Modal from '../example/Modal.vue'

import type { UseBlankWindowParams, WindowBody } from '@dongls/xwindow'
import { useBlankWindow, RESIZE_MODE, BlankWindow, WindowMenus } from '@dongls/xwindow'

export function useModal(title: string, body: WindowBody, params: UseBlankWindowParams = {}) {
  params.height = params.height ?? '320px'

  const slots = {
    // 窗体
    default(props: { instance: BlankWindow }) {
      return typeof body == 'function' ? body(props.instance) : body
    },
    // 菜单
    menus(props: { instance: BlankWindow }) {
      return <WindowMenus instance={props.instance} />
    },
  }

  // 这里使用空白窗口，实现自定义
  return useBlankWindow(title, <Modal>{slots}</Modal>, params)
}

export function useApproval() {
  const params: UseBlankWindowParams = { mask: true, resizeMode: RESIZE_MODE.DISABLED }
  return useModal('请输入审批意见', <UseApproval />, params).promisify()
}

