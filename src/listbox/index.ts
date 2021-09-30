import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { assignedElements, observer } from '../decorators'
import FormAssociated from '../form-associated'
import { onEvent, toggleTabIndex } from '../helper'
import { FCListOption, isOption } from '../list-option'
import mergeStyles from '../merge-styles'
import style from './style.css'

const createProxy = () => document.createElement('select')
const match = (op: FCListOption, text: string) => op.text.toLowerCase().startsWith(text)

@customElement('fc-listbox')
export class FCListBox extends FormAssociated {
  static styles = mergeStyles(style)

  constructor() {
    super(createProxy())
  }

  connectedCallback(): void {
    super.connectedCallback()
    onEvent(this, 'keydown', this.handleKeydown)
    onEvent(this, 'select', this.handleSelect)
    this.setAttribute('aria-orientation', 'vertical')
  }

  @observer({ attribute: false, init: false, type: 'string' })
  protected displayValue?: string

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

  @observer({ initCallback: true })
  value = this.getAttribute('value') ?? ''
  valueChanged(old: string, next: string): void {
    if (!this.selectable || (!this.hasAttribute('value') && !next)) {
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
  @observer({ attribute: false, initCallback: true })
  selectedOption?: FCListOption
  selectedOptionChanged(old?: FCListOption, next?: FCListOption): void {
    if (old) {
      old.focusItem(false)
      old.select(false)
    }

    if (next) {
      this.value = next.value
      this.displayValue = next.text
      next.focusItem(true)
    } else {
      this.value = ''
      this.displayValue = undefined
    }

    this.emit('change', { old, next })
  }

  handleKeydown(e: KeyboardEvent): void {
    const withCtrl = e.metaKey || e.ctrlKey || e.altKey ? this.length : 0
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        this.focusNextOption(1 + withCtrl)
        break
      case 'ArrowUp':
        e.preventDefault()
        this.focusNextOption(-1 - withCtrl)
        break
      case 'Enter':
        e.preventDefault()
        if (this.focusedItem instanceof FCListOption) {
          e.preventDefault()
          this.select(this.focusedItem)
        }
        break
      case 'Escape':
        e.preventDefault()
        this.blur()
        break
      default:
        this.gotoMatch(e)
    }
  }

  focusNextOption(delta = 1): void {
    const focusedTarget = toggleTabIndex(this.visibleOptions, delta, true)
    if (focusedTarget) {
      this.visibleOptions.forEach(e => e.removeAttribute('focused'))
      focusedTarget.toggleAttribute('focused', true)
      focusedTarget.scrollIntoView({ block: 'nearest' })
    }
  }

  select(target: FCListOption): void {
    const { selectedOption } = this
    const changed = target !== selectedOption
    if (changed) {
      this.selectedOption = target
      target.select(true)
    }
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

  private matchedText = ''

  private get focusedItem() {
    return this.visibleOptions.find(op => op.hasAttribute('focused'))
  }

  gotoMatch(e: KeyboardEvent): void {
    const key = e.key.toLocaleLowerCase()
    if (!(key.length === 1 && key >= 'a' && key <= 'z')) return
    const accText = this.matchedText + key
    let deepMatch = false
    const { visibleOptions, selectedOption } = this
    if (selectedOption) {
      deepMatch = match(selectedOption, accText)

      if (!deepMatch) {
        // deep first
        const otherDeepMatch = visibleOptions.find(op => match(op, accText))
        const otherMatch = otherDeepMatch || visibleOptions.filter(x => x !== selectedOption).find(op => match(op, key))
        if (otherMatch) {
          this.selectedOption = otherMatch
          this.matchedText = key
          return
        }
      }
    }

    if (!deepMatch) {
      const matched = this.visibleOptions.find(op => match(op, key))
      if (matched) {
        e.preventDefault()
        this.selectedOption = matched
        this.matchedText = key
      } else {
        this.matchedText = ''
        this.selectedOption = undefined
      }
    } else {
      this.matchedText += key
    }
  }

  render(): TemplateResult {
    return html`<slot></slot>`
  }
}
