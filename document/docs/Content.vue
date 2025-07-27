<script lang="tsx">
import docs from './index'
import Example from '../example/index'
import Events from '../components/Events.vue'
import Footer from '../components/Footer.vue'

import { defineComponent } from 'vue'
import { nextTick, ref, h } from 'vue'

const components = { Events, Footer, ...Example }

export interface ContentApi {
  scrollTo(hash: string): Promise<void>
  scrollTop(): Promise<void>
}

export default defineComponent({
  props: {
    path: {
      type: String,
      required: true,
    },
    hash: {
      type: String,
      default: null,
    },
  },
  setup(props, { expose }) {
    const root = ref<HTMLElement>()

    async function scrollTo(hash: string) {
      await nextTick()

      const element = document.querySelector(hash)
      if (element == null) return scrollTop()

      element.scrollIntoView({ behavior: 'smooth' })
    }
    async function scrollTop() {
      if (root.value == null) return

      root.value.scrollTop = 0
    }

    expose({ scrollTo, scrollTop })

    return function () {
      const doc = docs.find(c => c.path === props.path)
      if (doc == null) return <div>未知的文档</div>

      return h('article', { class: 'article', ref: root }, h({ template: doc.content, components }))
    }
  },
})
</script>
