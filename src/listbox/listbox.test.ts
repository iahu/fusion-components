import { elementUpdated, expect, fixture, html, nextFrame } from '@open-wc/testing'
import './index'
import { FCListBox } from './index'
import { FCListOption } from '../list-option'

describe('fc-listbox', function () {
  it('should not throw error when use createElement to crate it', async () => {
    expect(() => document.createElement('fc-listbox')).not.throw()
  })

  it('should has a "listbox" role attribute', async () => {
    const el: FCListBox = await fixture(html`<fc-listbox></fc-listbox>`)
    await nextFrame()
    expect(el.role).to.eq('listbox')
  })

  it('should select a list-option by value', async () => {
    const el: FCListBox = await fixture(html`<fc-listbox value="bar">
      <fc-list-option value="foo"></fc-list-option>
      <fc-list-option value="bar"></fc-list-option>
    </fc-listbox>`)

    expect(el.selectedOption).to.eq(el.querySelector('[value="bar"]'))
  })

  it('should select a list-option by value', async () => {
    const el: FCListBox = await fixture(html`<fc-listbox value="bar">
      <fc-list-option value="foo"></fc-list-option>
      <fc-list-option value="bar"></fc-list-option>
    </fc-listbox>`)

    expect(el.selectedOption).to.eq(el.querySelector('[value="bar"]'))

    const foo = el.querySelector<FCListOption>('[value="foo"]')
    foo!.click()

    await elementUpdated(el)

    expect(el.selectedOption).to.eq(foo)
  })

  it('should disabled', async () => {
    const el: FCListBox = await fixture(html`<fc-listbox disabled value="bar">
      <fc-list-option value="foo"></fc-list-option>
      <fc-list-option value="bar"></fc-list-option>
    </fc-listbox>`)

    await nextFrame()

    const foo = el.querySelector<FCListOption>('[value="foo"]')
    const bar = el.querySelector<FCListOption>('[value="bar"]')
    foo!.click()

    await elementUpdated(el)

    expect(el.selectedOption).to.eq(bar)
    expect(el.selectedOption).not.to.eq(foo)
  })

  it('should not selectable', async () => {
    const el: FCListBox = await fixture(html`<fc-listbox selectable="false">
      <fc-list-option value="foo"></fc-list-option>
      <fc-list-option value="bar"></fc-list-option>
    </fc-listbox>`)

    const foo = el.querySelector<FCListOption>('[value="foo"]')
    foo!.click()

    await elementUpdated(el)

    expect(el.selectedOption).to.be.undefined
  })

  it('should hidden a option', async () => {
    const el: FCListBox = await fixture(html`<fc-listbox disabled value="bar">
      <fc-list-option value="foo" hidden></fc-list-option>
      <fc-list-option value="bar"></fc-list-option>
    </fc-listbox>`)

    const bar = el.querySelector<FCListOption>('[value="bar"]')
    expect(el.visibleOptions).to.members([bar])
  })
})
