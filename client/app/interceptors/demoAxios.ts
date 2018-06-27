import axios from 'axios'

export const demoAxios = axios.create()
demoAxios.interceptors.request.use(config => {
  config.headers.Authorization = localStorage.getItem('wa')
  return config
})
