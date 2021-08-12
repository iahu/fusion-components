import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import '../data-grid-cell'
import { FCDataGridCell } from '../data-grid-cell'
import '../data-grid-row'
import { FCDataGridRow } from '../data-grid-row'
import { observer, queryAll } from '../decorators'
import { FC } from '../fusion-component'
import { clamp, focusCurrentOrNext, setCSSText } from '../helper'
import mergeStyles from '../merge-styles'
import style from './style.css'

type SortType = 'desc' | 'asc'

@customElement('fc-data-grid')
/**
 * @description data-grid 是 grid 的一种表形式，有别于另一种 layout-grid
 */
export class FCDataGrid extends FC {
  static styles = mergeStyles(style)

  connectedCallback(): void {
    super.connectedCallback()

    this.addEventListener('keydown', this.handleKeydown)
    this.addEventListener('focusin', this.handleActive)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()

    this.removeEventListener('keydown', this.handleKeydown)
    this.removeEventListener('focusin', this.handleActive)
  }

  @observer({ attribute: false })
  activeElement?: FCDataGridCell | null
  private activeElementChanged(old?: FCDataGridCell, next?: FCDataGridCell): void {
    if (old) old.tabIndex = -1
    if (!next) return

    next.tabIndex = 0
    const { rows } = this
    if (!rows) return
    const rowIdx = rows.findIndex(r => r.contains(next))
    const activeRow = rows[rowIdx]
    this.activeRow = activeRow?.cells
    const colIdx = activeRow?.cells?.findIndex(r => r === next) ?? -1
    this.activeCol = rows.map(r => r.cells?.[colIdx]).filter(v => !!v) as FCDataGridCell[]
  }

  private activeRow?: FCDataGridCell[]

  private activeCol?: FCDataGridCell[]

  @observer({ reflect: true })
  grid = false

  @observer({ reflect: true })
  outline = false

  @observer({ reflect: true })
  role = 'grid'

  @observer({ reflect: true })
  sticky = false

  @observer({ attribute: 'max-rows' })
  maxRows = -1
  maxRowsChanged(old: number, next: number): void {
    if (next > 0) {
      this.setAttribute('max-rows', next.toString())
    } else {
      this.removeAttribute('max-rows')
    }
  }

  @observer({ attribute: false })
  @queryAll('[slot=row-header]')
  rowHeader?: FCDataGridRow[]

  @observer({ attribute: false })
  @queryAll('fc-data-grid-row')
  rows?: FCDataGridRow[]
  rowsChanged(old?: FCDataGridRow[], next = [] as FCDataGridRow[]): void {
    const { maxRows, rowHeader = [] } = this

    if (!this.activeElement && next.length) {
      this.updateComplete.then(() => {
        this.activeElement = next[0].querySelector<FCDataGridCell>('fc-data-grid-cell')
      })
    }

    const ps = [] as Promise<unknown>[]
    const dataIndexOffset = Number(!rowHeader.length)
    next.forEach((r, i) => {
      r.rowIndex = i + 1
      r.dataset.index = (i + dataIndexOffset).toString()
      ps.push(r.updateComplete)
    })
    // Lit update is async
    Promise.all(ps).then(() => this.handleSort())

    const cellsList = next.map(r =>
      r.cells.reduce((acc, cell) => {
        acc += cell.colSpan
        return acc
      }, 0)
    )
    const maxColCount = Math.max(...cellsList, 0)
    const maxRow = next?.[maxRows]
    let maxHeight = ''
    if (maxRow) {
      maxHeight = maxRow.offsetTop + maxRow.offsetHeight + 'px'
    }
    setCSSText(this, {
      'max-height': maxHeight,
      '--grid-template-columns': `repeat(${maxColCount}, 1fr)`,
    })
    this.setAttribute('aria-rowcount', next.length.toString())
    this.setAttribute('aria-colcount', maxColCount.toString())
    this.colCount = maxColCount
  }

  private colCount = -1

  @queryAll('fc-data-grid-row:not([slot])')
  dataRows?: FCDataGridRow[]

