import React from 'react'

const initialState = {
  dataIsHere: false,
  textbar: 'topic'
  // showSearch:
}

export const appReducer = (state = initialState, action = {} as any) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        dataIsHere: true
      }

    case 'LOGOUT':
      return {}

    default:
      return initialState
  }
}
