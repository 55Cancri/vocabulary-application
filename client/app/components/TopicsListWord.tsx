import React from 'react'
import { Link } from 'react-router-dom'

export const TopicsListWord = props => {
  const { word } = props
  return (
    <div key={word.uid} className="word-group-in-main-list">
      <Link to={`/word/${word.uid}`}>
        <h3 className="word-name">{word.word}</h3>
        <p className="word-definition">{word.definition}</p>
      </Link>
    </div>
  )
}

export default TopicsListWord
