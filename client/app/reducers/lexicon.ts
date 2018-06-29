import React from 'react'

export const lexiconReducer = (state = {}, action = {} as any) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        words: action.user.words,
        topics: action.user.topics,
        tags: action.user.tags
      }

    case 'LOGOUT':
      return {}

    case 'NEW_WORD':
      return {
        ...state,
        words: action.user.words,
        topics: action.user.topics,
        tags: action.user.tags
      }

    case 'UPDATED_WORD':
      return {
        ...state,
        words: action.user.words
      }

    case 'NEW_TOPIC':
      return {
        ...state,
        topics: action.user.topics
      }

    case 'DELETE_TOPIC':
      return {
        ...state,
        words: action.user.words,
        topics: action.user.topics
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
