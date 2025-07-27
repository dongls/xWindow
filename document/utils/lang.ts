export function throttle(cb: (...args: any[]) => void) {
  let timer = 0

  const throttle = (...args: any[]): void => {
    if (timer) {
      window.cancelAnimationFrame(timer)
    }
    timer = window.requestAnimationFrame(() => {
      cb(...args)
      timer = 0
    })
  }

  throttle.cancel = () => {
    window.cancelAnimationFrame(timer)
    timer = 0
  }

  return throttle
}
