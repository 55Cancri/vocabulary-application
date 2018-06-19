import React, { Component } from 'react'
import { Route, Redirect, RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import * as H from 'history'
import Header from '../components/Header'
import { startPersist } from '../actions/auth'

interface RouteProps {
  location?: H.Location
  component?:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>
  render?: ((props: RouteComponentProps<any>) => React.ReactNode)
  children?:
    | ((props: RouteComponentProps<any>) => React.ReactNode)
    | React.ReactNode
  path?: string
  exact?: boolean
  strict?: boolean
}

// interface OwnProps extends RouteComponentProps<any> {
//   path: string
//   component: any
// }

interface StateProps {
  isAuthenticated?: boolean
  reimbursements: any
  identity: any
}

interface DispatchProps {
  startLogout?: () => void
}

type Props = StateProps & DispatchProps & RouteProps

class PrivateRoute extends Component<Props> {
  // @ts-ignore
  render = () => {
    const { isAuthenticated, component: Component, ...rest } = this.props

    return (
      <Route
        {...rest}
        component={props =>
          isAuthenticated ? (
            <div>
              <Header />
              <Component {...props} />
            </div>
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    )
  }
}

const mapStateToProps = state => ({
  email: state.auth.email,
  isAuthenticated: !!state.auth.token,
  reimbursements: state.reimbursements,
  identity: state.auth
})

export default connect<StateProps, DispatchProps, RouteProps>(
  mapStateToProps,
  null,
  null,
  {
    pure: false
  }
)(PrivateRoute)
