import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import { startUpdateUser } from '../actions/auth'

interface ClassProps {
  email: string
  username: string
  photo: string
  firstname: string
  lastname: string
  file
  startUpdateUser: (any) => any
}

export class SettingsPage extends Component<ClassProps> {
  state = {
    page: 'General',
    fullname: `${this.props.firstname} ${this.props.lastname}`,
    email: '',
    url: '',
    file: ''
  }

  // declare ref
  private photoUpload: HTMLInputElement

  setPage = ({ target }) => {
    console.log('target: ', target.textContent)
    this.setState({ page: target.textContent })
  }

  onFieldChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    })
  }

  fileSelectedHandler = ({ target }) =>
    this.setState({ selectedFile: target.files[0] })

  generalUploadHandler = async e => {
    e.preventDefault()

    const { file, url, fullname: name, email } = this.state

    const { username, startUpdateUser } = this.props

    const fullname = name.split(' ')

    const data = {
      username,
      firstname: fullname[0],
      lastname: fullname[1],
      email,
      url
    }
    try {
      // send file to s3 bucket
      const s3upload = await axios.put(url, file)
    } catch (e) {
      console.log('error uploading to s3', e)
    }

    try {
      const dynamoUpload = await axios
        .post(
          'https://njn4fv1tr6.execute-api.us-east-2.amazonaws.com/prod/update-user',
          data
        )
        .then(res => res.data)

      startUpdateUser(data)
    } catch (e) {
      console.log('error uploading to lambda', e)
    }
  }

  onDrop = (files: any) => {
    // get most recent file
    const file = files[0]

    // build url to s3 bucket
    const profileUrl =
      'http://vocab-app-pics.s3.amazonaws.com/' +
      this.props.username +
      '/' +
      file.name

    this.setState({
      file,
      url: profileUrl
    })
  }

  render() {
    const { email, username, photo } = this.props
    let { page, fullname } = this.state
    page = page.toLowerCase()

    return (
      <div className="main-body">
        <div className="settings-page">
          <aside className="settings-side-menu">
            <p
              className={page === 'general' ? 'is-active' : null}
              onClick={this.setPage}
            >
              General
            </p>
            <p
              className={page === 'password' ? 'is-active' : null}
              onClick={this.setPage}
            >
              Password
            </p>
            <p
              className={page === 'transfers' ? 'is-active' : null}
              onClick={this.setPage}
            >
              Themes
            </p>
          </aside>
          {this.state.page.toLowerCase() == 'general' && (
            <div>
              <h2>Settings</h2>
              <form
                className="settings-form"
                onChange={this.onFieldChange}
                onSubmit={this.generalUploadHandler}
              >
                <div className="input-group">
                  <label htmlFor="photo">Photo</label>
                  <div
                    className="photo-container"
                    onClick={() => this.photoUpload.click()}
                  >
                    <Dropzone onDrop={this.onDrop}>
                      <p>drop files here:</p>
                    </Dropzone>
                    {/* <div
                      className="photo"
                      style={{
                        background: `url(${photo}) center / cover no-repeat`
                      }}
                    /> */}
                    <p className="text">Edit</p>
                  </div>
                  <input
                    className="file-upload"
                    style={{ display: 'none' }}
                    name="file"
                    type="file"
                    onChange={this.fileSelectedHandler}
                    ref={photoUpload => (this.photoUpload = photoUpload)}
                    data-cloudinary-field="image_id" // ?
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="fullname">Full Name</label>
                  <input type="text" name="fullname" placeholder={fullname} />
                </div>
                <div className="input-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" placeholder={email} />
                </div>
                <div className="input-group">
                  <button className="save" type="submit">
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          )}
          {this.state.page.toLowerCase() == 'password' && (
            <div>
              <h2>Reset Password</h2>
              <form className="settings-form" onChange={this.onFieldChange}>
                <div className="input-group">
                  <label htmlFor="old">Old Password</label>
                  <input type="text" name="old" />
                </div>
                <div className="input-group">
                  <label htmlFor="new">New Password</label>
                  <input type="text" name="new" />
                </div>
                <div className="input-group">
                  <label htmlFor="retype">Retype Password</label>
                  <input type="text" name="retype" />
                </div>
                <div className="input-group">
                  <button className="save" type="submit">
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          )}
          {this.state.page.toLowerCase() == 'themes' && (
            <div>
              <h2>Themes</h2>
              <form className="settings-form" onChange={this.onFieldChange}>
                <div className="input-group">
                  <label htmlFor="interest">Change website theme:</label>
                  <input type="text" name="interest" />
                </div>
                <div className="input-group">
                  <button className="save" type="submit">
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  firstname: state.auth.name,
  lastname: state.auth.last,
  username: state.auth.username,
  email: state.auth.email,
  photo: state.auth.photo
})

export default connect(
  mapStateToProps,
  { startUpdateUser }
)(SettingsPage)
