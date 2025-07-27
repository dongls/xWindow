<template>
  <button type="button" class="btn btn-small" @click="showModal">审批</button>
  <div :class="classes.output" v-if="result">
    <strong>操作结果：</strong>
    <pre>{{ result }}</pre>
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
<style module="classes">
.output {
  margin-top: 4px;
  display: flex;
}

.output pre {
  margin: 0;
  flex: 1;
  width: 0;
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
