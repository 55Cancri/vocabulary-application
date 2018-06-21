import React from 'react'

// login user obj will be placed in auth because of auth reducer
export const reimburseReducer = (state = {}, action: any = {}) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        reimbursements: action.user.reimbursements,
        everyReimbursement: action.user.pendingTickets
      }

    case 'LOGOUT':
      return {}

    case 'VERDICTS':
      console.log('action', action.pendingTickets)
      return {
        everyReimbursement: action.pendingTickets
      }

    case 'RESTORE':
      return {
        reimbursements: action.user.reimbursements,
        everyReimbursement: action.user.pendingTickets
      }

    case 'SUBMIT':
      return {
        reimbursements: action.data.Items
      }

    default:
      return state
  }
}
