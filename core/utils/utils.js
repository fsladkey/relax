const Immutable = require('immutable')

function isEmpty(obj) {
    for (var key in obj) if (hasOwnProperty.call(obj, key)) return false;
    return true;
}

function objectFilter(obj, cb) {
  const newObj = {}
  for (let key in obj) {
    if (cb(key, obj[key])) newObj[key] = this[key]
  }
  return newObj
}

function filterMap(arr, cb) {
  const newArr = []
  for (var i = 0; i < arr.length; i++) {
    const item = arr[i];
    result = cb(item, i, arr)
    if (typeof result !== 'undefined') newArr.push(result)
  }
  return newArr
}

function mapFromArray(items) {
  const obj = {}
  items.forEach(item => obj[item.id] = item)
  return Immutable.Map(obj)
}

function only(...args) {
  const obj = args.pop()
  return objectFilter(obj, (key, val) => args.includes(key))
}

function except(...args) {
  const obj = args.pop()
  return objectFilter(obj, (key, val) => !args.includes(key))
}


function matches(item, clauses) {
  return Object.keys(clauses).reduce((result, col) => {
    return result && item[col] == clauses[col]
  }, true)
}

function deepMerge(obj, toMerge) {
  const newObj = Object.assign({}, obj)
  for (let key in toMerge) {
    const newVal = toMerge[key]
    newObj[key] = (newVal && newVal.constructor === Object ?
      deepMerge(newObj[key], newVal) :
      newVal)
  }
  return newObj
}

module.exports = {
  matches,
  deepMerge,
  except,
  only,
  mapFromArray,
  objectFilter,
  filterMap,
  isEmpty
}
