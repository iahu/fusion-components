import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { observer } from '../decorators'
import { removeCSSText, setCSSText } from '../helper'
import { FCListBox } from '../listbox'
import mergeStyles from '../merge-styles'
import { after, before } from '../pattern/before-after'
import style from './style.css'

export enum POSTION {
  top = 'top',
  bottom = 'bottom',
}

type Position = keyof typeof POSTION

@customElement('fc-select')
export class FCSelect extends FCListBox {
  static styles = mergeStyles(style)

  connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('focusout', this.handleFocusout)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.removeEventListener('focusout', this.handleFocusout)
  }

  @observer()
  displayValue = ''
  private displayValueChanged(): void {
    this.opened = false
  }

  @observer({ reflect: true })
  role = 'listbox'

  @observer({ reflect: true })
  tabindex = '0'

  valueChanged(old: string, next: string): void {
    super.valueChanged(old, next)
    this.emit('input')
    this.emit('change')
  }

  @observer({ reflect: true })
  opened = false
  protected openedChanged(): void {
    if (this.opened) {
      setCSSText(this, { '--client-height': `${this.clientHeight}px` })
      this.updateComplete.then(() => {
        this.selectedOption?.scrollIntoView({ block: 'nearest' })
      })
    } else {
      removeCSSText(this, '--client-height')
    }
  }

  handleKeydown(e: KeyboardEvent): void {
    if (!this.opened && ['ArrowDown', 'ArrowUp', 'Enter'].includes(e.key)) {
      e.preventDefault()
      this.opened = true
    } else {
      super.handleKeydown(e)
    }
  }

  @observer({ reflect: true })
  outline = true

  @observer<FCSelect, string>({
    converter(pos, host) {
      const position = host.getAttribute('position') || ''
      if (Object.keys(POSTION).includes(position)) {
        return position as Position
      }

      const { top, height } = host.getBoundingClientRect()
      return top + height / 2 > window.innerHeight / 2 ? 'top' : 'bottom'
    },
  })
  position = 'bottom'

  handleClickControl(e: MouseEvent): void {
    e.preventDefault()
    if (!this.disabled) {
      this.opened = !this.opened
    }
  }

  handleFocusout(): void {
    this.opened = false
  }

  render(): TemplateResult {
    return html`
      <div
        class="control"
        id="control"
        part="control"
        role="comobox"
        aria-haspopup="listbox"
        @click="${this.handleClickControl}"
        disabled="${this.disabled}"
      >
        ${before()}
        <slot name="button-container">
          <div class="selected-value" part="selected-value">${this.displayValue}</div>
          <div class="indicator" part="indicator">
            <slot name="indicator">
              <svg class="icon-indicator" part="icon-indicator" viewBox="0 0 12 7" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M11.85.65c.2.2.2.5 0 .7L6.4 6.84a.55.55 0 01-.78 0L.14 1.35a.5.5 0 11.71-.7L6 5.8 11.15.65c.2-.2.5-.2.7 0z"
                />
              </svg>
            </slot>
          </div>
        </slot>
        ${after()}
      </div>
      <div
        class="listbox"
        ?has-options="${this.length > 0}"
        part="listbox"
        ?hidden=${!this.opened}
        role="listbox"
        ?disabled="${this.disabled}"
        position="${this.position}"
        tabindex="${this.opened ? '0' : ''}"
      >
        <slot></slot>
        ${this.length === 0 ? html`<slot name="empty">--空--</slot>` : null}
      </div>
    `
  }
}
