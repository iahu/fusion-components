import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { observer } from '../decorators'
import FormAssociated from '../form-associated'
import mergeStyles from '../merge-styles'
import { after, before } from '../pattern/before-after'
import style from './style.css'

@customElement('fc-input')
export class FCInput extends FormAssociated {
  static styles = mergeStyles(style)

  get shadowInput(): HTMLInputElement | null | undefined {
    return this.proxy instanceof HTMLInputElement ? this.proxy : null
  }

  attributeChangedCallback(name: string, old: string | null, next: string | null): void {
    super.attributeChangedCallback(name, old, next)
    const proxyKeys = [
      'type',
      'name',
      'value',
      'placeholder',
      'autofocus',
      'checked',
      'disabled',
      'form',
      'formaction',
      'formtarget',
      'formnovalidate',
      'height',
      'list',
      'max',
      'maxlength',
      'min',
      'minlength',
      'pattern',
      'readonly',
      'required',
      'src',
      'step',
      'width',
      'inputMode',
    ]

    if (proxyKeys.includes(name)) {
      if (next) {
        this.proxy.setAttribute(name, next)
      } else {
        this.proxy.removeAttribute(name)
      }
    }
  }

  connectedCallback(): void {
    super.connectedCallback()

    this.addEventListener('focusin', this.handleFocusin)
    this.addEventListener('focusout', this.handleFocusout)
    this.addEventListener('click', this.handleClick)
    this.addEventListener('keydown', this.handleKeyDown)
    this.attachProxy()
    this.proxy.style.cssText = ''

    if (this.autofocus && !document.activeElement) {
      this.focus()
    }
  }

  disconnectedCallback(): void {
    this.removeEventListener('focusin', this.handleFocusin)
    this.removeEventListener('focusout', this.handleFocusout)
    this.removeEventListener('click', this.handleClick)
    this.removeEventListener('keydown', this.handleKeyDown)
    this.detachProxy()
  }

  @observer({ reflect: true })
  accept = ''
  acceptChanged(old: string, next: string): void {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.accept = next
    }
  }

  // 重写 blur 方法
  blur(): void {
    this.shadowInput?.blur()
    this.$emit('blur', { bubbles: false, composed: true })
  }

  @observer()
  outline = false

  @observer()
  type = 'text'
  typeChanged(old: string, next: string): void {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.type = next
    }
    if (next === 'file') {
      this.placeholder = '请选择文件'
    } else if (['number', 'text'].includes(next)) {
      this.placeholder = '请输入'
    }
  }

  @observer()
  name = ''

  @observer()
  placeholder?: string

  @observer()
  autofocus = false

  get files(): FileList | null | undefined {
    if (this.proxy instanceof HTMLInputElement) {
      return this.proxy.files
    }
  }

  @observer()
  checked = false

  @observer()
  disabled = false

  @observer()
  formaction?: string

  @observer()
  formenctype?: string

  @observer()
  formmethod?: string

  @observer()
  formnovalidate?: string

  @observer()
  formtarget?: string

  @observer()
  height?: string

  @observer({ type: 'string' })
  label?: string

  @observer({ reflect: true })
  orientation: 'vertical' | 'horizontal' = 'horizontal'

  @observer()
  list?: string

  @observer()
  max?: string

  @observer()
  maxlength?: string

  @observer()
  min?: string

  @observer()
  minlength?: string

  @observer()
  multiple = false
  multipleChanged(old: boolean, next: boolean): void {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.multiple = next
    }
  }

  @observer()
  pattern?: string

  @observer()
  readonly = false
  protected readonlyChanged(): void {
    this.classList.toggle('read-only', this.readonly)
  }

  @observer()
  src = ''

  @observer()
  step?: string

  @observer({ reflect: true })
  tabIndex = 0

  valueChanged(old: any, next: any): void {
    super.valueChanged(old, next)
    this.emit('change', { old, next })
  }

  @observer()
  width?: string

  #focused = false

  handleFocusin(e: FocusEvent): void {
    this.shadowInput?.focus()
    this.#focused = true
    this.requestUpdate()
  }

  handleFocusout(e: FocusEvent): void {
    this.shadowInput?.blur()
    this.#focused = false
    this.requestUpdate()
  }

  handleClick(e: MouseEvent): void {
    if (this.proxy) {
      this.proxy.click()
    }
  }

  handleKeyDown(e: KeyboardEvent): void {
    if (['Enter', ' '].includes(e.key)) {
      this.click()
    }
  }

  render(): TemplateResult {
    return html`
      <slot name="label">${this.label ? html`<span class="label">${this.label}</span` : null}</slot>
      <div class="control fc-focusin-outline" part="control" focused="${this.#focused}">
        ${before()}
        ${this.type === 'file'
          ? html`<slot has-value="${!!this.value}">${this.value || this.placeholder}</slot>`
          : html`<slot name="form-associated-proxy"></slot>`}
        ${after()}
      </div>
    `
  }
}
