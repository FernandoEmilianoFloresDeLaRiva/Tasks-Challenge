<template>
    <v-alert v-if="successMessage" type="success" class="mb-4">
        {{ successMessage }}
    </v-alert>
    <v-alert v-if="error" type="error" class="mb-4">
        {{ error }}
    </v-alert>
    <v-card variant="outlined" class="my-6 pt-4 px-4 elevation-1 rounded-lg border-none">
        <v-card-title class="text-h6 font-weight-bold px-0 text-center">
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
                <v-row>
                    <v-col cols="12" md="6">
                        <v-btn color="primary" type="submit" :loading="loading" class="w-100"
                            :disabled="form.title === ''">
                            {{ editing ? 'Actualizar' : 'Crear' }}
                        </v-btn>
                    </v-col>
                    <v-col cols="12" md="6" v-if="editing">
                        <v-btn color="grey" @click="cancelEdit" class="w-100">
                            Cancelar
                        </v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useTasksStore } from '~/stores/tasks'
import { useTaskForm } from '~/composables/useTaskForm'
import { TaskDetail } from '~/entities/TaskDetail.entity'

const props = defineProps({
    task: {
        type: TaskDetail,
        default: null
    },
})

const emit = defineEmits(['created', 'updated', 'cancel-edit'])

const tasksStore = useTasksStore()
const { loading, successMessage, error } = storeToRefs(tasksStore)
const { createTask, updateTask } = tasksStore

const { form, editing, resetForm } = useTaskForm(props?.task)

const submit = async () => {
    try {
        if (editing.value) {
            await updateTask(props.task.id, form.value)
            setTimeout(() => {
                emit('updated')
            }, 1500)
        } else {
            console.log(form.value)
            await createTask(form.value)
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