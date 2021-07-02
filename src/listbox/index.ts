import { property, state } from 'lit/decorators'
import FormAssociated from '../form-associated'
import Option, { isOption } from '../option'

export default class ListBox extends FormAssociated {
  connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('click', this.handleClick)
    this.addEventListener('focusout', this.handleFocusout)
    this.addEventListener('keydown', this.handleKeydown)
    if (this.hasAttribute('value')) {
      this.value = this.getAttribute('value') || ''
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.removeEventListener('click', this.handleClick)
    this.removeEventListener('focusout', this.handleFocusout)
    this.removeEventListener('keydown', this.handleKeydown)
  }

  updated(): void {
    const isSharp = this.hasAttribute('sharp')
    this.options?.forEach((option) => {
      // 只保留合法的 Option 元素
      if (!isOption(option)) option.remove()
      if (option.value === this.value) this.displayValue = option.textContent || ''
      option.toggleAttribute('sharp', isSharp)
    })
  }

  attributeChangedCallback(name: string, pre: string, next: string): void {
    if (name === 'value') {
      const preOpt = this.options.find((o) => o.value === pre)
      if (preOpt) preOpt.selected = false
      const nextOpt = this.options.find((o) => o.value === next)
      if (nextOpt) nextOpt.selected = true
    }
  }

  @property()
  value = ''

  @state()
  displayValue = ''

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
      if (o.index === mergedIdx) {
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
    if (srcElement instanceof HTMLElement && isOption(srcElement)) {
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
    const handledKeys = ['ArrowUp', 'ArrowDown', 'Enter']
    if (handledKeys.includes(e.key) && this.hidden) {
      this.hidden = false
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        this.indicatedIndex += 1
        break
      case 'ArrowUp':
        this.indicatedIndex -= 1
        break
      case 'Enter':
        this.selectedIndex = this.indicatedIndex
        // this.value = this.options[this.indicatedIndex].value
        this.hidden = true
        break

      default:
        // code...
        break
    }
  }
}
