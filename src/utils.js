export const SUPPORTED_INPUT_TYPES = [
  'address',
  'bool',
  'string',
  'int',
  'uint'
]

export const getAbiJson = abi => {
  let json = abi

  try {
    if (typeof json === 'string') {
      json = JSON.parse(json)
    }
  } catch (err) {
    throw new Error('Invalid ABI json')
  }

  return json
}

export const getMethodDefinition = (abi, method) => {
  const json = getAbiJson(abi)

  return json.find(({ type, name }) => (
    name === method && type === 'function'
  ))
}
