import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'
import Modal from '../Modal'
import { hideModal } from '../../actions/modal'
import { startUpdateWord } from '../../actions/words'
import { generateUuid } from '../../helpers/helpers'
import api from '../../api'
import { constants } from 'zlib'

interface IProps extends RouteComponentProps<any> {
  hideModal: () => void
  submitWord: any
  onChange: any
  username: string
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
    const { word, definition, topic, tags: stateTags } = this.state
    const { username: owner } = this.props
    const tags = stateTags.split(' ')
    const uid = generateUuid()
    const nextWord = { uid, word, definition, tags, topic, owner }

    this.props.submitWord(nextWord).then(() => this.onClose())
  }

  // @ts-ignore
  render = () => {
    const { word, tags, topic, definition } = this.state
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
  username: state.auth.username
})

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal()),
  submitWord: word => startUpdateWord(word, dispatch)
})
// mapStateToProps -- to read from the store
// mapDispatchToProps -- to write to the store
export default connect<any, any>(
  mapStateToProps,
  mapDispatchToProps
)(NewWordModal)
