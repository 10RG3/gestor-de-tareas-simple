import { Task } from '../models/task';

export interface TaskRepository {
  findAll(): Promise<Task[]>;
  findById(id: number): Promise<Task | null>;
  findByProjectId(projectId: number): Promise<Task[]>;
  create(task: Omit<Task, 'id'>): Promise<Task>;
  update(id: number, taskData: Partial<Task>): Promise<Task | null>;
  findTasksWithSharedTags(projectAId: number, projectBId: number): Promise<Task[]>;
}