import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'
import Modal from '../Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
    
  }

  //@ts-ignore
  componentDidMount = () => {
    console.log(this.props.topics)
    // console.log(this.state.topics)
  }

  onClose = () => this.props.hideModal()

  onFieldChange = e => {
    let { name, value }: { name: keyof IState; value: string } = e.target
    this.setState({
      [name]: value
    } as any)
  }

  selectTopic = e => {
    console.log(e.target.value)
    // console.log(this.state.topic)
    this.setState({topic: e.target.value})
    // console.log(this.state.topic)
  }

  handleSubmit = e => {
    e.preventDefault()

    // dark blue, sky blue, red, turqouise, orange, violet
    const colors = [
      '#034182',
      '#118df0',
      '#ff4a68',
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
        <div className="new-word-modal_header">
          <h2 className="title">New word</h2>
          <div className="close" onClick={this.onClose}>
            <FontAwesomeIcon icon="times" />

          </div>
        </div>
        <form
          onSubmit={this.handleSubmit}
          onChange={this.onFieldChange}
          className="new-word-modal"
        >
          <div className="input-group">
            <label htmlFor="word" className="title">
              Name
            </label>
            <input type="text" name="word" value={word} className="input" />
          </div>
          <div className="split-data">
            <div className="input-group">
              <label htmlFor="topic" className="title">
                Topic
              </label>
              <input type="text" name="topic" value={topic} className="input" />
            </div>
            <div className="input-group">
              <label htmlFor="tags" className="title">
                Tags
              </label>
              <input type="text" name="tags" value={tags} className="input" />
              <p className="caption">Separate by comma</p>
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="definition" className="title">
              Definition
            </label>
            <textarea
              name="definition"
              value={definition}
              className="input textarea"
              data-enable-grammarly="false"
            />
          </div>
          <div className="input-group">
            <input type="submit" name="submit" className="submit" />
          </div>
        </form>
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
