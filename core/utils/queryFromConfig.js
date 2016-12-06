const isEmpty = require('./utils').isEmpty
const SQLQueryObject = require('./SQLQueryObject')

function order(queryObj, attrInfo) {
  if (typeof attrInfo === 'string') return order(queryObj, [{ [attrInfo]: "asc" }])
  if (!(attrInfo instanceof Array))
    return order(queryObj, [attrInfo])
  attrInfo = attrInfo.map(table => (
    typeof table === 'string' ? { [table]: "ASC" } : table
  ))
  attrInfo.forEach(orderObj => {
    const attr = Object.keys(orderObj)[0]
    const dir = orderObj[attr].toUpperCase()
    queryObj = queryObj.addOrder(`${queryObj.tableName}.${attr} ${dir}`)
  })

  return queryObj
}

function where(queryObj, whereObj) {
  for (let col in whereObj) {
    let val = whereObj[col]
    if (typeof val === 'string') val = `'${val}'`
    queryObj = (val === null || val === undefined) ?
      queryObj.addWhere(`${queryObj.tableName}.${col} IS NULL`) :
      queryObj.addWhere(`${queryObj.tableName}.${col} = ${val}`) // ESCAPE THESE NOOOO
  }
  return queryObj
}

function _with(queryObj, withObject) {
  if (typeof withObject === 'string')
    return _with(queryObj, [{ [withObject]: {} }])

  if (!(withObject instanceof Array))
    return _with(queryObj, [ withObject ])

  withObject = withObject.map(table => (
    typeof table === 'string' ? { [table]: {} } : table
  ))

  withObject.forEach(tableObj => {
    for (let tableName in tableObj) {
      const config = tableObj[tableName];
      let joinTable = tableName
      if (!isEmpty(config)) joinTable = `(${queryFromConfig(tableName, config).toQuery()}) AS ${tableName}`
      queryObj = queryObj.addJoin(
        joinTable,
        `${joinTable} ON ${tableName}.${queryObj.tableName.slice(0, -1)}_id = ${queryObj.tableName}.id`
      )
    }
  })
  return queryObj
}

function queryFromConfig(resourceConfig, resourceType, configObject = {}) {
  let query = new SQLQueryObject(resourceConfig, resourceType)
  if (configObject.order) query = order(query, configObject.order)
  if (configObject.where) query = where(query, configObject.where)
  if (configObject.with) query = _with(query, configObject.with)
  if (configObject.limit) query.limit = configObject.limit
  return query
}

module.exports = queryFromConfig
