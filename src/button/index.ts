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

  connectedCallback(): void {
    super.connectedCallback()

    this.addEventListener('click', this.handleClick)
    this.addEventListener('keydown', this.handleKeydown)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()

    this.removeEventListener('click', this.handleClick)
    this.removeEventListener('keydown', this.handleKeydown)
  }

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
  selectable = false

  @observer({
    reflect: true,
    type: 'boolean',
  })
  selected = false
  protected selectedChanged(): void {
    if (!this.selectable) {
      Reflect.set(this, 'selected', false)
      return
    }
    this.emit('select')
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

  tabIndex = 0

  handleClick(e: MouseEvent): void {
    e.preventDefault()
    if (this.selectable) this.selected = !this.selected
  }

  handleKeydown(e: KeyboardEvent): void {
    if (this.selectable && [' ', 'Enter'].includes(e.key)) {
      e.preventDefault()
      this.selected = !this.selected
    }
  }

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
