<template>
  <section :class="classes.row">
    <header>窗口尺寸：</header>

    <div :class="classes.content">
      <label>宽度：<input type="text" v-model="winState.width" placeholder="参照CSS的width属性" /></label>
      <label>高度：<input type="text" v-model="winState.height" placeholder="参照CSS的height属性" /></label>
      <button type="button" class="btn btn-mini" @click="changeSize(800, 600)">800px*600px</button>
      <button type="button" class="btn btn-mini" @click="changeSize(390, 840)">390px*840px</button>
    </div>
  </section>

  <section :class="classes.row">
    <header>窗口位置：</header>
    <div :class="classes.content">
      <label>左侧：<input type="text" v-model="winState.left" placeholder="参照CSS中left属性" /></label>
      <label>上侧：<input type="text" v-model="winState.top" placeholder="参照CSS中top属性" /></label>
    </div>
  </section>

  <section :class="classes.row">
    <header>窗口特性：</header>
    <div :class="classes.content">
      <label v-for="option in options" :key="option.prop">
        <input type="checkbox" v-model="(winState as any)[option.prop]" />
        <span>{{ option.label }}</span>
      </label>
    </div>
  </section>
  <section :class="classes.row">
    <header>调整模式：</header>
    <div :class="classes.content">
      <label>
        <input type="radio" name="resizeMode" :value="RESIZE_MODE.RESIZE" v-model="winState.resizeMode" />
        <span>允许调整窗口大小，允许最大化（默认）</span>
      </label>
      <label>
        <input type="radio" name="resizeMode" :value="RESIZE_MODE.RESIZE_ONLY" v-model="winState.resizeMode" />
        <span>只允许调整窗口大小</span>
      </label>
      <label>
        <input type="radio" name="resizeMode" :value="RESIZE_MODE.DISABLED" v-model="winState.resizeMode" />
        <span>禁止</span>
      </label>
    </div>
  </section>
  <button @click="createWindow" class="btn">创建窗口</button>
</template>

<script lang="tsx" setup>
import { defineComponent, reactive, useCssModule, ref, type Ref } from 'vue'
import { useWindowApi, useWindowManager, RESIZE_MODE, useSimpleWindow } from '@dongls/xwindow'

const PROP_EVENTS = '__WIN_EVENTS__'
const classes = useCssModule('classes')
const manager = useWindowManager()

const options = [
  { label: '可拖拽', prop: 'draggable', value: true },
  { label: '可关闭', prop: 'closeable', value: true },
  { label: '可置顶', prop: 'pinnable', value: true },
  { label: '最大化', prop: 'maximize', value: false },
  { label: '遮罩层', prop: 'mask', value: false },
  { label: '按ESC键关闭', prop: 'closeOnPressEsc', value: true },
]

const sizeState = {
  width: '800px',
  height: '600px',
  left: 'calc(50vw - 400px)',
  top: '12vh',
  resizeMode: RESIZE_MODE.RESIZE,
}

const initState = options.reduce<Record<string, any>>(
  (acc, option) => {
    acc[option.prop] = option.value
    return acc
  },
  { ...sizeState },
)

const winState = reactive(initState)

const ExampleBody = defineComponent({
  props: {
    params: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const api = useWindowApi()
    const events = Reflect.get(api!, PROP_EVENTS) as Ref<string[]>

    function closeWindow() {
      api?.close(true)
    }

    return function () {
      const closeBtn = winState.closeable ? null : (
        <button type="button" class="btn btn-small" onClick={closeWindow}>
          关闭窗口
        </button>
      )

      // prettier-ignore
      const initOptions = options.map(i => <p>{i.label}: {JSON.stringify(props.params[i.prop])}</p>)
      const eventLogs = events.value.map(i => <p>{i}</p>)

      return (
        <div class={classes.exampleBody}>
          <div class={classes.params}>
            <div class={classes.panel}>
              <h4>初始参数：</h4>
              {initOptions}
            </div>
            <div class={classes.panel}>
              <h4>窗口状态：</h4>
              <div class={classes.infos}>
                <p>id: {api?.wid}</p>
                <p>focused: {JSON.stringify(api?.state?.focused)}</p>
                <p>left: {api?.state?.offsetLeft}px</p>
                <p>top: {api?.state?.offsetTop}px</p>
                <p>width: {api?.state?.offsetWidth}px</p>
                <p>height: {api?.state?.offsetHeight}px</p>
                <p>z-index: {JSON.stringify(api?.state?.zIndex)}</p>
              </div>
            </div>
          </div>

          <div class={classes.eventHeader}>
            <strong>窗口事件</strong>
            {closeBtn}
          </div>

          <div class={classes.events}>{eventLogs}</div>
        </div>
      )
    }
  },
})

