import React from 'react'

export const lexiconReducer = (state = { current: {} }, action = {} as any) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        words: action.user.words,
        topics: [...new Set(action.user.words.map(word => word.topic))],
        tags: [
          ...new Set(
            action.user.words
              .map(word => word.tags)
              .reduce((append, nextArray) => append.concat(nextArray), [])
          )
        ]
      }

    case 'LOGOUT':
      return {}

    case 'NEW_WORD':
      return {
        ...state,
        words: action.words,
        topics: [...new Set(action.words.map(word => word.topic))],
        tags: [
          ...new Set(
            action.user.words
              .map(word => word.tags)
              .reduce((append, nextArray) => append.concat(nextArray), [])
          )
        ]
      }

    case 'CURRENT':
      return {
        ...state,
        current: action.word
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
