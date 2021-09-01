import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { FC } from '../fusion-component'
import mergeStyles from '../merge-styles'

import '../dialog'
import '../panel-header'

import style from './style.css'
import { observer } from '../decorators'
import { FCPanelHeader } from '../panel-header'

@customElement('fc-panel')
export class FCPanel extends FC {
  static styles = mergeStyles(style)

  @observer({ reflect: true })
  closable = true

  @observer()
  closeTarget = ''

  @observer({ reflect: true })
  role = 'widget'

  @observer({ reflect: true })
  hidden = false
  protected hiddenChanged(old: boolean, next: boolean): void {
    this.setAttribute('aria-hidden', String(next))
    this.emit('visibleChange')
  }

  #defaultHeader?: FCPanelHeader

  @observer()
  header?: string
  headerChanged(old: string, next: string): void {
    if (next) {
      const header = document.createElement('fc-panel-header') as FCPanelHeader
      header.slot = 'panel-header'
      header.closable = this.closable
      header.closeTarget = this.closeTarget
      header.innerText = next

      this.#defaultHeader = header
      this.appendChild(header)
    } else if (this.#defaultHeader) {
      this.#defaultHeader.remove()
    }
  }

  render(): TemplateResult {
    if (this.hidden) {
      return html``
    }

    return html`
      <slot name="panel-header" part="panel-header"></slot>
      <div class="panel-body" part="panel-body">
        <slot></slot>
      </div>
    `
  }
}
