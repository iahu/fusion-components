import { html, TemplateResult } from 'lit'

export const before = (inner?: TemplateResult): TemplateResult =>
  html`<slot name="before" part="before">${inner}</slot>`
export const after = (inner?: TemplateResult): TemplateResult => html`<slot name="after" part="after">${inner}</slot>`
