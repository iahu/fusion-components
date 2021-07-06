import { html, PropertyValues, TemplateResult } from 'lit'
import { customElement, property, state } from 'lit/decorators'
import FormAssociated from '../form-associated'
import mergeStyles from '../merge-styles'
import Option, { isOption } from '../option'

import style from './style.css'

@customElement('fc-listbox')
export default class ListBox extends FormAssociated {
  static styles = mergeStyles(style)

  connectedCallback(): void {
    super.connectedCallback()
    this.className = 'listbox'
    this.addEventListener('click', this.handleClick)
    this.addEventListener('keydown', this.handleKeydown)
    this.addEventListener('selectionchange', this.handleSelectionchange)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.removeEventListener('click', this.handleClick)
    this.removeEventListener('keydown', this.handleKeydown)
    this.removeEventListener('selectionchange', this.handleSelectionchange)
  }

  private get selectedOption(): Option | undefined {
    return this.options.find((o) => !o.disabled && o.value === this.value)
  }

  updated(props: PropertyValues): void {
    const isSharp = this.hasAttribute('sharp')
    const isDisabled = this.hasAttribute('disabled')
    // 校验子元素，并传递要继承的属性
    this.options?.forEach((option) => {
      // 只保留合法的 Option 元素
      if (!isOption(option)) return option.remove()
      option.toggleAttribute('sharp', isSharp)
      option.toggleAttribute('disabled', isDisabled)
    })

    // 多个 option 的 value 相同时，使用 selectedIndex 可以防止错乱
    const selectedOption = this.options[this.selectedIndex] || this.selectedOption

    if (
      selectedOption?.value === this.value &&
      selectedOption.text === this.displayValue &&
      selectedOption.index === this.selectedIndex
    ) {
      return
    }

    if (selectedOption) {
      const preSelectedOption = this.options.find((o) => o.selected && o !== selectedOption)
      if (preSelectedOption) preSelectedOption.selected = false
      this.value = selectedOption.value || ''
      this.displayValue = selectedOption.text || ''
      this.selectedIndex = selectedOption.index || -1
      selectedOption.selected = true
    } else {
      // 没有选中任何 option
      this.displayValue = ''
      this.value = ''
    }

    if (props.has('value') && props.get('value') !== this.value) {
      this.emit('change', this.value)
    }
  }

  @state()
  protected displayValue = ''

  /**
   * 当前指向的 Option 的索引 ，但还没被选中，键盘或鼠标导航是用
   */
  private __indicatedIndex = -1
  public get indicatedIndex(): number {
    const { selectedOption, __indicatedIndex } = this
    if (__indicatedIndex < 0 && selectedOption) {
      return selectedOption.index
    }
    return __indicatedIndex
  }
  public set indicatedIndex(v: number) {
    const mergedIdx = Math.max(0, Math.min(v, this.options.length - 1))
    if (mergedIdx === this.__indicatedIndex) {
      return
    }
    this.__indicatedIndex = mergedIdx
    this.options.forEach((o) => {
      if (o.index === mergedIdx) o.focus()
      else o.blur()
    })
    this.requestUpdate()
  }

  @property({ reflect: true })
  role = 'comobox'

  @property({ reflect: true })
  tabindex = '0'

  public get selectedIndex(): number {
    return this.options.findIndex((o) => o.selected)
  }

  public set selectedIndex(idx: number) {
    if (idx === this.selectedIndex) {
      return
    }
    this.options.forEach((o) => {
      if (o.index === idx && !o.disabled) {
        o.selected = true
        this.value = o.value
        this.displayValue = o.text
      } else {
        o.selected = false
      }
    })
    this.requestUpdate()
  }

  public get slottedElement(): HTMLSlotElement | null | undefined {
    return this.shadowRoot?.querySelector('slot:not([name])')
  }

  public get options(): Option[] {
    const optionSlot = this.shadowRoot?.querySelector('slot:not([name])')
    if (optionSlot instanceof HTMLSlotElement) {
      return optionSlot.assignedElements() as Option[]
    }
    return []
  }

  public get length(): number {
    return this.options.length
  }

  handleClick(e: MouseEvent): void {
    const { srcElement } = e
    if (srcElement instanceof HTMLElement && isOption(srcElement) && !(srcElement as Option).disabled) {
      const selectedIndex = this.options.findIndex((o) => o === srcElement)
      if (this.selectedIndex !== selectedIndex) {
        this.selectedIndex = selectedIndex
        this.emit('change')
      }
    }
  }

  handleKeydown(e: KeyboardEvent): void {
    enum HANDLED_KEYS {
      'ArrowDown' = 'ArrowDown',
      'ArrowUp' = 'ArrowUp',
      'Enter' = 'Enter',
      'Space' = ' ',
    }

    if (!Object.values<string>(HANDLED_KEYS).includes(e.key)) {
      return
    }

    e.preventDefault()
    const withCtrl = e.metaKey || e.ctrlKey || e.altKey ? this.length : 0
    switch (e.key) {
      case HANDLED_KEYS.ArrowDown:
        this.indicatedIndex += 1 + withCtrl
        break
      case HANDLED_KEYS.ArrowUp:
        this.indicatedIndex -= 1 + withCtrl
        break
      case HANDLED_KEYS.Space:
      case HANDLED_KEYS.Enter: {
        const selectedIndex = this.indicatedIndex
        if (selectedIndex !== this.selectedIndex) {
          this.selectedIndex = selectedIndex
          this.emit('change')
        }
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

  handleSelectionchange(e: Event): void {
    if (e.target instanceof Option) {
      if (e.target.selected) {
        this.selectedIndex = e.target.index
      }

      // 取消选中当前 option
      if (!e.target.selected && this.value && e.target.text === this.displayValue) {
        this.selectedIndex = -1
      }
    }
  }

  private focusNextOption(start: number, step: number): void {
    while (this.options[start]) {
      const option = this.options[start]
      if (!option.disabled) {
        option.toggleAttribute('focused', true)
        this.indicatedIndex = option.index
        break
      }
      start += step
    }
  }

  render(): TemplateResult<1> {
    return html`<slot></slot>`
  }
}
