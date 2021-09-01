const toString = (s: unknown) => Object.prototype.toString.call(s).slice(8, -1)

export const isString = (s: unknown): s is string => toString(s) === 'String'
export const isArray = (s: unknown): s is Array<unknown> => Array.isArray(s) || toString(s) === 'Array'
export const isNumber = (s: unknown): s is number => toString(s) === 'Number'
export const isObject = (s: unknown): s is Record<PropertyKey, any> => toString(s) === 'Object'
export const isUndefined = (s: unknown): s is undefined => toString(s) === 'Undefined'
export const isNull = (s: unknown): s is null => toString(s) === 'Null'
export const isSymbol = (s: unknown): s is symbol => typeof s === 'symbol'
export const isFunction = (s: unknown): boolean => typeof s === 'function'

export const isHTMLElement = (e: unknown): e is HTMLElement => e instanceof HTMLElement
// prettier-ignore
const emptyNodeNames = ['fc-divider', 'area', 'base', 'br', 'col', 'embed', 'hr', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr' ]

export const isEmptyElement = (e: unknown): boolean =>
  isHTMLElement(e) && emptyNodeNames.includes(e.nodeName.toLowerCase())

export const isHiddenElement = (e: unknown): boolean => {
  if (isHTMLElement(e)) {
    if (!document.contains(e)) return true
    const styles = getComputedStyle(e)
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
    if (tabbableElement(target) && !isEmptyElement(target)) {
      target.tabIndex = 0
      return target
    }

    idx += 1
  }
}

export const shallowDiff = <T = unknown>(a: T, b: T): boolean => {
  if (isArray(a) && isArray(b)) {
    return a.length !== b.length || a.some(ae => b.indexOf(ae) === -1)
  }

  // if (isObject(a) && isObject(b)) {
  //   const aKeys = Object.keys(a)
  //   const bKeys = Object.keys(b)
  //   const diff = (key: string) =>
  //     !shallowEqual((a as Record<PropertyKey, any>)[key], (b as Record<PropertyKey, any>)[key])
  //   return shallowEqual(aKeys, bKeys) && !aKeys.some(diff)
  // }

  return a !== b
}

export const getCallback = (o: any, key: PropertyKey) => {
  let callbackName: PropertyKey
  if (isSymbol(key)) {
    callbackName = Symbol(key.toString().slice(7, -1) + 'Changed')
  } else {
    callbackName = `${key.toString()}Changed`
  }

  const callback = Reflect.get(o, callbackName)
  if (isFunction(callback)) {
    return callback
  }
}
