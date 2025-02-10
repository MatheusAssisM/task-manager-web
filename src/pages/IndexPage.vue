<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <q-card>
<<<<<<< HEAD
<<<<<<< HEAD
          <q-card-section class="row items-center">
=======
          <q-card-section>
>>>>>>> d520633 (Add task management components and layout updates)
=======
          <q-card-section class="row items-center">
>>>>>>> bca68bd (Restrict header visibility to authenticated users and redirect unauthenticated access to login)
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> bca68bd (Restrict header visibility to authenticated users and redirect unauthenticated access to login)
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
<<<<<<< HEAD
=======
import TaskList from 'components/TaskList.vue'
>>>>>>> d520633 (Add task management components and layout updates)
=======
>>>>>>> bca68bd (Restrict header visibility to authenticated users and redirect unauthenticated access to login)
</script>
