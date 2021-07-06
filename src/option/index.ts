import { html, PropertyValues, TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators'
import { FC } from '../fusion-component'
import mergeStyles from '../merge-styles'
import { after, before } from '../pattern/before-after'
import style from './style.css'

import '../icon/index'

export const isOption = (el: Element): boolean => {
  return el instanceof Option && el.getAttribute('role') === 'option'
}

@customElement('fc-option')
export default class Option extends FC {
  static styles = mergeStyles(style)

  static get formAssociated(): boolean {
    return true
  }

  connectedCallback(): void {
    super.connectedCallback()
    this.setAttribute('role', 'option')
    this.defaultSelected = this.hasAttribute('selected')
  }

  willUpdate(props: PropertyValues): void {
    if (this.disabled) {
      this.selected = false
    } else if (props.has('selected')) {
      if (props.get('selected') !== this.selected) {
        this.emit('selectionchange', this.selected)
      }
    }

    this.classList.toggle('selected', this.selected)
  }

  @property({ reflect: true, type: String })
  role = 'option'

  @property()
  value = ''

  public get form(): HTMLFormElement | null {
    return this.closest('form')
  }

  public get index(): number {
    return Array.from(this.parentElement?.children || []).findIndex((e) => e === this)
  }

  public get text(): string {
    return this.getAttribute('label') || this.textContent || ''
  }

  @property({ type: Boolean })
  selected = false

  @property({ attribute: 'aria-selected' })
  ariaSelected = false

  defaultSelected = false

  @property({ type: Boolean, reflect: true })
  disabled = false

  render(): TemplateResult<1> {
    const defaultIcon = html` <fc-icon>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 42 29"
        width="42"
        height="29"
        fill="#999"
        xmlns:v="https://vecta.io/nano"
      >
        <path
          d="M14.718 29c-.583 0-1.166-.211-1.609-.628L.668 16.662c-.891-.838-.891-2.195 0-3.033a2.38 2.38 0 0 1 3.222 0l12.442 11.715c.891.838.891 2.195 0 3.033a2.36 2.36 0 0 1-1.613.623h0z"
        />
        <path
          d="M15.242 29c-.574 0-1.148-.22-1.584-.657-.877-.877-.877-2.297 0-3.174L38.169.658c.877-.877 2.296-.877 3.173 0s.877 2.297 0 3.174L16.831 28.343c-.441.441-1.015.657-1.589.657z"
        />
      </svg>
    </fc-icon>`

    return html`<div class="control" part="control" role="option" ?foucsed="${this.getAttribute('foucsed')}">
      ${before()}
      <span class="icon">
        <slot name="icon">${this.selected ? defaultIcon : ''}</slot>
      </span>
      <span class="content">
        <slot></slot>
      </span>
      ${after()}
    </div>`
  }
}
