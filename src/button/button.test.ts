import { elementUpdated, expect, fixture, html, nextFrame } from '@open-wc/testing'
import Sinon from 'sinon'
import { FCButton } from './'
import './index'

describe('FCButton', function () {
  it('should be created by document.createElement', async () => {
    expect(() => document.createElement('fc-button')).not.throw()
  })

  it('should focusable', async () => {
    const button: FCButton = await fixture(html`<fc-button></fc-button>`)

    expect(button.tabIndex).to.equal(0)

    button.focus()

    expect(button).dom.to.equal(document.activeElement)
  })

  it('should auto-focus', async () => {
    const button: FCButton = await fixture(html`<fc-button autofocus>foo</fc-button>`)
    await nextFrame()
    expect(button).dom.to.eq(document.activeElement)

    const button2: FCButton = await fixture(html`<fc-button autofocus>bar</fc-button>`)
    await nextFrame()
    // only first
    expect(button).dom.to.eq(document.activeElement)
    expect(button2).dom.not.to.eq(document.activeElement)
  })

  it('should be disabled', async () => {
    const button: FCButton = await fixture(html`<fc-button disabled></fc-button>`)

    expect(button.disabled).to.equal(true)
    const spy = Sinon.spy()
    button.addEventListener('click', spy)
    button.click()

    elementUpdated(button)

    expect(spy.called).to.be.false
  })

  it('should be selectable', async () => {
    const button: FCButton = await fixture(html`<fc-button selectable></fc-button>`)
    expect(button.selectable, 'default selectable').to.equal(true)
    expect(button.selected, 'default selected').to.equal(false)

    button.addEventListener('select', e => {
      expect((e.target as FCButton).selected, 'toggle selected').to.eq(true)
    })
    button.click()
  })

  it('should be selected', async () => {
    const button: FCButton = await fixture(html`<fc-button selected></fc-button>`)

    expect(button.selected).to.equal(false)

    button.toggleAttribute('selectable', true)
    button.toggleAttribute('selected', true)

    await elementUpdated(button)

    expect(button.selected).to.equal(true)
  })

  it('should contains a value attribute', async () => {
    const button: FCButton = await fixture(html`<fc-button value="foo"></fc-button>`)
    expect(button.value).to.equal('foo')
  })

  it('should submit a form', async () => {
    const el = await fixture(
      html`<form action="#"><input type="text" name="test" value="foo" /><fc-button type="submit"></fc-button></form>`
    )

    const spy = Sinon.spy(e => e.preventDefault())
    el!.addEventListener('submit', spy)
    el.querySelector<FCButton>('fc-button')!.click()
    await elementUpdated(el)
    await nextFrame()
    expect(spy.calledOnce, 'event fired').to.equal(true)
  })

  it('should prevent a submit event', async () => {
    const el = await fixture(
      html`<form action="#"><input type="text" name="test" value="foo" /><fc-button type="submit"></fc-button></form>`
    )

    const spy = Sinon.spy(e => e.preventDefault())
    el!.addEventListener('submit', spy)
    const btn = el.querySelector<FCButton>('fc-button')
    btn!.addEventListener('click', e => {
      e.preventDefault()
    })
    btn!.click()

    await elementUpdated(el)

    expect(spy.calledOnce, 'event fired').to.equal(false)
  })

  it('should reset form fileds', async () => {
    const form = await fixture(
      html`<form action="#"><input type="text" name="test" value="foo" /><fc-button type="reset"></fc-button></form>`
    )

    const input = form.querySelector('input')!

    input.value = 'bar'

    await elementUpdated(form)

    expect(input.value).to.eq('bar')

    form.querySelector<FCButton>('[type="reset"]')!.click()

    await elementUpdated(form)

    expect(input.value).to.eq('foo')
  })

  it('should Stop Immediate Propagation', async () => {
    const button: FCButton = await fixture(html`<fc-button></fc-button>`)
    const fnBefore = Sinon.spy()
    const fnStoppted = Sinon.spy(e => {
      e.stopImmediatePropagation()
    })
    const fnAfter = Sinon.spy()
    button.addEventListener('click', fnBefore)
    button.addEventListener('click', fnStoppted)
    button.addEventListener('click', fnAfter)

    button.click()

    elementUpdated(button)

    expect(fnBefore.called).to.eq(true)
    expect(fnAfter.called).to.eq(false)
  })

  it('should stopPropagation', async () => {
    const el = await fixture(html`<div><fc-button type="submit"></fc-button></div>`)

    const spy = Sinon.spy(e => e.preventDefault())
    el!.addEventListener('click', spy)

    const btn = el.querySelector<FCButton>('fc-button')
    btn!.addEventListener('click', e => e.stopPropagation())
    btn!.click()

    await elementUpdated(el)

    expect(spy.called, 'click event not fired').to.equal(false)
  })

  it('should simulate click event', async () => {
    const el = await fixture(html`<fc-button>foo</fc-button>`)
    const fn = Sinon.spy()
    el.addEventListener('click', fn)
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
    el.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }))

    expect(fn.called).to.be.true
    expect(fn.callCount).to.eq(2)
  })

  it("'s simulate click event should bubbles up", async () => {
    const el = await fixture(html`<div><fc-button>foo</fc-button></div>`)
    const fn = Sinon.spy()
    el.addEventListener('click', fn)
    el.querySelector('fc-button')!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))

    expect(fn.called).to.be.true
    expect(fn.callCount).to.eq(1)
  })
})
