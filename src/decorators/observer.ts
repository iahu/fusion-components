import { ReactiveElement } from '@lit/reactive-element'

export interface ReactiveElementWithObserver<T, V = any> extends ReactiveElement {
  __observer?: Map<string, ObserverOptions<T, V> & { name: string }>
  attributeChanged?: (name: string, oldValue: string | null, nextValue: string | null) => void
  [propName: string]: any
}

export type TypeCotr = { new (...args: any[]): any }
export type ObserverType = 'string' | 'number' | 'boolean'
export type Value = string | number | boolean | null
export type Converter<V = any, T = any> = (
  v: V | number | string | boolean | null,
  host: T | ReactiveElementWithObserver<T, V>
) => any

export type InitFunction<T = any, V = any> = (host: T | ReactiveElementWithObserver<T, V>) => V | null

interface ObserverOptions<T, V = any> {
  type?: ObserverType
  reflect?: boolean
  attribute?: string | boolean
  converter?: Converter<V, T>
  sync?: boolean
  init?: boolean | InitFunction<T, V>
}

const isNil = (v: any) => v === undefined || v === null

const typeCotrMap: Record<string, Converter> = {
  string: (v: any) => {
    if (isNil(v)) return ''
    return String(v)
  },
  number: Number,
  boolean: Boolean,
}

const getConverter = <T = any, V = Value>(host: ReactiveElement, name: string, type?: ObserverType) => {
  const typeofValue = type ?? typeof Reflect.get(host, name)
  return typeCotrMap[typeofValue] as Converter<V, T>
}

const updateAttribute = (host: ReactiveElement, attributeName: string, value: Value, isBol: boolean) => {
  if (isBol || typeof value === 'boolean') {
    host.toggleAttribute(attributeName, Boolean(value))
  } else if (isNil(value) || !String(value)) {
    host.removeAttribute(attributeName)
  } else {
    host.setAttribute(attributeName, String(value))
  }
}

const getValueFromAttribute = (host: ReactiveElement, attributeName: string, isBol: boolean) => {
  if (!isBol) return host.getAttribute(attributeName)

  const value = host.getAttribute(attributeName)
  if (value === 'true') return true
  if (value === 'false') return false
  return host.hasAttribute(attributeName)
}

type Observer<T> = (proto: T, name: string) => void

export const observer = function <T extends ReactiveElement, V = any>(options?: ObserverOptions<T, V>): Observer<T> {
  return function (proto: T, name: string): void {
    const { type, reflect = false, attribute = true, converter, sync, init = true } = options || {}
    const mergedAttributeName = typeof attribute === 'string' ? attribute.toLowerCase() : name.toLowerCase()
    const tempName = '_.' + name

    // attrs => props
    const userCallback = proto.connectedCallback
    proto.connectedCallback = function (this: ReactiveElementWithObserver<T, V>) {
      userCallback.call(this)

      // init props from attributes
      if (init && attribute) {
        Reflect.set(this, tempName, Reflect.get(this, name))
        if (options?.init || this.hasAttribute(mergedAttributeName)) {
          const typeofValue = type ?? typeof Reflect.get(this, name)
          const isBol = typeofValue === 'boolean'
          if (typeof init === 'function') {
            Reflect.set(this, name, init(this))
          } else {
            const nextValue = getValueFromAttribute(this, mergedAttributeName, isBol)
            const mergedConverter = converter ?? getConverter<T, V>(this, name, type)
            const mergedNextValue = mergedConverter?.(nextValue, this) ?? nextValue

            Reflect.set(this, name, mergedNextValue)
          }
        }
      }

      if (!this.__observer) {
        this.__observer = new Map()

        // mutation observer attributes
        const domObserver = new MutationObserver(mutationsList => {
          mutationsList.forEach(mutation => {
            const { attributeName, oldValue } = mutation
            if (!attributeName) return
            const rawOptions = this.__observer?.get(attributeName)
            if (rawOptions?.name) {
              const { type, name, converter } = rawOptions
              const typeofValue = type ?? typeof Reflect.get(this, name)
              const isBol = typeofValue === 'boolean'
              const nextValue = getValueFromAttribute(this, attributeName, isBol)
              const mergedConverter = converter ?? getConverter(this, name, type)
              const mergedNextValue = mergedConverter ? mergedConverter(nextValue, this) : nextValue
              this.attributeChangedCallback(attributeName, oldValue, this.getAttribute(attributeName))

              // 通过 attribute 变化，更新 property
              if (attributeName) {
                Reflect.set(this, name, mergedNextValue)
              }
              // lit 改写了 `attributeChangedCallback`，只有使用了 @property() 装饰器的属性才会触发前述回调
              // 这里加上一个通用的回调
              this.attributeChanged?.(attributeName, oldValue, this.getAttribute(attributeName))
            }
          })
        })

        domObserver.observe(this, { attributes: true })

        const userDisconnectedCallback = this.disconnectedCallback
        this.disconnectedCallback = function () {
          userDisconnectedCallback.call(this)
          domObserver.disconnect()
        }
      }

      if (attribute) {
        this.__observer.set(mergedAttributeName, { type, reflect, attribute, converter, sync, init, name })
      }
    }

    // props => attrs
    const ownPropertyDescriptor = Reflect.getOwnPropertyDescriptor(proto, name)
    Object.defineProperty(proto, name, {
      configurable: true,
      ...ownPropertyDescriptor,
      get(this: ReactiveElementWithObserver<T>) {
        return Reflect.get(this, tempName)
      },
      set(this: ReactiveElementWithObserver<T>, nextValue: Value) {
        const typeofValue = type ?? typeof (Reflect.get(this, name) ?? nextValue)
        const isBol = typeofValue === 'boolean'
        const oldValue = Reflect.get(this, tempName)
        const mergedConverter = converter ?? getConverter(this, name, type)
        const mergedNextValue = mergedConverter?.(nextValue, this) ?? nextValue

        if (oldValue !== mergedNextValue) {
          Reflect.set(this, tempName, mergedNextValue)

          // callback
          const callback = Reflect.get(this, name + 'Changed')
          const badCallback = Reflect.get(this, name + 'Change')
          if (typeof callback === 'function') {
            if (sync) {
              // 同步的回调
              callback.call(this, oldValue, mergedNextValue)
            } else {
              this.updateComplete.then(() => callback.call(this, oldValue, Reflect.get(this, name)))
            }
          } else if (typeof badCallback === 'function') {
            console.warn(`callback should be "${name}Changed", but not "${name}Change"!`)
          }

          // reflect
          // 初始化前，html 标签自带的 attribute 不能被覆盖
          const shouldUpdate = !(this.hasAttribute(name) && oldValue === undefined)
          if (reflect && shouldUpdate) {
            const p = this.hasUpdated ? Promise.resolve(true) : this.updateComplete
            p.then(() => updateAttribute(this, mergedAttributeName, mergedNextValue, isBol))
          }

          // update
          this.requestUpdate(name, oldValue, {
            attribute,
            reflect,
            noAccessor: true,
            type: typeCotrMap[typeofValue] ?? String,
          })
        }
      },
    })
  }
}
