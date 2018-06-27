import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'
import Modal from '../Modal'
import { hideModal } from '../../actions/modal'
import { startAddWord } from '../../actions/words'
import { generateUuid } from '../../helpers/helpers'

interface IProps extends RouteComponentProps<any> {
  hideModal: () => void
  startAddWord: any
  onChange: any
  username: string
  topics: any
}

interface IState {
  word: string
  tags: string
  topic: string
  definition: string
}

export class NewWordModal extends Component<IProps, IState> {
  state = {
    topic: '',
    word: '',
    definition: '',
    tags: '',
    topics: this.props.topics
  }

  //@ts-ignore
  componentDidMount = () => {
    console.log(this.props.topics)
    console.log(this.state.topics)
  }

  onClose = () => this.props.hideModal()

  onFieldChange = e => {
    let { name, value }: { name: keyof IState; value: string } = e.target
    this.setState({
      [name]: value
    } as any)
  }

  handleSubmit = e => {
    e.preventDefault()
    const { word, definition, topic, tags: stateTags } = this.state
    const { username: owner, startAddWord } = this.props
    // split tags by: [comma] / space
    const tags = stateTags.split(',')
    const uid = generateUuid()
    const topicUid = generateUuid()
    const nextWord = { uid, word, definition, tags, topic, topicUid, owner }

    startAddWord(nextWord).then(() => this.onClose())
  }

  // @ts-ignore
  render = () => {
    const { word, tags, topic, definition } = this.state
    const topics = this.props.topics
    return (
      <Modal onClose={this.onClose}>
        <form onSubmit={this.handleSubmit} onChange={this.onFieldChange}>
          <p>{this.props.topics[0].topic}}</p>
          <div className="input-group">
            <label htmlFor="word">Name</label>
            <input type="text" name="word" value={word} />
          </div>
          <div className="input-group">
            <label htmlFor="tags">Add tags</label>
            <input type="text" name="tags" value={tags} />
          </div>
          <div className="input-group">
            <label htmlFor="topic">Add topic</label>
            <input type="text" name="topic" value={topic} />
          </div>
          <div className="input-group">
            <label htmlFor="topic">Select Topic</label>
            <select name="topic-list">
              {
                topics.map(topicItem =>
                  <div key={topicItem.uid} >
                    <p>{topicItem.topic}</p>
                  </div>
                )
              }
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="definition">Definition</label>
            <textarea name="definition" value={definition} />
          </div>
          <div className="input-group">
            <input type="submit" name="submit" />
          </div>
        </form>

        <p onClick={this.onClose}>click to close modal</p>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  username: state.auth.username,
  topics: state.lexica.topics
})

// mapStateToProps -- to read from the store
// mapDispatchToProps -- to write to the store
export default connect<any, any>(
  mapStateToProps,
  { startAddWord, hideModal }
)(NewWordModal)
