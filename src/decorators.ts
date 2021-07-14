import { ReactiveElement } from 'lit'

interface ReactiveElementWithObserver extends ReactiveElement {
  __observer?: boolean
  attributeChanged?: (name: string, oldValue: string | null, nextValue: string | null) => void
  [k: string]: any
}

type ObserverType = 'string' | 'number' | 'boolean'
type Converter = (v: any) => Value
type Value = string | number | boolean

interface ObserverOptions {
  type?: ObserverType
  reflect?: boolean
  attribute?: string | boolean
  converter?: Converter
  sync?: boolean
}

const typeCotrMap: Record<string, Converter> = {
  string: String,
  number: Number,
  boolean: Boolean,
}

const getConverter = (host: ReactiveElement, name: string, type?: ObserverType) => {
  const typeofValue = type ?? typeof Reflect.get(host, name)
  return typeCotrMap[typeofValue] || String
}

const updateAttribute = (host: ReactiveElement, name: string, value: Value, isBol: boolean) => {
  if (isBol) {
    host.toggleAttribute(name, Boolean(value))
  } else if (value) {
    host.setAttribute(name, String(value))
  } else {
    host.removeAttribute(name)
  }
}

const getValueFromAttribute = (host: ReactiveElement, name: string, isBol: boolean) => {
  return isBol ? host.hasAttribute(name) : host.getAttribute(name)
}

type Observer = (proto: any, name: string) => void

export const observer = function (options?: ObserverOptions): Observer {
  return function (proto: any, name: string): void {
    const { type, reflect = false, attribute = true, converter, sync } = options || {}
    const tempName = '__' + name

    // attrs => props
    const userCallback = proto.connectedCallback
    proto.connectedCallback = function (this: ReactiveElementWithObserver) {
      userCallback.call(this)

      // init props by props
      if (attribute && this.hasAttribute(name)) {
        const typeofValue = type ?? typeof Reflect.get(this, name)
        const isBol = typeofValue === 'boolean'
        Reflect.set(this, name, getValueFromAttribute(this, name, isBol))
      }

      if (this.__observer) {
        return
      }

      // mutation observer attributes
      this.__observer = true
      const domObserver = new MutationObserver((mutationsList) => {
        mutationsList.forEach((mutation) => {
          const { attributeName, oldValue } = mutation

          if (attributeName === name) {
            const typeofValue = type ?? typeof Reflect.get(this, name)
            const isBol = typeofValue === 'boolean'
            const nextValue = getValueFromAttribute(this, name, isBol)
            const mergedConverter = converter ?? getConverter(this, name, type)
            const mergedNextValue = mergedConverter(nextValue)
            this.attributeChangedCallback(attributeName, oldValue, this.getAttribute(attributeName))

            // 通过 attribute 变化，更新 property
            attribute && Reflect.set(this, name, mergedNextValue)
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

    // props => attrs
    const ownPropertyDescriptor = Reflect.getOwnPropertyDescriptor(proto, name)
    Object.defineProperty(proto, name, {
      ...ownPropertyDescriptor,
      get(this: ReactiveElementWithObserver) {
        const tempValue = Reflect.get(this, tempName)
        const typeofValue = type ?? typeof tempValue
        const isBol = typeofValue === 'boolean'

        return tempValue === undefined && attribute ? getValueFromAttribute(this, name, isBol) : tempValue
      },
      set(this: ReactiveElementWithObserver, nextValue: Value) {
        const typeofValue = type ?? typeof Reflect.get(this, name)
        const isBol = typeofValue === 'boolean'
        const tempValue = Reflect.get(this, tempName)

        if (tempValue !== nextValue) {
          Reflect.set(this, tempName, nextValue)
          const callback = Reflect.get(this, name + 'Changed')
          if (typeof callback === 'function') {
            if (sync) {
              //同步的回调sync
              callback.call(this, tempValue, nextValue)
            } else {
              this.updateComplete.then(() => callback.call(this, tempValue, nextValue))
            }
          }

          // 初始化前，html 标签自带的 attribute 不能被覆盖
          const shouldUpdate = !(this.hasAttribute(name) && tempValue === undefined)
          if (reflect && shouldUpdate) {
            updateAttribute(this, name, nextValue, isBol)
          }
          this.requestUpdate(name)
        }
      },
    })
  }
}
