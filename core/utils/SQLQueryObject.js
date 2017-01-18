function selectAllColumns(resourceType, columns) {
  return columns.map(col => `${resourceType}.${col}`)
}

// TODO: ESCAPE VALUES
module.exports = class SQLQueryObject {
  constructor(resourceConfig, resourceType, params = {}) {
    this.tableName = resourceConfig[resourceType].tableName || resourceType
    this.resourceConfig = resourceConfig
    this.resourceType = resourceType
    const columns = Object.keys(resourceConfig[resourceType].model.describe)
    params = Object.assign({
      select: selectAllColumns(resourceType, columns),
      joins: [],
      where: [],
      order: [],
      limit: null
    }, params)
    for (let key in params) this[key] = params[key]
  }

  addJoin(joinTable, join) {
    const columns = Object.keys(this.resourceConfig[joinTable].model.describe)
    return new SQLQueryObject(
      this.tablename,
      Object.assign(
        {},
        this,
        {
          joins: [ ...this.joins, join ],
          select: [ ...this.select, selectAllColumns(joinTable, columns) ]
        }
      )
    )
  }

  addWhere(where) {
    return new SQLQueryObject(
      this.tablename,
      Object.assign({}, this,  { where: [ ...this.where, where ] })
    )
  }

  addOrder(order) {
    return new SQLQueryObject(
      this.tablename,
      Object.assign({}, this,  { order: [ ...this.order, order ] })
    )
  }

  toQuery() {
    let query = `SELECT ${ this.select } FROM ${ this.tableName } `
    if (this.joins.length > 0) {
      this.joins.forEach(join => query += `JOIN ${join} `)
    }
    if (this.where.length > 0) {
      const whereClause = this.where.join(" AND ")
      query += `WHERE ${whereClause} `
    }
    if (this.order.length > 0) {
      const orderClause = this.order.join(", ")
      query += `ORDER BY ${orderClause} `
    }
    if (this.limit) {
      query += `LIMIT ${this.limit}`
    }

    return query.trim()
  }
}
