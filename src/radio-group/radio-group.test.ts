import { expect } from '@open-wc/testing'
import './index'

describe('fc-radio-group', function () {
  it('should not throw error', async () => {
    expect(() => document.createElement('fc-radio-group')).not.throw()
  })
})
