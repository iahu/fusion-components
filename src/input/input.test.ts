import { expect, fixture, html, nextFrame } from '@open-wc/testing'
import './index'
import { FCInput } from './index'

describe('fc-input', function () {
  it('should not throw error', async () => {
    expect(() => document.createElement('fc-input')).not.throw()
  })

  it('should have a value', async () => {
    const input: FCInput = await fixture(html`<fc-input value="foo"></fc-input>`)
    await nextFrame()

    expect(input.value).to.equal('foo')
  })

  it('should focus on the shadow input', async () => {
    const input: FCInput = await fixture(html`<fc-input></fc-input>`)

    await nextFrame()
    input.focus()

    expect(input.shadowRoot!.activeElement).eq(input.shadowInput)
  })

  it('should blur on the shadow input', async () => {
    const input: FCInput = await fixture(html`<fc-input></fc-input>`)

    await nextFrame()
    input.focus()

    expect(input.shadowRoot!.activeElement).eq(input.shadowInput)
    await nextFrame()

    input.blur()
    expect(input.shadowRoot!.activeElement).not.eq(input.shadowInput)
  })
})
