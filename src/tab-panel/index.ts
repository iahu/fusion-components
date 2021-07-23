import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators'
import { observer } from '../decorators'
import { FC } from '../fusion-component'
import mergeStyles from '../merge-styles'

import style from './style.css'

export const isTabPanel = (e: Element) => e instanceof TabPanel || e.tagName.toLowerCase() === 'fc-tab-panel'

@customElement('fc-tab-panel')
export default class TabPanel extends FC {
  static styles = mergeStyles(style)

  @observer({ reflect: true })
  role = 'tabpanel'

  @observer()
  disabled = false
  disabledChanged(): void {
    this.setAttribute('aria-disabled', this.disabled.toString())
  }

  render(): TemplateResult<1> {
    return html`<slot></slot>`
  }
}