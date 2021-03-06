import { html, TemplateResult } from 'lit'
import { customElement, query } from 'lit/decorators.js'
import { observer } from '../decorators'
import { FC } from '../fusion-component'
import mergeStyles from '../merge-styles'
import style from './style.css'

@customElement('fc-tooltip')
export class FCTooltip extends FC {
  static styles = mergeStyles(style)

  connectedCallback(): void {
    super.connectedCallback()

    this.anchor = this.getAttribute('anchor')
    this.anchorElements = this.anchor ? Array.from(this.renderRoot.ownerDocument.querySelectorAll(this.anchor)) : null
    this.anchorElements?.forEach(e => {
      e.addEventListener('mouseenter', this.handleMouseenter)
      e.addEventListener('mouseleave', this.handleMouseleave)
    })
  }
  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.anchorElements?.forEach(e => {
      e.removeEventListener('mouseenter', this.handleMouseenter)
      e.removeEventListener('mouseleave', this.handleMouseleave)
    })
  }

  @observer({ init: false })
  anchor?: string | null

  @observer({
    converter(v) {
      return Math.max(0, v)
    },
  })
  delay = 300

  @observer()
  offsetX = 6

  @observer()
  offsetY = 6

  @observer({ reflect: true })
  role = 'tooltip'

  anchorElements?: HTMLElement[] | null

  currentAnchorElement?: HTMLElement | null

  #visibleTimeout?: NodeJS.Timeout

  @observer()
  visible = false
  visibleChanged(old: boolean, next: boolean): void {
    if (next) {
      if (!this.currentAnchorElement && this.anchorElements?.length) {
        this.currentAnchorElement = this.anchorElements[0]
      }
      const setVisibility = () => {
        const { anchorPosition, tooltip } = this
        if (tooltip) {
          tooltip.style.cssText = Object.entries(anchorPosition)
            .map(([k, v]) => `${k}:${v}px`)
            .join(';')
          tooltip.style.visibility = 'visible'
        }
        this.emit('visibleChange', { old, next })
      }

      if (this.delay > 0) {
        this.#visibleTimeout = setTimeout(setVisibility, this.delay)
      } else {
        setVisibility()
      }
    } else if (this.#visibleTimeout) {
      clearTimeout(this.#visibleTimeout)
    }
  }

  @observer()
  // @TODO auto
  position = 'bottom'

  @query('.tooltip')
  tooltip?: HTMLElement

  get anchorPosition(): { left?: number; top?: number } {
    const { currentAnchorElement } = this
    const tooltip = this.renderRoot.querySelector('.tooltip')
    if (!currentAnchorElement || !tooltip) {
      return {}
    }

    const { top, left, right, bottom, width, height } = currentAnchorElement.getBoundingClientRect()
    const { width: tooltipWidth, height: tooltipHeight } = tooltip.getBoundingClientRect()
    const alignLeft = left - (tooltipWidth - width) / 2
    const alignTop = top - (tooltipHeight - height) / 2
    const { offsetX, offsetY } = this

    switch (this.position) {
      case 'bottom':
        return { left: alignLeft, top: bottom + offsetY }
      case 'top':
        return { left: alignLeft, top: top - tooltipHeight - offsetY }
      case 'left':
        return { left: left - tooltipWidth - offsetX, top: alignTop }
      case 'right':
        return { left: right + offsetX, top: alignTop }
      default:
        return {}
    }
  }

  handleMouseenter = (e: MouseEvent): void => {
    this.currentAnchorElement = e.target as HTMLElement
    this.visible = true
  }

  handleMouseleave = (e: MouseEvent): void => {
    this.currentAnchorElement = null
    this.visible = false
  }

  render(): TemplateResult<1> {
    if (this.visible) {
      return html`
        <div class="tooltip" part="tooltip" role="tooltip">
          <slot></slot>
        </div>
      `
    }
    return html``
  }
}
