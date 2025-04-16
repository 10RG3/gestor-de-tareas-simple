<template>
  <div class="task-list">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          <span v-if="currentProject">Tareas de {{ currentProject.name }}</span>
          <span v-else>Selecciona un proyecto para ver sus tareas</span>
        </p>
      </header>
      <div class="card-content">
        <div v-if="tasks.length > 0">
          <TaskItem 
            v-for="task in tasks" 
            :key="task.id" 
            :task="task"
            @update-status="updateTaskStatus" 
          />
        </div>
        <div v-else-if="currentProject" class="notification is-info is-light">
          <p>No hay tareas para este proyecto.</p>
        </div>
        <div v-else class="notification is-warning is-light">
          <p>Por favor, selecciona un proyecto para ver sus tareas.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Task, TaskStatus } from '@/types/task';
import type { Project } from '@/types/project';
import TaskItem from './TaskItem.vue';

interface Props {
  tasks: Task[];
  currentProject: Project | null;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'update-task-status', taskId: number, status: TaskStatus): void
}>();

const updateTaskStatus = (taskId: number, status: TaskStatus) => {
  emit('update-task-status', taskId, status);
};
</script>

<style scoped>
.task-list {
  margin-bottom: 1.5rem;
}
</style>