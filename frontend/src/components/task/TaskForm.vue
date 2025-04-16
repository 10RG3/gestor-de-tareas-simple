<template>
  <div class="task-form">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          Nueva Tarea
        </p>
      </header>
      <div class="card-content">
        <form @submit.prevent="handleSubmit">
          <div class="field">
            <label class="label" for="title">Título*</label>
            <div class="control">
              <input
                id="title"
                v-model="form.title"
                class="input"
                type="text"
                required
                placeholder="Título de la tarea"
              />
            </div>
          </div>
          
          <div class="field">
            <label class="label" for="description">Descripción</label>
            <div class="control">
              <textarea
                id="description"
                v-model="form.description"
                class="textarea"
                placeholder="Descripción de la tarea"
              ></textarea>
            </div>
          </div>
          
          <div class="field">
            <label class="label" for="tags">Etiquetas (separadas por comas)</label>
            <div class="control">
              <input
                id="tags"
                v-model="tagsInput"
                class="input"
                type="text"
                placeholder="frontend, api, feature, etc."
              />
            </div>
            <p class="help">Ejemplo: frontend, api, bug</p>
          </div>
          
          <div class="field">
            <div class="control">
              <button 
                type="submit" 
                class="button is-primary"
                :disabled="!currentProject"
              >
                Crear Tarea
              </button>
            </div>
          </div>
          
          <div v-if="!currentProject" class="notification is-warning is-light mt-3">
            <p>Por favor, selecciona un proyecto antes de crear una tarea.</p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Project } from '@/types/project';
import type { CreateTaskDTO } from '@/types/task';

interface Props {
  currentProject: Project | null;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'create-task', taskData: CreateTaskDTO): void
}>();

interface FormState {
  title: string;
  description: string;
}

const form = ref<FormState>({
  title: '',
  description: '',
});

const tagsInput = ref('');

const resetForm = () => {
  form.value = {
    title: '',
    description: '',
  };
  tagsInput.value = '';
};

const handleSubmit = () => {
  if (!props.currentProject) {
    alert('Por favor, selecciona un proyecto primero');
    return;
  }
  
  const tags = tagsInput.value
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag !== '');
  
  const taskData: CreateTaskDTO = {
    ...form.value,
    projectId: props.currentProject.id,
    tags
  };
  
  emit('create-task', taskData);
  resetForm();
};
</script>

<style scoped>
.task-form {
  margin-bottom: 1.5rem;
}
</style>