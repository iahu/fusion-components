import { css, CSSResultGroup, unsafeCSS } from 'lit'
import globalCSSText from './styles/global.css'

// prettier-ignore
const mergeStyles = (cssText: string): CSSResultGroup => [globalCSSText, cssText].map(unsafeCSS).map(t => css`${t}`)

export default mergeStyles
