import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Textbar from './Textbar'
import Spinner from 'react-spinkit'

interface IProps {
  words: any
}

export class GlossaryPage extends Component<IProps> {
  // @ts-ignore
  render = () => {
    const { words } = this.props
    return (
      <div className="glossary-page">
        <Textbar />
        <div>
          {words === undefined && (
            <Spinner
              className="loading-indicator"
              name="ball-spin-fade-loader"
            />
          )}
          {words !== undefined &&
            words.length === 0 && <p>You have not added any words yet.</p>}
          {words !== undefined &&
            words.map(word => (
              <Link to={`/word/${word.uid}`} key={word.uid}>
                <h2>{word.word}</h2>
                <p>{word.definition}</p>
              </Link>
            ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  words: state.lexica.words
})

export default connect<any>(mapStateToProps)(GlossaryPage)
