import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { FC } from '../fusion-component'
import mergeStyles from '../merge-styles'
import style from './style.css'

@customElement('fc-icon')
export class FCIcon extends FC {
  static styles = mergeStyles(style)

  render(): TemplateResult<1> {
    return html`<slot part="control"></slot>`
  }
}
