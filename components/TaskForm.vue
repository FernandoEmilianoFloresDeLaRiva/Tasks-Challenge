<template>
    <v-alert v-if="successMessage" type="success" class="mb-4">
        {{ successMessage }}
    </v-alert>
    <v-alert v-if="error" type="error" class="mb-4">
        {{ error }}
    </v-alert>
    <v-card variant="outlined" class="my-6 pt-4 px-4 elevation-1 rounded-lg border-none">
        <v-card-title class="text-h6 font-weight-bold px-0 ">
            {{ editing ? 'Editar Tarea' : 'Nueva Tarea' }}
        </v-card-title>
        <v-card-text class="px-0">
            <v-form @submit.prevent="submit">

                <v-text-field v-model="form.title" label="Título" :rules="[(v) => !!v || 'El título es requerido']"
                    required />

                <v-text-field v-model="form.due_date" label="Fecha de vencimiento" type="date" />
                <v-textarea v-model="form.description" label="Descripción" rows="1" auto-grow row-height="24" />

                <v-textarea v-model="form.comments" label="Comentarios" rows="1" auto-grow row-height="24" />

                <v-text-field v-model="form.tags" label="Tags" />
                <v-checkbox v-model="form.is_completed" label="Completada" />

                <v-btn type="submit" color="primary" :loading="loading" class="mr-4" :disabled="form.title === ''">
                    {{ editing ? 'Actualizar' : 'Guardar' }}
                </v-btn>

                <v-btn v-if="editing" @click="cancelEdit" color="secondary">
                    Cancelar
                </v-btn>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useTasksStore } from '~/stores/tasks'

const props = defineProps({
    task: {
        type: Object,
        default: null
    },
})

const emit = defineEmits(['created', 'updated', 'cancel-edit'])

const tasksStore = useTasksStore()
const { loading, successMessage, error } = storeToRefs(tasksStore)
const { createTask, updateTask } = tasksStore

const getToday = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

const form = ref({
    title: '',
    is_completed: false,
    due_date: getToday(),
    description: '',
    comments: '',
    tags: '',
})

const editing = ref(false)

const resetForm = () => {
    form.value = {
        title: '',
        is_completed: false,
        due_date: getToday(),
        description: '',
        comments: '',
        tags: '',
    }
}

watch(
    () => props.task,
    (task) => {
        if (task) {
            editing.value = true
            form.value = {
                title: task.title,
                is_completed: task.is_completed == 1 ? true : false,
                due_date: task.due_date ?? '',
                description: task.description || '',
                comments: task.comments || '',
                tags: task.tags,
            }
        } else {
            editing.value = false
            resetForm()
        }
    },
    { immediate: true }
)

const submit = async () => {
    try {
        const taskData = {
            ...form.value,
            tags: form.value.tags,
        }

        if (editing.value) {
            await updateTask(props.task.id, taskData)
            setTimeout(() => {
                emit('updated')
            }, 1500)
        } else {
            console.log(taskData)
            await createTask(taskData)
            setTimeout(() => {
                emit('created')
                resetForm()
            }, 1500)
        }
    } catch (error) {
        console.error(error)
    }
}

const cancelEdit = () => {
    emit('cancel-edit')
}
</script>