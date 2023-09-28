/**
 * Creates an object of dot notational paths
 *
 * @param {object} obj The object to deconstruct
 * @param {Function} fn
 * @param {string} [path] The original prefix to start the dot notation
 * @param {boolean} [recursed] = false
 * @returns {*}
 */
export function getObjPaths(obj, fn, path = '', recursed = false) {
  if (!recursed && (typeof obj).toLowerCase() !== 'object') {
    return fn(null, obj)
  }

  Object.entries(obj || {}).forEach(([key, val]) => {
    const _key = path.length ? [path, key].join('.') : key
    const arrayCheck = Array.isArray(val)
    const nullCheck = val === null
    const objectCheck = (typeof val).toLowerCase() !== 'object'

    // Do not recurse upon primitive objects
    // Do not recurse upon Arrays
    // Do not recurse upon Mongoose ObjectIDs
    if (objectCheck || arrayCheck || nullCheck || (!nullCheck && !Object.keys(val).length)) {
      return fn(_key, val)
    }

    // Recurse
    return getObjPaths(val, fn, _key, true)
  })

  return true
}

/**
 * Get the value of the path in an Object
 *
 * @param {object} obj The object to traverse
 * @param {string} _path The path to the value
 * @param {object} [opts] Additional options
 * @param {object} [opts.split=true]
 * @returns {*}
 */
export function getObjValue(obj = {}, _path = '', opts = { split: true }) {
  if (obj === undefined) return undefined

  // Do not alter if already the proper type
  let path = !Array.isArray(_path) ? undefined : _path

  if (path === undefined) {
    // Convert to an array
    path = opts.split ? _path.toString().split('.') : [_path.toString()]
  }

  // If the prop does not exist, return undefined
  // Otherwise, return the value
  return path.reduce((val, part) => {
    if (val?.[part] === undefined) return undefined
    return val[part]
  }, obj)
}

/**
 * Set the value of the path in an Object
 *
 * @param {object} obj The object to traverse
 * @param {Array | string} [_path] The path to the value
 * @param {*} val The value to store
 * @param {object} [opts] Additional options
 * @param {object} [opts.split=true]
 * @returns {object}
 */
export function setObjValue(obj = {}, _path = [], val = undefined, opts = { split: true }) {
  // Do not alter if already the proper type
  let path = !Array.isArray(_path) ? undefined : _path

  if (path === undefined) {
    // Convert to an array
    path = opts.split ? _path.toString().split('.') : [_path.toString()]
  }

  if (!path.length) {
    // Edge case: No path length. Just return
    return obj
  }
  if (path.length === 1) {
    // When there is no more depth to recurse, assign the value
    obj[path] = val
    return obj
  }

  // Get the prop
  const field = path.shift()

  if (field.includes('[')) {
    // Array, not an Object
    const [shortField, key] = field.match(/\w+\b/g)

    // If the prop does not exist, create it
    if (!Object.prototype.hasOwnProperty.call(obj, shortField)) obj[shortField] = []

    // Instantiate the array index, if required
    if (!obj[shortField][key || 0]) obj[shortField][key || 0] = {}

    // Recurse
    obj[shortField][key] = setObjValue(obj[shortField][key], path, val)
  } else {
    // If the prop does not exist, create it
    if (!Object.prototype.hasOwnProperty.call(obj, field)) obj[field] = {}

    // Recurse
    obj[field] = setObjValue(obj[field], path, val)
  }

  return obj
}
