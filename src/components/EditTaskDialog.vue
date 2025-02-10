<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-pa-md" style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Edit Task</div>
      </q-card-section>

      <q-card-section>
        <q-input
          v-model="form.title"
          label="Title"
          :rules="[val => !!val || 'Title is required']"
          class="q-mb-md"
        />
        <q-input
          v-model="form.description"
          label="Description"
          type="textarea"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="negative" v-close-popup />
        <q-btn flat label="Save" color="primary" @click="onSubmit" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, defineEmits, defineProps, watch } from 'vue'
import { useDialogPluginComponent } from 'quasar'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update'])

const form = ref({
  title: '',
  description: ''
})

// Update form immediately when task changes
watch(() => props.task, (newTask) => {
  if (newTask) {
    form.value = {
      title: newTask.title || '',
      description: newTask.description || ''
    }
  }
}, { immediate: true })

const { dialogRef, onDialogHide } = useDialogPluginComponent()

const onSubmit = () => {
  if (!form.value.title) return // Prevent empty title submission
  
  emit('update', {
    title: form.value.title,
    description: form.value.description
  })
  dialogRef.value.hide()
}
</script>
