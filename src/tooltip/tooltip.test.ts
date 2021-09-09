import { aTimeout, elementUpdated, expect, fixture, html, nextFrame } from '@open-wc/testing'
import Sinon from 'sinon'
import './index'
import { FCTooltip } from './index'

describe('fc-tooltip', function () {
  it('should not throw error', async () => {
    expect(() => document.createElement('fc-tooltip')).not.throw()
  })

  it('should be visibility', async () => {
    const tooltip: FCTooltip = await fixture(html`<fc-tooltip visible>foo</fc-tooltip>`)
    await nextFrame()

    expect(tooltip.visible).to.be.true
  })

  it('should be visibility, if set visible to true', async () => {
    const tooltip: FCTooltip = await fixture(html`<fc-tooltip>foo</fc-tooltip>`)

    tooltip.visible = true

    await nextFrame()
    expect(tooltip.visible).to.be.true
  })

  it('should fire a visibleChange event when the tooltip visibility', async () => {
    const el = await fixture<HTMLElement>(html`
      <div>
        <button id="tooltip">x</button>
        <fc-tooltip anchor="#tooltip"> foo </fc-tooltip>
      </div>
    `)

    const tooltip = el.querySelector<FCTooltip>('fc-tooltip')!
    const fn = Sinon.spy()
    tooltip.addEventListener('visibleChange', fn)

    tooltip.visible = true

    // utill delay timeout
    await aTimeout(350)

    expect(fn.called).to.be.true
  })

  it('should be visibility', async () => {
    const el = await fixture<HTMLElement>(html`
      <div>
        <button id="tooltip">x</button>
        <fc-tooltip anchor="#tooltip"> foo </fc-tooltip>
      </div>
    `)

    el.querySelector<HTMLButtonElement>('button')!.dispatchEvent(new MouseEvent('mouseenter'))
    await nextFrame()

    expect(el.querySelector<FCTooltip>('fc-tooltip')!.visible).to.be.true
  })

  it('should be hidden when mouseleave from triggers', async () => {
    const el = await fixture<HTMLElement>(html`
      <div>
        <button id="tooltip">x</button>
        <fc-tooltip anchor="#tooltip" visible delay="0">foo</fc-tooltip>
      </div>
    `)
    const button = el.querySelector('button')!
    const tooltip: FCTooltip = el.querySelector<FCTooltip>('fc-tooltip')!

    // mouseenter
    button.dispatchEvent(new MouseEvent('mouseenter'))
    await nextFrame()
    expect(tooltip.visible, 'before').to.be.true

    // mouseleave
    button.dispatchEvent(new MouseEvent('mouseleave'))
    await elementUpdated(tooltip)
    expect(tooltip.visible, 'after').to.be.false
  })

  it('should placement the tooltip on top of the element', async () => {
    const el = await fixture<HTMLElement>(html`
      <div>
        <button id="tooltip">x</button>
        <fc-tooltip anchor="#tooltip" visible delay="0" position="top">foo</fc-tooltip>
      </div>
    `)

    const button = el.querySelector('button')!
    const tooltip: FCTooltip = el.querySelector<FCTooltip>('fc-tooltip')!

    expect(button.getBoundingClientRect().top).greaterThan(tooltip.anchorPosition.top!)
  })

  it('should placement the tooltip on left of the element', async () => {
    const el = await fixture<HTMLElement>(html`
      <div>
        <button id="tooltip">x</button>
        <fc-tooltip anchor="#tooltip" visible delay="0" position="left">foo</fc-tooltip>
      </div>
    `)

    const button = el.querySelector('button')!
    const tooltip: FCTooltip = el.querySelector<FCTooltip>('fc-tooltip')!

    expect(button.getBoundingClientRect().left).greaterThan(tooltip.anchorPosition.left!)
  })

  it('should placement the tooltip on right of the element', async () => {
    const el = await fixture<HTMLElement>(html`
      <div>
        <button id="tooltip">x</button>
        <fc-tooltip anchor="#tooltip" visible delay="0" position="right">foo</fc-tooltip>
      </div>
    `)

    const button = el.querySelector('button')!
    const tooltip: FCTooltip = el.querySelector<FCTooltip>('fc-tooltip')!

    expect(button.getBoundingClientRect().right).lessThan(tooltip.anchorPosition.left!)
  })
})
