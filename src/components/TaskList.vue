<template>
  <div class="task-list">
    <q-list separator>
      <q-item v-for="task in tasks" :key="task.id" class="q-my-sm" clickable v-ripple>
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
import { ref } from 'vue'

const tasks = ref([
  { id: 1, title: 'Complete project setup', description: 'Initial project configuration', completed: false },
  { id: 2, title: 'Add authentication', description: 'Implement user login/logout', completed: true },
])

const toggleTask = (task) => {
  // TODO: Implement API call
  console.log('Toggle task:', task.id)
}

const deleteTask = (taskId) => {
  // TODO: Implement API call
  console.log('Delete task:', taskId)
}
</script>
