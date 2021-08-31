import { LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'
import { observer } from '../decorators'
import mergeStyles from '../merge-styles'
import style from './style.css'

@customElement('fc-divider')
export class FCDivider extends LitElement {
  @observer({ reflect: true })
  role = 'separator'

  static styles = mergeStyles(style)
}
