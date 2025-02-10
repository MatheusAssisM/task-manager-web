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
        if (!response?.data?.access_token) {
          throw new Error('Invalid credentials')
        }
        
        this.token = response.data.access_token
        this.user = response.data.user
        localStorage.setItem('token', this.token)
        this.setAuthHeader(this.token)
        
        return response.data
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Login failed')
      }
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
      this.setAuthHeader(null)
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 725c696 (Enhance authentication flow with password reset functionality and route updates)
    },

    async resetPassword(email) {
      try {
        await api.post('/auth/forgot-password', { email })
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to reset password')
      }
    },

    async confirmResetPassword(newPassword, token) {
      try {
        const response = await api.post('/auth/reset-password', {
          new_password: newPassword,
          token: token
        })

        const storedToken = localStorage.getItem('token')
        if (storedToken) {
          this.setAuthHeader(storedToken)
        }

        return response.data
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to reset password')
      }
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 374c003 (Add registration functionality with form validation and routing)
    },

    async register(userData) {
      try {
        const response = await api.post('/auth/register', userData)
        return response.data
      } catch (error) {
        throw new Error(error.response?.data?.error || 'Registration failed')
      }
<<<<<<< HEAD
=======
>>>>>>> e8d7a34 (Implement authentication flow with login page and API integration)
=======
>>>>>>> 725c696 (Enhance authentication flow with password reset functionality and route updates)
=======
>>>>>>> 374c003 (Add registration functionality with form validation and routing)
    }
  }
})