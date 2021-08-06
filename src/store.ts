import { createStore } from 'redux'

function rootReducer(state, action) {
  switch (action.type) {
    case 'SET-LOCAL-TODOS': {
      return {
        ...state,
        localTodos: action.payload
      }
    }
    case 'SET-REMOTE-TODOS': {
      return {
        ...state,
        remoteTodos: action.payload
      }
    }
  }
  return state
}

export function getStore(initialState = {}) {
  return createStore(
    rootReducer,
    initialState,
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
}
