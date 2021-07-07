import { html, LitElement, PropertyValues, TemplateResult } from 'lit'
import { property } from 'lit/decorators.js'

export interface FC {
  attributeChangedCallback: (name: string, pre: string | null, next: string | null) => void
}

abstract class FusionComponent extends LitElement {
  public get root(): HTMLElement {
    return this.shadowRoot?.firstElementChild as HTMLElement
  }

  public get control(): HTMLElement | null | undefined {
    return this.shadowRoot?.querySelector('.control')
  }

  updated(p: PropertyValues<this>): void {
    p.forEach((v, k) => {
      if (!this[k] && this.control?.hasAttribute(k.toString())) {
        this.control?.removeAttribute(k.toString())
      }
    })
  }

  focus(): void {
    this.classList.add('focused')
    this.control?.focus()
  }

  blur(): void {
    this.classList.remove('focused')
    this.control?.blur()
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
