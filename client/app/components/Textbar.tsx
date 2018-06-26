import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { HashLink as Link } from 'react-router-hash-link'

import { generateUuid } from '../helpers/helpers'
import { startSubmitTopic } from '../actions/app'

{
  /* <p>{results.length > 0 && results.pool.map(result => <p>{result.word}</p>)}</p> */
}

interface IProps {
  words: any
  topics: string[]
  tags: string[]
  username: string
  startSubmitTopic: (any) => void
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
    const { username: owner, startSubmitTopic } = this.props
    const uid = generateUuid()
    const nextTopic = { uid, owner, name }
    startSubmitTopic(nextTopic)
  }

  // @ts-ignore
  componentDidMount = () => console.log('props: ', this.props)

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
              {tags !== undefined &&
                tags.map(tag => (
                  <p>{`${tag} (${
                    words.filter(word => word.tags.includes(tag)).length
                  })`}</p>
                ))}
            </p>
            {}
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
    { startSubmitTopic }
  )(Textbar)
)
