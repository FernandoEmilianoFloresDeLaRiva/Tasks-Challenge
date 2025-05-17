import { defineStore } from "pinia";
import { Task } from "~/entities/Task.entity";
import type { TaskPayloadDTO } from "~/entities/TaskPayload.dto";

/**
 * Pinia store for managing tasks state and actions.
 * Handles fetching, creating, updating, and deleting tasks with optimistic UI updates.
 */
export const useTasksStore = defineStore("tasks", {
  state: () => ({
    tasks: [] as Task[],
    loading: false,
    error: null as string | null,
    successMessage: null as string | null,
  }),
  actions: {
    /**
     * Fetch all tasks from the API and update the state.
     * Resets error and success messages.
     */
    async fetchTasks() {
      this.loading = true;
      try {
        const { $tasksApi } = useNuxtApp();
        const response = await $tasksApi.getAll();
        if (Array.isArray(response)) {
          this.tasks = response.map((task: any) => Task.fromJson(task));
        } else {
          this.tasks = [];
        }
        this.error = null;
        this.successMessage = null;
      } catch (err) {
        this.error = "Error al cargar las tareas";
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    
    /**
     * Create a new task (optimistic UI).
     * Adds a temporary task to the state before the API call resolves.
     * Replaces it with the real task on success, or removes it on error.
     * @param taskData Task payload DTO
     * @returns The created Task, or undefined on error
     */
    async createTask(taskData: TaskPayloadDTO): Promise<Task | undefined> {
      this.loading = true;
      // Optimistic UI: add a temporary task
      const tempId = Date.now();
      const optimisticTask = { ...taskData, id: tempId } as Task;
      this.tasks.unshift(optimisticTask);
      try {
        const { $tasksApi } = useNuxtApp();
        const response = await $tasksApi.create(taskData);
        if (hasTaskProp(response)) {
          // Replace the optimistic task with the real one
          this.tasks = this.tasks.map((t) =>
            t.id === tempId ? response.task : t
          );
          this.error = null;
          this.successMessage = "Tarea creada exitosamente";
          return response.task;
        } else {
          throw new Error("Respuesta inesperada de la API");
        }
      } catch (err) {
        // Revert optimistic update on error
        this.tasks = this.tasks.filter((t) => t.id !== tempId);
        this.error = "Error al crear la tarea";
        console.error(err);
        throw err;
      } finally {
        this.loading = false;
      }
    },
    /**
     * Update an existing task by id.
     * Updates the task in the state on success.
     * @param id Task id
     * @param taskData Task payload DTO
     * @returns The updated Task, or undefined on error
     */
    async updateTask(
      id: number,
      taskData: TaskPayloadDTO
    ): Promise<Task | undefined> {
      this.loading = true;
      try {
        const { $tasksApi } = useNuxtApp();
        const response = await $tasksApi.update(id, taskData);
        if (hasTaskProp(response)) {
          this.tasks = this.tasks.map((t) => (t.id === id ? response.task : t));
          this.error = null;
          this.successMessage = "Tarea actualizada exitosamente";
          return response.task;
        } else {
          throw new Error("Respuesta inesperada de la API");
        }
      } catch (err) {
        this.error = "Error al actualizar la tarea";
        console.error(err);
        throw err;
      } finally {
        this.loading = false;
      }
    },
    /**
     * Delete a task by id (optimistic UI).
     * Removes the task from the state before the API call resolves.
     * Reverts the change if the API call fails.
     * @param id Task id
     */
    async deleteTask(id: number): Promise<void> {
      this.loading = true;
      // Optimistic UI: remove the task immediately
      const prevTasks = [...this.tasks];
      this.tasks = this.tasks.filter((t) => t.id !== id);
      try {
        const { $tasksApi } = useNuxtApp();
        await $tasksApi.delete(id);
        this.error = null;
        this.successMessage = "Tarea eliminada exitosamente";
      } catch (err) {
        // Revert optimistic update on error
        this.tasks = prevTasks;
        this.error = "Error al eliminar la tarea";
        console.error(err);
        throw err;
      } finally {
        this.loading = false;
      }
    },
  },
  getters: {
    /**
     * Get all completed tasks
     */
    completedTasks: (state) => state.tasks?.filter((t) => t.is_completed),
    /**
     * Get all pending (not completed) tasks
     */
    pendingTasks: (state) => state.tasks?.filter((t) => !t.is_completed),
  },
});

/**
 * Type guard to check if an object has a 'task' property (from API response)
 * @param obj Any object
 * @returns True if obj has a 'task' property
 */
function hasTaskProp(obj: any): obj is { task: Task } {
  return obj && typeof obj === "object" && "task" in obj;
}
