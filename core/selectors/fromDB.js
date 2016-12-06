// from("posts").get() // for singular item
// from("posts").get(1)
// from("posts").get({ session_token: "aosjn1234i120381y2"})
// from("posts").get.all()
// from("posts").get.all({ where: ["createdAt > ?", new Date()]})
// from("posts").post({ title: "title" });
// from("posts").patch({ id: 1, title: "title" });
// from("posts").patch(1, { title: "title" });
// from("posts").delete(1);
// from("posts").delete();
// from("posts").delete({ title: "delatable" });

const queryFromConfig = require('../utils/queryFromConfig')

module.exports = function createFromDB(resourceConfig, dbConnection) {
  return function from(resourceType) {
    const resourceInfo = resourceConfig[resourceType]

    function getByAttrs(attrs) {
      return get.all({ where: attrs, limit: 1 })
        .then(result => result[0] || null)
    }

    function get(param) {
      return (typeof param === 'object') ?
        getByAttrs(param) :
        getByAttrs({ id: param })
    }

    get.all = (configObject = {}) => {
      return dbConnection.execute(
        queryFromConfig(resourceConfig, resourceType, configObject).toQuery()
      )
    }

    get.one = get

    function post(data) {
      if (typeof id === 'object') return patch(id.id, id)

      return dbConnection.execute(
        SQLInsertObject(resourceType, data).toQuery()
      )
    }

    function patch(id, data) {
      if (typeof id === 'object') return patch(id.id, id)

      return dbConnection.execute(
        SQLUpdateObject(resourceType, id, data).toQuery()
      )
    }

    function _delete(id) {
      return dbConnection.execute(
        SQLDeleteObject(resourceType, id).toQuery()
      )
    }

    return { get, post, patch, delete: _delete }
  }
}
