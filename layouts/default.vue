<template>
  <v-app>
    <v-app-bar app color="primary" dark class="px-4 w-100 h-20 d-flex justify-center">
      <v-toolbar-title class="text-h5">Gestor de Tareas</v-toolbar-title>
      <v-toolbar-items class="flex justify-center align-center">
        <v-btn to="/tasks" text class="mr-2 rounded-lg">Lista</v-btn>
        <v-btn to="/tasks/add_task" text class="rounded-lg">Nueva Tarea</v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-main class="mt-10">
      <NuxtPage />
    </v-main>
  </v-app>
</template>