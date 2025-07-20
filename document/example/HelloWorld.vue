<template>
  <button type="button" @click="createWindow" class="btn btn-small">尝试一下</button>
</template>

<script lang="tsx" setup>
import { useWindow } from '@dongls/xwindow'

function createWindow() {
  useWindow('标题', <div class="example-body">Hello, xWindow!</div>)
}
</script>
