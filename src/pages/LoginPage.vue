<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card class="login-card">
          <q-card-section class="text-center">
            <h4 class="text-h5 q-mt-none q-mb-md">Login</h4>
          </q-card-section>

          <q-card-section>
            <q-form
              @submit.prevent="onSubmit"
              ref="loginForm"
              class="q-gutter-md"
            >
              <q-input
                v-model="email"
                type="email"
                label="Email"
                :rules="[val => !!val || 'Email is required']"
              />

              <q-input
                v-model="password"
                :type="isPwd ? 'password' : 'text'"
                label="Password"
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
                  label="Login"
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
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from 'src/stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const loginForm = ref(null)

const email = ref('')
const password = ref('')
const isPwd = ref(true)
const loading = ref(false)

const onSubmit = async () => {
  try {
    if (!loginForm.value || !await loginForm.value.validate()) {
      return
    }

    loading.value = true
    await authStore.login({
      email: email.value,
      password: password.value
    })

    if (authStore.isAuthenticated) {
      await router.replace('/')
    }
  } catch (error) {
    console.error('Login failed:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-card {
  width: 100%;
  max-width: 400px;
  padding: 20px;
}
</style>