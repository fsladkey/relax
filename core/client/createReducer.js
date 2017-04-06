import {
  REQUEST_GENERIC_RESOURCES,
  RECEIVE_GENERIC_RESOURCES,
  REMOVE_GENERIC_RESOURCE
} from './actions'

const initialState = {
  resources: {}
  fetching: false
}

const genericReducer = (type, reducer = defaultReducer) => (state = initialState), action) => {
  switch (action.type) {
    case REQUEST_GENERIC_RESOURCES:
      if (action.resourceType === type) {
        return Object.assign({}, state, { fetching: true })
      }
    case RECEIVE_GENERIC_RESOURCES:
      if (action.resourceType === type) {
        return Object.assign({}, state, { resources: action.resources, fetching: false })
      }
    case REMOVE_GENERIC_RESOURCE:
      const nextState = Object.assign(
        {},
        state,
        { resources: Object.assign(state.resources) }
      )
      delete nextState.resources[action.id]
      return nextState
    default:
      return state
  }
}

export default genericReducer

module.exports = function createReducer(resourceConfig) {
  return function reducer(state = initialState, action) {
  }
}
