import { expect, fixture, nextFrame } from '@open-wc/testing'
import Sinon from 'sinon'
import type FormAssociated from '.'

const ElementInternals = Reflect.get(window, 'ElementInternals')
describe('FormAssociated use proxy', function () {
  before(async () => {
    Reflect.set(window, 'ElementInternals', { prototype: {} })

    const { default: FormAssociated } = await import('.')

    class CE extends FormAssociated {}
    customElements.define('fc-ce', CE)
  })

  after(() => {
    Reflect.set(window, 'ElementInternals', ElementInternals)
  })

  it('should return false of formAssociated', async () => {
    const { default: FormAssociated } = await import('.')

    expect(FormAssociated.formAssociated).be.false
  })

  it('should attach Proxy element to host', async () => {
    const ce = await fixture<FormAssociated>('<fc-ce></fc-ce>')
    expect(ce.contains(ce.proxy)).be.true
  })

  it('should have a proxy slot', async () => {
    const ce = await fixture<FormAssociated>('<fc-ce></fc-ce>')
    expect(ce.proxySlot).not.be.undefined
  })

  it('should not have a elementInternals', async () => {
    const form = await fixture<HTMLFormElement>('<form action="#"><fc-ce></fc-ce></form>')
    const ce = form.querySelector<FormAssociated>('fc-ce')!

    await nextFrame()
    expect(() => {
      expect(ce.elementInternals).be.eq(undefined)
    }).to.throw(
      "Failed to read the 'form' property from 'ElementInternals': The target element is not a form-associated custom element."
    )
  })

  it('should be required on submit', async () => {
    const form = await fixture<HTMLFormElement>(`
      <form action="#">
        <fc-ce required></fc-ce>
        <button type="submit">x</button>
      </form>
    `)

    const fn = Sinon.spy(e => e.preventDefault())
    form.addEventListener('submit', fn)

    const fn2 = Sinon.spy()
    form.querySelector<FormAssociated>('fc-ce')!.addEventListener('invalid', fn2)

    form.querySelector('button')!.click()

    await nextFrame()

    expect(fn.called, 'submit').be.false
    expect(fn2.called, 'invalid').be.true
  })

  it('should be invalid', async () => {
    const form = await fixture<HTMLFormElement>(`
      <form action="#">
        <fc-ce required></fc-ce>
        <button type="submit">x</button>
      </form>
    `)

    const ce = form.querySelector<FormAssociated>('fc-ce')!
    expect(ce.validated.valid, 'valid').be.false
    expect(ce.validationMessage?.length, 'message').not.eq(0)
    expect(ce.willValidate, 'willValidate').be.true
    expect(ce.reportValidity(), 'reportValidity').be.false
    expect(ce.checkValidity(), 'checkValidity').be.false
  })

  it('should be validated', async () => {
    const form = await fixture<HTMLFormElement>(`
      <form action="#">
        <fc-ce></fc-ce>
        <button type="submit">x</button>
      </form>
    `)

    const ce = form.querySelector<FormAssociated>('fc-ce')!
    expect(ce.validated.valid, 'valid').be.true
    expect(ce.validationMessage?.length).eq(0)
    expect(ce.willValidate, 'willValidate').be.true
    expect(ce.reportValidity(), 'reportValidity').be.true
    expect(ce.checkValidity(), 'checkValidity').be.true
  })

  it('should be a form field', async () => {
    const form = await fixture<HTMLFormElement>(`
      <form action="#">
        <fc-ce name="foo" value="bar"></fc-ce>
        <button type="submit">x</button>
      </form>
    `)

    expect(new FormData(form).get('foo')).eq('bar')
  })
})
