import Address from './address'
import { ADDRESS } from './fieldTypes'

describe('address', () => {
  let f

  beforeEach(() => {
    f = new Address()
  })

  it('has a field type', () => {
    expect(f.fieldType()).toEqual(ADDRESS)
  })

  it('has placeholder text', () => {
    expect(f.placeholderText()).toEqual('0x...')
  })

  it('has a validator', () => {
    expect(f.isValid()).toEqual(false)
    expect(f.isValid('abc')).toEqual(false)
    expect(f.isValid('0x12344')).toEqual(false)
    expect(f.isValid('0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe')).toEqual(true)
    expect(f.isValid('0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae')).toEqual(true)
  })

  it('has a sanitizer', () => {
    expect(f.sanitize()).toEqual(undefined)
    expect(f.sanitize('abc')).toEqual('0xabc')
    expect(f.sanitize('0x12344')).toEqual('0x12344')
  })
})
