<template>
  <button class="btn" type="button" @click="useSingleWindow('标题')">打开单例窗口</button>
</template>

<script lang="tsx" setup>
import { useSimpleWindow, createSingleWindow } from '@dongls/xwindow'

const useSingleWindow = createSingleWindow(function (title: string) {
  return useSimpleWindow(title, <div class="example-body">这是一个单例窗口，只会存在一个打开的窗口。</div>)
    .promisify<string>()
    .catch(err => null)
})
</script>
