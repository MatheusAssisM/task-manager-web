<template>
  <q-dialog v-model="showing" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Reset Password</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form @submit="onSubmit">
          <q-input
            v-model="email"
            type="email"
            label="Email"
            :rules="[val => !!val || 'Email is required']"
          />
        </q-form>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Reset" color="primary" @click="onSubmit" :loading="loading" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from 'src/stores/auth'
import { Notify } from 'quasar'

const props = defineProps({
  modelValue: Boolean
})

const emit = defineEmits(['update:modelValue'])

const showing = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const authStore = useAuthStore()
const email = ref('')
const loading = ref(false)

const onSubmit = async () => {
  try {
    loading.value = true
    await authStore.resetPassword(email.value)
    Notify.create({
      type: 'positive',
      message: 'Password reset instructions sent to your email'
    })
    window.open('http://localhost:8025', '_blank')
    showing.value = false
    email.value = ''
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
