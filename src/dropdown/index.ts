import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { observer, query } from '../decorators'
import { FC } from '../fusion-component'
import { focusable, isHTMLElement, tabbableElement } from '../helper'
import mergeStyles from '../merge-styles'
import { after, before } from '../pattern/before-after'
import style from './style.css'

@customElement('fc-dropdown')
export class FCDropdown extends FC {
  static styles = mergeStyles(style)

  connectedCallback(): void {
    super.connectedCallback()

    this.addEventListener('click', this.handleClick)
    this.addEventListener('keydown', this.handleKeydown)
    this.addEventListener('focusout', this.handleFocusout)

    this.updateComplete.then(() => {
      const firstAssigned = this.firstAssigned
      if (firstAssigned) {
        if (!focusable(firstAssigned) && tabbableElement(firstAssigned)) {
          firstAssigned.tabIndex = -1
        }
      }
    })
  }

  @observer({ reflect: true })
  disabled = false

  get firstAssigned(): Element | undefined {
    const assigned = this.slotElements.default?.assignedElements()
    return assigned?.[0]
  }

  @query('.listbox')
  listboxNode?: HTMLDivElement

  @observer({ reflect: true })
  open = false
  openChanged(old: boolean, next: boolean): void {
    if (next) {
      this.updateComplete.then(() => {
        const { firstAssigned } = this
        if (firstAssigned && focusable(firstAssigned)) {
          firstAssigned.focus()
        } else {
          this.focus()
        }
      })
    }
  }

  @observer()
  placeholder = '请选择'

  @observer<FCDropdown, string>({
    reflect: true,
    converter(v, host) {
      if (host.listButton) return null
      return v
    },
  })
  tabindex = '0'

  @query('[slot="button"]')
  listButton?: HTMLSlotElement

  handleClick(event: MouseEvent): void {
    event.preventDefault()
    this.open = !this.disabled
  }

  handleKeydown(e: KeyboardEvent): void {
    switch (e.key) {
      case 'Enter':
        this.click()
        break
      case 'Escape': {
        const { firstAssigned } = this
        if (isHTMLElement(firstAssigned)) {
          firstAssigned.blur()
        } else {
          this.blur()
        }
        break
      }
      case ' ':
      case 'ArrowDown':
        if (!this.open && !this.disabled) {
          e.preventDefault()
          this.open = true
        }
        break
    }
  }

  handleFocusout(event: FocusEvent): void {
    const { relatedTarget } = event
    if (!(isHTMLElement(relatedTarget) && this.contains(relatedTarget))) {
      this.open = false
    }
  }

  render(): TemplateResult {
    return html`
      ${before()}
      <slot name="button" aria-haspopup="listbox" aria-expanded="${this.open}">
        <button class="button" part="button" role="button">${this.placeholder}</button>
      </slot>

      <div
        class="listbox fc-inner-outline"
        part="listbox"
        tabindex="0"
        role="listbox"
        aria-label="${this.placeholder}"
        aria-hidden="${!this.open}"
      >
        <slot></slot>
      </div>
      ${after()}
    `
  }
}
