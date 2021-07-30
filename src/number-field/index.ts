import expCalc, { normalize, toNumber, isNumber, isDigit, Formula } from 'exp-calc'
import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { createRef, Ref, ref } from 'lit/directives/ref.js'
import { observer } from '../decorators'
import { FCInput } from '../input'
import mergeStyles from '../merge-styles'
import { after, before } from '../pattern/before-after'
import style from './style.css'

const safeToNumber = (v: any) => (isDigit(v) ? toNumber(v) : NaN)

@customElement('fc-number-field')
export class FCNumberFiled extends FCInput {
  static styles = mergeStyles(style)

  inputRef: Ref<HTMLInputElement> = createRef<HTMLInputElement>()
  updateInputValue(value: string): void {
    if (this.inputRef.value) {
      this.inputRef.value.value = value
    }
  }

  connectedCallback(): void {
    super.connectedCallback()
    this.addEventListener('keydown', this.handleKeydown)
    this.addEventListener('touchstart', () => console.log('touchstart'))
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.removeEventListener('keydown', this.handleKeydown)
  }

  normalize(): void {
    this.value = normalize(this.value)
  }

  @observer()
  max = ''

  @observer()
  min = ''

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

  @observer({
    init: false,
    converter(v: string, host: FCNumberFiled) {
      if (!v) {
        return v
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
  protected valueChanged(old: string, next: string): void {
    this.updateInputValue(this.valueWithUnit)
  }

  public get valueWithUnit(): string {
    return [this.value, this.unit].filter((v) => v).join(' ')
  }

  public get number(): number {
    return Number(this.value)
  }

  handleChange(e: Event): void {
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
      this.emit('error', e)
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
    const nextFormula = [this.number, '+', delta].reduce((acc, op) => acc.op(op), new Formula(100))
    const max = safeToNumber(this.max)
    const min = safeToNumber(this.min)
    const n = nextFormula.value

    if (max && n >= max) {
      this.classList.remove('is-max')
      setImmediate(() => this.classList.add('is-max'), 0)
      this.emit('is-max')
    } else {
      this.classList.remove('is-max')
    }
    if (min && n <= min) {
      this.classList.remove('is-min')
      setImmediate(() => this.classList.add('is-min'), 0)
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
      ${before()}
      <input
        class="control"
        id="control"
        part="control"
        type="text"
        class="control"
        part="control"
        name="${this.name}"
        ${ref(this.inputRef)}
        .value="${this.valueWithUnit}"
        @change="${this.handleChange}"
        placeholder="${this.placeholder}"
        ?autofocus="${this.autofocus}"
        ?checked="${this.checked}"
        ?disabled="${this.disabled}"
        form="${this.form}"
        formaction="${this.formaction}"
        formtarget="${this.formtarget}"
        formnovalidate="${this.formnovalidate}"
        height="${this.height}"
        inputmode="${this.inputMode}"
        list="${this.list}"
        max="${this.max}"
        maxlength="${this.maxlength}"
        min="${this.min}"
        minlength="${this.minlength}"
        pattern="${this.pattern}"
        ?readonly="${this.readonly}"
        ?required="${this.required}"
        src="${this.src}"
        step="${this.step}"
        width="${this.width}"
      />
      <div class="controls" part="controls">
        <div class="step-up" @click="${() => this.handleClickStep(1)}"></div>
        <div class="step-down" @click="${() => this.handleClickStep(-1)}"></div>
      </div>
      ${after()}
    `
  }
}
