<template>
  <WindowManager />
</template>

<script setup lang="tsx">
import { useBlankWindow, BlankWindow, WindowManager } from '@dongls/xwindow'
import { onBeforeUnmount, onMounted } from 'vue'
import Docs from './docs.vue'

let instance: BlankWindow | null = null

function closwWindow() {
  if (instance) instance.close()
  instance = null
}

onBeforeUnmount(closwWindow)
onMounted(() => {
  instance = useBlankWindow({
    closeable: false,
    zIndex: 999,
    width: '1300px',
    height: '900px',
    minWidth: 1102,
    minHeight: 480,
    body: <Docs />,
    className: 'xwindow-doc',
  })
})
</script>

<style lang="scss">
html,
body {
  overflow: hidden;
}

.xwindow-doc .x-window-body {
  border: 1px solid var(--xwindow-color-primary);
}

.xwindow-doc .x-window-body::after {
  position: absolute;
  top: 0;
  right: 0;

  border: 1px solid;
}
</style>
