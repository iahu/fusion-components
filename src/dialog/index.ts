import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { observer } from '../decorators'
import { FC } from '../fusion-component'
import mergeStyles from '../merge-styles'
import style from './style.css'

@customElement('fc-dialog')
export class FCDialog extends FC {
  static styles = mergeStyles(style)

  connectedCallback(): void {
    super.connectedCallback()

    this.addEventListener('keydown', this.handleKeydown)
    this.addEventListener('close', this.handleClose)
  }
  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.removeEventListener('keydown', this.handleKeydown)
    this.removeEventListener('close', this.handleClose)
  }

  @observer({ initCallback: true })
  anchor: string | null = this.getAttribute('anchor')
  anchorChanged(): void {
    const { anchor } = this
    if (anchor) {
      // removeEventListener on old elements
      this.anchorElements?.forEach(e => e.removeEventListener('click', this.handleClick))
      this.anchorElements = Array.from(this.renderRoot.ownerDocument.querySelectorAll(anchor))
      // addEventListener on new elements
      this.anchorElements.forEach(e => e.addEventListener('click', this.handleClick))
    }
  }

  @observer({ reflect: true })
  modal = true

  @observer({ attribute: 'overlay-closable' })
  overlayClosable = true

  @observer({ reflect: true })
  tabindex = '-1'

  @observer({ attribute: 'esc-closable' })
  escClosable = true

  private anchorElements?: HTMLElement[] | null
  private currentAnchorElement?: HTMLElement | null

  @observer({ reflect: true })
  hidden = true
  hiddenChanged(old: boolean, next: boolean): void {
    if (!next) {
      this.updateComplete.then(() => {
        this.focus()
      })
    }
    if (typeof old === 'boolean') {
      this.emit('change', { old, next })
      this.emit('visibleChange', { old, next })
    }
  }

  @observer({ reflect: true })
  role = 'dialog'

  show(): void {
    this.hidden = false
  }

  hide(): void {
    this.hidden = true
  }

  handleClick = (e: MouseEvent): void => {
    const { target } = e
    const { anchor } = this

    if (target instanceof HTMLElement && anchor && target.closest(anchor)) {
      e.preventDefault()
      this.hidden = false
    }
  }

  handleKeydown = (e: KeyboardEvent): void => {
    if (this.escClosable && e.key === 'Escape' && e.target === this) {
      e.preventDefault()
      this.hidden = true
    }
  }

  handleClose(e: Event): void {
    const matched = e instanceof CustomEvent && e.detail && this.matches(e.detail)
    if (matched) {
      this.hidden = true
    }
  }

  handleClickOverlay = (e: MouseEvent): void => {
    e.preventDefault()
    if (this.overlayClosable) {
      this.hidden = true
      this.emit('dismiss')
    }
  }

  render(): TemplateResult<1> {
    return html`
      ${this.modal
        ? html`<div
            class="overlay"
            part="overlay"
            role="presentation"
            tabindex="0"
            @click="${this.handleClickOverlay}"
          ></div>`
        : ''}
      <div class="control" part="control" role="dialog">
        <slot name="dialog-header"></slot>
        <slot></slot>
      </div>
    `
  }
}
