import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { observer, queryAll } from '../decorators'
import { FC } from '../fusion-component'
import { isHTMLElement } from '../helper'
import type { FCMenu } from '../menu'
import mergeStyles from '../merge-styles'
import { after, before } from '../pattern/before-after'
import style from './style.css'
import radioStyle from '../radio/style.css'
import checkboxStyle from '../checkbox/style.css'

const InputRoles = ['menuitemradio', 'menuitemcheckbox']

export const isMenuItem = (e: unknown): e is FCMenuItem =>
  e instanceof FCMenuItem || (e instanceof Element && e.nodeName.toLowerCase() === 'fc-menu-item')

@customElement('fc-menu-item')
export class FCMenuItem extends FC {
  static styles = mergeStyles(radioStyle, checkboxStyle, style)

  connectedCallback(): void {
    super.connectedCallback()

    this.addEventListener('click', this.handleClick)
    this.addEventListener('keydown', this.handleKeydown)
    this.addEventListener('mouseenter', this.handleMouseenter)
    this.addEventListener('mouseleave', this.handleMouseleave)
    this.addEventListener('focusout', this.handleFocusout)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()

    this.removeEventListener('click', this.handleClick)
    this.removeEventListener('keydown', this.handleKeydown)
    this.removeEventListener('mouseenter', this.handleMouseenter)
    this.removeEventListener('mouseleave', this.handleMouseleave)
    this.removeEventListener('focusout', this.handleFocusout)
  }

  get isInputRole(): boolean {
    return InputRoles.includes(this.role)
  }

  @observer({ type: 'boolean' })
  checked = false
  checkedChanged(oldValue: boolean | undefined, nextValue: boolean): void {
    if (this.isInputRole) {
      if (this.disabled) return
      this.toggleAttribute('aria-checked', nextValue)
      this.toggleAttribute('checked', nextValue)
      if (typeof oldValue === 'boolean') {
        this.emit('change')
      }
    } else {
      this.removeAttribute('aria-checked')
    }
  }

  @observer()
  disabled = false

  @observer({ type: 'string', reflect: true })
  href?: string

  @observer({ reflect: true })
  expanded = this.hasAttribute('expanded')
  expandedChanged(old: boolean, next: boolean): void {
    this.setAttribute('aria-expanded', next.toString())

    if (next && !this.contains(document.activeElement)) {
      this.updateComplete.then(() => {
        if (this.submenu) {
          this.submenu[0]?.setTopIndex()?.focus()
        } else {
          this.focus()
        }
      })
    }

    if (typeof old === 'boolean') {
      this.emit('expanded', { old, next })

      if (next && this === document.activeElement && this.submenu?.length) {
        const submenu = this.submenu[0]
        const topindex = submenu?.setTopIndex?.()
        submenu.updateComplete.then(() => topindex?.focus())
      }
    }
  }

  @observer({ reflect: true })
  role = this.getAttribute('role') ?? 'menuitem'

  @observer({ attribute: false })
  @queryAll('[slot="submenu"]')
  submenu?: FCMenu[]

  @observer({ reflect: true })
  tabindex = this.getAttribute('tabindex') ?? '-1'

  handleClick(e: MouseEvent): void {
    this.checked = !this.disabled && this.isInputRole && (this.role === 'menuitemradio' || !this.checked)
  }

  handleKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter') {
      this.dispatchEvent(new MouseEvent('click', { bubbles: false }))
    } else if (e.key === 'Escape') {
      this.blur()
    }
  }

  private mouseenterTid?: NodeJS.Timeout

  @observer()
  mouseenterDelay = 200

  handleMouseenter(e: MouseEvent): void {
    if (this.mouseenterDelay > 0) {
      this.mouseenterTid = setTimeout(() => {
        if (this.submenu?.length) {
          this.expanded = !this.disabled
        }
      }, this.mouseenterDelay)
    } else {
      this.expanded = !this.disabled
    }
  }

  handleMouseleave(e: MouseEvent): void {
    if (this.mouseenterTid) {
      clearTimeout(this.mouseenterTid)
    }
    this.expanded = false
  }

  handleFocusout(e: FocusEvent): void {
    const { relatedTarget } = e
    const outerTarget = !relatedTarget || (isHTMLElement(relatedTarget) && relatedTarget.contains(this))
    if (this.submenu?.length && outerTarget) {
      this.expanded = false
      this.tabIndex = 0
    }
  }

  render(): TemplateResult {
    return html`
      ${before()}
      ${this.isInputRole
        ? html`<span class="input-container" ?checkable="${this.isInputRole}">
            ${this.role === 'menuitemradio'
              ? html`<slot name="radio-indicator">
                  <div class="radio control" part="control">
                    <div class="checked-indicator"></div>
                  </div>
                </slot>`
              : null}
            ${this.role === 'menuitemcheckbox'
              ? html`<slot name="checkbox-indicator">
                  <div class="checkbox control" part="control">
                    <slot name="default-indicator">
                      <div class="default-indicator"></div>
                    </slot>
                    <slot name="checked-indicator">
                      <svg
                        class="checked-indicator"
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        fill-rule="evenodd"
                        xmlns:v="https://vecta.io/nano"
                      >
                        <path d="M3.586 8.353l5.657-5.657 1.414 1.414L5 9.767z" />
                        <path d="M2.879 4.817l3.536 3.536L5 9.767 1.464 6.231z" />
                      </svg>
                    </slot>
                    <slot name="indeterminate-indicator">
                      <div class="indeterminate-indicator"></div>
                    </slot>
                  </div>
                </slot> `
              : null}
          </span>`
        : null}
      ${typeof this.href === 'string'
        ? html`<a href="${this.href}" class="content" part="content"><slot></slot></a>`
        : html`<span class="content" part="content" tabindex="-1"><slot></slot></span>`}
      ${this.submenu?.length
        ? html`<slot name="expand"
            ><svg class="arrow-right" viewBox="0 0 12 12" width="12" height="12" xmlns="http://www.w3.org/2000/svg">
              <path d="m9 6-6 5.5V.5z" fill-rule="evenodd" /></svg
          ></slot>`
        : null}
      ${after()} ${this.expanded ? html`<div class="submenu" part="submenu"><slot name="submenu"></slot></div>` : null}
      <span class="fc-inner-outline"></span>
    `
  }
}
