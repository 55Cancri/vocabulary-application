import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'
import moment from 'moment'
import numeral from 'numeral'
import Spinner from 'react-spinkit'
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import ReimbursementList from './dashboard/ReimbursementList'
import AdminReimbursementList from './dashboard/AdminReimbursementList'

import { startVerdicts } from '../actions/app'

// extend RouteComponentProps to get access to history object
interface IProps extends RouteComponentProps<any> {
  reimbursements: Array<Object>
  everyReimbursement: Array<Object>
  startVerdicts: any
  dataIsHere: boolean
  identity: {
    name: string
    username: string
    token: string
    role: string
  }
}

export class DashboardPage extends Component<IProps> {
  state = {
    // on data load, map to array of objects with clickState prop set to false
    reimbursements: []
  }

  // convert any function to asynchronous and return a promise
  // makeAsync = async func =>
  //   new Promise(resolve => func(resolve).then(() => resolve()))

  startReimbursement = () => this.props.history.push('/create')

  // @ts-ignore
  componentDidMount = () => {
    const { dataIsHere, everyReimbursement } = this.props

    if (dataIsHere && everyReimbursement) {
      const updatedArray = everyReimbursement.map((item: any, i) => {
        return {
          ...item,
          clicked: false
        }
      })
      this.setState({ reimbursements: updatedArray })
    }
  }

  submitAdminDecision = ({ target }) => {
    const { reimbursements } = this.state
    const { identity, startVerdicts } = this.props

    const approver = identity.name
    const verdict = target.dataset.verdict === 'deny' ? 'denied' : 'approved'

    // add clicked reimbursements to array, then map out the clicked property
    const selected = reimbursements
      .filter(item => item.clicked === true)
      .map(item => {
        let { clicked, ...clean } = item
        return clean
      })

    console.log(approver, verdict, selected)

    const verdicts = {
      approver,
      verdict,
      selected
    }

    startVerdicts(verdicts)
  }

  updateClicks = ({ target }) => {
    // time submitted
    const time =
      target.nodeName === 'TD'
        ? target.parentNode.dataset.key
        : target.dataset.key

    const updatedArray = this.state.reimbursements.map(item => {
      if (item.timeSubmitted !== time) return item

      return {
        ...item,
        clicked: !item.clicked
      }
    })
    this.setState({ reimbursements: updatedArray })
  }

  // @ts-ignore
  render = () => {
    const {
      identity,
      reimbursements,
      everyReimbursement,
      dataIsHere
    } = this.props

    return (
      <div>
        <div className="page-header">
          <div
            style={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <h1 className="page-title">Dashboard</h1>
            {identity.role === 'admin' && (
              <img
                src="https://png.icons8.com/color/160/crown.png"
                style={{
                  display: 'inline',
                  height: '50px',
                  width: '50px',
                  marginLeft: '20px'
                }}
              />
            )}
          </div>
          {identity.role !== 'undefined' &&
            identity.role === 'employee' && (
              <button onClick={this.startReimbursement} className="button new">
                <FontAwesomeIcon icon="plus" className="fa-plus" />
                New
              </button>
            )}
          {identity.role !== 'undefined' &&
            identity.role === 'admin' && (
              <div className="button-group">
                <button
                  className="button approve"
                  data-verdict="approve"
                  onClick={this.submitAdminDecision}
                >
                  Approve
                </button>
                <button
                  className="button deny"
                  data-verdict="deny"
                  onClick={this.submitAdminDecision}
                >
                  Deny
                </button>
              </div>
            )}
        </div>
        {identity.role !== 'undefined' && (
          <div>
            {identity.role === 'employee' ? (
              <div>
                {reimbursements !== undefined && (
                  <ReimbursementList reimbursements={reimbursements} />
                )}

                {reimbursements === undefined && (
                  <Spinner
                    name="ball-spin-fade-loader"
                    className="spinner"
                    fadeIn="none"
                    color="darkgray"
                  />
                )}
              </div>
            ) : (
              // admin dashboard
              <div>
                {everyReimbursement !== undefined ? (
                  <AdminReimbursementList
                    updateClicks={this.updateClicks}
                    submitAdminDecision={this.submitAdminDecision}
                    everyReimbursement={everyReimbursement}
                    state={this.state.reimbursements}
                  />
                ) : (
                  <Spinner
                    name="ball-spin-fade-loader"
                    className="spinner"
                    fadeIn="none"
                    color="darkgray"
                  />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  identity: state.auth,
  dataIsHere: state.mis.dataIsHere,
  reimbursements: state.reimbursements.reimbursements,
  everyReimbursement: state.reimbursements.everyReimbursement
})

export default connect(
  mapStateToProps,
  { startVerdicts }
)(DashboardPage)
