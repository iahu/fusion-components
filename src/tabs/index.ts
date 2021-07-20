import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators'
import { FC } from '../fusion-component'
import mergeStyles from '../merge-styles'
import { after, before } from '../pattern/before-after'
import style from './style.css'

export * from '../tab/index'
export * from '../tab-panel/index'

@customElement('fc-tabs')
export default class Tabs extends FC {
  static styles = mergeStyles(style)

  render(): TemplateResult<1> {
    return html`
      ${before()}
      <div class="tablist" part="tablist" role="tablist">
        <slot name="tab" class="tab" part="tab"></slot>
      </div>
      ${after()}
      <div class="tabpanel" part="tabpanel">
        <slot name="panel"></slot>
      </div>
    `
  }
}
