import React, { Component } from 'react'
import { connect } from 'react-redux'
import Spinner from 'react-spinkit'
import AutosizeInput from 'react-input-autosize'
// import Scroll from 'react-scroll'

import { TopicsListWord } from './TopicsListWord'
import { startEditTopic, startDeleteTopic } from '../actions/words'
import { startUpdateTextbar } from '../actions/app'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import fontawesome from '@fortawesome/fontawesome'

interface IProps {
  words: any
  topics: any
  id: string
  details: boolean
  tags: any
  startEditTopic: (any) => any
  startDeleteTopic: (any) => any
  startUpdateTextbar: (any) => any
  handleDelete: (any) => any
}

export class TopicsList extends Component<IProps> {
  state = {
    topics: [],
    dragging: false,
    editing: null
  }

  setToEditing = e => {
    const state = this.state.topics
    // sets editing = to double clicked word
    this.setState({ editing: e.target.id })
  }

  private stepInput: React.RefObject<HTMLInputElement>

  handleKeyPress = e => {
    if (e.key === 'ESCAPE' || e.keyCode === 27) this.setState({ editing: null })
  }

  // @ts-ignore
  componentDidMount = () => {
    this.props.topics !== undefined &&
      this.setState({ topics: this.props.topics })

    window.addEventListener('keydown', this.handleKeyPress, true)

    // need true to get scroll events
    // window.addEventListener('scroll', this.handleScroll, true)
  }

  // @ts-ignore
  componentWillUnmount = () =>
    window.removeEventListener('keydown', this.handleKeyPress)

  handleTextbar = ({ currentTarget }) => {
    const { startUpdateTextbar } = this.props
    const uid = currentTarget.id
    // console.log('uid: ', uid)
    // startUpdateTextbar(uid)
  }

  handleDrag = e => {
    console.log('dragging...')
    this.setState({ dragging: true })
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

  handleDelete = async ({ currentTarget }) => {
    const uid = currentTarget.id
    const owner = currentTarget.dataset.owner
    const { startDeleteTopic } = this.props
    const topic = { uid, owner }
    startDeleteTopic(topic)
  }

  handleSubmit = async e => {
    if (e.charCode === 13 || e.key.toLowerCase() === 'enter') {
      const uid = e.target.id
      const updatedTopic = this.state.topics.filter(
        topic => topic.uid === uid
      )[0]
      this.props.startEditTopic(updatedTopic)
    }
  }

  // @ts-ignore
  render = () => {
    const { words, topics, tags, details } = this.props
    const { editing, dragging } = this.state
    return (
      <div className="topics-list">
        {topics === undefined && (
          <Spinner className="loading-indicator" name="ball-spin-fade-loader" />
        )}
        {topics !== undefined &&
          topics.length === 0 && <p>You have not created any topics yet.</p>}
        {topics !== undefined &&
          topics.map((topic, i) => (
            <div
              key={topic.uid}
              id={topic.uid}
              className="topic-section"
              onMouseEnter={this.handleTextbar}
              ref={div => (this[`topic${topic.uid}`] = div)}
            >
              {editing !== topic.uid && (
                <div className="topic-header" id={topic.uid}>
                  <h2
                    id={topic.uid}
                    className="topic-name-in-main-list"
                    onDoubleClick={this.setToEditing}
                  >
                    {topic.topic}
                  </h2>
                  <div
                    className="trash-container"
                    id={topic.uid}
                    data-owner={topic.owner}
                    onClick={this.handleDelete}
                  >
                    <FontAwesomeIcon icon="trash-alt" className="trash" />
                  </div>
                </div>
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
                  className="editing-topic"
                />
              )}
              {!words.some(word => word.topic === topic.uid) && (
                <p className="word-empty">No words yet.</p>
              )}
              {words.map(word => {
                if (word.topic === topic.uid)
                  return (
                    <TopicsListWord
                      key={word.uid}
                      word={word}
                      tags={tags}
                      details={details}
                      draggable="true"
                      onDragStart={e => this.handleDrag(e)}
                      className={dragging ? 'drag' : ''}
                    />
                  )
              })}
            </div>
          ))}
        <div id="0" className="topic-section" onMouseEnter={this.handleTextbar}>
          {words !== undefined &&
            words.some(word => word.topic === 0) && (
              <div className="topic-header">
                <h2 id="0" className="topic-name-in-main-list">
                  Uncategorized
                </h2>
              </div>
            )}
          {words !== undefined &&
            words.map(
              word =>
                word.topic === 0 && (
                  <TopicsListWord
                    key={word.uid}
                    word={word}
                    details={details}
                    tags={tags}
                  />
                )
            )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  words: state.lexica.words,
  topics: state.lexica.topics,
  tags: state.lexica.tags,
  results: state.lexica.results,
  dataIsHere: state.app.dataIsHere,
  details: state.app.details
})

export default connect(
  mapStateToProps,
  { startEditTopic, startDeleteTopic, startUpdateTextbar }
)(TopicsList as any)
