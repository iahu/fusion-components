import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { assignedElements, observer } from '../decorators'
import '../divider'
import { FC } from '../fusion-component'
import { focusCurrentOrNext, indexableElement, isHTMLElement, setTopIndex } from '../helper'
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
    this.addEventListener('click', this.handleClick)
    this.setAttribute('aria-orientation', 'vertical')
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()

    this.removeEventListener('change', this.handleChange)
    this.removeEventListener('keydown', this.handleKeydown)
    this.removeEventListener('click', this.handleClick)
  }

  setTopIndex(): HTMLElement | undefined {
    return setTopIndex(this.items.filter(indexableElement))
  }

  @observer({ reflect: true })
  role = 'menu'

  @observer({ attribute: false })
  @assignedElements()
  items: Element[] = []
  itemsChanged(old: FCMenuItem[], next: FCMenuItem[]): void {
    if (!next) {
      return
    }
    if (old && this.slot !== 'submenu') {
      this.setTopIndex()
    }
  }

  resetTabIndex(): void {
    const avaliableItems = this.items
    if (avaliableItems.length) {
      avaliableItems.forEach(item => {
        if (item.hasAttribute('tabindex')) {
          item.setAttribute('tabindex', '-1')
        }
      })
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
    switch (e.key) {
      case 'ArrowUp':
        this.focusCurrentOrNext(e, -1)
        break
      case 'ArrowDown':
        this.focusCurrentOrNext(e, 1)
        break
      case 'ArrowLeft':
        this.unexpand(e)
        break
      case ' ':
        this.toggleExpand(e)
        break
      case 'ArrowRight':
        this.expand(e)
        break
    }
  }

  focusCurrentOrNext(e: KeyboardEvent, delta: number): HTMLElement | undefined {
    const { activeElement } = this.ownerDocument
    const avaliableItems = this.items.filter(indexableElement)
    if (isHTMLElement(activeElement) && !avaliableItems.includes(activeElement)) {
      return
    }

    const target = focusCurrentOrNext(avaliableItems, delta)
    if (target) e.preventDefault()
    return target
  }

  private toggleExpand(e: KeyboardEvent) {
    if (e.target instanceof FCMenuItem) {
      if (e.target.expanded) e.target.expanded = false
      else this.expand(e)
    }
  }

  private expand(e: KeyboardEvent) {
    e.preventDefault()
    const { target } = e
    if (target instanceof FCMenuItem) {
      if (!target.submenu?.length) {
        return
      }
      target.expanded = true
      const submenu = target.submenu?.[0]
      if (submenu) {
        target.tabIndex = -1
        const topIndex = submenu.setTopIndex()
        topIndex?.focus()
        return topIndex
      }
      return target
    }
  }

  private unexpand(e: KeyboardEvent) {
    e.preventDefault()
    const { target } = e
    if (target instanceof FCMenuItem) {
      const parentItem = target.parentElement?.closest<FCMenuItem>('fc-menu-item')
      if (parentItem instanceof FCMenuItem) {
        parentItem.expanded = false
        parentItem.tabIndex = 0
        parentItem.focus()
        return parentItem
      }
    }
  }

  handleClick(e: MouseEvent): void {
    if (isHTMLElement(e.target) && this.items.includes(e.target)) {
      this.resetTabIndex()
      e.target.tabIndex = 0
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
