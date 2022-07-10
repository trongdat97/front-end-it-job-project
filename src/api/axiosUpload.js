import axios from 'axios'
import { API_URL } from 'constants/env'
import queryString from 'query-string'
import storageAdmin from 'constants/storageAdmin'

const axiosUpload = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
    Accept: '*/*',
  },
  paramsSerializer: (params) => queryString.stringify(params),
})

axiosUpload.interceptors.request.use(async (config) => {
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

axiosUpload.interceptors.response.use(
  (response) => {
    return response && response.data ? response.data : response
  },
  (error) => {
    return Promise.reject(error)
  }
)
export default axiosUpload
