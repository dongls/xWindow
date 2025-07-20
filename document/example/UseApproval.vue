<template>
  <div class="approval-form">
    <textarea type="text" v-model="state.value" placeholder="请输入" ref="inputRef" autofocus />
    <div class="approval-form-message" v-if="state.fail">请输入审批意见</div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useWindowApi } from '@dongls/xwindow'

const win = useWindowApi()
const state = reactive({ value: '', fail: false })

// 点击确定按钮会调用此函数，返回审批意见
win?.useHandle('confirm', () => {
  if (!state.value) {
    state.fail = true
    return Promise.reject('验证未通过')
  }

  return state.value
})
</script>
