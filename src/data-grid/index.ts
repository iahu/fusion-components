import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { FCDataGridCell } from '../data-grid-cell'
import { FCDataGridRow } from '../data-grid-row'
import { observer } from '../decorators'
import assignedElements from '../decorators/assigned-elements'
import { FC } from '../fusion-component'
import { add, focusCurrentOrNext } from '../helper'
import mergeStyles from '../merge-styles'
import style from './style.css'

import '../data-grid-cell'
import '../data-grid-row'

@customElement('fc-data-grid')
/**
 * data-grid 是 grid 的一种表形式，有别于另一种 layout-grid
 */
export class FCDataGrid extends FC {
  static styles = mergeStyles(style)

  connectedCallback(): void {
    super.connectedCallback()

    this.addEventListener('keydown', this.handleKeydown)
  }

  @observer({ attribute: false })
  activeElement?: FCDataGridCell
  private activeElementChanged(): void {
    const { activeElement, rows } = this
    if (!activeElement) {
      return
    }

    activeElement.tabIndex = 0
    if (!rows) {
      return
    }
    const rowIdx = rows.findIndex(r => r.contains(activeElement))
    const activeRow = rows[rowIdx]
    this.activeRow = activeRow?.cells
    const colIdx = activeRow?.cells?.findIndex(r => r === activeElement) ?? -1
    this.activeCol = rows.map(r => r.cells?.[colIdx]).filter(v => !!v) as FCDataGridCell[]
  }

  private activeRow?: FCDataGridCell[]

  private activeCol?: FCDataGridCell[]

  @observer({ reflect: true })
  role = 'grid'

  @observer({ reflect: true })
  sticky = false

  @observer({ attribute: false })
  maxLines = 10

  @observer({ attribute: false })
  @assignedElements('', 'fc-data-grid-row')
  rows?: FCDataGridRow[]
  rowsChanged(): void {
    const { rows, maxLines } = this
    if (rows) {
      if (!this.activeElement) {
        this.activeElement = rows?.[0].cells?.[0]
      }

      const rowsHeight = [] as number[]
      const counts = rows.map(r => {
        rowsHeight.push(r.offsetHeight)
        return r.cells?.length || 0
      })
      const maxCellCount = Math.max(...counts)
      const maxRowsHeight = maxLines < rowsHeight.length ? rowsHeight.slice(0, maxLines).reduce(add, 0) : ''
      this.style.cssText = `${this.style.cssText}; max-height: ${maxRowsHeight}px; --max-cell-count: ${maxCellCount}`
    }
  }

  handleKeydown(e: KeyboardEvent): void {
    const { activeElement, activeRow, activeCol } = this
    if (!(activeElement && activeRow && activeCol)) {
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
      const loop = !e.altKey
      const [activeCells, delta] = action
      const activeIdx = activeCells.findIndex(c => c === activeElement)
      const deltaAxis = delta / Math.abs(delta)
      const boundary = delta < 0 ? 0 : activeCells.length - 1
      const gap = e.ctrlKey ? deltaAxis * (boundary - activeIdx) : 1
      const mergedDelta = delta * gap
      const nextActiveElement = focusCurrentOrNext(activeCells, mergedDelta, loop)
      if (nextActiveElement) {
        if (loop) e.preventDefault()
        this.activeElement = nextActiveElement
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
