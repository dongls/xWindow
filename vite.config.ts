import path from 'path'
import vue from '@vitejs/plugin-vue'
import jsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'
import banner from 'vite-plugin-banner'
import markdown from './script/plugins/markdown'
import packageJson from './package.json'

import { type BuildOptions, defineConfig, type ConfigEnv } from 'vite'

function fillZero(num: number) {
  return num < 10 ? '0' + num : num
}

function getTimestamp() {
  const now = new Date()
  const month = now.getMonth() + 1
  const day = now.getDate()
  const hour = now.getHours()
  const min = now.getMinutes()
  return `${fillZero(month)}${fillZero(day)}${fillZero(hour)}${fillZero(min)}`
}

function createLibBuildOptions(): BuildOptions {
  return {
    outDir: './dist',
    copyPublicDir: false,
    lib: { entry: path.resolve(__dirname, './src/main.ts'), name: 'xWindow', fileName: 'index' },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        exports: 'named',
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: { vue: 'Vue' },
      },
    },
  }
}

function createDocBuildOptions(): BuildOptions {
  return { outDir: './docs' }
}

function isBuildDocument(configEnv: ConfigEnv) {
  return configEnv.command == 'build' && (configEnv.mode == 'document' || configEnv.mode == 'releaseDoc')
}

function isBuildCode(configEnv: ConfigEnv) {
  return configEnv.command == 'build' && (configEnv.mode == 'production' || configEnv.mode == 'releaseCode')
}

function isDev(configEnv: ConfigEnv) {
  return configEnv.command == 'serve' && configEnv.mode == 'document'
}

function buildAlias(configEnv: ConfigEnv) {
  if (isDev(configEnv) || isBuildDocument(configEnv)) {
    return { vue: 'vue/dist/vue.esm-bundler.js', '@dongls/xwindow': path.resolve('src/main'), '@document': path.resolve('document') }
  }

  return undefined
}

// https://vitejs.dev/config/
export default defineConfig(configEnv => {
  const plugins = [vue(), jsx()]

  if (isBuildCode(configEnv)) {
    plugins.push(
      banner({
        outDir: './dist',
        content: `/**\n* ${packageJson.name} v${packageJson.version}\n* (c) 2023-present dongls\n* @license MIT\n**/`,
      }),
    )

    plugins.push(dts({ root: '.', include: ['src'], rollupTypes: true }))
  }

  if (isDev(configEnv) || isBuildDocument(configEnv)) plugins.push(markdown())

  return {
    base: isBuildDocument(configEnv) ? '/xWindow' : undefined,
    plugins,
    build: isBuildDocument(configEnv) ? createDocBuildOptions() : createLibBuildOptions(),
    css: { modules: { generateScopedName: configEnv.command == 'serve' ? undefined : '[contenthash:base58:8]' } },
    resolve: { alias: buildAlias(configEnv) },
    server: { port: 9001 },
    define: {
      __IS_DEV__: JSON.stringify(configEnv.command == 'serve'),
      __ENV__: JSON.stringify(configEnv.command == 'serve' ? 'development' : 'production'),
      __VERSION__: JSON.stringify(packageJson.version),
      __HOMEPAGE__: JSON.stringify(packageJson.homepage),
      __TIMESTAMP__: JSON.stringify(getTimestamp()),
    },
  }
})
