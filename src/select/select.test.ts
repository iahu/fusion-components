import { elementUpdated, expect, fixture, html, nextFrame } from '@open-wc/testing'
import { FCSelect } from '.'
import { FCListOption } from '../list-option'
import './index'

describe('fc-select', function () {
  it('should not throw error when createElement', async () => {
    expect(() => document.createElement('fc-select')).not.throw()
  })

  it('should has value', async () => {
    const select: FCSelect = await fixture(html`<fc-select value="foo"></fc-select>`)
    expect(select.value).to.eq('foo')

    const select2: FCSelect = await fixture(html`<fc-select value="foo">
      <fc-list-option value="foo"></fc-list-option>
      <fc-list-option value="bar"></fc-list-option>
    </fc-select>`)
    await nextFrame()
    expect(select2.value).to.eq('foo')
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
})
