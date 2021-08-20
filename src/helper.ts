export const isHTMLElement = (e: unknown): e is HTMLElement => e instanceof HTMLElement
// prettier-ignore
const emptyNodeNames = ['fc-divider', 'area', 'base', 'br', 'col', 'embed', 'hr', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr' ]

export const isEmptyElement = (e: unknown): boolean =>
  isHTMLElement(e) && emptyNodeNames.includes(e.nodeName.toLowerCase())

// can set tabIndex
export const indexableElement = (e: unknown): e is HTMLElement =>
  isHTMLElement(e) && !e.hasAttribute('disabled') && !e.hasAttribute('hidden')

// native focusable
export const nativeFocuseable = (e: Element): boolean =>
  ['input', 'textarea', 'button', 'select'].includes(e.nodeName.toLowerCase()) && indexableElement(e)
// custom focusable
export const customFocuseable = (e: Element): e is HTMLElement =>
  indexableElement(e) && !isEmptyElement(e) && e.hasAttribute('tabindex')

// can capture focus
export const focusable = (e: Element): e is HTMLElement => nativeFocuseable(e) || customFocuseable(e)

export const add = (a: number, b: number): number => a + b

export const id = <T = unknown>(v: T): T => v
export const mod = (n: number, length: number): number => (n + length) % length
export const clamp = (min: number, max: number, num: number): number => Math.min(max, Math.max(min, num))

export const focusCurrentOrNext = <T extends HTMLElement>(
  targets: T[],
  delta: number,
  loop = true,
  preventScroll = false,
  focusableFn = focusable
): T | undefined => {
  const { length } = targets
  let idx = Math.max(
    0,
    targets.findIndex(e => e.tabIndex === 0)
  )

  while (targets[idx]) {
    const target = targets[idx]
    if (focusableFn(target) && document.activeElement !== target) {
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

export const setTopIndex = <T extends HTMLElement>(items: T[], force = true): HTMLElement | undefined => {
  let idx = items.findIndex(t => t.tabIndex === 0)
  const current = items[idx]
  if (!force && current) {
    return current
  }

  items.forEach(b => b.setAttribute('tabindex', '-1'))
  idx = 0
  while (items[idx]) {
    const target = items[idx]
    if (indexableElement(target) && !isEmptyElement(target)) {
      target.tabIndex = 0
      return target
    }

    idx += 1
  }
}
