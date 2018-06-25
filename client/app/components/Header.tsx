import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import fontawesome from '@fortawesome/fontawesome'

import { startLogout } from '../actions/auth'
// import { startGetEverything } from '../actions/app'

interface StateProps {
  isAuthenticated: Boolean
  name: string
  words: any
  results: any
}

interface DispatchProps {
  startLogout: () => void,
  // startGetEverything: (username) => void
}

type Props = StateProps & DispatchProps

export class Header extends Component<Props> {
  state = {
    dropdownOpen: false,
    searchTerm: ''
  }

  toggleDropdown = () =>
    this.setState({ dropdownOpen: !this.state.dropdownOpen })

  // Probably will only use this for testing
  //@ts-ignore
  // componentDidMount = () => {
  //   this.props.startGetEverything('scottkm')
  // }

  onFieldChange = e => {
    let value = e.target.value
    this.setState({
      searchTerm: value
    } as any)
  }

  handleSubmit = e => {
    e.preventDefault()
    console.log('Reached submit')
    console.log(this.props.words)
    const matches = this.props.words.filter(word => word.word === this.state.searchTerm)
    console.log(this.state.searchTerm)
    // console.log(match)
    // let matches = []
    let results = this.props.results
    // matches.push(match)
    console.log(matches[0])
    this.setState({
      results: matches
    } as any)
    console.log('Results', this.props.results)
    
    // alert('Found match' + match[0].word)
  }

  render() {
    const { isAuthenticated, startLogout } = this.props
    const searchTerm = this.state.searchTerm

    return (
      <header className="nav-header">
        <FontAwesomeIcon icon="bars" className="bars" />
        <Link to="/dashboard" className="seam-sm">
          Seam
        </Link>
        <div className="search-group">
          <FontAwesomeIcon icon="search" className="icon" />
          <form className="submit" onSubmit={this.handleSubmit} >
            <input type="text"
              className="input"
              placeholder="Search"
              value={searchTerm}
              onChange={this.onFieldChange} />
          </form>
        </div>

        <FontAwesomeIcon icon="bell" className="alerts" />

        <Dropdown
          isOpen={this.state.dropdownOpen}
          toggle={this.toggleDropdown}
          className="dropdown-root"
        >
          <DropdownToggle className="dropdown-toggle">
            <div
              className="image"
              style={
                {
                  // background: `url(${photo}) center / cover no-repeat`
                }
              }
            />
            <p className="nav-username">{this.props.name}</p>
            <FontAwesomeIcon icon="angle-down" className="icon fa-angle-down" />
          </DropdownToggle>
          <DropdownMenu
            right
            className="dropdown-menu"
            style={{
              display: this.state.dropdownOpen === false ? 'none' : 'block'
            }}
          >
            <DropdownItem className="dropdown-item">
              <Link to="/settings" className="settings">
                Settings
              </Link>
            </DropdownItem>
            <DropdownItem
              className="dropdown-item"
              onClick={() => startLogout()}
            >
              {isAuthenticated ? <p className="logout">Logout</p> : null}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </header>
    )
  }
}

const mapStateToProps = (state): StateProps => {
  return {
    isAuthenticated: !!state.auth.token,
    name: state.auth.name,
    words: state.lexica.words,
    results: state.lexica.results
  }
}

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  {
    startLogout
    // startGetEverything
  }
)(Header)
