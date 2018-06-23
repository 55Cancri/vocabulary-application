import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import fontawesome from '@fortawesome/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AddTopicField } from './AddTopicField';

interface IProps {
  // toggle: any
}

interface IState {
  isEditing: boolean
}

export class SidebarContent extends Component<IProps, IState> {

  state = {
    isEditing: false
  }

  toggle = e => {
    this.setState({isEditing: !this.state.isEditing})
    console.log(`Switch state to ${this.state.isEditing}`)
  }

  render() {
    return (
      <div className="panel">
        <Link to="/dashboard" className="link">
          <FontAwesomeIcon icon="home" className="fa-home" />
          &nbsp; &nbsp;Home
        </Link>
        <Link to="/messages" className="link">
          <FontAwesomeIcon icon="globe" className="fa-globe" />
          &nbsp; &nbsp;Messages
        </Link>
        <Link to="/messages" className="link">
          <FontAwesomeIcon icon="briefcase" className="fa-briefcase" />
          &nbsp; &nbsp;Analytics
        </Link>
        {!this.state.isEditing
          ? <div>
              <p>Add topic</p>
              <button className="btn btn-success btn-circle"
                onClick={this.toggle} >
                <FontAwesomeIcon icon="plus" className="fa-plus" />
              </button>
            </div>
          : <div>
              <AddTopicField/>
              <button className="btn btn-danger btn-circle"
                onClick={this.toggle} >
                <FontAwesomeIcon icon="times" className="fa-times" />
              </button>
            </div>}
      </div>
    )
  }
}

export default SidebarContent
