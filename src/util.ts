export function toSafeNumber(num: number, min?: number, max?: number) {
  if (null != min && Number.isFinite(min) && num < min) return min
  if (null != max && Number.isFinite(max) && num > max) return max

  return num
}

export function isEmptyStr(v: unknown) {
  if (v == null) return true
  if (typeof v !== 'string') return true
  return v.length == 0
}

export function notEmptyStr(v: unknown) {
  if (v == null || typeof v !== 'string') return false

  return v.length != 0
}

export function stopPropagation(event: Event) {
  event.stopPropagation()
}

function debug(...args: any) {
  console.log(`%c[xWindow]`, `color: green;`, ...args)
}

function warn(...args: any) {
  console.log(`%c[xWindow]`, `color: orange;`, ...args)
}

export const LOG = {
  DEBUG: debug,
  WARN: warn,
}

export function merge(target: Record<string, any>, props: Record<string, any> | null | undefined) {
  if (props == null) return target

  const keys = Object.keys(props)
  if (keys.length == 0) return target

  for (const key of keys) {
    const value = props[key]
    if (value == null) continue

    target[key] = value
  }

  return target
}

/**
 * 统一浏览器之间wheel事件的差异
 * @see https://github.com/basilfx/normalize-wheel
 * @param event - 事件对象
 */
export function normalizeWheel(event: WheelEvent) {
  const { deltaX, deltaY } = event
  const unit = event.deltaMode == 0 ? 1 : event.deltaMode == 1 ? 40 : 800

  return { pixelX: deltaX * unit, pixelY: deltaY * unit }
}
