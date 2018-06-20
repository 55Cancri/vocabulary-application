import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'
import moment from 'moment'
import numeral from 'numeral'
import Spinner from 'react-spinkit'
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

// extend RouteComponentProps to get access to history object
interface IProps extends RouteComponentProps<any> {
  dataIsHere: boolean
  identity: {
    name: string
    username: string
    // token: string
  }
}

export class DashboardPage extends Component<IProps> {
  state = {
    words: []
  }

  // @ts-ignore
  render = () => {
    return (
      <div>
        <h1>Dashboard</h1>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  identity: state.auth,
  dataIsHere: state.mis.dataIsHere
})

export default connect(mapStateToProps)(DashboardPage)
