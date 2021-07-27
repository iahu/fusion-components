import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { observer } from '../decorators'
import { FC } from '../fusion-component'
import mergeStyles from '../merge-styles'

import style from './style.css'

export const isTab = (e: Element) => e instanceof FCTab || e.tagName.toLowerCase() === 'fc-tab'

@customElement('fc-tab')
export class FCTab extends FC {
  static styles = mergeStyles(style)

  connectedCallback() {
    super.connectedCallback()
    this.addEventListener('click', this.handleClick)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener('click', this.handleClick)
  }

  @observer({ reflect: true })
  role = 'tab'

  @observer({ reflect: true })
  selected = false
  selectedChanged(old: boolean, next: boolean) {
    this.setAttribute('aria-selected', this.selected.toString())
    if (this.selected) {
      this.emit('select')
    }
  }

  @observer()
  disabled = false
  disabledChanged(): void {
    this.setAttribute('aria-disabled', this.disabled.toString())
  }

  @observer({ reflect: true })
  readonly = this.hasAttribute('readonly')
  readonlyChanged() {
    this.setAttribute('aria-disabled', this.readonly.toString())
  }

  handleClick(e: MouseEvent) {
    e.preventDefault()
    this.selected = true
  }

  render(): TemplateResult<1> {
    return html`<slot></slot>`
  }
}
