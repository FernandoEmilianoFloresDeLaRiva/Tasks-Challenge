<!--
  TaskList.vue
  -------------
  Displays a list of tasks with actions to edit, complete, or delete each task.
  Props:
    - tasks: Task[] - the list of tasks to display
    - loading: boolean - whether the list is loading
  Emits:
    - deleted: when a task is deleted
    - updated: when a task is updated (completion toggled)
-->
<template>
    <div class="flex justify-center col">
        <!-- ===== LOADING SPINNER SECTION ===== -->
        <v-progress-circular v-if="loading" indeterminate color="primary" class="my-8" />
        <!-- ===== END LOADING SPINNER SECTION ===== -->

        <!-- ===== TASK TABLE SECTION ===== -->
        <v-list v-else class="rounded-lg bg-transparent w-100">
            <template v-for="(task, index) in tasks" :key="task.id">
                <v-list-item @click="openTask(task.id)" :class="[
                    'rounded-lg mb-2 transition-all',
                    task.is_completed ? 'completed-task' : 'pending-task',
                ]" style="cursor:pointer; min-height: 64px;">
                    <!-- ===== TASK STATUS ICON SECTION ===== -->
                    <template #prepend>
                        <v-icon v-if="task.is_completed" color="success" class="mr-2"
                            @click="toggleTaskCompletion(task)">mdi-check-circle</v-icon>
                        <v-icon v-else color="warning" class="mr-2"
                            @click="toggleTaskCompletion(task)">mdi-clock-outline</v-icon>
                    </template>
                    <!-- ===== END TASK STATUS ICON SECTION ===== -->

                    <v-list-item-title class="font-weight-medium text-body-1">
                        {{ task.title }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="d-flex align-center" style="gap: 8px;">
                        <v-icon size="16" color="grey">mdi-calendar</v-icon>
                        <span>{{ formatDate(task.due_date) }}</span>
                    </v-list-item-subtitle>

                    <!-- ===== ACTION BUTTONS SECTION ===== -->
                    <template v-slot:append>
                        <div class="d-flex align-center" style="gap: 8px;">
                            <v-btn icon :to="`/tasks/${task.id}`" @click.stop size="small" variant="text">
                                <v-icon color="primary">mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn icon @click.stop="deleteTask(task.id)" size="small" variant="text">
                                <v-icon color="red">mdi-delete</v-icon>
                            </v-btn>
                        </div>
                    </template>
                    <!-- ===== END ACTION BUTTONS SECTION ===== -->
                </v-list-item>
                <v-divider v-if="index < tasks.length - 1" />
            </template>

            <v-list-item v-if="tasks.length === 0 && loading === false">
                <v-list-item-title class="text-center grey--text">
                    No hay tareas para mostrar
                </v-list-item-title>
            </v-list-item>
        </v-list>
        <!-- ===== END TASK TABLE SECTION ===== -->

        <!-- ===== TASK DETAIL DIALOG SECTION ===== -->
        <v-dialog v-model="dialog" max-width="600px" v-if="selectedTaskId">
            <TaskDetail :taskId="selectedTaskId || 0" @close="dialog = false" @updated="$emit('updated')" />
        </v-dialog>
        <!-- ===== END TASK DETAIL DIALOG SECTION ===== -->
    </div>
</template>

<script setup lang="ts">
import { useTasksStore } from '~/stores/tasks'
import { Task } from '~/entities/Task.entity'
import { formatDate } from '~/composables/useDateUtils'
import { useDialog } from '~/composables/useDialog'
import { useConfirmDialog } from '~/composables/useConfirmDialog'
import { TaskPayloadDTO } from '~/entities/TaskPayload.dto'

defineProps({
    tasks: {
        type: Array as PropType<Task[]>,
        default: () => [],
    },
    loading: {
        type: Boolean,
        default: false,
    },
})

const emit = defineEmits(['deleted', 'updated'])

const tasksStore = useTasksStore()
const { updateTask } = tasksStore

// Usar useDialog para manejar el diálogo y la tarea seleccionada
const { dialog, selectedId: selectedTaskId, open, close } = useDialog<number>()

const { confirm } = useConfirmDialog('¿Estás seguro de que quieres eliminar esta tarea?')

const openTask = (taskId: number) => {
    open(taskId)
}

const deleteTask = async (taskId: number) => {
    if (await confirm()) {
        try {
            await tasksStore.deleteTask(taskId)
            emit('deleted')
        } catch (error) {
            console.error(error)
        }
    }
}

const toggleTaskCompletion = async (task: Task) => {
    try {
        await updateTask(task.id,
            new TaskPayloadDTO()
                .setId(task.id)
                .setTitle(task.title)
                .setIsCompleted(!task.is_completed)
                .setDueDate(task.due_date)
                .build()
        )
        emit('updated')
    } catch (error) {
        console.error(error)
    }
}
</script>

<style scoped>
.completed-task {
    background: #e6f9ec !important;
    border: 1px solid #b2e5c7;
}

.pending-task {
    background: #fff !important;
    border: 1px solid #e0e0e0;
}

.v-list-item {
    transition: box-shadow 0.2s, border 0.2s;
}

.v-list-item:hover {
    box-shadow: 0 2px 12px 0 rgba(60, 60, 60, 0.08);
    border-color: #90caf9;
}
</style>