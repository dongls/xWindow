<template>
  <div class="example-body">
    <div>激活页签:{{ active }}</div>
    <button type="button" @click="addTab">添加</button>
    <button type="button" @click="removeTab">删除</button>
    <button type="button" @click="switchTab">切换</button>
    <button type="button" @click="enableTab">启用</button>
    <button type="button" @click="disableTab">禁用</button>
  </div>
</template>

<script lang="ts" setup>
import { useTabsWindowApi } from '@dongls/xwindow'

const props = defineProps({
  active: {
    type: String,
    default: null,
  },
})

const instance = useTabsWindowApi()

function addTab() {
  if (instance == null) return

  const num = instance.options.tabs.length + 1
  instance.addTab({ label: '新标签' + num, name: 'tab' + num })
}

function removeTab() {
  const tabs = instance?.options.tabs
  if (tabs == null || tabs.length == 0) return

  const tab = tabs[tabs.length - 1]
  instance?.removeTab(tab.name)
}

function switchTab() {
  if (instance == null) return

  const tabs = instance?.options.tabs
  if (tabs == null || tabs.length == 0) return

  const tab = tabs[Math.floor(Math.random() * tabs.length)]
  if (tab == null) return

  instance.switchTab(tab.name)
}

function enableTab() {
  if (instance == null) return

  const tab = instance.options.tabs?.[0]
  if (tab == null) return

  instance.enableTab(tab.name)
}

function disableTab() {
  if (instance == null) return

  const tab = instance.options.tabs?.[0]
  if (tab == null) return

  instance.disableTab(tab.name)
}
</script>

<style></style>
