import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { observer } from '../decorators'
import { FC } from '../fusion-component'
import mergeStyles from '../merge-styles'

import '../data-grid-cell'
import style from './style.css'
import { FCDataGridRow } from '../data-grid-row'

@customElement('fc-data-grid-cell')
export class FCDataGridCell extends FC {
  static styles = mergeStyles(style)

  connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('focus', this.handleFocus)
    this.addEventListener('blur', this.handleBlur)
    this.addEventListener('click', this.handleClick)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.removeEventListener('focus', this.handleFocus)
    this.removeEventListener('blur', this.handleBlur)
    this.removeEventListener('click', this.handleClick)
  }

  @observer({ reflect: true })
  tabIndex = -1

  @observer()
  colIndex = -1
  colIndexChanged(old: number, next: number): void {
    if (next >= 0) {
      this.setAttribute('aria-colindex', next.toString())
    }
  }

  @observer<FCDataGridCell>({
    reflect: true,
    init(host) {
      const { parentElement } = host
      if (parentElement instanceof FCDataGridRow && parentElement.role == 'rowheader') {
        return 'columnheader'
      }
      return 'cell'
    },
  })
  role = 'cell'

  /**
   * @todo 实现 'span' 功能
   */
  // @observer()
  // span = 1
  // spanChanged() {
  //   this.style.gridColumnEnd =
  // }

  focusItem(focused = true): void {
    this.toggleAttribute('focused', Boolean(focused))
  }

  handleFocus = (e: FocusEvent): void => {
    this.focusItem(true)
  }

  handleBlur = (e: FocusEvent): void => {
    this.focusItem(false)
    // this.tabIndex = -1
  }

  handleClick = (e: MouseEvent) => {
    this.focus()
    this.tabIndex = 0
  }

  render(): TemplateResult {
    return html`<slot></slot>`
  }
}
