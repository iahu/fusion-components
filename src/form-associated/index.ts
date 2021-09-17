import { observer } from '../decorators'
import { FC } from '../fusion-component'

// copy from fast-element

/**
 * This file enables typing support for ElementInternals APIs.
 * It is largely taken from https://github.com/microsoft/TSJS-lib-generator/pull/818/files.
 *
 * When TypeScript adds support for these APIs we can delete this file.
 */

interface ValidityStateFlags {
  badInput?: boolean
  customError?: boolean
  patternMismatch?: boolean
  rangeOverflow?: boolean
  rangeUnderflow?: boolean
  stepMismatch?: boolean
  tooLong?: boolean
  tooShort?: boolean
  typeMismatch?: boolean
  valueMissing?: boolean
}

type FormValue = File | string | FormData | null

type Maybe<T> = T | undefined | null

/**
 * Source:
 * https://html.spec.whatwg.org/multipage/custom-elements.html#elementinternals
 */
interface ElementInternals {
  /**
   * Returns the form owner of internals target element.
   */
  readonly form: HTMLFormElement | null
  /**
   * Returns a NodeList of all the label elements that internals target element is associated with.
   */
  readonly labels: NodeList
  /**
   * Returns the error message that would be shown to the user if internals target element was to be checked for validity.
   */
  readonly validationMessage: string
  /**
   * Returns the ValidityState object for internals target element.
   */
  readonly validity: ValidityState
  /**
   * Returns true if internals target element will be validated when the form is submitted; false otherwise.
   */
  readonly willValidate: boolean
  /**
   * Returns true if internals target element has no validity problems; false otherwise. Fires an invalid event at the element in the latter case.
   */
  checkValidity(): boolean
  /**
   * Returns true if internals target element has no validity problems; otherwise,
   * returns false, fires an invalid event at the element, and (if the event isn't canceled) reports the problem to the user.
   */
  reportValidity(): boolean
  /**
   * Sets both the state and submission value of internals target element to value.
   *
   * While "null" isn't enumerated as a argument type (here)[https://html.spec.whatwg.org/multipage/custom-elements.html#the-elementinternals-interface],
   * In practice it appears to remove the value from the form data on submission. Adding it as a valid type here
   * becuase that capability is required for checkbox and radio types
   */
  setFormValue(value: FormValue, state?: FormValue): void
  /**
   * Marks internals target element as suffering from the constraints indicated by the flags argument,
   * and sets the element's validation message to message.
   * If anchor is specified, the user agent might use
   * it to indicate problems with the constraints of internals target
   * element when the form owner is validated interactively or reportValidity() is called.
   */
  setValidity(flags: ValidityStateFlags, message?: string, anchor?: HTMLElement): void
}

type ProxyElements = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement

declare global {
  interface Window {
    ElementInternals: ElementInternals & { prototype: Record<PropertyKey, unknown> }
  }
}

export const proxySlotName = 'form-associated-proxy'
export const supportsElementInternals =
  'ElementInternals' in window && 'setFormValue' in window.ElementInternals.prototype

export default class FormAssociated extends FC {
  static get formAssociated(): boolean {
    return supportsElementInternals
  }

  proxy: ProxyElements
  elementInternals?: ElementInternals

  public get InternalOrProxy(): ElementInternals | ProxyElements {
    return supportsElementInternals && this.elementInternals ? this.elementInternals : this.proxy
  }

  constructor(proxy: ProxyElements) {
    super()

    this.initialValue = this.value || ''
    this.required = false

    this.proxy = proxy || document.createElement('input')
    if (Reflect.has(this, 'attachInternals')) {
      this.elementInternals = (this as any).attachInternals()
    }
  }

  connectedCallback(): void {
    super.connectedCallback()

    this.addEventListener('keydown', this._handleKeydown)
    this.form?.addEventListener('reset', this.handleFormReset)
    this.initialValue = this.value || this.getAttribute('value') || this.initialValue

    if (!supportsElementInternals && this.proxy) {
      this.attachProxy()
    }
    this.proxy.addEventListener('invalid', this.handleProxyInvalid)
    this.proxy.addEventListener('change', this.handleProxyChange)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.removeEventListener('keydown', this._handleKeydown)
    this.form?.removeEventListener('reset', this.handleFormReset)
    if (!supportsElementInternals) {
      this.detachProxy()
    }
    this.proxy.removeEventListener('invalid', this.handleProxyInvalid)
    this.proxy.removeEventListener('change', this.handleProxyChange)

    this.value = undefined
  }

  initialValue: FormValue = ''

  dirtyValue = false

  proxySlot?: HTMLSlotElement | null

  private proxyInitialized = false

  proxyEventsToBlock = ['change', 'click']

