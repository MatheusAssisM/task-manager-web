import { defineBoot } from '#q-app/wrappers'
import axios from 'axios'

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 2549301 (Add Axios request interceptor for token management and create Quasar Notify boot file)
const api = axios.create({ baseURL: process.env.API_URL || 'http://localhost:8000' })

const publicPaths = [
  '/auth/login',
  '/auth/forgot-password',
<<<<<<< HEAD
<<<<<<< HEAD
  '/auth/reset-password',
  '/auth/reset-password/'
=======
  '/auth/reset-password'
>>>>>>> 2549301 (Add Axios request interceptor for token management and create Quasar Notify boot file)
=======
  '/auth/reset-password',
  '/auth/reset-password/'
>>>>>>> f165cb3 (Change Vue Router mode to 'history' for improved URL handling; update Reset Password page layout and validation logic)
]

// Add request interceptor
api.interceptors.request.use(
  config => {
    const isPublicPath = publicPaths.some(path => config.url?.includes(path))
    if (!isPublicPath && localStorage.getItem('token')) {
      config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    }
    return config
  },
  error => Promise.reject(error)
)
<<<<<<< HEAD
=======
const api = axios.create({ baseURL: process.env.API_URL || 'http://localhost:3000' })
>>>>>>> e8d7a34 (Implement authentication flow with login page and API integration)
=======
>>>>>>> 2549301 (Add Axios request interceptor for token management and create Quasar Notify boot file)

// Add response interceptor
api.interceptors.response.use(
  response => response,
  error => {
<<<<<<< HEAD
<<<<<<< HEAD
    if (error.response?.status === 401 && !publicPaths.some(path => error.config.url?.includes(path))) {
=======
    if (error.response?.status === 401) {
>>>>>>> e8d7a34 (Implement authentication flow with login page and API integration)
=======
    if (error.response?.status === 401 && !publicPaths.some(path => error.config.url?.includes(path))) {
>>>>>>> 2549301 (Add Axios request interceptor for token management and create Quasar Notify boot file)
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default defineBoot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api }
