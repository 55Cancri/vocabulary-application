import React from 'react'
import api from '../api'

export const updateWords = user => ({
  type: 'NEW_WORD',
  user
})
export const updateTopics = topics => ({
  type: 'NEW_TOPIC',
  topics
})

export const startAddWord = word => dispatch =>
  api.lexica.addWord(word).then(data => dispatch(updateWords(data)))

export const startEditWord = word => dispatch =>
  api.lexica.updateWord(word).then(data => dispatch(updateWords(data)))

export const startDeleteWord = word => dispatch =>
  api.lexica.deleteWord(word).then(data => dispatch(updateWords(data)))

export const startAddTopic = topic => dispatch =>
  api.lexica.addTopic(topic).then(data => dispatch(updateTopics(data)))

export const startEditTopic = topic => dispatch =>
  api.lexica.updateTopic(topic).then(data => dispatch(updateTopics(data)))

export const search = results => ({
  type: 'SEARCH',
  results
})
