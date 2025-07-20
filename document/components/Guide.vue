<template>
  <aside :class="classes.guide" ref="guideRef">
    <div v-for="(node, index) in nodes" :key="index" :class="classes.anchor">
      <span>{{ index + 1 }}.</span>
      <a :href="`#${node.name}`" @click.prevent="jump(node)">{{ node.name }}</a>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { onMounted, shallowRef, ref } from 'vue'

interface GuideNode {
  name: string
}

const guideRef = shallowRef<HTMLElement>()
const nodes = ref<GuideNode[]>([])

function init() {
  const guide = guideRef.value
  if (guide == null) return

  const article = guide.parentElement?.querySelector(':scope > article')
  if (article == null) return

  const headers = article.querySelectorAll(':scope > h2')
  if (headers.length == 0) return

  nodes.value = [...headers].map(c => {
    return {
      name: c.textContent!,
    }
  })
}

function jump(node: GuideNode) {
  console.log(node)
}
onMounted(init)
</script>

<style module="classes">
.guide {
  --xwindow-guide-bg-color: #fcfcfc;
  float: right;
  position: sticky;
  top: 10px;
  z-index: 9;

  width: 170px;
  border: 1px solid transparent;
  flex-shrink: 0;
  font-size: 12px;
  border-radius: 2px;
  margin-right: 10px;

  background:
    linear-gradient(var(--xwindow-guide-bg-color), var(--xwindow-guide-bg-color)) padding-box,
    linear-gradient(45deg, #42d392, #647eff) border-box;
}

.anchor {
  padding: 0 8px;
  line-height: 24px;
  white-space: nowrap;
  color: #333;
}

.anchor a {
  color: transparent;
  text-decoration: none;
  color: #0d6efd;
}

.anchor a:hover {
  text-decoration: underline;
}
</style>
