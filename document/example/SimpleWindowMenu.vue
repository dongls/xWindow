<template>
  <button type="button" @click="showWindow">打开窗口</button>
</template>

<script lang="tsx" setup>
import { useSimpleWindow } from '@dongls/xwindow'

function showWindow() {
  useSimpleWindow('标题', <div class="example-body">内容</div>, {
    menus: [
      {
        label: '自定义菜单',
        handler: () => alert('点击事件'),
      },
    ],
  })
}
</script>
