import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user,
  },

  actions: {
    async login(credentials) {
      try {
        const response = await api.post('/auth/login', credentials)
        const { access_token, user } = response.data
        
        this.token = access_token
        this.user = user
        localStorage.setItem('token', this.token)
        this.setAuthHeader(this.token)
        
        return response.data
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Invalid credentials')
      }
    },

    async logout() {
      try {
        // Call the logout endpoint before clearing local state
        await api.post('/auth/logout')
      } catch (error) {
        console.error('Logout error:', error)
      } finally {
        // Clear local state even if the API call fails
        this.user = null
        this.token = null
        localStorage.removeItem('token')
        this.setAuthHeader(null)
      }
    },

    async register(userData) {
      try {
        const response = await api.post('/auth/register', userData)
        return response.data
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Registration failed')
      }
    },

    async resetPassword(email) {
      try {
        const response = await api.post('/auth/forgot-password', { email })
        return response.data
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to send reset password email')
      }
    },

    async confirmResetPassword(new_password, token) {
      try {
        const response = await api.post('/auth/reset-password', {
          token,
          new_password
        })
        return response.data
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to reset password')
      }
    },

    initializeAuth() {
      const token = localStorage.getItem('token')
      if (token) {
        this.token = token
        this.setAuthHeader(token)
      }
    },

    setAuthHeader(token) {
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      } else {
        delete api.defaults.headers.common['Authorization']
      }
    }
  }
})