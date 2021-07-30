import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import '../data-grid-cell'
import '../data-grid-row'
import { FCDataGridRow } from '../data-grid-row'
import { observer } from '../decorators'
import assignedElements from '../decorators/assigned-elements'
import { FC } from '../fusion-component'
import mergeStyles from '../merge-styles'
import style from './style.css'

@customElement('fc-data-grid')
/**
 * data-grid 是 grid 的一种表形式，有别与另一种布局的 grid
 */
export class FCDataGrid extends FC {
  static styles = mergeStyles(style)

  @observer({ reflect: true })
  role = 'grid'

  @observer({ reflect: true })
  sticky = false

  @observer({ attribute: false })
  @assignedElements('', 'fc-data-grid-row')
  rows?: FCDataGridRow[]
  rowsChanged(): void {
    if (this.rows) {
      const counts = this.rows.map((r) => r.cells?.length || 0)
      const maxCellCount = Math.max(...counts)
      this.style.cssText = `${this.style.cssText}; --max-cell-count: ${maxCellCount}`
    }
  }

  private maxCellCount = 0

  render(): TemplateResult<1> {
    return html`
      <slot name="row-header" sticky="${this.sticky}"></slot>
      <slot></slot>
    `
  }
}
