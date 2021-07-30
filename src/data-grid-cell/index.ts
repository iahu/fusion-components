import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { observer } from '../decorators'
import { FC } from '../fusion-component'
import mergeStyles from '../merge-styles'

import style from './style.css'

@customElement('fc-data-grid-cell')
export class FCDataGridCell extends FC {
  static styles = mergeStyles(style)

  @observer({ reflect: true })
  role = 'cell'

  tabIndex = -1

  render(): TemplateResult {
    return html`<slot></slot>`
  }
}
