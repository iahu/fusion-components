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

    this.renderRoot.ownerDocument.addEventListener('keydown', this.handleKeydown)
  }
  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.renderRoot.ownerDocument.removeEventListener('keydown', this.handleKeydown)
  }

  @observer()
  anchor: string | null = this.getAttribute('anchor')
  protected anchorChanged(): void {
    const { anchor } = this
    if (anchor) {
      // removeEventListener on old elements
      this.anchorElements?.forEach((e) => e.removeEventListener('click', this.handleClick))
      this.anchorElements = Array.from(this.renderRoot.ownerDocument.querySelectorAll(anchor))
      // addEventListener on new elements
      this.anchorElements.forEach((e) => e.addEventListener('click', this.handleClick))
    }
  }

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
