import React, { Component } from 'react'
import { Route, Redirect, RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import * as H from 'history'
import Header from '../components/Header'
import ModalContainer from '../components/ModalContainer'
import { startPersist } from '../actions/auth'

// import Sidebar from 'react-sidebar'
// import SidebarContent from '../components/SidebarContent'

// const mql = window.matchMedia(`(min-width: 100px)`)

// const sidebar = <SidebarContent />

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
  identity: any
}

interface DispatchProps {
  startLogout?: () => void
}

type Props = StateProps & DispatchProps & RouteProps

class PrivateRoute extends Component<Props> {
  // state = {
  //   mql: mql,
  //   sidebarDocked: false,
  //   sidebarOpen: false
  // }

  // mediaQueryChanged = () => {
  //   this.setState({ sidebarDocked: this.state.mql.matches })
  // }

  // onSetSidebarOpen = () =>
  //   this.setState({ sidebarOpen: !this.state.sidebarOpen })

  // componentWillMount() {
  //   mql.addListener(this.mediaQueryChanged)
  //   this.setState({ mql: mql, sidebarDocked: mql.matches })
  // }

  // componentWillUnmount() {
  //   this.state.mql.removeListener(this.mediaQueryChanged)
  // }
  // @ts-ignore
  render = () => {
    const { isAuthenticated, component: Component, ...rest } = this.props

    // const sidebarStyles = {
    //   root: {
    //     // Position above overlays or other high z-index elements your app might use
    //     zIndex: 100000,
    //     // Detach from right and bottom screen edges as it blocks underlying content
    //     // This also has the effect of shrinking the component to a width and height of 0
    //     right: 'auto',
    //     bottom: 'auto',
    //     // Allow child sidebar elements to render now that element has collapsed
    //     overflow: 'visible'
    //   },
    //   content: {
    //     // Detach from right and bottom screen edges as it blocks underlying content (collapses element)
    //     left: 'auto',
    //     bottom: 'auto',
    //     // The dragHandle is inside content element for some reason.
    //     // Allow it to render now that the parent is collapsed.
    //     overflow: 'visible'
    //   },
    //   sidebar: {
    //     // Make sidebar fixed, like dragHandle is by default
    //     position: 'fixed'
    //   },
    //   overlay: {
    //     // Enable/disable overlay interactivity based on open/closed state
    //     // pointer-events browser support: IE11+
    //     pointerEvents: 'auto'
    //   }
    // }

    return (
      <Route
        {...rest}
        component={props =>
          isAuthenticated ? (
            <div>
              <Header />
              <Component {...props} />
              <ModalContainer />
              {/* <Sidebar
                sidebar={sidebar}
                // @ts-ignore
                styles={sidebarStyles}
                open={this.state.sidebarOpen}
                docked={this.state.sidebarDocked}
                onSetOpen={this.onSetSidebarOpen}
                sidebarClassName="sidebar"
              /> */}
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
