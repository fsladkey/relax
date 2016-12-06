urls() {
  return {
    "index": {
      verb: "GET"
      url: '/api/${ this.tableName }',
      method: this.index
    },
    "show": {
      url: '/api/${ this.tableName }/:id',
      verb: "GET",
      method: this.show
    }
    "create": {
      url: '/api/${ this.tableName }/:id',
      verb: "POST",
      method: this.create
    },
    "update": {
      url: '/api/${ this.tableName }/:id',
      verb: "PATCH",
      method: this.update
    },
    "destroy": {
      url: '/api/${ this.tableName }/:id',
      verb: "DELETE",
      method: this.destroy
    }
  }
}
