import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'
import fontawesome from '@fortawesome/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface IProps {
  // onChange: any
}

interface IState {
  topic: string
}

export class AddTopicField extends Component<IProps, IState> {

  state = {
    topic: ''
  }

  onFieldChange = e => {
    // let value: string = e.target
    // this.setState({topic: value} as any)
    let {name, value}: {name: keyof IState; value: string } = e.target
    this.setState({
      [name]: value
    } as any)
  }

  handleSubmit = e => {

  }

  render() {
    const topic = this.state.topic
    return (
      <div>
        <form onSubmit={this.handleSubmit}
          onChange={this.onFieldChange} >
          <input type="text" name="topic" value={topic} />
          <button type="submit"
            className="btn btn-primary btn-circle">
            <FontAwesomeIcon icon="paper-plane" className="fa-paper-plane" />
          </button>
        </form>
      </div>
    )
  }
}

export default AddTopicField
