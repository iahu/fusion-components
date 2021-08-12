import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { FCDataGridCell } from '../data-grid-cell'
import { assignedElements, observer } from '../decorators'
import { FC } from '../fusion-component'
import { setCSSText } from '../helper'
import mergeStyles from '../merge-styles'
import { after, before } from '../pattern/before-after'
import style from './style.css'

@customElement('fc-data-grid-row')
export class FCDataGridRow extends FC {
  static styles = mergeStyles(style)

  connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('open', this.handleOpen)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.removeEventListener('open', this.handleOpen)
  }

  @observer<FCDataGridRow, FCDataGridCell[]>({ attribute: false })
  @assignedElements()
  cells = [] as FCDataGridCell[]
  cellsChanged(old: FCDataGridCell[], next: FCDataGridCell[]): void {
    next.forEach((c, i) => {
      c.colIndex = i + 1
    })
    this.emit('cellsChanged')
  }

  @observer({ attribute: false })
  @assignedElements('slot[name="collapse"]')
  collapseCells = [] as FCDataGridCell[]
  collapseCellsChanged(old: FCDataGridCell[], next: FCDataGridCell[]): void {
    if (next.length && this.cells.length) {
      this.cells[0].collpase = true
      setCSSText(this.cells[this.cells.length - 1], { '--grid-border-right-width': '0' })
    }
  }

  @observer({ reflect: true })
  open = false

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

  @observer<FCDataGridRow, FCDataGridCell[]>({
    init(host) {
      return Array.from(host.querySelectorAll<FCDataGridCell>('fc-data-grid-cell[slot="row-index"]'))
    },
  })
  rowIndexElements = [] as FCDataGridCell[]
  rowIndexElementsChanged(): void {
    this.cells = Array.from(this.querySelectorAll('fc-data-grid-cell:not([slot])'))
  }

  @observer<FCDataGridRow, boolean>({ reflect: true })
  sortable = this.hasAttribute('sortable')
  sortableChanged(old: boolean, next: boolean): void {
    this.cells.forEach(c => {
      c.sortable = next
    })
  }

  handleOpen(e: Event): void {
    if (e.target instanceof FCDataGridCell) {
      this.open = e.target.open
    }
  }

  render(): TemplateResult {
    return html`
      ${before()}
      <slot></slot>
      <slot name="collapse"></slot>
      ${after()}
    `
  }
}
