import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'
import Textbar from './Textbar'
import moment from 'moment'
import numeral from 'numeral'
import Spinner from 'react-spinkit'

import { loadModal } from '../actions/modal'

import { NEW_WORD_MODAL } from '../constants/modaltypes'

// extend RouteComponentProps to get access to history object
interface IProps extends RouteComponentProps<any> {
  dataIsHere: boolean
  identity: {
    name: string
    username: string
    // token: string
  }
  loadModal: (string) => void
}

export class DashboardPage extends Component<IProps> {
  state = {
    words: []
  }

  showNewWordModal = () => this.props.loadModal(NEW_WORD_MODAL)

  // @ts-ignore
  render = () => {
    return (
      <div className="dashboard-page">
        <Textbar />
        <div>
          <h1>Topics</h1>

          <button onClick={this.showNewWordModal}>New word</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  identity: state.auth,
  dataIsHere: state.app.dataIsHere
})

export default connect(
  mapStateToProps,
  { loadModal }
)(DashboardPage as any)
