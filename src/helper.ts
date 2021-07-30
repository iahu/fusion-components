export const focusable = (e: Element): boolean =>
  e instanceof HTMLElement && !e.hasAttribute('disabled') && !e.hasAttribute('hidden')

export const add = (a: number, b: number) => a + b
