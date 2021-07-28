import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { observer } from '../decorators'
import FusionComponent from '../fusion-component'
import mergeStyles from '../merge-styles'
import { after, before } from '../pattern/before-after'
import style from './style.css'

@customElement('fc-button')
export class FCButton extends FusionComponent {
  static styles = mergeStyles(style)

  @observer({ type: 'boolean' })
  autofocus = false

  @observer({ type: 'boolean', reflect: true })
  disabled = false

  @observer()
  type: '' | 'button' | 'submit' | 'reset' | 'menu' = ''

  @observer()
  form = ''

  @observer()
  formaction = ''

  @observer()
  formenctype = ''

  @observer()
  formnovalidate = ''

  @observer()
  formtarget = ''

  @observer()
  name = ''

  @observer()
  value = ''

  @observer({ reflect: true })
  selectable = true

  @observer({
    reflect: true,
    type: 'boolean',
    converter(v: boolean, host: FCButton) {
      return host.selectable && v
    },
  })
  selected = false
  selectedChanged(): void {
    this.setAttribute('aria-selected', String(this.selected))
  }

  @observer({ reflect: true })
  outline = false

  @observer()
  readonly = false

  @observer({ type: 'boolean', reflect: true })
  sharp = false

  @observer()
  accent: 'primary' | 'scondary' | '' = 'primary'

  @observer()
  hotkey?: string

  @observer({ reflect: true })
  tabindex = '0'

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
      tabindex="-1"
    >
      ${before()}
      <span part="content" class="content"><slot></slot></span>
      ${after()}
    </button>`
  }
}
