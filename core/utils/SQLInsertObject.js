class SQLUpdateObject {
  constructor(tableName, attrs = {}) {
    this.tableName = tableName
    this.attrs = attrs
  }

  toQuery() {
    // TODO: ESCAPE VALUES
    const columns = Object.keys(except("id", this.attrs))
    const values = columns.map(col => this.attrs[col])
    let queryString = `INSERT INTO ${ this.tableName } (${ columns }) `
    queryString += `VALUES (${ values })`
    return queryString
  }
}
