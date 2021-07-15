import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators'
import { observer } from '../decorators'
import { FC } from '../fusion-component'

import TreeItem, { isTreeItem } from '../tree-item'

export const isTreeView = (e: Node): e is TreeView => e instanceof TreeView

@customElement('fc-tree-view')
export default class TreeView extends FC {
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
  valueChanged(): void {
    const { value } = this
    if (!value) {
      return
    }

    const target = Array.from(this.querySelectorAll<TreeItem>('fc-tree-item')).find((e) => e.value === value)
    if (target) {
      target.toggleAttribute('selected', true)
    }
  }

  @observer()
  selectedItem?: TreeItem

  private __focusedItem?: TreeItem | null
  public get focusedItem(): TreeItem | undefined | null {
    return this.__focusedItem || this.selectedItem
  }
  public set focusedItem(v: TreeItem | undefined | null) {
    this.__focusedItem = v
  }

  public get focusableItems(): TreeItem[] {
    const items = Array.from(this.querySelectorAll<TreeItem>('fc-tree-item'))
    // as unknown as TreeItem[]
    return items.filter((e) => {
      const { parentElement } = e
      if (!parentElement || !isTreeItem(parentElement)) {
        return true
      }
      if (isTreeItem(parentElement) && !parentElement.closest('[aria-expanded="false"]')) {
        return true
      }
    })
  }

  handleSelectionChange(e: Event): void {
    const { srcElement } = e
    if (!(srcElement instanceof HTMLElement && isTreeItem(srcElement))) {
      return
    }

    if (srcElement.selected) {
      const mayFocusedItem = this.querySelector<TreeItem>('fc-tree-item[tabindex="0"]')
      // reset prev
      if (mayFocusedItem && mayFocusedItem !== srcElement) mayFocusedItem.focusItem(false)
      // update current
      if (this.selectedItem && this.selectedItem !== srcElement) this.selectedItem.selected = false
      // sync the selectedItem
      this.selectedItem = srcElement
    } else if (this.selectedItem === srcElement) {
      this.selectedItem.selected = false
      this.selectedItem = undefined
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
        this.expandedAndFocusNext()
        break
      }
      case 'ArrowLeft': {
        e.preventDefault()
        this.collapseOrFocusParent()
        break
      }
      case 'Enter':
        e.preventDefault()
        this.selectFocusedItem()
        break
    }
  }

  focusNext(delta: number): void {
    const { focusableItems } = this
    this.updateComplete.then(() => {
      const idx = focusableItems.findIndex((e) => e === this.focusedItem)
      let nextIdx = idx + delta

      while (this.focusableItems[nextIdx]) {
        const next = this.focusableItems[nextIdx]
        if (next.disabled) {
          nextIdx += delta
          continue
        }
        next.focusItem(true)
        this.focusedItem = next
        break
      }
    })
  }

  expandedAndFocusNext(): void {
    const { focusedItem } = this
    if (!focusedItem) {
      return
    }
    focusedItem.expanded = true
    this.focusNext(1)
  }

  collapseOrFocusParent(): void {
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
  selectFocusedItem(): void {
    const { focusedItem } = this
    if (focusedItem) {
      focusedItem.selected = !focusedItem.selected
    }
  }

  render(): TemplateResult<1> {
    return html`<div class="control" part="control"><slot></slot></div>`
  }
}
