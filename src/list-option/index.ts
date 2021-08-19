import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { observer } from '../decorators'
import { proxySlotName, supportsElementInternals } from '../form-associated'
import { FC } from '../fusion-component'
import type { FCListBox } from '../listbox'
import mergeStyles from '../merge-styles'
import { after, before } from '../pattern/before-after'
import style from './style.css'

export const isOption = (el: Element): el is FCListOption =>
  el.tagName.toLowerCase() === 'fc-list-option' || el instanceof FCListOption

@customElement('fc-list-option')
export class FCListOption extends FC {
  static styles = mergeStyles(style)

  proxy?: HTMLInputElement

  constructor() {
    super()
    if (!supportsElementInternals) {
      this.proxy = document.createElement('input')
      this.proxy.type = 'radio'
    }
  }

  static get formAssociated(): boolean {
    return true
  }

  @observer({ type: 'boolean', reflect: true })
  hidden = false

  connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('click', this.handleClick)

    if (!supportsElementInternals) {
      this.attachProxy()
    }
  }
  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.removeEventListener('click', this.handleClick)
  }

  @observer({ reflect: true })
  role = 'option'

  @observer()
  selectable = true

  @observer<FCListOption>({
    reflect: true,
    converter(v: boolean, host) {
      return host.selectable && v
    },
  })
  selected = false
  protected selectedChanged(old: boolean, next: boolean): void {
    this.emit('select')
    if (this.proxy) {
      this.proxy.checked = next
    }
  }

  select(selected = true): void {
    if (selected !== this.selected) {
      this.selected = selected
    }
  }

  @observer({ attribute: false })
  defaultSelected = this.hasAttribute('selected')

  @observer({ type: 'boolean', reflect: true })
  disabled = false

  @observer()
  name = ''
  nameChanged(old: string, next: string): void {
    if (this.proxy) {
      this.proxy.name = next
    }
  }

  @observer()
  value = ''
  valueChanged(old: string, next: string): void {
    if (this.proxy) {
      this.proxy.value = next
    }
  }

  @observer()
  required = false

  // 不能真的获取焦点，因为在 comobox 下，焦点应该在输入框上
  focusItem(focused = true): void {
    this.toggleAttribute('focused', focused)
    this.scrollIntoView({ block: 'nearest' })
  }

  public get form(): HTMLFormElement | null {
    return this.closest('form')
  }

  public get index(): number {
    const { parentElement } = this
    // index 只与 ListBox 绑定
    if (parentElement?.nodeName.toLowerCase() === 'fc-list-box') {
      return (parentElement as FCListBox).visibleOptions.findIndex(e => e === this)
    }
    return -1
  }

  public get text(): string {
    return this.getAttribute('label') || this.textContent || this.value || ''
  }

  handleClick(e: MouseEvent): void {
    e.preventDefault()
    this.selected = !this.disabled && this.selectable
  }

  proxySlot?: HTMLSlotElement

  attachProxy(): void {
    if (!this.proxy) return
    const proxy = this.proxy
    proxy.style.display = 'none'
    proxy.name = this.name
    proxy.checked = this.selected
    proxy.value = this.value
    proxy.required = this.required
    proxy.disabled = this.disabled

    this.setAttribute('slot', proxySlotName)
    this.proxySlot = document.createElement('slot')
    this.proxySlot.name = proxySlotName
    this.shadowRoot?.appendChild(this.proxySlot)
    this.appendChild(this.proxy)
  }

  render(): TemplateResult {
    return html`<div class="control" part="control" role="option">
      ${before()}
      <span class="icon">
        <slot name="icon">
          <svg
            class="checked-indicator"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 12 12"
            style="enable-background:new 0 0 12 12"
            xml:space="preserve"
          >
            <path
              d="M4.4 10c-.3 0-.5-.1-.7-.3l-3-3.1c-.4-.4-.4-1 0-1.4.4-.4 1-.4 1.4 0l2.3 2.4 5.5-5.3c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-6.2 6c-.2.2-.4.3-.7.3z"
            />
          </svg>
        </slot>
      </span>
      <span class="content">
        <slot>${this.text}</slot>
      </span>
      ${after()}
    </div>`
  }
}
