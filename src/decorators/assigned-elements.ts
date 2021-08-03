import { LitElement } from 'lit'

export const assignedElements = function <T extends Element>(
  selector?: string,
  filterSelector?: string,
  options?: AssignedNodesOptions
) {
  return function (proto: LitElement, key: string): void {
    const userConnectedCallback = proto.connectedCallback
    proto.connectedCallback = function (this: LitElement) {
      userConnectedCallback.call(this)

      const getSlots = (selector?: string) => {
        const mergedSelector = typeof selector === 'string' ? selector : 'slot:not([name])'
        return Array.from(this.renderRoot.querySelectorAll<HTMLSlotElement>(mergedSelector) || [])
      }

      const getElements = () => {
        return getSlots(selector).reduce((allElements, slot) => {
          const elements = slot?.assignedElements(options)
          const matched = (filterSelector ? elements?.filter(e => e.matches(filterSelector)) : elements) as T[]
          return allElements.concat(matched)
        }, [] as T[])
      }

      const observer = () => {
        Reflect.set(this, key, getElements())

        // getSlots(selector).forEach(slot => {
        //   slot.addEventListener('slotchange', e => {
        //     Reflect.set(this, key, getElements())
        //   })
        // })
      }

      this.updateComplete.then(observer)
    }
  }
}
