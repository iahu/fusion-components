import { expect } from '@open-wc/testing'
import { PromiseLike } from './index'

describe('PromiseLike', function () {
  it('should return a then property', async () => {
    const promise = PromiseLike()
    expect(typeof promise.then).eq('function')
  })

  it('should chain initial function result to then method', async () => {
    const promise = PromiseLike(() => 'foo')
    promise.then(result => expect(result).eq('foo'))
  })

  it('should have a resolve method', async () => {
    expect(typeof PromiseLike.resolve).eq('function')
  })
})
