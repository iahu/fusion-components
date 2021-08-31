import { expect } from '@open-wc/testing'
import './index'

describe('fc-tree-item', function () {
  it('should not throw error', async () => {
    expect(() => document.createElement('fc-tree-item')).not.throw()
  })
})
