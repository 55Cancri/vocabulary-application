import React, { Component } from 'react'
import { connect } from 'react-redux'
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
          <h1>Glossary</h1>
          {words === undefined && <Spinner name="ball-scale-ripple-multiple" />}
          {words !== undefined &&
            words.map(word => (
              <div>
                <h2>{word.word}</h2>
                <p>{word.definition}</p>
              </div>
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
