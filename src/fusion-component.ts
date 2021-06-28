import { LitElement } from 'lit'
import { property } from 'lit/decorators.js'

abstract class FusionComponent extends LitElement {
  constructor() {
    super()
  }

  @property()
  size: '' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl' = 'xs'
}

export const FC = FusionComponent

export default FusionComponent
