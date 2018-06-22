import Str from './string'
import { TEXT } from './fieldTypes'

describe('uint', () => {
  let f

  beforeEach(() => {
    f = new Str('uint')
  })

  it('has a field type', () => {
    expect(f.fieldType()).toEqual(TEXT)
  })

  it('has placeholder text', () => {
    expect(f.placeholderText()).toEqual('...')
  })

  it('has a validator', () => {
    expect(f.isValid()).toEqual(false)
    expect(f.isValid('')).toEqual(false)
    expect(f.isValid('abc')).toEqual(true)
    expect(f.isValid('123')).toEqual(true)
  })

  it('has a sanitizer', () => {
    expect(f.sanitize()).toEqual('')
    expect(f.sanitize('123')).toEqual('123')
    expect(f.sanitize('  123 ')).toEqual('123')
  })
})
