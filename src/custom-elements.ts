type Newable = {
  new (...args: unknown[]): unknown
}

const define = Reflect.get(customElements, 'define')

Object.defineProperty(customElements, 'define', {
  value: function (name: string, constructor: Newable, options?: { extends?: HTMLElement }) {
    if (customElements.get(name)) {
      console.warn(`re-define customElement: ${name}`)
      return
    }

    return Reflect.apply(define, this, [name, constructor, options])
  },
})
