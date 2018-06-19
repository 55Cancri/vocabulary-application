import React, { Component } from 'react'
import { Router, Route, Switch, RouteComponentProps } from 'react-router-dom'
import { Provider, connect } from 'react-redux'
import { hot } from 'react-hot-loader'
import decode from 'jwt-decode'

import { Pages } from './Routes'

import { startPersist } from '../actions/auth'
import { configureStore } from '../store/configureStore'

const store = configureStore()

interface IPayload {
  username: string
}

if (localStorage.ers) {
  const payload: IPayload = decode(localStorage.ers)
  const user = {
    username: payload.username,
    token: localStorage.ers
  }
  // @ts-ignore
  store.dispatch(startPersist(user))
}

export class AppRouter extends Component {
  // @ts-ignore
  render = () => {
    return (
      <Provider store={store}>
        <Pages />
      </Provider>
    )
  }
}

export default hot(module)(AppRouter)
