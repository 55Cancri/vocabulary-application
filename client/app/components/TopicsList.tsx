import React, { Component } from 'react'
import { connect } from 'react-redux'
import Spinner from 'react-spinkit'
import { TopicsListWord } from './TopicsListWord'
import { setCurrentWord } from '../actions/words'

interface IProps {
  words: any
  topics: string[]
  setCurrentWord: (any) => void
}

export class TopicsList extends Component<IProps> {
  // @ts-ignore
  componentDidMount = () => window.addEventListener('scroll', this.handleScroll)

  // @ts-ignore
  componentWillUnmount = () =>
    window.removeEventListener('scroll', this.handleScroll)

  handleScroll = e => {
    console.log('scroll event: ', window.scrollY)
  }

  handleCurrent = word => this.props.setCurrentWord(word)

  // @ts-ignore
  render = () => {
    const { words, topics, setCurrentWord } = this.props
    return (
      <div className="topics-list">
        {topics === undefined && <Spinner name="ball-scale-ripple-multiple" />}
        {topics !== undefined &&
          topics.map((topic, i) => (
            <div key={words[i].uid} id={topic} className="topic-section">
              <h2>{topic}</h2>
              {words.map(word => {
                if (word.topic === topic)
                  return (
                    <TopicsListWord
                      key={word.uid}
                      word={word}
                      setWord={this.handleCurrent}
                    />
                  )
              })}
            </div>
          ))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  words: state.lexica.words,
  topics: state.lexica.topics,
  dataIsHere: state.app.dataIsHere
})

export default connect(
  mapStateToProps,
  { setCurrentWord }
)(TopicsList as any)
