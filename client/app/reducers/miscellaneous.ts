import React from 'react'

interface IAction {
  type: string
  payload?: any
}

const initialState = { dataIsHere: false }

export const miscellaneousReducer = (
  state = initialState,
  action: any = {}
) => {
  switch (action.type) {
    case 'REQUEST':
      return {
        ...state,
        reimbursements: action.reimbursements
      }

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
