const resources = require('../resources')
const matchRoute = require('core/utils').matchRoute
const dbConnection = require('core/dbConnection')
const createFromDB = require('core/selectors').createFromDB

const routes: []
const handler = (req, res) => {
  return matchRoute(core.routes).handler(req, res)
}

const core = { from: createFromDB(core, dbConnection) }

for (let resourceType in resources) {
  core[resourceType] = resources[resourceType](core)
  core[resourceType].routes.forEach(route => routes.push(route))
}

module.exports = core
