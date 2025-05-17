# Nuxt Task Manager

_A technical test project built with Nuxt 3, Pinia, Vuetify, and TypeScript. This app demonstrates best practices in modular architecture, state management, and reusable logic with composables._

## Table of Contents

- [Features](#features)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables)
- [How to Run](#how-to-run)
- [Testing](#testing)
- [Dependencies](#dependencies)
- [Architecture & Patterns](#architecture--patterns)
- [About](#about)

## Features

- Task CRUD (Create, Read, Update, Delete)
- Optimistic UI updates
- Modular state management with Pinia
- Reusable composables for forms, dialogs, and utilities
- Typed entities and DTOs
- Responsive UI with Vuetify and TailwindCSS

## Folder Structure

```bash
components/      # Vue components (TaskList, TaskForm, etc)
composables/     # Reusable logic (useDialog, useDateUtils, etc)
entities/        # Task and TaskDetail models
pages/           # Nuxt pages (routing)
plugins/         # Nuxt/Vuetify/API plugins
stores/          # Pinia stores (tasks)
public/          # Static assets
```

## Environment Variables

This project uses environment variables for API configuration. To set them up:

1. Copy `.env.example` to `.env` in the project root:

   ```bash
   cp .env.example .env
   ```

2. Fill in the required variables in `.env`:
   - `NUXT_API_BASE_URL` – The base URL for the tasks API
   - `NUXT_API_TOKEN` – The authentication token for the API

## How to Run

1. **Install dependencies:**

   ```bash
   npm install
   # or yarn install
   ```

2. **Start development server:**

   ```bash
   npm run dev
   # or yarn dev
   ```

3. **Build for production:**

   ```bash
   npm run build
   npm run preview
   ```

## Testing

This project uses [Vitest](https://vitest.dev/) and [Vue Test Utils](https://test-utils.vuejs.org/) for unit testing.

### How to run tests

1. **Install dev dependencies** (if you haven't already):

   ```bash
   npm install
   ```

2. **Run all tests:**

   ```bash
   npm run test
   ```

   Or, for interactive mode:

   ```bash
   npm run test:ui
   ```

### Test coverage

- **Composables:** Example test for date utilities.
- **Store:** Example test for adding and deleting tasks.
- **Component:** Example test for rendering the task list and loading spinner.

> **Note:** Some Vuetify components are stubbed in tests for compatibility.

## Dependencies

- [Nuxt 3](https://nuxt.com/)
- [Pinia](https://pinia.vuejs.org/)
- [Vuetify](https://vuetifyjs.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

## Architecture & Patterns

- **Pinia** for state management (stores/tasks.ts)
- **Composables** for reusable logic (composables/)
- **DTOs** for API payloads (entities/TaskPayload.dto.ts)
- **Adapter** pattern to transform API responses into domain entities (entities/Task.entity.ts)
- **Builder** pattern in DTOs to construct complex objects step by step with a fluent interface (e.g., TaskPayloadDTO)
- **Entities** for domain models (entities/Task.entity.ts, TaskDetail.entity.ts)
- **Optimistic UI** for better user experience

## About

_This project was created as a technical test to demonstrate clean code, modularity, and best practices in Nuxt 3._
