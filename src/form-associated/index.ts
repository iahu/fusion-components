import { PropertyValues } from 'lit'
import { property } from 'lit/decorators.js'
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

export default class FormAssociated extends FC {
  static formAssociated = true
  elementInternals: ElementInternals

  constructor() {
    super()

    this.elementInternals = (this as any).attachInternals()
  }

  connectedCallback(): void {
    super.connectedCallback()

    this.initialValue = this.value || this.getAttribute('value') || this.initialValue
  }

  willUpdate(p: PropertyValues<this>): void {
    super.willUpdate(p)
    this.value = this.getAttribute('value') || this.value
    this.disabled = this.hasAttribute('disabled')
    this.required = this.hasAttribute('required')
    if (this.name) this.setAttribute('name', this.name)
    else this.removeAttribute('name')

    this.elementInternals.setFormValue(this.value)
    this.setAttribute('aria-disabled', this.disabled.toString())
    this.setAttribute('aria-required', this.required.toString())
    if (this.initialValue !== this.value) {
      this.dirtyValue = true
    }
  }

  initialValue = ''

  dirtyValue = false

  public get form(): HTMLFormElement | null {
    return this.elementInternals.form
  }

  public get labels(): ReadonlyArray<Node> {
    return Object.freeze(Array.from(this.elementInternals.labels))
  }

  public get validationMessage(): string {
    return this.elementInternals.validationMessage
  }

  public get validated(): ValidityState {
    return this.elementInternals.validity
  }

  public get willValidate(): boolean {
    return this.elementInternals.willValidate
  }

  checkValidity(): boolean {
    return this.elementInternals.checkValidity()
  }

  reportValidity(): boolean {
    return this.elementInternals.reportValidity()
  }

  setFormValue(name: FormValue, value?: FormValue): void {
    this.elementInternals.setFormValue(name, value)
  }

  setValidity(flags: ValidityStateFlags, message?: string, anchor?: HTMLElement): void {
    this.elementInternals.setValidity(flags, message, anchor)
  }

  @property()
  name = ''

  @property()
  value = ''

  @property({ type: Boolean, reflect: true })
  disabled = this.hasAttribute('disabled')

  @property({ type: Boolean })
  required = this.hasAttribute('required')
}
