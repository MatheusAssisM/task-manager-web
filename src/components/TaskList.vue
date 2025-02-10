<template>
  <div class="task-list">
    <q-list separator>
      <q-item v-for="task in tasksStore.tasks" :key="task.id" class="q-my-sm" clickable v-ripple>
        <q-item-section side>
          <q-checkbox v-model="task.completed" @update:model-value="toggleTask(task)" />
        </q-item-section>

        <q-item-section>
          <q-item-label :class="{ 'text-strike': task.completed }">
            {{ task.title }}
          </q-item-label>
          <q-item-label caption>
            {{ task.description }}
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-btn flat round color="negative" icon="delete" @click="deleteTask(task.id)" />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useTasksStore } from 'src/stores/tasks'
import { useQuasar, Dialog } from 'quasar'

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
}
</script>
