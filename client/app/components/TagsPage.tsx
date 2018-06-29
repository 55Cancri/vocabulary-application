import React, { Component } from 'react'
import { connect } from 'react-redux'
import Spinner from 'react-spinkit'
import Textbar from './Textbar'
import TopicsListWord from './TopicsListWord'

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
          {tags === undefined && (
            <Spinner
              className="loading-indicator"
              name="ball-spin-fade-loader"
            />
          )}
          {tags !== undefined &&
            tags.length === 0 && <p>You have not created any tags yet.</p>}
          {tags !== undefined &&
            tags.map(tag => (
              <div key={tag.uid}>
                <h2 id={tag.uid}>{tag.tag}</h2>
                {words !== undefined &&
                  words.map(word => {
                    if (word.uid === tag.wordOwner)
                      return <TopicsListWord key={word.uid} word={word} />
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
