import React, { Component } from 'react'
import { Router, Route, Switch, RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import Sidebar from 'react-sidebar'
import createHistory from 'history/createBrowserHistory'

import SidebarContent from '../components/SidebarContent'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

import LoginPage from '../components/LoginPage'
import SignupPage from '../components/SignupPage'
import SettingsPage from '../components/SettingsPage'
import DashboardPage from '../components/DashboardPage'
import GlossaryPage from '../components/GlossaryPage'
import TagsPage from '../components/TagsPage'
import WordPage from '../components/WordPage'
import NotFoundPage from '../components/NotFoundPage'
import ProfilePage from '../components/ProfilePage'

export const history = createHistory()
const mql = window.matchMedia(`(min-width: 100px)`)

interface IProps {
  history?: any
  sidebarOpen?: any
}
interface IState {
  mql: MediaQueryList
  sidebarDocked: boolean
  sidebarOpen: boolean
}

// sidebar content
const sidebar = <SidebarContent />

// const publicRoutes = (
//   <Switch>
//     <PublicRoute exact path="/" component={SignupPage} />
//     <PublicRoute path="/signup" component={SignupPage} />
//     <PublicRoute path="/login" component={LoginPage} />
//   </Switch>
// )

// const privateRoutes = (
//   <Switch>
//     <PrivateRoute path="/settings" component={SettingsPage} />
//     <PrivateRoute path="/dashboard" component={DashboardPage} />
//     <PrivateRoute path="/create" component={ReimbursePage} />
//   </Switch>
// )
// const routes = (
//   <Switch>
//     <PublicRoute exact path="/" component={SignupPage} />
//     <PublicRoute path="/signup" component={SignupPage} />
//     <PublicRoute path="/login" component={LoginPage} />
//     <Sidebar
//       sidebar={sidebar}
//       open={this.state.sidebarOpen}
//       docked={this.state.sidebarDocked}
//       onSetOpen={this.onSetSidebarOpen}
//       transitions={false}
//     >
//       <PrivateRoute path="/settings" component={SettingsPage} />
//       <PrivateRoute path="/dashboard" component={DashboardPage} />
//       <PrivateRoute path="/create" component={ReimbursePage} />
//     </Sidebar>

//     <Route component={NotFoundPage} />
//   </Switch>
// )

export class Pages extends Component<IProps, IState> {
  state = {
    mql: mql,
    sidebarDocked: false,
    sidebarOpen: false
  }

  mediaQueryChanged = () => {
    this.setState({ sidebarDocked: this.state.mql.matches })
  }

  onSetSidebarOpen = () =>
    this.setState({ sidebarOpen: !this.state.sidebarOpen })

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged)
    this.setState({ mql: mql, sidebarDocked: mql.matches })
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged)
  }

  // @ts-ignore
  // shouldComponentUpdate = () => false

  // @ts-ignore
  render = () => {
    const sidebarStyles = {
      root: {
        // Position above overlays or other high z-index elements your app might use
        zIndex: 100000,
        // Detach from right and bottom screen edges as it blocks underlying content
        // This also has the effect of shrinking the component to a width and height of 0
        right: 'auto',
        bottom: 'auto',
        // Allow child sidebar elements to render now that element has collapsed
        overflow: 'visible'
      },
      content: {
        // Detach from right and bottom screen edges as it blocks underlying content (collapses element)
        left: 'auto',
        bottom: 'auto',
        // The dragHandle is inside content element for some reason.
        // Allow it to render now that the parent is collapsed.
        overflow: 'visible'
      },
      sidebar: {
        // Make sidebar fixed, like dragHandle is by default
        position: 'fixed'
      },
      overlay: {
        // Enable/disable overlay interactivity based on open/closed state
        // pointer-events browser support: IE11+
        pointerEvents: 'auto'
      }
    }
    return (
      <Router history={history}>
        <Switch>
          <PublicRoute exact path="/" component={SignupPage} />
          <PublicRoute path="/signup" component={SignupPage} />
          <PublicRoute path="/login" component={LoginPage} />
          <Sidebar
            sidebar={sidebar}
            // @ts-ignore
            // styles={sidebarStyles}
            open={this.state.sidebarOpen}
            docked={this.state.sidebarDocked}
            onSetOpen={this.onSetSidebarOpen}
            sidebarClassName="sidebar"
            rootClassName="root-class"
            contentClassName="content-class"
            overlayClassName="overlay-class"
          >
            <PrivateRoute path="/dashboard" component={DashboardPage} />
            <PrivateRoute path="/glossary" component={GlossaryPage} />
            <PrivateRoute path="/tags" component={TagsPage} />
            <PrivateRoute path="/word/:uid" component={WordPage} />
            <PrivateRoute path="/settings" component={SettingsPage} />
            <PrivateRoute path="/profile" component={ProfilePage} />
          </Sidebar>
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    )
  }
}

const mapStateToProps = state => ({
  sidebarOpen: state.app.sidebarOpen
})

export default connect(mapStateToProps)(Pages)
