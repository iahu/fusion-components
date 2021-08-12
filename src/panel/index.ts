import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { FC } from '../fusion-component'
import mergeStyles from '../merge-styles'

import '../dialog'
import '../panel-header'

import style from './style.css'
import { observer } from '../decorators'

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
  protected hiddenChanged(): void {
    this.emit('visibleChange')
  }

  @observer()
  header?: string

  render(): TemplateResult {
    if (this.hidden) {
      return html``
    }

    return html`
      <div class="panel-header" part="panel-header">
        <slot name="panel-header">
          <fc-panel-header slot="panel-header" closable="${this.closable}" closeTarget="${this.closeTarget}"
            >${this.header}</fc-panel-header
          >
        </slot>
      </div>
      <div class="panel-body" part="panel-body">
        <slot></slot>
      </div>
    `
  }
}
