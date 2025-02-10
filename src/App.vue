<template>
  <router-view v-if="!loading" />
  <div v-else class="fullscreen flex flex-center">
    <q-spinner-dots size="40px" color="primary" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()
const loading = ref(true)

onMounted(async () => {
  try {
    await authStore.initializeAuth()
  } finally {
    loading.value = false
  }
})
</script>
