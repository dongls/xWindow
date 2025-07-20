<template>
  <div :class="classes.picker">
    <button type="button" :class="menuClass" v-html="IconTheme" title="主题" />
    <ul :class="classes.panel">
      <template v-for="theme in themes" :key="theme.id">
        <li @click="setTheme(theme)" :style="{ '--theme-primary-color': theme.primaryColor }">
          <span :class="classes.badge" :style="{ background: theme.background }" />
          <strong>{{ theme.name }}</strong>
        </li>
      </template>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { IconTheme } from '../svg'

const props = defineProps({
  menuClass: {
    type: String,
    default: null,
  },
})

const themes = [
  { name: '皓白', primaryColor: '#ebeef0', textColor: '#000' },
  { name: '天缥', primaryColor: '#d5ebe1', textColor: '#000', navTextSecondaryColor: '#333' },
  { name: '海天霞', primaryColor: '#f3a694', textColor: '#000', navTextSecondaryColor: '#333' },
  { name: '暮山紫', primaryColor: '#a4abd6', textColor: '#000', navTextSecondaryColor: '#333' },
].map(theme => {
  return {
    ...theme,
    ...{
      background: theme.primaryColor,
    },
  }
})

function genCssVars(theme: any): any {
  return {
    '--xwindow-color-primary': theme.primaryColor,
    '--xwindow-header-color': theme.textColor,
    '--nav-text-secondary-color': theme.navTextSecondaryColor,
  }
}

function setTheme(theme: any) {
  const doc = document.documentElement

  const cssVars = genCssVars(theme)

  for (const prop in cssVars) {
    const value = cssVars[prop]
    if (value == null) {
      doc.style.removeProperty(prop)
    } else {
      doc.style.setProperty(prop, value)
    }
  }
}
</script>

<style lang="scss" module="classes">
.picker {
  position: relative;
  height: 32px;

  &:hover .panel {
    display: block;
  }
}

.panel {
  display: none;
  position: absolute;
  right: 0;
  top: 100%;
  background-color: #fff;
  z-index: 19;
  color: var(--doc-text-color-regular);
  list-style: none;
  margin: 0;
  padding: 0;
  width: 84px;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.15);

  li {
    padding: 6px;
    line-height: 20px;
    font-size: 14px;
    text-align: left;
    transition: background-color ease 0.3s;
    cursor: pointer;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    color: #000;
    position: relative;

    strong {
      font-size: 14px;
      font-weight: 400;
    }

    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 6px;
      bottom: 6px;
      width: 2px;
      background-color: transparent;
    }

    &:global(.is-dev) strong {
      color: red !important;
    }

    &:hover::after {
      background-color: var(--theme-primary-color);
    }

    & + li {
      border-top: 1px dashed #eee;
    }
  }
}

.badge {
  width: 20px;
  height: 20px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.15);
}
</style>
