import { expect, fixture, html } from '@open-wc/testing'
import './index'
import { FCTabPanel } from './index'

describe('fc-tab-panel', function () {
  it('should not throw error', async () => {
    expect(() => document.createElement('fc-tab-panel')).not.throw()
  })

  it('should be disabled', async () => {
    const tabPanel: FCTabPanel = await fixture(html`<fc-tab-panel disabled></fc-tab-panel>`)
    expect(tabPanel.disabled).be.true
  })
})
