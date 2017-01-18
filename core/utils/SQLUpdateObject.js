class SQLUpdateObject {
  constructor(tableName, id, attrs = {}) {
    this.tableName = tableName
    this.id = id
    this.attrs = attrs
  }

  toQuery() {
    // TODO: ESCAPE VALUES
    const columns = except("id", this.attrs
    const setters = this.attrs.map(col => {
      if (obj_params[col]) return "${col} = ${ obj_params[col] }"
    }).join(", ") //sanitize


    let queryString = `UPDATE ${ this.tableName } SET ${ setters } `
    queryString += `WHERE ${ this.tableName }.id = ${ this.id }`
    return queryString
  }
}
