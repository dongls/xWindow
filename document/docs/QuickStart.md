## 安装

推荐使用包管理器安装*xWindow*，通过构建工具([Webpack](https://github.com/webpack/webpack)、[Vite](https://github.com/vitejs/vite))使用。

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

## 创建窗口

在创建窗口之前，推荐先**声明`WindowManager`组件**。虽然这不是必须的，但是这种方式更容易和你的系统集成。

```vue
<template>
  <!-- 推荐在工程的根组件中声明-->
  <WindowManager />
</template>

<script lang="ts" setup>
import { WindowManager } from '@dongls/xwindow'
</script>
```

*xWindow*提供了[useWindow](/api#useWindow)函数，用于快速创建窗口。由于抛弃了通过模板创建窗口，因此推荐`JSX`来声明要展示的内容。如果你对此并不熟悉，请先阅读Vue文档中的[渲染函数&JSX](https://cn.vuejs.org/guide/extras/render-function)一节。

<example-code src="FunctionBased.vue"/>

最终效果如下：
<div class="doc-example">
  <span class="quickstart-function-based"><FunctionBased/></span>
</div>

## 层级管理

*xWindow*内置了一套层级管理机制(默认以`1000`为起始点)，当然你也可以提供自定义的层级管理对象。

```typescript
import App from './app.vue'

import { createApp, ref } from 'vue'
import { xWindow, type WindowZIndexManager } from '@dongls/xwindow'

// 一个简单的层级管理实现
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

const app = createApp(App)
// 在注册插件时指定
app.use(xWindow, { zIndex: zIndexManager })
// 或者通过API指定
xwindow.registerZIndexManager(zIndexManager)

app.mount('#app')
```

## 窗口预设

*xWindow*支持预设窗口的默认选项，方便你自定义窗口的形态。需要注意的是，键为`default`的预设将作为所有窗口的默认值。对于创建窗口时传入的选项，会覆盖预设中的值，具体优先级如下：
1. 键为`default`预设
2. 键为*其他名称*的预设
3. 创建窗口时传入的选项

```typescript
import App from './app.vue'
import { createApp, ref } from 'vue'
import { xWindow, type WindowPreset } from '@dongls/xwindow'

const app = createApp(App)
const presets:Record<string, WindowPreset> = {
  default: {/** 预窗口预设参数 */}
}
// 在注册插件时指定
app.use(xWindow, { presets })
app.mount('#app')

// 也可以通过API注册
xWindow.registerPreset('small', {
  width: '800px',
  height: '600px',
  // 其他的选项
})

```

指定窗口预设后，就可以在创建时指定预设。
```typescript
import { useSimpleWindow } from '@dongls/xwindow'
// 这样可以根据small的窗口预设，直接创建一个800px*600px的窗口
useSimpleWindow('标题', <YourComponent/>, { preset: 'small' })
```


## 窗口菜单
如果在你的组件中需要使用*xWindow*内置的按钮，可以使用`WindowMenus`组件。
```vue
<template>
  <div>
    <WindowMenus :instance="winApi" v-if="winApi" />
    <!-- 其他内容 -->
  </div>
</template>

<script lang="ts" setup>
import { useWindowApi, WindowMenus } from '@dongls/xwindow'

// 注入窗体实例
const winApi = useWindowApi()
</script>
```

<Footer path="/quickstart"/>


