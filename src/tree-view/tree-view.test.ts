import { expect, fixture, html, nextFrame } from '@open-wc/testing'
import { FCTreeItem } from '../tree-item'
import './index'
import { FCTreeView } from './index'

describe('fc-tree-view', function () {
  it('should not throw error', async () => {
    expect(() => document.createElement('fc-tree-view')).not.throw()
  })

  it('should has a value of foo', async () => {
    const treeView: FCTreeView = await fixture(html`<fc-tree-view value="foo">
      <fc-tree-item></fc-tree-item>
      <fc-tree-item></fc-tree-item>
      <fc-tree-item></fc-tree-item>
    </fc-tree-view>`)

    await nextFrame()
    expect(treeView.value).to.eq('foo')
  })

  it('should select the item value of bar', async () => {
    const treeView: FCTreeView = await fixture(html`<fc-tree-view value="bar">
      <fc-tree-item value="foo"></fc-tree-item>
      <fc-tree-item value="bar"></fc-tree-item>
      <fc-tree-item value="baz"></fc-tree-item>
    </fc-tree-view>`)

    await nextFrame()
    expect(treeView.selectedItem).eq(treeView.items![1])
    expect(treeView.querySelector<FCTreeItem>('[value="bar"]')!.selected).to.be.true
  })

  it('should has a items property of its children', async () => {
    const treeView: FCTreeView = await fixture(html`<fc-tree-view>
      <fc-tree-item></fc-tree-item>
      <fc-tree-item></fc-tree-item>
      <fc-tree-item></fc-tree-item>
    </fc-tree-view>`)

    await nextFrame()
    expect(treeView.items!.length).to.eq(3)
    expect(treeView.items).members(Array.from(treeView.querySelectorAll('fc-tree-item')))
  })

  it('should focus the second item', async () => {
    const tree: FCTreeView = await fixture(html`<fc-tree-view>
      <fc-tree-item>foo</fc-tree-item>
      <fc-tree-item>bar</fc-tree-item>
    </fc-tree-view>`)

    const firstItem = tree.items![0]
    const secondItem = tree.items![1]
    firstItem.focus()
    firstItem.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))

    await nextFrame()
    expect(secondItem.tabIndex).eq(0)
    expect(secondItem).eq(document.activeElement)
  })

  it('should focus the first item', async () => {
    const tree: FCTreeView = await fixture(html`<fc-tree-view>
      <fc-tree-item>foo</fc-tree-item>
      <fc-tree-item>bar</fc-tree-item>
    </fc-tree-view>`)

    const firstItem = tree.items![0]
    const secondItem = tree.items![1]
    secondItem.focus()
    secondItem.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }))

    await nextFrame()
    expect(firstItem.tabIndex).eq(0)
    expect(firstItem).eq(document.activeElement)
  })

  it('should expand the sub tree and focus the first item of sub tree', async () => {
    const tree: FCTreeView = await fixture(html`<fc-tree-view>
      <fc-tree-item>
        <span>foo</span>
        <fc-tree-item id="bar">bar</fc-tree-item>
      </fc-tree-item>
    </fc-tree-view>`)

    const firstItem = tree.items![0]
    firstItem.focus()
    firstItem.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))

    await nextFrame()
    expect(firstItem.expanded).be.true
    expect(firstItem.items![0]).eq(document.activeElement)
  })

  it('should focus the parent item', async () => {
    const tree: FCTreeView = await fixture(html`<fc-tree-view>
      <fc-tree-item id="foo" expanded>
        <span>foo</span>
        <fc-tree-item id="bar">bar</fc-tree-item>
      </fc-tree-item>
    </fc-tree-view>`)

    const bar = tree.querySelector<FCTreeItem>('#bar')!
    bar.focus()
    bar.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }))

    await nextFrame()
    const foo = tree.querySelector<FCTreeItem>('#foo')!
    expect(foo.expanded).be.true
    expect(foo.hasAttribute('focused')).be.true
    expect(foo).eq(document.activeElement)
  })

  it('should collapse the current expaned item', async () => {
    const tree: FCTreeView = await fixture(html`<fc-tree-view>
      <fc-tree-item id="foo" expanded>
        <span>foo</span>
        <fc-tree-item id="bar">bar</fc-tree-item>
      </fc-tree-item>
    </fc-tree-view>`)

    const foo = tree.querySelector<FCTreeItem>('#foo')!
    foo.focus()
    foo.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }))

    await nextFrame()
    expect(foo.expanded).be.false
    expect(foo).eq(document.activeElement)
  })
})
