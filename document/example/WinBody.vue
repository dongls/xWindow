<template>
  <div class="example-body">{{ text }}</div>
</template>

<script lang="ts" setup>
defineProps({
  text: String,
})
</script>
