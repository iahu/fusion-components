import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { before, after } from '../pattern/before-after'
import { observer, query } from '../decorators'
import { FC } from '../fusion-component'
import { focusable, isHTMLElement } from '../helper'
import mergeStyles from '../merge-styles'

import style from './style.css'

@customElement('fc-dropdown')
export class FCDropdown extends FC {
  static styles = mergeStyles(style)

  connectedCallback(): void {
    super.connectedCallback()

    this.addEventListener('click', this.handleClick)
    this.addEventListener('keydown', this.handleKeydown)
    this.addEventListener('focusout', this.handleFocusout)
  }

  @observer({ reflect: true })
  disabled = false

  @observer({ reflect: true })
  open = false

  @observer()
  placeholder = '请选择'

  @observer<FCDropdown, string>({
    reflect: true,
    converter(v, host) {
      if (host.trigger) {
        host.removeAttribute('tabindex')
        return ''
      }
      return v
    },
  })
  tabindex = '0'

  @query('[slot="trigger"]')
  trigger?: HTMLSlotElement

  handleClick(event: MouseEvent): void {
    event.preventDefault()
    this.open = !this.disabled
  }

  handleKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter') {
      this.click()
    } else if (e.key === 'Escape') {
      this.blur()
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
      <slot name="trigger">
        <div class="button" part="button" role="button">${this.placeholder}</div>
      </slot>

      <div class="overlay" part="overlay" tabindex="${Number(!!this.open) - 1}">
        <slot></slot>
      </div>
      ${after()}
    `
  }
}
