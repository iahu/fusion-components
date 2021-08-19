import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { assignedElements, observer } from '../decorators'
import '../divider'
import { FC } from '../fusion-component'
import { focusable, focusCurrentOrNext } from '../helper'
import '../menu-item'
import { FCMenuItem } from '../menu-item'
import mergeStyles from '../merge-styles'
import { after, before } from '../pattern/before-after'
import style from './style.css'

@customElement('fc-menu')
export class FCMenu extends FC {
  static styles = mergeStyles(style)

  connectedCallback(): void {
    super.connectedCallback()

    this.addEventListener('change', this.handleChange)
    this.addEventListener('keydown', this.handleKeydown)
    this.setAttribute('aria-orientation', 'vertical')
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()

    this.removeEventListener('change', this.handleChange)
    this.removeEventListener('keydown', this.handleKeydown)
  }

  @observer({ reflect: true })
  role = 'menu'

  @observer({ attribute: false })
  @assignedElements()
  items: FCMenuItem[] | [] = []
  itemsChanged(old: FCMenuItem[], next: FCMenuItem[]): void {
    if (!next) {
      return
    }
    const avaliableItems = next.filter(focusable)
    if (avaliableItems.length) {
      const hasFocus = avaliableItems.find(item => item.getAttribute('tabindex') === '0')
      if (!hasFocus) {
        avaliableItems[0].setAttribute('tabindex', '0')
      }
    }
  }

  private checkedRadio?: FCMenuItem

  handleChange(event: Event): void {
    const { target } = event
    if (target instanceof FCMenuItem && target.role === 'menuitemradio' && target.checked) {
      if (target !== this.checkedRadio) {
        if (this.checkedRadio) this.checkedRadio.checked = false
        this.checkedRadio = target
      } else {
        this.checkedRadio = undefined
      }
    }
  }

  handleKeydown(e: KeyboardEvent): void {
    const avaliableItems = Array.from(this.items).filter(focusable)

    switch (e.key) {
      case 'ArrowUp':
        focusCurrentOrNext(avaliableItems, -1) && e.preventDefault()
        break
      case 'ArrowDown':
        focusCurrentOrNext(avaliableItems, 1) && e.preventDefault()
        break
      case 'ArrowLeft':
        this.unexpand(e)
        break
      case 'ArrowRight':
        this.expand(e)
    }
  }

  private expand(e: KeyboardEvent) {
    const { target } = e
    if (target instanceof FCMenuItem) {
      if (!target.submenu?.length) {
        return
      }
      target.expanded = true
      const submenu = target.submenu?.[0]
      target.updateComplete.then(() => {
        target.tabIndex = -1
        submenu?.items?.[0].focus()
      })
    }
  }

  private unexpand(e: KeyboardEvent) {
    const { target } = e
    if (target instanceof FCMenuItem) {
      const parentElement = target.parentElement?.closest<FCMenuItem>('fc-menu-item')
      if (parentElement instanceof FCMenuItem) {
        parentElement.expanded = false
        parentElement.tabIndex = 0
        parentElement.focus()
      }
    }
  }

  render(): TemplateResult {
    return html`
      ${before()}
      <slot></slot>
      ${after()}
    `
  }
}
