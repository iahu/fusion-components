import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { observer, query, reflectAttribute } from '../decorators'
import { FC } from '../fusion-component'
import { onEvent } from '../helper'
import mergeStyles from '../merge-styles'
import { after, before } from '../pattern/before-after'
import style from './style.css'

@customElement('fc-link')
export class FCLink extends FC {
  static styles = mergeStyles(style)

  connectedCallback(): void {
    super.connectedCallback()
    onEvent(this, 'click', this.handleClick)
    onEvent(this, 'keydown', this.handleKeydown)
  }

  @observer({ reflect: true })
  appearance = 'button'

  @observer({ reflect: true, initCallback: true })
  download = ''
  downloadChanged(old: string, next: string): void {
    if (this.control) {
      reflectAttribute(this.control, 'download', next, false)
    }
  }

  @observer({ reflect: true, initCallback: true })
  href = ''
  hrefChanged(old: string, next: string): void {
    if (this.control) {
      reflectAttribute(this.control, 'href', next, false)
    }
  }

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
      .download="${this.download}"
      .href="${ifDefined(this.href)}"
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
