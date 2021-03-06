import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { observer } from '../decorators'
import FormAssociated from '../form-associated'
import { onEvent } from '../helper'
import mergeStyles from '../merge-styles'
import style from './style.css'

const createProxyElement = () => {
  const proxy = document.createElement('input')
  proxy.type = 'radio'
  return proxy
}

@customElement('fc-radio')
export class FCRadio extends FormAssociated {
  static styles = mergeStyles(style)

  constructor() {
    super(createProxyElement())
  }

  connectedCallback(): void {
    super.connectedCallback()
    this.checked = this.hasAttribute('checked')
    this.disabled = this.hasAttribute('disabled')
    this.defaultChecked = this.checked

    onEvent(this, 'click', this.handleClick)
  }

  @observer()
  value = 'on'

  @observer({ reflect: true })
  role = 'radio'

  @observer({ reflect: true })
  tabIndex = 0

  @observer({ reflect: true })
  name = ''

  // @observer({ type: Boolean, reflect: true })
  @observer({ reflect: true })
  checked = false
  protected checkedChanged(old: boolean, next: boolean): void {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.checked = next
    }

    if (this.checked) {
      this.uniqueChecked()
      this.updateForm()
      this.emit('change')
    }
  }

  @observer({ type: 'boolean' })
  defaultChecked = false

  @observer({ type: 'boolean', reflect: true })
  indeterminate = false

  @observer({ type: 'boolean', reflect: true })
  readOnly = false
  readOnlyChanged(): void {
    this.classList.toggle('readonly', this.readOnly)
  }

  private type = 'radio'

  uniqueChecked(): void {
    const scope = this.form || this.closest('fc-radio-group') || this.ownerDocument.body
    const { name } = this
    if (!scope || !name) return
    const silbings = Array.from(scope.querySelectorAll(`fc-radio[name='${name}']`)) as FCRadio[]
    silbings.forEach(e => {
      if (e !== this) {
        e.checked = false
      }
    })
  }

  updateForm(): void {
    const value = this.checked ? this.value : null
    this.setFormValue(value)
  }

  handleClick(e: MouseEvent): void {
    if (!this.disabled && !this.readOnly && !this.checked) {
      this.checked = true
      this.updateForm()
    }
  }

  render(): TemplateResult<1> {
    return html`
      <slot name="checked-indicator">
        <div class="radio control fc-inner-outline" part="control">
          <div class="checked-indicator"></div>
        </div>
      </slot>
      <label class="label" part="label"><slot></slot></label>
    `
  }
}
