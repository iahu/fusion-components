import { CSSResultGroup, unsafeCSS } from 'lit'
import globalCSSText from './styles/global.css'

const mergeStyles = (...cssTexts: string[]): CSSResultGroup => {
  const cssText = [globalCSSText, ...cssTexts].join('')
  const styleSheet = new CSSStyleSheet()
  ;(styleSheet as any).replaceSync(cssText)
  return styleSheet
}

export default mergeStyles
