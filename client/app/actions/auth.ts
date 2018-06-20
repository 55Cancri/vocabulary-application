import React from 'react'
import api from '../api'

export const login = user => {
  return {
    type: 'LOGIN',
    user
  }
}

export const persist = identity => ({
  type: 'PERSIST',
  identity
})

export const startPersist = identity => {
  return dispatch => {
    dispatch(persist(identity))

    return api.user.persistUser(identity).then(user => {
      return dispatch(login(user))
    })
  }
}

export const startLogin = credentials => dispatch =>
  api.user.login(credentials).then(userData => {
    const user = {
      ...userData,
      token: credentials.token
    }
    localStorage.wa = credentials.token
    // localStorage.ers = user.token
    dispatch({
      type: 'LOGIN',
      user
    })
  })

export const startSignup = dossier => dispatch =>
  api.user.signup(dossier).then(user => {
    localStorage.wa = dossier.token
    // localStorage.ers = user.token
    dispatch(login(user))
  })

export const logout = () => ({
  type: 'LOGOUT'
})

export const startLogout = () => dispatch => {
  localStorage.removeItem('wa')
  dispatch(logout())
}

export const updateGeneral = data => ({
  type: 'GENERAL',
  data
})

export const startUpdateGeneral = data => async dispatch => {
  api.user.updateGeneral(data).then(user => dispatch(updateGeneral(user)))
  // const user = await api.user.updateGeneral(data)

  // dispatch(user)
}

export const updatePassword = data => ({
  type: 'PASSWORD',
  data
})

export const startUpdatePassword = data => async dispatch => {
  const user = await api.user.updatePassword(data)

  // dispatch(user)
}
