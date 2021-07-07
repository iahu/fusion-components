import { html, TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { FC } from '../fusion-component'
import mergeStyles from '../merge-styles'
import { after, before } from '../pattern/before-after'
import style from './style.css'

@customElement('fc-anchor')
export class Anchor extends FC {
  static styles = mergeStyles(style)

  @property()
  appearance = 'button'

  @property()
  download = ''

  @property()
  href = ''

  @property()
  hreflang = ''

  @property()
  ping = ''

  @property()
  ref = ''

  @property()
  target = ''

  @property()
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
