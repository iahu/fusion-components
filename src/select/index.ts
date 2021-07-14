import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { observer } from '../decorators'
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
    this.addEventListener('click', this.handleClick)
    this.addEventListener('focusout', this.handleFocusout)
    this.addEventListener('selection-change', this.handleSelect)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.removeEventListener('keydown', this.handleKeydown)
    this.removeEventListener('click', this.handleClick)
    this.removeEventListener('focusout', this.handleFocusout)
    this.removeEventListener('selection-change', this.handleSelect)
  }

  __hidden = true

  @observer({ reflect: true })
  role = 'listbox'

  public get hidden(): boolean {
    return this.__hidden
  }
  public set hidden(v: boolean) {
    this.__hidden = v
    this.setAttribute('aria-expanded', (!v).toString())
    this.requestUpdate()
  }

  handleSelect(e: Event): void {
    this.hidden = true
  }

  handleKeydown(e: KeyboardEvent): void {
    if (this.hidden && Object.values(this._HANDLED_KEYS).includes(e.key)) {
      e.preventDefault()
      this.hidden = false
    } else {
      super.handleKeydown(e)
    }
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

  handleClick(e: MouseEvent): void {
    this.hidden = !this.hidden
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
