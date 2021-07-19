import expCalc, { normalize } from 'exp-calc'
import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { createRef, Ref, ref } from 'lit/directives/ref.js'
import { observer } from '../decorators'
import Input from '../input'
import mergeStyles from '../merge-styles'
import { after, before } from '../pattern/before-after'
import style from './style.css'

@customElement('fc-number-field')
export default class NumberFiled extends Input {
  static styles = mergeStyles(style)

  inputRef: Ref<HTMLInputElement> = createRef<HTMLInputElement>()
  connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('keydown', this.handleKeydown)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.removeEventListener('keydown', this.handleKeydown)
  }

  normalize(): void {
    this.value = normalize(this.value)
  }

  @observer({ init: false, converter: normalize })
  value = ''
  valueChanged(old: string, next: string): void {
    if (this.inputRef.value) {
      this.inputRef.value.value = this.valueWithUnit
    }
  }

  public get valueWithUnit(): string {
    return [this.value, this.unit].filter((v) => v).join(' ')
  }

  public get number(): number {
    return Number(this.value)
  }

  @observer()
  step = 1

  @observer()
  unit = ''

  handleChange(e: Event): void {
    if (!(e.target instanceof HTMLInputElement)) {
      return
    }

    const computedResult = expCalc(e.target.value.trim())
    if (!isNaN(computedResult)) {
      const nextValue = computedResult.toString()
      this.value = nextValue
    }
  }

  handleKeydown(e: KeyboardEvent): void {
    const modify = e.ctrlKey ? 10 : e.shiftKey ? 0.1 : 1
    const { step } = this
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault()
        this.nextStep(step * modify)
        break
      case 'ArrowDown':
        e.preventDefault()
        this.nextStep(step * -1 * modify)
        break
    }
  }

  nextStep(delta: number): void {
    this.value = normalize((this.number + delta).toString())
  }

  render(): TemplateResult<1> {
    return html`
      ${before()}
      <input
        type="text"
        class="control"
        part="control"
        ${ref(this.inputRef)}
        .value="${this.valueWithUnit}"
        @change="${this.handleChange}"
        placeholder="${this.placeholder}"
      />
      <div class="controls">
        <div class="step-up" @click="${() => this.nextStep(1)}"></div>
        <div class="step-down" @click="${() => this.nextStep(-1)}"></div>
      </div>
      ${after()}
    `
  }
}
