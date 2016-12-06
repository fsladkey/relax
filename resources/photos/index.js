const Photo = require('./Photo')
const resource = require('../../core/resourceCreators/PersistentResource.js')

module.exports = persistant(resource("photos"), Photo)
