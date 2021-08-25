import { expect } from '@open-wc/testing'

import { FCTabs } from './index'
import './index'

describe('fc-tabs', function () {
  it('should not throw error when createElement', async () => {
    expect(() => document.createElement('fc-tabs') instanceof FCTabs).not.throw()
  })
})
