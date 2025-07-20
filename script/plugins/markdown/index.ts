import md from './markdown-it'
import { type Plugin } from 'vite'

const MD_REG = /\.(md)$/

export default function VitePluginMarkdown(): Plugin {
  return {
    name: 'vite-plugin-markdown',
    transform(source, id) {
      if (!MD_REG.test(id)) return

      const result = md.render(source)
      const html = typeof result == 'string' ? result : ''
      const code = 'export default `' + html.trim() + '`'
      return { code }
    },
  }
}
