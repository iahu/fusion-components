import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { observer } from '../decorators'
import { FC } from '../fusion-component'
import { onEvent } from '../helper'
import mergeStyles from '../merge-styles'

import style from './style.css'

export const isTab = (e: Element): e is FCTab => e instanceof FCTab || e.tagName.toLowerCase() === 'fc-tab'

@customElement('fc-tab')
export class FCTab extends FC {
  static styles = mergeStyles(style)

  connectedCallback(): void {
    super.connectedCallback()
    onEvent(this, 'click', this.handleClick)
  }

  @observer()
  disabled = false

  @observer({ reflect: true })
  readonly = this.hasAttribute('readonly')

  @observer({ reflect: true })
  role = 'tab'

  @observer({ reflect: true })
  selected = false
  protected selectedChanged(old: boolean, next: boolean): void {
    if (this.selected) {
      this.emit('select')
    }
  }

  @observer({ reflect: true })
  tabindex = '-1'

  handleClick(e: MouseEvent): void {
    e.preventDefault()
    this.selected = !this.disabled
  }

  render(): TemplateResult<1> {
    return html`<slot></slot>`
  }
}
