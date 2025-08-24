<template>
  <svg :class="classes.icon" aria-hidden="true" :style="style">
    <use :xlink:href="'#' + icon"></use>
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: '14px',
  },
  color: {
    type: String,
  },
})

const style = computed(() => {
  return {
    fontSize: props.size,
    color: props.color,
  }
})
</script>

<style module="classes">
.icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
}
</style>
