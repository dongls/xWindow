<template>
  <button type="button" class="btn btn-small" @click="showModal">审批</button>
  <div class="approval-output">
    <template v-if="result">
      <strong>操作结果：</strong>
      <pre>{{ result }}</pre>
    </template>
  </div>
</template>

<script lang="tsx" setup>
import { ref } from 'vue'
import { useApproval } from './utils'

const result = ref('')

async function showModal() {
  const value = await useApproval().catch(e => {
    console.log(e)
    return null
  })

  if (value == null) {
    result.value = '取消操作'
    return
  }

  result.value = value
}
</script>
