import { elementUpdated, expect, fixture, html, nextFrame } from '@open-wc/testing'
import Sinon from 'sinon'
import './index'
import { FCInput } from './index'

describe('fc-input', function () {
  it('should not throw error', async () => {
    expect(() => document.createElement('fc-input')).not.throw()
  })

  it('should have a value', async () => {
    const input: FCInput = await fixture(html`<fc-input value="foo"></fc-input>`)
    await nextFrame()

    expect(input.value).to.equal('foo')
  })

  it('should focus on the shadow input', async () => {
    const input: FCInput = await fixture(html`<fc-input></fc-input>`)

    await nextFrame()
    input.focus()

    await elementUpdated(input)

    expect(document.activeElement).eq(input.shadowInput)
  })

  it('should blur on the shadow input', async () => {
    const input: FCInput = await fixture(html`<fc-input></fc-input>`)

    await nextFrame()
    input.focus()

    expect(document.activeElement).eq(input.shadowInput)
    await nextFrame()

    input.blur()
    expect(document.activeElement).not.eq(input.shadowInput)
  })

  it('should be required', async () => {
    const form: HTMLFormElement = await fixture(
      html`<form action=""><fc-input required name="foo"></fc-input><button type="submit"></button></form>`
    )
    const button = form.querySelector('button')!
    const input = form.querySelector<FCInput>('fc-input')!
    const fn = Sinon.spy()
    form.addEventListener('submit', fn)
    button.click()

    expect(fn.called).to.be.false
    expect(input.validity.valid).to.be.false
  })

  it('should fire a focus event, when focus() method is called', async () => {
    const input: FCInput = await fixture(html`<fc-input name="foo"></fc-input>`)

    await nextFrame()
    const fn = Sinon.spy()
    input.addEventListener('focus', fn)
    input.focus()

    expect(fn.called).to.be.true
  })

  it('should fire a blur event, when blur() method is called', async () => {
    const input: FCInput = await fixture(html`<fc-input name="foo"></fc-input>`)

    await nextFrame()
    const fn = Sinon.spy((e: Event) => {
      expect(e.bubbles).be.false
    })
    input.focus()
    input.addEventListener('blur', fn)
    input.blur()

    await nextFrame()
    expect(fn.called).to.be.true
    expect(fn.callCount).to.eq(1)
  })

  it('should fire a focusout event, when blur() method is called', async () => {
    const input: FCInput = await fixture(html`<fc-input name="foo"></fc-input>`)

    await nextFrame()
    const fn = Sinon.spy((e: Event) => {
      expect(e.bubbles).be.true
    })
    input.focus()
    input.addEventListener('focusout', fn)
    input.blur()

    await nextFrame()
    expect(fn.called).to.be.true
    expect(fn.callCount).to.eq(1)
  })
})