function getTimestamp() {
  const now = new Date()
  const minus = now.getMinutes().toString().padStart(2, '0')
  const seconds = now.getSeconds().toString().padStart(2, '0')
  const msec = now.getMilliseconds().toString().padStart(4, '0')
  return `${minus}:${seconds}.${msec}`
}

function createWindow() {
  const num = manager.getWindowCount()
  const params: any = {
    ...winState,
  }
  const events = ref<string[]>([])
  const instance = useSimpleWindow('窗口' + num, <ExampleBody params={params} />, params)

  instance.on('created', () => {
    events.value.unshift(`[${getTimestamp()}]: call created event.`)
  })

  instance.on('beforeShow', e => {
    events.value.unshift(`[${getTimestamp()}]: call beforeShow event.`)
  })

  instance.on('show', e => {
    events.value.unshift(`[${getTimestamp()}]: call show event.`)
  })

  instance.on('close', () => {
    events.value.unshift(`[${getTimestamp()}]: call close event.`)
  })

  instance.on('beforeDestroy', () => {
    events.value.unshift(`[${getTimestamp()}]: call beforeDestroy event.`)
  })

  // instance.on('dragging', () => {
  //   const now = new Date()
  //   events.value.push(`[${now.toLocaleTimeString()}]: call dragging event`)
  // })

  instance.on('dragStart', e => {
    events.value.unshift(`[${getTimestamp()}]: call dragStart event.`)
  })

  instance.on('dragEnd', e => {
    events.value.unshift(`[${getTimestamp()}]: call dragEnd event.`)
  })

  instance.on('resizeStart', e => {
    events.value.unshift(`[${getTimestamp()}]: call resizeStart event.`)
  })

  // instance.on('resizing', e => {
  //   events.value.unshift(`[${getTimestamp()}]: call resizing event. `)
  // })

  instance.on('resizeEnd', e => {
    events.value.unshift(`[${getTimestamp()}]: call resizeEnd event. `)
  })

  instance.on('maximizeChange', e => {
    events.value.unshift(`[${getTimestamp()}]: call maximizeChange event. isMaximize: ${instance.isMaximize}`)
  })

  Reflect.set(instance, PROP_EVENTS, events)
}

function changeSize(width: number, height: number) {
  winState.width = width + 'px'
  winState.height = height + 'px'
}
</script>

<style lang="scss" module="classes">
.winBody {
  padding: 10px 0;
  height: 100%;
}

.exampleBody {
  padding: 10px;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;

  p {
    margin: 0;
  }
}

.row {
  display: flex;
  flex-flow: row nowrap;
  margin-bottom: 15px;

  header {
    font-weight: 700;
    line-height: 28px;
    width: 72px;
  }
}

.content {
  width: 0;
  flex: 1;

  display: flex;
  flex-flow: row wrap;

  label {
    height: 28px;
    line-height: 28px;
    display: block;
    margin-left: 20px;

    span {
      display: inline-block;
      vertical-align: middle;
    }
  }

  input[type='radio'],
  input[type='checkbox'] {
    margin: 0;
    margin-right: 4px;
    vertical-align: middle;
  }

  input[type='text'] {
    height: 28px;
    line-height: 26px;
    width: 150px;
  }

  button {
    margin-left: 15px !important;
  }
}

.events {
  height: 0;
  flex: 1;
  overflow: auto;
  border: 1px solid;
  font-size: 12px;
  border-radius: 1px;
  padding: 2px;
  line-height: 20px;
}

.params {
  display: flex;
  flex-flow: row nowrap;
}

.panel {
  flex: 1;
}

.panel + .panel {
  margin-left: 24px;
}

.infos {
  display: flex;
  flex-flow: row wrap;
}

.infos > p {
  width: 50%;
}

.eventHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
}
</style>
