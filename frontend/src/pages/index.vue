<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Gestor de Tareas Simple
          </h1>
          <h2 class="subtitle">
            Organiza tus proyectos y tareas de manera eficiente
          </h2>
        </div>
      </div>
    </section>
    
    <section class="section">
      <div class="container">
        <div class="columns">
          <!-- Sidebar con proyectos -->
          <div class="column is-3">
            <ProjectList 
              :projects="projectStore.projects" 
              :currentProject="projectStore.currentProject"
              @select-project="handleSelectProject" 
            />
          </div>
          
          <!-- Contenido principal -->
          <div class="column is-9">
            <div v-if="isLoading" class="notification is-info is-light">
              <div class="is-flex is-justify-content-center">
                <button class="button is-loading is-white">Cargando</button>
              </div>
            </div>
            
            <div v-else-if="error" class="notification is-danger is-light">
              <button class="delete" @click="clearError"></button>
              {{ error }}
            </div>
            
            <template v-else>
              <TaskList 
                :tasks="taskStore.tasks" 
                :currentProject="projectStore.currentProject"
                @update-task-status="handleUpdateTaskStatus" 
              />
              
              <TaskForm 
                :currentProject="projectStore.currentProject"
                @create-task="handleCreateTask" 
              />
            </template>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useProjectStore } from '@/stores/project';
import { useTaskStore } from '@/stores/task';
import type { Project } from '@/types/project';
import type { CreateTaskDTO, TaskStatus } from '@/types/task';
import ProjectList from '@/components/project/ProjectList.vue';
import TaskList from '@/components/task/TaskList.vue';
import TaskForm from '@/components/task/TaskForm.vue';

const projectStore = useProjectStore();
const taskStore = useTaskStore();

// Estado para limpiar errores
const localError = ref<string | null>(null);

const isLoading = computed(() => projectStore.loading || taskStore.loading);
const error = computed(() => projectStore.error || taskStore.error || localError.value);

const clearError = () => {
  localError.value = null;
};

const route = useRoute();

onBeforeMount(async () => {
  try {
    await projectStore.fetchProjects();
    console.log('Proyectos cargados:', projectStore.projects);
  } catch (err) {
    localError.value = 'Error al cargar los proyectos iniciales';
    console.error(err);
  }
});

// watch(() => route.path, async () => {
//   await projectStore.fetchProjects();
//   console.log('Proyectos recargados por cambio de ruta');
// });

const handleSelectProject = async (project: Project) => {
  try {
    projectStore.setCurrentProject(project);
    await taskStore.fetchTasksByProject(project.id);
  } catch (err) {
    localError.value = `Error al cargar las tareas del proyecto ${project.name}`;
    console.error(err);
  }
};

const handleUpdateTaskStatus = async (taskId: number, status: TaskStatus) => {
  try {
    await taskStore.updateTaskStatus(taskId, status);
  } catch (err) {
    localError.value = 'Error al actualizar el estado de la tarea';
    console.error(err);
  }
};

const handleCreateTask = async (taskData: CreateTaskDTO) => {
  try {
    await taskStore.createTask(taskData);
  } catch (err) {
    localError.value = 'Error al crear la nueva tarea';
    console.error(err);
  }
};
</script>