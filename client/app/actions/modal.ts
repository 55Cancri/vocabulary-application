export const loadModal = modalType => ({
  type: 'SHOW_MODAL',
  modalType
})

// set modalType to null in redux store
export const hideModal = () => ({
  type: 'HIDE_MODAL'
})
