<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <q-card>
          <q-card-section class="row items-center">
            <div class="text-h6">My Tasks</div>
          </q-card-section>

          <q-card-section>
            <TaskList />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { onBeforeMount } from 'vue'
import TaskList from 'components/TaskList.vue'
import { useAuthStore } from 'src/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

onBeforeMount(() => {
  if (!authStore.isAuthenticated) {
    router.replace('/login')
  }
})
</script>
