import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'
import moment from 'moment'
import numeral from 'numeral'
import Spinner from 'react-spinkit'
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import { loadModal } from '../actions/modal'

import { NEW_WORD_MODAL } from '../constants/modaltypes'
import { startGetEverything } from '../actions/app';

// extend RouteComponentProps to get access to history object
interface IProps extends RouteComponentProps<any> {
  dataIsHere: boolean
  identity: {
    name: string
    username: string
    // token: string
  }
  loadModal: (string) => void
  startGetEverything: (string) => void
  everything: any
}

export class DashboardPage extends Component<IProps> {
  state = {
    words: []
  }

  showNewWordModal = () => this.props.loadModal(NEW_WORD_MODAL)

  //@ts-ignore
  componentDidMount = () => {
    let everything = this.props.startGetEverything('scottkm')
    console.log(everything)
  }

  // @ts-ignore
  render = () => {
    return (
      <div>
        <h1>Dashboard</h1>
        <button onClick={this.showNewWordModal}>New word</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  identity: state.auth,
  dataIsHere: state.mis.dataIsHere,
  everything: state.everything
})

export default connect(
  mapStateToProps,
  { loadModal, startGetEverything }
)(DashboardPage as any)
