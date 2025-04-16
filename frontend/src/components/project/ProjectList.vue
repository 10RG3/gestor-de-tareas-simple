<template>
  <div class="project-list">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          Proyectos
        </p>
      </header>
      <div class="card-content">
        <div class="menu">
          <ul class="menu-list">
            <li v-for="project in projects" :key="project.id">
              <a 
                :class="{ 'is-active': currentProject && currentProject.id === project.id }"
                @click="selectProject(project)"
              >
                {{ project.name }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Project } from '@/types/project';

interface Props {
  projects: Project[];
  currentProject: Project | null;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'select-project', project: Project): void
}>();

const selectProject = (project: Project) => {
  emit('select-project', project);
};
</script>

<style scoped>
.project-list {
  margin-bottom: 1.5rem;
}

.menu-list a {
  cursor: pointer;
  padding: 0.5em 0.75em;
  border-radius: 4px;
}

.menu-list a:hover {
  background-color: #f5f5f5;
  color: #3273dc;
}

.menu-list a.is-active {
  background-color: #3273dc;
  color: white;
}
</style>