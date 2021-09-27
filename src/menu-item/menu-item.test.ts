import { elementUpdated, expect, fixture, html, nextFrame } from '@open-wc/testing'
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

  it('should change menuitemcheckbox\'s "checked" to true when check on', async () => {
    const menuitemcheckbox: FCMenuItem = await fixture(html`<fc-menu-item role="menuitemcheckbox"></fc-menu-item>`)
    menuitemcheckbox.click()
    await elementUpdated(menuitemcheckbox)
    expect(menuitemcheckbox.checked, 'menuitemcheckbox').to.be.true
  })

  it('should change menuitemradio\'s "checked" to true when click on', async () => {
    const menuitemradio: FCMenuItem = await fixture(html`<fc-menu-item role="menuitemradio"></fc-menu-item>`)
    menuitemradio.click()
    await elementUpdated(menuitemradio)
    expect(menuitemradio.checked, 'menuitemradio').to.be.true
  })

  it('should not change "checked" to false, event it is menuitemradio', async () => {
    const menuitemcheckbox: FCMenuItem = await fixture(html`<fc-menu-item role="menuitem" checked></fc-menu-item>`)

    await nextFrame()
    expect(menuitemcheckbox.checked, 'before').to.be.true
    menuitemcheckbox.click()
    await elementUpdated(menuitemcheckbox)
    expect(menuitemcheckbox.checked, 'after').to.be.false
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
})
