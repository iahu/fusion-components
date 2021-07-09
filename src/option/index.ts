import { html, PropertyValues, TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { FC } from '../fusion-component'
import ListBox from '../listbox'
import mergeStyles from '../merge-styles'
import { after, before } from '../pattern/before-after'
import style from './style.css'

export const isOption = (el: Element): el is Option => {
  return el instanceof Option && el.role === 'option'
}

@customElement('fc-option')
export default class Option extends FC {
  static styles = mergeStyles(style)

  static get formAssociated(): boolean {
    return true
  }

  @property({ type: Boolean, reflect: true })
  hidden = false

  connectedCallback(): void {
    super.connectedCallback()
    this.selected = this.hasAttribute('selected')
    this.defaultSelected = this.selected
  }

  willUpdate(props: PropertyValues): void {
    super.willUpdate(props)

    this.setAttribute('aria-selected', this.selected.toString())
    this.classList.toggle('active', this.active)
    if (props.has('selected')) {
      if (props.get('selected') !== this.selected) {
        this.emit('selectionchange', this.selected)
      }
    }

    this.classList.toggle('selected', this.selected)
  }

  @property({ reflect: true })
  role = 'option'

  @property()
  value = ''

  focus(): void {
    this.classList.add('focused')
    this.classList.add('active')
  }

  blur(): void {
    this.classList.remove('focused')
    this.classList.remove('active')
  }

  public get form(): HTMLFormElement | null {
    return this.closest('form')
  }

  public get index(): number {
    const { parentElement } = this
    if (parentElement instanceof ListBox) {
      return parentElement.options.findIndex((e) => e === this)
    }
    return -1
  }

  public get text(): string {
    return this.getAttribute('label') || this.textContent || ''
  }

  @property({ type: Boolean })
  active = false

  public get selected(): boolean {
    return this.hasAttribute('selected')
  }
  public set selected(v: boolean) {
    this.toggleAttribute('selected', v)
    this.requestUpdate()
  }

  @property({ attribute: 'aria-selected' })
  ariaSelected = false

  defaultSelected = false

  @property({ type: Boolean, reflect: true })
  disabled = false

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
