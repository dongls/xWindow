import hljs from 'highlight.js'
import LanguagesJavscript from 'highlight.js/lib/languages/javascript'
import LanguagesTypescript from 'highlight.js/lib/languages/typescript'
import LanguagesCss from 'highlight.js/lib/languages/css'
import LanguagesXml from 'highlight.js/lib/languages/xml'
import LanguagesBash from 'highlight.js/lib/languages/bash'

import { escapeHtml } from 'markdown-it/lib/common/utils'

hljs.registerLanguage('javascript', LanguagesJavscript)
hljs.registerLanguage('typescript', LanguagesTypescript)
hljs.registerLanguage('css', LanguagesCss)
hljs.registerLanguage('xml', LanguagesXml)
hljs.registerLanguage('bash', LanguagesBash)

function genHtml(str, language) {
  const lang = language == 'vue' ? 'html' : language
  if (!lang || null == hljs.getLanguage(lang)) return escapeHtml(str)

  try {
    return hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
  } catch (e) {
    return ''
  }
}

export default function (str, lang) {
  return `<pre v-pre class="hljs" language="${lang}"><code class="hljs-code">${genHtml(str, lang)}</code><button type="button" class="doc-copy-btn" title="复制"/></pre>`
}