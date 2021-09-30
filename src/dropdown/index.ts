import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { observer, query } from '../decorators'
import { FC } from '../fusion-component'
import { focusable, isHTMLElement, onEvent, tabbableElement } from '../helper'
import mergeStyles from '../merge-styles'
import { after, before } from '../pattern/before-after'
import style from './style.css'

@customElement('fc-dropdown')
export class FCDropdown extends FC {
  static styles = mergeStyles(style)

  connectedCallback(): void {
    super.connectedCallback()

    onEvent(this, 'click', this.handleClick)
    onEvent(this, 'keydown', this.handleKeydown)
    onEvent(this, 'focusout', this.handleFocusout)

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

  @query('.listbox', true)
  listboxNode?: HTMLDivElement

  @observer({ reflect: true })
  open = false
  openChanged(old: boolean, next: boolean): void {
    if (next) {
      const { height, bottom } = this.getBoundingClientRect()

      this.updateComplete.then(() => {
        const { firstAssigned } = this
        if (!firstAssigned) return

        if (focusable(firstAssigned)) {
          firstAssigned.focus({ preventScroll: true })
        } else if (isHTMLElement(firstAssigned)) {
          firstAssigned.setAttribute('tabindex', '-1')
          firstAssigned.focus({ preventScroll: true })
        }

        if (!this.listboxNode) return
        let { placement } = this
        const { height: listHeight } = this.slotElements.default.getBoundingClientRect()

        if (placement === 'auto') {
          placement = bottom + listHeight > window.innerHeight ? 'top' : 'bottom'
        }
        if (placement == 'top') {
          this.listboxNode.style.marginTop = `${-1 * (height + listHeight)}px`
        } else {
          this.listboxNode.style.marginTop = ''
        }
      })
    }

    this.emit('change', { old, next })
  }

  /**
   * 默认根据 listbox 展开后的定位自动调整的定位
   */
  @observer({ reflect: true })
  placement = 'auto'

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
