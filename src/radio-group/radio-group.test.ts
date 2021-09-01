import { elementUpdated, expect, fixture, html, nextFrame } from '@open-wc/testing'
import { FCRadio } from '../radio'
import './index'
import { FCRadioGroup } from './index'

describe('fc-radio-group', function () {
  it('should not throw error', async () => {
    expect(() => document.createElement('fc-radio-group')).not.throw()
  })

  it('should have a value', async () => {
    const group = await fixture<FCRadioGroup>(html`<fc-radio-group value="foo"></fc-radio-group>`)

    await nextFrame()

    expect(group.value).to.equal('foo')
  })

  it('should have a item property of radio children', async () => {
    const group = await fixture<FCRadioGroup>(html`<fc-radio-group value="foo">
      <fc-radio name="r" value="foo"></fc-radio>
      <fc-radio name="r" value="bar"></fc-radio>
    </fc-radio-group>`)

    await nextFrame()
    expect(group.items).be.members(Array.from(group.querySelectorAll('fc-radio')))
  })

  it('should have a length of 2', async () => {
    const group = await fixture<FCRadioGroup>(html`<fc-radio-group value="foo">
      <fc-radio name="r" value="foo"></fc-radio>
      <fc-radio name="r" value="bar"></fc-radio>
    </fc-radio-group>`)

    await nextFrame()
    expect(group.length).be.eq(2)
  })

  it('should have a value, which equals the checked radio value', async () => {
    const group = await fixture(html`<fc-radio-group value="foo">
      <fc-radio name="r" value="foo"></fc-radio>
      <fc-radio name="r" value="bar"></fc-radio>
    </fc-radio-group>`)

    await nextFrame()
    expect(group.querySelector<FCRadio>('[value="foo"]')?.checked).be.true
  })

  it('should change value to matches the checked radio value', async () => {
    const group = await fixture<FCRadioGroup>(html`<fc-radio-group value="foo">
      <fc-radio name="r" value="foo"></fc-radio>
      <fc-radio name="r" value="bar"></fc-radio>
    </fc-radio-group>`)

    await nextFrame()
    group.querySelector<FCRadio>('[value="bar"]')!.click()

    await elementUpdated(group)
    expect(group.value).to.eq('bar')
  })

  it('should force the radio next to the active radio', async () => {
    const group = await fixture<FCRadioGroup>(html`<fc-radio-group value="foo">
      <fc-radio name="r" value="foo"></fc-radio>
      <fc-radio name="r" value="bar"></fc-radio>
    </fc-radio-group>`)

    await nextFrame()
    group.items[0].focus()
    group.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))

    await elementUpdated(group)
    expect(group.items[1]).eq(document.activeElement)
  })
})
