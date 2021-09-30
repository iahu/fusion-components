import expCalc, { Formula, isDigit, isNumber, normalize, toNumber } from 'exp-calc'
import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { observer } from '../decorators'
import { onEvent } from '../helper'
import { FCInput } from '../input'
import inputStyle from '../input/style.css'
import mergeStyles from '../merge-styles'
import { after, before } from '../pattern/before-after'
import style from './style.css'

const safeToNumber = (v: any) => (isDigit(v) ? toNumber(v) : NaN)

@customElement('fc-number-field')
export class FCNumberFiled extends FCInput {
  static styles = mergeStyles(inputStyle, style)

  updateInputValue(value: string): void {
    if (this.shadowInput) {
      this.shadowInput.value = value
    }
    this.checkValidity()
  }

  connectedCallback(): void {
    super.connectedCallback()
    onEvent(this, 'keydown', this.handleKeydown)
    this.shadowInput?.addEventListener('change', this.handleChange)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.shadowInput?.removeEventListener('change', this.handleChange)
  }

  normalize(): void {
    this.value = normalize(this.value)
  }

  @observer()
  max = this.getAttribute('max') ?? ''

  @observer()
  min = this.getAttribute('min') ?? ''

  @observer({
    converter(v) {
      const n = Number(v)
      return (n || 1).toString()
    },
  })
  step = '1'

  @observer()
  unit = ''

  @observer({ reflect: true })
  vibrate = false

  @observer<FCNumberFiled>({
    init: false,
    converter(v: string, host) {
      if (!v) {
        return v
      }
      if (!isDigit(v)) {
        return ''
      }

      let n = toNumber(v)
      const max = safeToNumber(host.max)
      const min = safeToNumber(host.min)
      if (isNumber(max)) {
        n = Math.min(max, n)
      }
      if (isNumber(min)) {
        n = Math.max(min, n)
      }

      return n.toString()
    },
  })
  value = ''
  valueChanged(old: string, next: string): void {
    super.valueChanged(old, next)
    if (this.shadowInput instanceof HTMLInputElement) {
      this.shadowInput.value = next
    }
    this.updateInputValue(this.valueWithUnit)
  }

  public get valueWithUnit(): string {
    return [this.value, this.unit].filter(v => v).join(' ')
  }

  public get number(): number {
    return isDigit(this.value) ? Number(this.value) : NaN
  }

  handleChange = (e: Event): void => {
    if (!(e.target instanceof HTMLInputElement)) {
      return
    }

    const { unit } = this
    const value = e.target.value.trim()
    const valueWithoutUnit = unit ? value.replace(new RegExp('\\s*' + unit, 'g'), '') : value
    this.classList.remove('expression-error')
    try {
      const computedResult = expCalc(valueWithoutUnit)
      if (!isNaN(computedResult)) {
        const nextValue = computedResult.toString()
        this.value = nextValue
        this.emit('change')
      }
    } catch (e) {
      console.warn('计算出错', e)
      this.classList.add('expression-error')
      this.emit('expression-error', e)
    }
    this.updateInputValue(this.valueWithUnit)
  }

  handleKeydown(e: KeyboardEvent): void {
    const modify = e.ctrlKey ? 10 : e.shiftKey ? 0.1 : 1
    const { step = '1' } = this
    const stepValue = safeToNumber(step)
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault()
        this.nextStep(stepValue * modify)
        break
      case 'ArrowDown':
        e.preventDefault()
        this.nextStep(stepValue * -1 * modify)
        break
    }
  }

  handleClickStep(director: 1 | -1): void {
    if (!this.disabled) {
      this.nextStep(director * toNumber(this.step))
    }
  }

  nextStep(delta: number): void {
    const number = this.value ? this.number : 0
    const nextFormula = [number, '+', delta].reduce((acc, op) => acc.op(op), new Formula(100))
    const max = safeToNumber(this.max)
    const min = safeToNumber(this.min)
    const n = nextFormula.value

    if (max && n >= max) {
      this.classList.remove('is-max')
      this.updateComplete.then(() => this.classList.add('is-max'))
      this.emit('is-max')
    } else {
      this.classList.remove('is-max')
    }
    if (min && n <= min) {
      this.classList.remove('is-min')
      this.updateComplete.then(() => this.classList.add('is-min'))
      this.emit('is-min')
    } else {
      this.classList.remove('is-min')
    }
    if (this.number !== nextFormula.value) {
      this.emit('change')
    }
    this.value = nextFormula.toString()
  }

  render(): TemplateResult<1> {
    return html`
      <slot name="label">${this.label ? html`<span class="label">${this.label}</span` : null}</slot>
      <div class="control fc-focusin-outline" part="controls">
        ${before()}
        <slot name="form-associated-proxy"></slot>
        <div class="controls" part="controls">
          <div class="step-up" @click="${() => this.handleClickStep(1)}"></div>
          <div class="step-down" @click="${() => this.handleClickStep(-1)}"></div>
        </div>
        ${after()}
      </div>
    `
  }
}
