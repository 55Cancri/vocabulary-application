import axios from 'axios'

export let getToken = () => {
  console.log('getting token...')
  const token = localStorage.getItem('ers')
  //headers must be an object
  return { token }
}
export default {
  user: {
    // createTable: () => axios.post('/create').then(res => console.log(res)),

    signup: dossier => axios.post('/signup', { dossier }).then(res => res.data),

    login: credentials =>
      axios.post('/login', { credentials }).then(res => res.data),

    persistUser: identity =>
      axios
        .post('/persist', { identity }, { headers: getToken() })
        .then(res => res.data),

    submitReimbursement: reimbursement => {
      return axios
        .post('/submit', { reimbursement }, { headers: getToken() })
        .then(res => res.data)
    },

    issueVerdicts: verdict => {
      return axios
        .post('/verdicts', { verdict }, { headers: getToken() })
        .then(res => res.data)
    },

    updateGeneral: file =>
      axios
        .post('/api/general_settings', file, { headers: getToken() })
        .then(res => res.data),

    updatePassword: file =>
      axios
        .post('/api/password_settings', file, { headers: getToken() })
        .then(res => res.data),

    updateTransfer: file =>
      axios
        .post('/api/transfer_settings', file, { headers: getToken() })
        .then(res => res.data),

    deleteAccount: data =>
      axios
        .post('/api/delete', data, { headers: getToken() })
        .then(res => res.data),

    updateAccounts: data =>
      axios
        .post('/api/update', data, { headers: getToken() })
        .then(res => res.data),

    getUser: email =>
      axios
        .post('/api/get_user', email, { headers: getToken() })
        .then(res => res.data),

    deleteImage: data =>
      axios
        .post('/api/delete_image', data, { headers: getToken() })
        .then(res => res.data),

    nuke: email =>
      axios
        .post('/api/nuke', email, { headers: getToken() })
        .then(res => res.data)
  }
}
