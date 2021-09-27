import { isEmptyElement, tabbableElement } from './dom'
import { isArray, isFunction, isSymbol } from './type-is'

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

export const propKey2Str = (key: PropertyKey): string => {
  if (isSymbol(key)) {
    return key.toString().slice(7, -1)
  } else {
    return key.toString()
  }
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

export const clamp = (min: number, max: number, num: number): number => Math.min(max, Math.max(min, num))

export const delay = (wait = 100): Promise<boolean> => {
  return new Promise(resolve => {
    setTimeout(() => resolve(true), wait)
  })
}
