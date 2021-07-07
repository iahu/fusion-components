import { html, PropertyValues, TemplateResult } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import mergeStyles from '../merge-styles'
import Option from '../option'
import { after, before } from '../pattern/before-after'
import Select from '../select/index'
import selectStyle from '../select/style.css'
import style from './style.css'

@customElement('fc-combobox')
export default class ComboBox extends Select {
  static styles = mergeStyles(selectStyle, style)

  @property({ reflect: true })
  role = 'comobox'

  @property()
  autocomplete = ''

  @property({ type: Boolean })
  casesensitive = false

  connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('select', this.handleSelect)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.removeEventListener('select', this.handleSelect)
  }

  willUpdate(p: PropertyValues<this>): void {
    super.willUpdate(p)
    if (this.autocomplete) {
      this.filter(this.inputValue)
    }
  }

  caseCompaire(a: string, b: string): boolean {
    return this.translateCase(a) == this.translateCase(b)
  }

  translateCase(v: string): string {
    return this.casesensitive ? v : v.toLowerCase()
  }

  public get allOptions(): Option[] {
    return Array.from(this.querySelectorAll('fc-option'))
  }

  filter(text: string): Option[] {
    return this.allOptions.filter((o) => {
      o.hidden = text !== '' && !this.translateCase(o.text).startsWith(this.translateCase(text))
      return !o.hidden
    })
  }

  protected get input(): HTMLInputElement | null | undefined {
    return this.shadowRoot?.querySelector('.selected-value')
  }

  @state()
  inputValue = ''

  handleLabelClick(e: MouseEvent): void {
    e.stopPropagation()
    const input = this.shadowRoot?.querySelector('.selected-value')
    if (input instanceof HTMLElement) input.focus()
  }

  handleFocus(): void {
    this.hidden = false
  }

  handleSelect(e: Event): void {
    if (e instanceof CustomEvent && e.detail) {
      this.hidden = true
    }
    if (this.displayValue) {
      this.inputValue = this.displayValue
    }
  }

  handleInputChange(): void {
    this.hidden = true
    const { inputValue } = this
    this.selectedIndex = this.options.findIndex((o) => this.caseCompaire(o.text, inputValue.trim()))
  }

  handleInput(e: InputEvent): void {
    e.stopPropagation()
    this.hidden = false
    const { value } = e.target as HTMLInputElement
    const prevInputValue = this.inputValue
    this.inputValue = value
    if (prevInputValue.trim() !== value.trim() && this.selectedIndex >= 0) {
      this.selectedIndex = -1
    }
  }

  render(): TemplateResult<1> {
    return html`
      <label
        for="input"
        class="control"
        id="control"
        part="control"
        role="comobox"
        aria-haspopup="listbox"
        @click="${this.handleLabelClick}"
      >
        ${before()}
        <slot name="button-container">
          <input
            class="selected-value"
            part="selected-value"
            .value="${this.inputValue}"
            @input="${this.handleInput}"
            @change="${this.handleInputChange}"
            @focus="${this.handleFocus}"
          ></input>
          <div class="indicator" part="indicator">
            <slot name="indicator">
              <svg
                class="select-indicator"
                part="select-indicator"
                viewBox="0 0 12 7"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.85.65c.2.2.2.5 0 .7L6.4 6.84a.55.55 0 01-.78 0L.14 1.35a.5.5 0 11.71-.7L6 5.8 11.15.65c.2-.2.5-.2.7 0z"
                />
              </svg>
            </slot>
          </div>
        </slot>
        ${after()}
      </label>
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
