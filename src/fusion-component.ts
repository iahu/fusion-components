import { html, LitElement, TemplateResult } from 'lit'
import { property } from 'lit/decorators.js'

class FusionComponent extends LitElement {
  constructor() {
    super()
  }

  public get root(): HTMLElement {
    return this.shadowRoot?.firstElementChild as HTMLElement
  }

  public get control(): HTMLElement | null | undefined {
    return this.shadowRoot?.querySelector('#control')
  }

  @property()
  size: '' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl' = 'xs'

  @property({ type: Boolean })
  sharp = false

  emit<T = unknown>(type: string, detail?: T): void {
    const event = new CustomEvent(type, { bubbles: true, composed: true, detail })
    this.dispatchEvent(event)
  }

  render(): TemplateResult<1> {
    return html``
  }
}

export const FC = FusionComponent

export default FusionComponent
