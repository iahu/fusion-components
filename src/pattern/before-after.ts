import { html, TemplateResult } from 'lit'

export const before = (inner?: TemplateResult<1>): TemplateResult<1> =>
  html`<slot name="before" part="before">${inner}</slot>`
export const after = (inner?: TemplateResult<1>): TemplateResult<1> =>
  html`<slot name="after" part="after">${inner}</slot>`
