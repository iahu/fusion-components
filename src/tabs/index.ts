import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { observer } from '../decorators'
import { FC } from '../fusion-component'
import { focusable } from '../helper'
import mergeStyles from '../merge-styles'
import { after, before } from '../pattern/before-after'
import { FCTab } from '../tab/index'
import style from './style.css'

export * from '../tab-panel/index'
export * from '../tab/index'

@customElement('fc-tabs')
export class FCTabs extends FC {
  static styles = mergeStyles(style)

  private static index = 0

  constructor() {
    super()

    FCTabs.index += 1
  }

  connectedCallback(): void {
    super.connectedCallback()

    this.tabs = Array.from(this.children).filter((e) => e.getAttribute('slot') === 'tab')
    this.panels = Array.from(this.children).filter((e) => e.getAttribute('slot') === 'tabpanel')
    this.activeid = this.getAttribute('activeid') || this.nextFocusableTab(1)?.getAttribute('id') || null

    this.addEventListener('select', this.handleSelect)
  }

  disconnectedCallback() {
    super.disconnectedCallback()

    this.removeEventListener('select', this.handleSelect)
  }

  @observer({ attribute: false, init: false })
  tabs = [] as Element[]
  tabsChanged(): void {
    this.tabs?.forEach((e, idx) => {
      if (!e.getAttribute('id')) {
        e.setAttribute('id', `tab-${idx}`)
      }
    })
  }

  @observer({ attribute: false, init: false })
  panels = [] as Element[]
  panelsChanged(): void {
    const { index } = FCTabs
    const { activeTab } = this
    this.panels?.forEach((p, idx) => {
      if (!p.getAttribute('id')) {
        p.setAttribute('id', `panel-${index}-${idx}`)
      }
      const panelId = p.getAttribute('id') as string

      const controlTab = this.tabs[idx]
      if (controlTab) {
        if (!controlTab.hasAttribute('aria-controls')) {
          controlTab.setAttribute('aria-controls', panelId)
        }
        if (!p.hasAttribute('aria-labelledby')) {
          p.setAttribute('aria-labelledby', controlTab.getAttribute('id') as string)
        }

        if (controlTab === activeTab) {
          p.toggleAttribute('hidden', true)
        }
      }
    })
  }

  @observer({ attribute: false, init: false })
  activeTab?: Element
  activeTabChanged(): void {
    this.activeid = this.activeTab?.id || null

    this.tabs.forEach((t) => {
      if (focusable(t)) {
        t.setAttribute('tabindex', '-1')
        t.toggleAttribute('selected', false)
      }
    })
    this.panels.forEach((p) => {
      p.setAttribute('hidden', 'true')
      p.removeAttribute('tabindex')
    })

    const { activeTab } = this
    if (!activeTab) return

    activeTab.toggleAttribute('selected', true)
    if (focusable(activeTab)) {
      activeTab.setAttribute('tabindex', '0')
    }

    const controlsId = activeTab.getAttribute('aria-controls')
    const controlsPanel = this.panels.find((p) => p.getAttribute('id') === controlsId)
    if (controlsPanel) {
      controlsPanel.removeAttribute('hidden')
      if (focusable(activeTab)) {
        controlsPanel.setAttribute('tabindex', '0')
      }
    }
  }

  @observer({ init: false })
  activeid: string | null = ''
  activeidChanged(): void {
    const { activeid } = this
    this.activeTab = this.tabs.find((t) => t.getAttribute('id') === activeid)
  }

  @observer({ init: false })
  disabled = this.hasAttribute('disabled')
  disabledChanged(): void {
    if (this.disabled) {
      this.tabs.forEach((t) => t.toggleAttribute('disabled', true))
    }
  }

  @observer({ reflect: true })
  direction = 'column'
  directionChanged(): void {
    const { direction } = this
    this.tabs.forEach((t) => t.setAttribute('direction', direction))
  }

  handleSelect(e: Event): void {
    const { srcElement } = e
    if (srcElement instanceof FCTab && !this.disabled) {
      e.preventDefault()
      this.activeTab = srcElement
    }
  }

  handleKeydonw(e: KeyboardEvent): void {
    if (!(e.srcElement instanceof FCTab)) {
      return
    }

    if (this.disabled) {
      return
    }

    const NAV_KEYS = {
      previous: 'ArrowLeft',
      next: 'ArrowRight',
    }
    if (this.direction === 'row') {
      NAV_KEYS.previous = 'ArrowUp'
      NAV_KEYS.next = 'ArrowDown'
    }

    switch (e.key) {
      case NAV_KEYS.previous:
        e.preventDefault()
        this.focusTab(this.nextFocusableTab(-1))
        break
      case NAV_KEYS.next:
        e.preventDefault()
        this.focusTab(this.nextFocusableTab(1))
        break
      case 'Enter': {
        e.preventDefault()
        if (e.srcElement instanceof FCTab) {
          this.activeTab = e.srcElement
        }
        break
      }
    }
  }

  nextFocusableTab(delta: number): FCTab | undefined {
    const { activeElement } = this.ownerDocument

    let idx = this.tabs.findIndex((t) => t === activeElement)
    const { length } = this.tabs

    while (idx < length) {
      idx += delta
      const next = this.tabs[(idx + length) % length]
      if (next && focusable(next)) {
        return next as FCTab
      }
    }
  }

  focusTab(tab?: FCTab): void {
    if (!tab || !focusable(tab)) {
      return
    }
    this.tabs.forEach((t) => {
      if (focusable(t)) {
        t.setAttribute('tabindex', '-1')
      }
    })

    tab.setAttribute('tabindex', '0')
    tab.focus()
  }

  render(): TemplateResult<1> {
    return html`
      <div class="tablist" part="tablist" role="tablist" @keydown="${this.handleKeydonw}">
        ${before()}
        <slot name="tab" class="tab" part="tab"></slot>
        ${after()}
      </div>
      <div class="tabpanel" part="tabpanel">
        <slot name="tabpanel" class="tabpanel" part="tabpanel"></slot>
      </div>
    `
  }
}
