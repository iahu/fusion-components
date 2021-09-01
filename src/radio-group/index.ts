import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { observer } from '../decorators'
import { FC } from '../fusion-component'
import { focusCurrentOrNext } from '../helper'
import mergeStyles from '../merge-styles'
import { FCRadio } from '../radio'
import style from './style.css'

@customElement('fc-radio-group')
export class FCRadioGroup extends FC {
  static styles = mergeStyles(style)

  connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('keydown', this.handleKeydown)
    this.addEventListener('change', this.handleChange)
    this.updateComplete.then(() => {
      this.disabled = this.hasAttribute('disabled')
      this.value = this.getAttribute('value') || this.value
      this.name = this.getAttribute('name') || this.name

      this.items.forEach(radio => {
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

  public get items(): FCRadio[] | [] {
    return this.slottedElements.filter(o => o instanceof FCRadio) as FCRadio[]
  }

  public get length(): number {
    return this.items.length
  }

  @observer({ type: 'boolean', reflect: true })
  disabled = false
  protected disabledChanged(old: boolean, next: boolean): void {
    this.updateComplete.then(() => {
      this.items.forEach(radio => {
        radio.disabled = next
      })
    })
  }

  @observer()
  name = ''
  protected nameChanged(): void {
    const { name } = this
    this.items.forEach(radio => {
      radio.name = name
    })
  }

  @observer()
  role = 'radiogroup'

  @observer()
  value = ''
  protected valueChanged(): void {
    this.reorderTabindex()
  }

  handleKeydown(e: KeyboardEvent): void {
    let target: HTMLElement | undefined
    const { key } = e
    if (['ArrowLeft', 'ArrowUp'].includes(key)) {
      target = focusCurrentOrNext(this.items, -1)
    } else if (['ArrowRight', 'ArrowDown'].includes(key)) {
      target = focusCurrentOrNext(this.items, 1)
    }

    if (target) {
      e.preventDefault()
    }
  }

  reorderTabindex(): void {
    let includeChecked = false
    this.items.forEach(r => {
      const { checked } = r
      r.tabIndex = checked ? 0 : -1
      if (checked) includeChecked = true
    })
    if (!includeChecked && this.items[0]) {
      this.items[0].tabIndex = 0
    }
  }

  handleChange(e: Event): void {
    if (e instanceof CustomEvent) {
      const { target } = e
      if (target instanceof FCRadio && target.checked) {
        if (this.value !== target.value) {
          this.value = target.value
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
