import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { observer } from '../decorators'
import { onEvent, removeCSSText, setCSSText } from '../helper'
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
    onEvent(this, 'focusout', this.handleFocusout)
    onEvent(this, 'click', this.handleClick)
  }

  displayValueChanged(old: string | undefined, next: string): void {
    if (typeof old === 'string') {
      this.open = false
    }
  }

  @observer({ reflect: true })
  role = 'listbox'

  @observer({ reflect: true })
  tabindex = '0'

  valueChanged(old: string, next: string): void {
    if (!this.selectable) {
      return
    }

    super.valueChanged?.(old, next)
    this.visibleOptions.find(op => op.select)?.select(false)
    const nextOption = this.visibleOptions.find(op => op.value === next)
    if (nextOption) {
      nextOption.select(true)
    }
    this.emit('change', { old, next })
  }

  @observer({ reflect: true, initCallback: true })
  open = this.hasAttribute('open')
  openChanged(old: boolean, next: boolean): void {
    this.setAttribute('aria-expanded', String(next))
    if (next) {
      this.focus()
      setCSSText(this, { '--client-height': `${this.clientHeight}px` })
      this.updateComplete.then(() => {
        this.selectedOption?.scrollIntoView({ block: 'nearest' })
      })
    } else {
      removeCSSText(this, '--client-height')
    }
  }

  @observer()
  placeholder = '请选择'

  handleKeydown(e: KeyboardEvent): void {
    if (!this.open && ['ArrowDown', 'ArrowUp', 'Enter'].includes(e.key)) {
      e.preventDefault()
      this.open = true
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

  handleClick(e: MouseEvent): void {
    if (!this.disabled) {
      this.open = !this.open
    }
  }

  handleClickControl(e: MouseEvent): void {
    e.preventDefault()
    if (!this.disabled) {
      this.open = !this.open
    }
  }

  handleFocusout(e: FocusEvent): void {
    const { relatedTarget } = e
    if (!(relatedTarget instanceof Node && this.contains(relatedTarget))) {
      this.open = false
    }
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
          <div class="selected-value" part="selected-value">
            ${this.displayValue ?? html`<slot name="placeholder" part="placeholder">${this.placeholder}</slot>`}
          </div>
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
        ?hidden=${!this.open}
        role="listbox"
        ?disabled="${this.disabled}"
        position="${this.position}"
        tabindex="${this.open ? '0' : ''}"
      >
        <slot></slot>
        ${this.length === 0 ? html`<slot name="empty">--空--</slot>` : null}
      </div>
    `
  }
}
