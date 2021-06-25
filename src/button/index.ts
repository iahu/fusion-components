import { html, TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js'
import FusionElement from '../fusion-element'
import mergeStyles from '../merge-styles'

import style from './style.css'

@customElement('fu-button')
export class Button extends FusionElement {
  static styles = mergeStyles(style)

  @property()
  classes = {}

  @property()
  styles = {}

  @property({ type: Boolean })
  autofocus = false

  @property({ type: Boolean })
  disabled = false

  @property()
  type: '' | 'button' | 'submit' | 'reset' | 'menu' = ''

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
    const { autofocus, disabled, name, value, type, size, styles } = this

    return html`<button
      part="fui-button"
      .disabled="${disabled}"
      .autofocus="${autofocus}"
      name="${name}"
      value="${value}"
      type="${type}"
    >
      <span part="before" class="before"><slot name="before"></slot></span>
      <span part="content" class="content"><slot></slot></span>
      <span part="after" class="after"><slot name="after"></slot></span>
    </button>`
  }
}
