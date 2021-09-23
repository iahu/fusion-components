import { LitElement } from 'lit'
import FusionComponent from '../fusion-component'
import { getCallback, PromiseLike, propKey2Str } from '../helper'

export type TypeCotr = { new (...args: any[]): any }
export type ObserverType =
  | 'bigint'
  | 'symbol'
  | 'function'
  | 'string'
  | 'number'
  | 'boolean'
  | 'object'
  | 'array'
  | 'undefined'
  | 'any'
export type ObserverValue = string | number | boolean | null
export type DefaultConverter<V = any> = (v: V | number | string | boolean | null) => any

export type Converter<V = HTMLElement, T = any> = (v: V | number | string | boolean | null, host: T) => any

export type InitFunction<T = any, V = any> = (host: T) => V | null

export type RawObserverOptions<T, V> = {
  /**
   * 属性的类型，如果省略则从初始值获取，否则默认为 string
   * type 关系到 converter
   */
  type?: ObserverType
  /**
   * 装饰属性的值将反射回 attribute
   */
  reflect?: boolean
  /**
   * 是否关联 attriubte
   * 如果是的话，可以从 attribute 获取初始化值，也可以反射到 attribute
   * @type {[type]}
   */
  attribute?: string | boolean
  /**
   * 转换函数，在 xxxChanged 和反射之前可对值做处理
   */
  converter?: Converter<V, T>
  /**
   * 是否同步调用 xxxChanged 和反射函数
   */
  sync?: boolean
  /**
   * 初始化函数，返回值将做为初始值
   */
  init?: boolean | InitFunction<T, V>
  /**
   * 在装饰对象上注入 `tempKey` 做为 setter/getter 的中介
   */
  tempKey?: string | boolean

  hasChanged?: (oldValue: V, nextValue: V, host: T) => boolean

  /**
   * 执行初始化的回调
   */
  initCallback?: boolean
}

export type ObserverOptions<T, V = unknown> = RawObserverOptions<T, V> & { propKey: string | number }

export const getTempKey = (key: PropertyKey, customKey?: boolean | string): string =>
  typeof customKey === 'string' ? customKey : `_.${key.toString()}`

const isNil = (v: unknown) => v === undefined || v === null

export const attr2Bol = (attribute: boolean | number | string | null) => {
  if (attribute === false || attribute === null || attribute === undefined || attribute === 'false') {
    return false
  }
  return true
}

export const typeCotrMap: Record<string, DefaultConverter<any>> = {
  string: (v: unknown) => {
    if (isNil(v)) return ''
    return String(v)
  },
  number: Number,
  boolean: (v: boolean | undefined | null | string) => {
    if (v === false || v === null || v === undefined || v === 'false') {
      return false
    }
    return true
  },
  any: (t: unknown) => t,
}

export const getConverter = <T extends HTMLElement, V = ObserverValue>(
  host: T,
  name: PropertyKey,
  type?: string
): DefaultConverter<V> | undefined => {
  const typeofValue = type ?? typeof Reflect.get(host, name)
  return typeCotrMap[typeofValue] as DefaultConverter<V>
}

export const reflectAttribute = (
  host: HTMLElement,
  attributeName: string,
  value: ObserverValue,
  isBol: boolean
): void => {
  if (isBol) {
    host.toggleAttribute(attributeName, attr2Bol(value))
  } else if (isNil(value) || value === '') {
    host.removeAttribute(attributeName)
  } else {
    host.setAttribute(attributeName, String(value))
  }
}

export const getValueFromAttribute = (
  host: HTMLElement,
  attributeName: string,
  isBol: boolean
): boolean | string | null => {
  if (!isBol) return host.getAttribute(attributeName)

  const value = host.getAttribute(attributeName)
  if (value === null) return false
  if (value === 'true') return true
  if (value === 'false') return false
  return host.hasAttribute(attributeName)
}

const beChanged = (old: any, next: any, host: any) => {
  return true
}

export const ignoreInitChanged = (old: any, next: any) => {
  return old !== undefined
}

