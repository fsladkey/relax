const Photo = require('./Photo')
const resource = require('../../core/resourceCreators').resource
const persistant = require('../../core/resourceCreators').persistant

module.exports = persistant(resource("photos"), Photo)
