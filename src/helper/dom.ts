export const isHTMLElement = (e: unknown): e is HTMLElement => e instanceof HTMLElement

const emptyNodeNames = [
  'fc-divider',
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'keygen',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
]

export const isEmptyElement = (e: unknown): boolean =>
  isHTMLElement(e) && emptyNodeNames.includes(e.nodeName.toLowerCase())

export const isHiddenElement = (e: unknown): boolean => {
  if (isHTMLElement(e)) {
    if (!document.contains(e)) return true
    // const styles = getComputedStyle(e)
    const styles = e.style
    if (styles.display === 'none' || styles.visibility === 'hidden') return true
    // const { width, height } = e.getBoundingClientRect()
    // if (width === 0 && height === 0) return true
  }
  return false
}
// can set tabIndex

export const tabbableElement = (e: unknown): e is HTMLElement =>
  isHTMLElement(e) && !e.hasAttribute('disabled') && !isHiddenElement(e)
// native focusable

export const nativeFocuseable = (e: Element): boolean =>
  ['input', 'textarea', 'button', 'select'].includes(e.nodeName.toLowerCase()) && tabbableElement(e)
// custom focusable
export const customFocuseable = (e: Element): e is HTMLElement =>
  tabbableElement(e) && !isEmptyElement(e) && e.hasAttribute('tabindex')
// can capture focus

export const focusable = (e: Element): e is HTMLElement =>
  isHTMLElement(e) && (nativeFocuseable(e) || customFocuseable(e))

export const add = (a: number, b: number): number => a + b

export const id = <T = unknown>(v: T): T => v
export const mod = (n: number, length: number): number => (n + length) % length
export const clamp = (min: number, max: number, num: number): number => Math.min(max, Math.max(min, num))
const _isFocused = (e: Element) => e === document.activeElement || e.getAttribute('tabindex') === '0'
export const toggleTabIndex = <T extends HTMLElement = HTMLElement>(
  elements: T[],
  delta: number,
  loop: boolean,
  isFocused = _isFocused
): T | undefined => {
  const { length } = elements
  const { activeElement } = document
  let idx = elements.findIndex(isFocused)
  const nextIdx = idx + delta
  idx = loop ? mod(nextIdx, length) : nextIdx

  elements.forEach(e => (e.tabIndex = -1))
  while (elements[idx]) {
    const target = elements[idx]
    if (focusable(target) && activeElement !== target) {
      target.tabIndex = 0
      return target
    }

    const nextIdx = idx + delta
    if (nextIdx === idx) return target
    idx = loop ? mod(nextIdx, length) : nextIdx
  }
}

export const focusFirstOrNext = <T extends HTMLElement = HTMLElement>(
  elements: T[],
  delta: number,
  loop = true,
  preventScroll = false,
  isFocused = _isFocused
): T | undefined => {
  const target = toggleTabIndex(elements, delta, loop, isFocused)
  target?.focus({ preventScroll })
  return target
}
