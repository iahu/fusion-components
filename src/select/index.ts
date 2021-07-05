import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators'
import ListBox from '../listbox'
import mergeStyles from '../merge-styles'
import { after, before } from '../pattern/before-after'
import style from './style.css'

export enum POSTION {
  top = 'top',
  bottom = 'bottom',
}

type Position = keyof typeof POSTION

@customElement('fc-select')
export default class Select extends ListBox {
  static styles = mergeStyles(style)

  connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('keydown', this.handleKeydown)
    this.addEventListener('focusin', this.handleFocusin)
    this.addEventListener('focusout', this.handleFocusout)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.removeEventListener('keydown', this.handleKeydown)
    this.removeEventListener('focusin', this.handleFocusin)
    this.removeEventListener('focusout', this.handleFocusout)
  }

  __hidden = true

  public get hidden(): boolean {
    return this.__hidden
  }
  public set hidden(v: boolean) {
    this.__hidden = v
    this.setAttribute('aria-expanded', (!v).toString())
    // if (!v) {
    //   this.indicatedIndex = this.selectedIndex
    // }
    this.requestUpdate()
  }

  handleKeydown(e: KeyboardEvent): void {
    if (this.hidden) {
      e.preventDefault()
      this.hidden = false
      return
    }
    super.handleKeydown(e)
  }

  get position(): Position {
    const position = this.getAttribute('position') || ''
    if (Object.keys(POSTION).includes(position)) {
      return position as Position
    }

    const { top, height } = this.getBoundingClientRect()
    return top + height / 2 > window.innerHeight / 2 ? 'top' : 'bottom'
  }
  public set position(v: Position) {
    this.setAttribute('position', v)
    this.requestUpdate()
  }

  private tid?: NodeJS.Timeout

  handleFocusin(): void {
    this.hidden = false
  }

  handleFocusout(): void {
    this.hidden = true
  }

  render(): TemplateResult<1> {
    return html`
      <div class="control" id="control" part="control" role="comobox" aria-haspopup="listbox">
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
        ?has-options="${this.options.length > 0}"
        part="listbox"
        ?hidden=${this.hidden}
        role="listbox"
        ?disabled="${this.disabled}"
        position="${this.position}"
        style="--client-height: ${this.clientHeight}px"
      >
        <slot></slot>
        <slot name="empty">--空--</slot>
      </div>
    `
  }
}
