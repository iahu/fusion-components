import { css, CSSResultGroup, unsafeCSS } from 'lit'
import globalCSSText from './styles/global.css'

// prettier-ignore
const mergeStyles = (...cssTexts: string[]): CSSResultGroup => [globalCSSText, ...cssTexts].map(unsafeCSS).map(t => css`${t}`)

export default mergeStyles
