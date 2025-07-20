## 函数式API

---

```typescript
// 最基础的窗口创建函数，与useSimpleWindow行为一致
function useWindow(title: string, body: WindowBody): SimpleWindow
function useWindow(title: string, body: WindowBody, params: Partial<UseBlankWindowParams>): SimpleWindow
function useWindow(params: Partial<UseSimpleWindowParams>): SimpleWindow

// 用于创建一个空白窗口
function useBlankWindow(title: string, body: WindowBody): BlankWindow
function useBlankWindow(title: string, body: WindowBody, params: Partial<UseBlankWindowParams>): BlankWindow
function useBlankWindow(params: Partial<UseBlankWindowParams>): BlankWindow

// 用于创建一个带标题的简单窗口
function useSimpleWindow(title: string, body: WindowBody): SimpleWindow
function useSimpleWindow(title: string, body: WindowBody, params: Partial<UseSimpleWindowParams>): SimpleWindow
function useSimpleWindow(params: Partial<UseSimpleWindowParams>): SimpleWindow

// 用于在窗体组件中注入当前窗口实例
function useWindowApi(): BlankWindow | undefined
```

`UseWindowParams`的类型参照**窗口参数**，`BlankWindow`的类型参照**窗口实例**。

## 窗口参数

---

### type

- **类型**：`WindowType`
  ```typescript
  type WindowType = 'SimpleWindow' | 'BlankWindow'
  ```
- **默认值**：`SimpleWindow`
- **描述**：窗口的类型。根据传入的类型，创建不同类型的窗口，仅在`useWindow`函数中有效。

### title

- **类型**：`string`
- **描述**：窗口标题

### body

- **类型**：`WindowBody`
  ```typescript
  type WindowBody = string | number | VNode | VNodeArrayChildren | ((win: any) => any)
  ```
- **描述**：窗体，有关`VNode`的信息请参照Vue相关文档

  ```typescript
    import { useSimpleWindow } from '@dongls/xwindow'

    // 直接传入组件作为窗体
    useSimpleWindow('标题', <Component>)
    // 传入VNode作为窗体
    useSimpleWindow('标题', <div>窗体</div>)
  ```

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
- 描述：窗口的初始宽度，参照`CSS`中`width`语法

### minWidth

- 类型：`number`
- 默认值：`360`
- 描述：窗口的最小宽度，单位为`px`

### height

- 类型：`string`
- 默认值：`640px`
- 描述：窗口的初始高度，参照`CSS`中`height`语法

### minHeight

- 类型：`number`
- 默认值：`32`
- 描述：窗口的最小高度，单位为`px`

### top

- 类型：`string`
- 描述：窗口相对浏览器窗口顶部的初始位置，参照`CSS`的`top`语法

### left

- 类型：`string`
- 描述：窗口相对浏览器窗口左侧的初始位置，参照`CSS`的`left`语法

### maximize

- 类型：`boolean`
- 默认值：`false`
- 描述：窗口最大化状态。如果需要禁止窗口最大化，参照`resizeMode`说明

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
- 描述：窗口是否可拖拽。
  - 如果值为数字, 则用于指定可拖动区域的高度，单位为`px`
  - 如果值为`false`则禁止窗口拖动

### closeable

- 类型：`boolean`
- 默认值：`true`
- 描述：是否可关闭窗口

### pinnable

- 类型：`boolean`
- 默认值：`true`
- 描述：是否允许固定窗口

### mask

- 类型：`boolean`
- 默认值：`false`
- 描述：是否包含遮罩层

### teleport

- 类型：`string | false`
- 默认值：`body`
- 描述：窗口插入的位置，值为`false`禁用此行为。该参数的用法，请参照[Teleport][Teleport]组件的`to`属性。

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

## 窗口事件

---

可在窗口实例上监听事件，例如：

```typescript
import { useSimpleWindow } from '@dongls/xwindow'

const instance = useSimpleWindow('标题', <div>窗体</div>)

// 所有事件的类型都为WindowEvent
instance.on('created', event => console.log(event))
instance.on('close', event => console.log(event))

// 事件对象
class WindowEvent<T = BlankWindow, P = any> {
  /** 事件类型 */
  type: EventType;
  /** 事件是否被阻止继续执行 */
  stopped: boolean;
  /** 是否已取消默认行为 */
  defaultPrevented: boolean;
  /** 事件触发窗口实例 */
  instance: T;
  /** 事件的参数 */
  detail?: P;
  /** 阻止事件继续执行 */
  stop(): void;
  /** 阻止事件默认行为 */
  preventDefault(): void;
}
```

所有窗口事件请参照以下表格。 如果需要取消事件默认行为，请调用传入事件的对象`event.preventDefault()`方法实现。

<Events/>

## 窗口状态

---

窗口的状态信息，该对象为响应式对象，请谨慎修改。

