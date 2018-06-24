import React from 'react'
import api from '../api'

export const startCreateWord = (nextWord, dispatch) => {
  console.log('Stepped into app.ts to addWord')
  api.modal.addWord(nextWord)
}
<<<<<<< HEAD
=======
export const startSubmitTopic = (nextTopic, dispatch) => {
  api.sidebar.addTopic(nextTopic)
}
export const deleteAccount = user => ({
  type: 'DELETE',
  user
})

export const startDeleteAccount = data => dispatch =>
  api.user.deleteAccount(data).then(user => dispatch(deleteAccount(user)))
>>>>>>> 38ca98a3bc5866823da2399f01e976b143b0e599

export const nuke = user => ({
  type: 'NUKE',
  user
})

export const startNuke = email => dispatch =>
  api.user.nuke(email).then(user => {
    dispatch(nuke(user))
  })
