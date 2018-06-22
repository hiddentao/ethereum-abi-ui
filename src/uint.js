import BN from 'bn.js'
import { NUMBER } from './fieldTypes'

export default class Uint {
  constructor (abiType) {
    // skip the "int" part at the start
    let M = abiType.substr(4)
    if (!M.length) {
      M = '256'
    }
    this.maxInt = new BN('2', 10).pow(new BN(M, 10))
    this.minInt = new BN('0', 10)
  }
  fieldType = () => NUMBER
  placeholderText = () => `123...`
  isValid = val => {
    const v = parseInt(`${val}`, 10)

    if (Number.isNaN(v)) {
      return false
    }

    const bv = new BN(v, '10')

    return bv.gte(this.minInt) && bv.lte(this.maxInt)
  }
  sanitize = v => (v || '').trim()
}
