import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from '../Modal'
import { hideModal } from '../../actions/modal'
import { generateUuid } from '../../helpers/helpers';

interface IProps {
  hideModal: () => void
  onChange: any,
  username: string
}

interface IState {
  word: string,
  tags: string,
  topic: string,
  definition: string
}

export class NewWordModal extends Component<IProps, IState> {
  
  state = {
    word: '',
    tags: '',
    topic: '',
    definition: ''
  }
  
  onClose = () => this.props.hideModal()

  onFieldChange = e => {
    let {name, value}: {name: keyof IState; value: string } = e.target
    this.setState({
      [name]: value
    } as any)
  }

  addWord = () => {
    let {word, tags, topic, definition} = this.state
    let tagList = tags.split(' ')
    let id = generateUuid
    let nextWord = {
      uid: id,
      word: word,
      definition: definition,
      tags: tagList,
      topic: topic,
      owner: this.props.username
    }
    
  }

  // @ts-ignore
  render = () => {
    const {word, tags, topic, definition} = this.state
    return(
    <Modal onClose={this.onClose}>
      <form onSubmit={this.addWord}
        onChange={this.onFieldChange} >
        <div className="input-group" >
          <label htmlFor="word">Name</label>
          <input type="text" name="word" value={word} />
        </div>
        <div className="input-group" >
          <label htmlFor="tags">Add tags</label>
          <input type="text" name="tags" value={tags} />
        </div>
        <div className="input-group" >
          <label htmlFor="topic">Add topic</label>
          <input type="text" name="topic" value={topic} />
        </div>
        <div className="input-group" >
          <label htmlFor="definition">Definition</label>
          <textarea name="definition" value={definition} />
        </div>
        <div className="input-group" >
          <input type="submit" name="submit" />
        </div>
      </form>
      
      <p onClick={this.onClose}>click to close modal</p>
    </Modal>
  )}
}

const mapStateToProps = state => ({
  username: state.auth.username
})

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal())
})
// mapStateToProps -- to read from the store
// mapDispatchToProps -- to write to the store
export default connect(mapStateToProps, mapDispatchToProps)(NewWordModal)
