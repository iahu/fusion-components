import { elementUpdated, expect, fixture, html, nextFrame } from '@open-wc/testing'
import Sinon from 'sinon'
import './index'
import { FCNumberFiled } from './index'

describe('fc-number-field', function () {
  it('should not throw error', async () => {
    expect(() => document.createElement('fc-number-field')).not.throw()
  })

  it('should accepts numeric as a value', async () => {
    const number = await fixture<FCNumberFiled>(html`<fc-number-field value="123"></fc-number-field>`)

    await nextFrame()
    expect(number.value).to.equal('123')
  })

  it('should translate value to a number', async () => {
    const number = await fixture<FCNumberFiled>(html`<fc-number-field value="123"></fc-number-field>`)

    await nextFrame()
    expect(number.number).to.equal(123)
  })

  it('should not have a value if value is not a numberic string', async () => {
    const number = await fixture<FCNumberFiled>(html`<fc-number-field value="abc"></fc-number-field>`)

    await nextFrame()
    expect(number.value).not.to.equal('abc')
    expect(number.value).to.eq('')
    expect(number.number).to.be.NaN
  })

  it('should up to next step', async () => {
    const number = await fixture<FCNumberFiled>(html`<fc-number-field value="123"></fc-number-field>`)

    await nextFrame()
    expect(number.number).to.eq(123)

    number.nextStep(1)
    expect(number.number).to.eq(124)

    number.nextStep(-10)
    expect(number.number).to.eq(114)
  })

  it('should be a max value', async () => {
    const number = await fixture<FCNumberFiled>(html`<fc-number-field max="10" value="12"></fc-number-field>`)
    await elementUpdated(number)

    expect(number.value).to.eq('10')
    expect(number.number).to.eq(10)
  })

  it('should be a min value', async () => {
    const number = await fixture<FCNumberFiled>(html`<fc-number-field min="10" value="1"></fc-number-field>`)
    await elementUpdated(number)

    expect(number.value).to.eq('10')
    expect(number.number).to.eq(10)
  })

  it('should not great then max value', async () => {
    const number = await fixture<FCNumberFiled>(html`<fc-number-field max="10" value="10"></fc-number-field>`)
    await elementUpdated(number)

    number.nextStep(1)
    await elementUpdated(number)
    expect(number.number).to.eq(10)
  })

  it('should not less then min value', async () => {
    const number = await fixture<FCNumberFiled>(html`<fc-number-field min="10" value="10"></fc-number-field>`)
    await elementUpdated(number)

    number.nextStep(-1)
    await elementUpdated(number)
    expect(number.number).to.eq(10)
  })

  it('should step up to next value when clicked step-up button', async () => {
    const number = await fixture<FCNumberFiled>(html`<fc-number-field value="2" step="2"></fc-number>`)
    await elementUpdated(number)

    number.renderRoot.querySelector<HTMLElement>('.step-up')!.click()

    await elementUpdated(number)
    expect(number.number).be.eq(4)
  })

  it('should step down to next value when clicked step-down button', async () => {
    const number = await fixture<FCNumberFiled>(html`<fc-number-field value="2" step="2"></fc-number>`)
    await elementUpdated(number)

    number.renderRoot.querySelector<HTMLElement>('.step-down')!.click()

    await elementUpdated(number)
    expect(number.number).be.eq(0)
  })

  it('should step up to next value when pressed ArrowUp key', async () => {
    const number = await fixture<FCNumberFiled>(html`<fc-number-field value="2" step="2"></fc-number>`)

    await nextFrame()
    number.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }))
    await elementUpdated(number)
    expect(number.number).eq(4)
  })

  it('should step down to next value when pressed ArrowDown key', async () => {
    const number = await fixture<FCNumberFiled>(html`<fc-number-field value="2" step="2"></fc-number>`)

    await nextFrame()
    number.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))
    await elementUpdated(number)
    expect(number.number).eq(0)
  })

  it('should change the value if dispatch change event on shadowInput element', async () => {
    const number = await fixture<FCNumberFiled>(html`<fc-number-field value="2"></fc-number>`)

    await nextFrame()
    const shadowInput = number.shadowInput!
    shadowInput.value = '3'
    shadowInput!.dispatchEvent(new CustomEvent('change'))

    expect(number.value).eq('3')
  })

  it('should return the expression result after shadowInput changed', async () => {
    const number = await fixture<FCNumberFiled>(html`<fc-number-field value="2"></fc-number>`)

    await nextFrame()
    const shadowInput = number.shadowInput!
    shadowInput.value = '1+2'
    shadowInput!.dispatchEvent(new CustomEvent('change'))

    expect(number.value).eq('3')
  })

  it('should throw a Error if expression is illegal', async () => {
    const number = await fixture<FCNumberFiled>(html`<fc-number-field value="2"></fc-number>`)

    await nextFrame()
    const fn = Sinon.spy()
    const fn2 = Sinon.spy()
    console.warn = fn2
    number.addEventListener('expression-error', fn)
    const shadowInput = number.shadowInput!
    shadowInput.value = 'a+2'
    shadowInput!.dispatchEvent(new CustomEvent('change'))

    await elementUpdated(number)
    expect(fn.called).be.true
    expect(fn2.called).be.true
  })

  it('should includes a unit', async () => {
    const number = await fixture<FCNumberFiled>(html`<fc-number-field value="12" unit="px"></fc-number>`)
    await nextFrame()
    expect(number.shadowInput?.value).to.eq(number.valueWithUnit)
  })
})
