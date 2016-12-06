const matches = require('./utils').matches
const deepMerge = require('./utils').deepMerge

function all(tableName, state) {
  const items = []
  const stateObj = state[tableName]
  for (let id in stateObj) items.push(stateObj[id])
  return items
}

function sortBy(items, attrInfo) {
  if (typeof attrInfo === 'string') return sortBy(items, { [attrInfo]: "asc" })
  const attr = Object.keys(attrInfo)[0]
  const dir = attrInfo[attr]
  const comparator = dir.toLowerCase() === "asc" ?
    (a, b) => a < b : (a, b) => a > b

  return items.sort((a, b) => comparator(a[attr], b[attr]) ? -1 : 1)
}

function where(items, clauses) {
  return items.filter(item => {
    return matches(item, clauses)
  })
}

function _with(state, resourceType, items, otherTables) {
  if (typeof otherTables === 'string')
    return _with(state, resourceType, items, [{ [otherTables]: {} }])

  if (!(otherTables instanceof Array))
    return _with(state, resourceType, items, [ otherTables ])

  otherTables = otherTables.map(table => (
    typeof table === 'string' ? { [table]: {} } : table
  ))

  otherTables.forEach((tableObj) => {
    for (let tableName in tableObj) {
      const config = tableObj[tableName];
      items = items.map(item => {
        const associatedItems = buildFromConfig(
          state,
          tableName,
          deepMerge(config, { where: { [`${resourceType}Id`]: item.id } })
        )
        return Object.assign({}, item, { [tableName]: associatedItems } );
      })
    }
  })
  return items
}

function buildFromConfig(state, resourceType, configObject = {}) {
  let items = all(resourceType, state)
  if (configObject.order) items = sortBy(items, configObject.order)
  if (configObject.where) items = where(items, configObject.where)
  if (configObject.with) items = _with(state, resourceType, items, configObject.with)
  if (configObject.limit) items = items.slice(0, configObject.limit)
  return items
}

module.exports = buildFromConfig
