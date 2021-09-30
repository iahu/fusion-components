import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { ignoreInitChanged, observer } from '../decorators'
import FormAssociated from '../form-associated'
import { onEvent } from '../helper'
import mergeStyles from '../merge-styles'
import { after, before } from '../pattern/before-after'
import style from './style.css'

const createProxy = () => document.createElement('input')

@customElement('fc-button')
export class FCButton extends FormAssociated {
  static styles = mergeStyles(style)

  constructor() {
    super(createProxy())
  }

  connectedCallback(): void {
    super.connectedCallback()
    onEvent(this, 'click', this.handleClick)
    onEvent(this, 'keydown', this.handleKeydown)

    if (this.hasAttribute('autofocus') && !document.activeElement) {
      if (!this.hasAttribute('tabindex')) {
        this.setAttribute('tabindex', '0')
      }
      this.focus({ preventScroll: true })
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.proxy.removeEventListener('click', this.handleSubmission)
    this.proxy.removeEventListener('click', this.handleClick)
    this.proxy.removeEventListener('click', this.handleReset)
  }

  @observer({ type: 'boolean' })
  autofocus = false

  @observer({ type: 'boolean', reflect: true })
  disabled = false
  disabledChanged(old: boolean, next: boolean): void {
    this.proxy.toggleAttribute('disabled', next)
  }

  @observer({ reflect: true })
  type: 'button' | 'submit' | 'reset' | 'menu' = 'button'
  typeChanged(old: string, next: string): void {
    if (this.proxy instanceof HTMLInputElement) {
      this.proxy.type = next
    }

    switch (old) {
      case 'submit':
        this.removeEventListener('click', this.handleSubmission)
        break
      case 'reset':
        this.removeEventListener('click', this.handleReset)
        break
      default:
        this.removeEventListener('click', this.handleClick)
        break
    }

    switch (next) {
      case 'submit':
        onEvent(this, 'click', this.handleSubmission)
        break
      case 'reset':
        onEvent(this, 'click', this.handleReset)
        break
      default:
        onEvent(this, 'click', this.handleClick)
        break
    }
  }

  @observer({ hasChanged: ignoreInitChanged })
  formid = ''
  formidChanged(old: string, next: string): void {
    this.proxy.setAttribute('form', next)
  }

  @observer({ hasChanged: ignoreInitChanged })
  formaction = ''
  formactionChanged(old: string, next: string): void {
    this.proxy.setAttribute('formaction', next)
  }

  @observer({ hasChanged: ignoreInitChanged })
  formenctype = ''
  formenctypeChanged(old: string, next: string): void {
    this.proxy.setAttribute('formenctype', next)
  }

  @observer({ hasChanged: ignoreInitChanged })
  formnovalidate = ''
  formnovalidateChanged(old: string, next: string): void {
    this.proxy.setAttribute('formnovalidate', next)
  }

  @observer({ hasChanged: ignoreInitChanged })
  formtarget: '_self' | '_blank' | '_parent' | '_top' = '_self'
  formtargetChanged(old: string, next: string): void {
    this.proxy.setAttribute('formtarget', next)
  }

  // name
  // value

  @observer({ reflect: true, hasChanged: ignoreInitChanged })
  selectable = false
  selectableChanged(old: boolean, next: boolean): void {
    this.selected = this.hasAttribute('selected')
  }

  @observer({ reflect: true })
  selected = false
  protected selectedChanged(old: boolean, next: boolean): void {
    if (!this.selectable) {
      Reflect.set(this, 'selected', false)
      return
    }
    this.setAttribute('aria-pressed', next.toString())
    this.emit('select')
  }

  @observer({ reflect: true })
  outline = false

  @observer()
  readonly = false
  readonlyChanged(old: boolean, next: boolean): void {
    this.toggleAttribute('readonly', next)
  }

  @observer({ type: 'boolean', reflect: true })
  sharp = false

  @observer()
  accent: 'primary' | 'scondary' | 'ghost' = 'primary'

  @observer()
  hotkey?: string

  @observer({ reflect: true })
  tabIndex = 0

  handleClick(e: Event): void {
    if (this.disabled) {
      // should not fire click event.
      e.stopImmediatePropagation()
    }

    setTimeout(() => {
      if (!e.defaultPrevented && this.selectable) {
        e.preventDefault()
        this.selected = !this.selected
      }
    })
  }

  handleSubmission(e: Event): void {
    setTimeout(() => {
      if (e.defaultPrevented) return
      if (typeof this.form?.requestSubmit === 'function' && this.proxy) {
        this.form.requestSubmit()
      } else if (this.form) {
        this.form.submit()
      } else {
        this.proxy?.click()
      }
    })
  }

  handleReset(e: Event): void {
    if (!e.defaultPrevented) {
      if (typeof this.form?.reset === 'function') this.form.reset()
    }
  }

  handleKeydown(e: KeyboardEvent): void {
    if (e.target === this && [' ', 'Enter'].includes(e.key)) {
      e.preventDefault()
      this.emit('click', { originalEvent: e })
    }
  }

  render(): TemplateResult<1> {
    return html`
      ${before()}
      <slot></slot>
      ${after()}
    `
  }
}
