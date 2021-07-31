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
}
