import { elementUpdated, expect, fixture, html } from '@open-wc/testing'
import './index'
import { FCTabs } from './index'

describe('fc-tabs', function () {
  it('should not throw error when createElement', async () => {
    expect(() => document.createElement('fc-tabs') instanceof FCTabs).not.throw()
  })

  it('should have an activeid property', async () => {
    const tabs = await fixture<FCTabs>(html`<fc-tabs activeid="bar">
      <fc-tab slot="tab">foo</fc-tab>
      <fc-tab slot="tab">bar</fc-tab>
      <fc-tab-panel slot="tabpanel">foo</fc-tab-panel>
      <fc-tab-panel slot="tabpanel">bar</fc-tab-panel>
    </fc-tabs>`)

    await elementUpdated(tabs)

    expect(tabs.activeid).eq('bar')
  })

  it('should set a id for every tab and tabpanel', async () => {
    const tabs = await fixture<FCTabs>(html`<fc-tabs>
      <fc-tab slot="tab">foo</fc-tab>
      <fc-tab slot="tab">bar</fc-tab>
      <fc-tab-panel slot="tabpanel">foo</fc-tab-panel>
      <fc-tab-panel slot="tabpanel">bar</fc-tab-panel>
    </fc-tabs>`)

    await elementUpdated(tabs)

    expect(tabs.querySelector('fc-tab')!.hasAttribute('id')).not.null
    expect(tabs.querySelector('fc-tab-panel')!.hasAttribute('id')).not.null
  })

  it('should have a tabs property of the child tabs', async () => {
    const tabs = await fixture<FCTabs>(html`<fc-tabs>
      <fc-tab id="foo" slot="tab">foo</fc-tab>
      <fc-tab id="bar" slot="tab">bar</fc-tab>
      <fc-tab-panel slot="tabpanel">foo</fc-tab-panel>
      <fc-tab-panel slot="tabpanel">bar</fc-tab-panel>
    </fc-tabs>`)
    await elementUpdated(tabs)
    expect(tabs.tabs).members(Array.from(tabs.querySelectorAll('fc-tab')))
  })

  it('should have a active tab', async () => {
    const tabs = await fixture<FCTabs>(html`<fc-tabs>
      <fc-tab id="foo" slot="tab">foo</fc-tab>
      <fc-tab id="bar" slot="tab">bar</fc-tab>
      <fc-tab-panel slot="tabpanel">foo</fc-tab-panel>
      <fc-tab-panel slot="tabpanel">bar</fc-tab-panel>
    </fc-tabs>`)

    await elementUpdated(tabs)
    expect(tabs.activeTab).not.be.null
    expect(tabs.activeid).not.be.null
  })

  it("'s first tab should be active as default", async () => {
    const tabs = await fixture<FCTabs>(html`<fc-tabs>
      <fc-tab id="foo" slot="tab">foo</fc-tab>
      <fc-tab id="bar" slot="tab">bar</fc-tab>
      <fc-tab-panel slot="tabpanel">foo</fc-tab-panel>
      <fc-tab-panel slot="tabpanel">bar</fc-tab-panel>
    </fc-tabs>`)

    await elementUpdated(tabs)
    expect(tabs.activeTab).eq(tabs.querySelector('#foo'))
    expect(tabs.activeid).eq('foo')
  })

  it('should toggle active tab when set activeid', async () => {
    const tabs = await fixture<FCTabs>(html`<fc-tabs>
      <fc-tab id="foo" slot="tab">foo</fc-tab>
      <fc-tab id="bar" slot="tab">bar</fc-tab>
      <fc-tab-panel slot="tabpanel">foo</fc-tab-panel>
      <fc-tab-panel slot="tabpanel">bar</fc-tab-panel>
    </fc-tabs>`)

    await elementUpdated(tabs)
    tabs.activeid = 'bar'
    await elementUpdated(tabs)

    expect(tabs.activeTab).eq(tabs.tabs[1])
  })

  it('should active the next tab when pressed ArrowRight key', async () => {
    const tabs = await fixture<FCTabs>(html`<fc-tabs>
      <fc-tab id="foo" slot="tab">foo</fc-tab>
      <fc-tab id="bar" slot="tab">bar</fc-tab>
      <fc-tab-panel slot="tabpanel">foo</fc-tab-panel>
      <fc-tab-panel slot="tabpanel">bar</fc-tab-panel>
    </fc-tabs>`)

    await elementUpdated(tabs)

    tabs.tabs[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))
    await elementUpdated(tabs)

    expect(document.activeElement).eq(tabs.tabs[1])
  })

  it('should select the focused tab when pressed Enter key', async () => {
    const tabs = await fixture<FCTabs>(html`<fc-tabs>
      <fc-tab id="foo" slot="tab">foo</fc-tab>
      <fc-tab id="bar" slot="tab">bar</fc-tab>
      <fc-tab-panel slot="tabpanel">foo</fc-tab-panel>
      <fc-tab-panel slot="tabpanel">bar</fc-tab-panel>
    </fc-tabs>`)

    await elementUpdated(tabs)

    tabs.tabs[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))
    await elementUpdated(tabs)
    tabs.tabs[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))

    expect(tabs.activeTab).eq(tabs.tabs[1])
  })

  it('should active the next tab when pressed ArrowLeft key', async () => {
    const tabs = await fixture<FCTabs>(html`<fc-tabs activeid="bar">
      <fc-tab id="foo" slot="tab">foo</fc-tab>
      <fc-tab id="bar" slot="tab">bar</fc-tab>
      <fc-tab-panel slot="tabpanel">foo</fc-tab-panel>
      <fc-tab-panel slot="tabpanel">bar</fc-tab-panel>
    </fc-tabs>`)

    await elementUpdated(tabs)

    tabs.tabs[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }))
    await elementUpdated(tabs)

    expect(document.activeElement).eq(tabs.tabs[0])
  })

  it('should active the next tab when pressed ArrowDown key, if set direction to column', async () => {
    const tabs = await fixture<FCTabs>(html`<fc-tabs direction="column">
      <fc-tab id="foo" slot="tab">foo</fc-tab>
      <fc-tab id="bar" slot="tab">bar</fc-tab>
      <fc-tab-panel slot="tabpanel">foo</fc-tab-panel>
      <fc-tab-panel slot="tabpanel">bar</fc-tab-panel>
    </fc-tabs>`)

    await elementUpdated(tabs)

    tabs.tabs[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
    await elementUpdated(tabs)

    expect(document.activeElement).eq(tabs.tabs[1])
  })

  it('should not active the next tab when pressed ArrowDown key, if set disabled', async () => {
    const tabs = await fixture<FCTabs>(html`<fc-tabs direction="column" disabled>
      <fc-tab id="foo" slot="tab">foo</fc-tab>
      <fc-tab id="bar" slot="tab">bar</fc-tab>
      <fc-tab-panel slot="tabpanel">foo</fc-tab-panel>
      <fc-tab-panel slot="tabpanel">bar</fc-tab-panel>
    </fc-tabs>`)

    await elementUpdated(tabs)

    tabs.tabs[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))
    await elementUpdated(tabs)
    tabs.tabs[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))

    expect(tabs.activeTab).not.eq(tabs.tabs[1])
  })
})
