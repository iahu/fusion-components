import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { FCDataGridCell } from '../data-grid-cell'
import { observer, assignedElements } from '../decorators'
import { FC } from '../fusion-component'
import mergeStyles from '../merge-styles'
import style from './style.css'

@customElement('fc-data-grid-row')
export class FCDataGridRow extends FC {
  static styles = mergeStyles(style)

  @observer({ attribute: false })
  @assignedElements()
  cells = [] as FCDataGridCell[]
  cellsChanged(old: FCDataGridCell[], next: FCDataGridCell[]): void {
    this.emit('cellsChanged')

    this.updateComplete.then(() => {
      // const offset = Number(!this.renderRowIndex) + 1
      this.cells.forEach((c, i) => {
        c.colIndex = i + 1
      })
    })
  }

  @observer<FCDataGridRow>({
    reflect: true,
    converter(role: string, host) {
      return host.slot === 'row-header' ? 'rowheader' : 'row'
    },
  })
  role = 'row'

  @observer()
  rowIndex = -1
  rowIndexChanged(old: number, next: number): void {
    if (next >= 0) {
      this.setAttribute('aria-rowindex', this.rowIndex.toString())
    }
  }

  @observer({ attribute: 'render-row-index' })
  renderRowIndex = false

  @observer()
  @assignedElements('[name="row-index"]')
  rowIndexElements = [] as FCDataGridCell[]
  rowIndexElementsChanged(old: FCDataGridCell[], next: FCDataGridCell[]): void {
    if (this.renderRowIndex) {
      if (next.length) {
        next.length > 1 && this.rowIndexElements.forEach((r, i) => i && r.remove())
        this.firstChild?.before(next[0])
      }
    } else {
      this.rowIndexElements?.forEach(r => r.remove())
    }
  }

  render(): TemplateResult {
    const dataIndex = this.role === 'row' ? this.dataset.index : ''
    return html`
      <slot name="row-index">
        <fc-data-grid-cell>${dataIndex}</fc-data-grid-cell>
      </slot>
      <slot></slot>
    `
  }
}
