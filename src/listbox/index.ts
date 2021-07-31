import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { observer } from '../decorators'
import FormAssociated from '../form-associated'
import mergeStyles from '../merge-styles'
import { FCListOption, isOption } from '../list-option'
import style from './style.css'
import assignedElements from '../decorators/assigned-elements'
import { focusable } from '../helper'

@customElement('fc-listbox')
export class FCListBox extends FormAssociated {
  static styles = mergeStyles(style)

  connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('keydown', this.handleKeydown)
    this.addEventListener('click', this.handleClick)
    this.addEventListener('blur', this.handleBlur)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.removeEventListener('keydown', this.handleKeydown)
    this.removeEventListener('click', this.handleClick)
    this.removeEventListener('blur', this.handleBlur)
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
  value = this.getAttribute('value') || ''
  protected valueChanged(old: string, next: string): void {
    if (!this.selectable) {
      return
    }

    this.updateComplete.then(() => {
      this.visibleOptions.find(op => op.select)?.select(false)
      const nextOption = this.visibleOptions.find(op => op.value === next)
      if (nextOption) {
        nextOption.select(true)
        this.selectedOption = nextOption
      }
    })
  }

  @observer()
  selectable = true
  selectableChanged(old: boolean, next: boolean): void {
    this.updateComplete.then(() => {
      if (!this.selectable) {
        this.options.forEach(op => (op.selectable = false))
      }
    })
  }

  @observer({ reflect: true })
  tabIndex = -1

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

  @observer({
    attribute: false,
    converter(v: number, host: FCListBox) {
      return host.visibleOptions.length
    },
  })
  length = this.visibleOptions.length
  protected lengthChanged(): void {
    this.options = this.options.slice(0, this.length)
  }

  getItem(index: number): FCListOption | undefined {
    return this.visibleOptions.find(o => o.index === index)
  }

  // 可以避免 value 相同时，设置 value 导致选择错乱的问题
  @observer({ attribute: false })
  selectedOption?: FCListOption
  protected selectedOptionChanged(old: FCListOption | undefined, next: FCListOption | undefined): void {
    if (old) {
      old.focusItem(false)
      old.select(false)
    }
    // 没有 next 就清空
    const { selectedOption } = this
    this.value = selectedOption?.value ?? ''
    this.displayValue = selectedOption?.text || ''
    this.indicatedIndex = selectedOption?.index ?? -1
    selectedOption?.focusItem(true)
  }

  @observer({ attribute: false })
  indicatedIndex = -1

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

  handleClick(e: MouseEvent): void {
    const { srcElement } = e
    if (srcElement instanceof FCListOption) {
      if (focusable(srcElement) && srcElement.selected) {
        this.selectedOption = srcElement
      }
    }
  }

  focusNextOption(start = this.indicatedIndex, step = 1): void {
    const { visibleOptions, length } = this
    this.visibleOptions.forEach(op => op.focusItem(false))
    const nextIdx = (start + step + length) % length
    const nextOption = visibleOptions[nextIdx]
    if (nextOption) {
      nextOption.focusItem(true)
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

  render(): TemplateResult {
    return html`<slot></slot>`
  }
}
