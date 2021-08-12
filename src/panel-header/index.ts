import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { observer } from '../decorators'
import { FC } from '../fusion-component'
import mergeStyles from '../merge-styles'

import style from './style.css'

@customElement('fc-panel-header')
export class FCPanelHeader extends FC {
  static styles = mergeStyles(style)

  @observer({ reflect: true })
  closable = true

  @observer()
  closeTarget = ''

  handleClick(e: MouseEvent): void {
    e.preventDefault()
    this.emit('close', this.closeTarget)
  }

  render(): TemplateResult {
    return html`
      <slot class="control" part="control"></slot>
      ${this.closable
        ? html` <button
            class="close-button fc-outline"
            part="close-button"
            aria-labelledby="close"
            @click="${this.handleClick}"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              xmlns:v="https://vecta.io/nano"
            >
              <path
                d="M6.774 6l4.072-4.073c.206-.206.206-.545 0-.75l-.022-.022c-.206-.206-.544-.206-.75 0L6.002 5.233 1.93 1.154c-.206-.206-.544-.206-.75 0l-.022.022c-.211.206-.211.545 0 .75L5.23 6l-4.072 4.073c-.206.206-.206.545 0 .75l.022.022c.206.206.544.206.75 0l4.072-4.073 4.072 4.073c.206.206.544.206.75 0l.022-.022c.206-.206.206-.545 0-.75L6.774 6z"
                fill="#999"
              />
            </svg>
          </button>`
        : ''}
    `
  }
}
