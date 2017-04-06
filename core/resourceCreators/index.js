const snakeCase = require('snake-case')
const ACTION_TYPES = ["index", "show", "create", "update", "destroy"]

const genericHandler = (type) => (req, res) => {
  res.render(`This ${type} handler not implemented`)
}

const matcher = (resourceName) => {
  return new RegExp(`^\/${snakeCase(resourceName)}\/?$`)
}

const matchOne =(resourceName) => {
  return new RegExp(`^\/${snakeCase(resourceName)}\/(.+)\/?$`)
}

function defaultRoutes(resourceName, core) {
  const createHandler = (name) => (...args) => (
    core[resourceName].actions[name](...args)
  )
  return [
    { method: 'GET', path:  matcher(resourceName), handler: createHandler("index") },
    { method: 'GET', path: matchOne(resourceName), handler: createHandler("show") },
    { method: 'POST', path:  matcher(resourceName), handler: createHandler("create") },
    { method: 'PATCH', path: matchOne(resourceName), handler: createHandler("update") },
    { method: 'DELETE', path: matchOne(resourceName), handler: createHandler("destroy") }
  ]
}
function singularRoutes(resourceName, core) {
  const createHandler = (name) => (...args) => (
    core[resourceName].actions[name](...args)
  )
  const path = matcher(resourceName)
  return [
    { method: 'GET', path, handler: createHandler("show") },
    { method: 'POST', path, handler: createHandler("create") },
    { method: 'PATCH', path, handler: createHandler("update") },
    { method: 'DELETE', path, handler: createHandler("destroy") }
  ]
}

function genericActions(resourceName, core) {
  const actions = {}
  ACTION_TYPES.forEach(type => actions[type] = genericHandler(type))
  return actions;
}

function persistantActions(resourceName, { from }) {
  return {
    index(req, res) {
      from(resourceName).get.all(req.params.config || {}).then(resource =>
        res.render({ json: resource })
      )
    },

    show(req, res) {
      from(resourceName).get(req.params.id).then(resource =>
        res.render({ json: resource })
      )
    },

    create(req, res) {
      from(resourceName).post(req.params[resourceName]).then(resource =>
        res.render({ json: resource })
      )
    },

    update(req, res) {
      const { id } = req.params
      from(resourceName).patch(id, req.params[resourceName]).then(resource =>
        res.render({ json: resource })
      )
    },

    destroy(req, res) {
      const { id } = req.params
      from(resourceName).delete(id).then(resource =>
        res.render({ json: resource })
      )
    }
  }
}

module.exports.resource = (name, options = {}) => {
  const resource = (core) => {
    // TODO: This is disgusting
    return {
      routes: (options.routes && options.routes(core)) || defaultRoutes(name, core),
      actions: (options.actions && options.actions(core)) || genericActions(name, core)
    }
  }
  resource.resourceName = name
  return resource
}

module.exports.singular = (resource) => {
  return (core) => {
    return Object.assign({}, resource(core), {
      routes: singularRoutes(resource.resourceName)
    })
  }
}

module.exports.persistant = (resource, model) => {
  return (core) => {
    return Object.assign({}, resource(core), {
      actions: persistantActions(resource.resourceName, core),
      model
    })
  }
}
//
// module.exports.restricted = (resource, authorizers) => {
//   return (core) => {
//     return Object.assign({
//       actions: createPersistantActions(resource.resourceName, core)
//     }, resource(core))
//   }
// }
