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
        <div v-for="doc in docs" @click="showContent(doc)" :class="[classes.nav, doc.id == current.id ? classes.activeNav : null]">{{ doc.name }}</div>
      </nav>
      <div :class="classes.copyright">
        <span>Copyright © 2023-present dongls</span>
      </div>
    </aside>
    <main :class="classes.main">
      <div :class="classes.rightHeader"><Menus /></div>
      <div :class="classes.scroll" ref="scroll" @click.stop="copy">
        <Guide :key="current.id" v-if="current.guide !== false" />
        <Content :class="{ [classes.content]: true, [classes.withGuide]: current.guide !== false }" />
      </div>
    </main>
  </div>
</template>

<script setup lang="tsx">
import Example from './example/index'
import Events from './components/Events.vue'
import UseExample from './components/UseExample.vue'
import UseModal from './components/UseModal.vue'

import Theme from './components/Theme.vue'
import Guide from './components/Guide.vue'
import docs from './docs/index'

import { nextTick, ref, h, useCssModule } from 'vue'
import { useWindowApi, useIcons, WindowMenus } from '@dongls/xwindow'
import { IconGithub } from './svg'

const className = useCssModule('classes')
const timestamp = __TIMESTAMP__
const version = __VERSION__

const defaultNav = __IS_DEV__ ? 3 : 0
const winApi = useWindowApi()
const icons = useIcons()
const current = ref(docs[defaultNav])
const scroll = ref<HTMLElement>()
const components = { Events, UseExample, UseModal, ...Example }

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

function Content() {
  const template = current.value.content
  return h('article', { class: 'article', key: current.value.id }, h({ template, components }))
}

async function showContent(doc: any) {
  current.value = doc

  await nextTick()
  if (scroll.value) scroll.value.scrollTop = 0
}

function copy(event: MouseEvent) {
  const button = (event.target as HTMLElement).closest('button')
  if (button == null) return

  const pre = (event.target as HTMLElement).closest('pre.hljs')
  if (pre == null) return

  const code = pre.querySelector(':scope > code.hljs-code')
  if (code == null) return

  const text = code.textContent
  if (text == null) return

  navigator.clipboard.writeText(text).then(() => {
    button.classList.add('doc-copy-btn-active')
    setTimeout(() => button.classList.remove('doc-copy-btn-active'), 1000)
  })
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

.content {
  padding: 0 20px 20px 20px;
}

.content ::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.content ::-webkit-scrollbar-thumb {
  background-color: rgba(220, 220, 220, 1);
  border-radius: 5px;
  background-clip: content-box;
  border: 1px solid transparent;
}

.content ::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 1);
}

.content ::-webkit-scrollbar-track {
  background-color: transparent;
}

.content ::-webkit-scrollbar-corner {
  background-color: transparent;
}

.withGuide {
  margin-right: 180px;
}

.scroll {
  flex: 1;
  height: 0;
  overflow: auto;
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
</style>
