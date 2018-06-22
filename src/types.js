import AddressType from './address'
import BoolType from './bool'
import UintType from './uint'
import IntType from './int'
import StringType from './string'


const MAPPING = {
  address: AddressType,
  bool: BoolType,
  string: StringType,
  int: IntType,
  uint: UintType
}

export const TYPES = Object.keys(MAPPING)

export const buildType = item => {
  const { type } = item

  let instance
  TYPES.forEach(supportedType => {
    if (type.startsWith(supportedType)) {
      instance = new MAPPING[supportedType](type)
    }
  })

  if (!instance) {
    throw new Error(`Unsupported type: ${type}`)
  }

  return instance
}
