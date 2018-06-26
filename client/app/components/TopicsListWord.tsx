import React from 'react'
import { Link } from 'react-router-dom'

export const TopicsListWord = props => {
  const { word, setWord } = props
  return (
    <div
      key={word.uid}
      className="topic-list-word"
      onClick={el => setWord(word)}
    >
      <Link to={`/word/${word.uid}`}>
        <h3>{word.word}</h3>
        <p>{word.definition}</p>
      </Link>
    </div>
  )
}

export default TopicsListWord
