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
  topics
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
    tags: ''
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

    // dark blue, sky blue, red, lime, turqouise, orange, violet
    const colors = [
      '#034182',
      '#118df0',
      '#ff4a68',
      '#8eba43',
      '#02bd9d',
      '#f8aa27',
      '#ba69de'
    ]

    const { word, definition, topic, tags: stateTags } = this.state
    const { username: owner, startAddWord } = this.props

    const uid = generateUuid()
    const topicUid = generateUuid()

    let wordTags = stateTags.split(',')

    const tags = wordTags.map(tag => ({
      tag,
      wordOwner: uid,
      uid: generateUuid(),
      color: colors[Math.floor(Math.random() * colors.length)],
      deleted: false
    }))

    const nextWord = { uid, word, definition, tags, topic, topicUid, owner }

    startAddWord(nextWord).then(() => this.onClose())
  }

  // @ts-ignore
  render = () => {
    const { word, tags, topic, definition } = this.state
    const { topics } = this.props
    return (
      <Modal onClose={this.onClose}>
        <form onSubmit={this.handleSubmit} onChange={this.onFieldChange}>
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
            {/* <select>
              {topics !== undefined &&
                topics.map(topic => (
                  <option key={topic.uid} value={topic.topic}>
                    {topic.topic}
                  </option>
                ))}
            </select> */}
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
