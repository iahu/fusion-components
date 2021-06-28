import { html, TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import FusionComponent from '../fusion-component'
import mergeStyles from '../merge-styles'

import style from './style.css'

@customElement('fc-button')
export class Button extends FusionComponent {
  static styles = mergeStyles(style)

  @property()
  classes = {}

  @property({ type: Boolean })
  autofocus = false

  @property({ type: Boolean })
  disabled = false

  @property()
  type: '' | 'button' | 'submit' | 'reset' | 'menu' = ''

  @property()
  form = ''

  @property()
  formaction = ''

  @property()
  formenctype = ''

  @property()
  formnovalidate = ''

  @property()
  formtarget = ''

  @property()
  name = ''

  @property()
  value = ''

  @property({ type: Boolean })
  selected = false

  @property({ type: Boolean })
  outline = false

  @property({ type: Boolean })
  sharp = false

  render(): TemplateResult<1> {
    const { autofocus, disabled, name, value, type, size, form, formaction, formnovalidate, formtarget } = this

    return html`<button
      class="control"
      part="control"
      part="fc-button"
      .disabled="${disabled}"
      .autofocus="${autofocus}"
      data-size="${size}"
      name="${name}"
      value="${value}"
      type="${type}"
      form="${form}"
      formaction="${formaction}"
      formnovalidate="${formnovalidate}"
      formtarget="${formtarget}"
    >
      <span part="before" class="before"><slot name="before"></slot></span>
      <span part="content" class="content"><slot></slot></span>
      <span part="after" class="after"><slot name="after"></slot></span>
    </button>`
  }
}
