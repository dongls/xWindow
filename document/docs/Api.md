## 概览

<div class="api-summary">

|#|名称|描述|
|-|-|-|
|1|[useWindow](/api#useWindow)|创建一个窗口，如不指定窗口类型则默认为`SimpleWindow`|
|2|[useBlankWindow](/api#useBlankWindow)|创建一个空白窗口|
|3|[useSimpleWindow](/api#useSimpleWindow)|创建一个带标题的简单窗口|
|4|[useWindowApi](/api#useWindowApi)|在窗体组件中注入当前窗口实例|
|5|[useWindowManager](/api#useWindowManager)|获取窗口管理器|
|6|[createSingleWindow](/api#createSingleWindow)|创建一个单例窗口|
|7|[hasOpenWindow](/api#hasOpenWindow)|判断当前是否有打开的窗口|
|8|[registerPreset](/api#registerPreset)|注册窗口预设|
|9|[registerZIndexManager](/api#registerZIndexManager)|注册层级管理器|

</div>

### useWindow

最基础的窗口创建函数。使用时如果不指定窗口类型[type](/api#type), 默认为`SimpleWindow`。

- 类型
  ```typescript
  function useWindow(title: string, body: WindowBody): BlankWindow
  function useWindow(title: string, body: WindowBody, options: Partial<UseWindowOptions>): BlankWindow
  function useWindow(options: Partial<UseWindowOptions>): BlankWindow
  ```
- 参数
  - `title`: 窗口标题
  - `body`: 窗口内容，类型参照[WindowBody](/api#body)
  - `options`: 参照[窗口选项](/api#窗口选项)
- 示例
  ```typescript
  import { useWindow } from '@dongls/xwindow'

  useWindow('标题', <div>窗体</div>)
  useWindow('标题', <div>窗体</div>, {/** 窗口选项 */})
  useWindow({title: '标题', body: <div>窗体</div>, /** 其他选项 */})
  ```

### useBlankWindow

该方法用于创建一个空白窗口，可用于创建自定义窗口。

- 类型
  ```typescript
  function useBlankWindow(title: string, body: WindowBody): BlankWindow
  function useBlankWindow(title: string, body: WindowBody, options: Partial<UseBlankWindowOptions>): BlankWindow
  function useBlankWindow(options: Partial<UseBlankWindowOptions>): BlankWindow
  ```
- 参数
  - `title`: 窗口标题
  - `body`: 窗口内容，类型参照[WindowBody](/api#body)
  - `options`: 参照[窗口选项](/api#窗口选项)
- 示例
  ```typescript
  import { useBlankWindow } from '@dongls/xwindow'

  useBlankWindow('标题', <div>窗体</div>)
  useBlankWindow('标题', <div>窗体</div>, {/** 窗口选项 */})
  useBlankWindow({title: '标题', body: <div>窗体</div>, /** 其他选项 */})
  ```

### useSimpleWindow

该方法用于创建一个带标题的简单窗口，可以满足大部分场景的需求。

- 类型
  ```typescript
  function useSimpleWindow(title: string, body: WindowBody): SimpleWindow
  function useSimpleWindow(title: string, body: WindowBody, options: Partial<UseSimpleWindowOptions>): SimpleWindow
  function useSimpleWindow(options: Partial<UseSimpleWindowOptions>): SimpleWindow
  ```
- 参数
  - `title`: 窗口标题
  - `body`: 窗口内容，类型参照[WindowBody](/api#body)
  - `options`: 参照[窗口选项](/api#窗口选项)
- 示例
  ```typescript
  import { useSimpleWindow } from '@dongls/xwindow'

  useSimpleWindow('标题', <div>窗体</div>)
  useSimpleWindow('标题', <div>窗体</div>, {/** 窗口选项 */})
  useSimpleWindow({title: '标题', body: <div>窗体</div>, /** 其他选项 */})
  ```

### useWindowApi

该方法用于在组件中注入当前窗口实例。

- 类型
  ```typescript
  function useWindowApi(): BlankWindow | undefined
  ```
- 示例
  ```vue
  <template>
    <div><!-- 组件的代码 --></div>
  </temlate>

  <script setup lang="ts">
    import { useWindowApi } from '@dongls/xwindow'
    const instance = useWindowApi()
  </script>
  ```

### useWindowManager

该方法用于获取窗口管理对象，类型定义如下:

```typescript
interface CloseTopOptions {
  /** 是否为按下Esc键关闭窗口 */
  pressEsc?: boolean
  /** 是否强制关闭 */
  forced?: boolean
}

interface WindowManager {
  /** 卸载插件后，调用此函数清理缓存的数据 */
  cleanup(): void
  /** 关闭最上层窗口 */
  closeTopWindow(options?: CloseTopOptions): void
  /** 聚焦最上层窗口 */
  focusTopWindow(): void
  /** 聚焦指定窗口, 参数为窗口实例的id */
  focusWindow(id: number): void
  /** 获取最上层窗口实例 */
  getTopWindow(): BlankWindow | null | undefined
  /** 获取最上层窗口的z-index */
  getTopZIndex(): number
  /** 获取指定窗口实例, 参数为窗口实例的id*/
  getWindow(id: number): BlankWindow | null | undefined
  /** 获取窗口实例的数量 */
  getWindowCount(): number
  /** 判断是否有打开的窗口 */
  hasOpenWindow(): boolean
}
```

### createSingleWindow

该方法用于创建一个单例窗口。有时需要避免重复打开相同类型的窗口，通常会根据是否存在窗口实例来判断，该方法就提供了一种实现来解决该问题。

```typescript
import { useSimpleWindow, createSingleWindow } from '@dongls/xwindow'

// 接受与传入函数相同的参数
// 返回一个Promise对象,兑现后，返回窗口的值
const useSingleWindow = createSingleWindow(function (title: string) {
  return useSimpleWindow(title, <div>单例窗口</div>, { /* 窗口选项 */ })
    .promisify<string>()
    .catch(err => {
      console.log(err)
      return null
    })
})


// 第一次调用会正常创建窗口
const instance1 = useSingleWindow('标题')
// 因为已创建了窗口，会直接返回已创建的窗口
const instance2 = useSingleWindow('标题')

// 这里返回的两个窗口实际上都是第一次调用时创建的窗口
// 只有当已创建的窗口被关闭后，才会创建新的窗口
console.log(instance1 === instance2) // true
```

<div class="doc-example"><SingleWindow/></div>

### hasOpenWindow

该方法用于检测是否有打开的窗口。如果存在打开的窗口，返回`true`，否则返回`false`。

```typescript
import { hasOpenWindow } from '@dongls/xwindow'

const result = hasOpenWindow()
```

### registerPreset

该方法用于注册窗口预设。也可接在使用插件时注册，请参照[窗口预设](/quickstart#窗口预设)一节。

- 类型
  ```typescript
  function registerPreset(name: string, preset: WindowPreset): void
  ```
- 参数
  - `name`: 窗口预设的名称
  - `preset`: 类型参照[窗口选项](/api#窗口选项)，但是不包含`title`属性
- 示例
  ```typescript
  import { registerPreset, useSimpleWindow } from '@dongls/xwindow'

  registerPreset('small', {
    width: '800px',
    height: '600px',
    // 其他的选项
  })

  // 可以在创建窗口时使用
  // 这里就可以创建一个800px*600px的窗口
  useSimpleWindow('标题', <YourComponent />, { preset: 'small' })
  ```

### registerZIndexManager

该方法用于注册一个层级管理器。如果你的系统需要统一管理页面上各种不同弹层的`z-index`，请使用此方法。也可以在使用插件时注册，请参照[层级管理](/quickstart#层级管理)一节。

- 类型
  ```typescript
  interface WindowZIndexManager {
    /** 获取当前层级 */
    getZIndex(): number
    /** 设置当前层级 */
    setZIndex(value: number): void
    /** 获取下一个层级 */
    getNextZIndex(): number
  }

  function registerZIndexManager(manager: WindowZIndexManager): void
  ```

- 示例
  ```typescript
  import { ref } from 'vue'
  import { registerZIndexManager, type WindowZIndexManager } from '@dongls/xwindow'

  // 层级管理的一个简单实现
  const zIndex = ref(2000)
  const zIndexManager: WindowZIndexManager = {
    getNextZIndex() {
      zIndex.value++
      return zIndex.value
    },
    getZIndex() {
      return zIndex.value
    },
    setZIndex(v) {
      zIndex.value = v
    },
  }

  // 注册层级管理
  registerZIndexManager(zIndexManager)
  ```

## 窗口选项

通过[useWindow](/api#useWindow)、[useBlankWindow](/api#useBlankWindow)、[useSimpleWindow](/api#useSimpleWindow)创建窗口时可以传入以下参数：

### type

- 类型：`WindowType`
  ```typescript
  type WindowType = 'SimpleWindow' | 'BlankWindow'
  ```
- 默认值：`SimpleWindow`
- 描述：窗口的类型。根据传入的类型，创建不同类型的窗口，仅在`useWindow`函数中有效。

### body

- 类型：`WindowBody`
  ```typescript
  type WindowBody = string | number | VNode | VNodeArrayChildren | ((win: any) => any)
  ```
- 描述：窗体，有关`VNode`的信息请参照**Vu**e相关文档

  ```typescript
    import { useSimpleWindow } from '@dongls/xwindow'

    // 直接传入组件作为窗体
    useSimpleWindow('标题', <Component>)
    // 传入VNode作为窗体
    useSimpleWindow('标题', <div>窗体</div>)
  ```

### preset

- 类型：`string`
- 描述：窗口预设，用于指定窗口的样式。

### title

- 类型：`string`
- 描述：窗口标题

### icon

- 类型：`WindowIcon`

  ```typescript
  type WindowIcon = string | VNode | ((win: BlankWindow) => VNode)
  ```

- 描述：窗口的图标,如果不指定则使用默认的图标。可以传入以下三种类型参数：

  ```typescript
  import { useSimpleWindow } from '@dongls/xwindow';

  // 传入值当作类选择器使用
  useSimpleWindow('标题', <div>窗体</div>, { icon: 'icon-xxxx' })

  // 直接传入VNode
  useSimpleWindow('标题', <div>窗体</div>, { icon: <IconXXXX /> })

  // 返回一个VNode当作图标
  useSimpleWindow('标题', <div>窗体</div>, { icon: () => <IconXXXX /> })
  ```

### className

- 类型：`string`
- 描述: 窗口自定义类名，用于修改窗口样式

### width

- 类型：`string`
- 默认值：`640px`
- 描述：窗口的初始宽度，请参照`CSS`中[width](https://developer.mozilla.org/zh-CN/docs/Web/CSS/width)

### minWidth

- 类型：`number`
- 默认值：`360`
- 描述：窗口的最小宽度，单位为`px`

### height

- 类型：`string`
- 描述：窗口的初始高度，请参照`CSS`中[height](https://developer.mozilla.org/zh-CN/docs/Web/CSS/height)

### minHeight

- 类型：`number`
- 默认值：`32`
- 描述：窗口的最小高度，单位为`px`

### top

- 类型：`string`
- 描述：窗口相对浏览器窗口顶部的初始位置，请参照`CSS`的[top](https://developer.mozilla.org/zh-CN/docs/Web/CSS/top)

### left

- 类型：`string`
- 描述：窗口相对浏览器窗口左侧的初始位置，请参照`CSS`的[left](https://developer.mozilla.org/zh-CN/docs/Web/CSS/left)

### zIndex

- 类型：`number`
- 描述：窗口的层级，请参照`CSS`的[z-index](https://developer.mozilla.org/zh-CN/docs/Web/CSS/z-index)

### maximize

- 类型：`boolean`
- 默认值：`false`
- 描述：窗口最大化状态。如果需要禁止窗口最大化，参照[resizeMode](/api#resizeMode)说明

### teleport

- 类型：`string | false`
- 默认值：`body`
- 描述：窗口插入的位置，值为`false`禁用此行为。该参数的用法，请参照[Teleport](https://cn.vuejs.org/guide/built-ins/teleport.html)组件的`to`属性。

### resizeMode

- 类型：`number`
  ```typescript
  const RESIZE_MODE = {
    /** 禁止调整窗口大小 */
    DISABLED: 0,
    /** 允许调整窗口大小，允许最大化（默认）*/
    RESIZE: 1,
    /** 只允许调整窗口大小 */
    RESIZE_ONLY: 2,
  }
  ```
- 默认值：`RESIZE_MODE.REISZE`
- 描述：窗口调整模式。如果需要禁止窗口最大化，请将该参数设置为`RESIZE_MODE.RESIZE_ONLY`
  ```typescript
  import { useSimpleWindow, RESIZE_MODE } from '@dongls/xwindow'

  useSimpleWindow('标题', <div>窗体</div>, { resizeMode: RESIZE_MODE.RESIZE_ONLY })
  ```

### draggable

- 类型：`false | number`
- 默认值：`32`
- 描述：窗口是否可拖拽
  - 如果值为数字, 则用于指定可拖动区域的高度，单位为`px`
  - 如果值为`false`则禁止窗口拖动

### closeable

- 类型：`boolean`
- 默认值：`true`
- 描述：是否可关闭窗口

### pinnable

- 类型：`boolean`
- 默认值：`true`
- 描述：是否允许将窗口置于顶层

### mask

- 类型：`boolean`
- 默认值：`false`
- 描述：是否包含遮罩层

### displayAfterCreate

- 类型：`boolean`
- 默认值：`true`
- 描述：创建后立即显示窗口

### destroyAfterClose

- 类型：`boolean`
- 默认值：`true`
- 描述：关闭后销毁窗口

### closeOnPressEsc

- 类型：`boolean`
- 默认值：`true`
- 描述：按`Esc`键关闭窗口

### menus
- 类型：`Array<SimpleWindowMenu>`
```typescript
interface SimpleWindowMenu {
  label?: string
  handler: (win: BlankWindow) => any
}
```
- 描述：自定义的菜单列表，仅适用于[useSimpleWindow](/api#useSimpleWindow)
```typescript
import { useSimpleWindow } from '@dongls/xwindow'

useSimpleWindow('标题', <div>内容</div>, {
  menus: [
    {
      label: '自定义菜单',
      handler: () => alert('点击事件'),
    }
  ]
})
```

<div class="doc-example"><SimpleWindowMenu/></div>

<Footer path="/api"/>