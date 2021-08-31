import { expect } from '@open-wc/testing'
import './index'

describe('fc-icon', function () {
  it('should not throw error', async () => {
    expect(() => document.createElement('fc-icon')).not.throw()
  })
})
