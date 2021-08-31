import { expect } from '@open-wc/testing'
import './index'

describe('fc-panel', function () {
  it('should not throw error', async () => {
    expect(() => document.createElement('fc-panel')).not.throw()
  })
})
