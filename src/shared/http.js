// import axios, { CancelToken } from 'axios'
import axios from 'axios'

// import { stringify } from 'qs'

const options = {
  baseURL: '/',
  timeout: 1000,
  withCredentials: true, // 允许跨域
  headers: {
    Accept: 'application/json',
    'content-type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
}
const http = axios.create(options)

http.interceptors.request.use(function (config) {
  // Do something before request is sent
  const { method } = config
  if (config.cancelToken || !isGet(method)) return config

  // const source = new CancelToken().source()
  // config.cancelToken = source.token
  console.log(config)
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

http.interceptors.response.use(function (response) {
  // Do something with response data
  console.log(response)
  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

export default http

function isGet (method) {
  return method === 'get' || method === 'GET'
}
