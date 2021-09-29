import { aTimeout, elementUpdated, expect, fixture, html, nextFrame } from '@open-wc/testing'
import { FCListOption } from '../list-option'
import './index'
import { FCComboBox } from './index'

describe('fc-combobox', function () {
  it('should not throw error when createElement', async () => {
    expect(() => document.createElement('fc-combobox')).not.throw()
  })

  it('should has a role named "combobox"', async () => {
    const el: FCComboBox = await fixture(html`<fc-combobox></fc-combobox>`)
    expect(el.role).to.eq('combobox')
  })

  it('should has placeholder', async () => {
    const el: FCComboBox = await fixture(html`<fc-combobox placeholder="foo"></fc-combob>`)
    expect(el.placeholder).to.eq('foo')
  })

  it('should has a value equal to "foo"', async () => {
    const el: FCComboBox = await fixture(html`<fc-combobox value="foo"></fc-combobox>`)
    expect(el.value).to.eq('foo')

    const el2: FCComboBox = await fixture(html`<fc-combobox value="foo">
      <fc-list-option value="foo"></fc-list-option>
      <fc-list-option value="bar"></fc-list-option>
    </fc-combobox>`)
    await nextFrame()
    await aTimeout(1000)
    expect(el2.value, 'el2').to.eq('foo')
  })

  it('should select matched list-option', async () => {
    const el: FCComboBox = await fixture(html`<fc-combobox value="foo">
      <fc-list-option value="foo"></fc-list-option>
      <fc-list-option value="bar"></fc-list-option>
    </fc-combobox>`)

    await nextFrame()

    expect(el.value, 'foo').to.eq('foo')
    expect(el.selectedOption).to.eq(el.querySelector('fc-list-option'))
    expect(el.selectedOption!.selected).to.be.true
  })

  it('should update selected option while update value', async () => {
    const el: FCComboBox = await fixture(html`<fc-combobox value="foo">
      <fc-list-option value="foo"></fc-list-option>
      <fc-list-option value="bar"></fc-list-option>
    </fc-combobox>`)

    el.value = 'bar'
    await elementUpdated(el)

    expect(el.value).to.eq('bar')
    const bar = el.querySelector<FCListOption>('[value="bar"]')!
    expect(bar.selected).be.true
    expect(el.selectedOption).to.eq(bar)
  })

  it('should update value while clicked', async () => {
    const el: FCComboBox = await fixture(html`<fc-combobox value="bar">
      <fc-list-option value="foo"></fc-list-option>
      <fc-list-option value="bar"></fc-list-option>
    </fc-combobox>`)

    expect(el.value).to.eq('bar')
    el.querySelector<FCListOption>('fc-list-option')!.click()
    await elementUpdated(el)

    expect(el.value).to.eq('foo')
  })

  it('should not be selectable', async () => {
    const el: FCComboBox = await fixture(html`<fc-combobox value="bar" selectable="false">
      <fc-list-option value="foo"></fc-list-option>
      <fc-list-option value="bar"></fc-list-option>
    </fc-combobox>`)

    expect(el.value).to.eq('bar')
    el.querySelector<FCListOption>('fc-list-option')!.click()
    await elementUpdated(el)

    expect(el.value).to.eq('bar')
  })

  it('should filter list by input value', async () => {
    const el: FCComboBox = await fixture(html`<fc-combobox value="bar">
      <fc-list-option value="foo"></fc-list-option>
      <fc-list-option value="bar"></fc-list-option>
      <fc-list-option value="baz"></fc-list-option>
    </fc-combobox>`)

    el.value = 'foo'
    await elementUpdated(el)
    expect(el.visibleOptions.length).to.eq(1)

    await nextFrame()
    expect(el.visibleOptions[0]).to.eq(el.querySelector('[value="foo"]'))
  })

  it('should update value while dispatch input event on input element', async () => {
    const element: FCComboBox = await fixture(html`<fc-combobox value="foo">
      <fc-list-option value="foo"></fc-list-option>
      <fc-list-option value="bar"></fc-list-option>
    </fc-combobox>`)

    element.input!.value = 'bar'
    element.input!.dispatchEvent(new Event('input'))

    await elementUpdated(element)

    expect(element.value).to.eq('bar')
  })

  it('should filter list by input value case sensitivity', async () => {
    const el: FCComboBox = await fixture(html`
      <fc-combobox value="bar" casesensitive>
        <fc-list-option value="Apple"></fc-list-option>
        <fc-list-option value="await"></fc-list-option>
        <fc-list-option value="async"></fc-list-option>
      </fc-combobox>
    `)

    el.input!.value = 'A'
    el.input!.dispatchEvent(new Event('input'))
    await elementUpdated(el)
    expect(el.visibleOptions.length).to.eq(1)
  })

  it('should select a option with input changed value', async () => {
    const el: FCComboBox = await fixture(html`
      <fc-combobox value="foo">
        <fc-list-option value="foo"></fc-list-option>
        <fc-list-option value="bar"></fc-list-option>
      </fc-combobox>
    `)

    el.input!.value = 'bar'
    el.input!.dispatchEvent(new Event('change'))
    await elementUpdated(el)

    expect(el.selectedOption).to.eq(el.querySelector('[value="bar"]'))
  })

  it('should open listbox when focus input', async () => {
    const el: FCComboBox = await fixture(html`
      <fc-combobox>
        <fc-list-option value="foo"></fc-list-option>
        <fc-list-option value="bar"></fc-list-option>
      </fc-combobox>
    `)
    await nextFrame()

    el.input!.focus()

    expect(el.open).to.be.true
  })

  it("should open listbox when click it's label", async () => {
    const el: FCComboBox = await fixture(html`
      <fc-combobox>
        <fc-list-option value="foo"></fc-list-option>
        <fc-list-option value="bar"></fc-list-option>
      </fc-combobox>
    `)
    await nextFrame()

    el.renderRoot.querySelector('label')!.click()

    await elementUpdated(el)

    expect(el.open).to.be.true
  })
})
