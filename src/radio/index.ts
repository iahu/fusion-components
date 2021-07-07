import { html, PropertyValues, TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators'
import FormAssociated from '../form-associated'
import mergeStyles from '../merge-styles'

import style from './style.css'

@customElement('fc-radio')
export default class Checkbox extends FormAssociated {
  static styles = mergeStyles(style)

  connectedCallback(): void {
    super.connectedCallback()
    this.checked = this.hasAttribute('checked')
    this.defaultChecked = this.checked

    this.addEventListener('click', this.handleClick)
  }

  disconnectedCallback(): void {
    this.removeEventListener('click', this.handleClick)
  }

  willUpdate(p: PropertyValues<this>): void {
    super.willUpdate(p)
    this.setAttribute('aria-checked', this.checked.toString())
    this.setAttribute('aria-disabled', this.disabled.toString())
    this.setAttribute('aria-required', this.required.toString())
    this.classList.toggle('readonly', this.readOnly)
  }

  @property()
  value = 'on'

  @property({ reflect: true })
  role = 'radio'

  @property({ reflect: true })
  tabindex = '0'

  @property({ type: Boolean, reflect: true })
  checked = false

  @property({ type: Boolean })
  defaultChecked = false

  @property({ type: Boolean, reflect: true })
  indeterminate = false

  @property({ type: Boolean, reflect: true })
  readOnly = false

  handleClick(e: MouseEvent): void {
    if (!this.disabled && !this.readOnly) this.checked = !this.checked
  }

  render(): TemplateResult<1> {
    return html`
      <div class="control" part="control">
        <slot name="checked-indicator">
          <div class="checked-indicator"></div>
        </slot>
      </div>
      <label class="label" part="label"><slot></slot></label>
    `
  }
}
