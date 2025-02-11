import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    accessToken: null,
    refreshToken: null,
    tokenExpiry: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.accessToken,
    getUser: (state) => state.user,
  },

  actions: {
    async login(credentials) {
      try {
        const response = await api.post('/auth/login', credentials)
        const { access_token, refresh_token, expires_in, user } = response.data
        
        this.accessToken = access_token
        this.refreshToken = refresh_token
        this.user = user
        this.tokenExpiry = new Date().getTime() + expires_in * 1000
        
        localStorage.setItem('access_token', access_token)
        localStorage.setItem('refresh_token', refresh_token)
        localStorage.setItem('token_expiry', this.tokenExpiry.toString())
        localStorage.setItem('user', JSON.stringify(user))
        
        return response.data
      } catch (error) {
        if (!error.response) {
          throw new Error('Service is unavailable. Please try again later.')
        }
        throw error
      }
    },

    async logout() {
      try {
        await api.post('/auth/logout')
      } catch (error) {
        console.error('Logout error:', error)
      } finally {
        this.clearAuth()
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

    async refreshTokens() {
      try {
        const response = await api.post('/auth/refresh', {
          refresh_token: this.refreshToken
        })
        
        const { access_token, refresh_token, expires_in } = response.data
        
        this.accessToken = access_token
        this.refreshToken = refresh_token
        this.tokenExpiry = new Date().getTime() + expires_in * 1000
        
        localStorage.setItem('access_token', access_token)
        localStorage.setItem('refresh_token', refresh_token)
        localStorage.setItem('token_expiry', this.tokenExpiry.toString())
        
        return response.data
      } catch {
        this.clearAuth()
        throw new Error('Failed to refresh tokens')
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

    async checkAndRefreshTokens() {
      if (!this.accessToken || !this.tokenExpiry) return

      // Refresh token if it will expire in the next 30 seconds
      const now = new Date().getTime()
      const timeUntilExpiry = this.tokenExpiry - now
      if (timeUntilExpiry < 30000 && timeUntilExpiry > 0) {
        try {
          await this.refreshTokens()
        } catch (error) {
          console.error('Failed to refresh tokens:', error)
          this.clearAuth()
        }
      }
    },

    initializeAuth() {
      const accessToken = localStorage.getItem('access_token')
      const refreshToken = localStorage.getItem('refresh_token')
      const tokenExpiry = localStorage.getItem('token_expiry')
      const userData = localStorage.getItem('user')

      if (accessToken && refreshToken) {
        this.accessToken = accessToken
        this.refreshToken = refreshToken
        this.tokenExpiry = parseInt(tokenExpiry)
        this.user = userData ? JSON.parse(userData) : null
      }
    },

    clearAuth() {
      this.user = null
      this.accessToken = null
      this.refreshToken = null
      this.tokenExpiry = null
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('token_expiry')
      localStorage.removeItem('user')
    }
  }
})