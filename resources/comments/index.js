const Comment = require('./Photo')
const resource = require('../../core/resourceCreators/PersistentResource.js')

module.exports = persistant(resource("photos"), Comment)
