  // returns true if type is of type, and false if not
const isObject = any => any && typeof any === 'object' && any.constructor === Object

const isString = any => typeof any === 'string' || any instanceof String

const isNumber = any => typeof any === 'number' && isFinite(any)

const isArray = any => Array.isArray(any)

const isFunction = any => typeof any === 'function'

const isNull = any => any === null

const isUndefined = any => typeof any === 'undefined'

const isBoolean = any => typeof any === 'boolean'

const isRegExp = any => any && typeof any === 'object' && any.constructor === RegExp

const isError = any => any instanceof Error && typeof any.message !== 'undefined'

const isDate = any => any instanceof Date

const isSymbol = any => typeof any === 'symbol'

export {
  isObject,
  isString,
  isNumber,
  isArray,
  isFunction,
  isNull,
  isUndefined,
  isBoolean,
  isRegExp,
  isError,
  isDate,
  isSymbol,
}
