// from("posts").get() // for singular item
// from("posts").get(1)
// from("posts").get({ session_token: "aosjn1234i120381y2"})
// from("posts").get.all()
// from("posts").get.all({ where: ["createdAt > ?", new Date()]})
// from("posts").post({ title: "title" });
// from("posts").patch({ id: 1, title: "title" });
// from("posts").patch(1, { title: "title" });
// from("posts").patch({ title: "old title"}, { title: "new title" });
// from("posts").delete(1);
// from("posts").delete();
// from("posts").delete({ title: "delatable" });

const buildFromConfig = require('./buildFromConfig')

module.exports = function createFromState(resourceConfig, getState) {
  return function from(resourceType) => {
    const items = getState()[resourceType]
    const resourceInfo = resource[resourceType]

    function getById(id) {
      return items[id]
    }

    function getByAttrs(attrs) {
      return get.all({ where: attrs, limit: 1 })[0] || null
    }

    function get(param) {
      if (typeof param === 'object') return getByAttrs(param)
      return getById(param)
    }

    get.all = (configObject = {}) => {
      return buildFromConfig(state, resourceType, configObject)
    }

    get.one = get
    return { get }
  }
}
