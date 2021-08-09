import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { observer } from '../decorators'
import { FC } from '../fusion-component'
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
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.removeEventListener('selectionchange', this.handleSelectionChange)
    this.removeEventListener('keydown', this.handleKeydown)
  }

  willUpdate(): void {
    const { firstElementChild } = this
    const tabTarget = this.querySelector('fc-tree-item[tabindex="0"]')
    if (firstElementChild instanceof HTMLElement && !tabTarget) firstElementChild.tabIndex = 0
  }

  @observer({ reflect: true })
  role = 'tree'

  @observer()
  value = ''
  protected valueChanged(): void {
    const { value } = this
    if (!value) {
      return
    }

    const target = Array.from(this.querySelectorAll<FCTreeItem>('fc-tree-item')).find(e => e.value === value)
    if (target) {
      target.toggleAttribute('selected', true)
    }
  }

  @observer<FCTreeView, FCTreeItem>({
    init(host) {
      return host.querySelector<FCTreeItem>('fc-tree-item')
    },
  })
  selectedItem?: FCTreeItem
  selectedItemChanged(old?: FCTreeItem, next?: FCTreeItem): void {
    if (old) {
      old.selected = false
      old.tabIndex = -1
    }
    if (next) {
      if (old) {
        next.selected = true
        next.focus()
      }
      next.tabIndex = 0
    }
  }

  private __focusedItem?: FCTreeItem | null
  public get focusedItem(): FCTreeItem | undefined | null {
    return this.__focusedItem ?? this.selectedItem
  }
  public set focusedItem(v: FCTreeItem | undefined | null) {
    this.__focusedItem = v
  }

  private get focusableItems(): FCTreeItem[] {
    const items = Array.from(this.querySelectorAll<FCTreeItem>(':not([aria-expanded="false"]) > fc-tree-item'))
    return items.filter(e => !e.parentElement?.closest('[aria-expanded="false"]'))
  }

  private handleSelectionChange(e: Event): void {
    const { target } = e

    if (this.selectedItem && isTreeItem(target) && target.selected) {
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
        e.preventDefault()
        this.expandAndFocusNext()
        break
      }
      case 'ArrowLeft': {
        e.preventDefault()
        this.collapseOrFocusParent()
        break
      }

      case ' ': {
        if (isTreeItem(e.target)) {
          e.preventDefault()
          this.toggleExpand()
        }
        break
      }

      case 'Enter': {
        if (e.target instanceof FCTreeView) {
          e.preventDefault()
          this.expandAndFocusNext()
        } else if (e.target instanceof FCTreeItem) {
          if (this.selectFocusedItem()) {
            e.preventDefault()
          }
        }
        break
      }
    }
  }

  private focusNext(delta: number): void {
    const { focusableItems } = this
    this.updateComplete.then(() => {
      const idx = focusableItems.findIndex(e => e === this.focusedItem)
      let nextIdx = idx + delta

      while (this.focusableItems[nextIdx]) {
        const next = this.focusableItems[nextIdx]
        if (next.disabled) {
          nextIdx += delta
          continue
        }
        next.focusItem(true)
        this.focusedItem = next
        next.scrollIntoView({ block: 'nearest' })
        break
      }
    })
  }

  private toggleExpand() {
    if (!this.focusedItem) {
      this.focusedItem = this.querySelector<FCTreeItem>('fc-tree-item')
    }
    if (this.focusedItem) {
      this.focusedItem.expanded = !this.focusedItem.expanded
    }
  }

  private expandAndFocusNext(): void {
    const { focusedItem } = this

    if (!focusedItem) {
      return
    }
    focusedItem.expanded = true
    this.updateComplete.then(() => {
      this.focusNext(1)
    })
  }

  private collapseOrFocusParent(): void {
    const { focusedItem } = this
    if (!focusedItem) {
      return
    }

    if (focusedItem.expanded) {
      focusedItem.expanded = false
      focusedItem.focusItem(true)
    } else {
      const { parentElement } = focusedItem
      if (parentElement && isTreeItem(parentElement)) {
        parentElement.selected = true
        parentElement.focusItem(true)
        this.focusedItem = parentElement
      }
    }
  }

  private selectFocusedItem(): boolean {
    const { focusedItem } = this
    if (focusedItem?.selectable) {
      focusedItem.selected = !focusedItem.selected
      return true
    }
    return false
  }

  render(): TemplateResult<1> {
    return html`<slot></slot>`
  }
}
