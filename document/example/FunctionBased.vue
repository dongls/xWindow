<template>
  <button class="btn" type="button" @click="createContentByJSX">JSX</button>
  <button class="btn" type="button" @click="createContentByText">文本</button>
  <button class="btn" type="button" @click="createContentByRenderFunction">渲染函数</button>
  <button class="btn" type="button" @click="createContentByFunction">函数</button>
  <button class="btn" type="button" @click="createContentByComponent">组件</button>
</template>

<script lang="tsx" setup>
import WinBody from './WinBody.vue'

import { h } from 'vue'
import { useWindow } from '@dongls/xwindow'

function createContentByJSX() {
  useWindow('窗口1', <div class="example-body">这段文本是使用JSX创建的。</div>)
}

function createContentByText() {
  useWindow('窗口2', '这段本文可以直接展示。')
}

function createContentByRenderFunction() {
  useWindow('窗口3', h('div', { className: 'example-body' }, '这段文本是通过Vue提供的渲染函数创建的。'))
}

function createContentByFunction() {
  useWindow('窗口4', () => <div class="example-body">这段文本是通过返回VNode节点的函数创建的。</div>)
}

function createContentByComponent() {
  useWindow('窗口5', <WinBody text="这段文本通过组件创建的。" />)
}
</script>
