<template>
  <div :class="classes.app">
    <aside :class="classes.aside">
      <div :class="classes.leftHeader">
        <i :class="classes.logo" :innerHTML="icons.IconWindow" />
        <h3 :class="classes.title">
          <span>xWindow</span><small>v{{ version }}_{{ timestamp }}</small>
        </h3>
      </div>
      <nav :class="classes.navs" class="is-scroll">
        <div v-for="doc in docs" @click="navigate(doc)" :class="[classes.nav, doc.path == path ? classes.activeNav : null]">{{ doc.name }}</div>
      </nav>
      <div :class="classes.copyright">
        <span>Copyright © 2023-present dongls</span>
      </div>
    </aside>
    <main :class="{ [classes.main]: true, [classes.withGuide]: showGuide }">
      <div :class="classes.rightHeader"><Menus /></div>
      <div :class="classes.scroll" ref="scroll" @click.native.stop="onClick" @scroll="handleScroll">
        <Content :path="path" :hash="hash" :key="path" ref="contentApi" />
      </div>
      <Guide :key="path" :top="top" v-if="showGuide" />
    </main>
  </div>
</template>

<script setup lang="tsx">
import Theme from './components/Theme.vue'
import Guide from './components/Guide.vue'
import docs from './docs/index'
import Content, { type ContentApi } from './docs/Content.vue'

import { ref, useCssModule, computed, nextTick } from 'vue'
import { useWindowApi, useIcons, WindowMenus } from '@dongls/xwindow'
import { IconGithub } from './svg'
import { throttle } from './utils/lang'

const className = useCssModule('classes')
const timestamp = __TIMESTAMP__
const version = __VERSION__
const defaultNav = __IS_DEV__ ? 0 : 0
const scroll = ref<HTMLElement>()
const contentApi = ref<ContentApi>()

const winApi = useWindowApi()
const icons = useIcons()
const top = ref(0)
const path = ref(docs[defaultNav].path)
const hash = ref<string>()

const showGuide = computed(() => path.value !== '/example')

const handleScroll = throttle(() => (top.value = scroll.value?.scrollTop ?? 0))

function stopPropagation(event: Event) {
  event.stopPropagation()
}

function Menus() {
  if (winApi == null) return null

  const classes = winApi.useCssModule()
  return (
    <div class={className.menus} onMousedown={stopPropagation}>
      <Theme menuClass={classes.menu} />
      <button title="GitHub" class={classes.menu} onClick={toGitHub} innerHTML={IconGithub} />
      <WindowMenus instance={winApi} />
    </div>
  )
}

function toGitHub() {
  window.open('https://github.com/dongls/xWindow')
}

async function navigate(doc: any) {
  path.value = doc.path
  hash.value = undefined
  await nextTick()
  contentApi.value?.scrollTop()
}

function onClick(event: MouseEvent) {
  const target = event.target as HTMLElement
  if (target == null) return

  // 导航
  if (target instanceof HTMLAnchorElement) {
    const href = target.getAttribute('href')
    if (href == null || href.startsWith('http')) return

    event.preventDefault()
    jump(target.pathname, target.hash)
    return
  }

  // 复制
  if (target instanceof HTMLButtonElement) {
    const pre = (event.target as HTMLElement).closest('pre.hljs')
    if (pre == null) return

    const code = pre.querySelector(':scope > code.hljs-code')
    if (code == null) return

    const text = code.textContent
    if (text == null) return

    return navigator.clipboard.writeText(text).then(() => {
      target.classList.add('doc-copy-btn-active')
      setTimeout(() => target.classList.remove('doc-copy-btn-active'), 1000)
    })
  }
}

async function jump(p: string, h: string) {
  path.value = p
  hash.value = decodeURIComponent(h)

  await nextTick()

  if (h) contentApi.value?.scrollTo(hash.value)
  else contentApi.value?.scrollTop()
}
</script>

<style lang="scss" module="classes">
:root {
  --nav-text-secondary-color: #666;
}

.app {
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
}

.header {
  height: 32px;
}

.leftHeader {
  composes: header;

  display: flex;
  align-items: center;
}

.rightHeader {
  --xwindow-header-color: #000;

  composes: header;
  position: relative;
}

.menus {
  position: absolute;
  right: 0;
  top: 0;

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}

.aside {
  width: 320px;
  background-color: var(--xwindow-color-primary);
  display: flex;
  flex-flow: column nowrap;
  border-radius: var(--xwindow-border-radius) 0 0 var(--xwindow-border-radius);
}

.navs {
  flex: 1;
  height: 0;
  overflow: auto;
}

.nav {
  position: relative;
  padding: 10px;
  line-height: 20px;
  transition: background-color ease 0.25s;
  cursor: default;

  & + .nav {
    margin-top: 1px;
  }

  &:hover {
    background-color: #fff;
  }
}

.activeNav {
  background-color: #fff;
  font-weight: 700;

  &::before {
    content: '';
    position: absolute;
    height: 20px;
    width: 4px;
    top: 10px;
    bottom: 10px;
    left: 0;
    background-color: #000;
  }
}

.main {
  height: 100%;
  flex: 1;
  width: 0;

  display: flex;
  flex-flow: column nowrap;
}

.withGuide .scroll {
  padding-right: 190px;
}

.withGuide :global(.article) {
  max-width: 1200px;
  margin: 0 auto;
}

.scroll {
  flex: 1;
  height: 0;
  overflow: auto;
  position: relative;
}

.copyright {
  margin: 0;
  color: var(--nav-text-secondary-color);
  line-height: 19px;
  padding: 10px;
}

.logo {
  width: 30px;

  svg {
    display: block;
    width: 18px;
    height: 18px;
    margin: 0 auto;
  }
}

.title {
  vertical-align: bottom;
  font-size: 16px;
  margin: 0;

  small {
    font-size: 12px;
    margin-left: 4px;
    font-weight: 400;
    color: var(--nav-text-secondary-color);
  }
}

.other {
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
}
</style>
