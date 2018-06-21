import React from 'react'
import { connect } from 'react-redux'

// import all modal components
import NewWordModal from './modals/NewWordModal'

// import modal type constants
import { NEW_WORD_MODAL } from '../constants/modaltypes'

// modal directory based on props.modalType
const MODAL_COMPONENTS = {
  NEW_WORD_MODAL: NewWordModal
}

const ModalContainer = props => {
  // if no modal set in store, do not render one
  if (!props.modalType) {
    return null
  }

  // object lookup
  const SpecificModal = MODAL_COMPONENTS[props.modalType]

  return <SpecificModal />
}

const mapStateToProps = state => ({
  modalType: state.modal.modalType
})

export default connect(mapStateToProps)(ModalContainer)
