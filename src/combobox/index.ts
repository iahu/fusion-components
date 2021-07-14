import { html, PropertyValues, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { observer } from '../decorators'
import ListOption, { isOption } from '../list-option'
import mergeStyles from '../merge-styles'
import { after, before } from '../pattern/before-after'
import Select from '../select/index'
import selectStyle from '../select/style.css'
import style from './style.css'

@customElement('fc-combobox')
export default class ComboBox extends Select {
  static styles = mergeStyles(selectStyle, style)

  @observer({ reflect: true })
  role = 'comobox'

  @observer()
  autocomplete = ''

  @observer({ type: 'boolean' })
  casesensitive = false

  connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('select', this.handleSelect)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.removeEventListener('select', this.handleSelect)
  }

  caseCompaire(a: string, b: string): boolean {
    return this.translateCase(a) == this.translateCase(b)
  }

  translateCase(v: string): string {
    return this.casesensitive ? v : v.toLowerCase()
  }

  filterOptions(text: string): void {
    let someMatched = false
    this.options.forEach((o) => {
      const matched = text === '' || this.translateCase(o.text).startsWith(this.translateCase(text))
      o.hidden = !matched
      if (matched && text === o.text) {
        this.selectedOption = o
        someMatched = true
      }
    })
    if (!someMatched) {
      this.selectedOption = undefined
    }
  }

  protected get input(): HTMLInputElement | null | undefined {
    return this.shadowRoot?.querySelector('.selected-value')
  }

  @observer({ attribute: false })
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
    const { srcElement } = e
    if (srcElement instanceof HTMLElement && isOption(srcElement) && srcElement.selected) {
      this.hidden = true
      this.inputValue = srcElement.text
      this.value = srcElement.value
    }
  }

  handleInputChange(): void {
    this.hidden = true
    const { inputValue } = this
    this.selectedOption = this.options.find((o) => this.caseCompaire(o.text, inputValue.trim()))
  }

  handleInput(e: InputEvent): void {
    e.stopPropagation()
    this.hidden = false
    const { value } = e.target as HTMLInputElement
    this.filterOptions(value.trim())
    // const prevInputValue = this.inputValue
    // this.inputValue = value
    // if (prevInputValue.trim() !== value.trim() && this.selectedOption) {
    //   this.selectedOption = undefined
    // }
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
