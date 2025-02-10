<template>
  <div class="task-list">
    <q-list separator>
<<<<<<< HEAD
<<<<<<< HEAD
      <q-item v-for="task in tasksStore.tasks" :key="task.id" class="q-my-sm" clickable v-ripple>
        <q-item-section side>
          <q-checkbox 
            :model-value="task.completed"
            @update:model-value="toggleTaskStatus(task)"
          />
<<<<<<< HEAD
=======
      <q-item v-for="task in tasks" :key="task.id" class="q-my-sm" clickable v-ripple>
=======
      <q-item v-for="task in tasksStore.tasks" :key="task.id" class="q-my-sm" clickable v-ripple>
>>>>>>> f09927c (Implement task management with add and fetch functionality, including validation and notifications)
        <q-item-section side>
          <q-checkbox v-model="task.completed" @update:model-value="toggleTask(task)" />
>>>>>>> d520633 (Add task management components and layout updates)
=======
>>>>>>> 8815cdd (Implement task status toggle functionality with notifications for success and error handling)
        </q-item-section>

        <q-item-section>
          <q-item-label :class="{ 'text-strike': task.completed }">
            {{ task.title }}
          </q-item-label>
          <q-item-label caption>
            {{ task.description }}
          </q-item-label>
        </q-item-section>

<<<<<<< HEAD
        <q-item-section side class="flex items-right">
          <q-btn flat round color="primary" icon="edit" @click="openEditDialog(task)" class="q-mr-sm" />
          <q-btn flat round color="negative" icon="delete" @click="deleteTask(task.id)" class="q-mr-sm" />
        </q-item-section>
      </q-item>
    </q-list>
    
    <edit-task-dialog
      v-model="editDialog"
      :task="selectedTask"
      @update="handleTaskUpdate"
    />
=======
        <q-item-section side>
          <q-btn flat round color="primary" icon="edit" @click="openEditDialog(task)" class="q-mr-sm" />
          <q-btn flat round color="negative" icon="delete" @click="deleteTask(task.id)" />
        </q-item-section>
      </q-item>
    </q-list>
<<<<<<< HEAD
>>>>>>> d520633 (Add task management components and layout updates)
=======
    
    <edit-task-dialog
      v-model="editDialog"
      :task="selectedTask"
      @update="handleTaskUpdate"
    />
>>>>>>> af52eda (Implement edit task functionality with dialog and update notifications)
  </div>
</template>

<script setup>
<<<<<<< HEAD
<<<<<<< HEAD
import { ref } from 'vue'
<<<<<<< HEAD
=======
import { ref } from 'vue'
>>>>>>> af52eda (Implement edit task functionality with dialog and update notifications)
import EditTaskDialog from './EditTaskDialog.vue'
import { onMounted } from 'vue'
import { useTasksStore } from 'src/stores/tasks'
<<<<<<< HEAD
<<<<<<< HEAD
import { useQuasar, Dialog } from 'quasar'

const $q = useQuasar()
$q.dialog = Dialog.create

const tasksStore = useTasksStore()

const editDialog = ref(false)
const selectedTask = ref(null)

const openEditDialog = (task) => {
  selectedTask.value = { ...task }  // Create a copy of the task
  editDialog.value = true
}

const handleTaskUpdate = async (updatedTask) => {
  try {
    await tasksStore.updateTask(selectedTask.value.id, updatedTask)
    await tasksStore.fetchTasks() // Fetch fresh data after update
    editDialog.value = false // Close dialog after successful update
    selectedTask.value = null // Clear selected task
    $q.notify({
      type: 'positive',
      message: 'Task updated successfully!',
      position: 'top'
    })
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Error updating task',
      position: 'top'
    })
    console.error('Error updating task:', error)
  }
}

onMounted(async () => {
  await tasksStore.fetchTasks()
})

const toggleTaskStatus = async (task) => {
  try {
    const newStatus = !task.completed
    await tasksStore.updateTaskStatus(task.id, newStatus)
    $q.notify({
      type: 'positive',
      message: 'Task status updated!',
      position: 'top'
    })
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Error updating task status',
      position: 'top'
    })
    console.error('Error updating task status:', error)
  }
}

const deleteTask = async (taskId) => {
  try {
    // Show confirmation dialog
    $q.dialog({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this task?',
      cancel: true,
      persistent: true
    }).onOk(async () => {
      await tasksStore.deleteTask(taskId)
      $q.notify({
        type: 'positive',
        message: 'Task deleted successfully!',
        position: 'top'
      })
    })
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Error deleting task',
      position: 'top'
    })
    console.error('Error deleting task:', error)
  }
=======
=======
import { onMounted } from 'vue'
import { useTasksStore } from 'src/stores/tasks'
>>>>>>> f09927c (Implement task management with add and fetch functionality, including validation and notifications)
=======
import { useQuasar } from 'quasar'
>>>>>>> 736c6ff (Implement task deletion functionality with notifications for success and error handling)
=======
import { useQuasar, Dialog } from 'quasar'
>>>>>>> af3de44 (Add confirmation dialog for task deletion and integrate Dialog plugin)

const $q = useQuasar()
$q.dialog = Dialog.create

const tasksStore = useTasksStore()

onMounted(async () => {
  await tasksStore.fetchTasks()
})

const toggleTask = (task) => {
  // TODO: Implement API call
  console.log('Toggle task:', task.id)
}

<<<<<<< HEAD
const deleteTask = (taskId) => {
  // TODO: Implement API call
  console.log('Delete task:', taskId)
>>>>>>> d520633 (Add task management components and layout updates)
=======
const deleteTask = async (taskId) => {
  try {
    // Show confirmation dialog
    $q.dialog({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this task?',
      cancel: true,
      persistent: true
    }).onOk(async () => {
      await tasksStore.deleteTask(taskId)
      $q.notify({
        type: 'positive',
        message: 'Task deleted successfully!',
        position: 'top'
      })
    })
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Error deleting task',
      position: 'top'
    })
    console.error('Error deleting task:', error)
  }
>>>>>>> 736c6ff (Implement task deletion functionality with notifications for success and error handling)
}
</script>
