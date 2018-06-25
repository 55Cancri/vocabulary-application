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

    return api.user.persistUser(identity).then(data => {
      const user = {
        ...data,
        token: identity.token
      }
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
    dispatch(login(user))
  })

export const logout = () => ({
  type: 'LOGOUT'
})

export const startLogout = () => dispatch => {
  localStorage.removeItem('wa')
  localStorage.removeItem(
    'CognitoIdentityServiceProvider.5lmmpid5kd4v4vibmvifhcm3re.LastAuthUser'
  )
  localStorage.removeItem(
    'CognitoIdentityServiceProvider.5lmmpid5kd4v4vibmvifhcm3re.malin1.accessToken'
  )
  localStorage.removeItem(
    'CognitoIdentityServiceProvider.5lmmpid5kd4v4vibmvifhcm3re.malin1.clockDrift'
  )
  localStorage.removeItem(
    'CognitoIdentityServiceProvider.5lmmpid5kd4v4vibmvifhcm3re.malin1.deviceGroupKey'
  )
  localStorage.removeItem(
    'CognitoIdentityServiceProvider.5lmmpid5kd4v4vibmvifhcm3re.malin1.deviceKey'
  )
  localStorage.removeItem(
    'CognitoIdentityServiceProvider.5lmmpid5kd4v4vibmvifhcm3re.malin1.idToken'
  )
  localStorage.removeItem(
    'CognitoIdentityServiceProvider.5lmmpid5kd4v4vibmvifhcm3re.malin1.randomPasswordKey'
  )
  localStorage.removeItem(
    'CognitoIdentityServiceProvider.5lmmpid5kd4v4vibmvifhcm3re.malin1.refreshToken'
  )
  dispatch(logout())
}
