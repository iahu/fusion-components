import { expect } from '@open-wc/testing'
import './index'

describe('fc-panel-header', function () {
  it('should not throw error', async () => {
    expect(() => document.createElement('fc-panel-header')).not.throw()
  })
})
