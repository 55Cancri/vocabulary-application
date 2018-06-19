import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

interface IProps {
  role: String
}

class NavOptions extends Component<IProps> {
  render() {
    const { role } = this.props
    return (
      <div>
        {role === 'admin' ? (
          <div>
            <Link to="/">View all pending</Link>
            <br />
            <Link to="/">View user's history</Link>
          </div>
        ) : (
          <div>
            <Link to="/">View requests</Link>
            <br />
            <Link to="/">Submit new</Link>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  role: state.auth.role
})

export default connect(mapStateToProps)(NavOptions)
