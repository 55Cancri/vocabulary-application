import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import fontawesome from '@fortawesome/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface IProps {
  // toggle: any
}

interface IState {
  isEditing: boolean
}

export class AddTopicField extends Component<IProps, IState> {

  state = {
    isEditing: false
  }

  toggle = e => {
    this.setState({isEditing: !this.state.isEditing})
    console.log(`Switch state to ${this.state.isEditing}`)
  }

  render() {
    return (
      <div>
        <input type="text" />
        <button type="submit"
          className="btn btn-primary btn-circle">
          <FontAwesomeIcon icon="paper-plane" className="fa-paper-plane" />
        </button>
      </div>
    )
  }
}

export default AddTopicField
