const toString = (s: unknown) => Object.prototype.toString.call(s).slice(8, -1)

export const isString = (s: unknown): s is string => toString(s) === 'String'
export const isBoolean = (s: unknown): s is boolean => toString(s) === 'Boolean'
export const isArray = (s: unknown): s is Array<unknown> => Array.isArray(s) || toString(s) === 'Array'
export const isNumber = (s: unknown): s is number => toString(s) === 'Number'
export const isObject = (s: unknown): s is Record<PropertyKey, any> => toString(s) === 'Object'
export const isUndefined = (s: unknown): s is undefined => toString(s) === 'Undefined'
export const isNull = (s: unknown): s is null => toString(s) === 'Null'
export const isSymbol = (s: unknown): s is symbol => typeof s === 'symbol'
export const isFunction = (s: unknown): boolean => typeof s === 'function'
