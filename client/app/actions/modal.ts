import api from "../api";

export const loadModal = modalType => ({
  type: 'SHOW_MODAL',
  modalType
})

// export const addWord = word => dispatch =>
//   api.modal.addWord(word).then(
//     dispatch(hideModal())
//   )
//   .catch(err => console.log(err))

// set modalType to null in redux store
export const hideModal = () => ({
  type: 'HIDE_MODAL'
})