  #stopPropagation = (e: Event) => {
    e.stopPropagation()
  }

  /**
   * Attach the proxy element to the DOM
   */
  public attachProxy(): void {
    if (!this.proxyInitialized) {
      this.proxyInitialized = true
      // display: none; 不能获取焦点，也不能显示校验信息
      this.proxy.style.cssText = 'position: absolute; margin: 0; z-index: -1; opacity: 0; pointer-events: none;'
      this.proxyEventsToBlock.forEach(name => this.proxy.addEventListener(name, this.#stopPropagation))

      // These are typically mapped to the proxy during
      // property change callbacks, but during initialization
      // on the initial call of the callback, the proxy is
      // still undefined. We should find a better way to address this.
      this.proxy.disabled = this.disabled
      this.proxy.required = this.required
      if (typeof this.name === 'string') {
        this.proxy.name = this.name
      }

      if (typeof this.value === 'string') {
        this.proxy.value = this.value
      }

      this.proxy.setAttribute('slot', proxySlotName)
      this.appendChild(this.proxy)

      this.updateComplete.then(() => {
        const proxySlot = this.renderRoot.querySelector<HTMLSlotElement>(`slot[${proxySlotName}]`)
        if (proxySlot) {
          this.proxySlot = proxySlot
        } else {
          this.proxySlot = document.createElement('slot')
          this.proxySlot.setAttribute('name', proxySlotName)

          this.shadowRoot?.appendChild(this.proxySlot as HTMLSlotElement)
        }
      })
    }
  }

  /**
   * Detach the proxy element from the DOM
   */
  public detachProxy(): void {
    this.removeChild(this.proxy)
    if (this.proxySlot) {
      this.shadowRoot?.removeChild(this.proxySlot as HTMLSlotElement)
    }
  }

  public get form(): Maybe<HTMLFormElement> {
    if (supportsElementInternals && this.elementInternals) {
      return this.elementInternals.form
    }

    return this.proxy.closest('form')
  }

  public get labels(): ReadonlyArray<Node> {
    return Object.freeze(Array.from(this.InternalOrProxy.labels || []))
  }

  public get validationMessage(): Maybe<string> {
    return this.InternalOrProxy.validationMessage
  }

  public get validated(): ValidityState {
    return this.InternalOrProxy.validity
  }

  public get willValidate(): boolean {
    return this.InternalOrProxy.willValidate
  }

  checkValidity(): boolean {
    return this.InternalOrProxy.checkValidity()
  }

  reportValidity(): boolean {
    return this.InternalOrProxy.reportValidity()
  }

  setFormValue(value: FormValue, state?: FormValue): void {
    if (supportsElementInternals && this.elementInternals) {
      this.elementInternals.setFormValue(value, state)
    }
  }

  setValidity(flags: ValidityStateFlags, message?: string, anchor?: HTMLElement): void {
    if (supportsElementInternals && this.elementInternals) {
      this.elementInternals.setValidity(flags, message, anchor)
    } else if (typeof message === 'string') {
      this.proxy.setCustomValidity(message)
    }
  }

  public get validity(): ValidityState {
    return this.InternalOrProxy.validity
  }

  @observer({ reflect: true })
  name = ''
  nameChanged(old: string, next: string): void {
    if (this.proxy) {
      this.proxy.name = next
    }
  }

  @observer<FormAssociated, FormValue>({
    type: 'any',
    converter(v, host) {
      const { proxy } = host
      if (proxy instanceof HTMLInputElement && proxy.type === 'file') {
        console.error('Failed to set value on File Input')
        return host.value
      }
      return v
    },
    tempKey: '_.value',
  })
  value?: FormValue
  protected valueChanged(old: FormValue, next: FormValue): void {
    this.dirtyValue = true
    const { proxy } = this

    if (!supportsElementInternals) {
      if (typeof next === 'string') {
        proxy.value = next
      } else if (next === null) {
        proxy.value = ''
      }
    }
    this.setFormValue(next)
    this.validate()
  }

  validate(): void {
    if (this.proxy instanceof HTMLElement) {
      this.setValidity(this.proxy.validity, this.proxy.validationMessage)
    }
  }

  @observer({ type: 'boolean', reflect: true })
  disabled = false

  @observer({ type: 'boolean' })
  required = false
  requiredChanged(old: boolean, next: boolean): void {
    if (this.proxy instanceof HTMLElement) {
      this.proxy.required = next
    }
    this.validate()
  }

  private _handleKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter' && e.target instanceof HTMLEmbedElement) {
      this.form?.submit()
    }
  }

  handleFormReset(): void {
    this.value = this.initialValue
    this.dirtyValue = false
  }

  handleProxyInvalid(e: Event): void {
    if (e.isTrusted) {
      this.dispatchEvent(new CustomEvent('invalid', { detail: e, bubbles: true, composed: true }))
    }
  }

  handleProxyChange = (e: Event): void => {
    const { proxy } = this
    if (proxy instanceof HTMLInputElement && proxy.type === 'file') {
      const { files } = proxy
      if (!files) return
      let value = ''
      if (files.length === 1) {
        value = proxy.value.split(/[/\\]/g).pop() ?? ''
      } else if (files.length > 1) {
        value = `${files.length} 个文件`
      }

      Reflect.set(this, '_.value', value)
      this.requestUpdate('value')
    } else {
      this.value = proxy.value
    }
    this.checkValidity()
  }
}
