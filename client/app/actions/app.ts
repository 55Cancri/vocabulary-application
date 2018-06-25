import React from 'react'
import api from '../api'

export const startSubmitTopic = (nextTopic, dispatch) => {
  api.sidebar.addTopic(nextTopic)
}
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
