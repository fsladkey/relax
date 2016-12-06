function createDefaultRoutes(resourceName, core) {
  const actions = core[resourceName].actions
  const createHandler = (name) => actions[name]
  return [
    { method: 'GET', path: `/${resourceName}`, handler: createHandler("index") },
    { method: 'GET', path: `/${resourceName}/:id`, handler: createHandler("show") },
    { method: 'POST', path: `/${resourceName}`, handler: createHandler("create") },
    { method: 'PATCH', path: `/${resourceName}/:id`, handler: createHandler("update") },
    { method: 'DELETE', path: `/${resourceName}/:id`, handler: createHandler("destroy") }
  ]
}
function createSingularRoutes(resourceName, core) {
  const actions = core[resourceName].actions
  const createHandler = (name) => actions[name]
  return [
    { method: 'GET', path: `/${resourceName}`, handler: createHandler("show") },
    { method: 'POST', path: `/${resourceName}`, handler: createHandler("create") },
    { method: 'PATCH', path: `/${resourceName}`, handler: createHandler("update") },
    { method: 'DELETE', path: `/${resourceName}`, handler: createHandler("destroy") }
  ]
}

function genericActions(resourceName, core) {
  const actions = {}
  const genericHandler = (type) => (req, res) => {
    res.render(`This ${type} handler not implemented`)
  }
  ;["index", "show", "create", "update", "destroy"].forEach(type) => {
    actions[type] = genericHandler(type)
  }
  return actions;
}

function persistantActions(resourceName, { from }) {
  return {
    index(req, res) {
      from(resourceName).get.all(req.params.config).then(resource => {
        res.render({ json: resource })
      });
    },

    show(req, res) {
      from(resourceName).get(req.params.id).then(resource => {
        res.render({ json: resource })
      });
    },

    create(req, res) {
      from(resourceName).post(req.params[resourceName]).then(resource => {
        res.render({ json: resource })
      });
    },

    update(req, res) {
      const { id } = req.params
      from(resourceName).patch(id, req.params[resourceName]).then(resource => {
        res.render({ json: resource })
      });
    },

    destroy(req, res) {
      const { id } = req.params
      from(resourceName).delete(id).then(resource => {
        res.render({ json: resource })
      });
    }
  }
}

module.exports.resource = (name, options) => {
  const resource = (core) => {
    return {
      routes: options.routes(core) || defaultRoutes(name, core),
      actions: options.actions(core) || genericActions(name, core)
    }
  }
  resource.resourceName = name
  return resource
}

module.exports.singular = (resource) {
  return (core) => {
    return Object.assign({
      routes: createSingularRoutes(resource.resourceName)
    }, resource(core))
  }
}

module.exports.persistant = (resource, model) => {
  return (core) => {
    return Object.assign({
      actions: createPersistantActions(resource.resourceName, core)
      model
    }, resource(core))
  }
}

module.exports.restricted = (resource, authorizers) => {
  return (core) => {
    return Object.assign({
      actions: createPersistantActions(resource.resourceName, core)
    }, resource(core))
  }
}
