import React from 'react';
import PropTypes from 'prop-types';

interface ModalState {
    show: boolean,
    onClose: any,
    children: any
}

class Modal extends React.Component {

    state = {
        show: false,
        onClose: '',
        children: []
    }

    onClose = () => {
        this.state.show = false;
    }

  render() {
    // Render nothing if the "show" prop is false
    if(!this.state.show) {
      return null;
    }

    // The gray background
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50
    };

    // The modal "window"
    const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      maxWidth: 500,
      minHeight: 300,
      margin: '0 auto',
      padding: 30
    };

    return (
      <div className="backdrop">
        <div className="modal">
          {/* {this.state.children} */}
          <div className="modal-body">
            Hello
          </div>
          <div className="footer">
            <button onClick={this.onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}

// Modal.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   show: PropTypes.bool,
//   children: PropTypes.node
// };

export default Modal;

// import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
// import fontawesome from '@fortawesome/fontawesome'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import PropTypes from 'prop-types'

// export class AddWordDialog extends React.Component {

//     render() {
//         console.log('Rendering...')
//         if(!this.props.show) {
//             return null;
//         }

//         return (
//         <div className="modal fade">
//             <div className="modal-dialog" >
//                 <div className="modal-content" >
//                     <div className="modal-body" >
//                         Hello
//                     </div>
//                 </div>
//             </div>
//             {/* <Link to="/dashboard" className="link">
//             <FontAwesomeIcon icon="home" className="fa-home" />
//             &nbsp; &nbsp;Home
//             </Link>
//             <Link to="/messages" className="link">
//             <FontAwesomeIcon icon="globe" className="fa-globe" />
//             &nbsp; &nbsp;Messages
//             </Link>
//             <Link to="/messages" className="link">
//             <FontAwesomeIcon icon="briefcase" className="fa-briefcase" />
//             &nbsp; &nbsp;Analytics
//             </Link>
//             <button >
//             Submit New Word
//             </button> */}
//         </div>
//         )
//     }
// }

// AddWordDialog.propTypes = {
//     onClose: PropTypes.func.isRequired,
//     show: PropTypes.bool,
//     children: PropTypes.node
// }

// export default AddWordDialog
