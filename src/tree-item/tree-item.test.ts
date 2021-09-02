import { expect, fixture, html, nextFrame } from '@open-wc/testing'
import './index'
import { FCTreeItem } from './index'

describe('fc-tree-item', function () {
  it('should not throw error', async () => {
    expect(() => document.createElement('fc-tree-item')).not.throw()
  })

  it('should be selected', async () => {
    const treeItem = await fixture<FCTreeItem>(html`<fc-tree-item selected>foo</fc-tree-item>`)
    await nextFrame()

    expect(treeItem.selected).be.true
  })

  it('should be selected when pressed Enter key', async () => {
    const treeItem = await fixture<FCTreeItem>(html`<fc-tree-item>foo</fc-tree-item>`)

    treeItem.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
    await nextFrame()

    expect(treeItem.selected).be.true
  })

  it('should be expanded', async () => {
    const treeItem = await fixture<FCTreeItem>(html`
      <fc-tree-item expanded>
        <span>foo</span>
        <fc-tree-item>bar</fc-tree-item>
      </fc-tree-item>
    `)
    await nextFrame()

    expect(treeItem.expanded).be.true
  })

  it('should be expanded when title is clicked', async () => {
    const treeItem = await fixture<FCTreeItem>(html`
      <fc-tree-item expandable>
        <span>foo</span>
        <fc-tree-item>bar</fc-tree-item>
      </fc-tree-item>
    `)

    treeItem.querySelector('span')!.click()

    await nextFrame()

    expect(treeItem.expanded).be.true
  })

  it('should be selected when pressed Space key', async () => {
    const treeItem = await fixture<FCTreeItem>(html`
      <fc-tree-item>
        <span>foo</span>
        <fc-tree-item>bar</fc-tree-item>
      </fc-tree-item>
    `)

    treeItem.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }))
    await nextFrame()

    expect(treeItem.expanded).be.true
  })

  it('should be selected when clicking on expand button', async () => {
    const treeItem = await fixture<FCTreeItem>(html`
      <fc-tree-item>
        <button slot="expand-collapse-button">cool</button>
        <span>foo</span>
        <fc-tree-item>bar</fc-tree-item>
      </fc-tree-item>
    `)

    treeItem.querySelector('button')!.click()
    await nextFrame()

    expect(treeItem.expanded).be.true
  })
})
