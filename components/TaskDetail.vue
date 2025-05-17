<!--
  TaskDetail.vue
  ---------------
  Shows detailed information about a single task.
  Props:
    - taskId: number - the id of the task to display
  Emits:
    - close: when the detail dialog is closed
    - updated: when the task is updated
-->
<template>
    <v-card class="py-4">
        <!-- ===== HEADER & ACTIONS SECTION ===== -->
        <v-card-actions class="pr-9 flex-wrap">
            <v-btn icon @click="$emit('close')">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-card-title class="headline d-flex align-center gap-4 text-h5 text-wrap">
                Detalles de la Tarea
                <v-spacer />
            </v-card-title>
            <v-spacer />
            <v-btn color="primary" :to="`/tasks/${taskId}`">Editar</v-btn>
        </v-card-actions>
        <!-- ===== END HEADER & ACTIONS SECTION ===== -->

        <!-- ===== LOADING SPINNER SECTION ===== -->
        <div v-if="loading" class="flex justify-center align-center col w-100">
            <v-progress-circular indeterminate color="primary" class="my-8" />
        </div>
        <!-- ===== END LOADING SPINNER SECTION ===== -->

        <!-- ===== TASK DETAILS LIST SECTION ===== -->
        <v-card-text v-else>
            <v-list class="rounded-lg">
                <v-list-item>
                    <v-list-item-title>Título</v-list-item-title>
                    <v-list-item-subtitle style="display: inline-block;">{{ task?.title }}</v-list-item-subtitle>
                    <template v-slot:append>
                        <v-chip :color="task?.is_completed ? 'success' : 'warning'" dark>
                            {{ task?.is_completed ? 'Completada' : 'Pendiente' }}
                        </v-chip>
                    </template>
                </v-list-item>

                <v-divider />

                <v-list-item v-if="task?.due_date">
                    <v-list-item-title>Fecha límite</v-list-item-title>
                    <v-list-item-subtitle>
                        {{ formatDate(task?.due_date) }}
                    </v-list-item-subtitle>
                </v-list-item>

                <v-divider v-if="task?.due_date" />

                <v-list-item v-if="task?.description">
                    <v-list-item-title>Descripción</v-list-item-title>
                    <v-list-item-subtitle style="display: inline-block;">
                        {{ task?.description }}
                    </v-list-item-subtitle>
                </v-list-item>

                <v-divider v-if="task?.description" />

                <v-list-item v-if="task?.comments">
                    <v-list-item-title>Comentarios</v-list-item-title>
                    <v-list-item-subtitle style="display: inline-block;">
                        {{ task?.comments }}
                    </v-list-item-subtitle>
                </v-list-item>

                <v-divider v-if="task?.comments" />

                <v-list-item v-if="task?.tags">
                    <v-list-item-title>Tags</v-list-item-title>
                    <v-list-item-subtitle class="d-flex flex-wrap pt-2">
                        <v-chip v-for="tag in task?.tags?.split(',')?.filter((t) => t != '')" :key="tag" small
                            class="mr-2 mt-2">
                            {{ tag }}
                        </v-chip>
                    </v-list-item-subtitle>
                </v-list-item>
            </v-list>
        </v-card-text>
        <!-- ===== END TASK DETAILS LIST SECTION ===== -->

    </v-card>
</template>

<script setup lang="ts">
import { TaskDetail } from '~/entities/TaskDetail.entity'
import { formatDate } from '~/composables/useDateUtils'

const props = defineProps({
    taskId: {
        type: Number,
        required: true,
    },
})

const { taskId } = props

const loading = ref(true)
const task = ref<TaskDetail | null>(null)

onMounted(async () => {
    if (taskId == 0) return
    loading.value = true
    const { $tasksApi } = useNuxtApp()
    const response = await $tasksApi.getOne(taskId)
    task.value = TaskDetail.fromJson(response)
    loading.value = false
})
</script>