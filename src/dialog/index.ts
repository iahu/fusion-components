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

  @observer({ attribute: 'overlay-closable' })
  overlayClosable = false

  @observer({ attribute: 'esc-closable' })
  escClosable = false

  private anchorElements?: HTMLElement[] | null
  private currentAnchorElement?: HTMLElement | null

  @observer({ reflect: true })
  hidden = true
  hiddenChanged(): void {
    this.setAttribute('aria-hidden', this.hidden.toString())
  }

  @observer({ reflect: true })
  protected role = 'dialog'

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
    }
  }

  render(): TemplateResult<1> {
    return html`
      <div class="overlay" part="overlay" @click="${this.handleClickOverlay}"></div>
      <div class="dialog" part="dialog">
        <slot></slot>
      </div>
    `
  }
}