  @observer({ reflect: true })
  sortIndex = -1
  sortIndexChanged(old: number, next: number): void {
    this.handleSort()
  }

  private handleSort = () => {
    const { sortIndex, colCount, dataRows, ownerDocument } = this
    if (sortIndex > 0 && sortIndex <= colCount && dataRows) {
      const onSort = this.onSort.bind(this)
      const srotedRows = dataRows.sort(onSort)
      const docActiveElement = ownerDocument.activeElement
      this.innerHTML = ''
      const { rowHeader = [] } = this
      const dataIndexOffset = Number(!rowHeader.length)
      const rows = rowHeader.concat(srotedRows)

      rows.forEach((r, i) => {
        this.appendChild(r)
        r.rowIndex = i + 1
        r.setAttribute('data-index', (i + dataIndexOffset).toString())
      })

      if (!this.activeElement?.parentElement) {
        this.activeElement = rows[0].cells[0]
      }
      if (docActiveElement === this.activeElement) {
        this.activeElement.focus()
      }

      this.emit('sorted')
    }
  }

  @observer({ reflect: true })
  order?: SortType = 'asc'
  orderChanged(old: SortType, next: SortType): void {
    this.handleSort()
  }

  onSort(r1: FCDataGridRow, r2: FCDataGridRow): number {
    const { sortIndex, order } = this
    const ord = order === 'desc' ? -1 : 1
    const c1 = r1.cells?.find(c => c.colIndex === sortIndex)?.textContent?.trim() || ''
    const c2 = r2.cells?.find(c => c.colIndex === sortIndex)?.textContent?.trim() || ''
    return c1 == c2 ? 0 : ord * c1?.localeCompare(c2, 'co', { numeric: true })
  }

  handleKeydown(e: KeyboardEvent): void {
    const { activeElement, activeRow, activeCol } = this
    if (!(activeElement && activeRow && activeCol)) {
      return
    }

    if (!(e.target instanceof FCDataGridCell)) {
      return
    }

    switch (e.key) {
      case 'Escape':
        activeElement.blur()
        break
      case 'ArrowUp':
      case 'ArrowDown':
      case 'ArrowLeft':
      case 'ArrowRight':
        this.focusNext(e)
        break
      case 'Enter':
        this.handleActive(e)
    }
  }

  private focusNext(e: KeyboardEvent) {
    const { activeElement, activeRow, activeCol } = this
    const actions = {
      ArrowLeft: [activeRow, -1],
      ArrowRight: [activeRow, 1],
      ArrowUp: [activeCol, -1],
      ArrowDown: [activeCol, 1],
    } as Record<string, [FCDataGridCell[], number]>

    const action = actions[e.key]
    if (action) {
      const [activeCells, delta] = action
      const activeIdx = activeCells.findIndex(c => c === activeElement)
      const { length } = activeCells
      const boundary = clamp(0, length - 1, delta * length)
      const mergedDelta = e.ctrlKey ? boundary - activeIdx : delta
      const nextActiveElement = focusCurrentOrNext(activeCells, mergedDelta, !e.altKey)
      if (nextActiveElement) {
        e.preventDefault()
        nextActiveElement.scrollIntoView({ block: 'nearest' })
        this.activeElement = nextActiveElement
        const { offsetParent, offsetTop, offsetHeight } = nextActiveElement
        if (offsetParent && offsetParent.scrollTop >= offsetTop) {
          offsetParent.scrollTop -= offsetHeight
        }
      }
    }
  }

  private handleActive(e: Event): void {
    const { target } = e
    if (target instanceof FCDataGridCell) {
      this.activeElement = target
      if (target instanceof FCDataGridCell && target.sortable) {
        const nextIndex = target.colIndex
        if (nextIndex !== this.sortIndex) {
          this.sortIndex = nextIndex
        } else {
          this.order = this.order === 'desc' ? 'asc' : 'desc'
        }
      }
    }
  }

  render(): TemplateResult {
    return html`
      <slot name="row-header" sticky="${this.sticky}"></slot>
      <slot></slot>
    `
  }
}
