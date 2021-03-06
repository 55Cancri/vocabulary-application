import React from 'react'
import api from '../api'

export const addedWords = user => ({
  type: 'NEW_WORD',
  user
})

export const updatedWords = user => ({
  type: 'UPDATED_WORD',
  user
})

export const updatedTopics = user => ({
  type: 'NEW_TOPIC',
  user
})

export const deleteTopic = user => ({
  type: 'DELETE_TOPIC',
  user
})

export const startAddWord = word => dispatch =>
  api.lexica.addWord(word).then(data => dispatch(addedWords(data)))

export const startEditWord = word => dispatch =>
  api.lexica.updateWord(word).then(data => dispatch(updatedWords(data)))

export const startDeleteWord = word => dispatch =>
  api.lexica.deleteWord(word).then(data => dispatch(updatedWords(data)))

export const startAddImageToWord = image => dispatch =>
  api.lexica.addImage(image).then(data => dispatch(updatedWords(data)))

export const startAddTopic = topic => dispatch =>
  api.lexica.addTopic(topic).then(data => dispatch(updatedTopics(data)))

export const startEditTopic = topic => dispatch =>
  api.lexica.updateTopic(topic).then(data => dispatch(updatedTopics(data)))

export const startDeleteTopic = topic => dispatch =>
  api.lexica.deleteTopic(topic).then(data => dispatch(deleteTopic(data)))

export const search = results => ({
  type: 'SEARCH',
  results
})
