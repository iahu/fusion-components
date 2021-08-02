import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { FCDataGridCell } from '../data-grid-cell'
import { FCDataGridRow } from '../data-grid-row'
import { observer, assignedElements, queryAll } from '../decorators'
import { FC } from '../fusion-component'
import { clamp, focusCurrentOrNext, joinParams, parseParams } from '../helper'
import mergeStyles from '../merge-styles'
import style from './style.css'

import '../data-grid-cell'
import '../data-grid-row'

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
    this.addEventListener('click', this.handleClick)
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
  role = 'grid'

  @observer({ reflect: true })
  sticky = false

  @observer()
  maxRows = 10

  @observer({ attribute: false })
  @assignedElements('[name=row-header]')
  rowHeader?: FCDataGridRow[]

  @observer({ attribute: false })
  @assignedElements('slot, slot[name="row-header"]')
  rows?: FCDataGridRow[]
  rowsChanged(old?: FCDataGridRow[], next = [] as FCDataGridRow[]): void {
    const { maxRows, renderRowIndex, rowHeader = [] } = this

    if (!this.activeElement && next.length) {
      this.updateComplete.then(() => {
        // next[0]?.querySelector<FCDataGridCell>('fc-data-grid-cell')
        this.activeElement = next[0].firstElementChild as FCDataGridCell
      })
    }

    const dataIndexOffset = Number(!rowHeader.length)
    next.forEach((r, i) => {
      r.rowIndex = i + 1
      r.dataset.index = (i + dataIndexOffset).toString()
      r.renderRowIndex = renderRowIndex
    })

    const cellsList = next.map(r => r.childElementCount)
    const maxColCount = Math.max(...cellsList)
    const maxRow = next?.[maxRows]
    let maxHeight = ''
    if (maxRow) {
      maxHeight = maxRow.offsetTop + maxRow.offsetHeight + 'px'
    }
    const oldCSS = parseParams(this.style.cssText)
    const nextCSS = {
      'max-height': maxHeight,
      '--grid-template-columns': `repeat(${maxColCount}, 1fr)`,
      ...oldCSS,
    }
    this.style.cssText = joinParams(nextCSS)
    this.setAttribute('aria-rowcount', next.length.toString())
    this.setAttribute('aria-colcount', maxColCount.toString())
    this.colCount = maxColCount
  }

  private colCount = -1

  @queryAll('fc-data-grid-row:not([slot])')
  dataRows?: NodeListOf<FCDataGridRow>
  dataRowsChanged(): void {
    // console.log('what', this.dataRows)
  }

  @observer({ attribute: 'render-row-index' })
  renderRowIndex = false

  @observer()
  sortIndex = -1
  sortIndexChanged(old: number, next: number): void {
    this.updateComplete.then(() => {
      if (next > 0 && next < this.colCount && this.dataRows) {
        const onSort = this.onSort.bind(this)
        const srotedRows = Array.from(this.dataRows).sort(onSort)

        this.innerHTML = ''
        const { rowHeader = [] } = this
        const dataIndexOffset = Number(!rowHeader.length)
        const rows = rowHeader.concat(srotedRows)
        rows.forEach((r, i) => {
          this.appendChild(r)
          r.rowIndex = i + 1
          r.setAttribute('data-index', (i + dataIndexOffset).toString())
        })

        this.activeElement = rows[0].cells[0]
      }
    })
  }

  @observer()
  order?: SortType = 'asc'

  onSort(r1: FCDataGridRow, r2: FCDataGridRow): number {
    const { sortIndex, order } = this
    const ord = order === 'desc' ? -1 : 1
    const c1 = r1.cells?.[sortIndex - 1]?.textContent?.trim() || ''
    const c2 = r2.cells?.[sortIndex - 1]?.textContent?.trim() || ''
    return c1 == c2 ? 0 : ord * c1?.localeCompare(c2, 'co', { numeric: true })
  }

  handleKeydown(e: KeyboardEvent): void {
    const { activeElement, activeRow, activeCol } = this
    if (!(activeElement && activeRow && activeCol)) {
      return
    }

    if (e.key === 'Escape' && e.target instanceof FCDataGridCell) {
      activeElement.blur()
      return
    }

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

  handleClick(e: MouseEvent): void {
    const { target } = e
    if (target instanceof FCDataGridCell) {
      this.activeElement = target
    }
  }

  render(): TemplateResult {
    return html`
      <slot name="row-header" sticky="${this.sticky}"></slot>
      <slot></slot>
    `
  }
}
