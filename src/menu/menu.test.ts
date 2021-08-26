import { elementUpdated, expect, fixture, html, nextFrame } from '@open-wc/testing'
import { FCMenu } from './index'
import './index'
import '../menu-item'
import { FCMenuItem } from '../menu-item'

describe('fc-menu', function () {
  it('should not throw error when createElement', () => {
    expect(() => document.createElement('fc-menu')).not.throw()
  })

  it('should has a "menu" role', async () => {
    const menu: FCMenu = await fixture(html`<fc-menu></fc-menu>`)

    expect(menu.role).to.eq('menu')
  })

  it('should set first menu-item tabindex to 0', async () => {
    const menu: FCMenu = await fixture(html`<fc-menu>
      <fc-menu-item id="foo"></fc-menu-item>
      <fc-menu-item></fc-menu-item>
      <fc-menu-item></fc-menu-item>
    </fc-menu>`)
    await nextFrame()

    expect(menu.querySelector<FCMenuItem>('#foo')!.tabIndex).to.eq(0)
  })

  it('should focus next item', async () => {
    const menu: FCMenu = await fixture(html`<fc-menu>
      <fc-menu-item id="苹果">苹果</fc-menu-item>
      <fc-menu-item id="香蕉">香蕉</fc-menu-item>
      <fc-menu-item id="橘子">橘子</fc-menu-item>
      <fc-menu-item id="梨">梨</fc-menu-item>
    </fc-menu> `)

    const 苹果 = menu.querySelector<FCMenuItem>('#苹果')!
    苹果.focus()

    await nextFrame()
    const 香蕉 = menu.querySelector('#香蕉')
    const arrowDown = new KeyboardEvent('keydown', { key: 'ArrowDown' })
    menu.dispatchEvent(arrowDown)
    await elementUpdated(menu)
    expect(香蕉).eq(document.activeElement)
  })

  it('should focus previous item, and loop if needed', async () => {
    const menu: FCMenu = await fixture(html`<fc-menu>
      <fc-menu-item id="苹果">苹果</fc-menu-item>
      <fc-menu-item id="香蕉">香蕉</fc-menu-item>
      <fc-menu-item id="橘子">橘子</fc-menu-item>
      <fc-menu-item id="梨">梨</fc-menu-item>
    </fc-menu> `)

    const 苹果 = menu.querySelector<FCMenuItem>('#苹果')!
    苹果.focus()

    await nextFrame()
    const 梨 = menu.querySelector('#梨')
    const arrowUp = new KeyboardEvent('keydown', { key: 'ArrowUp' })
    menu.dispatchEvent(arrowUp)
    await elementUpdated(menu)
    expect(梨).eq(document.activeElement)
  })

  it('should focus the clicked menu item', async () => {
    const menu: FCMenu = await fixture(html`<fc-menu>
      <fc-menu-item id="苹果">苹果</fc-menu-item>
      <fc-menu-item id="香蕉">香蕉</fc-menu-item>
      <fc-menu-item id="橘子">橘子</fc-menu-item>
      <fc-menu-item id="梨">梨</fc-menu-item>
    </fc-menu> `)

    const 苹果 = menu.querySelector<FCMenuItem>('#苹果')!
    const 香蕉 = menu.querySelector<FCMenuItem>('#香蕉')!

    await nextFrame()
    香蕉.click()

    await elementUpdated(menu)

    expect(苹果.tabIndex).eq(-1)
    expect(香蕉).eq(document.activeElement)
  })

  it('should expand submenu while pressed ArrowRight', async () => {
    const menu: FCMenu = await fixture(html`
      <fc-menu>
        <fc-menu-item id="水果">
          <span>水果</span>
          <fc-menu slot="submenu">
            <fc-menu-item id="苹果">苹果</fc-menu-item>
            <fc-menu-item id="香蕉">香蕉</fc-menu-item>
            <fc-menu-item id="橘子">橘子</fc-menu-item>
            <fc-menu-item id="梨">梨</fc-menu-item>
          </fc-menu>
        </fc-menu-item>
      </fc-menu>
    `)

    await nextFrame()

    const 水果 = menu.querySelector<FCMenuItem>('#水果')!
    水果.focus()

    const arrowRight = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })
    // 从`水果`冒泡到 menu 不是直接 menu.dispatchEvent(arrowRight)
    水果.dispatchEvent(arrowRight)
    await elementUpdated(menu)
    expect(水果.expanded).to.be.true

    await elementUpdated(menu)
    const 苹果 = menu.querySelector('#苹果')
    expect(document.activeElement).to.eq(苹果)
  })

  it('should un-expand submenu while pressed ArrowLeft', async () => {
    const menu: FCMenu = await fixture(html`
      <fc-menu>
        <fc-menu-item id="水果">
          <span>水果</span>
          <fc-menu slot="submenu">
            <fc-menu-item id="苹果">苹果</fc-menu-item>
            <fc-menu-item id="香蕉">香蕉</fc-menu-item>
            <fc-menu-item id="橘子">橘子</fc-menu-item>
            <fc-menu-item id="梨">梨</fc-menu-item>
          </fc-menu>
        </fc-menu-item>
      </fc-menu>
    `)

    await nextFrame()

    const 水果 = menu.querySelector<FCMenuItem>('#水果')!
    const 苹果 = menu.querySelector<FCMenuItem>('#苹果')!
    苹果.focus()

    const arrowLeft = new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true })
    // 从`苹果`冒泡到 menu 不是直接 menu.dispatchEvent(arrowLeft)
    苹果.dispatchEvent(arrowLeft)
    await elementUpdated(menu)
    expect(水果.expanded).be.false
    expect(水果).eq(document.activeElement)
  })

  it('should toggle expanded when pressed Space key', async () => {
    const menu: FCMenu = await fixture(html`
      <fc-menu>
        <fc-menu-item id="水果">
          <span>水果</span>
          <fc-menu slot="submenu">
            <fc-menu-item id="苹果">苹果</fc-menu-item>
            <fc-menu-item id="香蕉">香蕉</fc-menu-item>
            <fc-menu-item id="橘子">橘子</fc-menu-item>
          </fc-menu>
        </fc-menu-item>
      </fc-menu>
    `)

    const 水果 = menu.querySelector<FCMenuItem>('#水果')!
    水果.focus()
    水果.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }))
    await elementUpdated(menu)
    expect(水果.expanded).eq(true)
  })

  it('should keep only one menuitemradio be checked', async () => {
    const menu: FCMenu = await fixture(html`
      <fc-menu>
        <fc-menu-item role="menuitemradio">苹果</fc-menu-item>
        <fc-menu-item role="menuitemradio">香蕉</fc-menu-item>
        <fc-menu-item role="menuitemradio">橘子</fc-menu-item>
        <fc-menu-item role="menuitem">梨</fc-menu-item>
      </fc-menu>
    `)

    const items = Array.from(menu.querySelectorAll<FCMenuItem>('fc-menu-item'))
    items[0].click()
    await elementUpdated(menu)
    expect(items[0].checked).be.true

    items[1].click()
    await elementUpdated(menu)
    expect(items[0].checked).be.false
    expect(items[1].checked).be.true

    items[2].click()
    await elementUpdated(menu)
    expect(items[0].checked).be.false
    expect(items[1].checked).be.false
    expect(items[2].checked).be.true

    // click menuitem
    items[3].click()
    await elementUpdated(menu)
    expect(items[0].checked).be.false
    expect(items[1].checked).be.false
    expect(items[2].checked).be.true
    expect(items[3].checked).be.false
  })

  it('should close all submenu after focusout', async () => {
    const menu: FCMenu = await fixture(html`
      <fc-menu>
        <fc-menu-item expanded id="mi-1">
          <fc-menu slot="submenu">
            <fc-menu-item expanded id="mi-2">
              <fc-menu slot="submenu">
                <fc-menu-item id="bottom"></fc-menu-item>
              </fc-menu>
            </fc-menu-item>
          </fc-menu>
        </fc-menu-item>
      </fc-menu>
    `)

    const bottom = menu.querySelector<FCMenuItem>('#bottom')!
    bottom.focus()
    await nextFrame()
    document.body.focus()

    await elementUpdated(menu)

    expect(menu.querySelector<FCMenuItem>('#mi-1')!.expanded).be.true
    expect(menu.querySelector<FCMenuItem>('#mi-2')!.expanded).be.true
  })
})
