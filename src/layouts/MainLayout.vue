<template>
  <q-layout view="hHh LpR fFf">
<<<<<<< HEAD
<<<<<<< HEAD
    <q-header elevated class="bg-primary text-white" v-if="authStore.isAuthenticated">
=======
    <q-header elevated class="bg-primary text-white">
>>>>>>> d520633 (Add task management components and layout updates)
=======
    <q-header elevated class="bg-primary text-white" v-if="authStore.isAuthenticated">
>>>>>>> bca68bd (Restrict header visibility to authenticated users and redirect unauthenticated access to login)
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> f09927c (Implement task management with add and fetch functionality, including validation and notifications)
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
<<<<<<< HEAD
=======
          <q-input v-model="newTask.title" label="Title" autofocus />
          <q-input v-model="newTask.description" label="Description" type="textarea" />
>>>>>>> d520633 (Add task management components and layout updates)
=======
>>>>>>> f09927c (Implement task management with add and fetch functionality, including validation and notifications)
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="negative" v-close-popup />
<<<<<<< HEAD
<<<<<<< HEAD
          <q-btn flat label="Add Task" color="primary" @click="addTask" />
=======
          <q-btn flat label="Add Task" color="primary" @click="addTask" v-close-popup />
>>>>>>> d520633 (Add task management components and layout updates)
=======
          <q-btn flat label="Add Task" color="primary" @click="addTask" />
>>>>>>> f09927c (Implement task management with add and fetch functionality, including validation and notifications)
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth'
<<<<<<< HEAD
<<<<<<< HEAD
import { useTasksStore } from 'src/stores/tasks'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const router = useRouter()
const authStore = useAuthStore()
const tasksStore = useTasksStore()
=======
=======
import { useTasksStore } from 'src/stores/tasks'
import { useQuasar } from 'quasar'
>>>>>>> f09927c (Implement task management with add and fetch functionality, including validation and notifications)

const $q = useQuasar()
const router = useRouter()
const authStore = useAuthStore()
<<<<<<< HEAD
>>>>>>> d520633 (Add task management components and layout updates)
=======
const tasksStore = useTasksStore()
>>>>>>> f09927c (Implement task management with add and fetch functionality, including validation and notifications)
const showAddTask = ref(false)
const newTask = ref({
  title: '',
  description: ''
})
<<<<<<< HEAD

const titleRef = ref(null)
const descRef = ref(null)

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
=======

const titleRef = ref(null)
const descRef = ref(null)

const logout = async () => {
  authStore.logout()
  router.push('/login')
}

<<<<<<< HEAD
const addTask = () => {
  // TODO: Implement API call
  console.log('Add task:', newTask.value)
  newTask.value = { title: '', description: '' }
>>>>>>> d520633 (Add task management components and layout updates)
=======
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
>>>>>>> f09927c (Implement task management with add and fetch functionality, including validation and notifications)
}
</script>
