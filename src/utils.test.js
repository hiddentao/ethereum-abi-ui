import {
  SUPPORTED_INPUT_TYPES,
  getAbiJson,
  getMethodDefinition
} from './utils'

describe('SUPPORTED_INPUT_TYPES', () => {
  it('is set', () => {
    expect(SUPPORTED_INPUT_TYPES).toEqual([
      'address',
      'bool',
      'string',
      'int',
      'uint'
    ])
  })
})

describe('getAbiJson()', () => {
  it('fails to parse bad JSON string', () => {
    expect(() => {
      getAbiJson('abcdef')
    }).toThrow('Invalid ABI json')
  })

  it('parses good JSON string', () => {
    const input = { my: 'name' }

    expect(getAbiJson(JSON.stringify(input))).toEqual(input)
  })

  it('returns object as-is', () => {
    const input = { my: 'name' }

    expect(getAbiJson(input)).toEqual(input)
  })
})

describe('getMethodDefinition()', () => {
  let abi = [
    {
      type: 'variable',
      name: 'moby',
      params: 456
    },
    {
      type: 'function',
      name: 'magic'
    },
    {
      type: 'variable',
      name: 'foobar',
      params: 456
    },
    {
      type: 'function',
      name: 'foobar',
      params: 123
    },
    {
      type: 'function',
      name: 'foobar',
      params: 789
    }
  ]

  it('does not return non-methods', () => {
    expect(getMethodDefinition(abi, 'moby')).toBeUndefined()
  })

  it('returns first matching method', () => {
    expect(getMethodDefinition(abi, 'foobar')).toEqual({
      type: 'function',
      name: 'foobar',
      params: 123
    })
  })
})
