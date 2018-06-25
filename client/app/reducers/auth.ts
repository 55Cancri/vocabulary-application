import React from 'react'

// login user obj will be placed in auth because of auth reducer
export const authReducer = (state = {}, action: any = {}) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        token: action.user.token,
        email: action.user.email,
        name: action.user.firstname,
        username: action.user.username
      }

    case 'PERSIST':
      return {
        email: action.identity.email,
        token: action.identity.token
      }

    case 'LOGOUT':
      return {}

    default:
      return state
  }
}
