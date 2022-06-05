import axios from 'axios'
import { API_URL } from 'constants/env'
import storageAdmin from 'constants/storageAdmin'
import queryString from 'query-string'

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
})

axiosClient.interceptors.request.use(async (config) => {
  if (sessionStorage.getItem(storageAdmin.TOKEN))
    config.headers['Authorization'] = `Bearer ${sessionStorage.getItem(
      storageAdmin.TOKEN
    )}`
  if (localStorage.getItem(storageAdmin.TOKEN))
    config.headers['Authorization'] = `Bearer ${localStorage.getItem(
      storageAdmin.TOKEN
    )}`
  return config
})

axiosClient.interceptors.response.use(
  (response) => {
    return response && response.data ? response.data : response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosClient
