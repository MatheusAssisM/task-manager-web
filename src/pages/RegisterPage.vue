<template>
  <div class="register-page q-pa-md">
    <q-card style="max-width: 400px; margin: auto;">
      <q-card-section>
        <div class="text-h6">Register</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input
            v-model="form.username"
            label="Username"
            :rules="[val => !!val || 'Username is required']"
          />

          <q-input
            v-model="form.email"
            label="Email"
            type="email"
            :rules="[
              val => !!val || 'Email is required',
              val => /^[^@]+@[^@]+\.[^@]+$/.test(val) || 'Invalid email format'
            ]"
          />

          <q-input
            v-model="form.password"
            label="Password"
            type="password"
            :rules="[
              val => !!val || 'Password is required',
              val => val.length >= 6 || 'Password must be at least 6 characters'
            ]"
          />

          <div class="row justify-between items-center">
            <q-btn
              type="submit"
              color="primary"
              label="Register"
              :loading="loading"
            />
            <q-btn
              flat
              color="primary"
              label="Already have an account?"
              to="/login"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth'
import { Notify } from 'quasar'

const router = useRouter()
const authStore = useAuthStore()
const loading = ref(false)

const form = ref({
  username: '',
  email: '',
  password: ''
})

const onSubmit = async () => {
  try {
    loading.value = true
    await authStore.register(form.value)
    Notify.create({
      type: 'positive',
      message: 'Registration successful! Please log in.'
    })
    router.push('/login')
  } catch (error) {
    Notify.create({
      type: 'negative',
      message: error.response?.data?.error || error.message || 'Registration failed'
    })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>