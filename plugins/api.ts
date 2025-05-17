/**
 * api.ts Nuxt plugin
 * ------------------
 * Provides the $tasksApi object for interacting with the remote tasks API.
 * Handles authentication and all CRUD operations for tasks.
 * Injects $tasksApi into the Nuxt app context.
 */
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBaseUrl
  const authToken = config.public.apiToken

  const tasksApi = {
    // Get all tasks
    getAll: async () =>
      await $fetch("tasks", {
        baseURL,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        params: {
          token: authToken,
        },
      }),

    // Get a task by id
    getOne: async (id: number) =>
      (await $fetch(`tasks/${id}`, {
        baseURL,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        params: {
          token: authToken,
        },
      }) as unknown as [0])[0],
      
    // Create a new task
    create: async (data: any) =>
      await $fetch("tasks", {
        method: "POST",
        baseURL,
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          ...data,
          is_completed: data.is_completed ? "1" : "0",
          token: authToken,
        }).toString(),
      }),

    // Update existing task
    update: async (id: number, data: any) =>
      await $fetch(`tasks/${id}`, {
        method: "PUT",
        baseURL,
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          ...data,
          is_completed: data.is_completed ? "1" : "0",
          token: authToken,
        }).toString(),
      }),

    // Delete a task
    delete: async (id: number) =>
      await $fetch(`tasks/${id}`, {
        method: "DELETE",
        baseURL,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        params: {
          token: authToken,
        },
      }),
  };

  return {
    provide: {
      tasksApi,
    },
  };
});
