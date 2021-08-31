import { expect } from '@open-wc/testing'
import './index'

describe('fc-number-field', function () {
  it('should not throw error', async () => {
    expect(() => document.createElement('fc-number-field')).not.throw()
  })
})
