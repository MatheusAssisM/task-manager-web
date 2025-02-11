<template>
  <router-view v-if="!loading" />
  <div v-else class="fullscreen flex flex-center">
    <q-spinner-dots size="40px" color="primary" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useAuthStore } from './stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const loading = ref(true)

onMounted(async () => {
  try {
    await authStore.initializeAuth()
    
    // If we have tokens and they're expired, try to refresh
    if (authStore.isAuthenticated && authStore.tokenExpiry < new Date().getTime()) {
      try {
        await authStore.refreshTokens()
      } catch (error) {
        console.error('Failed to refresh tokens:', error)
        await authStore.logout()
        router.push('/login')
      }
    }
  } finally {
    loading.value = false
  }
})
</script>
