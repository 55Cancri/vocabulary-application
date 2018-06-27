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
}

interface IState {
  url
  filename
}

export class ProfilePage extends Component<Iprops, IState> {
  public constructor(props: any) {
    super(props)
    this.state = {
      url: '',
      filename: ''
    }
  }

  // public componentDidMount() {
  //   demoAxios
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

  public onDrop = (files: any) => {
    const file = files[0]
    console.log('file:', file)

    demoAxios
      .get(
        'https://njn4fv1tr6.execute-api.us-east-2.amazonaws.com/prod/upload-picture/' +
          file.name
      )
      .then(resp => {
        console.log('response URL from axios get', resp.data.signedUrl)
        // this.setState({
        //   url: resp.data
        // })
        Axios.put(resp.data, file)
          .then(uploadResp => {
            console.log(uploadResp.status)
          })
          .catch(err => {
            console.log(err)
          })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <div>
        <div>
          Profile Picture:
          <Dropzone onDrop={this.onDrop}>
            <p>drop files here:</p>
          </Dropzone>
          <p>
            <img src={this.state.url} />
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
  test: 'test'
})

export default connect(mapStateToProps)(ProfilePage)
