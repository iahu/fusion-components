import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { observer } from '../decorators'
import FormAssociated from '../form-associated'
import mergeStyles from '../merge-styles'
import style from './style.css'

const createProxy = () => {
  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  return checkbox
}

@customElement('fc-checkbox')
export class FCCheckbox extends FormAssociated {
  static styles = mergeStyles(style)

  constructor() {
    super(createProxy())
  }

  connectedCallback(): void {
    super.connectedCallback()
    this.checked = this.hasAttribute('checked')
    this.defaultChecked = this.checked

    this.addEventListener('click', this.handleClick)
    this.addEventListener('keydown', this.handleKeydown)
  }

  disconnectedCallback(): void {
    this.removeEventListener('click', this.handleClick)
    this.removeEventListener('keydown', this.handleKeydown)
    this.updateForm()
  }

  @observer()
  value = 'on'

  @observer({ reflect: true })
  role = 'checkbox'

  @observer({ reflect: true })
  tabIndex = 0

  @observer({ type: 'boolean', reflect: true })
  checked = false

  @observer({ type: 'boolean', attribute: 'checked' })
  defaultChecked = false

  @observer({ type: 'boolean', reflect: true })
  indeterminate = false

  @observer({ type: 'boolean', reflect: true })
  readOnly = false
  readOnlyChanged(): void {
    this.classList.toggle('readonly', this.readOnly)
  }

  updateForm(): void {
    const value = this.checked ? this.value : null
    this.setFormValue(value, value)
  }

  private toggleSelect() {
    if (!this.disabled && !this.readOnly) {
      this.updateForm()
      if (this.indeterminate) this.indeterminate = false
      this.checked = !(this.checked || this.indeterminate)
      this.emit('change')

      return true
    }
  }

  private handleClick(e: MouseEvent): void {
    if (this.toggleSelect()) e.preventDefault()
  }

  private handleKeydown(e: KeyboardEvent) {
    if (' ' === e.key && this.toggleSelect()) {
      e.preventDefault()
    }
  }

  render(): TemplateResult {
    return html`
      <div class="control" part="control">
        <slot name="default-indicator">
          <div class="default-indicator"></div>
        </slot>
        <slot name="checked-indicator">
          <svg class="checked-indicator" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" xml:space="preserve">
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
