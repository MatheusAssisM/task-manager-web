<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-primary text-white" v-if="authStore.isAuthenticated">
      <q-toolbar>
        <q-toolbar-title>
          Task Manager
        </q-toolbar-title>

        <q-btn flat round dense icon="add" @click="showAddTask = true" />
        <q-btn flat round dense icon="logout" @click="logout" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-dialog v-model="showAddTask">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">New Task</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input v-model="newTask.title" label="Title" autofocus />
          <q-input v-model="newTask.description" label="Description" type="textarea" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="negative" v-close-popup />
          <q-btn flat label="Add Task" color="primary" @click="addTask" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const showAddTask = ref(false)
const newTask = ref({
  title: '',
  description: ''
})

const logout = async () => {
  authStore.logout()
  router.push('/login')
}

const addTask = () => {
  // TODO: Implement API call
  console.log('Add task:', newTask.value)
  newTask.value = { title: '', description: '' }
}
</script>
