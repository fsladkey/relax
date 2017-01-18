const Comment = require('./Comment')
const resource = require('../../core/resourceCreators').resource
const persistant = require('../../core/resourceCreators').persistant

module.exports = persistant(resource("comments"), Comment)
