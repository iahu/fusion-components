import { expect, fixture, html } from '@open-wc/testing'
import './index'
import { FCIcon } from './index'

describe('fc-icon', function () {
  it('should not throw error', async () => {
    expect(() => document.createElement('fc-icon')).not.throw()
  })

  it('should render children', async () => {
    const icon: FCIcon = await fixture(html`<fc-icon>foo</fc-icon>`)
    expect(icon.textContent).to.eq('foo')
  })
})
