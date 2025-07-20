<template>
  <button type="button" class="btn btn-small" @click="showModal">打开模态框</button>
</template>

<script lang="tsx" setup>
import { useModal } from './utils'

function showModal() {
  useModal('窗口1', <div>内容</div>)
}
</script>
