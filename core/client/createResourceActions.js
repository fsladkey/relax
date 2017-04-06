import schemas from './schemas'
import { normalize, arrayOf } from 'normalizr'
import * as APIUtil from '../utils/api_util'
import pluralize from 'pluralize'
import snakeCase from 'snake-case'

export const REQUEST_GENERIC_RESOURCES = "REQUEST_GENERIC_RESOURCES"
export const RECEIVE_GENERIC_RESOURCES = "RECEIVE_GENERIC_RESOURCES"
export const REMOVE_GENERIC_RESOURCE = "REMOVE_GENERIC_RESOURCE"

export const requestResources = (resources, resourceType) => ({
  type: REQUEST_GENERIC_RESOURCES,
  resourceType
})

export const receiveResources = (resources, resourceType) => ({
  type: RECEIVE_GENERIC_RESOURCES,
  resources,
  resourceType
})

export const removeResource = (resource, resourceType) => ({
  type: RECEIVE_GENERIC_RESOURCES,
  id: resource.id,
  resourceType
})

export const dispatchSingleResult = (dispatch, resourceType) => response => {
  const result = normalize(response, schemas[resourceType])
  for (let resourceType in result.entities) {
    dispatch(receiveResources(result.entities[resourceType], resourceType))
  }
  return response
}

const dispatchArrayResult = (dispatch, resourceType) => response => {
  const schema = { resourceType: [ schemas[resourceType] ]}
  const result = normalize(response, [ schemas[resourceType] ])
  for (let resourceType in result.entities) {
    dispatch(receiveResources(result.entities[resourceType], resourceType))
  }
  return response
}

const fetchOne = resourceType => id => dispatch => {
  return APIUtil.fetch(`/${snakeCase(resourceType)}/${id}`)
    .then(dispatchSingleResult(dispatch, resourceType))
}

const fetchAll = resourceType => data => dispatch => {
  return APIUtil.fetch(`/${snakeCase(resourceType)}`, data)
    .then(dispatchArrayResult(dispatch, resourceType))
}

const post = resourceType => data => dispatch => {
  return APIUtil.post(`/${snakeCase(resourceType)}`, { [resourceType]: data })
    .then(dispatchSingleResult(dispatch, resourceType))
}

const patch = resourceType => data => dispatch => {
  return APIUtil.patch(`/${snakeCase(resourceType)}/${data.id}`, { [resourceType]: data })
    .then(dispatchSingleResult(dispatch, resourceType))
}

const destroy = resourceType => id => dispatch => {
  return APIUtil.destroy(`/${snakeCase(resourceType)}/${data.id}`, { [resourceType]: data })
    .then(dispatch(removeResource, resourceType))
}


module.exports = function createResourceActions(resourceType) {
  return {
    [`fetchOne${singular(resourceType)}`]: fetchOne(resourceType),
    [`fetchAll${resourceType}`)]: fetchAl(resourceType),
    [`create${singular(resourceType)}`]: post(resourceType),
    [`update${singular(resourceType)}`]: patch(resourceType),
    [`destroy${singular(resourceType)}`]: destroy(resourceType)
  }
}
