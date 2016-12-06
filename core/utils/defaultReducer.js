defaultReducer() {
  return function(state = Immutable.Map();, action) {
    if (action.model !== this.tableName) return state
    switch (action.type) {
      case RECEIVE_ALL:
        return state.merge(mapFromArray(action.items));
      case RECEIVE_ONE:
        return state.set(item.id, action.item)
      case REMOVE_ONE:
        return state.delete(item.id)
    }
  }
}
