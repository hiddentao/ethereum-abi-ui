import { BOOLEAN } from './fieldTypes'

export default class Bool {
  fieldType = () => BOOLEAN
  placeholderText = () => '0/1'
  isValid = () => true
  sanitize = val => val
}
