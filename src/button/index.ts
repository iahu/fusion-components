import { html, define, property, Hybrids } from 'hybrids'

import global from '../styles/global.css'
import style from './style.css'

export interface Button {
  outline?: boolean
  selected?: boolean
  disabled?: boolean
  sharp?: boolean
  size?: '' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl'
}

export const Button: Hybrids<Button> = {
  outline: property(false),
  selected: property(false),
  disabled: {
    set: (host, value) => {
      if (value) {
        host.setAttribute('disabled', '')
      } else {
        host.removeAttribute('disabled')
      }
      return value
    },
    get: (host) => host.hasAttribute('disabled'),
    observe: (host) => {
      host.disabled = host.hasAttribute('disabled')
    },
  },
  size: property(''),
  sharp: property(false),

  render: ({ disabled, outline, selected, size, sharp }) =>
    html`
      <button
        part="fui-button"
        disabled="${disabled}"
        data-outline="${outline}"
        data-selected="${selected}"
        data-size="${size}"
        data-sharp="${sharp}"
      >
        <slot></slot>
      </button>
    `.style(global, style),
}

define('fui-button', Button)
