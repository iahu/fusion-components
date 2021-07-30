export const focusable = (e: Element): boolean =>
  e instanceof HTMLElement && !e.hasAttribute('disabled') && !e.hasAttribute('hidden')

export const add = (a: number, b: number): number => a + b

export const focusCurrentOrNext = (targets: HTMLElement[], delta: number): void => {
  const { length } = targets
  const current = targets.find(t => t.tabIndex === 0)
  let idx = targets.findIndex(btn => btn === current)
  targets.forEach(b => (b.tabIndex = -1))
  while (targets[idx]) {
    const btn = targets[(length + idx) % length]
    if (focusable(btn) && document.activeElement !== btn) {
      btn.focus()
      btn.tabIndex = 0
      break
    }
    idx += delta
  }
}
