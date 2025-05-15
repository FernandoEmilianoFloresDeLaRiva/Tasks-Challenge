<template>
    <div>
        <v-progress-circular
            v-if="loading"
            indeterminate
            color="primary"
            class="my-8 d-flex justify-center"
        />
        <v-list v-else lines="two">
            <template v-for="(task, index) in tasks" :key="task.id">
                <v-list-item @click="openTask(task)">
                    <template v-slot:prepend>
                        <v-checkbox v-model="task.is_completed" @click.stop="toggleTaskCompletion(task)"
                            color="primary" />
                    </template>

                    <v-list-item-title :class="{ 'text-decoration-line-through': task.is_completed }">
                        {{ task.title }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        {{ formatDate(task.due_date) }}
                        <v-chip v-for="tag in task.tags?.split(',')" :key="tag" small class="ml-2">
                            {{ tag }}
                        </v-chip>
                    </v-list-item-subtitle>

                    <template v-slot:append>
                        <v-btn icon :to="`/tasks/${task.id}`" @click.stop>
                            <v-icon color="grey">mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn icon @click.stop="deleteTask(task.id)">
                            <v-icon color="grey">mdi-delete</v-icon>
                        </v-btn>
                    </template>
                </v-list-item>

                <v-divider v-if="index < tasks.length - 1" />
            </template>

            <v-list-item v-if="tasks.length === 0">
                <v-list-item-title class="text-center grey--text">
                    No hay tareas para mostrar
                </v-list-item-title>
            </v-list-item>
        </v-list>

        <v-dialog v-model="dialog" max-width="600px" v-if="selectedTask">
            <TaskDetail :task="selectedTask" @close="dialog = false" @updated="$emit('updated')" />
        </v-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTasksStore } from '~/stores/tasks'
import { Task } from '~/entities/Task.entity'

const props = defineProps({
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

const dialog = ref(false)
const selectedTask = ref(null)

const formatDate = (date) => {
    if (!date) return ''
    return new Date(date).toLocaleDateString()
}

const openTask = (task) => {
    selectedTask.value = task
    dialog.value = true
}

const deleteTask = async (taskId) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
        try {
            await tasksStore.deleteTask(taskId)
            emit('deleted')
        } catch (error) {
            console.error(error)
        }
    }
}

const toggleTaskCompletion = async (task) => {
    try {
        await updateTask(task.id, {
            ...task,
            is_completed: !task.is_completed,
        })
        emit('updated')
    } catch (error) {
        console.error(error)
    }
}
</script>