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
  protected valueChanged(old: string, next: string): void {
    this.dirtyValue = true
    if (this.proxy) {
      this.proxy.value = next
    }
    this.updateForm()
  }

  @observer({ reflect: true })
  role = 'checkbox'

  @observer({ reflect: true })
  tabIndex = 0

  @observer({ type: 'boolean', reflect: true })
  checked = false
  checkedChanged(old: boolean, next: boolean): void {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.checked = next
    }
    this.updateForm()
  }

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
    const { value, checked } = this
    const mergedValue = checked ? value : null
    this.setFormValue(mergedValue, mergedValue)
    this.validate()
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
      <div class="checkbox control fc-inner-outline" part="control">
        <slot name="default-indicator">
          <div class="default-indicator"></div>
        </slot>
        <slot name="checked-indicator">
          <svg
            class="checked-indicator"
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            fill-rule="evenodd"
            xmlns:v="https://vecta.io/nano"
          >
            <path d="M3.586 8.353l5.657-5.657 1.414 1.414L5 9.767z" />
            <path d="M2.879 4.817l3.536 3.536L5 9.767 1.464 6.231z" />
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
