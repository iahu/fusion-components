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

  private get input(): HTMLInputElement | null | undefined {
    return this.shadowRoot?.querySelector('input')
  }

  connectedCallback(): void {
    super.connectedCallback()
    this.value = this.input?.value || this.value
  }

  @observer()
  outline = false

  @observer()
  type = 'text'

  @observer()
  name = 'text'

  @observer()
  value = ''

  @observer()
  placeholder?: string

  @observer()
  autofocus = false

  focus(): void {
    this.input?.focus()
  }

  blur(): void {
    this.input?.blur()
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
  pattern?: string

  @observer()
  readonly = false
  readonlyChanged(): void {
    this.classList.toggle('read-only', this.readonly)
  }

  @observer()
  src = ''

  @observer()
  step?: string

  @observer()
  width?: string

  render(): TemplateResult<1> {
    const {
      type,
      name,
      value,
      placeholder,
      autofocus,
      checked,
      disabled,
      form,
      formaction,
      formtarget,
      formnovalidate,
      height,
      list,
      max,
      maxlength,
      min,
      minlength,
      pattern,
      readonly,
      required,
      src,
      step,
      width,
      inputMode,
    } = this

    return html`
      ${before()}
      <input
        class="control"
        id="control"
        part="control"
        type="${type}"
        name="${name}"
        .value="${value}"
        placeholder="${placeholder}"
        ?autofocus="${autofocus}"
        ?checked="${checked}"
        ?disabled="${disabled}"
        form="${form}"
        formaction="${formaction}"
        formtarget="${formtarget}"
        formnovalidate="${formnovalidate}"
        height="${height}"
        inputmode="${inputMode}"
        list="${list}"
        max="${max}"
        maxlength="${maxlength}"
        min="${min}"
        minlength="${minlength}"
        pattern="${pattern}"
        ?readonly="${readonly}"
        ?required="${required}"
        src="${src}"
        step="${step}"
        width="${width}"
      />
      ${after()}
    `
  }
}
