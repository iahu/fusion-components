import { expect } from '@open-wc/testing'
import './index'

describe('fc-tooltip', function () {
  it('should not throw error', async () => {
    expect(() => document.createElement('fc-tooltip')).not.throw()
  })
})
