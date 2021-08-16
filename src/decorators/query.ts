import { LitElement, PropertyValues } from 'lit'

export const query = function <T extends Element>(selector?: string, renderRoot = false) {
  return function (proto: LitElement, key: string): void {
    const willUpdate = proto.willUpdate
    proto.willUpdate = function (this: LitElement, props: PropertyValues) {
      willUpdate.call(this, props)
      if (selector) {
        const ctx = renderRoot ? this.renderRoot : this
        Reflect.set(this, key, ctx.querySelector<T>(selector))
      }
    }
  }
}
