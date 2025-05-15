<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8" offset-md="2">
        <v-btn color="primary" class="mb-4" to="/tasks/add_task">Nueva Tarea</v-btn>
        <TaskList :tasks="tasksStore.tasks" :loading="tasksStore.loading" @deleted="tasksStore.fetchTasks" @updated="tasksStore.fetchTasks" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
const tasksStore = useTasksStore()
onMounted(() => tasksStore.fetchTasks())
</script> 