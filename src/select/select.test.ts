import { elementUpdated, expect, fixture, html, nextFrame } from '@open-wc/testing'
import { FCSelect } from '.'
import { FCListOption } from '../list-option'
import './index'

describe('fc-select', function () {
  it('should not throw error when createElement', async () => {
    expect(() => document.createElement('fc-select')).not.throw()
  })

  it('should has value of foo', async () => {
    const select: FCSelect = await fixture(html`<fc-select value="foo">
      <fc-list-option value="foo"></fc-list-option>
      <fc-list-option value="bar"></fc-list-option>
    </fc-select>`)
    await nextFrame()
    expect(select.value).to.eq('foo')
  })

  it('should be open', async () => {
    const select: FCSelect = await fixture(html`<fc-select open>
      <fc-list-option>foo</fc-list-option>
    </fc-select>`)

    await nextFrame()
    expect(select.open).to.be.true
    expect(select.getAttribute('aria-expanded')).to.eq('true')
  })

  it('should select by click', async () => {
    const select: FCSelect = await fixture(html`<fc-select value="foo">
      <fc-list-option value="foo"></fc-list-option>
      <fc-list-option value="bar"></fc-list-option>
    </fc-select>`)

    expect(select.value).to.eq('foo')

    const bar = select.querySelector<FCListOption>('[value="bar"]')!
    bar.click()
    await elementUpdated(bar)
    await elementUpdated(select)
    expect(bar.selected).to.be.true
    expect(select.value).to.eq('bar')
  })

  it('should be disabled', async () => {
    const select: FCSelect = await fixture(html`<fc-select disabled value="foo">
      <fc-list-option value="foo"></fc-list-option>
      <fc-list-option value="bar"></fc-list-option>
    </fc-select>`)

    expect(select.disabled).to.be.true
    expect(select.value).to.equal('foo')

    const bar = select.querySelector<FCListOption>('[value="bar"]')!
    bar.click()

    await elementUpdated(select)
    expect(select.value).to.equal('foo')
  })

  it('should toggle open and close when click method is called', async () => {
    const select: FCSelect = await fixture(html`<fc-select>
      <fc-list-option value="foo"></fc-list-option>
      <fc-list-option value="bar"></fc-list-option>
    </fc-select>`)

    await nextFrame()
    expect(select.open, 'before').be.false
    select.click()

    await elementUpdated(select)
    expect(select.open, 'after').be.true

    select.click()
    await elementUpdated(select)
    expect(select.open, 'again').be.false
  })

  it('should open the dropdown overlay when fired a `click` event', async () => {
    const select: FCSelect = await fixture(html`<fc-select value="foo">
      <fc-list-option value="foo"></fc-list-option>
      <fc-list-option value="bar"></fc-list-option>
    </fc-select>`)

    await nextFrame()
    select.dispatchEvent(new MouseEvent('click'))

    await elementUpdated(select)

    expect(select.open).be.true
  })

  it('should open the dropdown overlay when pressed Enter', async () => {
    const select: FCSelect = await fixture(html`<fc-select value="foo">
      <fc-list-option value="foo"></fc-list-option>
      <fc-list-option value="bar"></fc-list-option>
    </fc-select>`)

    await nextFrame()
    select.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))

    await elementUpdated(select)

    expect(select.open).be.true
  })

  it('should select the first element when pressed ArrowDown key', async () => {
    const select: FCSelect = await fixture(html`<fc-select open>
      <fc-list-option value="foo"></fc-list-option>
      <fc-list-option value="bar"></fc-list-option>
    </fc-select>`)

    await nextFrame()
    select.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))

    await elementUpdated(select)
    const firstOption = select.visibleOptions[0]
    expect(firstOption.tabIndex).eq(0)
    expect(firstOption.focused).be.true
  })
})
