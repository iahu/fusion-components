import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { observer } from '../decorators'
import { FC } from '../fusion-component'
import mergeStyles from '../merge-styles'
import { after, before } from '../pattern/before-after'
import style from './style.css'

@customElement('fc-link')
export class FCLink extends FC {
  static styles = mergeStyles(style)

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

  @observer()
  type = ''

  render(): TemplateResult<1> {
    return html`<a
      class="control"
      part="control"
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
