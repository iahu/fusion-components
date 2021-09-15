import { LitElement } from 'lit'
import { isBoolean } from '../helper'

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
}

export type ObserverOptions<T, V = unknown> = RawObserverOptions<T, V> & { propKey: string | number }

export const getTempKey = (key: PropertyKey, customKey?: boolean | string): string =>
  typeof customKey === 'string' ? customKey : `_.${key.toString()}`

const isNil = (v: unknown) => v === undefined || v === null

export const typeCotrMap: Record<string, DefaultConverter<any>> = {
  string: (v: unknown) => {
    if (isNil(v)) return ''
    return String(v)
  },
  number: Number,
  boolean: (v: boolean | null | string) => (isBoolean(v) ? v : v !== null),
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
  if (isBol || typeof value === 'boolean') {
    host.toggleAttribute(attributeName, typeCotrMap.boolean(value))
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
  if (value === 'true') return true
  if (value === 'false') return false
  return host.hasAttribute(attributeName)
}

export type ObservedProperties<T extends HTMLElement, V = any> = Map<PropertyKey, ObserverOptions<T, V>>

export const observedPropsKey = 'observedProperties'

export const observer = function <T extends LitElement, V = any>(options?: RawObserverOptions<T, V>) {
  const { type, reflect = false, attribute = true, converter, sync, init = true, tempKey } = options || {}
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
      propKey: key,
      type,
      reflect,
      attribute,
      converter,
      sync,
      init,
      tempKey,
    })
  }
}
