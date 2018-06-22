import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from '../Modal'
import { hideModal } from '../../actions/modal'

interface IProps {
  hideModal: () => void
  onChange: any
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

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal())
})

export default connect(
  null,
  mapDispatchToProps
)(NewWordModal)
