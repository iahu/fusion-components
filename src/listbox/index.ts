import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { assignedElements, observer } from '../decorators'
import FormAssociated from '../form-associated'
import { FCListOption, isOption } from '../list-option'
import mergeStyles from '../merge-styles'
import style from './style.css'

const createProxy = () => document.createElement('select')

@customElement('fc-listbox')
export class FCListBox extends FormAssociated {
  static styles = mergeStyles(style)

  constructor() {
    super(createProxy())
  }

  connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('keydown', this.handleKeydown)
    this.addEventListener('blur', this.handleBlur)
    this.addEventListener('select', this.handleSelect)
    this.setAttribute('aria-orientation', 'vertical')
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.removeEventListener('keydown', this.handleKeydown)
    this.removeEventListener('blur', this.handleBlur)
    this.removeEventListener('select', this.handleSelect)
  }

  @observer({ attribute: false })
  protected displayValue = ''

  @observer()
  disabled = false
  protected disabledChanged(): void {
    if (this.disabled) {
      this.updateComplete.then(() => {
        this.options.forEach(op => (op.disabled = true))
      })
    }
  }

  @observer({ reflect: true })
  role = 'listbox'

  @observer()
  value = this.getAttribute('value') ?? ''
  protected valueChanged(old: string, next: string): void {
    if (!this.selectable) {
      return
    }

    this.visibleOptions.find(op => op.select)?.select(false)
    const nextOption = this.visibleOptions.find(op => op.value === next)
    if (nextOption) {
      nextOption.select(true)
    }
  }

  @observer()
  selectable = true

  @observer({ reflect: true })
  tabindex = '0'

  public get visibleOptions(): FCListOption[] {
    return Array.from(this.children)
      .filter(isOption)
      .filter(o => !o.hidden)
  }
  public set visibleOptions(options: FCListOption[]) {
    this.innerHTML = ''
    options.forEach(op => this.appendChild(op))
  }

  @observer({ attribute: false })
  @assignedElements()
  options = [] as FCListOption[]

  public get length(): number {
    return this.visibleOptions.length
  }

  public set length(v: number) {
    this.options = this.options.slice(0, v)
  }

  getItem(index: number): FCListOption | undefined {
    return this.visibleOptions.find(o => o.index === index)
  }

  // 可以避免 value 相同时，设置 value 导致选择错乱的问题
  @observer({ attribute: false })
  selectedOption?: FCListOption
  protected selectedOptionChanged(old?: FCListOption, next?: FCListOption): void {
    if (old) {
      old.focusItem(false)
      old.select(false)
    }

    if (next) {
      this.value = next.value
      this.displayValue = next.text
      this.indicatedIndex = next.index
      next.focusItem(true)
    } else {
      this.value = ''
      this.displayValue = ''
      this.indicatedIndex = -1
    }

    this.emit('change')
  }

  @observer({ attribute: false })
  indicatedIndex = -1

  handleKeydown(e: KeyboardEvent): void {
    const withCtrl = e.metaKey || e.ctrlKey || e.altKey ? this.length : 0
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        this.focusNextOption(this.indicatedIndex, 1 + withCtrl)
        break
      case 'ArrowUp':
        e.preventDefault()
        this.focusNextOption(this.indicatedIndex, -1 - withCtrl)
        break
      case 'Enter':
        e.preventDefault()
        this.select(this.indicatedIndex)
        break
      case 'Escape':
        e.preventDefault()
        this.blur()
        break
    }
  }

  focusNextOption(start = this.indicatedIndex, delta = 1): void {
    const { visibleOptions, length } = this
    this.visibleOptions.forEach(op => op.focusItem(false))
    const nextIdx = (start + delta + length) % length
    const nextOption = visibleOptions[nextIdx]
    if (nextOption) {
      nextOption.focusItem(true)
      nextOption.scrollIntoView({ block: 'nearest' })
      this.indicatedIndex = nextOption.index
      if (nextOption !== this.selectedOption) {
        this.emit('selection-change')
      }
    }
  }

  select(index: number): void {
    const { selectedOption } = this
    const changed = index !== selectedOption?.index
    if (changed) {
      const selectedOption = this.getItem(index)
      this.selectedOption = selectedOption
      selectedOption?.select(true)
    }
  }

  handleBlur(): void {
    this.indicatedIndex = -1
  }

  handleSelect(event: Event): void {
    event.stopImmediatePropagation()
    const { target } = event
    if (!this.selectable) {
      return
    }

    if (target instanceof FCListOption && target.selected) {
      if (target !== this.selectedOption) {
        if (this.selectedOption) this.selectedOption.selected = false
        this.selectedOption = target
      }
      //  else {
      //   this.selectedOption = undefined
      // }
    }
  }

  render(): TemplateResult {
    return html`<slot></slot>`
  }
}
