import { TEXT } from './fieldTypes'

export default class String {
  fieldType = () => TEXT
  placeholderText = () => `abc...`
  isValid = str => !!str
  sanitize = str => (str || '').trim()
}
