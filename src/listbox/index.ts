import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { observer, assignedElements } from '../decorators'
import FormAssociated from '../form-associated'
import mergeStyles from '../merge-styles'
import { FCListOption, isOption } from '../list-option'
import style from './style.css'
import { focusable } from '../helper'

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
  value = this.getAttribute('value') ?? ''
  protected valueChanged(old: string, next: string): void {
    if (!this.selectable) {
      return
    }

    this.visibleOptions.find(op => op.select)?.select(false)
    const nextOption = this.visibleOptions.find(op => op.value === next)
    if (nextOption) {
      nextOption.select(true)
      this.selectedOption = nextOption
    }
  }

  @observer()
  selectable = true
  selectableChanged(old: boolean, next: boolean): void {
    this.updateComplete.then(() => {
      if (!next) {
        this.options.forEach(op => (op.selectable = false))
      }
    })
  }

  @observer({ reflect: true })
  tabindex = '-1'

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

    // 没有 next 就清空
    this.value = next?.value ?? ''
    this.displayValue = next?.text || ''
    this.indicatedIndex = next?.index ?? -1
    next?.focusItem(true)
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

  handleClick(e: MouseEvent): void {
    const { target } = e
    if (target instanceof FCListOption) {
      if (focusable(target) && target.selected) {
        this.selectedOption = target
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
