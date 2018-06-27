import React from 'react'

// To get all of the data -- everything -- from the database
export const everythingReducer = (state = {}, action: any = {}) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        username: action.user.username,
        token: action.user.token,
        role: action.user.role,
        email: action.user.email,
        name: action.user.firstname
      }

    case 'PERSIST':
      return {
        username: action.identity.username,
        token: action.identity.token
      }

    case 'RESTORE':
      console.log('restore attempt in auth redu..')
      return {
        username: action.user.username,
        token: action.user.token,
        role: action.user.role,
        email: action.user.email
      }

    case 'LOGOUT':
      return {}

    case 'GENERAL':
      // console.log('general data: ', action.data)
      return {
        ...state,
        // id: action.data.userId,
        // token: action.data.token,
        // confirmed: action.data.verified,
        username: action.data.username,
        photo: action.data.photo,
        email: action.data.email
      }

    default:
      return state
  }
}
