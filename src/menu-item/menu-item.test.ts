import { aTimeout, elementUpdated, expect, fixture, html, nextFrame } from '@open-wc/testing'

import '../menu'
import './index'
import type { FCMenuItem } from './index'

describe('fc-menu-item', function () {
  it('should not throw error when createElement', () => {
    expect(() => document.createElement('fc-menu-item')).not.throw()
  })

  it('should has a "menu-item" role', async () => {
    const menuItem: FCMenuItem = await fixture(html`<fc-menu-item></fc-menu-item>`)

    expect(menuItem.role).to.eq('menuitem')
  })

  it('should be disabled', async () => {
    const menuItem: FCMenuItem = await fixture(html`<fc-menu-item disabled></fc-menu-item>`)

    expect(menuItem.disabled).to.eq(true)
  })

  it('should not be checked', async () => {
    const menuItem: FCMenuItem = await fixture(html`<fc-menu-item></fc-menu-item>`)
    expect(menuItem.checked).not.to.be.true
  })

  it('should be checked', async () => {
    const menuitemcheckbox: FCMenuItem = await fixture(
      html`<fc-menu-item checked role="menuitemcheckbox"></fc-menu-item>`
    )
    expect(menuitemcheckbox.checked).to.be.true

    const menuitemradio: FCMenuItem = await fixture(html`<fc-menu-item checked role="menuitemradio"></fc-menu-item>`)
    expect(menuitemradio.checked).to.be.true
  })

  it('should not change "checked", as role is menuitem', async () => {
    const menuitemcheckbox: FCMenuItem = await fixture(html`<fc-menu-item role="menuitem"></fc-menu-item>`)
    menuitemcheckbox.click()
    await elementUpdated(menuitemcheckbox)
    expect(menuitemcheckbox.checked, 'menuitem').to.be.false
  })

  it('should change "checked" to true', async () => {
    const menuitemcheckbox: FCMenuItem = await fixture(html`<fc-menu-item role="menuitemcheckbox"></fc-menu-item>`)
    menuitemcheckbox.click()
    await elementUpdated(menuitemcheckbox)
    expect(menuitemcheckbox.checked, 'menuitemcheckbox').to.be.true

    const menuitemradio: FCMenuItem = await fixture(html`<fc-menu-item role="menuitemradio"></fc-menu-item>`)
    menuitemradio.click()
    await elementUpdated(menuitemradio)
    expect(menuitemradio.checked, 'menuitemradio').to.be.true
  })

  it('should be checked when pressed enter', async () => {
    const menuitemcheckbox: FCMenuItem = await fixture(html`<fc-menu-item role="menuitemcheckbox"></fc-menu-item>`)
    const keydown = new KeyboardEvent('keydown', { key: 'Enter' })
    menuitemcheckbox.dispatchEvent(keydown)

    await elementUpdated(menuitemcheckbox)
    expect(menuitemcheckbox.checked, 'when pressed enter').to.be.true
  })

  it('should has submenu', async () => {
    const menuitem: FCMenuItem = await fixture(html`<fc-menu-item>
      <span>foo</span>
      <fc-menu slot="submenu">
        <fc-menu-item>bar</fc-menu-item>
      </fc-menu>
    </fc-menu-item>`)

    expect(menuitem.submenu).not.be.empty
    expect(menuitem.submenu).to.members([menuitem.querySelector('fc-menu')])
  })

  it('should be expanded', async () => {
    const menuitem: FCMenuItem = await fixture(html`<fc-menu-item expanded>
      <span>foo</span>
      <fc-menu slot="submenu">
        <fc-menu-item>bar</fc-menu-item>
      </fc-menu>
    </fc-menu-item>`)

    await elementUpdated(menuitem)
    expect(menuitem.expanded).be.true

    await nextFrame()
    menuitem.expanded = false
    await elementUpdated(menuitem)
    expect(menuitem.expanded).be.false
  })

  it('should change expanded to `true` when mouseenter', async () => {
    const menuitem: FCMenuItem = await fixture(html`<fc-menu-item mouseenterDelay="0">
      <span>foo</span>
      <fc-menu slot="submenu">
        <fc-menu-item>bar</fc-menu-item>
      </fc-menu>
    </fc-menu-item>`)

    expect(menuitem.expanded, 'before mouseenter').be.false
    const mouseenter = new MouseEvent('mouseenter')
    menuitem.dispatchEvent(mouseenter)
    await elementUpdated(menuitem)
    expect(menuitem.expanded, 'after mouseenter').be.true
  })

  it('should delay 1s to open submenu', async () => {
    const menuitem: FCMenuItem = await fixture(html`<fc-menu-item mouseenterDelay="1000">
      <span>foo</span>
      <fc-menu slot="submenu">
        <fc-menu-item>bar</fc-menu-item>
      </fc-menu>
    </fc-menu-item>`)

    expect(menuitem.expanded, 'before mouseenter').be.false
    const mouseenter = new MouseEvent('mouseenter')
    menuitem.dispatchEvent(mouseenter)

    await aTimeout(900)
    expect(menuitem.expanded, 'before delay').be.false

    await aTimeout(1000)
    expect(menuitem.expanded, 'after delay').be.true
  })

  it('should change expanded to `false` when mouseleave', async () => {
    const menuitem: FCMenuItem = await fixture(html`<fc-menu-item expanded>
      <span>foo</span>
      <fc-menu slot="submenu">
        <fc-menu-item>bar</fc-menu-item>
      </fc-menu>
    </fc-menu-item>`)

    expect(menuitem.expanded, 'before mouseleave').be.true
    const mouseleave = new MouseEvent('mouseleave')
    menuitem.dispatchEvent(mouseleave)
    await elementUpdated(menuitem)
    expect(menuitem.expanded, 'after mouseleave').be.false
  })

  it('should un-expanded while children blur', async () => {
    const menuitem: FCMenuItem = await fixture(html`<fc-menu-item expanded>
      <span>foo</span>
      <fc-menu slot="submenu">
        <fc-menu-item id="bar">bar</fc-menu-item>
      </fc-menu>
    </fc-menu-item>`)
    const bar = menuitem.querySelector<FCMenuItem>('#bar')!
    bar.focus()
    bar.blur()
    await elementUpdated(menuitem)
    expect(menuitem.expanded).be.false
  })

  it('should focus first menu item of submenu', async () => {
    const menuitem: FCMenuItem = await fixture(html`<fc-menu-item>
      <span>foo</span>
      <fc-menu slot="submenu">
        <fc-menu-item id="foo">foo</fc-menu-item>
        <fc-menu-item id="bar">bar</fc-menu-item>
        <fc-menu-item id="baz">baz</fc-menu-item>
      </fc-menu>
    </fc-menu-item>`)

    menuitem.focus()
    await nextFrame()
    menuitem.expanded = true
    const foo = menuitem.querySelector<FCMenuItem>('#foo')!
    await elementUpdated(menuitem)
    expect(document.activeElement).to.eq(foo)
  })

  it('should close submenu when it lost focus', async () => {
    const menuitem: FCMenuItem = await fixture(html`<fc-menu-item expanded>
      <span>foo</span>
      <fc-menu slot="submenu">
        <fc-menu-item>bar</fc-menu-item>
      </fc-menu>
    </fc-menu-item>`)

    await nextFrame()

    menuitem.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await elementUpdated(menuitem)
    expect(menuitem.expanded).to.be.false
  })
})
