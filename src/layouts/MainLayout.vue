<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-primary text-white" v-if="authStore.isAuthenticated">
      <q-toolbar>
        <q-toolbar-title>
          Task Manager
        </q-toolbar-title>
        <q-btn
          flat
          color="white"
          icon="add_task"
          class="q-mr-sm create-task-btn"
          @click="showAddTask = true"
          :tooltip-delay="600"
        >
          <q-tooltip>
            Create New Task (⌘/Ctrl + N)
          </q-tooltip>
          <span class="q-ml-sm gt-xs">New Task</span>
        </q-btn>
        <q-btn flat round dense :icon="darkMode ? 'dark_mode' : 'light_mode'" @click="toggleDarkMode" />
        <q-btn flat no-caps class="q-mr-sm">
          <q-icon name="person" class="q-mr-xs" />
          {{ authStore.user?.username }}
        </q-btn>
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
          <q-input 
            v-model="newTask.title" 
            label="Title" 
            :rules="[val => !!val || 'Title is required']"
            ref="titleRef"
            autofocus 
          />
          <q-input 
            v-model="newTask.description" 
            label="Description" 
            type="textarea"
            :rules="[val => !!val || 'Description is required']"
            ref="descRef"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="negative" v-close-popup />
          <q-btn flat label="Add Task" color="primary" @click="addTask" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth'
import { useTasksStore } from 'src/stores/tasks'
import { useQuasar, Dark } from 'quasar'
import { onKeyStroke } from '@vueuse/core'

const $q = useQuasar()
const router = useRouter()
const authStore = useAuthStore()
const tasksStore = useTasksStore()
const showAddTask = ref(false)
const darkMode = ref(Dark.isActive)
let tokenCheckInterval

const newTask = ref({
  title: '',
  description: ''
})
const titleRef = ref(null)
const descRef = ref(null)

onMounted(() => {
  darkMode.value = Dark.isActive
  // Check tokens every 15 seconds
  tokenCheckInterval = setInterval(() => {
    if (authStore.isAuthenticated) {
      authStore.checkAndRefreshTokens()
    }
  }, 15000)
})

onBeforeUnmount(() => {
  if (tokenCheckInterval) {
    clearInterval(tokenCheckInterval)
  }
})

const toggleDarkMode = () => {
  Dark.toggle()
  darkMode.value = Dark.isActive
}

const logout = async () => {
  authStore.logout()
  router.push('/login')
}

const addTask = async () => {
  // Validate both fields
  const isTitleValid = await titleRef.value.validate()
  const isDescValid = await descRef.value.validate()
  if (!isTitleValid || !isDescValid) {
    return
  }
  try {
    await tasksStore.addTask(newTask.value)
    await tasksStore.fetchTasks()
    newTask.value = { title: '', description: '' }
    showAddTask.value = false
    
    $q.notify({
      type: 'positive',
      message: 'Task created successfully!',
      position: 'top'
    })
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Error creating task',
      position: 'top'
    })
    console.error('Error adding task:', error)
  }
}

// Add keyboard shortcut for new task
onKeyStroke(['n'], (e) => {
  if ((e.metaKey || e.ctrlKey) && authStore.isAuthenticated) {
    e.preventDefault()
    showAddTask.value = true
  }
})
</script>

<style scoped>
.create-task-btn {
  transition: transform 0.2s ease;
}

.create-task-btn:hover {
  transform: scale(1.05);
}

/* Make sure the button text appears only on larger screens */
@media (max-width: 599px) {
  .gt-xs {
    display: none;
  }
}
</style>
