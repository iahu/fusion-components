import { elementUpdated, expect, fixture, html, nextFrame } from '@open-wc/testing'
import { FCDataGrid } from './index'
import './index'
import { FCDataGridCell } from '../data-grid-cell'

describe('fc-data-grid', function () {
  it('should not throw error when createElement', async () => {
    expect(() => document.createElement('fc-data-grid')).not.to.throw()
  })

  it("'s activeElement should be first cell", async () => {
    const datagrid: FCDataGrid = await fixture(html`<fc-data-grid>
      <fc-data-grid-row>
        <fc-data-grid-cell id="c1">1</fc-data-grid-cell>
        <fc-data-grid-cell>2</fc-data-grid-cell>
      </fc-data-grid-row>
    </fc-data-grid>`)

    await nextFrame()

    expect(datagrid.activeElement).eq(datagrid.querySelector('#c1'))
  })

  it('should focus the right side of the current focused cell', async () => {
    const datagrid: FCDataGrid = await fixture(html`<fc-data-grid>
      <fc-data-grid-row>
        <fc-data-grid-cell>1</fc-data-grid-cell>
        <fc-data-grid-cell>2</fc-data-grid-cell>
      </fc-data-grid-row>
    </fc-data-grid>`)

    await nextFrame()
    const cells = datagrid.querySelectorAll<FCDataGridCell>('fc-data-grid-cell')

    cells[0].focus()
    await nextFrame()

    cells[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }))
    await elementUpdated(datagrid)

    expect(cells[1]).eq(document.activeElement)
  })

  it('should focus the left side of the current focused cell', async () => {
    const datagrid: FCDataGrid = await fixture(html`<fc-data-grid>
      <fc-data-grid-row>
        <fc-data-grid-cell>1</fc-data-grid-cell>
        <fc-data-grid-cell>2</fc-data-grid-cell>
      </fc-data-grid-row>
    </fc-data-grid>`)

    await nextFrame()
    const cells = datagrid.querySelectorAll<FCDataGridCell>('fc-data-grid-cell')

    cells[1].focus()
    await nextFrame()

    cells[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }))
    await elementUpdated(datagrid)

    expect(cells[0]).eq(document.activeElement)
  })

  it('should focus the bottom side of the current focused cell', async () => {
    const datagrid: FCDataGrid = await fixture(html`<fc-data-grid>
      <fc-data-grid-row>
        <fc-data-grid-cell id="c11">11</fc-data-grid-cell>
      </fc-data-grid-row>
      <fc-data-grid-row>
        <fc-data-grid-cell id="c21">21</fc-data-grid-cell>
      </fc-data-grid-row>
    </fc-data-grid>`)

    await nextFrame()
    const firstCell = datagrid.querySelector<FCDataGridCell>('#c11')!

    firstCell.focus()
    await nextFrame()

    firstCell.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
    await elementUpdated(datagrid)

    expect(datagrid.querySelector('#c21')).eq(document.activeElement)
  })

  it('should focus the top side of the current focused cell', async () => {
    const datagrid: FCDataGrid = await fixture(html`<fc-data-grid>
      <fc-data-grid-row>
        <fc-data-grid-cell id="c11">11</fc-data-grid-cell>
      </fc-data-grid-row>
      <fc-data-grid-row>
        <fc-data-grid-cell id="c21">21</fc-data-grid-cell>
      </fc-data-grid-row>
    </fc-data-grid>`)

    await nextFrame()
    const firstCell = datagrid.querySelector<FCDataGridCell>('#c21')!

    firstCell.focus()
    await nextFrame()

    firstCell.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }))
    await elementUpdated(datagrid)

    expect(datagrid.querySelector('#c11')).eq(document.activeElement)
  })

  it("'s activeElement should lost focus when pressed Escape key", async () => {
    const datagrid: FCDataGrid = await fixture(html`
      <fc-data-grid>
        <fc-data-grid-row>
          <fc-data-grid-cell id="c1"></fc-data-grid-cell>
        </fc-data-grid-row>
      </fc-data-grid>
    `)

    await nextFrame()
    const activeElement = datagrid.activeElement!
    activeElement.focus()

    expect(document.activeElement, 'before').eq(activeElement)
    activeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))

    await nextFrame()
    expect(document.activeElement, 'after').not.eq(activeElement)
  })

  it('should sort cells according asc order', async () => {
    const datagrid: FCDataGrid = await fixture(html`
      <fc-data-grid sortindex="1">
        <fc-data-grid-row slot="row-header">
          <fc-data-grid-cell sortable>Age</fc-data-grid-cell>
        </fc-data-grid-row>

        <fc-data-grid-row>
          <fc-data-grid-cell id="c31">31</fc-data-grid-cell>
        </fc-data-grid-row>
        <fc-data-grid-row>
          <fc-data-grid-cell id="c11">11</fc-data-grid-cell>
        </fc-data-grid-row>
        <fc-data-grid-row>
          <fc-data-grid-cell id="c21">21</fc-data-grid-cell>
        </fc-data-grid-row>
      </fc-data-grid>
    `)

    await elementUpdated(datagrid)

    expect(datagrid.querySelector('fc-data-grid-cell[role="cell"]')).eq(datagrid.querySelector('#c11'))
  })

  it('should reverse the sort order, when click on the columnheader cell', async () => {
    const datagrid: FCDataGrid = await fixture(html`
      <fc-data-grid sortindex="1">
        <fc-data-grid-row slot="row-header">
          <fc-data-grid-cell sortable>Age</fc-data-grid-cell>
        </fc-data-grid-row>

        <fc-data-grid-row>
          <fc-data-grid-cell id="c31">31</fc-data-grid-cell>
        </fc-data-grid-row>
        <fc-data-grid-row>
          <fc-data-grid-cell id="c11">11</fc-data-grid-cell>
        </fc-data-grid-row>
        <fc-data-grid-row>
          <fc-data-grid-cell id="c21">21</fc-data-grid-cell>
        </fc-data-grid-row>
      </fc-data-grid>
    `)

    await elementUpdated(datagrid)

    // click
    datagrid.activeElement!.click()
    await elementUpdated(datagrid)

    expect(datagrid.querySelector('fc-data-grid-cell[role="cell"]')).eq(datagrid.querySelector('#c31'))
  })

  it('should reverse the sort order, when pressed Enter key on the columnheader cell', async () => {
    const datagrid: FCDataGrid = await fixture(html`
      <fc-data-grid sortindex="1">
        <fc-data-grid-row slot="row-header">
          <fc-data-grid-cell sortable>Age</fc-data-grid-cell>
        </fc-data-grid-row>

        <fc-data-grid-row>
          <fc-data-grid-cell id="c31">31</fc-data-grid-cell>
        </fc-data-grid-row>
        <fc-data-grid-row>
          <fc-data-grid-cell id="c11">11</fc-data-grid-cell>
        </fc-data-grid-row>
        <fc-data-grid-row>
          <fc-data-grid-cell id="c21">21</fc-data-grid-cell>
        </fc-data-grid-row>
      </fc-data-grid>
    `)

    await elementUpdated(datagrid)

    // press enter
    datagrid.activeElement!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))
    await elementUpdated(datagrid)

    expect(datagrid.querySelector('fc-data-grid-cell[role="cell"]')).eq(datagrid.querySelector('#c31'))
  })
})
