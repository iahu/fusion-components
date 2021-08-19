import { elementUpdated, expect, fixture, html } from '@open-wc/testing'
import './index'
import { FCListOption } from './index'

describe('fc-list-option', function () {
  it('should not throw error when createElement', async () => {
    expect(() => document.createElement('fc-list-option')).not.to.throw()
  })

  it('should selected', async () => {
    const el: FCListOption = await fixture(html`<fc-list-option selected></fc-list-option>`)
    expect(el.selected).to.be.true
  })

  it('should use value as text', async () => {
    const el: FCListOption = await fixture(html`<fc-list-option value="foo"></fc-list-option>`)
    await elementUpdated(el)

    const slot = el.renderRoot.querySelector<HTMLSlotElement>('slot:not([name])')!
    expect(slot.innerText).to.equal('foo')
  })

  it('should be selected', async () => {
    const el: FCListOption = await fixture(html`<fc-list-option selected></fc-list-option>`)

    expect(el.selected).to.be.true
  })

  it('should be disabled', async () => {
    const el: FCListOption = await fixture(html`<fc-list-option disabled></fc-list-option>`)

    expect(el.selected).to.be.false

    el.click()

    await elementUpdated(el)

    expect(el.selected, 'click is disabled').to.be.false
  })
})
