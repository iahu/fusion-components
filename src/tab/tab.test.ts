import { expect } from '@open-wc/testing'
import './index'

describe('fc-tab', function () {
  it('should not throw error', async () => {
    expect(() => document.createElement('fc-tab')).not.throw()
  })
})
