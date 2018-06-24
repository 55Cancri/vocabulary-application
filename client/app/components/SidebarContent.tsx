import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import fontawesome from '@fortawesome/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { AddTopicField } from './AddTopicField'
import { generateUuid } from '../helpers/helpers'
import { startSubmitTopic } from '../actions/app'

interface IProps {
  // toggle: any
  username?: string
  submitTopic?: (nextTopic: any) => void
}

interface IState {
  isEditing: boolean
}

export class SidebarContent extends Component<IProps, IState> {

  state = {
    isEditing: false,
    topic: ''
  }

  // @ts-ignore
  componentDidMount = () => console.log('props of parent component: ', this.props)

  onFieldChange = e => {
    // let value: string = e.target
    // this.setState({topic: value} as any)
    let {name, value}: {name: keyof IState; value: string } = e.target
    this.setState({
      [name]: value
    } as any)
  }

  handleSubmit = e => {
    e.preventDefault()
    let name = this.state.topic
    let id = generateUuid
    let username = this.props.username
    let nextTopic = {
      uid: id,
      username: username,
      name: name
    }
    console.log('next topic ', nextTopic)
    this.props.submitTopic(nextTopic)
  }

  toggle = e => {
    this.setState({isEditing: !this.state.isEditing})
    console.log(`Switch state to ${this.state.isEditing}`)
  }

  render() {
    const { topic } = this.state
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
              <form onSubmit={this.handleSubmit}
                onChange={this.onFieldChange} >
                <input type="text" name="topic" value={topic} />
                <button type="submit"
                  className="btn btn-primary btn-circle">
                  <FontAwesomeIcon icon="paper-plane" className="fa-paper-plane" />
                </button>
              </form>
              <button className="btn btn-danger btn-circle"
                onClick={this.toggle} >
                <FontAwesomeIcon icon="times" className="fa-times" />
              </button>
            </div>
        }
        {/* {!this.state.isEditing
          ? <div>
              <p>Add topic</p>
              <button className="btn btn-success btn-circle"
                onClick={this.toggle} >
                <FontAwesomeIcon icon="plus" className="fa-plus" />
              </button>
            </div>
          : <div>
              <AddTopicField />
              <button className="btn btn-danger btn-circle"
                onClick={this.toggle} >
                <FontAwesomeIcon icon="times" className="fa-times" />
              </button>
            </div>} */}
      </div>
    )
  }
  
}

const mapStateToProps = state => ({
  username: state.auth.username
})

const mapDispatchToProps = dispatch => ({
  submitTopic: (topic) => startSubmitTopic(topic, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContent)
