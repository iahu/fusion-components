import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators'
import { FC } from '../fusion-component'

@customElement('fc-tab')
export default class Tab extends FC {
  render(): TemplateResult<1> {
    return html`<slot></slot>`
  }
}
