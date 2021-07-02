import { html, TemplateResult } from 'lit'

export const before = (inner?: TemplateResult<1>): TemplateResult<1> =>
  html`<span class="before"><slot name="before">${inner}</slot></span>`
export const after = (inner?: TemplateResult<1>): TemplateResult<1> =>
  html`<span class="after"><slot name="after">${inner}</slot></span>`
