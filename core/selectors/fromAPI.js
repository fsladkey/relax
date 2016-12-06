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

function createFromAPI(resourceConfig) {
  return function from(resourceType) => {
    const resourceInfo = resourceConfig[resourceType]

    function fetchById(id) {
      const action = resourceInfo.urls.show
      return fetch(only("url", "verb", action))
    }

    function fetchByAttrs(attrs) {
      return get.all({ where: attrs, limit: 1 })
    }

    function get(param) {
      if (typeof param === 'object') return fetchByAttrs(param)
      return fetchById(param)
    }

    get.all = function(configObject = {}) {
      const action = resourceInfo.urls.index
      return fetch({
        ...only("url", "verb", action)
        data: configObject
      })
    }

    get.one = get

    function post(data) {
      const action = resourceInfo.urls.create
      return fetch({
        ...only("url", "verb", action),
        data
      })
    }

    function patch(id, data) {
      if (typeof id === 'object') return patch(id.id, id)
      const action = resourceInfo.urls.update
      const params = { ...only("url", "verb", action), data }
      params.url = params.url.replace(":id", id)
      return fetch(params)
    }

    function delete(id) {
      const action = resourceInfo.urls.destroy
      const params = only("url", "verb", action)
      params.url = params.url.replace(":id", id)
      return fetch(params)
    }

    return { get, post, patch, delete, put: patch }
  }
}
