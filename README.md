# Gestor de Tareas Simple

Aplicación web full stack Node.js/Nuxt.js para la gestión de proyectos y tareas.

## Estructura del Proyecto

El proyecto está organizado como un monorepo con dos directorios principales:

- `backend/`: API REST desarrollada con Node.js y Express, siguiendo la arquitectura hexagonal
- `frontend/`: Interfaz de usuario desarrollada con Nuxt.js (Vue.js) y Bulma

## Requisitos Previos

- Node.js (v16 o superior)
- npm

## Instalación

### Backend

```bash
# Entrar en el directorio del backend
cd backend

# Instalar dependencias
npm install
```

### Frontend

```bash
# Entrar en el directorio del frontend
cd frontend

# Instalar dependencias
npm install
```

## Ejecución en entorno de desarrollo

### Backend

```bash
# Desde el directorio del backend
npm run dev
```

El servidor backend estará disponible en `http://localhost:3100`.

### Frontend

```bash
# Desde el directorio del frontend
npm run dev
```

La aplicación frontend estará disponible en `http://localhost:3001`.

## Características

- Visualización de proyectos
- Visualización de tareas por proyecto
- Creación de nuevas tareas
- Actualización del estado de las tareas
- Gestión de etiquetas para las tareas
- API para encontrar tareas con etiquetas compartidas entre proyectos

## Tecnologías utilizadas

### Backend
- Node.js
- Express
- Arquitectura Hexagonal (Puertos y Adaptadores)

### Frontend
- Nuxt.js (Vue 3)
- Pinia para la gestión del estado
- Bulma
- Composition API

## API Endpoints

- `GET /api/projects` - Obtener todos los proyectos
- `GET /api/projects/:projectId/tasks` - Obtener tareas de un proyecto específico
- `POST /api/tasks` - Crear una nueva tarea
- `PATCH /api/tasks/:taskId` - Actualizar el estado de una tarea
- `GET /api/tasks/with-shared-tags?projectAId=ID1&projectBId=ID2` - Obtener tareas con etiquetas compartidas entre dos proyectos