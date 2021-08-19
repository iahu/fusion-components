import { expect } from '@open-wc/testing'

import './index'

describe('fc-data-grid', function () {
  it('should not throw error when createElement', async () => {
    expect(() => document.createElement('fc-data-grid')).not.to.throw()
  })
})
