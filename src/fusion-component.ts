import { html, LitElement, PropertyValues, TemplateResult } from 'lit'
import { observer } from './decorators'

import './custom-elements'

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
  public get root(): HTMLElement {
    return this.shadowRoot?.firstElementChild as HTMLElement
  }

  public get control(): HTMLElement | null | undefined {
    return this.shadowRoot?.querySelector('.control')
  }

  connectedCallback(): void {
    super.connectedCallback()
    boolAriaAttrNameList.forEach(name => {
      if (Reflect.ownKeys(this).includes(`__${name}`)) {
        this.setAttribute(`aria-${name}`, this.hasAttribute(name).toString())
      }
    })
  }

  protected attributeChanged(name: string, old: string | null, next: string | null): void {
    if (boolAriaAttrNameList.includes(name)) {
      this.setAttribute(`aria-${name}`, Reflect.get(this, name))
    }
  }

  updated(p: PropertyValues<this>): void {
    p.forEach((v, k) => {
      if (!this[k] && this.control?.hasAttribute(k.toString())) {
        this.control?.removeAttribute(k.toString())
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

  @observer()
  className = this.getAttribute('class') || ''
  protected classNameChanged(old: string, next: string): void {
    this.className.split(/\s+/g).forEach(cls => cls && this.classList.add(cls))
    this.removeAttribute('className')
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
      } else {
        this.emit('input', eventInit)
      }

      const { nodeName } = this
      const type = Reflect.get(this, 'type')
      let bypassNodeName: string | undefined = ['radio', 'checkbox'].includes(type) ? 'input' : 'select'
      Object.defineProperty(this, 'nodeName', {
        configurable: true,
        get() {
          return bypassNodeName ?? nodeName
        },
      })
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
