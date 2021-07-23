import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { observer } from '../decorators'
import { FC } from '../fusion-component'
import mergeStyles from '../merge-styles'

import style from './style.css'

export const isTab = (e: Element) => e instanceof FCTab || e.tagName.toLowerCase() === 'fc-tab'

@customElement('fc-tab')
export default class FCTab extends FC {
  static styles = mergeStyles(style)

  @observer({ reflect: true })
  role = 'tab'

  @observer()
  disabled = false
  disabledChanged(): void {
    this.setAttribute('aria-disabled', this.disabled.toString())
  }

  render(): TemplateResult<1> {
    return html`<slot></slot>`
  }
}
