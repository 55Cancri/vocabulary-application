import React from 'react'
import { Link } from 'react-router-dom'

export const TopicsListWord = props => {
  const { word } = props
  return (
    <div key={word.uid} className="topic-list-word">
      <Link to={`/word/${word.word}`} className="link-tag">
        <h3>{word.word}</h3>
        <p>{word.definition}</p>
      </Link>
    </div>
  )
}

export default TopicsListWord
