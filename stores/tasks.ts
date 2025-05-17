import { defineStore } from "pinia";
import { Task } from "~/entities/Task.entity";
import { TaskDetail } from "~/entities/TaskDetail.entity";
import type { TaskPayloadDTO } from "~/entities/TaskPayload.dto";

export const useTasksStore = defineStore("tasks", {
  state: () => ({
    tasks: [] as Task[],
    loading: false,
    error: null as string | null,
    successMessage: null as string | null,
  }),
  actions: {
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
    async createTask(taskData: TaskPayloadDTO): Promise<Task | undefined> {
      this.loading = true;
      // Carga optimista
      const tempId = Date.now();
      const optimisticTask = { ...taskData, id: tempId } as Task;
      this.tasks.unshift(optimisticTask);
      try {
        const { $tasksApi } = useNuxtApp();
        const response = await $tasksApi.create(taskData);
        if (hasTaskProp(response)) {
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
        // Revertir si falla
        this.tasks = this.tasks.filter((t) => t.id !== tempId);
        this.error = "Error al crear la tarea";
        console.error(err);
        throw err;
      } finally {
        this.loading = false;
      }
    },
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
    async deleteTask(id: number): Promise<void> {
      this.loading = true;
      // Carga optimista
      const prevTasks = [...this.tasks];
      this.tasks = this.tasks.filter((t) => t.id !== id);
      try {
        const { $tasksApi } = useNuxtApp();
        await $tasksApi.delete(id);
        this.error = null;
        this.successMessage = "Tarea eliminada exitosamente";
      } catch (err) {
        // Revertir si falla
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
    completedTasks: (state) => state.tasks?.filter((t) => t.is_completed),
    pendingTasks: (state) => state.tasks?.filter((t) => !t.is_completed),
  },
});

function hasTaskProp(obj: any): obj is { task: Task } {
  return obj && typeof obj === "object" && "task" in obj;
}
