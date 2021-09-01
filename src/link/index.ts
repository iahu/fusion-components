import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { observer, query } from '../decorators'
import { FC } from '../fusion-component'
import mergeStyles from '../merge-styles'
import { after, before } from '../pattern/before-after'
import style from './style.css'

@customElement('fc-link')
export class FCLink extends FC {
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

  @observer({ reflect: true })
  appearance = 'button'

  @observer({ reflect: true })
  download = ''

  @observer({ reflect: true })
  href = ''

  @observer()
  hreflang = ''

  @observer()
  ping = ''

  @observer()
  ref = ''

  @observer({ reflect: true })
  role = 'link'

  @observer()
  target = ''

  @observer({ reflect: true })
  tabindex = '0'

  @observer()
  type = ''

  @query('a', true)
  shadowAnchor?: HTMLAnchorElement

  handleClick(e: MouseEvent): void {
    if (this.shadowAnchor) {
      this.shadowAnchor.click()
    }
  }

  handleKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter') {
      this.click()
    }
  }

  render(): TemplateResult<1> {
    return html`<a
      class="control"
      part="control"
      tabindex="-1"
      .download="${this.download || undefined}"
      .href="${ifDefined(this.href || undefined)}"
      .hreflang="${this.hreflang}"
      .ping="${this.ping}"
      .ref="${this.ref}"
      .target="${this.target}"
      .type="${this.type}"
      class="control"
      part="control"
      part="control"
    >
      ${before()}
      <span part="content"><slot></slot></span>
      ${after()}
    </a>`
  }
}
