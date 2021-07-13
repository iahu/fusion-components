import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators'
import { observer } from '../decorators'
import { FC } from '../fusion-component'
import mergeStyles from '../merge-styles'
import { after, before } from '../pattern/before-after'
import style from './style.css'

export const isTreeItem = (e: Node): e is TreeItem =>
  e instanceof HTMLElement && e.nodeName.toLowerCase() === 'fc-tree-item'

@customElement('fc-tree-item')
export default class TreeItem extends FC {
  static styles = mergeStyles(style)

  private clonedNodes = [] as Node[]

  connectedCallback(): void {
    super.connectedCallback()

    // 是否嵌套子项，nested
    this.childNodes.forEach((e) => {
      this.clonedNodes.push(e.cloneNode(true))
      if (isTreeItem(e)) {
        e.setAttribute('slot', 'item')
        this.nested = true
      }
    })

    this.updateComplete.then(() => {
      // 泛化成与兄弟元素一样的 nested 状态
      const siblings = Array.from(this.parentElement?.children || []).filter(isTreeItem)
      const siblingNested = siblings.some((e) => e.nested)
      this.nested = siblingNested
    })

    this.value = this.getAttribute('value') || this.value
    this.disabled = this.hasAttribute('disabled')
    this.selected = this.hasAttribute('selected')

    this.addEventListener('blur', this.handleBlur)
  }

  @observer({ reflect: true })
  focused = false
  focusedChanged(): void {
    if (this.focused) {
      this.tabIndex = 0
      this.focus()
    } else {
      this.tabIndex = -1
      this.blur()
    }
  }

  @observer({ reflect: true })
  role = 'treeitem'

  @observer()
  value = ''

  @observer({ reflect: true })
  disabled = false

  @observer({ reflect: true })
  selected = false
  selectedChanged(): void {
    if (this.disabled) {
      return
    }
    this.setAttribute('aria-selected', this.selected.toString())
    this.emit('selectionChange')
  }

  @observer()
  nested = false
  nestedChanged(): void {
    this.classList.toggle('nested', this.nested)
  }

  @observer({ reflect: true })
  flatten = false

  // 本节点内容
  public get content(): Node[] {
    return this.clonedNodes.filter((e) => !isTreeItem(e))
  }

  // 子节点
  public get items(): TreeItem[] {
    return this.clonedNodes.filter(isTreeItem)
  }
  public get length(): number {
    return this.items.length
  }

  @observer({ reflect: true })
  expanded = false
  expandedChanged(): void {
    this.setAttribute('aria-expanded', this.expanded.toString())
    this.emit('expaned')
  }

  handleClick(e: MouseEvent): void {
    if (this.disabled) {
      return
    }
    this.selected = !this.selected
  }

  handleExpandClick(e: MouseEvent): void {
    e.stopPropagation()
    this.expanded = !this.expanded
  }

  handleFocus(e: FocusEvent): void {
    e.preventDefault()
    this.focused = true
  }
  handleBlur(e: FocusEvent): void {
    e.preventDefault()
    this.focused = false
  }

  render(): TemplateResult<1> {
    const expandCollapseBtn = html`<div role="button" class="expand-collapse-button" @click="${this.handleExpandClick}">
      <svg class="arrow-right" viewBox="0 0 12 12" width="12" height="12" xmlns="http://www.w3.org/2000/svg">
        <path d="m9 6-6 5.5V.5z" fill-rule="evenodd" />
      </svg>
    </div>`
    const childNodes = html`<div role="group" class="group" part="group">
      <slot name="item"></slot>
    </div>`

    return html`
      <div class="control" part="control" @click="${this.handleClick}" ?data-has-child="${this.length > 0}">
        ${before()}
        <slot name="expand-collapse-button"> ${this.length ? expandCollapseBtn : null} </slot>
        <div class="content" part="content">
          <slot></slot>
        </div>
        ${after()}
      </div>
      ${this.expanded ? childNodes : null}
    `
  }
}
