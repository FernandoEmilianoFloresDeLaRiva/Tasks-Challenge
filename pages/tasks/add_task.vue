<!--
  tasks/add_task.vue
  ------------------
  Page for creating a new task. Shows the TaskForm component.
-->
<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8" offset-md="2">
        <TaskForm @created="goToList" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
const router = useRouter()
function goToList() {
  router.push('/tasks')
}
</script> 