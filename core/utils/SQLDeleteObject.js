class SQLDeleteObject {
  constructor(tableName, id) {
    this.tableName = tableName
    this.id = id
  }

  toQuery() {
    let queryString = `DELETE FROM ${ this.tableName }`
    queryString += `WHERE ${ this.tableName }.id = ${ this.id }`
    return queryString
  }
}
