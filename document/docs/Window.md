## BlankWindow

`BlankWindow`是窗口的基类，用于创建空白窗口。在使用[useBlankWindow](/api#useBlankWindow)时会返回它的实例。有关它的说明，请参照以下内容：

### wid{.doc-prop-getter #get_wid} 

- 类型: `string`
- 描述: 窗口组件根元素的`id`。

### isReady{.doc-prop-getter #get_isReady} 

- 类型: `boolean`
- 描述: 窗口组件是否已创建。

### allowDrag{.doc-prop-getter #get_allowDrag} 

- 类型: `boolean`
- 描述: 窗口是否允许拖拽。

### allowDragArea{.doc-prop-getter #get_allowDragArea} 

- 类型: `number`
- 描述: 窗口顶部可拖拽区域，默认只有顶部`32px`以内可以拖动。

### isMaximize{.doc-prop-getter #get_isMaximize} 

- 类型: `boolean`
- 描述: 窗口是否已最大化。

### isFixedZIndex{.doc-prop-getter #get_isFixedZIndex}  

- 类型: `boolean`
- 描述: 窗口是否为固定层级的窗口。

### zIndex{.doc-prop-getter #get_zIndex}

- 类型: `number`
- 描述: 窗口的层级。

### id

- 类型: `number`
- 描述: 自动生成的窗口`id`，只读。

### type

- 类型: `WindowType`
- 描述: 窗口类型，参照[type](/api#type)

### options

- 类型: `WindowOptions`
- 描述: 创建窗口时传入的参数，参照[窗口选项](/api#窗口选项)

### body

- 类型: `WindowBody`
- 描述: 创建窗口时传入的窗体，参照[body](/api#body)

### state

- 类型: `WindowState` | `undefined`
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
- 描述: 窗口状态对象，该对象在窗口创建后由组件注入。该对象为响应式对象，请谨慎修改。为确保该对象可以正常访问，请参照[ready()](/window#ready)。

### created

- 类型: `boolean`
- 描述: 用于标识窗口组件是否已创建。窗口创建后，[state](/window#state)属性可以正常访问。

### destroyed

- 类型: `boolean`
- 描述: 用于标识窗口组件是否已销毁。

### component

- 类型: `ComponentApi` | `undefined`
  ```typescript
  interface ComponentApi {
    /** 获取窗口顶层DOM对象 */
    getElement(): HTMLElement | undefined
    /** 获取组件当前渲染状态 */
    getRenderState(): number
    /** 获取组件样式 */
    useCssModule(): Record<string, string>
    /** 获取窗口菜单 */
    useMenus(): number[]
  }
  ```
- 描述：窗口组件对外暴露的`api`，组件创建后可以用。需要注意的是，`getElement()`方法需要组件挂载后才能获取到DOM元素。


### createEvent()

- 类型: `function`

```typescript
function createEvent(type: EventType, data?: any): WindowEvent<this, any>
```

- 描述:创建一个窗口事件对象，事件的类型参照[窗口事件](/window#窗口事件)一节。

```typescript
instance.createEvent('created')
```

### ready()

- 类型: `function`

```typescript
function ready(): Promise<void>
```

- 描述: 等待窗口组件创建完成。

```typescript
instance.ready().then(() => {
  // do something
})
```

### show()

- 类型: `function`

```typescript
function show(): void
```

- 描述: 显示窗口。窗口显示前会触发`beforeShow`事件。

### close()

- 类型: `function`

```typescript
function close(force?: boolean): void
```

- 描述: 关闭窗口。如果`force`为`true`, 则会忽略[closeable](/api#closeable)选项，强制关闭窗口。窗口关闭前会触发`beforeClose`事件。窗口关闭后会触发`close`事件。

### destroy()

- 类型: `function`

```typescript
function destroy(): void
```

- 描述：销毁窗口。窗口销毁前会触发`beforeDestroy`事件。

### getElement()

- 类型: `function`

```typescript
function getElement(): HTMLElement | undefined
```

- 描述: 获取窗口根元素。此方法直接调用`ComponentApi.getElement()`。

### getMenus()

- 类型: `function`

```typescript
function getMenus(): number[]
```

- 描述: 获取窗口菜单列表。此方法直接调用`ComponentApi.getMenus()`。

### getCssModule()

- 类型: `function`

```typescript
function getCssModule(): Record<string, string>
```

- 描述: 获取窗口组件的样式。此方法直接调用`ComponentApi.getCssModule()`

### focus()

- 类型: `function`

```typescript
function focus(): void
```

- 描述: 使窗口聚焦，会使窗口显示在最上层。

### toggleMaximize()

- 类型: `function`

```typescript
function toggleMaximize(): void
```

- 描述: 切换窗口的最大化状态。

### pin()

- 类型: `function`

```typescript
function pin(): void
```

- 描述: 将窗口置于最顶层。

### unpin()

- 类型: `function`

```typescript
function unpin(): void
```

- 描述: 取消窗口的置顶状态。

### togglePin()

- 类型: `function`

```typescript
function togglePin(): void
```

- 描述: 切换窗口的置顶状态。

### useHandle()

- 类型: `function`

```typescript
type HandlerType = 'confirm' | 'cancel'

function useHandle(type: HandlerType, callback: Function): void
```

- 描述: 注册事件处理函数, 用于窗口和组件之间的交互。

### dispatchConfirm()

- 类型: `function`

```typescript
function dispatchConfirm(): Promise<void>
```

- 描述：调用注册的confirm钩子并关闭窗口

### confirm()

- 类型: `function`

```typescript
function confirm(data?: any): void
```

- 描述: 触发`confirm`事件并关闭窗口。如果传入`data`，则会随事件一并传递。

### dispatchCancel()

- 类型: `function`

```typescript
function dispatchCancel(): Promise<void>
```

- 描述：调用注册的cancel钩子并关闭窗口

### cancel()

- 类型: `function`

```typescript
function cancel(forced?: boolean, data?: any): void
```

- 描述: 触发`cancel`事件并关闭窗口。如果传入`data`，则会随事件一并传递。如果`forced`为`true`，会强制关闭窗口，参照[close](/window#close)。

### promisify()

- 类型: `function`

```typescript
function promisify<T = any>(): Promise<T>
```

- 描述: 将处理`confirm`和`cancel`钩子的逻辑通过`Promise`对象封装。

## SimpleWindow
`SimpleWindow`继承自[BlankWindow](/window#BlankWindow)，用于创建一个带标题的窗口。

### updateMenus()
- 类型: `function`
```typescript
function updateMenus(menus: SimpleWindowMenu[]): void
```
- 描述: 更新窗口菜单。

## 窗口实例

窗口实例可用于操作窗口行为。可以通过以下几种方式获取：

```typescript
import { defineComponent } from 'vue'
import { useWindow, useBlankWindow, useSimpleWindow, useWindowApi } from '@dongls/xwindow'

// 1. 通过函数创建窗口时，返回值就是一个窗口实例
const instance1 = useWindow('标题', <div>窗体</div>)
const instance2 = useBlankWindow('标题', <div>窗体</div>)
const instance3 = useSimpleWindow('标题', <div>窗体</div>)

// 2. 可以在窗体组件中获取窗口实例
const WindowBody = defineComponent({
  setup(){
    const instance = useWindowApi()
    return {}
  }
})

// 3.可以通过函数返回窗体，窗口实例会作为参数传入
useSimpleWindow('标题', (instance) => {
  return <div>窗体</div>
})
```

## 窗口事件
[BlankWindow](/window#BlankWindow)继承了`Emitter`，可以监听和触发事件。其类型定义如下：
```typescript
// 事件处理函数
interface EventListener<T = any> {
  (evt: WindowEvent<T>): void
}

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

class Emitter<T = any> {
  /** 监听事件 */
  on(type: EventType, listener: EventListener<T>): this
  /** 监听事件，仅生效一次 */
  once(type: EventType, listener: EventListener<T>): this
  /** 取消事件监听 */
  off(type: EventType, listener: EventListener<T>, delay?: boolean): this
  /** 触发一个事件 */
  dispatch(event: WindowEvent): WindowEvent<any, any>
}
```

当你需要监听事件时，可以按以下方式监听：
```typescript
import { useSimpleWindow } from '@dongls/xwindow'

const instance = useSimpleWindow('标题', <div>窗体</div>)

// 所有事件的类型都为WindowEvent
instance.once('created', event => console.log(event))
instance.on('close', event => console.log(event))
```
当你需要触发某个事件时，可以按以下方式触发：
```typescript
import { useSimpleWindow } from '@dongls/xwindow'

const instance = useSimpleWindow('标题', <div>窗体</div>)
instance.dispatch(this.createEvent('created'))
```

窗口事件请参照以下表格。 如果需要取消事件默认行为，请调用传入事件的对象`event.preventDefault()`。

<Events/>

<Footer path="/window"/>
