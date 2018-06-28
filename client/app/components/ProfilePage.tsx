import React, { Component } from 'react'
import { connect } from 'react-redux'
import Axios from 'axios'
import Dropzone from 'react-dropzone'
import { stat } from 'fs'

interface Iprops {
  username
  firstname
  lastname
  email
  profileImage
  topThree
  words
}

export class ProfilePage extends Component<Iprops> {
  render() {
    return (
      <div className="profile-page">
        <div className="profile-pic-div">
          <div
            className="profile-image"
            style={{
              background: `url(${this.props.profileImage})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: '50% 50%',
              width: 300,
              height: 300
            }}
          />
        </div>

        <div className="input-group">
          <p className="title">
            Name: {this.props.firstname} {this.props.lastname}
          </p>
          <p className="title">Username: {this.props.username}</p>
          <p className="title">Email: {this.props.email}</p>
          <p className="title">Wordcount: {this.props.words.length}</p>
        </div>

        <div className="fav-words">
          <h1>Favorite Words:</h1>
          {this.props.topThree.map(word => (
            <div className="fav-word">
              <h2>{word.word} </h2>
              <p>{word.definition}</p>
            </div>
          ))}
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
  profileImage: state.auth.profileImage,
  topThree: state.lexica.words.slice(0, 3),
  words: state.lexica.words
})

export default connect(mapStateToProps)(ProfilePage)
