import { html, TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import FusionComponent from '../fusion-component'
import mergeStyles from '../merge-styles'
import { after, before } from '../pattern/before-after'
import style from './style.css'

@customElement('fc-button')
export class Button extends FusionComponent {
  static styles = mergeStyles(style)

  @property()
  classes = {}

  @property({ type: Boolean })
  autofocus = false

  @property({ type: Boolean, reflect: true })
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

  @property()
  accent: 'primary' | 'scondary' | '' = 'primary'

  render(): TemplateResult<1> {
    const { autofocus, disabled, name, value, type, size, form, formaction, formnovalidate, formtarget, accent } = this

    return html`<button
      class="control"
      part="control"
      ?disabled="${disabled}"
      ?autofocus="${autofocus}"
      data-size="${size}"
      name="${name}"
      value="${value}"
      type="${type}"
      form="${form}"
      formaction="${formaction}"
      formnovalidate="${formnovalidate}"
      formtarget="${formtarget}"
      data-accent="${accent}"
    >
      ${before()}
      <span part="content" class="content"><slot></slot></span>
      ${after()}
    </button>`
  }
}
