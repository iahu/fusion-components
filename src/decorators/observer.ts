import { LitElement } from 'lit'
import { isBoolean } from '../helper'

export type TypeCotr = { new (...args: any[]): any }
export type ObserverType = 'string' | 'number' | 'boolean' | 'any'
export type ObserverValue = string | number | boolean | null
export type DefaultConverter<V = any> = (v: V | number | string | boolean | null) => any

export type Converter<V = HTMLElement, T = any> = (v: V | number | string | boolean | null, host: T) => any

export type InitFunction<T = any, V = any> = (host: T) => V | null

export type RawObserverOptions<T, V> = {
  type?: ObserverType
  reflect?: boolean
  attribute?: string | boolean
  converter?: Converter<V, T>
  sync?: boolean
  init?: boolean | InitFunction<T, V>
}

export type ObserverOptions<T, V = unknown> = RawObserverOptions<T, V> & { propKey: string | number }

export const getTempKey = (key: PropertyKey): string => `_.${key.toString()}`

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
  type?: ObserverType
): DefaultConverter<V> => {
  const typeofValue = type ?? typeof Reflect.get(host, name)
  return typeCotrMap[typeofValue] as DefaultConverter<V>
}

export const updateAttribute = (
  host: HTMLElement,
  attributeName: string,
  value: ObserverValue,
  isBol: boolean
): void => {
  if (isBol || typeof value === 'boolean') {
    host.toggleAttribute(attributeName, typeCotrMap.boolean(value))
  } else if (isNil(value) || !String(value)) {
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
  const { type, reflect = false, attribute = true, converter, sync, init = true } = options || {}
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

    observedProps.set(key.toLowerCase(), { propKey: key, type, reflect, attribute, converter, sync, init })
  }
}
