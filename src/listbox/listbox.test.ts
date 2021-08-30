import { elementUpdated, expect, fixture, html, nextFrame } from '@open-wc/testing'
import './index'
import { FCListBox } from './index'
import { FCListOption } from '../list-option'
import Sinon from 'sinon'

describe('fc-listbox', function () {
  it('should not throw error when use createElement to crate it', async () => {
    expect(() => document.createElement('fc-listbox')).not.throw()
  })

  it('should has a "listbox" role attribute', async () => {
    const listbox: FCListBox = await fixture(html`<fc-listbox></fc-listbox>`)
    await nextFrame()
    expect(listbox.role).to.eq('listbox')
  })

  it('should select a list-option by value', async () => {
    const listbox: FCListBox = await fixture(html`<fc-listbox value="bar">
      <fc-list-option value="foo"></fc-list-option>
      <fc-list-option value="bar"></fc-list-option>
    </fc-listbox>`)

    expect(listbox.selectedOption).to.eq(listbox.querySelector('[value="bar"]'))
  })

  it('should select a list-option by value', async () => {
    const listbox: FCListBox = await fixture(html`<fc-listbox value="bar">
      <fc-list-option value="foo"></fc-list-option>
      <fc-list-option value="bar"></fc-list-option>
    </fc-listbox>`)

    expect(listbox.selectedOption).to.eq(listbox.querySelector('[value="bar"]'))

    const foo = listbox.querySelector<FCListOption>('[value="foo"]')
    foo!.click()

    await elementUpdated(listbox)

    expect(listbox.selectedOption).to.eq(foo)
  })

  it('should disabled', async () => {
    const listbox: FCListBox = await fixture(html`<fc-listbox disabled value="bar">
      <fc-list-option value="foo"></fc-list-option>
      <fc-list-option value="bar"></fc-list-option>
    </fc-listbox>`)

    await nextFrame()

    const foo = listbox.querySelector<FCListOption>('[value="foo"]')
    const bar = listbox.querySelector<FCListOption>('[value="bar"]')
    foo!.click()

    await elementUpdated(listbox)

    expect(listbox.selectedOption).to.eq(bar)
    expect(listbox.selectedOption).not.to.eq(foo)
  })

  it('should not selectable', async () => {
    const listbox: FCListBox = await fixture(html`<fc-listbox selectable="false">
      <fc-list-option value="foo"></fc-list-option>
      <fc-list-option value="bar"></fc-list-option>
    </fc-listbox>`)

    const foo = listbox.querySelector<FCListOption>('[value="foo"]')
    foo!.click()

    await elementUpdated(listbox)

    expect(listbox.selectedOption).to.be.undefined
  })

  it('should hidden a option', async () => {
    const listbox: FCListBox = await fixture(html`<fc-listbox disabled value="bar">
      <fc-list-option value="foo" hidden></fc-list-option>
      <fc-list-option value="bar"></fc-list-option>
    </fc-listbox>`)

    const bar = listbox.querySelector<FCListOption>('[value="bar"]')
    expect(listbox.visibleOptions).to.members([bar])
  })

  it('should focus next option when press ArrowDown key', async () => {
    const listbox: FCListBox = await fixture(html`<fc-listbox>
      <fc-list-option>foo</fc-list-option>
      <fc-list-option>bar</fc-list-option>
      <fc-list-option>baz</fc-list-option>
    </fc-listbox>`)

    await nextFrame()
    const arrowEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' })
    listbox.dispatchEvent(arrowEvent)
    await elementUpdated(listbox)
    expect(listbox.options[0].hasAttribute('focused'), '0').to.true

    await nextFrame()
    listbox.dispatchEvent(arrowEvent)
    await elementUpdated(listbox)
    expect(listbox.options[1].hasAttribute('focused'), '1').to.true
  })

  it('should focus previous option when press ArrowUp key', async () => {
    const listbox: FCListBox = await fixture(html`<fc-listbox>
      <fc-list-option>foo</fc-list-option>
      <fc-list-option>bar</fc-list-option>
      <fc-list-option focused>baz</fc-list-option>
    </fc-listbox>`)

    const arrowEvent = new KeyboardEvent('keydown', { key: 'ArrowUp' })
    await nextFrame()
    listbox.dispatchEvent(arrowEvent)
    await elementUpdated(listbox)
    expect(listbox.options[1].hasAttribute('focused'), '1').to.true

    await nextFrame()
    listbox.dispatchEvent(arrowEvent)
    await elementUpdated(listbox)
    expect(listbox.options[0].hasAttribute('focused'), '0').to.true
  })

  it('should select a option when pressed enter key', async () => {
    const listbox: FCListBox = await fixture(html`<fc-listbox>
      <fc-list-option value="foo">foo</fc-list-option>
      <fc-list-option value="bar">bar</fc-list-option>
      <fc-list-option value="baz">baz</fc-list-option>
    </fc-listbox>`)

    await nextFrame()

    const arrowEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' })
    await nextFrame()
    listbox.dispatchEvent(arrowEvent)
    listbox.dispatchEvent(arrowEvent)

    const bar = listbox.querySelector<FCListOption>('[value="bar"]')!

    listbox.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
    await elementUpdated(listbox)

    expect(bar.selected, 'selected').be.true

    expect(listbox.value, 'value').to.eq('bar')
  })

  it('should navigate to matched text option when press key', async () => {
    const listbox: FCListBox = await fixture(html`<fc-listbox>
      <fc-list-option value="foo">foo</fc-list-option>
      <fc-list-option value="bar">bar</fc-list-option>
      <fc-list-option value="baz">baz</fc-list-option>
    </fc-listbox>`)

    listbox.dispatchEvent(new KeyboardEvent('keydown', { key: 'f' }))
    await elementUpdated(listbox)
    expect(listbox.visibleOptions[0].hasAttribute('focused')).be.true

    await elementUpdated(listbox)
    listbox.dispatchEvent(new KeyboardEvent('keydown', { key: 'b' }))
    await elementUpdated(listbox)
    expect(listbox.visibleOptions[1].hasAttribute('focused')).be.true
  })

  it('should deep match current option', async () => {
    const listbox: FCListBox = await fixture(html`<fc-listbox>
      <fc-list-option value="foo">foo</fc-list-option>
      <fc-list-option value="bar">bar</fc-list-option>
      <fc-list-option value="baz">baz</fc-list-option>
    </fc-listbox>`)

    listbox.dispatchEvent(new KeyboardEvent('keydown', { key: 'f' }))
    await elementUpdated(listbox)
    expect(listbox.visibleOptions[0].hasAttribute('focused')).be.true

    await elementUpdated(listbox)
    listbox.dispatchEvent(new KeyboardEvent('keydown', { key: 'o' }))
    await elementUpdated(listbox)
    expect(listbox.visibleOptions[0].hasAttribute('focused')).be.true
  })

  it('should jump to match other options, if cant deep match current option', async () => {
    const listbox: FCListBox = await fixture(html`<fc-listbox>
      <fc-list-option value="foo">foo</fc-list-option>
      <fc-list-option value="bar">bar</fc-list-option>
      <fc-list-option value="baz">baz</fc-list-option>
    </fc-listbox>`)

    listbox.dispatchEvent(new KeyboardEvent('keydown', { key: 'b' }))
    await elementUpdated(listbox)
    expect(listbox.visibleOptions[1].hasAttribute('focused')).be.true

    await elementUpdated(listbox)
    listbox.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }))
    await elementUpdated(listbox)
    expect(listbox.visibleOptions[1].hasAttribute('focused')).be.true

    await elementUpdated(listbox)
    listbox.dispatchEvent(new KeyboardEvent('keydown', { key: 'z' }))
    await elementUpdated(listbox)
    expect(listbox.visibleOptions[2].hasAttribute('focused')).be.true
  })

  it('should un-match any option', async () => {
    const listbox: FCListBox = await fixture(html`<fc-listbox>
      <fc-list-option value="foo">foo</fc-list-option>
      <fc-list-option value="bar">bar</fc-list-option>
      <fc-list-option value="baz">baz</fc-list-option>
    </fc-listbox>`)

    listbox.dispatchEvent(new KeyboardEvent('keydown', { key: 'b' }))
    await elementUpdated(listbox)
    expect(listbox.visibleOptions[1].hasAttribute('focused')).be.true

    await elementUpdated(listbox)
    listbox.dispatchEvent(new KeyboardEvent('keydown', { key: 'x' }))
    await elementUpdated(listbox)
    expect(listbox.querySelector('[focused]')).be.null
  })

  it('should emit blur event when perss Escape key', async () => {
    const listbox: FCListBox = await fixture(html`<fc-listbox tabindex="-1">
      <fc-list-option value="foo">foo</fc-list-option>
      <fc-list-option value="bar">bar</fc-list-option>
      <fc-list-option value="baz">baz</fc-list-option>
    </fc-listbox>`)

    await nextFrame()
    listbox.focus()
    const fn = Sinon.spy()
    listbox.addEventListener('blur', fn)
    listbox.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))

    await elementUpdated(listbox)
    expect(fn.called).be.true
  })

  it("'s length should be 3", async () => {
    const listbox: FCListBox = await fixture(html`<fc-listbox>
      <fc-list-option value="foo">foo</fc-list-option>
      <fc-list-option value="bar">bar</fc-list-option>
      <fc-list-option value="baz">baz</fc-list-option>
    </fc-listbox>`)

    await nextFrame()
    expect(listbox.length).eq(3)
  })

  it('should getItem by index', async () => {
    const listbox: FCListBox = await fixture(html`<fc-listbox>
      <fc-list-option value="foo">foo</fc-list-option>
      <fc-list-option value="bar">bar</fc-list-option>
      <fc-list-option value="baz">baz</fc-list-option>
    </fc-listbox>`)

    await nextFrame()
    expect(listbox.getItem(1)).eq(listbox.visibleOptions[1])
  })
})
