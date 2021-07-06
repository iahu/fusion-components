import { html, TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import FusionComponent from '../fusion-component'
import mergeStyles from '../merge-styles'
import { after, before } from '../pattern/before-after'
import style from './style.css'

@customElement('fc-input')
export default class Input extends FusionComponent {
  static styles = mergeStyles(style)

  private get input(): HTMLInputElement | null | undefined {
    return this.shadowRoot?.querySelector('input')
  }

  @property({ type: Boolean })
  outline = false

  @property()
  type = 'text'

  @property()
  name?: string

  public get value(): string {
    return this.input?.value || ''
  }
  public set value(v: string) {
    if (this.input) {
      this.input.value = v
      this.requestUpdate()
    }
  }

  @property()
  placeholder?: string

  @property({ type: Boolean })
  autofocus = false

  focus(): void {
    this.input?.focus()
  }

  blur(): void {
    this.input?.blur()
  }

  @property({ type: Boolean })
  checked = false

  @property({ type: Boolean })
  disabled = false

  @property()
  form?: string

  @property()
  formaction?: string

  @property()
  formenctype?: string

  @property()
  formmethod?: string

  @property()
  formnovalidate?: string

  @property()
  formtarget?: string

  @property()
  height?: string

  @property()
  list?: string

  @property()
  max?: string

  @property()
  maxlength?: string

  @property()
  min?: string

  @property()
  minlength?: string

  @property()
  pattern?: string

  @property({ type: Boolean })
  readonly?: string

  @property({ type: Boolean })
  required?: string

  @property({ type: Boolean })
  src?: string

  @property()
  step?: string

  @property()
  width?: string

  handleChange(): void {
    this.emit('change')
  }

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
        value="${value}"
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
        @change="${this.handleChange}"
      />
      ${after()}
    `
  }
}
