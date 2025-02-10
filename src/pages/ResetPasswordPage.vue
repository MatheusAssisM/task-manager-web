<template>
<<<<<<< HEAD
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
=======
  <q-page class="flex flex-center">
    <q-card class="reset-card">
      <q-card-section class="text-center">
        <h4 class="text-h5 q-mt-none q-mb-md">Reset Password</h4>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="onSubmit" ref="resetForm" class="q-gutter-md">
          <q-input
            v-model="newPassword"
            :type="isPwd ? 'password' : 'text'"
            label="New Password"
            :rules="[val => !!val || 'Password is required']"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>

          <div class="full-width q-pt-md">
            <q-btn
              label="Reset Password"
              type="submit"
              color="primary"
              class="full-width"
              :loading="loading"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from 'src/stores/auth'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const router = useRouter()
const authStore = useAuthStore()
const $q = useQuasar()

const newPassword = ref('')
const isPwd = ref(true)
const loading = ref(false)
const resetToken = ref('')

onMounted(() => {
  // Get token from URL parameters
  const params = new URLSearchParams(window.location.search)
  resetToken.value = params.get('token')
  
  if (!resetToken.value) {
    $q.notify({
      type: 'negative',
      message: 'Invalid reset token'
    })
    router.push('/login')
  }
})

const onSubmit = async () => {
  try {
    loading.value = true
    await authStore.confirmResetPassword(newPassword.value, resetToken.value)
    $q.notify({
>>>>>>> 726f859 (Add reset password functionality with dialog and page components)
      type: 'positive',
      message: 'Password reset successfully'
    })
    router.push('/login')
  } catch (error) {
<<<<<<< HEAD
    Notify.create({
=======
    $q.notify({
>>>>>>> 726f859 (Add reset password functionality with dialog and page components)
      type: 'negative',
      message: error.message || 'Failed to reset password'
    })
  } finally {
    loading.value = false
  }
}
</script>
<<<<<<< HEAD
=======

<style scoped>
.reset-card {
  width: 100%;
  max-width: 400px;
  padding: 20px;
}
</style>
>>>>>>> 726f859 (Add reset password functionality with dialog and page components)
