import React from 'react'

export const lexiconReducer = (state = {}, action = {} as any) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        words: action.user.words,
        topics: [...new Set(action.user.words.map(word => word.topic))],
        results: []
      }

    case 'LOGOUT':
      return {}

    case 'NEW_WORD':
      return {
        ...state,
        words: action.words,
        topics: [...new Set(action.words.map(word => word.topic))]
      }

    case 'SEARCH':
      return {
        ...state,
        results: action.search
      }

    default:
      return state
  }
}
