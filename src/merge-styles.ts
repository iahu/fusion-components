import { css, CSSResultGroup, unsafeCSS } from 'lit'
import globalCSSText from './styles/global.css'

const mergeStyles = (...cssTexts: string[]): CSSResultGroup =>
  css`
    ${unsafeCSS([globalCSSText, ...cssTexts].join(''))}
  `

export default mergeStyles
