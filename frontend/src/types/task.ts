export type TaskStatus = 'pendiente' | 'en_progreso' | 'completada';

export interface Task {
  id: number;
  projectId: number;
  title: string;
  description: string;
  status: TaskStatus;
  tags: string[];
}

export interface CreateTaskDTO {
  projectId: number;
  title: string;
  description?: string;
  tags?: string[];
}