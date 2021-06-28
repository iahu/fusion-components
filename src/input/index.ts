import { html, TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import FusionComponent from '../fusion-component'
import mergeStyles from '../merge-styles'
import style from './style.css'

@customElement('fc-input')
export default class Input extends FusionComponent {
  static styles = mergeStyles(style)

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
  disabled = false

  @property()
  form?: string

  render(): TemplateResult<1> {
    const { type, name, value, placeholder, autofocus, disabled, form } = this
    return html`<div class="control" part="control">
      <span class="before"><slot name="before"></slot></span>
      <input
        type="${type}"
        name="${name}"
        value="${value}"
        placeholder="${placeholder}"
        .autofocus="${autofocus}"
        .disabled="${disabled}"
        form="${form}"
      />
      <span class="after"><slot name="after"></slot></span>
    </div>`
  }
}
