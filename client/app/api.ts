import axios from 'axios'

// attaches token to every path that uses this object
const authAxios = axios.create()
authAxios.interceptors.request.use(config => {
  config.headers.Authorization = localStorage.token
  return config
})

// signup: dossier => axios.post(signupUrl, { dossier }, {
//   headers: {
//     Authorization: localStorage.ers
//   }
// }).then(res => res.data),

export let getToken = () => {
  console.log('getting token...')
  const token = localStorage.getItem('ers')
  //headers must be an object
  return { token }
}

const signupUrl =
  'https://njn4fv1tr6.execute-api.us-east-2.amazonaws.com/prod/auth'

const loginUrl =
  'https://njn4fv1tr6.execute-api.us-east-2.amazonaws.com/prod/login'

const addWordUrl =
  'https://njn4fv1tr6.execute-api.us-east-2.amazonaws.com/prod/create-word'

export default {
  user: {
    signup: dossier => axios.post(signupUrl, { dossier }).then(res => res.data),

    login: credentials =>
      axios.post(loginUrl, { credentials }).then(res => res.data),

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
  },
  modal: {
    addWord: wordObject => {
      console.log(`Posting ${wordObject.word}`)
      axios.post(addWordUrl, {wordObject}).then(res => res.data)
    }
  }
}
