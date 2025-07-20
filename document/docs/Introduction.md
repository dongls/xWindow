xWindow是一个函数式的弹窗组件库，它提供了一套快捷的API来创建和使用窗口。本文档的就是基于xWindow创建了一个窗口，你可以拖动文档查看效果。

## 特性

- 基于*TypeScript*和*Vue@3.3*开发
- 支持窗口组件常用功能
- 支持函数式调用
- 与`Promise`结合使用，可将业务封装为一个函数
- 提供*SimpleWindow*、*BlankWindow*两种不同的窗口组件

## 设计动机

xWindow最大的特色是可以**通过函数直接创建窗口**，显示你想要的东西。在业务系统中，经常会遇到以下情况：

- 业务组件中存在多个弹窗
- 某一业务中需要弹窗操作，获取结果后进行下一步操作

通常情况下，需要在业务组件内将其一一定义，并维护这些窗口的状态。这些状态不仅定义繁琐，而且与业务无关，例如这样：

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

如果你觉得上述过程繁琐，下面是xWindow的一个基本示例：

```js
import { useWindow } from '@dongls/xwindow'

// 你可以在需要地方通过代码直接创建一个窗口
useWindow('标题', <div>Hello, xWindow!</div>)
```

xWindow不需要事先在业务组件中声明，你可以在任何需要的地方直接创建一个窗口。 <HelloWorld/>

[vue]: https://github.com/vuejs/core
