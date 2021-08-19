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

  it('should set value matched list-option to selected', async () => {
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
    expect(el.selectedOption).to.eq(el.querySelector('fc-list-option:last-child'))
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

  it('should filter list by input value', async () => {
    const el: FCComboBox = await fixture(html`<fc-combobox value="bar">
      <fc-list-option value="foo"></fc-list-option>
      <fc-list-option value="bar"></fc-list-option>
      <fc-list-option value="baz"></fc-list-option>
    </fc-combobox>`)

    el.value = 'foo'
    await elementUpdated(el)

    expect(el.visibleOptions.length).to.eq(1)
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
})
