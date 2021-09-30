import { html, TemplateResult } from 'lit'
import { customElement } from 'lit/decorators.js'
import { observer } from '../decorators'
import { FC } from '../fusion-component'
import { focusable, focusFirstOrNext, onEvent, toggleTabIndex } from '../helper'
import mergeStyles from '../merge-styles'
import { after, before } from '../pattern/before-after'
import { isTabPanel } from '../tab-panel/index'
import { FCTab, isTab } from '../tab/index'
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

    this.tabs = Array.from(this.children).filter(isTab) as HTMLElement[]
    this.panels = Array.from(this.children).filter(isTabPanel) as HTMLElement[]
    this.activeid = this.getAttribute('activeid')

    if (!this.activeid && this.tabs) {
      const next = focusFirstOrNext(this.tabs, 1, false, true)
      if (next) {
        this.activeid = next.id
      }
    }

    onEvent(this, 'select', this.handleSelect)
  }

  @observer({ attribute: false, init: false })
  tabs = [] as HTMLElement[]
  protected tabsChanged(): void {
    this.tabs?.forEach((e, idx) => {
      if (!e.getAttribute('id')) {
        e.setAttribute('id', `tab-${idx}`)
      }
    })
  }

  @observer({ attribute: false, init: false })
  panels = [] as HTMLElement[]
  protected panelsChanged(): void {
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
  protected activeTabChanged(): void {
    this.activeid = this.activeTab?.id || null

    this.tabs.forEach(t => {
      if (focusable(t)) {
        t.setAttribute('tabindex', '-1')
      }
      t.toggleAttribute('selected', false)
    })
    this.panels.forEach(p => {
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
    const controlsPanel = this.panels.find(p => p.getAttribute('id') === controlsId)
    if (controlsPanel) {
      controlsPanel.removeAttribute('hidden')
      if (focusable(activeTab)) {
        controlsPanel.setAttribute('tabindex', '0')
      }
    }
  }

  @observer({ init: false })
  activeid?: string | null = ''
  protected activeidChanged(): void {
    const { activeid } = this
    this.activeTab = this.tabs.find(t => t.getAttribute('id') === activeid)
  }

  @observer({ init: false })
  disabled = this.hasAttribute('disabled')
  protected disabledChanged(): void {
    if (this.disabled) {
      this.tabs.forEach(t => t.toggleAttribute('disabled', true))
    }
  }

  @observer({ reflect: true })
  direction = 'row'
  protected directionChanged(): void {
    const { direction } = this
    this.tabs.forEach(t => t.setAttribute('direction', direction))
  }

  handleSelect(e: Event): void {
    const { target } = e
    if (target instanceof FCTab && !this.disabled) {
      e.preventDefault()
      this.activeTab = target
    }
  }

  handleKeydown(e: KeyboardEvent): void {
    if (!(e.target instanceof FCTab)) {
      return
    }

    if (this.disabled) {
      return
    }

    const NAV_KEYS = {
      previous: 'ArrowLeft',
      next: 'ArrowRight',
    }
    if (this.direction === 'column') {
      NAV_KEYS.previous = 'ArrowUp'
      NAV_KEYS.next = 'ArrowDown'
    }

    switch (e.key) {
      case NAV_KEYS.previous:
        e.preventDefault()
        toggleTabIndex(this.tabs, -1, true)?.focus()
        break
      case NAV_KEYS.next:
        e.preventDefault()
        toggleTabIndex(this.tabs, 1, true)?.focus()
        break
      case 'Enter': {
        e.preventDefault()
        if (e.target instanceof FCTab) {
          this.activeTab = e.target
        }
        break
      }
    }
  }

  render(): TemplateResult<1> {
    return html`
      <div class="tablist" part="tablist" role="tablist" @keydown="${this.handleKeydown}">
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
