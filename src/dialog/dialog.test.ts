import { elementUpdated, expect, fixture, html, nextFrame } from '@open-wc/testing'
import './index'
import { FCDialog } from './index'

describe('fc-dialog', function () {
  it('should not throw error', async () => {
    expect(() => document.createElement('fc-dialog')).not.throw()
  })

  it('should be open, if hidden is false', async () => {
    const el: FCDialog = await fixture(html` <fc-dialog>dialog</fc-dialog> `)

    await nextFrame()

    expect(el.getAttribute('aria-hidden')).eq('true')
    el.hidden = false

    await elementUpdated(el)
    expect(el.getAttribute('aria-hidden')).eq('false')
  })

  it('should be open, if called `show()`', async () => {
    const el: FCDialog = await fixture(html` <fc-dialog>dialog</fc-dialog> `)

    await nextFrame()

    expect(el.getAttribute('aria-hidden')).eq('true')
    el.show()

    await elementUpdated(el)
    expect(el.getAttribute('aria-hidden')).eq('false')
  })

  it('should be closed, if called `hide()`', async () => {
    const el: FCDialog = await fixture(html` <fc-dialog>dialog</fc-dialog> `)

    await nextFrame()

    expect(el.getAttribute('aria-hidden')).eq('true')
    el.show()

    await elementUpdated(el)
    expect(el.getAttribute('aria-hidden')).eq('false')

    el.hide()

    await elementUpdated(el)
    expect(el.getAttribute('aria-hidden')).eq('true')
  })

  it('should open an modal dialog, when click on anchor element', async () => {
    const el = await fixture(html`
      <div>
        <button id="btn">click here</button>
        <fc-dialog anchor="#btn">dialog</fc-dialog>
      </div>
    `)

    el.querySelector<HTMLButtonElement>('#btn')!.click()
    const dialog = el.querySelector<FCDialog>('fc-dialog')!

    await elementUpdated(dialog)

    expect(dialog.hidden).be.false
  })

  it('should close the dialog when clicked dialog overlay', async () => {
    const el: FCDialog = await fixture(html`<fc-dialog>dialog</fc-dialog>`)

    await nextFrame()
    el.show()
    expect(el.hidden).be.false

    el.renderRoot.querySelector<HTMLDivElement>('.overlay')!.click()
    await elementUpdated(el)

    expect(el.hidden).be.true
  })

  it('should close the dialog if fire a close event', async () => {
    const el: FCDialog = await fixture(html`<fc-dialog id="dialog" anchor="#foo"><div id="foo">foo</div></fc-dialog>`)

    await nextFrame()
    el.show()
    expect(el.hidden, 'before close event').be.false

    el.querySelector('#foo')!.dispatchEvent(new CustomEvent('close', { bubbles: true, detail: '#dialog' }))
    await elementUpdated(el)

    expect(el.hidden, 'after close event').be.true
  })

  it('should be hidden when pressed Escape key', async () => {
    const el: FCDialog = await fixture(html`<fc-dialog></fc-dialog>`)

    await nextFrame()
    el.show()
    expect(el.hidden, 'before close event').be.false

    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await elementUpdated(el)

    expect(el.hidden, 'after close event').be.true
  })
})
