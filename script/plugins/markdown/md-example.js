import url from 'node:url'
import fs from 'node:fs'
import path from 'node:path'

const REG = /<example-code src="([^"]+)"\/>/
const DIR_PATH = url.fileURLToPath(path.dirname(import.meta.url))
const TARGET_PATH = path.resolve(DIR_PATH, '../../../document/example')

function readCode(component) {
  const filePath = TARGET_PATH + "/" + component
  return fs.readFileSync(filePath, { encoding: 'utf-8' })
}

export default function (md) {
  const fn = md.renderer.rules.html_block

  md.renderer.rules.html_block = function (tokens, idx, options, env, slf) {
    const token = tokens[idx]
    const origin = token.content
    if (REG.test(origin)) {
      const component = origin.match(REG)[1]
      const code = readCode(component)
      token.content = origin.replace(REG, md.options.highlight(code, 'vue'))
    }

    return fn(tokens, idx, options, env, slf)
  }
}