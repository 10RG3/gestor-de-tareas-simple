import { Task } from '../../domain/models/task';
import { TaskRepository } from '../../domain/repositories/task-repository';

interface CreateTaskDTO {
  projectId: number;
  title: string;
  description?: string;
  tags?: string[];
}

export class CreateTask {
  constructor(private taskRepository: TaskRepository) {}

  async execute(taskData: CreateTaskDTO): Promise<Task> {
    if (!taskData.projectId) {
      throw new Error('El projectId es requerido');
    }
    
    if (!taskData.title) {
      throw new Error('El título es requerido');
    }

    return await this.taskRepository.create(taskData as Omit<Task, 'id'>);
  }
}