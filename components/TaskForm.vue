<template>
    <v-card variant="outlined" class="mb-6">
        <v-card-title>
            {{ editing ? 'Editar Tarea' : 'Nueva Tarea' }}
        </v-card-title>
        <v-card-text>
            <v-form @submit.prevent="submit">
                <v-text-field v-model="form.title" label="Título" :rules="[(v) => !!v || 'El título es requerido']"
                    required />

                <v-checkbox v-model="form.is_completed" label="Completada" />

                <v-text-field v-model="form.due_date" label="Fecha de vencimiento" type="date" />

                <v-textarea v-model="form.description" label="Descripción" rows="2" />

                <v-textarea v-model="form.comments" label="Comentarios" rows="2" />

                <v-text-field v-model="form.tags" label="Tags" />

                <v-btn type="submit" color="primary" :loading="loading" class="mr-4">
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
const { loading } = storeToRefs(tasksStore)
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
            emit('updated')
        } else {
            console.log(taskData)
            await createTask(taskData)
            emit('created')
            resetForm()
        }
    } catch (error) {
        console.error(error)
    }
}

const cancelEdit = () => {
    emit('cancel-edit')
}
</script>