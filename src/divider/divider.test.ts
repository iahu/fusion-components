import { expect, fixture, html } from '@open-wc/testing'
import './index'
import { FCDivider } from './index'

describe('fc-divider', function () {
  it('should not throw error when createElement', function () {
    expect(() => document.createElement('fc-divider')).not.to.throw()
  })

  it('should has a "separator" role', async () => {
    const divider: FCDivider = await fixture(html`<fc-divider></fc-divider>`)

    expect(divider.role).to.equal('separator')
  })
})
