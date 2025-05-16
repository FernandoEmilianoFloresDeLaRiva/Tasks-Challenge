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
const route = useRoute()
const router = useRouter()
const task = ref<TaskDetail | null>(null)

onMounted(async () => {
  const { $tasksApi } = useNuxtApp()
  const response = await $tasksApi.getOne(parseInt(route.params.id))
  task.value = TaskDetail.fromJson(response)
})  

function goToList() {
  router.push('/tasks')
}
</script> 