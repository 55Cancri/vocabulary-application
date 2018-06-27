import React from 'react'
import api from '../api'

export const updateWords = user => ({
  type: 'NEW_WORD',
  user
})

export const startAddWord = word => dispatch =>
  api.lexica.addWord(word).then(data => dispatch(updateWords(data)))

export const startEditWord = word => dispatch =>
  api.lexica.updateWord(word).then(data => dispatch(updateWords(data)))

export const startDeleteWord = word => dispatch =>
  api.lexica.deleteWord(word).then(data => dispatch(updateWords(data)))

export const search = results => ({
  type: 'SEARCH',
  results
})