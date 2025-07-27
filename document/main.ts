import './styles/index.css'
import App from './app.vue'

import { createApp, ref } from 'vue'
import { xWindow, type WindowZIndexManager } from '@dongls/xwindow'

const app = createApp(App)
const zIndex = ref(2000)
const zIndexManager: WindowZIndexManager = {
  getNextZIndex() {
    zIndex.value++
    return zIndex.value
  },
  getZIndex() {
    return zIndex.value
  },
  setZIndex(v) {
    zIndex.value = v
  },
}

app.use(xWindow, { zIndex: zIndexManager })

app.mount('#app')
