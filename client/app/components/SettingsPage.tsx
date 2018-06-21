import React, { Component } from 'react'
import { connect } from 'react-redux'

interface ClassProps {
  email: string
  username: string
  photo: string
}

export class SettingsPage extends Component<ClassProps> {
  state = {
    page: 'General',
    username: '',
    email: '',
    selectedFile: null
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

  generalUploadHandler = e => {
    e.preventDefault()

    const {
      selectedFile,
      username: formUsername,
      email: formEmail
    } = this.state
    const { email } = this.props

    let formData = new FormData()
    formData.append('file', selectedFile)
    formData.append('email', email)
    formData.append('username', formUsername)
    formData.append('newEmail', formEmail)

    // this.props
    //   .startUpdateGeneral(formData)
    //   .then(() => this.props.history.push('/dashboard'))
  }

  render() {
    const { email, username, photo } = this.props
    let { page } = this.state
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
              Transfers
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
                    <div
                      className="photo"
                      style={{
                        background: `url(${photo}) center / cover no-repeat`
                      }}
                    />
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
                  <label htmlFor="username">Username</label>
                  <input type="text" name="username" placeholder={username} />
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
          {this.state.page.toLowerCase() == 'transfers' && (
            <div>
              <h2>Transfers</h2>
              <form className="settings-form" onChange={this.onFieldChange}>
                <div className="input-group">
                  <label htmlFor="interest">Charge interest?</label>
                  <input type="text" name="interest" />
                </div>
                <div className="input-group">
                  <label htmlFor="amount">Interest amount</label>
                  <input type="email" name="amount" />
                  <span>%</span>
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
  username: state.auth.username,
  email: state.auth.email,
  photo: state.auth.photo
})

const mapDispatchToProps = data => dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage)
