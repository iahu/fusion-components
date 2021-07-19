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

    this.updateComplete.then(() => {
      // 校验子元素，并传递要继承的属性
      this.options?.forEach((option) => {
        // 只保留合法的 Option 元素
        if (!isOption(option)) {
          ;(option as HTMLElement).remove()
        }
      })
    })
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.removeEventListener('keydown', this.handleKeydown)
    this.removeEventListener('select', this.handleSelect)
    this.removeEventListener('blur', this.handleBlur)
  }

  @observer({ attribute: false })
  protected displayValue = ''

  @observer({ reflect: true })
  role = 'listbox'

  @observer()
  value = ''
  valueChanged(old: string, next: string): void {
    const mergedSelectedOption =
      Reflect.ownKeys(this).includes('__value') && this.selectedOption
        ? this.selectedOption
        : this.options.find((o) => o.getAttribute('value') === next)

    mergedSelectedOption?.select(true)
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
    this.options.forEach((o) => isOption(o) && this.appendChild(o))
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

  // 可以避免 value 相同时，设置 value 导致选择错乱的问题
  @observer({ attribute: false })
  selectedOption?: ListOption
  selectedOptionChanged(old: ListOption | null): void {
    if (old) {
      old.focusItem(false)
      old.select(false)
    }

    const { selectedOption } = this
    this.value = selectedOption?.value ?? ''
    this.displayValue = selectedOption?.text || ''
    this.indicatedIndex = selectedOption?.index ?? -1
    selectedOption?.focusItem(true)
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
        this.select(e.target.index)
      }
    }
  }

  focusNextOption(start = this.indicatedIndex, step = 1): void {
    const { visibleOptions } = this
    this.selectedOption?.focusItem(false)
    const nextOption = visibleOptions[start + step]
    nextOption?.focusItem(true)
    this.indicatedIndex = nextOption?.index ?? this.indicatedIndex
    if (nextOption !== this.selectedOption) {
      this.emit('selection-change')
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
    this.getItem(this.indicatedIndex)?.focusItem(false)
    this.indicatedIndex = -1
  }

  render(): TemplateResult<1> {
    return html`<slot></slot>`
  }
}
