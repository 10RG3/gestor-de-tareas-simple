import { Task } from '../../domain/models/task';
import { TaskRepository } from '../../domain/repositories/task-repository';

export class GetTasksByProject {
  constructor(private taskRepository: TaskRepository) {}

  async execute(projectId: number): Promise<Task[]> {
    return await this.taskRepository.findByProjectId(projectId);
  }
}