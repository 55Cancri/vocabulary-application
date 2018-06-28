import React, { Component } from 'react'
import { connect } from 'react-redux'
import Textbar from './Textbar'
import Spinner from 'react-spinkit'
import AutosizeInput from 'react-input-autosize'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import axios from 'axios'
import Dropzone from 'react-dropzone'
import ImageGallery from 'react-image-gallery'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  startEditWord,
  startDeleteWord,
  startAddImageToWord
} from '../actions/words'

interface IProps {
  chosen: any
  uid: string
  word: string
  username: string
  history
  startEditWord: (any) => any
  startDeleteWord: (any) => any
  startAddImageToWord: (any) => any
}

export class WordPage extends Component<IProps> {
  state = {
    word: this.props.chosen !== undefined && this.props.chosen.word,
    definition: this.props.chosen !== undefined && this.props.chosen.definition,
    dropdownOpen: false,
    editingWord: false,
    editingDefinition: false
  }

  listenKeyboard = e =>
    (e.key === 'Escape' || e.keyCode === 27) &&
    this.setState({ editingWord: false, editingDefinition: false })

  // @ts-ignore
  componentDidMount = () =>
    window.addEventListener('keydown', this.listenKeyboard)

  // @ts-ignore
  componentWillUnmount = () =>
    window.removeEventListener('keydown', this.listenKeyboard)

  toggleDropdown = () =>
    this.setState({ dropdownOpen: !this.state.dropdownOpen })

  handleChange = e => {
    const type = e.target.dataset.type
    type === 'word' && this.setState({ word: e.target.value })
    type === 'definition' && this.setState({ definition: e.target.value })
  }

  handleDrop = async (files: any) => {
    const { username, chosen, startAddImageToWord } = this.props

    const wordOwner = chosen.uid
    // get dropped file
    const file = files[0]

    // build url to s3 bucket
    const url = `http://vocab-app-pics.s3.amazonaws.com/${username}/${wordOwner}/${
      file.name
    }`

    const dynamoData = { username, wordOwner, url }

    // upload file to s3 bucket
    try {
      const s3upload = await axios.put(url, file)
    } catch (e) {
      console.log('error uploading to s3 bucket', e)
    }

    // send to dynamoDb
    startAddImageToWord(dynamoData)

    // try {
    //   const dynamoUpload = await axios
    //     .post(
    //       'https://njn4fv1tr6.execute-api.us-east-2.amazonaws.com/prod/update-user',
    //       dynamoData
    //     )
    //     .then(res => res.data)
    //     .then(user => startAddImageToWord(user))
    // } catch (e) {
    //   console.log('error uploading to lambda', e)
    // }
  }

  handleDelete = async () => {
    const { chosen, username, startDeleteWord } = this.props

    const word = {
      username,
      word: chosen.word,
      uid: chosen.uid
    }
    console.log('deleting word: ', word)

    await startDeleteWord(word)
    this.props.history.push('/dashboard')
  }

  handleSubmit = async e => {
    if (e.charCode === 13 || e.key.toLowerCase() === 'enter') {
      const type = e.target.dataset.type
      const word = {
        uid: this.props.chosen.uid,
        owner: this.props.username,
        value: e.target.value,
        type
      }

      await this.props.startEditWord(word)
    }
  }

  toggleEdit = e => {
    const type = e.target.dataset.type
    type === 'word' && this.setState({ editingWord: !this.state.editingWord })
    type === 'definition' &&
      this.setState({ editingDefinition: !this.state.editingDefinition })
  }

  // @ts-ignore
  render = () => {
    const { chosen } = this.props
    const { word, definition, editingWord, editingDefinition } = this.state
    const checkChosen = chosen !== undefined
    const checkDefinition =
      chosen !== undefined && chosen.definition !== undefined
    const checkTags = chosen !== undefined && chosen.tags !== undefined
    return (
      <div className="word-page">
        <Textbar />
        {word === undefined && <Spinner name="ball-scale-ripple-multiple" />}
        {word !== undefined && (
          <div>
            <div className="header">
              {!editingWord && (
                <div>
                  <h1
                    className="title"
                    data-type="word"
                    onDoubleClick={this.toggleEdit}
                  >
                    {checkChosen && chosen.word}
                  </h1>
                  <div className="ellipsis-container">
                    <Dropdown
                      isOpen={this.state.dropdownOpen}
                      toggle={this.toggleDropdown}
                      className="dropdown-root options"
                    >
                      <DropdownToggle className="dropdown-toggle">
                        <FontAwesomeIcon
                          icon="ellipsis-h"
                          className="ellipsis"
                        />
                      </DropdownToggle>
                      <DropdownMenu
                        left="true"
                        className="dropdown-menu"
                        style={{
                          display:
                            this.state.dropdownOpen === false ? 'none' : 'block'
                        }}
                      >
                        {/* {!completed && (
                          <DropdownItem
                            className="dropdown-item"
                            onClick={this.activateEditMode}
                          >
                            Edit
                          </DropdownItem>
                        )} */}
                        <DropdownItem
                          className="dropdown-item menu-delete"
                          onClick={this.handleDelete}
                        >
                          Delete
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
              )}
              {editingWord && (
                <AutosizeInput
                  className="edit-word"
                  data-type="word"
                  value={word}
                  onChange={this.handleChange}
                  onKeyPress={this.handleSubmit}
                  style={{ fontSize: 24 }}
                />
              )}
            </div>
            <div className="tag-section">
              {checkTags && chosen.tags.join(' ')}
              <FontAwesomeIcon icon="plus" className="add-tag" />
            </div>
            {!editingDefinition && (
              <p data-type="definition" onDoubleClick={this.toggleEdit}>
                {checkDefinition && chosen.definition}
              </p>
            )}
            {editingDefinition && (
              <AutosizeInput
                className="edit-definition"
                data-type="definition"
                value={definition}
                onChange={this.handleChange}
                onKeyPress={this.handleSubmit}
                style={{ fontSize: 24 }}
              />
            )}
            <Dropzone onDrop={this.handleDrop}>
              <p>drop files here:</p>
            </Dropzone>
            <ImageGallery
              items={chosen.images.map(image => ({
                original: image.url,
                thumbnail: image.url
              }))}
            />
            {/*  {chosen.images.map(image => (
               <img
               key={image.wordOwner}
               src={image.url}
               width={300}
               height={300}
             />
            // ))}*/}
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  chosen:
    state.lexica.words !== undefined &&
    state.lexica.words.find(word => word.uid === props.match.params.uid),
  username: state.auth.username
})

export default connect(
  mapStateToProps,
  { startEditWord, startDeleteWord, startAddImageToWord }
)(WordPage)
