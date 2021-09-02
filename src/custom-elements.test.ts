import { expect } from '@open-wc/testing'
import Sinon from 'sinon'
import './custom-elements'

describe('custom-elements', function () {
  it('should not throw error', async () => {
    class CE extends HTMLElement {}
    customElements.define('fc-ce', CE)

    expect(customElements.get('fc-ce')).eq(CE)
    const fn = Sinon.spy()
    console.warn = fn

    customElements.define('fc-ce', CE)
    expect(fn.called).be.true
  })
})
