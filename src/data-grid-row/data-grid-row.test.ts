import { expect } from '@open-wc/testing'
import './index'

describe('fc-data-grid-row', function () {
  it('should not throw error', async () => {
    expect(() => document.createElement('fc-data-grid-row')).not.throw()
  })
})
