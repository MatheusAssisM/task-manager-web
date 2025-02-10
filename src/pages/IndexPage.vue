<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <q-card>
          <q-card-section>
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
import TaskList from 'components/TaskList.vue'
</script>
