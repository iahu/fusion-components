import { expect } from '@open-wc/testing'
import './index'

describe('fc-link', function () {
  it('should not throw error', async () => {
    expect(() => document.createElement('fc-link')).not.throw()
  })
})
