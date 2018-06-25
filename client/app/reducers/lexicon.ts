import React from 'react'

export const lexiconReducer = (state = {}, action = {} as any) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        words: action.user.words,
        topics: [...new Set(action.user.words.map(word => word.topic))]
      }

    case 'LOGOUT':
      return {}

    case 'NEW_WORD':
      return {
        words: action.words,
        topics: [...new Set(action.words.map(word => word.topic))]
      }

    default:
      return state
  }
}
