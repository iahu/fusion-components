import { expect } from '@open-wc/testing'
import './index'

describe('fc-data-grid-cell', function () {
  it('should not throw error', async () => {
    expect(() => document.createElement('fc-data-grid-cell')).not.throw()
  })
})
