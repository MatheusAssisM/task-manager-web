import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: []
  }),
  
  actions: {
    async addTask(task) {
      try {
        const response = await api.post('/tasks', task)
        await this.fetchTasks() // Refresh tasks after adding
        return response.data
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to create task')
      }
    },

    async fetchTasks() {
      try {
        const response = await api.get('/tasks')
        this.tasks = response.data.tasks || [] // API returns { tasks: [] }
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch tasks')
      }
    },

    async deleteTask(taskId) {
      try {
        await api.delete(`/tasks/${taskId}`)
        this.tasks = this.tasks.filter(task => task.id !== taskId)
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to delete task')
      }
    },

    async updateTaskStatus(taskId, status) {
      try {
        const response = await api.patch(`/tasks/${taskId}/status`, { completed: status })
        const taskIndex = this.tasks.findIndex(task => task.id === taskId)
        if (taskIndex !== -1) {
          this.tasks[taskIndex].completed = status
        }
        return response.data
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to update task status')
      }
    },

    async updateTask(taskId, updatedTask) {
      try {
        const response = await api.put(`/tasks/${taskId}`, updatedTask)
        const taskIndex = this.tasks.findIndex(task => task.id === taskId)
        if (taskIndex !== -1) {
          // Update the task with response data or fallback to sent data
          this.tasks[taskIndex] = {
            ...this.tasks[taskIndex],
            ...updatedTask
          }
        }
        return response.data
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to update task')
      }
    }
  }
})
