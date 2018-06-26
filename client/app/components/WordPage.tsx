import React, { Component } from 'react'
import { connect } from 'react-redux'
import Textbar from './Textbar'
import Spinner from 'react-spinkit'

interface IProps {
  currentWord: any
}

export class WordPage extends Component<IProps> {
  // @ts-ignore
  render = () => {
    const { currentWord: word } = this.props
    return (
      <div className="word-page">
        <Textbar />
        {word === undefined && <Spinner name="ball-scale-ripple-multiple" />}
        {word !== undefined && (
          <div>
            <h1>{word.word}</h1>
            <p>{word.definition}</p>
            <p>tags</p>
            {word.tags !== undefined &&
              word.tags.map(tag => <p key={tag}>{tag}</p>)}
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  currentWord:
    state.lexica.words !== undefined &&
    state.lexica.words.find(word => word.uid === props.match.params.uid)
})

export default connect(mapStateToProps)(WordPage)
