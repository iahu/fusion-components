import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { FC } from '../fusion-component'

@customElement('fc-data-grid')
export default class DataGrid extends FC {
  render(): TemplateResult<1> {
    return html`<slot></slot>`
  }
}
