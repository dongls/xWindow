import classes from '../styles/window.module.scss'

import type { ComponentApi, WindowState } from '../model/Common'
import type { VNode } from 'vue'

import { Teleport, computed, defineComponent, nextTick, reactive, ref, provide, h, onRenderTriggered, shallowRef } from 'vue'
import { INJECTION_WINDOW_API, RESIZE_MODE, WINDOW_MODES, RENDER_STATES, CLASS, MENU_TYPE, WINDOW_TYPE, RESIZE_PROPS } from '../model/Constant'
import { WindowBody } from './WindowBody'
import { isEmptyStr, notEmptyStr, LOG } from '../util'
import { BlankWindow } from '../model/Windows'
import { registerWindow } from '../api/manager'
import { Resizable } from '../model/Resizable'

const RESIZE_NODES = [
  [classes.resizeTop, RESIZE_PROPS.TOP],
  [classes.resizeBottom, RESIZE_PROPS.BOTTOM],
  [classes.resizeLeft, RESIZE_PROPS.LEFT],
  [classes.resizeRight, RESIZE_PROPS.RIGHT],
  [classes.resizeTopLeft, RESIZE_PROPS.TOP_LEFT],
  [classes.resizeTopRight, RESIZE_PROPS.TOP_RIGHT],
  [classes.resizeBottomLeft, RESIZE_PROPS.BOTTOM_LEFT],
  [classes.resizeBottomRight, RESIZE_PROPS.BOTTOM_RIGHT],
]

