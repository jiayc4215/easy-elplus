export const objectToString = Object.prototype.toString
export const toTypeString = value => objectToString.call(value)

export const isUndefined = val => typeof val === "undefined"
export const isBoolean = val => typeof val === "boolean"
export const isNumber = val => typeof val === "number" && !Number.isNaN(val)

// === vue shared ===
export const isString = val => typeof val === "string"
export const isArray = Array.isArray
export const isFunction = val => typeof val === "function"
export const isObject = val => val !== null && typeof val === "object"
export const isDate = val => toTypeString(val) === "[object Date]"
export const isPromise = val => {
  return (isObject(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch)
}
export const isSymbol = val => typeof val === "symbol"
export const isPlainObject = val => toTypeString(val) === "[object Object]"
export const NOOP = () => {}
