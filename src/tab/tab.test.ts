import { elementUpdated, expect, fixture, html } from '@open-wc/testing'
import Sinon from 'sinon'
import './index'
import { FCTab } from './index'

describe('fc-tab', function () {
  it('should not throw error', async () => {
    expect(() => document.createElement('fc-tab')).not.throw()
  })

  it('should be disabled', async () => {
    const tab: FCTab = await fixture(html`<fc-tab disabled></fc-tab>`)

    expect(tab.disabled).to.be.true
  })

  it('should be selected', async () => {
    const tab: FCTab = await fixture(html`<fc-tab selected></fc-tab>`)

    expect(tab.selected).to.be.true
  })

  it('should fire a select event, after be selected', async () => {
    const tab: FCTab = await fixture(html`<fc-tab></fc-tab>`)

    tab.click()
    await elementUpdated(tab)
    expect(tab.selected).to.be.true
  })

  it('should fire a select event, after be selected', async () => {
    const tab: FCTab = await fixture(html`<fc-tab></fc-tab>`)

    const fn = Sinon.spy()
    tab.addEventListener('select', fn)
    tab.click()
    await elementUpdated(tab)
    expect(fn.called).to.be.true
  })
})
