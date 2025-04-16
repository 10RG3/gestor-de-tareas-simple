import { Task } from '../../domain/models/task';
import { TaskRepository } from '../../domain/repositories/task-repository';

export class UpdateTaskStatus {
  constructor(private taskRepository: TaskRepository) {}

  async execute(taskId: number, status: string): Promise<Task | null> {
    if (!status) {
      throw new Error('El status es requerido');
    }

    return await this.taskRepository.update(taskId, { status });
  }
}