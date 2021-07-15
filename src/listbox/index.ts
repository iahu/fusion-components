import { html, TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { observer } from '../decorators'
import FormAssociated from '../form-associated'
import mergeStyles from '../merge-styles'
import ListOption, { isOption } from '../list-option'
import style from './style.css'

@customElement('fc-listbox')
export default class ListBox extends FormAssociated {
  static styles = mergeStyles(style)

  connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('keydown', this.handleKeydown)
    this.addEventListener('select', this.handleSelect)
    this.addEventListener('blur', this.handleBlur)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.removeEventListener('keydown', this.handleKeydown)
    this.removeEventListener('select', this.handleSelect)
    this.removeEventListener('blur', this.handleBlur)
  }

  updated(): void {
    const isSharp = this.hasAttribute('sharp')
    const isDisabled = this.hasAttribute('disabled')
    // 校验子元素，并传递要继承的属性
    this.options?.forEach((option) => {
      // 只保留合法的 Option 元素
      if (!isOption(option)) return (option as HTMLElement).remove()
      if (isSharp) option.toggleAttribute('sharp', isSharp)
      if (isDisabled) option.disabled = true
    })
  }

  @observer({ attribute: false })
  protected displayValue = ''

  @observer({ reflect: true })
  role = 'listbox'

  @observer()
  value = ''
  valueChanged(): void {
    const { value, selectedOption } = this
    if (value) {
      const mergedSelectedOption = selectedOption ?? this.options.find((o) => o.value === value)
      mergedSelectedOption?.select(true)
    } else {
      selectedOption?.select(false)
      selectedOption?.focusItem(false)
    }
  }

  @property({ reflect: true })
  tabindex = '0'

  public get visibleOptions(): ListOption[] {
    return Array.from(this.children)
      .filter(isOption)
      .filter((o) => !o.hidden)
  }
  public set visibleOptions(options: ListOption[]) {
    this.innerHTML = ''
    options.forEach((op) => this.appendChild(op))
  }

  @observer({
    attribute: false,
    converter(op: ListOption[], host: ListBox) {
      return Array.from(host.children)
        .filter(isOption)
        .map((e) => e.cloneNode(true) as ListOption)
    },
  })
  options = [] as ListOption[]
  optionsChanged(): void {
    this.innerHTML = ''
    this.options.forEach((o) => this.appendChild(o))
  }

  @observer({
    attribute: false,
    converter(v: number, host: ListBox) {
      return host.options.length
    },
  })
  length = this.options.length
  lengthChanged(): void {
    this.options = this.options.slice(0, this.length)
  }

  getItem(index: number): ListOption | undefined {
    return this.visibleOptions.find((o) => o.index === index)
  }

  @observer({ attribute: false })
  selectedOption = this.options.find((o) => !o.disabled && this.hasAttribute('value') && o.value === this.value)
  selectedOptionChanged(old: ListOption | null): void {
    if (old) {
      old.focusItem(false)
      old.select(false)
    }

    this.value = this.selectedOption?.value ?? ''
    this.indicatedIndex = this.selectedOption?.index ?? -1
  }

  @observer({ attribute: false })
  indicatedIndex = -1
  indicatedIndexChanged(): void {
    const indicatedIndex = this.indicatedIndex
    const mergedIndex = Math.max(-1, Math.min(indicatedIndex, this.length - 1))
    if (mergedIndex === -1) {
      this.getItem(this.indicatedIndex)?.focusItem(false)
      return
    }
    if (mergedIndex !== indicatedIndex) {
      Reflect.set(this, '__indicatedIndex', mergedIndex)
      return
    }
    this.options.forEach((o) => {
      if (o.index === indicatedIndex) {
        o.focusItem(true)
        o.scrollIntoView({ block: 'nearest' })
      } else {
        o.focusItem(false)
      }
    })
  }

  public get _HANDLED_KEYS(): Record<string, string> {
    return { ArrowDown: 'ArrowDown', ArrowUp: 'ArrowUp', Enter: 'Enter' }
  }

  handleKeydown(e: KeyboardEvent): void {
    const { _HANDLED_KEYS } = this

    if (!Object.values<string>(_HANDLED_KEYS).includes(e.key)) {
      return
    }

    const withCtrl = e.metaKey || e.ctrlKey || e.altKey ? this.length : 0
    switch (e.key) {
      case _HANDLED_KEYS.ArrowDown:
        e.preventDefault()
        this.focusNextOption(this.indicatedIndex, 1 + withCtrl)
        break
      case _HANDLED_KEYS.ArrowUp:
        e.preventDefault()
        this.focusNextOption(this.indicatedIndex, -1 - withCtrl)
        break
      case _HANDLED_KEYS.Enter:
        e.preventDefault()
        this.select(this.indicatedIndex)
        break
    }
  }

  handleSelect(e: Event): void {
    if (e.target instanceof ListOption) {
      if (e.target.hasAttribute('selected')) {
        this.selectedOption?.focusItem(false)
        this.selectedOption = e.target
      }
    }
  }

  focusNextOption(start = this.indicatedIndex, step = 1): void {
    const { visibleOptions } = this
    this.selectedOption?.focusItem(false)
    const nextOption = visibleOptions[start + step]
    nextOption?.focusItem(true)
    this.indicatedIndex = nextOption?.index ?? this.indicatedIndex
    this.emit('selection-change')
  }

  select(index: number): void {
    const { displayValue } = this
    const targetItem = this.getItem(index)
    const changed = targetItem?.text !== displayValue
    if (changed) {
      const selectedOption = targetItem
      this.selectedOption = selectedOption
      selectedOption?.select(true)
    }
  }

  handleBlur(): void {
    this.getItem(this.indicatedIndex)?.focusItem(false)
    this.indicatedIndex = -1
  }

  render(): TemplateResult<1> {
    return html`<slot></slot>`
  }
}
