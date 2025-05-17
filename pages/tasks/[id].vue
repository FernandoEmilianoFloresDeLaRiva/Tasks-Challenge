<!--
  tasks/[id].vue
  --------------
  Page for editing an existing task. Loads the task and shows the TaskForm component.
-->
<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8" offset-md="2">
        <TaskForm v-if="task" :task="task" @updated="goToList" @cancel-edit="goToList" />
        <v-progress-circular v-else indeterminate color="primary" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { TaskDetail } from '~/entities/TaskDetail.entity'
import { useHead } from '#imports'

useHead({
  title: 'Task Manager | Edit Task',
  meta: [
    { name: 'description', content: 'Edit your task details and stay on top of your work.' }
  ]
})

const route = useRoute()
const router = useRouter()
const task = ref<TaskDetail | null>(null)

onMounted(async () => {
  const { $tasksApi } = useNuxtApp()
  const idParam = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
  const response = await $tasksApi.getOne(parseInt(idParam))
  task.value = TaskDetail.fromJson(response)
})

function goToList() {
  router.push('/tasks')
}
</script>