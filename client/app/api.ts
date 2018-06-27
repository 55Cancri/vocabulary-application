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
  'https://njn4fv1tr6.execute-api.us-east-2.amazonaws.com/prod/signup'

const loginUrl =
  'https://njn4fv1tr6.execute-api.us-east-2.amazonaws.com/prod/login'

const persistUrl =
  'https://njn4fv1tr6.execute-api.us-east-2.amazonaws.com/prod/persist-user'

const addWordUrl =
  'https://njn4fv1tr6.execute-api.us-east-2.amazonaws.com/prod/create-word'

const updateWordUrl =
  'https://njn4fv1tr6.execute-api.us-east-2.amazonaws.com/prod/update-word'

const deleteWordUrl =
  'https://njn4fv1tr6.execute-api.us-east-2.amazonaws.com/prod/delete-word'

const addTopicUrl =
  'https://njn4fv1tr6.execute-api.us-east-2.amazonaws.com/prod/create-topic'

const updateTopicUrl =
  'https://njn4fv1tr6.execute-api.us-east-2.amazonaws.com/prod/update-topic'

// TODO: require token passed in header
export default {
  user: {
    signup: dossier => axios.post(signupUrl, { dossier }).then(res => res.data),

    login: credentials =>
      axios.post(loginUrl, { credentials }).then(res => res.data),

    persistUser: identity =>
      axios.post(persistUrl, { identity }).then(res => res.data),

    nuke: email =>
      axios
        .post('/api/nuke', email, { headers: getToken() })
        .then(res => res.data)
  },

  lexica: {
    addWord: wordObject =>
      axios.post(addWordUrl, { wordObject }).then(res => res.data),

    updateWord: word =>
      axios.post(updateWordUrl, { word }).then(res => res.data),

    deleteWord: word =>
      axios.post(deleteWordUrl, { word }).then(res => res.data),

    addTopic: topic => axios.post(addTopicUrl, { topic }).then(res => res.data),

    updateTopic: topic =>
      axios.post(updateTopicUrl, { topic }).then(res => res.data)
  }
  // header: {
  //   getEverything: username => {
  //     console.log('API reached')
  //     axios.get(getEverythingUrl).then(res => res.data)
  //   }
  // }
}
