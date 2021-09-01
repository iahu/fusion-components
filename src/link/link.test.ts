import { expect, fixture, html, nextFrame } from '@open-wc/testing'
import './index'
import { FCLink } from './index'

describe('fc-link', function () {
  it('should not throw error', async () => {
    expect(() => document.createElement('fc-link')).not.throw()
  })

  it('should redirect to example.com', async () => {
    const link = await fixture<FCLink>(html`<fc-link href="https://example.com"></fc-link>`)

    await nextFrame()

    link.click()

    // @todo test redirect
  })
})
