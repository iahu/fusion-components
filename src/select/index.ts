import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators'
import ListBox from '../listbox'
import mergeStyles from '../merge-styles'
import { after, before } from '../pattern/before-after'
import style from './style.css'

@customElement('fc-select')
export default class Select extends ListBox {
  static styles = mergeStyles(style)

  handleClickOption(e: MouseEvent): void {
    console.log(e.currentTarget, e.srcElement)
  }

  render(): TemplateResult<1> {
    return html`
      <div class="control" id="control" part="control" role="comobox" aria-haspopup="listbox">
        ${before()}
        <slot name="button-container">
          <div class="selected-value" part="selected-value">${this.displayValue}</div>
          <div class="indicator" part="indicator">
            <slot name="indicator">
              <svg
                class="select-indicator"
                part="select-indicator"
                viewBox="0 0 12 7"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.85.65c.2.2.2.5 0 .7L6.4 6.84a.55.55 0 01-.78 0L.14 1.35a.5.5 0 11.71-.7L6 5.8 11.15.65c.2-.2.5-.2.7 0z"
                />
              </svg>
            </slot>
          </div>
        </slot>
        ${after()}
      </div>
      <div class="listbox" part="listbox" ?hidden=${this.hidden} role="listbox" ?disabled="${this.disabled}">
        <slot></slot>
      </div>
    `
  }
}
