






// const aws = require('aws-sdk')
// const docClient = new aws.DynamoDB.DocumentClient({ region: 'us-east-2' })

// exports.handler = async (event) => {
    
//     const signup = async () => {
//         const params = {
//             TableName: 'wa-users',
//             Item: {
//                 username: 'igloo',
//                 password: '123123'
//             }
//         }
//         return await docClient.put(params).promise()
//     }

//     signup().then(() => ({
//         statusCode: 200, 
//         body: JSON.stringify({
//             "result": "done"
//         }), 
//         headers: {
//             'Content-Type': 'application/json',
//             'Access-Control-Allow-Origin': "*"
//         }   
//     }))

//     // return await docClient.put(params).promise()
// };




import axios from 'axios'

export let getToken = () => {
  console.log('getting token...')
  const token = localStorage.getItem('ers')
  //headers must be an object
  return { token }
}

const signupUrl =
  'https://njn4fv1tr6.execute-api.us-east-2.amazonaws.com/prod/auth'

export default {
  user: {
    signup: dossier => axios.post(signupUrl, { dossier }).then(res => res.data),

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
