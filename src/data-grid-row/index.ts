import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { FCDataGridCell } from '../data-grid-cell'
import { observer, queryAll } from '../decorators'
import { FC } from '../fusion-component'
import mergeStyles from '../merge-styles'
import { after, before } from '../pattern/before-after'
import style from './style.css'

@customElement('fc-data-grid-row')
export class FCDataGridRow extends FC {
  static styles = mergeStyles(style)

  @observer<FCDataGridRow, FCDataGridCell[]>({
    attribute: false,
    converter(v, host) {
      return Array.from(host.querySelectorAll('fc-data-grid-cell'))
    },
  })
  cells = [] as FCDataGridCell[]
  cellsChanged(old: FCDataGridCell[], next: FCDataGridCell[]): void {
    next.forEach((c, i) => {
      c.colIndex = i + 1
    })
    this.emit('cellsChanged')
  }

  @observer<FCDataGridRow>({
    reflect: true,
    init: host => (host.slot === 'row-header' ? 'rowheader' : 'row'),
  })
  role = 'row'

  @observer()
  rowIndex = -1
  rowIndexChanged(old: number, next: number): void {
    if (next >= 0) {
      this.setAttribute('aria-rowindex', this.rowIndex.toString())
    }
  }

  @observer()
  @queryAll('fc-data-grid-cell[slot="row-index"]')
  rowIndexElements = [] as FCDataGridCell[]
  rowIndexElementsChanged(): void {
    this.cells = Array.from(this.querySelectorAll('fc-data-grid-cell'))
  }

  @observer<FCDataGridRow, boolean>({ reflect: true })
  sortable = this.hasAttribute('sortable')
  sortableChanged(old: boolean, next: boolean): void {
    this.cells.forEach(c => {
      c.sortable = next
    })
  }

  render(): TemplateResult {
    return html`${before()}<slot></slot>${after()}`
  }
}
