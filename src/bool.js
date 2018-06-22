import { BOOLEAN } from './fieldTypes'

export default class Bool {
  fieldType = () => BOOLEAN
  placeholderText = () => '0 or 1'
  isValid = () => true
  sanitize = val => val
}
