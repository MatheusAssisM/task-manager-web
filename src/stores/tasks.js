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
<<<<<<< HEAD
      const response = await api.get('/tasks')
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
    },

    async updateTask(taskId, updatedTask) {
      const response = await api.put(`/tasks/${taskId}`, updatedTask)
      const taskIndex = this.tasks.findIndex(task => task.id === taskId)
      if (taskIndex !== -1) {
        // Update the task directly in the array
        const updatedTaskData = {
          ...this.tasks[taskIndex],
          title: response.data.title,
          description: response.data.description
        }
        this.tasks.splice(taskIndex, 1, updatedTaskData)
      }
      return response.data
=======
      const response = await api.get('/tasks/user/tasks')
      this.tasks = response.data
<<<<<<< HEAD
>>>>>>> f09927c (Implement task management with add and fetch functionality, including validation and notifications)
=======
    },

    async deleteTask(taskId) {
      await api.delete(`/tasks/${taskId}`)
      this.tasks = this.tasks.filter(task => task.id !== taskId)
>>>>>>> 736c6ff (Implement task deletion functionality with notifications for success and error handling)
    }
  }
})
