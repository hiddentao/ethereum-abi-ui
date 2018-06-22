import { TYPES, buildType } from './types'
import { getMethodDefinition } from './utils'
import * as ALL_FIELD_TYPES from './fieldTypes'

export const FIELD_TYPES = ALL_FIELD_TYPES
export const PARAM_TYPES = TYPES

const _canRenderMethodTypes = (abi, method, typeCategory) => {
  const def = getMethodDefinition(abi, method)

  if (!def) {
    return false
  }

  let can = true

  ;(def[typeCategory] || []).forEach(item => {
    const { type } = item

    can = can && TYPES.reduce((m, st) => (
      m || type.startsWith(st)
    ), false)
  })

  return can
}

export const canRenderMethodParams = (abi, method) => _canRenderMethodTypes(abi, method, 'inputs')

export const renderMethodParams = (abi, method, renderField) => {
  if (!canRenderMethodParams(abi, method)) {
    throw new Error('Cannot render inputs, not all types supported')
  }

  const def = getMethodDefinition(abi, method)

  ;(def.inputs || []).forEach(input => {
    const instance = buildType(input.type)

    renderField(input.name, instance)
  })
}

export const canRenderMethodOutputs = (abi, method) => _canRenderMethodTypes(abi, method, 'outputs')

export const renderMethodOutputs = (abi, method, results, renderValue) => {
  if (!canRenderMethodOutputs(abi, method)) {
    throw new Error('Cannot render outputs, not all types supported')
  }

  const def = getMethodDefinition(abi, method)

  ;(def.outputs || []).forEach((output, index) => {
    const instance = buildType(output.type)

    renderValue(output.name, index, instance, results[index])
  })
}
