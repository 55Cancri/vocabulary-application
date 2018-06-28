import React from 'react'
import api from '../api'

export const updateTextbar = uid => ({
  type: 'TEXTBAR',
  uid
})

export const startUpdateTextbar = uid => dispatch =>
  dispatch(updateTextbar(uid))

export const deleteAccount = user => ({
  type: 'DELETE',
  user
})

export const nuke = user => ({
  type: 'NUKE',
  user
})

export const startNuke = email => dispatch =>
  api.user.nuke(email).then(user => {
    dispatch(nuke(user))
  })
