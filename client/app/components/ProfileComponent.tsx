import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import fontawesome from '@fortawesome/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export class ProfileComponent extends Component {
  render() {
    return (
      <div>
        <div className="input-group">
          <label htmlFor="username" className="title">
            Username:
          </label>
          <input type="text" name="username" />
        </div>
        <div className="input-group">
          <label htmlFor="fullname" className="title">
            Name:
          </label>
          <input type="text" name="fullname" />
        </div>
        <div className="input-group">
          <label htmlFor="username" className="title">
            Email:
          </label>
          <input type="text" name="username" />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  username: state.auth.username,
  email: state.auth.email,
  firstname: state.auth.firstname
})

export default connect(mapStateToProps)(ProfileComponent)