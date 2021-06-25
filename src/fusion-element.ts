import { LitElement } from 'lit'
import { property } from 'lit/decorators.js'

abstract class FusionElement extends LitElement {
  constructor() {
    super()
  }

  @property()
  classes = {}

  @property()
  styles = {}

  @property()
  size: '' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl' = 'xs'
}

export default FusionElement
