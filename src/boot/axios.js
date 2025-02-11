import { defineBoot } from '#q-app/wrappers'
import axios from 'axios'

const api = axios.create({ baseURL: process.env.API_URL || 'http://localhost:8000' })

const publicPaths = [
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/auth/reset-password/',
  '/auth/refresh'
]

let isRefreshing = false
let failedRequests = []

// Add request interceptor
api.interceptors.request.use(
  config => {
    const isPublicPath = publicPaths.some(path => config.url?.includes(path))
    if (!isPublicPath && localStorage.getItem('access_token')) {
      config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`
    }
    return config
  },
  error => Promise.reject(error)
)

// Add response interceptor
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      // Skip refresh token logic for login attempts
      if (originalRequest.url.includes('/auth/login')) {
        return Promise.reject(error)
      }

      // Skip refresh token logic when there's no access token
      if (!localStorage.getItem('access_token')) {
        return Promise.reject(error)
      }

      if (originalRequest.url.includes('/auth/refresh')) {
        // If refresh token request fails, logout user
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        window.location.href = '/login'
        return Promise.reject(error)
      }

      if (isRefreshing) {
        return new Promise(resolve => {
          failedRequests.push(() => {
            resolve(api(originalRequest))
          })
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const refreshToken = localStorage.getItem('refresh_token')
        if (!refreshToken) {
          throw new Error('No refresh token available')
        }

        const response = await api.post('/auth/refresh', {
          refresh_token: refreshToken
        })

        const { access_token, refresh_token } = response.data
        localStorage.setItem('access_token', access_token)
        localStorage.setItem('refresh_token', refresh_token)

        originalRequest.headers.Authorization = `Bearer ${access_token}`
        failedRequests.forEach(callback => callback())
        failedRequests = []

        return api(originalRequest)
      } catch (refreshError) {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        window.location.href = '/login'
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }
    return Promise.reject(error)
  }
)

export default defineBoot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api }
