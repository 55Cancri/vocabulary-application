import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import 'react-redux'
import thunk from 'redux-thunk'

import { authorizationReducer } from '../reducers/authorization'
import { miscellaneousReducer } from '../reducers/miscellaneous'
import { sidebarReducer } from '../reducers/sidebar'
import { modalReducer } from '../reducers/modal'
import { startLogout } from '../actions/auth'
import jwtDecode from 'jwt-decode'

// middleware is called every store update
const checkTokenExpirationMiddleware = store => next => action => {
  // if (localStorage.ers) {
  //   const token = jwtDecode(localStorage.appJWT)

  //   if (token.exp < Date.now() / 1000) {
  //     next(action)
  //     store.dispatch(startLogout())
  //   }
  // }
  next(action)
}

// how does it work??
const composeEnhancers =
  (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const configureStore = () => {
  const store = createStore(
    combineReducers({
      mis: miscellaneousReducer,
      side: sidebarReducer,
      auth: authorizationReducer,
      modal: modalReducer
    }),
    composeEnhancers(applyMiddleware(thunk, checkTokenExpirationMiddleware))
  )

  return store
}
