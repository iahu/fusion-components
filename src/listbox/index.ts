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

    this.updateComplete.then(() => {
      const isSharp = this.hasAttribute('sharp')
      const isDisabled = this.hasAttribute('disabled')
      // 校验子元素，并传递要继承的属性
      this.options?.forEach((option) => {
        // 只保留合法的 Option 元素
        if (!isOption(option)) return (option as HTMLElement).remove()
        if (isSharp) option.toggleAttribute('sharp', isSharp)
        if (isDisabled) option.disabled = true
      })
    })
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

  @observer({ attribute: false })
  options = Array.from(this.children).filter(isOption)
  optionsChanged(): void {
    this.innerHTML = ''
    this.options.forEach((o) => this.appendChild(o))
    this.requestUpdate()
  }

  @observer({ attribute: false })
  length = this.options.length
  lengthChanged(): void {
    this.options = this.options.slice(0, this.length)
  }

  @observer({ attribute: false })
  selectedOption = this.options.find((o) => !o.disabled && o.value === this.value)
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
    const mergedIndex = Math.max(0, Math.min(indicatedIndex, this.length - 1))
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
    return {
      ArrowDown: 'ArrowDown',
      ArrowUp: 'ArrowUp',
      Enter: 'Enter',
      Space: this.role === 'listbox' ? ' ' : 'Enter',
    }
  }

  handleKeydown(e: KeyboardEvent): void {
    const { _HANDLED_KEYS } = this

    if (!Object.values<string>(_HANDLED_KEYS).includes(e.key)) {
      return
    }

    e.preventDefault()
    const withCtrl = e.metaKey || e.ctrlKey || e.altKey ? this.length : 0
    switch (e.key) {
      case _HANDLED_KEYS.ArrowDown:
        this.indicatedIndex += 1 + withCtrl
        this.emit('selection-change')
        break
      case _HANDLED_KEYS.ArrowUp:
        this.indicatedIndex -= 1 + withCtrl
        this.emit('selection-change')
        break
      case _HANDLED_KEYS.Space:
      case _HANDLED_KEYS.Enter: {
        const { displayValue, indicatedIndex } = this
        const changed = this.options[indicatedIndex]?.text !== displayValue
        if (changed) {
          const selectedOption = this.options[indicatedIndex]
          this.selectedOption = selectedOption
          selectedOption.select(true)
        }
        // list-option 已经触发了 select 事件
        // this.emit('select', changed)
        break
      }
      default:
        // 其它按键不处理，并中断后面的逻辑
        return
    }

    // 如果新指向的 option 不可用，按规则换一个
    if (this.options[this.indicatedIndex]?.disabled) {
      const arrowDown = e.key === 'ArrowDown'
      if (withCtrl || this.indicatedIndex === this.length - 1 || this.indicatedIndex === 0) {
        const step = arrowDown ? -1 : 1
        this.focusNextOption(arrowDown ? this.length - 1 : 0, step)
      } else {
        const step = arrowDown ? 1 : -1
        this.focusNextOption(this.indicatedIndex, step)
        // this.indicatedIndex -= step
      }
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

  private focusNextOption(start: number, step: number): void {
    this.selectedOption?.focusItem(false)
    while (this.options[start]) {
      const option = this.options[start]
      if (!option.disabled) {
        option.focusItem(true)
        option.scrollIntoView()
        this.indicatedIndex = option.index
        break
      }
      start += step
    }
  }

  handleBlur(): void {
    this.indicatedIndex = -1
  }

  render(): TemplateResult<1> {
    return html`<slot></slot>`
  }
}
