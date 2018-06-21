import React from 'react'
import api from '../api'

export const submitReimbursement = data => ({
  type: 'SUBMIT',
  data
})

export const startSubmitReimbursement = data => dispatch =>
  api.user
    .submitReimbursement(data)
    .then(user => dispatch(submitReimbursement(user)))

export const updateReimbursements = updateReimbursements => ({
  pendingTickets: updateReimbursements,
  type: 'VERDICTS'
})

export const startVerdicts = verdict => dispatch =>
  api.user.issueVerdicts(verdict).then(withNewReimbursements => {
    console.log('now about to dispatch...', withNewReimbursements)
    return dispatch(updateReimbursements(withNewReimbursements))
  })

export const deleteAccount = user => ({
  type: 'DELETE',
  user
})

export const startDeleteAccount = data => dispatch =>
  api.user.deleteAccount(data).then(user => dispatch(deleteAccount(user)))

export const nuke = user => ({
  type: 'NUKE',
  user
})

export const startNuke = email => dispatch =>
  api.user.nuke(email).then(user => {
    dispatch(nuke(user))
  })
