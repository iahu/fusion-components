import { html, LitElement, TemplateResult } from 'lit'
import './custom-elements'
import {
  attr2Bol,
  getConverter,
  getTempKey,
  getValueFromAttribute,
  ObservedProperties,
  observedPropsKey,
  observer,
  ObserverOptions,
  ObserverValue,
  reflectAttribute,
} from './decorators'
import { getCallback, PromiseLike, propKey2Str } from './helper'

const boolAriaAttrNameList = [
  'selected',
  'hidden',
  'disabled',
  'readonly',
  'readOnly',
  'expanded',
  'checked',
  'required',
]

abstract class FusionComponent extends LitElement {
  static [observedPropsKey]?: Map<PropertyKey, ObserverOptions<ThisType<FusionComponent>, any>>
  constructor() {
    super()

    const observedProps = Reflect.get(this.constructor, observedPropsKey) as ObservedProperties<this, any> | undefined
    type TheType = typeof this
    if (!observedProps) {
      return
    }
    // 属性监听+反射逻辑
    Array.from(observedProps.keys()).forEach(prop => {
      const option = observedProps.get(prop)
      if (!option) return
      const { propKey, attribute, reflect, converter, tempKey: userTempKey, sync, hasChanged } = option ?? {}
      if (!propKey) return
      const attrName = propKey2Str(propKey)
      const mergedAttrName = typeof attribute === 'string' ? attribute : attrName
      const tempKey = userTempKey ? getTempKey(propKey, userTempKey) : ''
      let tempValue: any

      /**
       * 劫持监听属性的 setter/getter，触发 `${key}Changed` 回调
       */
      Object.defineProperty(this, propKey, {
        configurable: true,
        get(this: TheType) {
          return userTempKey ? Reflect.get(this, tempKey) : tempValue
        },
        set(this: TheType, nextValue: ObserverValue) {
          const oldValue = Reflect.get(this, propKey)
          const typeofValue = option.type ?? typeof oldValue
          const isBol = typeofValue === 'boolean'
          const mergedConverter = converter ?? getConverter(this, propKey, typeofValue)
          const mergedNextValue = mergedConverter ? mergedConverter(nextValue, this) : nextValue

          if (hasChanged?.(oldValue, mergedNextValue, this) === false) {
            return
          }

          if (oldValue !== mergedNextValue) {
            tempValue = mergedNextValue
            if (userTempKey) {
              Reflect.set(this, tempKey, mergedNextValue)
            }

            if (!option.type && oldValue) {
              option.type = typeofValue // 记住 type
            }

            const promise = sync && this.isConnected ? PromiseLike() : this.updateComplete

            promise.then(() => {
              // update 之前可能在其它地方更新过当前值，所以求最新的值
              const currentValue = Reflect.get(this, propKey)

              // 初始化前，html 标签自带的 attribute 不能被覆盖
              const shouldReflect = !(oldValue === undefined && this.hasAttribute(mergedAttrName))
              if (reflect && shouldReflect) {
                reflectAttribute(this, mergedAttrName, currentValue, isBol)
              }

              const callback = getCallback(this, propKey)
              if (typeof callback === 'function') {
                callback.call(this, oldValue, currentValue)
              }
            })

            // update
            this.requestUpdate(propKey, oldValue, { attribute: mergedAttrName, noAccessor: true })
          }
        },
      })
    })
  }

  public get control(): HTMLElement | null | undefined {
    return this.shadowRoot?.querySelector('.control')
  }

  static get observedAttributes(): string[] {
    const superAttrs = super.observedAttributes
    // 包括继承的父对象监听的属性
    const ctorProps = Reflect.get(this, observedPropsKey)
    if (ctorProps) {
      return superAttrs.concat([...ctorProps.keys()])
    }
    return superAttrs
  }

