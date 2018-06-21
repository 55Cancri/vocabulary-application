import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import fontawesome from '@fortawesome/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'

export class AddWordDialog extends Component {

    render() {
        console.log('Rendering...')
        return (
        <div className="modal fade">
            <div className="modal-dialog" >
                <div className="modal-content" >
                    <div className="modal-body" >
                        Hello
                    </div>
                </div>
            </div>
            {/* <Link to="/dashboard" className="link">
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
            <button >
            Submit New Word
            </button> */}
        </div>
        )
    }
}

export default AddWordDialog
