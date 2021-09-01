import { elementUpdated, expect, fixture, html, nextFrame } from '@open-wc/testing'
import Sinon from 'sinon'
import './index'
import { FCRadio } from './index'

describe('fc-radio', function () {
  it('should not throw error', async () => {
    expect(() => document.createElement('fc-radio')).not.throw()
  })

  it('should be checked', async () => {
    const radio: FCRadio = await fixture(html`<fc-radio checked></fc-radio>`)

    await nextFrame()

    expect(radio.checked).to.be.true
  })

  it('should turn on radio', async () => {
    const radio: FCRadio = await fixture(html`<fc-radio></fc-radio>`)

    await nextFrame()
    radio.click()
    await elementUpdated(radio)

    expect(radio.checked).to.be.true
  })

  it('should be disabled', async () => {
    const radio: FCRadio = await fixture(html`<fc-radio disabled></fc-radio>`)

    await nextFrame()

    expect(radio.disabled).to.be.true

    radio.click()
    await elementUpdated(radio)
    expect(radio.checked).to.be.false
  })

  it('should only one radio be checked, if they have a same name value', async () => {
    const el = await fixture(html`
      <div>
        <fc-radio name="foo" id="radio-1"></fc-radio>
        <fc-radio name="foo" id="radio-2"></fc-radio>
        <fc-radio name="foo" id="radio-3"></fc-radio>
      </div>
    `)

    const radios = el.querySelectorAll<FCRadio>('fc-radio')

    radios[0].click()
    await nextFrame()
    expect(radios[0].checked).be.true

    // next one
    radios[1].click()
    await nextFrame()
    expect(radios[1].checked).be.true
    expect(radios[0].checked).be.false
  })

  it('should set a form value', async () => {
    const form: HTMLFormElement = await fixture(html`
      <form action="#">
        <fc-radio name="foo" checked></fc-radio>
        <button type="submit"></button>
      </form>
    `)

    const fn = Sinon.spy((e: Event) => {
      e.preventDefault()
      e.stopPropagation()
      expect(new FormData(e.target as HTMLFormElement).get('foo')).eq('on')
    })
    form.addEventListener('submit', fn)
    form.querySelector('button')!.click()

    await nextFrame()
    await elementUpdated(form)

    expect(fn.called).be.true
  })
})