  attributeChangedCallback(name: string, old: string | null, next: string | null): void {
    // super.attributeChangedCallback(name, old, next)
    const ctor = this.constructor
    const observedProps = Reflect.get(ctor, observedPropsKey)
    const rawOption = observedProps?.get(name) as ObserverOptions<this, any>

    // 从 attribute 映射到 property
    if (rawOption) {
      const { propKey, type, converter } = rawOption
      const typeofValue = type ?? typeof Reflect.get(this, propKey)
      const isBol = typeofValue === 'boolean'
      const nextValue = isBol ? attr2Bol(next) : next
      const mergedConverter = converter ?? getConverter(this, name, type)
      // 这里不能用 `??` 运算符，因为 mergedConverter 可能返回 `undefined`
      const mergedNextValue = mergedConverter ? mergedConverter(nextValue, this) : nextValue

      const oldValue = Reflect.get(this, propKey)
      if (oldValue !== mergedNextValue) {
        Reflect.set(this, propKey, mergedNextValue)
      } else if (nextValue === false && next !== null) {
        this.removeAttribute(name)
      }

      if (boolAriaAttrNameList.includes(name)) {
        this.setAttribute(`aria-${name}`, mergedNextValue.toString())
      }
    }
  }

  connectedCallback(): void {
    super.connectedCallback()

    const observedProps = Reflect.get(this.constructor, observedPropsKey) as ObservedProperties<this, any> | undefined
    if (!observedProps) {
      return
    }

    Array.from(observedProps.keys()).forEach(prop => {
      const option = observedProps.get(prop)
      if (!option) return
      const { propKey, init, attribute, type, converter } = option ?? {}
      if (!propKey) return
      const attrName = propKey2Str(propKey)
      const mergedAttrName = typeof attribute === 'string' ? attribute : attrName

      /**
       * 初始赋值逻辑
       */
      if (typeof init === 'function') {
        Reflect.set(this, propKey, init(this))
      } else if (attribute && this.hasAttribute(attrName)) {
        const typeofValue = type ?? typeof Reflect.get(this, propKey)
        const isBol = typeofValue === 'boolean'
        const nextValue = getValueFromAttribute(this, mergedAttrName, isBol)
        const mergedConverter = converter ?? getConverter<this, any>(this, propKey, type)
        const mergedNextValue = mergedConverter ? mergedConverter(nextValue, this) : nextValue
        Reflect.set(this, propKey, mergedNextValue)
      }
    })
  }

  get slotElements(): Record<string, HTMLSlotElement> {
    const map = {} as Record<string, HTMLSlotElement>
    this.renderRoot.querySelectorAll('slot').forEach(item => {
      map[item.name || 'default'] = item
    })
    return map
  }

  get slottedElements(): Element[] {
    const slot = this.shadowRoot?.querySelector('slot:not([name])')
    if (slot instanceof HTMLSlotElement) {
      return slot.assignedElements() as Element[]
    }
    return []
  }

  @observer({ type: 'string' })
  classname?: string
  classnameChanged(old: string, next: string): void {
    if (next) {
      this.setAttribute('class', next)
      // react className property
      this.removeAttribute('className')
    }
  }

  @observer({ reflect: true })
  size: '' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl' = ''

  @observer({ type: 'boolean' })
  sharp = false

  $emit<T = unknown>(type: string, init?: CustomEventInit<T>): void {
    type CustomEventWithSimulate = CustomEvent<T> & { simulated: boolean; value: any; _valueTracker?: any }
    const eventInit = {
      bubbles: true,
      composed: true,
      cancelable: false,
      ...init,
    }

    const event = new CustomEvent<T>(type, eventInit) as CustomEventWithSimulate
    // simulate React onChange
    if (type === 'change') {
      event.simulated = true
      const tracker = Reflect.get(this, '_valueTracker')
      const lastValue = Reflect.get(this, 'value')
      event.value = Symbol('nextValue')
      if (tracker) {
        tracker.setValue(lastValue)
      }

      const { nodeName } = this
      const type = Reflect.get(this, 'type')
      let bypassNodeName: string | undefined = ['radio', 'checkbox'].includes(type) ? 'input' : 'select'
      if (this.nodeName !== 'input' && this.nodeName !== 'select') {
        Object.defineProperty(this, 'nodeName', {
          configurable: true,
          get() {
            return bypassNodeName ?? nodeName
          },
        })
      }
      this.dispatchEvent(event)
      bypassNodeName = undefined
    } else {
      this.dispatchEvent(event)
    }
  }

  emit<T = unknown>(type: string, detail?: T): void {
    this.$emit(type, { detail })
  }

  render(): TemplateResult {
    return html``
  }
}

export const FC = FusionComponent

export default FusionComponent
