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
    return !document.contains(e) || e.hasAttribute('hidden') || e.hasAttribute('aria-hidden')
  }
  return false
}

const isDisabled = (e: HTMLElement): boolean => e.hasAttribute('disabled')

export const tabbableElement = (e: unknown): e is HTMLElement =>
  isHTMLElement(e) && !isDisabled(e) && (nativeFocuseable(e) || e.hasAttribute('tabindex')) && !isHiddenElement(e)

export const nativeFocuseable = (e: Element): boolean =>
  ['input', 'textarea', 'button', 'select'].includes(e.nodeName.toLowerCase()) && isHTMLElement(e) && !isDisabled(e)

export const customFocuseable = (e: Element): e is HTMLElement =>
  isHTMLElement(e) && !isDisabled(e) && e.hasAttribute('tabindex') && !isHiddenElement(e)

export const focusable = (e: Element): e is HTMLElement =>
  isHTMLElement(e) && (nativeFocuseable(e) || customFocuseable(e))

const mod = (n: number, length: number): number => (n + length) % length
const _isFocused = (e: Element) => e === document.activeElement
const _isFirstIndex = (e: Element) => e === document.activeElement || e.getAttribute('tabindex') === '0'
export const toggleTabIndex = <T extends HTMLElement = HTMLElement>(
  elements: T[],
  delta: number,
  loop: boolean,
  isFirstIndex = _isFirstIndex
): T | undefined => {
  const { length } = elements
  const { activeElement } = document
  let idx = elements.findIndex(isFirstIndex)
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
  isFirstIndex = _isFirstIndex
): T | undefined => {
  const target = toggleTabIndex(elements, delta, loop, isFirstIndex)
  target?.focus({ preventScroll })
  return target
}

export const getFirstFocusableElement = (elements: HTMLElement[]) => {
  for (let i = 0; i < elements.length; ++i) {
    const el = elements[i]
    if (focusable(el)) {
      return el
    }
  }
}

export const getNextFocusableElement = <T extends HTMLElement = HTMLElement>(
  elements: T[],
  delta: number,
  loop = true
): T | undefined => {
  const currentIndex = elements.findIndex(_isFocused)
  const { activeElement } = document
  const { length } = elements

  const nextIdx = currentIndex + delta
  let idx = loop ? mod(nextIdx, length) : nextIdx

  while (elements[idx]) {
    const target = elements[idx]
    if (focusable(target) && activeElement !== target) {
      return target
    }

    const nextIdx = idx + delta
    if (nextIdx === idx) return target
    idx = loop ? mod(nextIdx, length) : nextIdx
  }
}
