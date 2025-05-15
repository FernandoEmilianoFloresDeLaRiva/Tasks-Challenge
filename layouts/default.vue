<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Gestión de Tareas</v-toolbar-title>
      <v-spacer />
      <v-btn to="/tasks" text>Lista</v-btn>
      <v-btn to="/tasks/add_task" text>Nueva Tarea</v-btn>
    </v-app-bar>
    <v-main>
      <NuxtPage />
    </v-main>
  </v-app>
</template> 