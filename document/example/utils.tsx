import UseApproval from '../example/UseApproval.vue'
import Modal from '../example/Modal.vue'

import type { UseBlankWindowOptions, WindowBody } from '@dongls/xwindow'
import { useBlankWindow, RESIZE_MODE } from '@dongls/xwindow'

export function useModal(title: string, body: WindowBody, params: UseBlankWindowOptions = {}) {
  params.height = params.height ?? '320px'

  // 这里使用空白窗口，实现自定义
  return useBlankWindow(title, <Modal>{body}</Modal>, params)
}

export function useApproval() {
  const params: UseBlankWindowOptions = { mask: true, resizeMode: RESIZE_MODE.DISABLED }
  return useModal('请输入审批意见', <UseApproval />, params).promisify()
}
