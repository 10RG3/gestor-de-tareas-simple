import { defineStore } from 'pinia';
import type { Project } from '@/types/project';

interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  loading: boolean;
  error: string | null;
}

export const useProjectStore = defineStore('project', {
  state: (): ProjectState => ({
    projects: [],
    currentProject: null,
    loading: false,
    error: null
  }),
  
  getters: {
    getProjects: (state) => state.projects,
    getCurrentProject: (state) => state.currentProject
  },
  
  actions: {
    async fetchProjects() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await fetch('/api/projects');
        
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const projects = await response.json();
        this.projects = projects;
      } catch (error) {
        console.error('Error al obtener proyectos:', error);
        this.error = 'Error al cargar los proyectos';
      } finally {
        this.loading = false;
      }
    },
    
    setCurrentProject(project: Project) {
      this.currentProject = project;
    }
  }
});