export type ObservedProperties<T extends HTMLElement, V = any> = Map<PropertyKey, ObserverOptions<T, V>>

export const observedPropsKey = 'observedProperties'

export const observer = function <T extends LitElement, V = any>(options?: RawObserverOptions<T, V>) {
  const { reflect = false, attribute = true, init = true, initCallback = true, hasChanged = beChanged } = options || {}
  return function (proto: T, key: string): void {
    const ctor = proto.constructor

    let observedProps = Reflect.get(ctor, observedPropsKey, ctor)
    if (!Object.prototype.hasOwnProperty.call(ctor, observedPropsKey)) {
      // 父级属性
      const superObservedProps = Reflect.get(proto.constructor, observedPropsKey, ctor) as
        | Map<PropertyKey, ObserverOptions<T, V>>
        | undefined
      if (superObservedProps) {
        observedProps = new Map<PropertyKey, ObserverOptions<T, V>>(superObservedProps)
      } else {
        observedProps = new Map<PropertyKey, ObserverOptions<T, V>>()
      }

      Reflect.set(ctor, observedPropsKey, observedProps)
    }

    observedProps.set(key.toLowerCase(), {
      ...options,
      propKey: key,
      reflect,
      attribute,
      init,
      initCallback,
    })
  }
}

export function observeProp(this: any, observedProps: Map<string, ObserverOptions<any, any>>, prop: string): void {
  const option = observedProps.get(prop)
  if (!option) return
  const { propKey, attribute, reflect, converter, tempKey: userTempKey, sync, hasChanged, initCallback } = option ?? {}
  if (!propKey) return
  const attrName = propKey2Str(propKey)
  const mergedAttrName = typeof attribute === 'string' ? attribute : attrName
  const tempKey = userTempKey ? getTempKey(propKey, userTempKey) : ''
  let tempValue: any
  let inited = false
  let callback: (old: any, next: any) => void

  /**
   * 劫持监听属性的 setter/getter，触发 `${key}Changed` 回调
   */
  Object.defineProperty(this, propKey, {
    configurable: true,
    get(this: any) {
      return userTempKey ? Reflect.get(this, tempKey) : tempValue
    },
    set(this: any, nextValue: ObserverValue) {
      const oldValue = Reflect.get(this, propKey)
      const typeofValue = option.type ?? typeof oldValue
      const isBol = typeofValue === 'boolean'
      const mergedConverter = converter ?? getConverter(this, propKey, typeofValue)
      const mergedNextValue = mergedConverter ? mergedConverter(nextValue, this) : nextValue

      if (oldValue !== mergedNextValue) {
        tempValue = mergedNextValue
        if (userTempKey) {
          Reflect.set(this, tempKey, mergedNextValue)
        }

        if (!option.type && oldValue) {
          option.type = typeofValue // 记住 type
        }

        if (hasChanged?.(oldValue, mergedNextValue, this) === false) {
          return
        }

        const promise = sync && this.isConnected ? PromiseLike() : this.updateComplete

        promise.then(() => {
          // update 之前可能在其它地方更新过当前值，所以求最新的值
          const currentValue = Reflect.get(this, propKey)
          if (currentValue !== mergedNextValue) {
            return
          }

          // 初始化前，html 标签自带的 attribute 不能被覆盖
          const shouldReflect = !(oldValue === undefined && this.hasAttribute(mergedAttrName))
          if (reflect && shouldReflect) {
            reflectAttribute(this, mergedAttrName, currentValue, isBol)
          }

          const cb = getCallback(this, propKey)
          if (!callback && typeof cb === 'function') {
            callback = cb
          }
          const shouldCallback = initCallback || inited
          if (shouldCallback && typeof callback === 'function') {
            callback.call(this, oldValue, currentValue)
          }
        })

        // update
        this.requestUpdate(propKey, oldValue, { attribute: mergedAttrName, noAccessor: true })
        if (!inited && oldValue !== undefined) {
          inited = true
        }
      }
    },
  })
}
