import { expect } from '@open-wc/testing'
import './index'

describe('fc-tree-view', function () {
  it('should not throw error', async () => {
    expect(() => document.createElement('fc-tree-view')).not.throw()
  })
})
