import { expect, fixture, html, nextFrame } from '@open-wc/testing'
import Sinon from 'sinon'
import './index'
import { FCLink } from './index'

describe('fc-link', function () {
  it('should not throw error', async () => {
    expect(() => document.createElement('fc-link')).not.throw()
  })

  it('should redirect to example.com, when click on', async () => {
    const fn = Sinon.spy((e: BeforeUnloadEvent) => {
      e.preventDefault()
      return (e.returnValue = '')
    })
    const link = await fixture<FCLink>(html`<fc-link href="https://example.com"></fc-link>`)

    await nextFrame()
    window.addEventListener('beforeunload', fn)

    link.click()
    await nextFrame()

    expect(fn.called).be.true
  })

  it('should redirect to example.com, when pressed Enter key', async () => {
    const fn = Sinon.spy((e: BeforeUnloadEvent) => {
      e.preventDefault()
      return (e.returnValue = '')
    })
    const link = await fixture<FCLink>(html`<fc-link href="https://example.com"></fc-link>`)

    await nextFrame()
    window.addEventListener('beforeunload', fn)

    link.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
    await nextFrame()

    expect(fn.called).be.true
  })

  // @todo test download
})
