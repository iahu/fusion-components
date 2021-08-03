import { LitElement } from 'lit'

export const queryAll = function <T extends Element>(selector?: string) {
  return function (proto: LitElement, key: string): void {
    const userConnectedCallback = proto.connectedCallback
    proto.connectedCallback = function (this: LitElement) {
      userConnectedCallback.call(this)
      if (selector) {
        Reflect.set(this, key, Array.from(this.querySelectorAll<T>(selector)))
      }
    }
  }
}
