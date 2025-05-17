<!--
  tasks/index.vue
  ---------------
  Main task list page. Shows all tasks and allows filtering, editing, and deleting.
-->
<template>
  <v-container>
    <v-row class="w-70">
      <v-col class="w-100">
        <v-btn color="primary" class="mb-4" to="/tasks/add_task">Nueva Tarea</v-btn>
        <v-col class="pa-2 elevation-1 rounded-lg" style="background: #f8fafc;">
          <v-btn-toggle v-model="filter" class="mb-4 w-100 d-flex overflow-auto" mandatory>
            <v-btn value="all" class="flex-grow-1">Ver todas</v-btn>
            <v-btn value="incomplete" class="flex-grow-1">No completadas</v-btn>
            <v-btn value="completed" class="flex-grow-1">Completadas</v-btn>
          </v-btn-toggle>
          <TaskList :tasks="filteredTasks" :loading="tasksStore.loading" @deleted="tasksStore.fetchTasks"
            @updated="tasksStore.fetchTasks" />
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useTasksStore } from '~/stores/tasks'

const tasksStore = useTasksStore()
onMounted(() => tasksStore.fetchTasks())

const filter = ref('all')
const filteredTasks = computed(() => {
  if (filter.value === 'completed') {
    return tasksStore.completedTasks
  } else if (filter.value === 'incomplete') {
    return tasksStore.pendingTasks
  }
  return tasksStore.tasks
})
</script>