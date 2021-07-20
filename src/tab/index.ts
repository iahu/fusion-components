import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators'
import { observer } from '../decorators'
import { FC } from '../fusion-component'
import mergeStyles from '../merge-styles'

import style from './style.css'

@customElement('fc-tab')
export default class Tab extends FC {
  static styles = mergeStyles(style)

  @observer({ reflect: true })
  role = 'tab'

  @observer({ reflect: true })
  tabIndex = -1

  @observer()
  disabled = false

  render(): TemplateResult<1> {
    return html`<slot></slot>`
  }
}
