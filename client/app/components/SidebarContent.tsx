import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import fontawesome from '@fortawesome/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddWordDialog from './AddWordDialog'

export class SidebarContent extends Component {
  
  onClick = e => {
    e.preventDefault()
    console.log('Reached button')
    return(<AddWordDialog/>)
  }
  
  render() {

    return (
      <div className="panel">
        <Link to="/dashboard" className="link">
          <FontAwesomeIcon icon="home" className="fa-home" />
          &nbsp; &nbsp;Home
        </Link>
        <Link to="/messages" className="link">
          <FontAwesomeIcon icon="globe" className="fa-globe" />
          &nbsp; &nbsp;Messages
        </Link>
        <Link to="/messages" className="link">
          <FontAwesomeIcon icon="briefcase" className="fa-briefcase" />
          &nbsp; &nbsp;Analytics
        </Link>
        <button onClick={this.onClick} >
          Submit New Word
        </button>
      </div>
    )
  }
}

export default SidebarContent
