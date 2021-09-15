import { expect, fixture, nextFrame } from '@open-wc/testing'
import Sinon from 'sinon'
import FormAssociated from '.'

describe('FormAssociated use ElementInternals', function () {
  before(() => {
    class CE extends FormAssociated {}
    customElements.define('fc-ce', CE)
  })

  it('should return false of formAssociated', async () => {
    expect(FormAssociated.formAssociated).be.true
  })

  it('should not attach proxy element', async () => {
    const ce = await fixture<FormAssociated>('<fc-ce></fc-ce>')
    expect(ce.proxySlot).be.undefined
  })

  it('should have a elementInternals', async () => {
    const form = await fixture<HTMLFormElement>('<form action="#"><fc-ce></fc-ce></form>')
    const ce = form.querySelector<FormAssociated>('fc-ce')!

    await nextFrame()
    expect(ce.elementInternals).not.be.eq(undefined)
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

describe('form-associated type file', function () {
  before(() => {
    class FileInput extends FormAssociated {
      connectedCallback(): void {
        super.connectedCallback()
        if (this.proxy instanceof HTMLInputElement) {
          this.proxy.type = 'file'
        }
      }
    }

    customElements.define('fc-file', FileInput)
  })

  it('should failed to set value on file input', async () => {
    const bit = new TextEncoder().encode('foo')
    const file = new File([bit], 'foo.txt')
    const fn = Sinon.spy()
    console.error = fn

    const form = await fixture<HTMLFormElement>(`
        <form action="#">
          <fc-file required></fc-file>
          <input type="submit">
        </form>
    `)

    const fileInput = form.querySelector<FormAssociated>('fc-file')!
    fileInput.value = file

    await nextFrame()
    expect(fileInput.proxy.type).eq('file')
    expect(fileInput.value).be.undefined
    expect(fn.called).be.true
  })
})
