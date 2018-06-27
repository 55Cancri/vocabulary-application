import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { HashLink as Link } from 'react-router-hash-link'

import { generateUuid } from '../helpers/helpers'
import { startAddTopic } from '../actions/words'

interface IProps {
  words: any
  topics: any
  tags: string[]
  username: string
  startAddTopic: (any) => any
  dataIsHere: boolean
  match?: any
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
    const { username: owner, startAddTopic } = this.props
    const uid = generateUuid()
    const nextTopic = { uid, owner, name }
    startAddTopic(nextTopic)
  }

  // @ts-ignore
  render = () => {
    const { words, topics, tags, match } = this.props
    const { editing, topicName } = this.state
    return (
      <div className="textbar-container">
        {match.path === '/dashboard' && (
          <div className="textbar">
            <p className="title">Topics</p>
            <p className="subhead">
              {topics !== undefined && topics.length} topics
            </p>
            <div className="list">
              {topics !== undefined &&
                topics.map((topic, i) => (
                  <Link
                    to={`#${topic.uid}`}
                    key={topic.uid}
                    smooth="true"
                    scroll={el =>
                      el.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                      })
                    }
                  >
                    <p>{topic.topic}</p>
                    {
                      words.filter(word => {
                        if (word.topic === topic.uid) return word
                      }).length
                    }&nbsp;words
                  </Link>
                ))}
              {!editing ? (
                <p onClick={this.handleToggle}>+ Add topic</p>
              ) : (
                <form
                  onSubmit={this.handleSubmit}
                  onChange={this.handleChange}
                  onBlur={this.handleToggle}
                >
                  <input type="text" name="topicName" value={topicName} />
                </form>
              )}
            </div>
          </div>
        )}
        {match.path === '/glossary' && (
          <div className="textbar">
            <p className="title">Glossary</p>
            <p className="subhead">
              {words !== undefined && words.length} words
            </p>
          </div>
        )}
        {match.path === '/tags' && (
          <div className="textbar">
            <p className="title">Tags</p>
            <p className="subhead">
              {words !== undefined && words.length} tags
            </p>

            {tags !== undefined &&
              tags.map((tag, i) => (
                <Link
                  to={`#${tag}`}
                  key={tag}
                  smooth="true"
                  scroll={el =>
                    el.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start'
                    })
                  }
                >
                  <p>{`${tag} (${
                    words.filter(word => {
                      if (word.tags.includes(tag)) return word.word
                    }).length
                  })`}</p>
                </Link>
              ))}
          </div>
        )}
        {match.path.includes('/word/') && (
          <div className="textbar">
            <p className="title">word</p>
            {/* <button>+ Add example</button>
            <button>+ Add images</button>
            <button>delete word</button> */}
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  words: state.lexica.words,
  topics: state.lexica.topics,
  tags: state.lexica.tags,
  username: state.auth.username,
  dataIsHere: state.app.dataIsHere
})

export default withRouter<any>(
  connect(
    mapStateToProps,
    { startAddTopic }
  )(Textbar)
)
