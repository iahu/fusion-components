import { elementUpdated, expect, fixture, html, nextFrame } from '@open-wc/testing'
import './index'
import { FCPanel } from './index'

describe('fc-panel', function () {
  it('should not throw error', async () => {
    expect(() => document.createElement('fc-panel')).not.throw()
  })

  it('should be hidden', async () => {
    const panel: FCPanel = await fixture(html`<fc-panel></fc-panel`)

    await nextFrame()
    panel.hidden = true

    expect(panel.getAttribute('aria-hidden')).to.equal('false')
  })

  it('should append a fc-header node, if given a header value', async () => {
    const panel: FCPanel = await fixture(html`<fc-panel header="foo"></fc-panel>`)
    await elementUpdated(panel)

    expect(panel.slotElements['panel-header'].assignedElements()).not.be.null
    expect(panel.querySelector('fc-panel-header')).eq(panel.slotElements['panel-header'].assignedElements()[0])
  })

  it('should remove the appended fc-header node, if remove header value', async () => {
    const panel: FCPanel = await fixture(html`<fc-panel header="foo"></fc-panel>`)
    await elementUpdated(panel)

    panel.header = ''
    await elementUpdated(panel)

    expect(panel.querySelector('fc-panel-header')).be.null
  })

  it('should not append a fc-header node, if it exists a panel-header slot element', async () => {
    const panel: FCPanel = await fixture(html`<fc-panel><div slot="panel-header">foo</div></fc-panel>`)
    expect(panel.querySelector('fc-panel-header')).to.be.null
  })
})
