import React, { Component } from 'react'
import { connect } from 'react-redux'
import Axios from 'axios'
import Dropzone from 'react-dropzone'
import { demoAxios } from '../interceptors/demoAxios'

interface Iprops {
  username
  firstname
  lastname
  email
  profileImage
}

export class ProfilePage extends Component<Iprops> {
  render() {
    return (
      <div className="profile-page">
        <div className="input-group">
          Profile Picture:
          <p>
            <img className="profile-image" src={this.props.profileImage} />
            {/* <img src={this.state.url} /> */}
          </p>
        </div>
        <div className="input-group">
          <p className="title">
            Name: {this.props.firstname} {this.props.lastname}
          </p>
          <p className="title">Username: {this.props.username}</p>
          <p className="title">Email: {this.props.email}</p>
        </div>
        <div className="test-col">heloooooooooooo</div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  username: state.auth.username,
  email: state.auth.email,
  firstname: state.auth.name,
  lastname: state.auth.last,
  profileImage: state.auth.profileImage
})

export default connect(mapStateToProps)(ProfilePage)
