import AddressType from './address'
import BoolType from './bool'
import UintType from './uint'
import IntType from './int'
import StringType from './string'

import { TYPES, buildType } from './types'

describe('TYPES', () => {
  it('is set', () => {
    expect(TYPES).toEqual([
      'address',
      'bool',
      'string',
      'int',
      'uint'
    ])
  })
})

describe('buildType()', () => {
  it('cannot handle invalid types', () => {
    expect(() => buildType('blah')).toThrow('Unsupported type: blah')
  })

  it('buils the right instance for a given type', () => {
    expect(buildType('string')).toBeInstanceOf(StringType)
    expect(buildType('bool')).toBeInstanceOf(BoolType)
    expect(buildType('address')).toBeInstanceOf(AddressType)
    expect(buildType('int')).toBeInstanceOf(IntType)
    expect(buildType('int128')).toBeInstanceOf(IntType)
    expect(buildType('uint')).toBeInstanceOf(UintType)
    expect(buildType('uint128')).toBeInstanceOf(UintType)
  })
})
