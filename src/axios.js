import axios from 'axios'
import Cookie from 'js-cookie';

let api = 'https://spendlittle.herokuapp.com/api/v1'

const http = axios.create({
  baseURL: api
})

http.interceptors.request.use((config) => {
  const token = Cookie.get('burgerProjectToken')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}, (err) => {
  return Promise.reject(err)
})

http.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (error.response.status === 401) {
    window.location = '/login'
  }

  return Promise.reject(error)
})

export default http
