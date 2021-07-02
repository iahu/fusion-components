import { PropertyValues } from 'lit'
import { property, state } from 'lit/decorators'
import FormAssociated from '../form-associated'
import Option, { isOption } from '../option'

export default class ListBox extends FormAssociated {
  connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('click', this.handleClick)
    this.addEventListener('focusout', this.handleFocusout)
    this.addEventListener('keydown', this.handleKeydown)
    this.addEventListener('selectionchange', this.handleSelectionchange)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.removeEventListener('click', this.handleClick)
    this.removeEventListener('focusout', this.handleFocusout)
    this.removeEventListener('keydown', this.handleKeydown)
  }

  updated(props: PropertyValues): void {
    const isSharp = this.hasAttribute('sharp')
    // 校验子元素，并传递要继承的属性
    this.options?.forEach((option) => {
      // 只保留合法的 Option 元素
      if (!isOption(option)) return option.remove()
      option.toggleAttribute('sharp', isSharp)
    })

    const selectedOption = this.options.find((o) => !o.disabled && o.value === this.value)
    if (selectedOption) {
      const preSelectedOption = this.options.find((o) => o.selected && o.value !== this.value)
      if (preSelectedOption) preSelectedOption.selected = false
      this.value = selectedOption.value || ''
      this.displayValue = selectedOption.text || ''
      this.selectedIndex = selectedOption.index || -1
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
    return this.__indicatedIndex
  }
  public set indicatedIndex(v: number) {
    const mergedIdx = Math.max(0, Math.min(v, this.options.length - 1))
    this.__indicatedIndex = mergedIdx
    this.options.forEach((o) => {
      o.actived = o.index === mergedIdx
    })
    this.requestUpdate()
  }

  @property({ reflect: true })
  role = 'comobox'

  @property({ reflect: true })
  tabindex = '0'

  __hidden = true

  public get hidden(): boolean {
    return this.__hidden
  }
  public set hidden(v: boolean) {
    this.__hidden = v
    this.setAttribute('aria-expanded', (!v).toString())
    if (!v) {
      this.indicatedIndex = this.selectedIndex
    }
    this.requestUpdate()
  }

  public get selectedIndex(): number {
    return this.options.findIndex((o) => o.selected)
  }

  public set selectedIndex(idx: number) {
    const mergedIdx = Math.max(0, Math.min(idx, this.options.length - 1))
    this.options.forEach((o) => {
      if (o.index === mergedIdx && !o.disabled) {
        o.selected = true
        this.value = o.value
      } else {
        o.selected = false
      }
    })
  }

  public get slottedElement(): HTMLSlotElement | null | undefined {
    return this.shadowRoot?.querySelector('slot:not([name])')
  }

  public get options(): Option[] {
    const optionSlot = this.shadowRoot?.querySelector('.listbox slot')
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
      this.selectedIndex = this.options.findIndex((o) => o === srcElement)
    }
    this.hidden = !this.hidden
    if (!this.hidden) {
      this.focus()
      const first = this.options?.[0]
      if (first instanceof HTMLElement) {
        first.focus()
      }
    }
  }

  handleFocusout(): void {
    this.hidden = true
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

    if (this.hidden) {
      this.hidden = false
      return
    }

    const withCtrl = e.metaKey || e.ctrlKey || e.altKey ? this.options.length : 0
    const preIndicatedIndex = this.indicatedIndex
    switch (e.key) {
      case HANDLED_KEYS.ArrowDown:
        this.indicatedIndex += 1 + withCtrl
        break
      case HANDLED_KEYS.ArrowUp:
        this.indicatedIndex -= 1 + withCtrl
        break
      case HANDLED_KEYS.Space:
      case HANDLED_KEYS.Enter:
        this.selectedIndex = this.indicatedIndex
        this.hidden = true
        break
      default:
        // 其它按键不处理，并中断后面的逻辑
        return
    }

    // 如果新指向的 option 不可用，按规则换一个
    if (this.options[this.indicatedIndex].disabled) {
      if (withCtrl) {
        const step = e.key === 'ArrowDown' ? -1 : 1
        while (this.options[this.indicatedIndex]) {
          this.indicatedIndex += step
          const nextOption = this.options[this.indicatedIndex]
          if (!nextOption.disabled) {
            break
          }
        }
      } else {
        this.indicatedIndex = preIndicatedIndex
      }
    }
  }

  handleSelectionchange(e: Event): void {
    if (e.target instanceof Option) {
      if (e.target.selected) {
        this.selectedIndex = e.target.index
      }

      // 取消选中当前 option
      if (!e.target.selected && this.value && e.target.value === this.value) {
        this.value = ''
      }
    }
  }
}
