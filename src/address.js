import { isAddress } from 'web3-utils'
import { ADDRESS } from './fieldTypes'

export default class Address {
  fieldType = () => ADDRESS
  placeholderText = () => '0x...'
  isValid = addr => !!(addr && isAddress(addr))
  sanitize = addr => {
    if (addr) {
      if (!addr.startsWith('0x')) {
        return `0x${addr}`
      }
    }

    return addr
  }
}
