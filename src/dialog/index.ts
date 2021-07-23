import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { observer } from '../decorators'
import { FC } from '../fusion-component'
import mergeStyles from '../merge-styles'

import style from './style.css'

@customElement('fc-dialog')
export default class Dialog extends FC {
  static styles = mergeStyles(style)

  connectedCallback(): void {
    super.connectedCallback()

    this.anchor = this.getAttribute('anchor')
    if (this.anchor) {
      this.anchorElements = Array.from(this.renderRoot.ownerDocument.querySelectorAll(this.anchor))
      this.anchorElements.forEach((e) => e.addEventListener('click', this.handleClick))
    }
    this.renderRoot.ownerDocument.addEventListener('keydown', this.handleKeydown)
  }
  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.anchorElements?.forEach((e) => e.removeEventListener('click', this.handleClick))
    this.renderRoot.ownerDocument.removeEventListener('keydown', this.handleKeydown)
  }

  @observer()
  anchor: string | null = ''

  @observer({ reflect: true })
  modal = true

  @observer({ attribute: 'overlay-closable' })
  overlayClosable = true

  @observer({ attribute: 'esc-closable' })
  escClosable = true

  private anchorElements?: HTMLElement[] | null
  private currentAnchorElement?: HTMLElement | null

  @observer({ reflect: true })
  hidden = true
  hiddenChanged(): void {
    this.setAttribute('aria-hidden', this.hidden.toString())
  }

  @observer({ reflect: true })
  protected role = 'dialog'

  show(): void {
    this.hidden = false
  }

  hide(): void {
    this.hidden = true
  }

  handleClick = (e: MouseEvent): void => {
    e.preventDefault()
    this.hidden = false
  }

  handleKeydown = (e: KeyboardEvent): void => {
    if (this.escClosable && e.key === 'Escape') {
      e.preventDefault()
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
            tabindex="-1"
            @click="${this.handleClickOverlay}"
          ></div>`
        : ''}
      <div class="control" part="control" role="dialog">
        <slot></slot>
      </div>
    `
  }
}
