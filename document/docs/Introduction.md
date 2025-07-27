*xWindow*是一个简单易用的弹窗组件库，它提供了一套快捷的[API](/api)来创建和使用窗口。

> 本文档的就是基于xWindow创建了一个窗口，你可以拖动文档查看效果。

## 特性

- 基于[TypeScript][typescript]和[Vue][vue]开发
- 支持窗口组件常用功能
- 通过函数直接创建窗口
- 与[Promise][promise]结合使用，可将业务封装为一个函数
- 内置`BlankWindow`、`SimpleWindow`两种不同的窗口组件

## 设计动机

*xWindow*最大的特色是可以**通过函数直接创建窗口**，显示你想要的东西。在业务系统中，经常会遇到以下情况：

- 业务组件中存在多个弹窗
- 某一业务中需要弹窗操作，获取结果后进行下一步操作
- 需要将弹窗封装为函数，并返回一个`Promise`

通常情况下，需要在业务组件内将其逐一定义，并维护它们状态。这样不仅繁琐，而且与业务无关，例如这样：

```vue
<template>
  <div>其他的业务代码</div>
  <xx-dialog v-model="visible1" title="窗口标题1">窗口内容</xx-dialog>
  <xx-dialog v-model="visible2" title="窗口标题2">窗口内容</xx-dialog>
  <xx-dialog v-model="visible3" title="窗口标题3">窗口内容</xx-dialog>
</template>

<script setup>
import { ref } from 'vue'

const visible1 = ref(false)
const visible2 = ref(false)
const visible3 = ref(false)
</script>
```

如果你觉得上述过程繁琐，下面是*xWindow*的一个基本示例：

```js
import { useWindow } from '@dongls/xwindow'

// 你可以在需要地方通过代码直接创建一个窗口
useWindow('标题', <div>Hello, xWindow!</div>)
```

*xWindow*不需要事先在业务组件中声明，你可以在任何需要的地方直接创建一个窗口。

<div class="doc-example">
  <HelloWorld/>
</div>

<Footer path="/introduction"/>

[vue]: https://vuejs.org
[typescript]: https://www.typescriptlang.org
[promise]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise