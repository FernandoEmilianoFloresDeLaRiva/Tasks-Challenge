export default defineNuxtPlugin(() => {
  const baseURL = "https://ecsdevapi.nextline.mx/vdev/tasks-challenge/";
  const authToken =
    "e864a0c9eda63181d7d65bc73e61e3dc6b74ef9b82f7049f1fc7d9fc8f29706025bd271d1ee1822b15d654a84e1a0997b973a46f923cc9977b3fcbb064179ecd";

  const tasksApi = {
    // Obtener todas las tareas
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

    // Obtener una tarea por id
    getOne: async (id: number) =>
      await $fetch(`tasks/${id}`, {
        baseURL,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        params: {
          token: authToken,
        },
      }),
      
    // Crear nueva tarea
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

    // Actualizar tarea existente
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

    // Eliminar tarea
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
