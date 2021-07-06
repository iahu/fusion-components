import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators'
import mergeStyles from '../merge-styles'
import { after, before } from '../pattern/before-after'
import Select from '../select/index'
import selectStyle from '../select/style.css'
import style from './style.css'

@customElement('fc-combobox')
export default class ComboBox extends Select {
  static styles = mergeStyles(selectStyle, style)

  __inputValue = ''
  public get inputValue(): string {
    return this.value || this.__inputValue
  }
  public set inputValue(v: string) {
    this.__inputValue = v
  }

  handleLabelClick(e: MouseEvent): void {
    e.stopPropagation()
    const input = this.shadowRoot?.querySelector('.selected-value')
    if (input instanceof HTMLElement) input.focus()
  }

  handleFocus(): void {
    this.hidden = false
  }

  handleChange(e: Event): void {
    this.hidden = true
    const displayValue = (e.target as HTMLInputElement).value.trim()
    this.selectedIndex = this.options.findIndex((o) => o.text === displayValue)
  }

  handleInput(e: InputEvent): void {
    const displayValue = (e.target as HTMLInputElement).value
    this.inputValue = displayValue
    this.hidden = false
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
          <fc-input
            class="selected-value"
            part="selected-value"
            .value="${this.displayValue}"
            @input="${this.handleInput}"
            @change="${this.handleChange}"
            @focus="${this.handleFocus}"
          ></fc-input>
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
