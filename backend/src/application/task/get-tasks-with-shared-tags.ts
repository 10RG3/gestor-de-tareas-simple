import { Task } from '../../domain/models/task';
import { TaskRepository } from '../../domain/repositories/task-repository';

export class GetTasksWithSharedTags {
  constructor(private taskRepository: TaskRepository) {}

  async execute(projectAId: number | string, projectBId: number | string): Promise<Task[]> {
    if (!projectAId || !projectBId) {
      throw new Error('Ambos IDs de proyecto son requeridos');
    }

    const projAId = typeof projectAId === 'string' ? parseInt(projectAId, 10) : projectAId;
    const projBId = typeof projectBId === 'string' ? parseInt(projectBId, 10) : projectBId;

    return await this.taskRepository.findTasksWithSharedTags(projAId, projBId);
  }
}