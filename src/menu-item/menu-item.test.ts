import { expect, fixture, html } from '@open-wc/testing'

import './index'
import type { FCMenuItem } from './index'

describe('fc-menu-item', function () {
  it('should not throw error when createElement', async () => {
    expect(() => document.createElement('fc-menu-item')).not.throw()
  })

  it('should has a "menu-item" role', async () => {
    const menuItem: FCMenuItem = await fixture(html`<fc-menu-item></fc-menu-item>`)

    expect(menuItem.role).to.eq('menuitem')
  })
})
