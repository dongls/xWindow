<template>
  <div :class="classes.footer">
    <div v-if="prev" :class="classes.prev">
      <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 24 24">
        <path d="M15,19c-0.3,0-0.5-0.1-0.7-0.3l-6-6c-0.4-0.4-0.4-1,0-1.4l6-6c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4L10.4,12l5.3,5.3c0.4,0.4,0.4,1,0,1.4C15.5,18.9,15.3,19,15,19z"></path>
      </svg>
      <a :href="prev.path">{{ prev.name }}</a>
    </div>
    <div :class="classes.space" />
    <div v-if="next" :class="classes.next">
      <a :href="next.path">{{ next.name }}</a>
      <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 24 24">
        <path d="M9,19c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l5.3-5.3L8.3,6.7c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l6,6c0.4,0.4,0.4,1,0,1.4l-6,6C9.5,18.9,9.3,19,9,19z"></path>
      </svg>
    </div>
  </div>
</template>

<script lang="ts" setup>
import docs from '../docs/index'
import { computed } from 'vue'

const props = defineProps({
  path: {
    type: String,
    required: true,
  },
})

const prev = computed(() => {
  const index = docs.findIndex(doc => doc.path === props.path)
  if (index <= 0) return null

  return docs[index - 1]
})

const next = computed(() => {
  const index = docs.findIndex(doc => doc.path === props.path)
  if (index < 0 || index >= docs.length - 1) return null

  return docs[index + 1]
})
</script>

<style module="classes">
.footer {
  margin-top: 48px;
  border-top: 1px solid rgba(60, 60, 60, 0.12);
  padding: 16px 0;

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
}

.prev,
.next {
  font-size: 14px;
  display: flex;
  align-items: center;
}

.next {
  text-align: right;
}

.prev svg,
.next svg {
  width: 14px;
  height: 14px;
  fill: currentColor;
}

.space {
  flex: 1;
}

.prev svg {
  margin-right: 4px;
}

.next svg {
  margin-left: 4px;
}
</style>
