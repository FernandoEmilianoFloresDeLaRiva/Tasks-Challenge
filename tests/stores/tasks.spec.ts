import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useTasksStore } from '../../stores/tasks'

// Mock Nuxt's useNuxtApp and $tasksApi
vi.stubGlobal('useNuxtApp', () => ({
  $tasksApi: {
    create: async (data: any) => ({ task: { ...data, id: 123 } }),
    delete: async (id: number) => ({}),
    getAll: async () => [],
    update: async (id: number, data: any) => ({ task: { ...data, id } }),
  }
}))

describe('tasks store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('can add a task', async () => {
    const store = useTasksStore()
    const taskData = { title: 'Test', is_completed: false, due_date: '2024-01-01' }
    const task = await store.createTask(taskData as any)
    expect(store.tasks.length).toBe(1)
    expect(task?.title).toBe('Test')
  })

  it('can delete a task', async () => {
    const store = useTasksStore()
    // Add a task first
    await store.createTask({ title: 'To Delete', is_completed: false, due_date: '2024-01-01' } as any)
    expect(store.tasks.length).toBe(1)
    await store.deleteTask(store.tasks[0].id)
    expect(store.tasks.length).toBe(0)
  })
}) 