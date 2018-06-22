import Bool from './bool'
import { BOOLEAN } from './fieldTypes'

describe('bool', () => {
  let f

  beforeEach(() => {
    f = new Bool()
  })

  it('has a field type', () => {
    expect(f.fieldType()).toEqual(BOOLEAN)
  })

  it('has placeholder text', () => {
    expect(f.placeholderText()).toEqual('0/1')
  })

  it('has a validator', () => {
    expect(f.isValid()).toEqual(true)
    expect(f.isValid('abc')).toEqual(true)
  })

  it('has a sanitizer', () => {
    expect(f.sanitize()).toEqual(undefined)
    expect(f.sanitize('abc')).toEqual('abc')
  })
})
