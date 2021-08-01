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
  @assignedElements('slot')
  cells = [] as FCDataGridCell[]
  cellsChanged(old: FCDataGridCell[], next: FCDataGridCell[]): void {
    this.emit('cellsChanged')

    this.updateComplete.then(() => {
      const offset = Number(!this.renderRowIndex) + 1
      this.cells.forEach((c, i) => {
        c.colIndex = i + offset
      })
    })
  }

  maxCells = 0

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
  renderRowIndexChanged(old: boolean, next: boolean): void {
    const {
      slot,
      dataset: { index = '' },
    } = this
    const isRowHeader = slot === 'row-header'
    if (next) {
      if (this.rowIndexElements?.length === 0) {
        const indexCell = document.createElement('fc-data-grid-cell') as FCDataGridCell
        indexCell.role = isRowHeader ? 'columnheader' : 'cell'
        indexCell.innerText = isRowHeader ? '' : index
        indexCell.slot = 'row-index'
        indexCell.colIndex = 1
        this.firstElementChild?.before(indexCell)
      }
    } else {
      this.rowIndexElements?.forEach(c => (c.slot = ''))
    }
  }

  @observer()
  @assignedElements('[name=row-index]')
  rowIndexElements?: FCDataGridCell[]
  rowIndexElementsChanged(): void {
    this.rowIndexElements?.splice(1)
  }

  render(): TemplateResult {
    return html`
      <slot name="row-index"></slot>
      <slot></slot>
    `
  }
}
