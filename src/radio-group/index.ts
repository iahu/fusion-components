import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators'
import { observer } from '../decorators'
import { FC } from '../fusion-component'
import mergeStyles from '../merge-styles'
import Radio from '../radio'
import style from './style.css'

const KEY_MAP = {
  ArrowDown: 1,
  ArrowRight: 1,
  ArrowUp: -1,
  ArrowLeft: -1,
}

@customElement('fc-radio-group')
export default class RadioGroup extends FC {
  static styles = mergeStyles(style)

  connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('keydown', this.handleKeydown)
    this.addEventListener('change', this.handleChange)
    this.updateComplete.then(() => {
      this.disabled = this.hasAttribute('disabled')
      this.value = this.getAttribute('value') || this.value
      this.name = this.getAttribute('name') || this.name

      this.items.forEach((radio) => {
        radio.checked = radio.value === this.value
        radio.toggleAttribute('disabled', this.disabled)
      })
      this.reorderTabindex()
    })
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.removeEventListener('keydown', this.handleKeydown)
  }

  public get items(): Radio[] {
    return this.slottedElements.filter((o) => o instanceof Radio) as Radio[]
  }

  public get length(): number {
    return this.items.length
  }

  @observer({ type: 'boolean', reflect: true })
  disabled = false
  disabledChanged(): void {
    const { disabled } = this
    this.items.forEach((radio) => {
      radio.disabled = disabled
      radio.tabindex = '-1'
    })
  }

  @observer()
  name = ''
  nameChanged(): void {
    const { name } = this
    this.items.forEach((radio) => {
      radio.name = name
    })
  }

  @observer()
  role = 'radiogroup'

  @observer()
  value = ''
  valueChanged(): void {
    this.reorderTabindex()
  }

  handleKeydown(e: KeyboardEvent): void {
    const step = (KEY_MAP as Record<string, number>)[e.key]
    if (!step) {
      return
    }

    const { activeElement } = this.ownerDocument
    let idx = this.items.findIndex((r) => r === activeElement)
    while (this.items.length && this.items[idx]) {
      idx += step
      const radio = this.items[idx % this.items.length]
      if (radio && !radio.disabled) {
        radio.checked = true
        radio.focus()
        break
      }
    }
  }

  reorderTabindex(): void {
    let includeChecked = false
    this.items.forEach((r) => {
      const { checked } = r
      r.tabIndex = checked ? 0 : -1
      if (checked) includeChecked = true
    })
    if (!includeChecked) {
      this.items[0].tabIndex = 0
    }
  }

  handleChange(e: Event): void {
    if (e instanceof CustomEvent) {
      const { srcElement } = e
      if (srcElement instanceof Radio && srcElement.checked) {
        if (this.value !== srcElement.value) {
          this.value = srcElement.value
        }
      }
    }
  }

  render(): TemplateResult<1> {
    return html`
      <slot name="label" part="label"></slot>
      <div class="control" part="control">
        <slot></slot>
      </div>
    `
  }
}
