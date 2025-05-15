<template>
    <v-card>
        <v-card-title class="headline">
            Detalles de la Tarea
            <v-spacer />
            <v-btn icon @click="$emit('close')">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-card-title>

        <v-card-text>
            <v-list>
                <v-list-item>
                    <v-list-item-title>Título</v-list-item-title>
                    <v-list-item-subtitle>{{ task.title }}</v-list-item-subtitle>
                    <template v-slot:append>
                        <v-chip :color="task.is_completed ? 'success' : 'warning'" dark>
                            {{ task.is_completed ? 'Completada' : 'Pendiente' }}
                        </v-chip>
                    </template>
                </v-list-item>

                <v-divider />

                <v-list-item v-if="task.due_date">
                    <v-list-item-title>Fecha límite</v-list-item-title>
                    <v-list-item-subtitle>
                        {{ formatDate(task.due_date) }}
                    </v-list-item-subtitle>
                </v-list-item>

                <v-divider v-if="task.due_date" />

                <v-list-item v-if="task.description">
                    <v-list-item-title>Descripción</v-list-item-title>
                    <v-list-item-subtitle>
                        {{ task.description }}
                    </v-list-item-subtitle>
                </v-list-item>

                <v-divider v-if="task.description" />

                <v-list-item v-if="task.comments">
                    <v-list-item-title>Comentarios</v-list-item-title>
                    <v-list-item-subtitle>
                        {{ task.comments }}
                    </v-list-item-subtitle>
                </v-list-item>

                <v-divider v-if="task.comments" />

                <v-list-item v-if="task.tags">
                    <v-list-item-title>Tags</v-list-item-title>
                    <v-list-item-subtitle>
                        <v-chip v-for="tag in task.tags.split(',')" :key="tag" small class="mr-2">
                            {{ tag }}
                        </v-chip>
                    </v-list-item-subtitle>
                </v-list-item>
            </v-list>
        </v-card-text>

        <v-card-actions>
            <v-spacer />
            <v-btn color="primary" @click="$emit('edit')">Editar</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
defineProps({
    task: {
        type: Object,
        required: true,
    },
})

const formatDate = (date) => {
    if (!date) return ''
    return new Date(date).toLocaleDateString()
}
</script>