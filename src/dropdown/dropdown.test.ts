import { aTimeout, elementUpdated, expect, fixture, html, nextFrame } from '@open-wc/testing'

import { FCDropdown } from './index'
import './index'

describe('fc-dropdown', function () {
  it('should not throw error when createElement', async () => {
    expect(() => document.createElement('fc-dropdown')).not.throw()
  })

  it('should be open', async () => {
    const dropdown: FCDropdown = await fixture(html`<fc-dropdown open></fc-dropdown>`)
    expect(dropdown.open).to.be.true

    dropdown.open = false
    expect(dropdown.open).to.be.false
  })

  it('should turn into opened, when triggers by click', async () => {
    const dropdown: FCDropdown = await fixture(html`<fc-dropdown></fc-dropdown>`)
    dropdown.click()
    await elementUpdated(dropdown)
    expect(dropdown.open).be.true
  })

  it('should turn into opened, when press Enter key', async () => {
    const dropdown: FCDropdown = await fixture(html`<fc-dropdown></fc-dropdown>`)
    dropdown.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))

    await elementUpdated(dropdown)

    expect(dropdown.open).be.true
  })

  it('should turn into opened, when press Space key', async () => {
    const dropdown: FCDropdown = await fixture(html`<fc-dropdown></fc-dropdown>`)
    dropdown.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }))

    await elementUpdated(dropdown)

    expect(dropdown.open).be.true
  })

  it('should turn into opened, when press ArrowDown key', async () => {
    const dropdown: FCDropdown = await fixture(html`<fc-dropdown></fc-dropdown>`)
    dropdown.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))

    await elementUpdated(dropdown)

    expect(dropdown.open).be.true
  })

  it('should be closed when lost focus', async () => {
    const dropdown: FCDropdown = await fixture(html`<fc-dropdown>
      <button id="btn">botton</button>
      <div>foo</div>
    </fc-dropdown>`)

    await nextFrame()
    dropdown.click()
    await elementUpdated(dropdown)
    expect(dropdown.open).be.true

    const btn = dropdown.querySelector<HTMLButtonElement>('#btn')!
    expect(btn).be.eq(document.activeElement)
    btn.blur()

    await elementUpdated(dropdown)
    expect(dropdown.open).be.false
  })

  it('should be closed when press Escape key', async () => {
    const dropdown: FCDropdown = await fixture(html`<fc-dropdown><div>foo</div></fc-dropdown>`)

    await nextFrame()
    dropdown.click()
    await elementUpdated(dropdown)
    expect(dropdown.open).be.true

    dropdown.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await elementUpdated(dropdown)
    expect(dropdown.open).be.false
  })

  it('should focus the first assigned element of default slot', async () => {
    const dropdown: FCDropdown = await fixture(html`<fc-dropdown><div id="foo">foo</div></fc-dropdown>`)

    await nextFrame()
    dropdown.open = true
    await elementUpdated(dropdown)
    expect(dropdown.querySelector('#foo')).eq(document.activeElement)
  })
})
