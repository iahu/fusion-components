import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import '../checkbox'
import { observer, queryAll } from '../decorators'
import { FC } from '../fusion-component'
import type { FCMenu } from '../menu'
import mergeStyles from '../merge-styles'
import { after, before } from '../pattern/before-after'
import '../radio'
import style from './style.css'

const InputRoles = ['menuitemradio', 'menuitemcheckbox']

@customElement('fc-menu-item')
export class FCMenuItem extends FC {
  static styles = mergeStyles(style)

  connectedCallback(): void {
    super.connectedCallback()

    this.addEventListener('click', this.handleClick)
    this.addEventListener('keydown', this.handleKeydown)
    this.addEventListener('mouseenter', this.handleMouseenter)
    this.addEventListener('mouseleave', this.handleMouseleave)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()

    this.removeEventListener('click', this.handleClick)
    this.removeEventListener('keydown', this.handleKeydown)
    this.removeEventListener('mouseenter', this.handleMouseenter)
    this.removeEventListener('mouseleave', this.handleMouseleave)
  }

  get isInputRole(): boolean {
    return InputRoles.includes(this.role)
  }

  @observer()
  checked = false
  checkedChanged(oldValue: boolean | undefined, nextValue: boolean): void {
    if (this.isInputRole) {
      if (this.disabled) return
      this.toggleAttribute('aria-checked', nextValue)
      this.toggleAttribute('checked', nextValue)
      if (typeof oldValue === 'boolean') {
        this.emit('change')
        this.emit('input')
      }
    } else {
      this.removeAttribute('aria-checked')
    }
  }

  @observer()
  disabled = false

  @observer({ type: 'string', reflect: true })
  href?: string

  @observer()
  expanded = false
  expandedChanged(old: boolean, next: boolean): void {
    this.setAttribute('aria-expanded', next.toString())
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
      this.emit('click')
    }
  }

  handleMouseenter(e: MouseEvent): void {
    this.expanded = !this.disabled && true
  }

  handleMouseleave(e: MouseEvent): void {
    this.expanded = false
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