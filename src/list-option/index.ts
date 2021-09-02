import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { observer } from '../decorators'
import FormAssociated from '../form-associated'
import mergeStyles from '../merge-styles'
import { after, before } from '../pattern/before-after'
import style from './style.css'

export const isOption = (el: Element): el is FCListOption =>
  el.tagName.toLowerCase() === 'fc-list-option' || el instanceof FCListOption

const createProxy = () => {
  const proxy = document.createElement('input')
  proxy.type = 'radio'
  return proxy
}

@customElement('fc-list-option')
export class FCListOption extends FormAssociated {
  static styles = mergeStyles(style)

  constructor() {
    super(createProxy())
  }

  @observer({ type: 'boolean', reflect: true })
  hidden = false

  connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('click', this.handleClick)
    this.addEventListener('blur', this.handleBlur)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.removeEventListener('click', this.handleClick)
    this.removeEventListener('blur', this.handleBlur)
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
    this.setAttribute('tabindex', String(Number(next) - 1))
    if (typeof old === 'boolean') {
      this.emit('select')
    }
    if (this.proxy instanceof HTMLInputElement) {
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
    // this.scrollIntoView({ block: 'nearest' })
  }

  get focused(): boolean {
    return this.hasAttribute('focused')
  }

  public get form(): HTMLFormElement | null {
    return this.closest('form')
  }

  public get index(): number {
    const { parentElement } = this
    if (parentElement) {
      return Array.from(parentElement.querySelectorAll('fc-list-option:not([hidden])')).findIndex(e => e === this)
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

  handleBlur(e: FocusEvent): void {
    this.toggleAttribute('focused', false)
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
