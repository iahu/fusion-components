import { html, PropertyValues, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { observer } from '../decorators'
import FormAssociated from '../form-associated'
import mergeStyles from '../merge-styles'
import style from './style.css'

@customElement('fc-checkbox')
export class FCCheckbox extends FormAssociated {
  static styles = mergeStyles(style)

  connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('click', this.handleClick)
    this.checked = this.hasAttribute('checked')
    this.defaultChecked = this.checked
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

  @observer()
  value = 'on'

  @observer({ reflect: true })
  role = 'checkbox'

  @observer({ reflect: true })
  tabindex = '0'

  @observer({ type: 'boolean', reflect: true })
  checked = false

  @observer({ type: 'boolean', attribute: 'checked' })
  defaultChecked = false

  @observer({ type: 'boolean', reflect: true })
  indeterminate = false

  @observer({ type: 'boolean', reflect: true })
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
            viewBox="0 0 12 12"
            style="enable-background:new 0 0 12 12"
            xml:space="preserve"
          >
            <path
              d="M4.4 10c-.3 0-.5-.1-.7-.3l-3-3.1c-.4-.4-.4-1 0-1.4.4-.4 1-.4 1.4 0l2.3 2.4 5.5-5.3c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-6.2 6c-.2.2-.4.3-.7.3z"
            />
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
