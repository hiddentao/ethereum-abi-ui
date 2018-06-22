import * as fieldTypes from './fieldTypes'
import { TYPES as paramTypes } from './types'
import BoolType from './bool'
import StringType from './string'
import UintType from './uint'

import {
  FIELD_TYPES,
  PARAM_TYPES,
  canRenderMethodParams,
  renderMethodParams,
  canRenderMethodOutputs,
  renderMethodOutputs
} from './'


const ABI = [
  {
    name: 'nonMethod',
    type: 'field'
  },
  {
    name: 'badInputParams',
    inputs: [
      {
        name: 'a',
        type: 'uint256'
      },
      {
        name: 'b',
        type: 'array'
      }
    ],
    type: 'function'
  },
  {
    name: 'goodInputParams',
    inputs: [
      {
        name: 'a',
        type: 'uint256'
      },
      {
        name: 'b',
        type: 'bool'
      }
    ],
    type: 'function'
  },
  {
    name: 'badOutputParams',
    type: 'function',
    outputs: [
      {
        name: 'success',
        type: 'bytes'
      }
    ]
  },
  {
    name: 'goodOutputParams',
    type: 'function',
    outputs: [
      {
        name: 'success',
        type: 'uint8'
      },
      {
        name: 'name',
        type: 'string'
      }
    ]
  }
]

describe('FIELD_TYPES', () => {
  it('is set', () => {
    expect(FIELD_TYPES).toEqual(fieldTypes)
  })
})

describe('PARAM_TYPES', () => {
  it('is set', () => {
    expect(PARAM_TYPES).toEqual(paramTypes)
  })
})

describe('canRenderMethodParams()', () => {
  it('will fail on non-methods', () => {
    expect(canRenderMethodParams(ABI, 'nonMethod')).toBeFalsy()
  })

  it('will fail on unsupported input params', () => {
    expect(canRenderMethodParams(ABI, 'badInputParams')).toBeFalsy()
  })

  it('will pass on supported input params', () => {
    expect(canRenderMethodParams(ABI, 'goodInputParams')).toBeTruthy()
  })
})

describe('canRenderMethodOutputs()', () => {
  it('will fail on non-methods', () => {
    expect(canRenderMethodOutputs(ABI, 'nonMethod')).toBeFalsy()
  })

  it('will fail on unsupported output params', () => {
    expect(canRenderMethodOutputs(ABI, 'badOutputParams')).toBeFalsy()
  })

  it('will pass on supported output params', () => {
    expect(canRenderMethodOutputs(ABI, 'goodOutputParams')).toBeTruthy()
  })
})

describe('renderMethodParams()', () => {
  let renderField

  beforeEach(() => {
    renderField = jest.fn()
  })

  it('will fail on non-methods', () => {
    expect(() => renderMethodParams(ABI, 'nonMethod', renderField)).toThrow()
  })

  it('will fail on unsupported input params', () => {
    expect(() => renderMethodParams(ABI, 'badInputParams', renderField)).toThrow()
  })

  it('will pass on supported input params', () => {
    renderMethodParams(ABI, 'goodInputParams', renderField)

    expect(renderField).toHaveBeenCalledTimes(2)
    expect(renderField.mock.calls[0][0]).toEqual('a')
    expect(renderField.mock.calls[0][1]).toBeInstanceOf(UintType)
    expect(renderField.mock.calls[1][0]).toEqual('b')
    expect(renderField.mock.calls[1][1]).toBeInstanceOf(BoolType)
  })
})

describe('renderMethodOutputs()', () => {
  let renderOutput
  const results = [ 123, 456 ]

  beforeEach(() => {
    renderOutput = jest.fn()
  })

  it('will fail on non-methods', () => {
    expect(() => renderMethodOutputs(ABI, 'nonMethod', results, renderOutput)).toThrow()
  })

  it('will fail on unsupported output types', () => {
    expect(() => renderMethodOutputs(ABI, 'badOutputParams', results, renderOutput)).toThrow()
  })

  it('will pass on supported output types', () => {
    renderMethodOutputs(ABI, 'goodOutputParams', results, renderOutput)

    expect(renderOutput).toHaveBeenCalledTimes(2)
    expect(renderOutput.mock.calls[0][0]).toEqual('success')
    expect(renderOutput.mock.calls[0][1]).toEqual(0)
    expect(renderOutput.mock.calls[0][2]).toBeInstanceOf(UintType)
    expect(renderOutput.mock.calls[0][3]).toEqual(123)
    expect(renderOutput.mock.calls[1][0]).toEqual('name')
    expect(renderOutput.mock.calls[1][1]).toEqual(1)
    expect(renderOutput.mock.calls[1][2]).toBeInstanceOf(StringType)
    expect(renderOutput.mock.calls[1][3]).toEqual(456)
  })
})