export const BlankWindowComponent = defineComponent({
  name: WINDOW_TYPE.BLANK_WINDOW,
  props: {
    instance: {
      type: BlankWindow,
      required: true,
    },
  },
  setup(props, { slots }) {
    const renderState = ref<number>(RENDER_STATES.INIT)
    const elementRef = shallowRef<HTMLElement>()
    const winState: WindowState = reactive({
      visible: false,
      offsetWidth: 0,
      offsetHeight: 0,
      offsetTop: 0,
      offsetLeft: 0,
      focused: false,
      pinned: false,
      zIndex: 0,
      windowMode: WINDOW_MODES.NONE,
    })

    const windowStyle = computed(() => {
      const options = props.instance.options

      if (renderState.value == RENDER_STATES.INIT) {
        return {
          width: options.width,
          height: options.height,
          left: options.left,
          top: options.top,
        }
      }

      return {
        top: winState.offsetTop + 'px',
        left: winState.offsetLeft + 'px',
        width: winState.offsetWidth + 'px',
        height: renderState.value == RENDER_STATES.INIT ? undefined : winState.offsetHeight + 'px',
        zIndex: options.mask ? undefined : props.instance.zIndex,
      }
    })

    const windowClass = computed(() => {
      const className = [CLASS.WINDOW, classes.window]
      const instance = props.instance

      if (instance.type === WINDOW_TYPE.SIMPLE_WINDOW) className.push(CLASS.SIMPLE_WINDOW)

      if (renderState.value == RENDER_STATES.INIT) className.push(classes.init)
      if (winState.windowMode == WINDOW_MODES.MAXIMIZE) className.push(classes.maximize, CLASS.MAXIMIZE)
      if (winState.focused) className.push(classes.focused, CLASS.FOCUSED)
      if (notEmptyStr(instance.options.className)) className.push(instance.options.className!)

      return className
    })

    const menus = computed(() => {
      const result: number[] = []
      const instance = props.instance
      const options = instance.options

      if (options.pinnable && options.mask !== true && !instance.isFixedZIndex) {
        result.push(winState.pinned ? MENU_TYPE.PIN : MENU_TYPE.UNPIN)
      }

      if (options.resizeMode == RESIZE_MODE.RESIZE) {
        result.push(winState.windowMode == WINDOW_MODES.MAXIMIZE ? MENU_TYPE.RESTORE : MENU_TYPE.MAXIMIZE)
      }

      if (options.closeable) {
        result.push(MENU_TYPE.CLOSE)
      }

      return result
    })

    const componentApi: ComponentApi = {
      getElement,
      getRenderState,
      useCssModule: useCssClass,
      useMenus,
    }

    function getElement() {
      return elementRef.value
    }

    function getRenderState() {
      return renderState.value
    }

    function useCssClass() {
      return classes
    }

    async function toggleMaximize(event?: MouseEvent) {
      event?.preventDefault()

      props.instance.toggleMaximize()
    }

    function useMenus() {
      return menus.value
    }

    function autofocus(body: HTMLElement) {
      const elements = Array.from(body.querySelectorAll('[autofocus]'))
      for (const element of elements) {
        if (element instanceof HTMLElement && element.autofocus) {
          return element.focus()
        }
      }
    }

    async function doLayout(vNode: VNode) {
      await nextTick()
      const instance = props.instance
      const options = instance.options
      const el = vNode.el as HTMLElement
      const rect = el.getBoundingClientRect()

      // 初始化窗口状态
      if (renderState.value == RENDER_STATES.INIT) {
        const width = Math.round(rect.width)
        const height = Math.round(rect.height)

        let left = Math.round(rect.left)
        let top = Math.round(rect.top)
        if (isEmptyStr(options.left)) left = Math.floor((window.innerWidth - width) / 2)
        if (isEmptyStr(options.top)) top = Math.floor((window.innerHeight - height) / 2)

        winState.offsetWidth = width
        winState.offsetHeight = height
        winState.offsetLeft = left
        winState.offsetTop = top

        if (options.maximize) toggleMaximize()
        renderState.value = RENDER_STATES.MOUNTED

        nextTick(() => {
          const event = instance.createEvent('show')
          instance.dispatch(event)
          autofocus(el)
        })
      }

      instance.focus()
    }

    function onPointerdown(event: PointerEvent) {
      const instance = props.instance
      instance.focus()

      if (!instance.allowDrag || instance.isMaximize) return

      instance.dragstart(event)
    }

    function onClickHeader(event: MouseEvent) {
      const winEl = getElement()
      if (winEl == null) return

      const rect = winEl.getBoundingClientRect()
      if (event.clientY - rect.top > props.instance.allowDragArea) return

      toggleMaximize(event)
    }

    function callCreateHook() {
      const instance = props.instance
      instance.component = componentApi
      instance.state = winState
      registerWindow(instance.id, instance)

      const event = instance.createEvent('created')
      instance.dispatch(event)
    }

    function createBody() {
      const instance = props.instance
      return <WindowBody body={instance.body} key={instance.wid} />
    }

    function createResizeNodes(mode: number, resizeStart: any) {
      if (mode == RESIZE_MODE.DISABLED) return null

      return RESIZE_NODES.map(n => {
        return h('div', {
          ['.' + Resizable.PROP]: n[1],
          className: n[0],
          onPointerdown: resizeStart,
        })
      })
    }

    provide(INJECTION_WINDOW_API, props.instance)
    callCreateHook()

    if (__IS_DEV__) onRenderTriggered(event => LOG.DEBUG(event))

    return function (): any {
      const instance = props.instance
      const options = instance.options

      if (__IS_DEV__) LOG.DEBUG('render window:', instance.wid)
      if (winState.visible !== true) return null

      const main = (
        <div class={classes.main} onDblclick={onClickHeader}>
          {typeof slots.default == 'function' ? slots.default(componentApi) : createBody()}
        </div>
      )

      const data = {
        ref: elementRef,
        id: instance.wid,
        onVnodeMounted: doLayout,
        onPointerdown: onPointerdown,
        class: windowClass.value,
        style: windowStyle.value,
      }

      const resize = createResizeNodes(options.resizeMode, instance.resizestart)
      let component = h('div', data, [main, resize])
      if (options.mask === true) {
        const style = { zIndex: instance.zIndex }
        // prettier-ignore
        component = <div class={classes.mask} style={style}>{component}</div>
      }

      if (options.teleport === false) return component
      return <Teleport to={options.teleport}>{component}</Teleport>
    }
  },
})
