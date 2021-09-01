import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { assignedElements, observer } from '../decorators'
import '../divider'
import { FC } from '../fusion-component'
import { focusFirstOrNext, tabbableElement, isHTMLElement, setTopIndex } from '../helper'
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
    this.setAttribute('aria-expanded', 'true')
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()

    this.removeEventListener('change', this.handleChange)
    this.removeEventListener('keydown', this.handleKeydown)
    this.removeEventListener('click', this.handleClick)
  }

  setTopIndex(): HTMLElement | undefined {
    return setTopIndex(this.items.filter(tabbableElement))
  }

  @observer({ reflect: true })
  role = 'menu'

  @observer({ reflect: true })
  tabindex = '0'

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
    const avaliableItems = this.items.filter(tabbableElement)
    if (isHTMLElement(activeElement) && !avaliableItems.includes(activeElement)) {
      return
    }

    const target = focusFirstOrNext(avaliableItems, delta)
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
        return submenu.setTopIndex()
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
    const { target } = e
    if (isHTMLElement(target) && this.items.includes(target)) {
      this.resetTabIndex()
      target.tabIndex = 0

      target.focus()
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
