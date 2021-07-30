import { ReactiveElement } from '@lit/reactive-element'

interface ReactiveElementWithObserver extends ReactiveElement {
  __observer?: Map<string, ObserverOptions & { name: string }>
  attributeChanged?: (name: string, oldValue: string | null, nextValue: string | null) => void
  [k: string]: any
}

type ObserverType = 'string' | 'number' | 'boolean'
type Value = string | number | boolean
type Converter<T = any> = (v: any, host: any) => T

interface ObserverOptions {
  type?: ObserverType
  reflect?: boolean
  attribute?: string | boolean
  converter?: Converter
  sync?: boolean
  init?: boolean
}

const typeCotrMap: Record<string, Converter> = {
  string: String,
  number: Number,
  boolean: Boolean,
}

const getConverter = (host: ReactiveElement, name: string, type?: ObserverType) => {
  const typeofValue = type ?? typeof Reflect.get(host, name)
  return typeCotrMap[typeofValue]
}

const updateAttribute = (host: ReactiveElement, attributeName: string, value: Value, isBol: boolean) => {
  if (isBol || typeof value === 'boolean') {
    host.toggleAttribute(attributeName, Boolean(value))
  } else if (String(value)) {
    host.setAttribute(attributeName, String(value))
  } else {
    host.removeAttribute(attributeName)
  }
}

const getValueFromAttribute = (host: ReactiveElement, attributeName: string, isBol: boolean) => {
  if (!isBol) return host.getAttribute(attributeName)

  const value = host.getAttribute(attributeName)
  if (value === 'true') return true
  if (value === 'false') return false
  return host.hasAttribute(attributeName)
}

type Observer = (proto: any, name: string) => void

export const observer = function (options?: ObserverOptions): Observer {
  return function (proto: any, name: string): void {
    const { type, reflect = false, attribute = true, converter, sync, init = true } = options || {}
    const mergedAttributeName = typeof attribute === 'string' ? attribute : name
    const tempName = '__' + name

    // attrs => props
    const userCallback = proto.connectedCallback
    proto.connectedCallback = function (this: ReactiveElementWithObserver) {
      userCallback.call(this)

      // init props from attributes
      if (init && attribute && this.hasAttribute(mergedAttributeName)) {
        const typeofValue = type ?? typeof Reflect.get(this, name)
        const isBol = typeofValue === 'boolean'
        const nextValue = getValueFromAttribute(this, mergedAttributeName, isBol)
        const mergedConverter = converter ?? getConverter(this, name, type)
        const mergedNextValue = mergedConverter ? mergedConverter(nextValue, this) : nextValue

        Reflect.set(this, name, mergedNextValue)
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
              const { name, converter } = rawOptions
              const typeofValue = type ?? typeof Reflect.get(this, name)
              const isBol = typeofValue === 'boolean'
              const nextValue = getValueFromAttribute(this, attributeName, isBol)
              const mergedConverter = converter ?? getConverter(this, name, type)
              const mergedNextValue = mergedConverter ? mergedConverter(nextValue, this) : nextValue
              this.attributeChangedCallback(attributeName, oldValue, this.getAttribute(attributeName))

              // 通过 attribute 变化，更新 property
              Reflect.set(this, name, mergedNextValue)
            }
            if (attributeName) {
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
      ...ownPropertyDescriptor,
      get(this: ReactiveElementWithObserver) {
        return Reflect.get(this, tempName)
      },
      set(this: ReactiveElementWithObserver, nextValue: Value) {
        const typeofValue = type ?? typeof (Reflect.get(this, name) ?? nextValue)
        const isBol = typeofValue === 'boolean'
        const tempValue = Reflect.get(this, tempName)
        const mergedConverter = converter ?? getConverter(this, name, type)
        const mergedNextValue = mergedConverter ? mergedConverter(nextValue, this) : nextValue

        if (tempValue !== mergedNextValue) {
          Reflect.set(this, tempName, mergedNextValue)
          const callback = Reflect.get(this, name + 'Changed')
          const badCallback = Reflect.get(this, name + 'Change')
          if (typeof callback === 'function') {
            if (sync) {
              // 同步的回调
              callback.call(this, tempValue, mergedNextValue)
            } else {
              this.updateComplete.then(() => callback.call(this, tempValue, mergedNextValue))
            }
          } else if (typeof badCallback === 'function') {
            console.warn(`callback should be "${name}Changed", but not "${name}Change"!`)
          }

          // 初始化前，html 标签自带的 attribute 不能被覆盖
          const shouldUpdate = !(this.hasAttribute(name) && tempValue === undefined)
          if (reflect && shouldUpdate) {
            const p = this.hasUpdated ? Promise.resolve(true) : this.updateComplete
            p.then(() => updateAttribute(this, mergedAttributeName, mergedNextValue, isBol))
          }
          this.requestUpdate(name, mergedNextValue)
        }
      },
    })
  }
}
