import { assert, elementUpdated, expect, fixture, html, nextFrame } from '@open-wc/testing'
import Sinon from 'sinon'
import './index'
import { FCCheckbox } from './index'

describe('fc-checkbox', function () {
  it('should not throw when createElement', function () {
    expect(() => document.createElement('fc-checkbox')).not.throw()
  })

  it('should has role attribute named checkbox', async () => {
    const checkbox: FCCheckbox = await fixture(html`<fc-checkbox></fc-checkbox>`)
    expect(checkbox.role).to.eq('checkbox')
  })

  it('should set default value to "on"', async () => {
    const checkbox: FCCheckbox = await fixture(html`<fc-checkbox checked></fc-checkbox>`)
    expect(checkbox.value).to.eq('on')
  })

  it('should be checked', async () => {
    const checkbox: FCCheckbox = await fixture(html`<fc-checkbox checked></fc-checkbox>`)

    assert(checkbox.checked, 'default checked')
  })

  it('should be indeterminate', async () => {
    const checkbox: FCCheckbox = await fixture(html`<fc-checkbox indeterminate></fc-checkbox>`)

    assert(checkbox.indeterminate, 'default indeterminate')
  })

  it('should be disabled', async () => {
    const checkbox: FCCheckbox = await fixture(html`<fc-checkbox disabled></fc-checkbox>`)
    assert(checkbox.disabled, 'default disabled')
  })

  it('should not change checked state by click, when it is disabled.', async () => {
    const checkbox: FCCheckbox = await fixture(html`<fc-checkbox disabled></fc-checkbox>`)

    assert(!checkbox.checked, 'should not be checked')
    checkbox.click()
    await elementUpdated(checkbox)
    assert(!checkbox.checked, 'should not be checked')
  })

  it('should change checked state by setter, when it is disabled.', async () => {
    const checkbox: FCCheckbox = await fixture(html`<fc-checkbox disabled></fc-checkbox>`)

    checkbox.checked = true
    checkbox.click()
    await elementUpdated(checkbox)
    assert(checkbox.checked, 'should be checked')
  })

  it('should use custom icon', async () => {
    const checkbox: FCCheckbox = await fixture(
      html`<fc-checkbox><span slot="checked-indicator">✅</span></fc-checkbox>`
    )

    await nextFrame()

    const assigned = checkbox.renderRoot
      .querySelector<HTMLSlotElement>('slot[name="checked-indicator"]')
      ?.assignedElements()
    expect(assigned![0]).to.equal(checkbox.querySelector('[slot]'))
  })

  it('should has value', async () => {
    const checkbox: FCCheckbox = await fixture(html`<fc-checkbox value="foo"></fc-checkbox>`)

    expect(checkbox.value).to.eq('foo')
  })

  it('should role as form filed', async () => {
    const form: HTMLFormElement = await fixture(
      html`<form action="#">
      <fc-checkbox name="check" value="foo" checked></fc-checkbox>
      <button type="submit"></button>
      </fc-checkbox>`
    )

    expect(new FormData(form).get('check')).to.eq('foo')
  })

  it('should role as form fileds group', async () => {
    const form: HTMLFormElement = await fixture(
      html`<form action="#">
      <fc-checkbox name="check" value="foo" checked></fc-checkbox>
      <fc-checkbox name="check" value="bar" checked></fc-checkbox>
      <button type="submit"></button>
      </fc-checkbox>`
    )

    expect(new FormData(form).getAll('check')).to.members(['foo', 'bar'])
  })

  it('should be required while submit', async () => {
    const form: HTMLFormElement = await fixture(html`<form action="#">
      <fc-checkbox required></fc-checkbox>
      <button></button>
    </form>`)

    const fn = Sinon.spy()
    form.addEventListener('submit', fn)
    form.querySelector('button')!.click()

    await nextFrame()
    expect(fn.called).to.be.false
  })

  it('should fire an invalid event', async () => {
    const form: HTMLFormElement = await fixture(html`<form action="#">
      <fc-checkbox required></fc-checkbox>
      <button></button>
    </form>`)

    const fn2 = Sinon.spy()
    form.querySelector('fc-checkbox')!.addEventListener('invalid', fn2)
    form.querySelector('button')!.click()
    expect(fn2.called).to.be.true
  })

  // @TODO keydown
})
