import React, { Component } from 'react'
import { connect } from 'react-redux'
import Textbar from './Textbar'
import { faDivide } from '@fortawesome/fontawesome-free-solid'

interface IProps {
  words: any
  tags: any
}

export class TagsPage extends Component<IProps> {
  // @ts-ignore
  render = () => {
    const { words, tags } = this.props
    return (
      <div className="tags-page">
        <Textbar />
        <div>
          {tags !== undefined &&
            tags.map(tag => (
              <div>
                <h1>{tag}</h1>
                {words !== undefined &&
                  words.map(word => {
                    if (word.tags.includes(tag)) return <p>{word.word}</p>
                  })}
              </div>
            ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  words: state.lexica.words,
  tags: state.lexica.tags
})

export default connect(mapStateToProps)(TagsPage)