```typescript
interface WindowState {
  /** 是否显示窗口 */
  visible: boolean
  /** 窗口实际宽度 */
  offsetWidth: number
  /** 窗口实际高度 */
  offsetHeight: number
  /** 窗口距容器顶部距离 */
  offsetTop: number
  /** 窗口距容器左侧距离 */
  offsetLeft: number
  /** 窗口是否聚焦 */
  focused: boolean
  /** 窗口是否被固定 */
  pinned: boolean
  /** 窗口层级 */
  zIndex: number
  /** 窗口模式 */
  windowMode: number
}
```

## 窗口实例

---

窗口实例都是`BlankWindow`对象，你可以通过窗口实例操作窗口行为。可以通过以下几种方式获取到窗口实例：

```typescript
import { defineComponent } from 'vue'
import { useSimpleWindow, useWindowApi } from '@dongls/xwindow'

// 函数式API的返回值就是一个窗口实例
const instance = useSimpleWindow('标题', <div>窗体</div>)

// 可以在窗体组件中获取窗口实例
const WindowBody = defineComponent({
  setup(){
    const instance = useWindowApi()
    return {}
  }
})

// 可以通过函数返回窗体，窗口实例会作为参数传入
useSimpleWindow('标题', (instance) => {
  return <div>窗体</div>
})
```

有关`BlankWindow`的说明，请参照以下类型定义：

```typescript
interface ComponentApi {
  /** 获取窗口顶层DOM对象 */
  getElement(): HTMLElement | undefined
  /** 获取组件当前渲染状态 */
  getRenderState(): number
  /** 获取组件样式 */
  useCssClass(): Record<string, string>
  /** 获取窗口菜单 */
  useMenus(): ComputedRef<number[]>
}

class Emitter<T = any> {
  /** 监听事件 */
  on(type: EventType, listener: EventListener<T>): this
  /** 监听事件，仅生效一次 */
  once(type: EventType, listener: EventListener<T>): this
  /** 取消事件监听 */
  off(type: EventType, listener: EventListener<T>, delay?: boolean): this
  /** 触发一个事件 */
  dispatch(event: WindowEvent): WindowEvent<any, any>
  /** 清空所有事件监听函数 */
  cleanup(): void
}

class BlankWindow extends Emitter<BlankWindow> {
  /** 窗口id，自动生成 */
  readonly id: number
  /** 窗口类型 */
  type: WindowType
  /** 窗口选项 */
  options: WindowOptions
  /** 窗体内容 */
  body?: WindowBody
  /** 窗口状态，组件挂载后可用 */
  state: WindowState | null
  /** 是否创建窗口 */
  created: boolean
  /** 窗口是否被销毁 */
  destroyed: boolean
  /** 组件API, 组件挂载后可用 */
  component: ComponentApi | null | undefined

  /** 窗口组件根元素的id */
  get wid(): string
  /** 窗口组件是否已创建 */
  get isReady(): boolean
  /** 是否允许窗口拖拽 */
  get allowDrag(): boolean
  /** 顶部可拖拽区域，默认只有顶部32px以内可以拖动 */
  get allowDragArea(): number
  /** 窗口是否已最大化 */
  get isMaximize(): boolean

  /** 创建一个事件对象 */
  createEvent(type: EventType): WindowEvent<this, any>
  /** 等待窗口组件创建完成 */
  ready(): Promise<unknown>
  /** 显示窗口 */
  show(): void
  /**
   * 关闭窗口
   * @param {boolean} forced - 是否强制关闭窗口
   */
  close(forced?: boolean): boolean
  /** 销毁窗口 */
  destroy(): void
  /** 获取窗口根元素 */
  getElement(): HTMLElement | undefined
  /** 获取窗口菜单，返回菜单类型数组 */
  useMenus(): ComputedRef<number[]>
  /** 窗口聚焦 */
  focus(): void
  /** 切换窗口最大化 */
  toggleMaximize(): void
  /** 固定窗口 */
  pin(): void
  /** 取消窗口固定 */
  unpin(): void
  /** 切换窗口的固定状态 */
  togglePin(): void
  /** 注册事件处理函数, 用于窗口和组件之间的交互 */
  useHandle(type: HandlerType, callback: Function): void
  /** 调用注册的confirm钩子并关闭窗口 */
  dispatchConfirm(): Promise<void>
  /** 确认并关闭窗口 */
  confirm(data?: any): void
  /**  调用注册的cancel钩子并关闭窗口 */
  dispatchCancel(): Promise<void>
  /** 取消并关闭窗口 */
  cancel(forced?: boolean, data?: any): void
  /** 将处理confirm和cancel钩子的逻辑通过Promise对象封装*/
  promisify()
}
```

[Teleport]: https://cn.vuejs.org/guide/built-ins/teleport.html
