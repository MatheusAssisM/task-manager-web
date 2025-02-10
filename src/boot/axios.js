import { defineBoot } from '#q-app/wrappers'
import axios from 'axios'

<<<<<<< HEAD
const api = axios.create({ baseURL: process.env.API_URL || 'http://localhost:8000' })

const publicPaths = [
  '/auth/login',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/auth/reset-password/'
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
=======
const api = axios.create({ baseURL: process.env.API_URL || 'http://localhost:3000' })
>>>>>>> e8d7a34 (Implement authentication flow with login page and API integration)

// Add response interceptor
api.interceptors.response.use(
  response => response,
  error => {
<<<<<<< HEAD
    if (error.response?.status === 401 && !publicPaths.some(path => error.config.url?.includes(path))) {
=======
    if (error.response?.status === 401) {
>>>>>>> e8d7a34 (Implement authentication flow with login page and API integration)
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
