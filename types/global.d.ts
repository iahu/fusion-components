declare module '*.html' {
  const content: string
  export default content
}

declare module '*.css' {
  const content: string
  export default content
}

declare interface CSSStyleDeclaration {
  '--grid-template-columns': string
  '--max-cell-count': string
  '--client-height': string
  '--grid-border-right-width': string
}

declare const ShadyCSS = {
  nativeShadow: true,
}

declare class CSSStyleSheet {
  replaceSync(cssText: string): void
}
