## 安装

推荐使用包管理器安装xWindow，通过构建工具（[Webpack]、[Vite]）使用。

```bash
# npm
npm i @dongls/xwindow

# pnpm
pnpm i @dongls/xwindow
```

安装成功后，按如下代码引入即可。

```javascript
import '@dongls/xwindow/dist/style.css'
import { xWindow } from '@dongls/xwindow'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.use(xWindow)
app.mount('#app')
```

如果你的工程使用了`TypeScript`，xWindow也提供了类型定义。

```typescript
import { BlankWindow } from '@dongls/xwindow'

let instance: BlankWindow = null
```

## 函数式调用

需要注意的是，在使用`useWindow`函数之前，推荐先**声明`WindowManager`组件**。该组件提供了对函数式调用的支持，以及键盘事件的响应。

```vue
<template>
  <!-- 推荐在工程的根组件中声明WindowManger组件 -->
  <WindowManager />
</template>
```

xWindow提供了`useWindow`函数，用于快速创建窗口。由于抛弃了通过模板创建窗口，因此推荐JSX来声明要展示的内容。如果你对此并不熟悉，请先阅读Vue文档中的[渲染函数&JSX][RenderFunction]一节。

<example-code src="FunctionBased.vue"/>

最终效果如下：
<span class="quickstart-function-based"><FunctionBased/></span>

## 层级管理

xWindow内置了一套层级管理机制(默认以`1000`为起始点)。你也可以提供自定义的层级管理对象，来控制窗口的层级。

```typescript
import App from './app.vue'

import { createApp, ref } from 'vue'
import { registerZIndexManager, xWindow, type WindowZIndexManager } from '@dongls/xwindow'

const app = createApp(App)
const zIndex = ref(2000)
const zIndex: WindowZIndexManager = {
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

// 在注册插件时指定
app.use(xWindow, { zIndex })
// 或者通过API指定
registerZIndexManager(zIndex)

app.mount('#app')
```

## 窗口预设

xWindow支持预设窗口，方便你自定义窗口的形态。需要注意的是，键为`default`的预设将作为所有窗口的默认值。

```typescript
import App from './app.vue'
import { createApp, ref } from 'vue'
import { xWindow, registerPreset } from '@dongls/xwindow'

const app = createApp(App)
// 在注册插件时指定
app.use(xWindow, {
  presets: {
    // 可以传入创建窗口的选项
    default: {},
    small: {},
    large: {},
  },
})

// 通过API注册
registerPreset('default', {})
registerPreset('small', {})
registerPreset('large', {})

app.mount('#app')
```

[Webpack]: https://github.com/webpack/webpack
[Vite]: https://github.com/vitejs/vite
[RenderFunction]: https://vuejs.org/guide/extras/render-function.html
