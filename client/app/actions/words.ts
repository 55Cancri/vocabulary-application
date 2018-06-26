import React from 'react'
import api from '../api'

export const updateWords = words => ({
  type: 'NEW_WORD',
  words
})

export const search = results => ({
  type: 'SEARCH',
  results
})

export const startUpdateWord = (nextWord, dispatch) =>
  api.modal.addWord(nextWord).then(data => dispatch(updateWords(data)))
