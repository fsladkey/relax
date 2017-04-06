const resourceConfig = require('../core')
const createFromState = require('../selectors/fromState')
const createReducer = require('./createReducer')
const { createStore, applyMiddleware } = require('redux')
const thunk = require('redux-thunk')
const reducer = createReducer(resourceConfig)

const store = createStore(reducer, applyMiddleware(thunk))

store.from = createFromState(resourceConfig, store.getState)

module.exports = store
