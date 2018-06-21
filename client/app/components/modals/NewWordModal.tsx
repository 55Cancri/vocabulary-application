import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from '../Modal'
import { hideModal } from '../../actions/modal'

interface IProps {
  hideModal: () => void
}

export class NewWordModal extends Component<IProps> {
  onClose = () => this.props.hideModal()

  // @ts-ignore
  render = () => (
    <Modal onClose={this.onClose}>
      <label htmlFor="word">Name</label>
      <input type="text" name="word" />
      <label htmlFor="definition">Definition</label>
      <textarea name="definition" />
      <p onClick={this.onClose}>click to close modal</p>
    </Modal>
  )
}

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal())
})

export default connect(
  null,
  mapDispatchToProps
)(NewWordModal)
