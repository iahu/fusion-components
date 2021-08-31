import { expect } from '@open-wc/testing'
import './index'

describe('fc-dialog', function () {
  it('should not throw error', async () => {
    expect(() => document.createElement('fc-dialog')).not.throw()
  })
})
