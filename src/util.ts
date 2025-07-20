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
