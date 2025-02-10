<template>
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> f165cb3 (Change Vue Router mode to 'history' for improved URL handling; update Reset Password page layout and validation logic)
  <div class="reset-password-page">
    <q-card style="max-width: 400px; margin: auto;">
      <q-card-section>
        <div class="text-h6">Reset Password</div>
<<<<<<< HEAD
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
=======
>>>>>>> f165cb3 (Change Vue Router mode to 'history' for improved URL handling; update Reset Password page layout and validation logic)
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
<<<<<<< HEAD
    await authStore.confirmResetPassword(newPassword.value, resetToken.value)
    $q.notify({
>>>>>>> 726f859 (Add reset password functionality with dialog and page components)
=======
    await authStore.confirmResetPassword(newPassword.value, route.query.token)
    Notify.create({
>>>>>>> f165cb3 (Change Vue Router mode to 'history' for improved URL handling; update Reset Password page layout and validation logic)
      type: 'positive',
      message: 'Password reset successfully'
    })
    router.push('/login')
  } catch (error) {
<<<<<<< HEAD
<<<<<<< HEAD
    Notify.create({
=======
    $q.notify({
>>>>>>> 726f859 (Add reset password functionality with dialog and page components)
=======
    Notify.create({
>>>>>>> f165cb3 (Change Vue Router mode to 'history' for improved URL handling; update Reset Password page layout and validation logic)
      type: 'negative',
      message: error.message || 'Failed to reset password'
    })
  } finally {
    loading.value = false
  }
}
</script>
<<<<<<< HEAD
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
=======
>>>>>>> f165cb3 (Change Vue Router mode to 'history' for improved URL handling; update Reset Password page layout and validation logic)
