import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { HashLink as Link } from 'react-router-hash-link'
// import ScrollSpy from 'react-scrollspy'

import { generateUuid } from '../helpers/helpers'
import { startAddTopic } from '../actions/words'

interface IProps {
  words: any
  topics: any
  tags: string[]
  username: string
  startAddTopic: (any) => any
  dataIsHere: boolean
  position: string
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

  listenKeyboard = e => {
    if (e.keyCode === 27 || e.key === 'Escape')
      this.setState({ editing: false })
  }

  handleChange = e => {
    let { name, value }: { name: keyof IState; value: string } = e.target
    this.setState({
      [name]: value
    } as any)
  }

  handleAddTopic = () => {
    this.setState({ editing: true })
  }

  handleBlur = e => {
    this.setState({ editing: false })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { topicName: topic } = this.state
    const { username: owner, startAddTopic } = this.props
    const uid = generateUuid()
    const nextTopic = { uid, owner, topic }
    startAddTopic(nextTopic)
  }

  // @ts-ignore
  componentDidMount = () => {
    window.addEventListener('keydown', this.listenKeyboard)
    // 3. example typescript ref
    // this.inputEl !== undefined && this.inputEl.focus()
  }
  // 1. example typescript ref
  // inputEl!: any  

  // @ts-ignore
  render = () => {
    const { words, topics, tags, match, position } = this.props
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
                // <ScrollSpy
                //   items={[...topics.map(topic => topic.uid)]}
                //   currentClassName="active"
                //   // componentTag="div"
                // >
                // {topics !== undefined &&
                topics.map((topic, i) => (
                  <Link
                    to={`#${topic.uid}`}
                    // href={`#${topic.uid}`}
                    key={topic.uid}
                    className="topic-group-in-textbar"
                    smooth="true"
                    scroll={el =>
                      el.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                      })
                    }
                  >
                    <p
                      className={
                        position === topic.uid
                          ? 'active topic-name'
                          : 'topic-name'
                      }
                    >
                      {topic.topic}
                    </p>
                    <p className="topic-count">
                      {
                        words.filter(word => {
                          if (word.topic === topic.uid) return word
                        }).length
                      }&nbsp;words
                    </p>
                  </Link>
                  // </ScrollSpy>
                ))}
              {!editing && (
                <p onClick={this.handleAddTopic} className="add-topic-button">
                  + Add topic
                </p>
              )}
              {editing && (
                <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                  <input
                    type="text"
                    name="topicName"
                    value={topicName}
                    className="enter-topic-name"
                    placeholder="Enter topic"
                    onBlur={this.handleBlur}
                    autoFocus={true}
                    // 2. example typescript ref
                    // ref={inputEl => (this.inputEl = inputEl)}
                  />
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
  dataIsHere: state.app.dataIsHere,
  position: state.app.position
})

export default withRouter<any>(
  connect(
    mapStateToProps,
    { startAddTopic }
  )(Textbar)
)
