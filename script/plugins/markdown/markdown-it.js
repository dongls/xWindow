import './extend-html'
import MarkdownIt from 'markdown-it'
import highlight from './highlight'
import mdExample from './md-example'
import MarkdownItAttrs from 'markdown-it-attrs'

const md = new MarkdownIt({ html: true, highlight })

md.use(mdExample)
md.use(MarkdownItAttrs)

md.renderer.rules.heading_open = function (tokens, idx, options, env, slf) {
  const token = tokens[idx]
  const next = tokens[idx + 1]

  // 需要包裹一下
  if (null != token && token.nesting == 1 && (token.tag == 'h2' || token.tag == 'h3') && null != next) {
    token.attrJoin('class', 'doc-head-anchor')

    const id = token.attrGet('id')
    if (!id) token.attrSet('id', genId(next.content))
  }

  return slf.renderToken(tokens, idx, options)
}

// md.renderer.rules.bullet_list_open = function (tokens, idx, options, env, slf) {
//   const token = tokens[idx]

//   if (null != token) {
//     token.attrJoin('class', 'doc-ul')
//   }

//   return slf.renderToken(tokens, idx, options)
// }

md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  const token = tokens[idx]

  const aIndex = token.attrIndex('target')
  if (aIndex > 0) return self.renderToken(tokens, idx, options)

  const url = token.attrGet('href')
  if (url && url.startsWith('http')) {
    token.attrPush(['target', '_blank'])
  }

  return self.renderToken(tokens, idx, options)
}

function genId(content) {
  return content
    .replace(/\s+/g, '')
    .replace(/\^get\^/, 'get')
    .replace(/\(\)/, '')
}

export default md
