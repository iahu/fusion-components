import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators'
import { observer } from '../decorators'
import { FC } from '../fusion-component'
import mergeStyles from '../merge-styles'

import style from './style.css'

@customElement('fc-tab-panel')
export default class Tab extends FC {
  static styles = mergeStyles(style)

  @observer({ reflect: true })
  role = 'tabpanel'

  @observer({ reflect: true })
  tabIndex = 0

  @observer()
  disabled = false
  disabledChanged(): void {
    this.setAttribute('aria-disabled', this.disabled.toString())
  }

  render(): TemplateResult<1> {
    return html`<slot></slot>`
  }
}
