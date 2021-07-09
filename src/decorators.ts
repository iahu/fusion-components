import { PropertyValues, ReactiveElement } from 'lit'

export const observer = () => (proto: any, propName: PropertyKey) => {
  const userUpdated = proto.updated
  proto.updated = function (this: ReactiveElement, changedProperties: PropertyValues) {
    userUpdated.call(this, changedProperties)

    changedProperties.forEach((v, k) => {
      const prev = (this as any)[k]
      if (prev === v) {
        return
      }

      const callbackName = String(k) + 'Changed'
      const callback = (this as any)[callbackName]
      if (typeof callback === 'function') {
        callback.call(this, prev, v)
      }
    })
  }
}
