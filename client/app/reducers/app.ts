import React from 'react'

const initialState = {
  dataIsHere: false,
  details: false,
  position: ''
}

export const appReducer = (state = initialState, action = {} as any) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        dataIsHere: true
      }

    case 'TEXTBAR':
      return {
        ...state,
        position: action.uid.length > 0 && action.uid
      }

    case 'SET_DETAILS':
      return {
        ...state,
        details: !state.details
      }

    case 'LOGOUT':
      return {}

    default:
      return initialState
  }
}
