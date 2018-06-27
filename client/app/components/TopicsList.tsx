import React, { Component } from 'react'
import { connect } from 'react-redux'
import Spinner from 'react-spinkit'
import AutosizeInput from 'react-input-autosize'
import { TopicsListWord } from './TopicsListWord'
import { startEditTopic } from '../actions/words'

interface IProps {
  words: any
  topics: any
  startEditTopic: (any) => any
}

export class TopicsList extends Component<IProps> {
  state = {
    topics: [],
    editing: null
  }

  setToEditing = e => {
    const state = this.state.topics
    // sets editing = to double clicked word
    this.setState({ editing: e.target.id })
  }

  handleChange = ({ target }) => {
    const uid = target.id
    const newTopics = this.state.topics.map(topic => {
      // if passed id !== mapped topic id, skip topic
      if (uid !== topic.uid) return topic
      // else change topic value
      return {
        ...topic,
        topic: target.value
      }
    })
    this.setState({ topics: newTopics })
  }

  handleSubmit = async e => {
    if (e.charCode === 13 || e.key.toLowerCase() === 'enter') {
      const uid = e.target.id
      const updatedTopic = this.state.topics.filter(
        topic => topic.uid === uid
      )[0]
      console.log('updated topic: ', updatedTopic)
      this.props.startEditTopic(updatedTopic)
    }
  }

  // @ts-ignore
  componentDidMount = () =>
    this.props.topics !== undefined &&
    this.setState({ topics: this.props.topics })
  // this.props.topics.map((topic, i) => {
  //   const withEdit = {
  //     ...topic,
  //     editing: false
  //   }
  //   this.setState((prevState: any) => ({
  //     topics: [...prevState.topics, withEdit]
  //   }))
  //     })
  // }

  // @ts-ignore
  render = () => {
    const { words, topics } = this.props
    const { editing } = this.state
    return (
      <div className="topics-list">
        {topics === undefined && <Spinner name="ball-scale-ripple-multiple" />}
        {topics !== undefined &&
          topics.length === 0 && <p>You have not created any topics yet.</p>}
        {topics !== undefined &&
          topics.map((topic, i) => (
            <div key={topic.uid} id={topic.uid} className="topic-section">
              {editing !== topic.uid && (
                <h2 id={topic.uid} onDoubleClick={this.setToEditing}>
                  {topic.topic}
                </h2>
              )}
              {editing === topic.uid && (
                <AutosizeInput
                  // className="edit-definition"
                  id={topic.uid}
                  value={this.state.topics
                    .filter(compare => compare.uid === topic.uid)
                    .map(topic => topic.topic)}
                  onChange={this.handleChange}
                  onKeyPress={this.handleSubmit}
                  style={{ fontSize: 24 }}
                />
              )}

              {words.map(word => {
                if (word.topic === topic.uid)
                  return <TopicsListWord key={word.uid} word={word} />
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
  activeTag: state.lexica.activeTag,
  results: state.lexica.results,
  dataIsHere: state.app.dataIsHere
})

export default connect(
  mapStateToProps,
  { startEditTopic }
)(TopicsList as any)
