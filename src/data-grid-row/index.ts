import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { FCDataGridCell } from '../data-grid-cell'
import { observer } from '../decorators'
import assignedElements from '../decorators/assigned-elements'
import { FC } from '../fusion-component'
import mergeStyles from '../merge-styles'
import style from './style.css'

@customElement('fc-data-grid-row')
export class FCDataGridRow extends FC {
  static styles = mergeStyles(style)

  @observer({ attribute: false })
  @assignedElements(undefined, 'fc-data-grid-cell')
  cells?: FCDataGridCell[]
  cellsChanged(old: FCDataGridCell[], next: FCDataGridCell[]): void {
    this.emit('cellsChanged')
  }

  maxCellCount = 0

  @observer({ reflect: true })
  role = 'row'

  render(): TemplateResult {
    return html`<slot></slot>`
  }
}
