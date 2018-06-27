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
  // public componentDidMount() {
  //   Axios
  //     .get(
  //       'https://njn4fv1tr6.execute-api.us-east-2.amazonaws.com/prod/files/profile.jpg'
  //     )
  //     .then(resp => {
  //       this.setState({
  //         url: resp.data
  //       })
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }

  render() {
    return (
      <div>
        <div>
          Profile Picture:
          <p>
            <img src={this.props.profileImage} />
            {/* <img src={this.state.url} /> */}
          </p>
        </div>
        <div className="input-group">
          <p className="title">
            Name: {this.props.firstname} {this.props.lastname}
          </p>
        </div>
        <div className="input-group">
          <p className="title">Username: {this.props.username}</p>
        </div>
        <div className="input-group">
          <p className="title">Email: {this.props.email}</p>
        </div>
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
