import React from 'react'

export const appReducer = (state = {}, action = {} as any) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        dataIsHere: true
      }

    case 'LOGOUT':
      return {}

    default:
      return state
  }
}
