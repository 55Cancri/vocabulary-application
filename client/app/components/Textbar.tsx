import React, { Component } from 'react'
import { connect } from 'react-redux'
import { HashLink as Link } from 'react-router-hash-link'
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import { generateUuid } from '../helpers/helpers'
import { startSubmitTopic } from '../actions/app'

interface IProps {
  words: any
  topics: string[]
  username: string
  startSubmitTopic: (any) => void
  dataIsHere: boolean
}

interface IState {
  topics: any
  numberOfTopics: number
  topicName: string
  editing: boolean
}

export class Textbar extends Component<IProps, IState> {
  state = {
    topics: [],
    numberOfTopics: 0,
    topicName: '',
    editing: false
  }

  handleChange = e => {
    let { name, value }: { name: keyof IState; value: string } = e.target
    this.setState({
      [name]: value
    } as any)
  }

  handleToggle = () => this.setState({ editing: !this.state.editing })

  handleSubmit = e => {
    e.preventDefault()
    const { topicName: name } = this.state
    const { username: owner, startSubmitTopic } = this.props
    const uid = generateUuid()
    const nextTopic = { uid, owner, name }
    startSubmitTopic(nextTopic)
  }

  // @ts-ignore
  render = () => {
    const { words, topics } = this.props
    const { editing, topicName } = this.state
    return (
      <div className="textbar-container">
        <div className="textbar">
          <p className="title">Topics</p>
          <p className="subhead">
            {topics !== undefined && topics.length} topics
          </p>
          <div className="list">
            {topics !== undefined &&
              topics.map((topic, i) => (
                <Link
                  to={`#${topic}`}
                  key={words[i].uid}
                  smooth="true"
                  scroll={el =>
                    el.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start'
                    })
                  }
                >
                  <p>{topic}</p>
                  {
                    words.filter(word => {
                      if (word.topic === topic) return word
                    }).length
                  }&nbsp;words
                </Link>
              ))}
            {!editing ? (
              <p onClick={this.handleToggle}>+ Add topic</p>
            ) : (
              <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                <input type="text" name="topicName" value={topicName} />
              </form>
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  words: state.lexica.words,
  topics: state.lexica.topics,
  username: state.auth.username,
  dataIsHere: state.app.dataIsHere
})

export default connect(
  mapStateToProps,
  { startSubmitTopic }
)(Textbar)
