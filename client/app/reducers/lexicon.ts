import React from 'react'

export const lexiconReducer = (state = {}, action = {} as any) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        words: action.user.words
      }

    case 'LOGOUT':
      return {}

    default:
      return state
  }
}
