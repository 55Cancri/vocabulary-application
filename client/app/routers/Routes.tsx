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
import ReimbursePage from '../components/ReimbursePage'

import NotFoundPage from '../components/NotFoundPage'

export const history = createHistory()
const mql = window.matchMedia(`(min-width: 800px)`)

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

const publicRoutes = (
  <Switch>
    <PublicRoute exact path="/" component={SignupPage} />
    <PublicRoute path="/signup" component={SignupPage} />
    <PublicRoute path="/login" component={LoginPage} />
  </Switch>
)

const privateRoutes = (
  <Switch>
    <PrivateRoute path="/settings" component={SettingsPage} />
    <PrivateRoute path="/dashboard" component={DashboardPage} />
    <PrivateRoute path="/create" component={ReimbursePage} />
  </Switch>
)
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
  shouldComponentUpdate = () => false

  // @ts-ignore
  render = () => {
    return (
      <Router history={history}>
        <Switch>
          <PublicRoute exact path="/" component={SignupPage} />
          <PublicRoute path="/signup" component={SignupPage} />
          <PublicRoute path="/login" component={LoginPage} />
          <Sidebar
            sidebar={sidebar}
            open={this.state.sidebarOpen}
            docked={this.state.sidebarDocked}
            onSetOpen={this.onSetSidebarOpen}
            sidebarClassName="sidebar"
            transitions={false}
          >
            <PrivateRoute path="/create" component={ReimbursePage} />
            <PrivateRoute path="/dashboard" component={DashboardPage} />
            <PrivateRoute path="/settings" component={SettingsPage} />
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
