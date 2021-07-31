import { LitElement } from 'lit'

const assignedElements = function <T extends Element>(
  selector?: string,
  filterSelector?: string,
  options?: AssignedNodesOptions
) {
  return function (proto: LitElement, key: string): void {
    const userConnectedCallback = proto.connectedCallback
    proto.connectedCallback = function (this: LitElement) {
      userConnectedCallback.call(this)

      const getElements = () => {
        const mergedSelector = typeof selector === 'string' ? selector : 'slot:not([name])'
        const slots = Array.from(this.renderRoot.querySelectorAll<HTMLSlotElement>(mergedSelector) || [])

        const allElements = slots.reduce((allElements, slot) => {
          const elements = slot?.assignedElements(options ?? { flatten: true })
          const matched = (filterSelector ? elements?.filter(e => e.matches(filterSelector)) : elements) as T[]
          return allElements.concat(matched)
        }, [] as T[])

        Reflect.set(this, key, allElements)
      }

      this.updateComplete.then(getElements)
    }
  }
}

export default assignedElements
