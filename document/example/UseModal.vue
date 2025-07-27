<template>
  <button type="button" class="btn btn-small" @click="showModal">打开模态框</button>
</template>

<script lang="tsx" setup>
import { useModal } from './utils'

function showModal() {
  useModal('标题', <div>内容</div>)
}
</script>
