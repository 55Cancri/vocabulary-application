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

const addTopicUrl = 
  'https://njn4fv1tr6.execute-api.us-east-2.amazonaws.com/prod/create-topic'
  
export default {
  user: {
    signup: dossier => axios.post(signupUrl, { dossier }).then(res => res.data),

    login: credentials =>
      axios.post(loginUrl, { credentials }).then(res => res.data),

    persistUser: identity =>
      axios
        .post('/persist', { identity }, { headers: getToken() })
        .then(res => res.data),

    nuke: email =>
      axios
        .post('/api/nuke', email, { headers: getToken() })
        .then(res => res.data)
  },
  modal: {
    addWord: wordObject => {
<<<<<<< HEAD
      axios.post(addWordUrl, { wordObject }).then(res => res.data)
=======
      console.log(`Posting ${wordObject.word}`)
      axios.post(addWordUrl, {wordObject}).then(res => res.data)
    }
  },
  sidebar: {
    addTopic: topic => {
      console.log('Stepping into the api')
      axios.post(addTopicUrl, {topic}).then(res => res.data)
>>>>>>> 38ca98a3bc5866823da2399f01e976b143b0e599
    }
  }
}
