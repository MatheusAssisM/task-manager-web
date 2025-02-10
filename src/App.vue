<template>
  <router-view v-if="!loading" />
  <div v-else class="fullscreen flex flex-center">
    <q-spinner-dots size="40px" color="primary" />
  </div>
</template>

<script setup>
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
import { onMounted } from 'vue'
=======
import { onMounted, ref } from 'vue'
>>>>>>> 0aa4494 (Add loading spinner during authentication initialization)
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()
const loading = ref(true)

<<<<<<< HEAD
onMounted(() => {
  authStore.initializeAuth()
>>>>>>> e8d7a34 (Implement authentication flow with login page and API integration)
=======
onMounted(async () => {
  try {
    await authStore.initializeAuth()
  } finally {
    loading.value = false
  }
>>>>>>> 0aa4494 (Add loading spinner during authentication initialization)
})
</script>
