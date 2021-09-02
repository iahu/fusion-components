import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { observer, queryAll } from '../decorators'
import { FC } from '../fusion-component'
import mergeStyles from '../merge-styles'
import { after, before } from '../pattern/before-after'
import style from './style.css'

export const isTreeItem = (e: unknown): e is FCTreeItem =>
  e instanceof HTMLElement && e.nodeName.toLowerCase() === 'fc-tree-item'

@customElement('fc-tree-item')
export class FCTreeItem extends FC {
  static styles = mergeStyles(style)

  connectedCallback(): void {
    super.connectedCallback()

    this.addEventListener('keydown', this.handleKeydown)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()

    this.removeEventListener('keydown', this.handleKeydown)
  }

  focusItem(focused = true): void {
    this.toggleAttribute('focused', focused)
    if (focused) {
      this.focus()
    } else {
      this.blur()
    }
  }

  @observer()
  @queryAll('fc-tree-item')
  items?: FCTreeItem[]
  itemsChanged(old: FCTreeItem[], next: FCTreeItem[]): void {
    next.forEach(c => {
      c.slot = 'item'
    })
    this.hasChild = next.length > 0
  }

  @observer({ reflect: true })
  role = 'treeitem'

  // @observer({ reflect: true })
  // tabIndex = -1

  @observer()
  value = ''

  @observer({ reflect: true })
  disabled = false

  @observer({ reflect: true })
  /**
   * 点击文本不执行展开操作
   */
  selectable = true

  @observer<FCTreeItem, boolean>({
    reflect: true,
    converter(v, host) {
      return !host.disabled && v
    },
  })
  selected = false
  protected selectedChanged(old: boolean | undefined, next: boolean): void {
    this.emit('selectionChange', { old, next })
  }

  @observer({ attribute: false, reflect: true })
  private hasChild = this.hasAttribute('hasChild')

  @observer({ reflect: true })
  indent = false

  @observer<FCTreeItem, boolean>({
    reflect: true,
    converter(v, host) {
      return !host.disabled && host.items && host.items.length > 0 && v
    },
  })
  expanded = false
  protected expandedChanged(old: boolean, next: boolean): void {
    this.emit('expand')
    this.setAttribute('aria-expanded', String(next))
    this.updateComplete.then(() => {
      this.items?.[0]?.focus()
    })
  }

  @observer({ reflect: true })
  expandable = false

  @observer({ reflect: true })
  forceIcon = false

  handleTitleClick(e: MouseEvent): void {
    e.preventDefault()
    if (!this.disabled) {
      if (this.expandable) {
        this.expanded = !this.expanded
      }
      if (this.selectable) {
        this.selected = !this.selected
      }
    }
  }

  handleButtonClick(e: MouseEvent): void {
    e.stopPropagation()
    if (!this.disabled) {
      this.expanded = !this.expanded
    }
  }

  handleKeydown(e: KeyboardEvent): void {
    if (this.disabled || e.target !== this) return
    if (e.key === 'Enter') {
      e.preventDefault()
      this.selected = !this.selected
    }
    if (e.key === ' ') {
      e.preventDefault()
      this.expanded = !this.expanded
    }
  }

  render(): TemplateResult<1> {
    const collapseBtn = html`
      <svg class="arrow-right" viewBox="0 0 12 12" width="12" height="12" xmlns="http://www.w3.org/2000/svg">
        <path d="m9 6-6 5.5V.5z" fill-rule="evenodd" />
      </svg>
    `
    const expandBtn = html`<svg
      viewBox="0 0 12 12"
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      xmlns:v="https://vecta.io/nano"
    >
      <path d="M6 9L.5 3h11z" fill-rule="evenodd" />
    </svg>`

    return html`
      ${before()}
      ${this.hasChild
        ? html`
            <div role="button" class="expand-collapse-button" @click="${this.handleButtonClick}">
              <slot name="expand-collapse-button">
                ${this.expanded
                  ? html`<slot name="expand-button">${expandBtn}</slot>`
                  : html`<slot name="collapse-button">${collapseBtn}</slot>`}
              </slot>
            </div>
          `
        : null}
      <div class="content" part="content">
        <div class="control fc-inner-outline" part="control" @click="${this.handleTitleClick}">
          <slot></slot>
        </div>
        ${this.expanded
          ? html`<div role="group" class="group" part="group">
              <slot name="item"></slot>
            </div>`
          : null}
      </div>
      ${after()}
    `
  }
}
