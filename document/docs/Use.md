## 模态框

模态框是业务系统中常用的组件，你可以轻松将其与*xWindow*结合使用。以下就是一个简单`Modal`组件：

<example-code src="Modal.vue"/>

将这个`Modal`组件使用[useBlankWindow](/api#useBlankWindow)简单封装一下，就可以直接调用。例如：

```typescript
import type { UseBlankWindowOptions, WindowBody } from '@dongls/xwindow'
import { useBlankWindow, BlankWindow, WindowMenus } from '@dongls/xwindow'

export function useModal(title: string, body: WindowBody, params: UseBlankWindowOptions = {}) {
  params.height = params.height ?? '320px'

  // 这里使用空白窗口，实现自定义
  return useBlankWindow(title, <Modal>{body}</Modal>, params)
}
```

上述代码最终效果如下：
<div class="doc-example">
 <UseModal/>
</div>

## 业务封装

在业务系统中，经常需要在流程中打开弹窗完成某一具体的业务操作。例如，在审批流程中，需要弹窗让用户输入审批意见。要完成上述需求，通常需要准备一个相应的业务组件，例如：

<example-code src="UseApproval.vue"/>

基于上述组件以及之前封装的`useModal`函数，可以将上述业务需求封装为一个函数。例如：

```typescript
import { RESIZE_MODE, type UseBlankWindowOptions } from '@dongls/xwindow'

// 可以基于事件自行封装
export function useApproval() {
  return new Promise<string>((resolve, reject) => {
    const params: UseBlankWindowOptions = { mask: true, resizeMode: RESIZE_MODE.DISABLED }
    const instance = useModal('请输入审批意见', <UseApproval />, params)
    instance.once('confirm', event => resolve(event.detail))
    instance.once('cancel', event => reject(event.detail))
  })
}

```

在需要用户审批时，可以通过以下代码直接调用

```typescript
// 如果用户输入并点击确认按钮，那么value的值为用户输入的内容
// 如果用户点击取消，或者直接关闭窗口，那么value的值为null
const value = await useApproval().catch(e => {
  console.log(e)
  return null
})
// 后续业务代码
```

效果如下：
<div class="doc-example">
  <UseExample/>
</div>

前面的例子是通过窗口事件封装的，窗口实例提供了`promisify`函数，可以简化上述流程，直接基于`useModal`函数使用。例如：

```typescript
// 弹出审批窗口，并获取用户输入
const params: UseBlankWindowOptions = { mask: true, resizeMode: RESIZE_MODE.DISABLED }
const value = await useModal('请输入审批意见', <UseApproval />, params).promisify()
// 后续业务代码
```

<Footer path="/use"/>
