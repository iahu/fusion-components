import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { observer } from '../decorators'
import { FC } from '../fusion-component'
import { FCListBox } from '../listbox'
import mergeStyles from '../merge-styles'
import { after, before } from '../pattern/before-after'
import style from './style.css'

export const isOption = (el: Element): el is FCListOption =>
  el.tagName.toLowerCase() === 'fc-list-option' || el instanceof FCListOption

@customElement('fc-list-option')
export class FCListOption extends FC {
  static styles = mergeStyles(style)

  static get formAssociated(): boolean {
    return true
  }

  @observer({ type: 'boolean', reflect: true })
  hidden = false

  connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('click', this.handleClick)
  }
  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.removeEventListener('click', this.handleClick)
  }

  @observer({ reflect: true })
  role = 'option'

  @observer()
  value = ''

  // 不能真的获取焦点，因为在 comobox 下，焦点应该在输入框上
  focusItem(focused = true): void {
    this.classList.toggle('focused', focused)
    this.classList.toggle('active', focused)
  }

  public get form(): HTMLFormElement | null {
    return this.closest('form')
  }

  public get index(): number {
    const { parentElement } = this
    // index 只与 ListBox 绑定
    if (parentElement instanceof FCListBox) {
      return parentElement.visibleOptions.findIndex(e => e === this)
    }
    return -1
  }

  public get text(): string {
    return this.getAttribute('label') || this.textContent || ''
  }

  @observer({ type: 'boolean', reflect: true })
  selected = false
  protected selectedChanged(): void {
    this.emit('select')
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

  handleClick(e: MouseEvent): void {
    e.preventDefault()
    e.stopPropagation()
    this.selected = !this.selected
  }

  render(): TemplateResult<1> {
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
        <slot></slot>
      </span>
      ${after()}
    </div>`
  }
}
