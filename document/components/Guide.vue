<template>
  <aside :class="classes.guide" ref="guideRef">
    <div :class="classes.header">本页目录</div>
    <div :class="classes.list">
      <template v-for="(node, index) in nodes" :key="index">
        <div :class="{ [classes.anchor]: true, [classes.active]: node.path === current.path }">
          <a :href="`#${node.name}`" @click.prevent="jump(node)" :class="classes.link">{{ node.name }}</a>
        </div>
        <template v-if="node.children && current.name === node.name">
          <div v-for="child in node.children" :key="child.name" :class="{ [classes.anchor]: true, [classes.child]: true, [classes.active]: child.path === current.path }">
            <a :href="`#${child.name}`" @click.prevent="jump(child)" :class="classes.link">{{ child.name }}</a>
          </div>
        </template>
      </template>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { onMounted, shallowRef, ref, watch, reactive } from 'vue'

const props = defineProps({
  top: {
    type: Number,
    required: true,
  },
})

interface GuideNode {
  id: string
  path: string
  name: string
  children?: GuideNode[]
}

const guideRef = shallowRef<HTMLElement>()
const nodes = ref<GuideNode[]>([])
const current = reactive({ name: '', path: '' })

function init() {
  const guide = guideRef.value
  if (guide == null) return

  const article = guide.parentElement?.querySelector(':scope article')
  if (article == null) return

  const headers = article.querySelectorAll(':scope > h2,h3')
  if (headers.length == 0) return

  const arr: GuideNode[] = []
  let group: GuideNode | null = null
  for (let i = 0; i < headers.length; i++) {
    const header = headers[i]
    const name = genName(header as any)
    if (header.tagName === 'H2') {
      group = { id: header.id, name, path: name, children: [] }
      arr.push(group)
      continue
    }

    if (group == null) {
      arr.push({ id: header.id, name, path: name })
      continue
    }

    group.children!.push({ id: header.id, name, path: group.path + '_' + name })
  }

  nodes.value = arr
}

function jump(node: GuideNode) {
  const guide = guideRef.value
  if (guide == null) return

  const parent = guide.parentElement
  if (parent == null) return

  const target = parent.querySelector(':scope article #' + node.id)
  if (target == null) return

  target.scrollIntoView({ behavior: 'smooth' })
}

function getCurrent() {
  const guide = guideRef.value
  if (guide == null) return

  const article = guide.parentElement?.querySelector(':scope article')
  if (article == null) return

  const scroll = guide.parentElement
  if (scroll == null) return

  const headers = article.querySelectorAll<HTMLElement>(':scope > h2,h3')
  if (headers.length == 0) return

  const first = headers[0]
  if (props.top < first.offsetTop) return headers[0]

  const top = props.top + 48
  for (let i = 0; i < headers.length; i++) {
    const curr = headers[i]
    const next = headers[i + 1]
    if (top >= curr.offsetTop && (next == null || next.offsetTop >= top)) {
      return curr
    }
  }

  return headers[headers.length - 1]
}

function setCurrent(anchor: HTMLElement) {
  if (anchor.tagName == 'H2') {
    const target = nodes.value.find(c => c.name === anchor.textContent)
    if (target == null) return

    current.name = target.name
    current.path = target.path
    return
  }

  const target = nodes.value.find(c => {
    if (c.children == null) return false
    return c.children.some(c => c.name === anchor.textContent)
  })
  if (target == null) return

  current.name = target.name
  current.path = target.name + '_' + anchor.textContent!
}

function genName(element: HTMLElement) {
  const text = element.textContent ?? ''
  if (element.closest('.doc-prop-getter')) return 'get ' + text

  return text
}

function updateCurrent() {
  const current = getCurrent()
  if (current) setCurrent(current)
}

onMounted(() => {
  init()
  updateCurrent()
})

watch(() => props.top, updateCurrent)
</script>

<style module="classes">
.guide {
  position: absolute;
  top: 32px;
  right: 0;
  z-index: 9;
  width: 180px;
  flex-shrink: 0;
  font-size: 12px;
  margin-right: 10px;
  max-height: calc(100% - 32px);
  overflow: hidden;
}

.header {
  color: var(--doc-text-color);
  font-size: 12px;
  margin-bottom: 4px;
  font-weight: 700;
  line-height: 20px;
}

.list {
  border-left: 1px solid #ccc;
}

.anchor {
  padding: 0 8px;
  line-height: 20px;
  white-space: nowrap;
  color: rgba(60, 60, 60, 0.8);
  position: relative;
}

.active {
  color: var(--doc-link-color);
}

.active::before {
  content: '';
  position: absolute;
  left: -1px;
  top: 2px;
  bottom: 2px;
  border-left: 1px solid var(--doc-link-color);
}

.link {
  text-decoration: none;
  border-bottom: 1px solid transparent;
  color: inherit;
  transition:
    border-bottom-color ease 0.15s,
    background-color ease 0.15s;
}

.link:hover {
  text-decoration: none;
  color: var(--doc-link-color);
  border-bottom-color: var(--doc-link-color);
  background-color: var(--doc-link-hover-bg-color);
}

.child {
  padding-left: 16px;
}
</style>
