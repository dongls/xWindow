import path from 'path'

import { build } from 'vite'
import { execaCommandSync, execaSync } from 'execa'

/** 构建代码 */
export async function buildCode() {
  await build({
    mode: 'releaseCode',
    build: { outDir: '../dist' },
  })

  console.log('➜ 已构建代码\n')
}

/** 构建文档 */
export async function buildDoc() {
  await build({
    mode: 'releaseDoc',
    build: { outDir: '../docs' },
  })
  console.log('➜ 已构建文档\n')
}

export async function buildAll() {
  await buildCode()
  await buildDoc()
}

/** 发布包 */
export function publish() {
  const cwd = path.resolve(__dirname, '..')

  // 提交代码
  execaCommandSync('git add .', { stdio: 'inherit', cwd })
  execaSync('git', ['commit', '-m', 'release: v' + PackageJson.version], { stdio: 'inherit', cwd })
  execaCommandSync('git push', { stdio: 'inherit', cwd })
  console.log('➜ 已提交代码\n')

  // 发布到仓库
  execaCommandSync('npm publish', { stdio: 'inherit', cwd })
  console.log('➜ 已发布包： xWindow@' + PackageJson.version + '\n')
}

/** 发布文档到仓库 */
export function release() {
  const cwd = path.resolve(__dirname, '..')

  // 提交代码
  execaCommandSync('git add .', { stdio: 'inherit', cwd })
  execaSync('git', ['commit', '-m', 'doc: build document'], { stdio: 'inherit', cwd })
  execaCommandSync('git push', { stdio: 'inherit', cwd })
  console.log('➜ 已发布文档\n')
}
