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
    const { word, definition, topic : stateTopic, tags: stateTags } = this.state
    const { username: owner, startAddWord } = this.props
    // const defaultUid = this.props.topics.find(topic => topic.topic === 'uncategorized').uid
    // const activeTopic = this.props.topics.find(topicItem => topicItem.topic === topic)
    
    // split tags by: [comma] / space
    const tags = stateTags.split(',')
    const uid = generateUuid()
    const topic = stateTopic.length === 0 ? 0 : stateTopic
    // activeTopic ? topicUid = activeTopic.uid : topicUid = '0'
    const nextWord = { uid, word, definition, tags, topic, owner }
    console.log(nextWord)
    startAddWord(nextWord).then(() => this.onClose())
  }

  // @ts-ignore
  render = () => {
    const { word, tags, topic, definition } = this.state
    const topics = this.props.topics
    return (
      <Modal onClose={this.onClose}>
        <form onSubmit={this.handleSubmit} onChange={this.onFieldChange}>
          <h3>New Word</h3>
          <div className="input-group">
            <label htmlFor="word">Name</label>
            <input type="text" name="word" value={word} />
          </div>
          <div className="input-group">
            <label htmlFor="tags">Add tags. Use commas to separate them.</label>
            <input type="text" name="tags" value={tags} />
          </div>
          {/* <div className="input-group">
            <label htmlFor="topic">Add topic</label>
            <input type="text" name="topic" value={topic} />
          </div> */}
          <div className="input-group">
            <label htmlFor="topic">Select Topic</label>
            <select name="topic-list" onChange={this.selectTopic} >
              <option value={this.state.topic} ></option>
              {
                topics.map(topicItem =>
                  topicItem.topic !== 'uncategorized' && <option key={topicItem.uid} value={topicItem.uid} >{topicItem.topic}</option>
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
