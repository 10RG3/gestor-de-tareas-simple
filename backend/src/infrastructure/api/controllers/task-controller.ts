import { Request, Response } from 'express';
import { GetTasksByProject } from '../../../application/task/get-tasks-by-project';
import { CreateTask } from '../../../application/task/create-task';
import { UpdateTaskStatus } from '../../../application/task/update-task-status';
import { GetTasksWithSharedTags } from '../../../application/task/get-tasks-with-shared-tags';

export class TaskController {
  constructor(
    private getTasksByProjectUseCase: GetTasksByProject,
    private createTaskUseCase: CreateTask,
    private updateTaskStatusUseCase: UpdateTaskStatus,
    private getTasksWithSharedTagsUseCase: GetTasksWithSharedTags
  ) {}

  async getTasksByProject(req: Request, res: Response): Promise<void> {
    try {
      const projectId = parseInt(req.params.projectId, 10);
      const tasks = await this.getTasksByProjectUseCase.execute(projectId);
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async createTask(req: Request, res: Response): Promise<void> {
    try {
      const taskData = req.body;

      if (taskData.projectId) {
        taskData.projectId = parseInt(taskData.projectId, 10);
      }
      
      const task = await this.createTaskUseCase.execute(taskData);
      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async updateTaskStatus(req: Request, res: Response): Promise<void> {
    try {
      const taskId = parseInt(req.params.taskId, 10);
      const { status } = req.body;
      
      const task = await this.updateTaskStatusUseCase.execute(taskId, status);
      
      if (!task) {
        res.status(404).json({ error: 'Tarea no encontrada' });
        return;
      }
      
      res.json(task);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async getTasksWithSharedTags(req: Request, res: Response): Promise<void> {
    try {
      const { projectAId, projectBId } = req.query;
      
      if (!projectAId || !projectBId) {
        res.status(400).json({ error: 'Se requieren ambos projectAId y projectBId' });
        return;
      }
      
      const tasks = await this.getTasksWithSharedTagsUseCase.execute(
        projectAId as string, 
        projectBId as string
      );
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}