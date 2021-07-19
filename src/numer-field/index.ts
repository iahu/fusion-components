import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { createRef, Ref, ref } from 'lit/directives/ref.js'
import { observer } from '../decorators'
import Input from '../input'
import { after, before } from '../pattern/before-after'
import expCalc, { normalize, Formula } from 'exp-calc'

@customElement('fc-number-field')
export default class NumberFiled extends Input {
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

  @observer()
  value = this.getAttribute('value') ?? ''

  public get number(): number {
    return Number(this.value)
  }

  @observer()
  step = 1

  handleChange(e: Event): void {
    if (!(e.target instanceof HTMLInputElement)) {
      return
    }

    const computedResult = expCalc(e.target.value.trim())
    if (!isNaN(computedResult)) {
      const nextValue = computedResult.toString()
      this.value = nextValue
    }
    if (this.inputRef.value) {
      this.inputRef.value.value = this.value
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
    const formula = [this.number, '+', delta].reduce((exp, op) => exp.op(op), new Formula())

    this.value = formula.toString()
  }

  render(): TemplateResult<1> {
    return html`
      ${before()}
      <input
        type="text"
        class="control"
        part="control"
        ${ref(this.inputRef)}
        .value="${this.value}"
        @change="${this.handleChange}"
      />
      <div class="controls">
        <div class="step-up"></div>
        <div class="step-down"></div>
      </div>
      ${after()}
    `
  }
}
