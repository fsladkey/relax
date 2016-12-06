const User = require('./User')
const resource = require('../../core/resourceCreators')

module.exports = persistant(resource("users"), User)
