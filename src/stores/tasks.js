import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: []
  }),
  
  actions: {
    async addTask(task) {
      const response = await api.post('/tasks', task)
      this.tasks.push(response.data)
      return response.data
    },

    async fetchTasks() {
      const response = await api.get('/tasks/user/tasks')
      this.tasks = response.data
    },

    async deleteTask(taskId) {
      await api.delete(`/tasks/${taskId}`)
      this.tasks = this.tasks.filter(task => task.id !== taskId)
    },

    async updateTaskStatus(taskId, status) {
      const response = await api.patch(`/tasks/${taskId}/status`, { completed: status })
      const taskIndex = this.tasks.findIndex(task => task.id === taskId)
      if (taskIndex !== -1) {
        this.tasks[taskIndex].completed = status
      }
      return response.data
    }
  }
})
