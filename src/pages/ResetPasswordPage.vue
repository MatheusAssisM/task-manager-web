<template>
  <div class="reset-password-page">
    <q-card style="max-width: 400px; margin: auto;">
      <q-card-section>
        <div class="text-h6">Reset Password</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit">
          <q-input
            v-model="newPassword"
            type="password"
            label="New Password"
            :rules="[val => !!val || 'Password is required']"
          />
          <q-input
            v-model="confirmPassword"
            type="password"
            label="Confirm Password"
            :rules="[val => val === newPassword || 'Passwords must match']"
          />
        </q-form>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Reset" color="primary" @click="onSubmit" :loading="loading" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from 'src/stores/auth'
import { Notify } from 'quasar'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const newPassword = ref('')
const confirmPassword = ref('')
const loading = ref(false)

const onSubmit = async () => {
  if (newPassword.value !== confirmPassword.value) {
    Notify.create({
      type: 'negative',
      message: 'Passwords do not match'
    })
    return
  }

  try {
    loading.value = true
    await authStore.confirmResetPassword(newPassword.value, route.query.token)
    Notify.create({
      type: 'positive',
      message: 'Password reset successfully'
    })
    router.push('/login')
  } catch (error) {
    Notify.create({
      type: 'negative',
      message: error.message || 'Failed to reset password'
    })
  } finally {
    loading.value = false
  }
}
</script>
