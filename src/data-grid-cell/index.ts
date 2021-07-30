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

  @observer({ reflect: true })
  tabIndex = -1
  private tabIndexChanged() {
    this.toggleAttribute('focused', Boolean(this.tabIndex + 1))
  }

  render(): TemplateResult {
    return html`<slot></slot>`
  }
}
