import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { ignoreInitChanged, observer } from '../decorators'
import { FC } from '../fusion-component'
import mergeStyles from '../merge-styles'

import style from './style.css'
import { after, before } from '../pattern/before-after'

@customElement('fc-data-grid-cell')
export class FCDataGridCell extends FC {
  static styles = mergeStyles(style)

  connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('focusin', this.handleFocus)
    this.addEventListener('blur', this.handleBlur)
    this.addEventListener('click', this.handleClick)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.removeEventListener('focusin', this.handleFocus)
    this.removeEventListener('blur', this.handleBlur)
    this.removeEventListener('click', this.handleClick)
  }

  @observer({ reflect: true })
  tabIndex = -1

  @observer({ hasChanged: ignoreInitChanged })
  colIndex = -1
  colIndexChanged(old: number, next: number): void {
    if (next >= 0) {
      this.setAttribute('aria-colindex', next.toString())
    } else {
      this.removeAttribute('aria-colindex')
    }
  }

  @observer()
  colSpan = 1
  colSpanChanged(old: number, next: number): void {
    if (next > 1) {
      this.style.gridColumnEnd = `span ${next}`
    } else {
      this.style.gridColumnEnd = ''
    }
  }

  @observer({ reflect: true })
  collpase = false

  @observer({ reflect: true, hasChanged: ignoreInitChanged })
  open = false
  openChanged(old: boolean, next: boolean): void {
    this.emit('open', { old, next })
  }

  @observer<FCDataGridCell>({
    reflect: true,
    init(host) {
      const { parentElement } = host
      if (parentElement && parentElement.getAttribute('role') == 'rowheader') {
        return 'columnheader'
      }
      return 'cell'
    },
  })
  role = 'cell'

  @observer()
  sortable = this.hasAttribute('sortable')

  @observer()
  rowSpan = 1
  rowSpanChanged(old: number, next: number): void {
    if (next > 1) {
      this.style.gridRowEnd = `span ${next}`
    } else {
      this.style.gridRowEnd = ''
    }
  }

  focusItem(focused = true): void {
    this.toggleAttribute('focused', Boolean(focused))
  }

  handleFocus = (e: FocusEvent): void => {
    if (e.target === this) {
      this.focusItem(true)
    }
  }

  handleBlur = (e: FocusEvent): void => {
    if (e.target === this) {
      this.focusItem(false)
    }
  }

  handleClick = (e: MouseEvent): void => {
    if (e.target !== this) {
      return
    }

    this.tabIndex = 0
  }

  handleCollpase(e: MouseEvent): void {
    e.preventDefault()
    e.stopPropagation()
    this.open = !this.open
  }

  render(): TemplateResult {
    const collapseBtn = html`
      <svg class="arrow-right" viewBox="0 0 12 12" width="12" height="12" xmlns="http://www.w3.org/2000/svg">
        <path d="m9 6-6 5.5V.5z" fill-rule="evenodd" />
      </svg>
    `
    const expandBtn = html`<svg
      viewBox="0 0 12 12"
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      xmlns:v="https://vecta.io/nano"
    >
      <path d="M6 9L.5 3h11z" fill-rule="evenodd" />
    </svg>`

    return html`
      ${before()}
      ${this.collpase
        ? html`
            <button class="collpase-button" part="collpase-button" tabindex="-1" @click="${this.handleCollpase}">
              ${this.open
                ? html`<slot name="collapse-button">${expandBtn}</slot>`
                : html`<slot name="expand-button">${collapseBtn}</slot>`}
            </button>
          `
        : null}
      <slot></slot>
      ${after()}
      <span class="fc-focus-overlay"></span>
    `
  }
}
