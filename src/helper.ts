export const focusable = (e: Element): boolean =>
  e instanceof HTMLElement && !e.hasAttribute('disabled') && !e.hasAttribute('hidden')

export const add = (a: number, b: number): number => a + b

export const id = <T = unknown>(v: T): T => v
export const mod = (n: number, length: number): number => (n + length) % length
export const clamp = (min: number, max: number, num: number): number => Math.min(max, Math.max(min, num))

export const focusCurrentOrNext = <T extends HTMLElement>(
  targets: T[],
  delta: number,
  loop = true,
  preventScroll = false
): T | undefined => {
  const { length } = targets
  const current = targets.find(t => t.tabIndex === 0)
  let idx = targets.findIndex(btn => btn === current)

  while (targets[idx]) {
    const target = targets[idx]
    if (focusable(target) && document.activeElement !== target) {
      targets.forEach(b => (b.tabIndex = -1))
      target.focus({ preventScroll })
      target.tabIndex = 0
      return target
    }

    const nextIdx = idx + delta
    if (nextIdx === idx) return target
    idx = loop ? mod(nextIdx, length) : nextIdx
  }
}

const trim = (s: string) => s.trim()
export const parseParams = (paramsString: string, split = ';', equal = ':'): Record<string, string> => {
  return paramsString.split(split).reduce((params, item) => {
    const [key, value] = item.split(equal).map(trim)
    if (key !== '') {
      params[key] = value
    }
    return params
  }, {} as Record<string, string>)
}

export const joinParams = (params: Record<string, string | number>, split = ';', equal = ':'): string => {
  return Object.entries(params)
    .map(([key, value]) => [key, value].join(equal))
    .join(split)
}

export const setCSSText = (element: HTMLElement, overwrite: Record<string, string | number>): void => {
  element.style.cssText = joinParams({ ...parseParams(element.style.cssText), ...overwrite })
}

export const removeCSSText = (element: HTMLElement, key: string): void => {
  const style = parseParams(element.style.cssText)
  delete style[key]
  element.style.cssText = joinParams(style)
}
