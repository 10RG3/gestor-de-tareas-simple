import { defineStore } from 'pinia';
import type { Task, CreateTaskDTO, TaskStatus } from '@/types/task';

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

export const useTaskStore = defineStore('task', {
  state: (): TaskState => ({
    tasks: [],
    loading: false,
    error: null
  }),
  
  getters: {
    getTasks: (state) => state.tasks
  },
  
  actions: {
    async fetchTasksByProject(projectId: number) {
      this.loading = true;
      this.error = null;
      
      try {
        const { data, error } = await useFetch<Task[]>(`/api/projects/${projectId}/tasks`);
        
        if (error.value) {
          throw new Error('Error al obtener tareas');
        }
        
        this.tasks = data.value || [];
      } catch (err) {
        console.error('Error al obtener tareas:', err);
        this.error = 'Error al cargar las tareas';
      } finally {
        this.loading = false;
      }
    },
    
    async createTask(taskData: CreateTaskDTO) {
      this.loading = true;
      this.error = null;
      
      try {
        const { data, error } = await useFetch<Task>('/api/tasks', {
          method: 'POST',
          body: taskData
        });
        
        if (error.value) {
          throw new Error('Error al crear tarea');
        }
        
        if (data.value) {
          this.tasks.push(data.value);
        }
      } catch (err) {
        console.error('Error al crear tarea:', err);
        this.error = 'Error al crear la tarea';
      } finally {
        this.loading = false;
      }
    },
    
    async updateTaskStatus(taskId: number, status: TaskStatus) {
      this.loading = true;
      this.error = null;
      
      try {
        const { data, error } = await useFetch<Task>(`/api/tasks/${taskId}`, {
          method: 'PATCH',
          body: { status }
        });
        
        if (error.value) {
          throw new Error('Error al actualizar tarea');
        }
        
        if (data.value) {
          const index = this.tasks.findIndex(t => t.id === taskId);
          if (index !== -1) {
            this.tasks[index] = data.value;
          }
        }
      } catch (err) {
        console.error('Error al actualizar tarea:', err);
        this.error = 'Error al actualizar la tarea';
      } finally {
        this.loading = false;
      }
    }
  }
});