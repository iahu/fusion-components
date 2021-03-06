import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { debounce, DebouncedFunc, noop } from 'lodash-es'
import { assignedElements, ignoreInitChanged, observer } from '../decorators'
import '../divider'
import { FC } from '../fusion-component'
import { getNextFocusableElement, isHTMLElement, onEvent, setTopIndex, tabbableElement } from '../helper'
import '../menu-item'
import { FCMenuItem, isMenuItem } from '../menu-item'
import mergeStyles from '../merge-styles'
import { after, before } from '../pattern/before-after'
import style from './style.css'

@customElement('fc-menu')
export class FCMenu extends FC {
  static styles = mergeStyles(style)

  connectedCallback(): void {
    super.connectedCallback()

    this.setAttribute('aria-orientation', 'vertical')
    this.setAttribute('aria-expanded', 'true')

    onEvent(this, 'change', this.handleChange)
    onEvent(this, 'click', this.handleClick)
    onEvent(this, 'keydown', this.handleKeydown)
    onEvent(this, 'mouseenter', this.handleMouseenter, true)
    onEvent(this, 'mouseleave', this.handleMouseleave, true)
    onEvent(this, 'focusout', this.handleFocusout)
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
    const { target } = e
    if (!(isHTMLElement(target) && target.closest<FCMenu>('fc-menu') === this)) {
      return
    }

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
      case 'Enter': {
        if (isMenuItem(e.target)) {
          e.target.dispatchEvent(new MouseEvent('click', { bubbles: false, composed: true }))
        }
        break
      }
      case 'Escape': {
        if (isMenuItem(e.target)) {
          e.target.blur()
        }
        break
      }
    }
  }

  focusCurrentOrNext(e: KeyboardEvent, delta: number): HTMLElement | undefined {
    const { activeElement } = this.ownerDocument
    const avaliableItems = this.items.filter(tabbableElement)
    if (isHTMLElement(activeElement) && !avaliableItems.includes(activeElement)) {
      return
    }

    const target = getNextFocusableElement(avaliableItems, delta)
    if (target) {
      e.preventDefault()
      target.focus()
    }
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
        this.updateComplete.then(() => {
          submenu.setTopIndex()?.focus()
        })
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
        // parentItem.tabIndex = 0
        parentItem.focus()
        return parentItem
      }
    }
  }

  handleClick(e: MouseEvent): void {
    const { target } = e
    if (isMenuItem(target) && target.closest<FCMenu>('fc-menu') === this) {
      target.expanded = true
      const { activeElement } = document
      if (activeElement instanceof HTMLElement && activeElement !== target && this.contains(activeElement)) {
        const expandedItems = Array.from(this.querySelectorAll<FCMenuItem>('fc-menu-item[expanded]'))
        expandedItems.forEach(item => {
          item.focus()
          item.expanded = false
        })
      }

      target.focus()
    }
  }

  @observer<FCMenu, number>({
    attribute: false,
    hasChanged: ignoreInitChanged,
    converter(v) {
      return Number(v) >= 0 ? v : 240
    },
  })
  mouseenterDelay = 240
  mouseenterDelayChanged(old: number, next: number): void {
    this.removeEventListener('mouseenter', this.handleMouseenter, true)
    if (next > 0) {
      this.handleMouseenter = debounce(this.#handleMouseenter, next, { trailing: true })
    } else {
      const fn = this.#handleMouseenter as DebouncedFunc<(e: MouseEvent) => void>
      fn.cancel = noop
      fn.flush = noop
      this.handleMouseenter = fn
    }
    onEvent(this, 'mouseenter', this.handleMouseenter, true)
  }

  #handleMouseenter(e: MouseEvent): void {
    const { target } = e
    if (!(isHTMLElement(target) && target.closest('fc-menu') === this)) {
      return
    }

    this.items.find(item => {
      if (isMenuItem(item) && item.expanded) {
        item.expanded = false
      }
    })

    const menuItem = target.closest<FCMenuItem>('fc-menu-item')
    if (isMenuItem(menuItem) && !menuItem.disabled && menuItem.submenu?.length) {
      menuItem.expanded = true
      menuItem.focus()
    }
  }

  handleMouseenter = debounce(
    (e: MouseEvent) => {
      this.#handleMouseenter(e)
    },
    this.mouseenterDelay,
    { trailing: true }
  )

  handleMouseleave(e: MouseEvent): void {
    const { target, relatedTarget } = e
    if (target === this && !(isMenuItem(relatedTarget) && this.contains(relatedTarget))) {
      this.handleMouseenter.cancel()
    }
    if (isMenuItem(relatedTarget) && isMenuItem(target) && !target.disabled && target.submenu?.length) {
      target.focus()
      target.expanded = false
    }
  }

  handleFocusout(e: FocusEvent): void {
    const { relatedTarget, currentTarget } = e
    if (!(isHTMLElement(currentTarget) && currentTarget.closest('fc-menu'))) {
      return
    }

    const parentItem = currentTarget.closest<FCMenuItem>('fc-menu-item')
    if (parentItem && !(isHTMLElement(relatedTarget) && currentTarget.contains(relatedTarget))) {
      parentItem.focus()
      parentItem.expanded = false
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
