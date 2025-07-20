/// <reference types="vite/client" />

declare var __VERSION__: string
declare var __HOMEPAGE__: string
declare var __ENV__: string
declare var __IS_DEV__: boolean
declare var __TIMESTAMP__: string

declare module '*.md' {
  const src: string
  export default src
}