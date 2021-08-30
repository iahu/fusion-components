import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { createRef, Ref, ref } from 'lit/directives/ref.js'
import { observer } from '../decorators'
import { FCListOption, isOption } from '../list-option'
import mergeStyles from '../merge-styles'
import { after, before } from '../pattern/before-after'
import { FCSelect } from '../select/index'
import selectStyle from '../select/style.css'
import style from './style.css'

@customElement('fc-combobox')
export class FCComboBox extends FCSelect {
  static styles = mergeStyles(selectStyle, style)

  inputRef: Ref<HTMLInputElement> = createRef()

  @observer({ reflect: true })
  role = 'combobox'

  @observer()
  autocomplete = ''

  @observer({ type: 'boolean' })
  casesensitive = false

  @observer()
  placeholder = ''

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
    this.options.forEach(o => {
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

  get input(): HTMLInputElement | null | undefined {
    return this.shadowRoot?.querySelector('.selected-value')
  }

  selectedOptionChanged(old: FCListOption, next: FCListOption): void {
    super.selectedOptionChanged(old, next)

    if (next) {
      this.inputValue = next.text
    }
  }

  valueChanged(old: string, next: string): void {
    if (!this.selectable) {
      return
    }

    this.updateComplete.then(() => {
      this.visibleOptions.find(op => op.select)?.select(false)
      const nextOption = this.options.find(op => op.value === next)

      if (nextOption) {
        nextOption.select(true)
        this.selectedOption = nextOption
      }
    })
  }

  @observer({ attribute: false })
  inputValue = this.getAttribute('value') ?? ''
  inputValueChanged(old: string, next: string): void {
    if (old) {
      this.filterOptions(next)
    } else {
      this.updateComplete.then(() => this.filterOptions(next))
    }
  }

  handleLabelClick(e: MouseEvent): void {
    e.stopPropagation()
    const input = this.shadowRoot?.querySelector('.selected-value')
    if (input instanceof HTMLElement) input.focus()
  }

  handleFocus(): void {
    this.opened = true
  }

  handleSelect(e: Event): void {
    if (!this.selectable || this.disabled) return
    const { target } = e
    if (target instanceof HTMLElement && isOption(target) && target.selected) {
      this.opened = false
      this.inputValue = target.text
      this.value = target.value
    }
  }

  handleInputChange(): void {
    this.opened = false
    const inputValue = (this.input as HTMLInputElement).value
    this.filterOptions(inputValue)
    this.selectedOption = this.visibleOptions.find(o => this.caseCompaire(o.text, inputValue.trim()))
  }

  handleInput(e: InputEvent): void {
    e.stopPropagation()
    this.opened = true
    const { value } = e.target as HTMLInputElement
    this.selectedOption = undefined
    this.inputValue = value.trim()
    this.filterOptions(value.trim())
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
            placeholder="${this.placeholder}"
            ${ref(this.inputRef)}
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
        ?has-options="${this.length > 0}"
        part="listbox"
        role="listbox"
        ?disabled="${this.disabled}"
        position="${this.position}"
        tabindex="${this.opened ? '0' : ''}"
      >
        <slot></slot>
        <slot name="empty">--空--</slot>
      </div>
    `
  }
}
