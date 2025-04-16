<template>
  <div class="card mb-4">
    <div class="card-content">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <h3 class="title is-5">{{ task.title }}</h3>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <div class="select custom-select">
              <select 
                :value="task.status" 
                @change="updateStatus($event.target.value)"
                :class="selectClass"
              >
                <option value="pendiente">Pendiente</option>
                <option value="en_progreso">En progreso</option>
                <option value="completada">Completada</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      <p v-if="task.description" class="content mb-3">{{ task.description }}</p>
      
      <div class="tags">
        <span 
          v-for="tag in task.tags" 
          :key="tag" 
          class="tag is-info"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Task, TaskStatus } from '@/types/task';
import { computed } from 'vue';

interface Props {
  task: Task;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'update-status', taskId: number, status: TaskStatus): void
}>();

const updateStatus = (status: TaskStatus) => {
  emit('update-status', props.task.id, status);
};

const selectClass = computed(() => {
  switch (props.task.status) {
    case 'pendiente':
      return 'pendiente-select';
    case 'en_progreso':
      return 'progreso-select';
    case 'completada':
      return 'completada-select';
    default:
      return '';
  }
});
</script>

<style scoped>
.card {
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.custom-select {
  border-radius: 4px;
  font-weight: 500;
}

/* Pendiente: fondo rojo, texto blanco */
.pendiente-select {
  background-color: #ff3860 !important;
  color: white !important;
  border-color: #ff3860 !important;
}

/* En progreso: fondo verde, texto negro */
.progreso-select {
  background-color: #23d160 !important;
  color: rgba(0, 0, 0, 0.7) !important;
  border-color: #23d160 !important;
}

/* Completada: fondo azul, texto blanco */
.completada-select {
  background-color: #3273dc !important;
  color: white !important;
  border-color: #3273dc !important;
}

.select select {
  border-width: 2px;
  font-weight: 500;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}

.select:not(.is-multiple):not(.is-loading)::after {
  border-color: currentColor !important;
}

.select:hover::after {
  border-color: currentColor !important;
}
</style>