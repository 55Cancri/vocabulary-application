import React from 'react'

// login user obj will be placed in auth because of auth reducer
export const authReducer = (state = {}, action: any = {}) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        token: action.user.token,
        uid: action.user.uid,
        email: action.user.email,
        name: action.user.firstname,
        last: action.user.lastname,
        username: action.user.username,
        profileImage: action.user.profileImage
      }

    case 'PERSIST':
      return {
        email: action.identity.email,
        token: action.identity.token,
        uid: action.identity.uid
      }

    case 'UPDATE_USER':
      console.log('now updating user in reducer')
      return {
        ...state,
        email: action.user.email,
        name: action.user.firstname,
        last: action.user.lastname,
        profileImage: action.user.url
      }

    case 'LOGOUT':
      return {}

    default:
      return state
  }
}
