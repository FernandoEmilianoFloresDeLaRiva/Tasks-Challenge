import { defineStore } from "pinia";
import { Task } from "~/entities/Task.entity";

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
        const response: any = await $tasksApi.getAll();
        this.tasks = response.map((task: any) => Task.fromJson(task));
        this.error = null;
        this.successMessage = null;
      } catch (err) {
        this.error = "Error al cargar las tareas";
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    async createTask(taskData: any) {
      this.loading = true;
      try {
        const { $tasksApi } = useNuxtApp();
        const response: any = await $tasksApi.create({
          ...taskData,
          is_completed: taskData.is_completed ? 1 : 0,
        });
        this.tasks?.unshift(response.task);
        this.error = null;
        this.successMessage = "Tarea creada exitosamente";
        return response.task;
      } catch (err) {
        this.error = "Error al crear la tarea";
        console.error(err);
        throw err;
      } finally {
        this.loading = false;
      }
    },
    async updateTask(id: number, taskData: any) {
      this.loading = true;
      try {
        const { $tasksApi } = useNuxtApp();
        const response: any = await $tasksApi.update(id, {
          ...taskData,
          is_completed: taskData.is_completed ? 1 : 0,
        });
        this.error = null;
        this.successMessage = "Tarea actualizada exitosamente";
        return response.task;
      } catch (err) {
        this.error = "Error al actualizar la tarea";
        console.error(err);
        throw err;
      } finally {
        this.loading = false;
      }
    },
    async deleteTask(id: number) {
      this.loading = true;
      try {
        const { $tasksApi } = useNuxtApp();
        await $tasksApi.delete(id);
        this.tasks = this.tasks?.filter((t) => t.id !== id);
        this.error = null;
        this.successMessage = "Tarea eliminada exitosamente";
      } catch (err) {
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
