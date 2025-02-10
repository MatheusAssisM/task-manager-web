<template>
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 726f859 (Add reset password functionality with dialog and page components)
  <q-page class="flex flex-center">
    <q-card class="login-card">
      <q-card-section class="text-center">
        <h4 class="text-h5 q-mt-none q-mb-md">Login</h4>
      </q-card-section>
<<<<<<< HEAD

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

      <q-card-section class="text-center">
        <div class="row q-gutter-sm justify-center">
          <q-btn
            flat
            color="primary"
            label="Forgot Password?"
            @click="showResetPassword = true"
          />
          <q-btn
            flat
            color="primary"
            label="Register"
            to="/register"
          />
        </div>
<<<<<<< HEAD
      </q-card-section>
    </q-card>
  </q-page>
  <ResetPasswordDialog v-model="showResetPassword" />
=======
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card class="login-card">
          <q-card-section class="text-center">
            <h4 class="text-h5 q-mt-none q-mb-md">Login</h4>
          </q-card-section>
=======
>>>>>>> 726f859 (Add reset password functionality with dialog and page components)

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

<<<<<<< HEAD
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
>>>>>>> e8d7a34 (Implement authentication flow with login page and API integration)
=======
      <q-card-section class="text-center">
        <q-btn
          flat
          color="primary"
          label="Forgot Password?"
          @click="showResetPassword = true"
        />
=======
>>>>>>> 374c003 (Add registration functionality with form validation and routing)
      </q-card-section>
    </q-card>
  </q-page>
  <ResetPasswordDialog v-model="showResetPassword" />
>>>>>>> 726f859 (Add reset password functionality with dialog and page components)
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from 'src/stores/auth'
import { useRouter } from 'vue-router'
<<<<<<< HEAD
<<<<<<< HEAD
import ResetPasswordDialog from 'components/ResetPasswordDialog.vue'
import { Notify } from 'quasar'
=======
>>>>>>> e8d7a34 (Implement authentication flow with login page and API integration)
=======
import ResetPasswordDialog from 'components/ResetPasswordDialog.vue'
import { Notify } from 'quasar'
>>>>>>> 726f859 (Add reset password functionality with dialog and page components)

const router = useRouter()
const authStore = useAuthStore()
const loginForm = ref(null)

const email = ref('')
const password = ref('')
const isPwd = ref(true)
const loading = ref(false)
<<<<<<< HEAD
<<<<<<< HEAD
const showResetPassword = ref(false)
=======
>>>>>>> e8d7a34 (Implement authentication flow with login page and API integration)
=======
const showResetPassword = ref(false)
>>>>>>> 726f859 (Add reset password functionality with dialog and page components)

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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 726f859 (Add reset password functionality with dialog and page components)
      Notify.create({
        type: 'positive',
        message: 'Login successful'
      })
<<<<<<< HEAD
=======
>>>>>>> e8d7a34 (Implement authentication flow with login page and API integration)
=======
>>>>>>> 726f859 (Add reset password functionality with dialog and page components)
      await router.replace('/')
    }
  } catch (error) {
    console.error('Login failed:', error)
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 726f859 (Add reset password functionality with dialog and page components)
    Notify.create({
      type: 'negative',
      message: error.message || 'Invalid credentials',
      position: 'top'
    })
<<<<<<< HEAD
=======
>>>>>>> e8d7a34 (Implement authentication flow with login page and API integration)
=======
>>>>>>> 726f859 (Add reset password functionality with dialog and page components)
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