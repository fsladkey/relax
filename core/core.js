const resources = require('../resources')
const utils = require('./utils/utils')
const only = utils.only
const matchRoute = utils.matchRoute
const dbConnection = require('./dbConnection')
const createFromDB = require('./selectors/fromDB')
const HTTPRequest = require('./utils/request')
const HTTPResponse = require('./utils/response')


const errorHandler = (req, res) => {
  res.render({
    html: `No route matches ${req.url} with method ${req.method}`
  })
}

const logger = (req, res, route) => {
  console.log(`${req.method} to ${req.url}`);
}

let routes = []
const handler = (req, res) => {
  req = HTTPRequest(req)
  res = HTTPResponse(res)
  const route = matchRoute(req, routes)
  route ?
    route.handler(req, res) :
    errorHandler(req, res)
  logger(req, res, route)
}

const core = {}
core.from = createFromDB(core, dbConnection)
// TODO: This should be exported seperately
core.handler = handler

for (let resourceType in resources) {
  core[resourceType] = resources[resourceType](core)
  routes = routes.concat(core[resourceType].routes)
}


module.exports = core
