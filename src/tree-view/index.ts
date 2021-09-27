import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { observer, queryAll } from '../decorators'
import { FC } from '../fusion-component'
import { focusFirstOrNext, toggleTabIndex } from '../helper'
import mergeStyles from '../merge-styles'
import { FCTreeItem, isTreeItem } from '../tree-item'
import style from './style.css'

export const isTreeView = (e: Node): e is FCTreeView => e instanceof FCTreeView

@customElement('fc-tree-view')
export class FCTreeView extends FC {
  static styles = mergeStyles(style)

  connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('selectionChange', this.handleSelectionChange)
    this.addEventListener('keydown', this.handleKeydown)
    this.updateComplete.then(() => {
      if (this.items?.length) {
        toggleTabIndex(this.items, 1, false)
      }
    })
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.removeEventListener('selectionchange', this.handleSelectionChange)
    this.removeEventListener('keydown', this.handleKeydown)
  }

  @queryAll('fc-tree-item')
  items?: FCTreeItem[]

  @observer({ reflect: true })
  role = 'tree'

  @observer()
  value = ''
  protected valueChanged(old: string | undefined, next: string): void {
    if (!next) {
      return
    }

    if (this.selectedItem?.value !== next) {
      const target = this.items?.find(e => e.value === next)
      if (!target) {
        return
      }
      if (typeof old === 'string') {
        target.toggleAttribute('selected', true)
      } else {
        this.updateComplete.then(() => {
          target.toggleAttribute('selected', true)
        })
      }
    }
  }

  @observer<FCTreeView, FCTreeItem>()
  selectedItem?: FCTreeItem
  selectedItemChanged(old?: FCTreeItem, next?: FCTreeItem): void {
    if (old) {
      old.selected = false
      old.tabIndex = -1
    }
    if (next) {
      next.selected = true
      next.tabIndex = 0
      // next.focus()
    }
  }

  private get focusableItems(): FCTreeItem[] {
    const items = Array.from(this.querySelectorAll<FCTreeItem>(':not([aria-expanded="false"]) > fc-tree-item'))
    return items.filter(e => !e.parentElement?.closest('[aria-expanded="false"]'))
  }

  private handleSelectionChange(e: Event): void {
    const { target } = e

    if (isTreeItem(target) && target.selected) {
      this.selectedItem = target
    }
  }

  handleKeydown(e: KeyboardEvent): void {
    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault()
        this.focusNext(1)
        break
      }
      case 'ArrowUp': {
        e.preventDefault()
        this.focusNext(-1)
        break
      }
      case 'ArrowRight': {
        this.#expandAndFocusNext(e)
        break
      }
      case 'ArrowLeft': {
        this.#collapseOrFocusParent(e)
        break
      }
    }
  }

  focusNext(delta: number): void {
    if (this.focusableItems) {
      focusFirstOrNext(this.focusableItems, delta)
    }
  }

  #expandAndFocusNext(e: KeyboardEvent): void {
    const { target } = e
    if (!(isTreeItem(target) && target.items?.length)) {
      return
    }

    e.preventDefault()
    target.expanded = true
  }

  #collapseOrFocusParent(e: KeyboardEvent): void {
    const { target } = e
    if (!isTreeItem(target)) {
      return
    }

    e.preventDefault()
    if (target.expanded) {
      target.expanded = false
      target.focusItem(true)
    } else {
      const { parentElement } = target
      if (parentElement && isTreeItem(parentElement)) {
        parentElement.focusItem(true)
      }
    }
  }

  render(): TemplateResult<1> {
    return html`<slot></slot>`
  }
}
