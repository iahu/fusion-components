import { LitElement, PropertyValues } from 'lit'

export const queryAll = function <T extends Element>(selector?: string) {
  return function (proto: LitElement, key: string): void {
    const willUpdate = proto.willUpdate
    proto.willUpdate = function (this: LitElement, props: PropertyValues) {
      willUpdate.call(this, props)
      if (selector) {
        Reflect.set(this, key, Array.from(this.querySelectorAll<T>(selector)))
      }
    }
  }
}
