import { expect } from '@open-wc/testing'
import './index'

describe('fc-input', function () {
  it('should not throw error', async () => {
    expect(() => document.createElement('fc-input')).not.throw()
  })
})
