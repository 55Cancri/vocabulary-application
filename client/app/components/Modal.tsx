import React, { Component } from 'react'

interface IProps {
  onClose: () => void
}

export class Modal extends Component<IProps> {
  // accessibility
  listenKeyboard = e => {
    if (e.key === 'Escape' || e.keyCode === 27) {
      this.props.onClose()
    }
  }

  // @ts-ignore
  componentDidMount = () => {
    if (this.props.onClose) {
      window.addEventListener('keydown', this.listenKeyboard, true)
    }
  }

  // prevent memory leaks
  // @ts-ignore
  componentWillUnmount = () => {
    if (this.props.onClose) {
      window.removeEventListener('keydown', this.listenKeyboard, true)
    }
  }

  // close modal when whole page overlay is clicked
  onOverlayClick = () => this.props.onClose()

  // prevents closing modal if click within modal
  // (because closes when whole page overlay is clicked )
  onDialogClick = e => e.stopPropagation()

  // @ts-ignore
  render = () => (
    <div>
      <div className="modal-overlay-div" />

      {/* <div className="modal-content-div" onClick={this.onOverlayClick}> */}
      <div className="modal-content-div">
        <div className="modal-dialog-div" onClick={this.onDialogClick}>
          {this.props.children}
        </div>
      </div>
    </div>
  )
}

export default Modal
