import { MemoryProjectRepository } from './infrastructure/repositories/memory-project-repository';
import { MemoryTaskRepository } from './infrastructure/repositories/memory-task-repository';

import { GetAllProjects } from './application/project/get-all-projects';
import { GetTasksByProject } from './application/task/get-tasks-by-project';
import { CreateTask } from './application/task/create-task';
import { UpdateTaskStatus } from './application/task/update-task-status';
import { GetTasksWithSharedTags } from './application/task/get-tasks-with-shared-tags';

import { ProjectController } from './infrastructure/api/controllers/project-controller';
import { TaskController } from './infrastructure/api/controllers/task-controller';

import { createProjectRoutes } from './infrastructure/api/routes/project-routes';
import { createTaskRoutes } from './infrastructure/api/routes/task-routes';

import { Server } from './infrastructure/server/server';

const start = async (): Promise<void> => {
  const projectRepository = new MemoryProjectRepository();
  const taskRepository = new MemoryTaskRepository();
  
  const getAllProjects = new GetAllProjects(projectRepository);
  const getTasksByProject = new GetTasksByProject(taskRepository);
  const createTask = new CreateTask(taskRepository);
  const updateTaskStatus = new UpdateTaskStatus(taskRepository);
  const getTasksWithSharedTags = new GetTasksWithSharedTags(taskRepository);
  
  const projectController = new ProjectController(getAllProjects);
  const taskController = new TaskController(
    getTasksByProject, 
    createTask, 
    updateTaskStatus, 
    getTasksWithSharedTags
  );
  
  const projectRoutes = createProjectRoutes(projectController, taskController);
  const taskRoutes = createTaskRoutes(taskController);
  
  const server = new Server(projectRoutes, taskRoutes, taskController);
  await server.start();
};

start().catch(console.error);