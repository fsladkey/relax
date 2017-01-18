const User = require('./User')
const resource = require('../../core/resourceCreators').resource
const persistant = require('../../core/resourceCreators').persistant

module.exports = persistant(resource("users"), User)
