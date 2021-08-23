import { LitElement, PropertyValues } from 'lit'
import { getCallback, shallowDiff } from '../helper'

export const query = function <T extends Element>(selector?: string, renderRoot = false) {
  return function (proto: LitElement, key: string): void {
    const willUpdate = proto.willUpdate
    proto.willUpdate = function (this: LitElement, props: PropertyValues) {
      willUpdate.call(this, props)
      if (selector) {
        const update = () => {
          const ctx = renderRoot ? this.renderRoot : this
          const nextValue = ctx.querySelector<T>(selector)
          const oldValue = Reflect.get(this, key)
          Reflect.set(this, key, nextValue)
          if (shallowDiff(oldValue, nextValue)) {
            getCallback(this, key)?.call(this, oldValue, nextValue)
          }
        }
        if (renderRoot) {
          this.updateComplete.then(update)
        } else {
          update()
        }
      }
    }
  }
}
