import { TEXT } from './fieldTypes'

export default class String {
  fieldType = () => TEXT
  placeholderText = () => `...`
  isValid = str => !!str
  sanitize = str => (str || '').trim()
}
