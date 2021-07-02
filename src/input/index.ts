import { html, TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import FusionComponent from '../fusion-component'
import mergeStyles from '../merge-styles'
import { after, before } from '../pattern/before-after'
import style from './style.css'

@customElement('fc-input')
export default class Input extends FusionComponent {
  static styles = mergeStyles(style)

  @property({ type: Boolean })
  outline = false

  @property()
  type = 'text'

  @property()
  name?: string

  @property()
  value?: string

  @property()
  placeholder?: string

  @property({ type: Boolean })
  autofocus = false

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

  handleInput = (event: Event): void => {
    this.value = (event.target as HTMLInputElement)?.value
    this.emit('input', event)
  }

  handleChange = (event: Event): void => {
    this.emit('change', event)
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

    return html`<div class="root" id="root" part="root">
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
        @input="${(e: Event) => this.handleInput(e)}"
        @change="${(e: Event) => this.handleChange(e)}"
      />
      ${after()}
    </div>`
  }
}
