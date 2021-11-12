import { aTimeout, elementUpdated, expect, fixture, html, nextFrame } from '@open-wc/testing'
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

    const 香蕉 = menu.querySelector<FCMenuItem>('#香蕉')!

    await nextFrame()
    香蕉.click()

    await elementUpdated(menu)

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
  })

  it('should focus submenu first item while pressed ArrowRight', async () => {
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
        <fc-menu-item role="menuitemcheckbox">梨</fc-menu-item>
      </fc-menu>
    `)

    const items = Array.from(menu.querySelectorAll<FCMenuItem>('fc-menu-item'))
    items[0].click()
    await elementUpdated(menu)
    expect(items[0].checked, 'click 0').be.true

    items[1].click()
    await elementUpdated(menu)
    expect(items[0].checked, 'click on 1, 0').be.false
    expect(items[1].checked, 'click on 1, 1').be.true

    items[2].click()
    await elementUpdated(menu)
    expect(items[0].checked, 'click on 2, 0').be.false
    expect(items[1].checked, 'click on 2, 1').be.false
    expect(items[2].checked, 'click on 2, 2').be.true

    // click menuitem
    items[3].click()
    await elementUpdated(menu)
    expect(items[0].checked, 'click on 3, 0').be.false
    expect(items[1].checked, 'click on 3, 1').be.false
    expect(items[2].checked, 'click on 3, 2').be.true
    expect(items[3].checked, 'click on 3, 3rd checkbox').be.true
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

  it('should change menuitemcheckbox\'s "checked" to true, when click on item', async () => {
    const menu: FCMenuItem = await fixture(
      html`<fc-menu><fc-menu-item role="menuitemcheckbox"></fc-menu-item></fc-menu>`
    )
    const item = menu.querySelector<FCMenuItem>('fc-menu-item')!
    item.click()
    await elementUpdated(item)
    expect(item.checked, 'menuitemcheckbox').to.be.true
  })

  it('should change menuitemradio\'s "checked" to true, when click on item', async () => {
    const menu: FCMenuItem = await fixture(html`<fc-menu><fc-menu-item role="menuitemradio"></fc-menu-item></fc-menu>`)
    const item = menu.querySelector<FCMenuItem>('fc-menu-item')!
    item.click()
    await elementUpdated(item)
    expect(item.checked, 'menuitemradio').to.be.true
  })

  it('should be checked when pressed enter', async () => {
    const menu: FCMenuItem = await fixture(
      html`<fc-menu><fc-menu-item role="menuitemcheckbox"></fc-menu-item></fc-menu>`
    )
    const menuitemcheckbox = menu.querySelector<FCMenuItem>('fc-menu-item')!
    const keydown = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
    menuitemcheckbox.dispatchEvent(keydown)

    await elementUpdated(menuitemcheckbox)
    expect(menuitemcheckbox.checked, 'when pressed enter').to.be.true
  })

  it('should be checked when click', async () => {
    const menu: FCMenuItem = await fixture(
      html`<fc-menu><fc-menu-item role="menuitemcheckbox"></fc-menu-item></fc-menu>`
    )
    const menuitemcheckbox = menu.querySelector<FCMenuItem>('fc-menu-item')!
    menuitemcheckbox.click()

    await elementUpdated(menuitemcheckbox)
    expect(menuitemcheckbox.checked, 'when pressed enter').to.be.true
  })

  it('should be expanded when mouseenter', async () => {
    const menu: FCMenu = await fixture(html`
      <fc-menu mouseenterDelay="0">
        <fc-menu-item id="first-item">
          <span>foo</span>
          <fc-menu slot="submenu">
            <fc-menu-item>bar</fc-menu-item>
          </fc-menu>
        </fc-menu-item>
      </fc-menu>
    `)
    const menuitem: FCMenuItem = menu.querySelector<FCMenuItem>('#first-item')!
    expect(menuitem.expanded, 'before mouseenter').be.false
    menuitem.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
    await elementUpdated(menu)
    expect(menuitem.expanded, 'after mouseenter').be.true
  })

  it('should be expanded when click', async () => {
    const menu: FCMenu = await fixture(html`
      <fc-menu mouseenterDelay="0">
        <fc-menu-item id="first-item">
          <span>foo</span>
          <fc-menu slot="submenu">
            <fc-menu-item>bar</fc-menu-item>
          </fc-menu>
        </fc-menu-item>
        <fc-menu-item id="baz"><div>baz</div></fc-menu-item>
      </fc-menu>
    `)
    const menuitem: FCMenuItem = menu.querySelector<FCMenuItem>('#first-item')!
    expect(menuitem.expanded, 'before click').be.false

    menuitem.click()
    await elementUpdated(menu)
    expect(menuitem.expanded, 'after click').be.true

    const baz = menu.querySelector<FCMenuItem>('#baz')!
    baz.click()
    await elementUpdated(menu)
    expect(menuitem.expanded, 'after click another menu item').be.false
  })

  it('should delay about 1s to open submenu', async () => {
    const menu: FCMenu = await fixture(html`
      <fc-menu mouseenterDelay="1000">
        <fc-menu-item id="first-item">
          <span>foo</span>
          <fc-menu slot="submenu">
            <fc-menu-item>bar</fc-menu-item>
          </fc-menu>
        </fc-menu-item>
      </fc-menu>
    `)
    const menuitem = menu.querySelector<FCMenuItem>('#first-item')!

    expect(menuitem.expanded, 'before mouseenter').be.false
    menuitem.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))

    await aTimeout(999)
    expect(menuitem.expanded, 'before delay').be.false

    await aTimeout(1)
    expect(menuitem.expanded, 'after delay').be.true
  })

  it('should keep expanded and focus status when mouse leave out from menu', async () => {
    const menu: FCMenu = await fixture(html`
      <fc-menu>
        <fc-menu-item expanded>
          <span>foo</span>
          <fc-menu slot="submenu">
            <fc-menu-item>bar</fc-menu-item>
          </fc-menu>
        </fc-menu-item>
      </fc-menu>
    `)

    const menuitem = menu.querySelector<FCMenuItem>('[expanded]')!

    expect(menuitem.expanded, 'before mouseleave').be.true
    menuitem.focus()
    const mouseleave = new MouseEvent('mouseleave')
    menuitem.dispatchEvent(mouseleave)
    await elementUpdated(menuitem)
    expect(menuitem.expanded, 'after mouseleave').be.true
    expect(menuitem, 'keep focus').eq(document.activeElement)
  })

  it('should be collapse when children item focus out', async () => {
    const menu: FCMenu = await fixture(html`
      <fc-menu>
        <fc-menu-item expanded>
          <span>foo</span>
          <fc-menu slot="submenu">
            <fc-menu-item id="bar">bar</fc-menu-item>
          </fc-menu>
        </fc-menu-item>
      </fc-menu>
    `)

    const menuitem = menu.querySelector<FCMenuItem>('[expanded]')!
    const bar = menuitem.querySelector<FCMenuItem>('#bar')!
    bar.focus()
    bar.blur()
    await elementUpdated(menuitem)
    expect(menuitem.expanded).be.false
    expect(menuitem, 'keep focus').eq(document.activeElement)
  })

  it('should collapse submenu when pressed Escape key', async () => {
    const menu: FCMenu = await fixture(html`
      <fc-menu>
        <fc-menu-item expanded>
          <span>foo</span>
          <fc-menu slot="submenu">
            <fc-menu-item id="bar">bar</fc-menu-item>
          </fc-menu>
        </fc-menu-item>
      </fc-menu>
    `)

    const menuitem = menu.querySelector<FCMenuItem>('[expanded]')!
    await nextFrame()
    // set expand will auto focus the first item
    const bar = menuitem.querySelector<FCMenuItem>('#bar')!
    bar.focus()
    bar.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await elementUpdated(menuitem)
    expect(menuitem.expanded).to.be.false
  })
})
