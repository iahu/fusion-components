import { html, PropertyValues, TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators'
import FormAssociated from '../form-associated'
import mergeStyles from '../merge-styles'

import style from './style.css'

@customElement('fc-checkbox')
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
    this.updateForm()
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
  role = 'checkbox'

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

  updateForm(): void {
    const value = this.checked ? this.value : null
    this.elementInternals.setFormValue(value, value)
  }

  handleClick(e: MouseEvent): void {
    this.updateForm()
    if (!this.disabled && !this.readOnly) {
      this.checked = !this.checked
      this.emit('change')
    }
  }

  render(): TemplateResult<1> {
    return html`
      <div class="control" part="control">
        <slot name="checked-indicator">
          <svg
            class="checked-indicator"
            xmlns="http://www.w3.org/2000/svg"
            viewbox="0 0 38 28"
            width="38"
            height="28"
            xmlns:v="https://vecta.io/nano"
          >
            <path d="M12.422 22.635L2.708 12.569 0 15.252 12.422 28 38 2.683 35.292 0z" />
          </svg>
        </slot>
        <slot name="indeterminate-indicator">
          <div class="indeterminate-indicator"></div>
        </slot>
      </div>
      <label class="label" part="label"><slot></slot></label>
    `
  }
}
