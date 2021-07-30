export const focusable = (e: Element): boolean =>
  e instanceof HTMLElement && !e.hasAttribute('disabled') && !e.hasAttribute('hidden')

export const add = (a: number, b: number): number => a + b

export const id = <T = unknown>(v: T): T => v
export const mod = (n: number, length: number): number => (n + length) % length

export const focusCurrentOrNext = <T extends HTMLElement>(targets: T[], delta: number, loop = true): T | undefined => {
  const { length } = targets
  const current = targets.find(t => t.tabIndex === 0)
  let idx = targets.findIndex(btn => btn === current)

  while (targets[idx]) {
    const target = targets[idx]
    if (focusable(target) && document.activeElement !== target) {
      targets.forEach(b => (b.tabIndex = -1))
      target.focus()
      target.tabIndex = 0
      return target
    } else if (delta === 0) {
      break
    }

    idx = idx + delta
    if (loop) idx = mod(idx, length)
  }
}
