import { html, TemplateResult } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
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

  updated(): void {
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
      selectedOption.selected = true
    } else if (this.value !== '' && this.displayValue !== '') {
      // 没有选中任何 option
      this.displayValue = ''
      this.value = ''
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
      if (o.index === mergedIdx) {
        o.focus()
        o.scrollIntoView({ block: 'nearest' })
      } else o.blur()
    })
    this.requestUpdate()
  }

  @property({ reflect: true })
  role = 'listbox'

  @property({ reflect: true })
  tabindex = '0'

  public get selectedIndex(): number {
    return this.options.findIndex((o) => !o.disabled && o.selected)
  }

  public set selectedIndex(idx: number) {
    if (idx === this.selectedIndex) {
      return
    }
    const selectedOption = this.options.find((o) => !o.disabled && o.index === idx)
    this.options.forEach((o) => (o.selected = false))
    if (selectedOption) selectedOption.selected = true
    this.value = selectedOption?.value || ''
    this.displayValue = selectedOption?.text || ''
  }

  public get options(): Option[] {
    return this.slottedElements.filter((o) => isOption(o) && !o.hidden) as Option[]
  }

  public set options(v: Option[]) {
    this.innerHTML = ''
    v.forEach((o) => this.appendChild(o))
    this.requestUpdate()
  }

  public get length(): number {
    return this.options.length
  }
  public set length(v: number) {
    this.options = this.options.slice(0, v)
  }

  handleClick(e: MouseEvent): void {
    const { srcElement } = e
    if (srcElement instanceof HTMLElement && isOption(srcElement) && !(srcElement as Option).disabled) {
      const selectedIndex = this.options.findIndex((o) => o === srcElement)
      if (this.selectedIndex !== selectedIndex) {
        this.selectedIndex = selectedIndex
        this.emit('select')
      }
    }
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
        this.emit('change')
        break
      case _HANDLED_KEYS.ArrowUp:
        this.indicatedIndex -= 1 + withCtrl
        this.emit('change')
        break
      case _HANDLED_KEYS.Space:
      case _HANDLED_KEYS.Enter: {
        const { displayValue, indicatedIndex } = this
        const changed = this.options[indicatedIndex]?.text !== displayValue
        if (changed) {
          this.selectedIndex = indicatedIndex
        }
        this.emit('select', changed)
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
        option.active = true
        option.scrollIntoView()
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
