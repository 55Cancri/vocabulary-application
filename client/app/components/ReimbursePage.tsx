import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReimburseForm from './reimbursement/ReimburseForm'

// need to pass history object to child components
// has history object by virtue of being connected to redux
export class ReimbursePage extends Component<any> {
  // @ts-ignore
  render = () => {
    return (
      <div className="reimbursement-page">
        <div className="reimburse-header">
          <h1 className="page-title">New reimbursement </h1>
          <button className="create-blue button new" form="reimburse-form">
            Submit
          </button>
        </div>
        <ReimburseForm history={this.props.history} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  username: state.auth.username
})

export default connect(mapStateToProps)(ReimbursePage)
