import React from 'react'

const initialState = {
  dataIsHere: false,
  position: ''
  // textbar: 'topic'
  // showSearch:
}

export const appReducer = (state = initialState, action = {} as any) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        dataIsHere: true
      }

    case 'TEXTBAR':
      return {
        position: action.uid.length > 0 && action.uid
      }

    case 'LOGOUT':
      return {}

    default:
      return initialState
  }
}
